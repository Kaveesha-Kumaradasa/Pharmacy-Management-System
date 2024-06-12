import { db } from '../db.js';

export const getAllProducts = (req, res) => {
  const { searchField, searchQuery } = req.query;

  let query = `
    SELECT p.batch_number, p.product_id, p.product_name, p.exp_date, p.purchase_price, p.sell_price, p.quantity, m.generic_name, c.name as category, d.name as dosage_type, b.name as brand, u.name as supplier,t.type_name as drug_type 
    FROM product p
    JOIN medicine m ON p.generic_id = m.generic_id
    JOIN category c ON p.cat_id = c.cat_id
    JOIN dosage_type d ON p.type_id = d.type_id
    JOIN brand b ON p.brand_id = b.brand_id
    JOIN users u ON p.supplier_id = u.user_id
    JOIN drug_type t ON p.drug_type_id = t.id
  `;

  if (searchField && searchQuery && searchField !== 'all') {
    query += ` WHERE ${
      searchField === 'category' ? 'c.name' :
      searchField === 'generic_name' ? 'm.generic_name' :
      searchField === 'dosage_type' ? 'd.name' :
      searchField === 'brand' ? 'b.name' :
      searchField === 'supplier' ? 'u.name' :
      searchField === 'drug_type' ? 't.type_name' :
      'p.product_name'
    } LIKE ?`;
  }

  const queryParams = searchField && searchQuery && searchField !== 'all' ? [`${searchQuery}%`] : [];

  db.query(query, queryParams, (err, results) => {
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

// Get all suppliers
export const getSuppliers = (req, res) => {
  const query = 'SELECT * FROM users WHERE role_id = "3"';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// get all drug type
export const getDrugTypes = (req, res) => {
  const query = 'SELECT * FROM drug_type';
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

export const createProduct = (req, res) => {
  const { batch_number,product_name, exp_date, purchase_price, sell_price, quantity, generic_id, cat_id, type_id, brand_id, supplier_id, drug_type_id } = req.body;

  console.log('Received payload:', req.body);

  if (!batch_number || !product_name || !exp_date || !purchase_price || !sell_price || !quantity || !generic_id || !cat_id || !type_id || !brand_id || !supplier_id || !drug_type_id)  {
    console.error('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO product (batch_number, product_name, exp_date, purchase_price, sell_price, quantity, generic_id, cat_id, type_id, brand_id, supplier_id, drug_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  console.log('Executing query:', query);
  console.log('With values:', [batch_number, product_name, exp_date, purchase_price, sell_price, quantity, generic_id, cat_id, type_id, brand_id, supplier_id, drug_type_id]);

  db.query(query, [batch_number, product_name, exp_date, purchase_price, sell_price, quantity, generic_id, cat_id, type_id, brand_id, supplier_id, drug_type_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      console.error('SQL Error Code:', err.code);
      console.error('SQL Error Details:', err.sqlMessage);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
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

