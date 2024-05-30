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

export const createOrder = (req, res) => {
  const { supplierId, products } = req.body;
  const queryOrder = 'INSERT INTO orders (supplier_id) VALUES (?)';
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
  const user_id = req.headers['user-id']; // Assume user_id is passed in the request headers
  const role_id = req.headers['role-id']; // Assume role_id is passed in the request headers

  if (role_id !== '3') { // 3 is the role_id for suppliers
    return res.status(403).json({ error: 'Access denied' });
  }

  console.log(`Received request for supplier_id: ${supplier_id} from user_id: ${user_id}`);

  const query = `
    SELECT 
      orders.order_id, 
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
      res.json(results);
    }
  });
};

// controllers/orders.js

export const getOrdersByAdmin = (req, res) => {
  const user_id = req.headers['user-id']; // Assume user_id is passed in the request headers
  const role_id = req.headers['role-id']; // Assume role_id is passed in the request headers

  if (role_id !== '1') { // 1 is the role_id for admin users
    return res.status(403).json({ error: 'Access denied' });
  }

  const query = `
    SELECT 
      orders.order_id, 
      orders.supplier_id,
      order_detail.product_id, 
      product.product_name, 
      order_detail.quantity
    FROM 
      orders
    JOIN 
      order_detail ON orders.order_id = order_detail.order_id
    JOIN 
      product ON order_detail.product_id = product.product_id
    ORDER BY 
      orders.order_id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders for admin:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};
