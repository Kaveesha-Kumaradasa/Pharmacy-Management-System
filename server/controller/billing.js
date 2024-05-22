import { db } from '../db.js';

export const searchProducts = (req, res) => {
    const query = `SELECT * FROM product WHERE product_name LIKE ?`;
    db.query(query, [`%${req.query.name}%`], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  };
  
  export const addItemToInvoice = (req, res) => {
    const { product_id, quantity } = req.body;
  
    const updateQuantityQuery = `UPDATE product SET quantity = quantity - ? WHERE id = ?`;
    db.query(updateQuantityQuery, [quantity, product_id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Product not found or insufficient quantity');
      }
  
      const addInvoiceItemQuery = `INSERT INTO bill_product (product_id, quantity) VALUES (?, ?)`;
      db.query(addInvoiceItemQuery, [product_id, quantity], (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send('Item added to invoice successfully');
      });
    });
  };