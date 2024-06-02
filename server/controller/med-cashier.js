import { db } from '../db.js';

export const getAllProducts = (req, res) => {
  const { searchField, searchQuery } = req.query;

  let query = `
    SELECT p.product_id, p.product_name, p.exp_date, p.purchase_price, p.sell_price, p.quantity, m.generic_name, c.name as category, d.name as dosage_type, b.name as brand, u.name as supplier
    FROM product p
    JOIN medicine m ON p.generic_id = m.generic_id
    JOIN category c ON p.cat_id = c.cat_id
    JOIN dosage_type d ON p.type_id = d.type_id
    JOIN brand b ON p.brand_id = b.brand_id
    JOIN users u ON p.supplier_id = u.user_id
  `;

  if (searchField && searchQuery && searchField !== 'all') {
    query += ` WHERE ${
      searchField === 'category' ? 'c.name' :
      searchField === 'generic_name' ? 'm.generic_name' :
      searchField === 'dosage_type' ? 'd.name' :
      searchField === 'brand' ? 'b.name' :
      searchField === 'supplier' ? 'u.name' :
      'p.product_name'
    } LIKE ?`;
  }

  const queryParams = searchField && searchQuery && searchField !== 'all' ? [`${searchQuery}%`] : [];

  db.query(query, queryParams, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

