import { db } from '../db.js';

export const getAllProducts = (req, res) => {
  const query = `
    SELECT p.product_id, p.product_name, p.exp_date, p.purchase_price, p.sell_price, p.quantity, m.generic_name, c.name as category, d.name as dosage_type, b.name as brand
    FROM product p
    JOIN medicine m ON p.generic_id = m.generic_id
    JOIN category c ON p.cat_id = c.cat_id
    JOIN dosage_type d ON p.type_id = d.type_id
    JOIN brand b ON p.brand_id = b.brand_id;
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getCategories = (req, res) => {
  const query = 'SELECT * FROM category';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get all dosage types
export const getDosageTypes = (req, res) => {
  const query = 'SELECT * FROM dosage_type';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get all brands
export const getBrands = (req, res) => {
  const query = 'SELECT * FROM brand';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get all generics
export const getGenerics = (req, res) => {
  const query = 'SELECT * FROM medicine';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get product by id
export const getProductById = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT * FROM product WHERE product_id = ?';
  db.query(query, [product_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
};

// Create new product
export const createProduct = (req, res) => {
  const { product_name, exp_date, purchase_price, sell_price, quantity, generic_id, cat_id, type_id, brand_id } = req.body;
  const query = 'INSERT INTO product (product_name, exp_date, purchase_price, sell_price, quantity, generic_id, cat_id, type_id, brand_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [product_name, exp_date, purchase_price, sell_price, quantity, generic_id, cat_id, type_id, brand_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product created successfully', id: results.insertId });
  });
};

// Update product
export const updateProduct = (req, res) => {
  const { product_id } = req.params;
  const { exp_date, purchase_price, sell_price, quantity } = req.body;
  const query = 'UPDATE product SET exp_date = ?, purchase_price = ?, sell_price = ?, quantity = ? WHERE product_id = ?';
  db.query(query, [exp_date, purchase_price, sell_price, quantity, product_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
  });
};

export const deleteProduct = (req, res) => {
  const { product_id } = req.params;
  const query = 'DELETE FROM product WHERE product_id = ?';

  console.log(`Attempting to delete product with id: ${product_id}`);

  db.query(query, [product_id], (err, results) => {
    if (err) {
      console.error('Error deleting product:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      console.warn('Product not found with id:', product_id);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product deleted successfully with id:', product_id);
    res.json({ message: 'Product deleted successfully' });
  });
};

