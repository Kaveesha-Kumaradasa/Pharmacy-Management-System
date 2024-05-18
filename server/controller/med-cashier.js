import { db } from '../db.js';

// Get all medicines
export const getAllMedicines = (req, res) => {
  const sql = `
    SELECT 
      m.generic AS medicine_name,
      m.rack_no,
      c.name AS category,
      dt.name AS type,
      b.name AS brand,
      mb.strength,
      s.exp_date,
      s.price_of_sell,
      s.price_of_buy,
      s.quantity,
      m.med_id
    FROM 
      medicine m
    JOIN 
      category c ON m.cat_id = c.cat_id
    JOIN 
      med_brand mb ON m.med_id = mb.med_id
    JOIN 
      brand b ON mb.brand_id = b.brand_id
    JOIN 
      dosage_type dt ON mb.type_id = dt.type_id
    JOIN 
      stock s ON m.med_id = s.med_id AND mb.brand_id = s.brand_id AND mb.type_id = s.type_id AND mb.strength = s.strength;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching medicines', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(data);
    }
  });
};
