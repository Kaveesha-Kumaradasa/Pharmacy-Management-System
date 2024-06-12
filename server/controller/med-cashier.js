import { db } from '../db.js';

export const getAllProducts = (req, res) => {
  const { searchField, searchQuery, drugType } = req.query;

  let query = `
    SELECT p.product_id, p.product_name, p.exp_date, p.purchase_price, p.sell_price, p.quantity, 
           m.generic_name, c.name as category, d.name as dosage_type, b.name as brand, 
           u.name as supplier, dt.type_name as drug_type, p.batch_number
    FROM product p
    JOIN medicine m ON p.generic_id = m.generic_id
    JOIN category c ON p.cat_id = c.cat_id
    JOIN dosage_type d ON p.type_id = d.type_id
    JOIN brand b ON p.brand_id = b.brand_id
    JOIN users u ON p.supplier_id = u.user_id
    JOIN drug_type dt ON p.drug_type_id = dt.id
  `;

  const queryParams = [];

  if ((searchField && searchQuery && searchField !== 'all') || drugType) {
    query += ' WHERE ';
    
    const conditions = [];

    if (searchField && searchQuery && searchField !== 'all') {
      conditions.push(
        `${
          searchField === 'generic_name' ? 'm.generic_name' :
          searchField === 'brand' ? 'b.name' :
          'p.product_name'
        } LIKE ?`
      );
      queryParams.push(`${searchQuery}%`);
    }

    if (drugType) {
      conditions.push('dt.type_name = ?');
      queryParams.push(drugType);
    }

    query += conditions.join(' AND ');
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log the error to the console
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
