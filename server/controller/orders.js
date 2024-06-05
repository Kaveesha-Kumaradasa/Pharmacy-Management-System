// controllers/orders.js
import { db } from '../db.js';

export const getSuppliers = (req, res) => {
  const query = 'SELECT user_id, name FROM users WHERE role_id = 3';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching suppliers:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const getProductsBySupplier = (req, res) => {
  const { supplier_id } = req.query;
  const query = `
    SELECT product.*, users.name as supplier_name 
    FROM product 
    JOIN users ON product.supplier_id = users.user_id 
    WHERE product.supplier_id = ?`;
  db.query(query, [supplier_id], (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

// controllers/orders.js
export const createOrder = (req, res) => {
  const { supplierId, products } = req.body;
  const queryOrder = 'INSERT INTO orders (supplier_id, date) VALUES (?, NOW())';
  db.query(queryOrder, [supplierId], (err, result) => {
    if (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: err.message });
    } else {
      const orderId = result.insertId;
      const orderDetails = products.map(product => [orderId, product.productId, product.quantity]);
      const queryOrderDetails = 'INSERT INTO order_detail (order_id, product_id, quantity) VALUES ?';
      db.query(queryOrderDetails, [orderDetails], (err) => {
        if (err) {
          console.error('Error inserting order details:', err);
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json({ message: 'Order created successfully' });
        }
      });
    }
  });
};

export const getOrdersBySupplier = (req, res) => {
  const { supplier_id } = req.query;
  const user_id = req.headers['user-id'];
  const role_id = req.headers['role-id'];

  if (role_id !== '3') {
    return res.status(403).json({ error: 'Access denied' });
  }

  console.log(`Received request for supplier_id: ${supplier_id} from user_id: ${user_id}`);

  const query = `
    SELECT 
      orders.order_id, 
      orders.date,
      orders.status, 
      order_detail.product_id, 
      product.product_name, 
      order_detail.quantity
    FROM 
      orders
    JOIN 
      order_detail ON orders.order_id = order_detail.order_id
    JOIN 
      product ON order_detail.product_id = product.product_id
    WHERE 
      orders.supplier_id = ?
    ORDER BY 
      orders.order_id DESC
  `;

  db.query(query, [supplier_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log('Query results:', results);
      const ordersMap = results.reduce((acc, row) => {
        const { order_id, date, status, product_id, product_name, quantity } = row;
        if (!acc[order_id]) {
          acc[order_id] = {
            order_id,
            date,
            status,
            products: []
          };
        }
        acc[order_id].products.push({ product_id, product_name, quantity });
        return acc;
      }, {});

      const orders = Object.values(ordersMap);

      // Sort the orders in descending order based on the 'date' field
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.json(orders);
    }
  });
};



// controllers/orders.js

export const getOrdersByAdmin = (req, res) => {
  const user_id = req.headers['user-id'];
  const role_id = req.headers['role-id'];

  console.log(`Received request from user_id: ${user_id} with role_id: ${role_id}`);

  if (role_id !== '1') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const query = `
    SELECT 
      orders.order_id, 
      orders.supplier_id,
      orders.date,
      orders.status,
      users.name as supplier_name,
      order_detail.product_id, 
      product.product_name, 
      order_detail.quantity
    FROM 
      orders
    JOIN 
      order_detail ON orders.order_id = order_detail.order_id
    JOIN 
      product ON order_detail.product_id = product.product_id
    JOIN
      users ON orders.supplier_id = users.user_id
    ORDER BY 
      orders.order_id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders for admin:', err);
      res.status(500).json({ error: err.message });
    } else {
      const ordersMap = results.reduce((acc, row) => {
        const { order_id, supplier_name, date, product_id, product_name, quantity, status } = row;
        if (!acc[order_id]) {
          acc[order_id] = {
            order_id,
            supplier_name,
            date,
            status,
            products: []
          };
        }
        acc[order_id].products.push({ product_id, product_name, quantity });
        return acc;
      }, {});

      const orders = Object.values(ordersMap);

      // Sort the orders in descending order based on the 'date' field
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.json(orders);
    }
  });
};


// controllers/orders.js

export const updateOrderDeliveryStatus = (req, res) => {
  const { orderId, status } = req.body;
  const query = 'UPDATE orders SET status = ? WHERE order_id = ?';
  db.query(query, [status, orderId], (err, result) => {
    if (err) {
      console.error('Error updating order delivery status:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Order delivery status updated successfully' });
    }
  });
};

