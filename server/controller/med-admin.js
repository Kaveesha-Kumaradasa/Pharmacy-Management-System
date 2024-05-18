import { db } from '../db.js';

export const getAllMedicines = async (req, res) => {
  const sql = `
    SELECT 
      m.generic AS medicine_name,
      c.name AS category,
      dt.name AS type,
      b.name AS brand,
      mb.strength,
      s.exp_date,
      s.price_of_sell,
      s.price_of_buy,
      s.quantity
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
      console.error('Error fetching data', err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    return res.json(data);
  });
};



// Update medicine
export const updateMedicine = async (req, res) => {
  const id = req.params.id;
  const { medicine_name, category, type, brand, strength, exp_date, price_of_sell, price_of_buy, quantity } = req.body;

  const updateQuery = `
    UPDATE medicine m
    JOIN category c ON m.cat_id = c.cat_id
    JOIN med_brand mb ON m.med_id = mb.med_id
    JOIN brand b ON mb.brand_id = b.brand_id
    JOIN dosage_type dt ON mb.type_id = dt.type_id
    JOIN stock s ON m.med_id = s.med_id AND mb.brand_id = s.brand_id AND mb.type_id = s.type_id AND mb.strength = s.strength
    SET 
      m.generic = ?,
      c.name = ?,
      dt.name = ?,
      b.name = ?,
      mb.strength = ?,
      s.exp_date = ?,
      s.price_of_sell = ?,
      s.price_of_buy = ?,
      s.quantity = ?
    WHERE m.med_id = ?;
  `;

  db.query(updateQuery, [medicine_name, category, type, brand, strength, exp_date, price_of_sell, price_of_buy, quantity, id], (err, result) => {
    if (err) {
      console.error('Error updating medicine', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Medicine updated successfully' });
    }
  });
};