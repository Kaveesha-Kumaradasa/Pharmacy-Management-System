import { db } from '../db.js';

// Get all medicines
export const getAllMedicines = (req, res) => {
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

// Add a new medicine
export const addMedicine = (req, res) => {
  const { medicine_name, category, type, brand, strength, exp_date, price_of_sell, price_of_buy, quantity } = req.body;

  const insertQuery = `
    INSERT INTO medicine (generic, cat_id)
    VALUES (?, (SELECT cat_id FROM category WHERE name = ?));
    INSERT INTO med_brand (med_id, brand_id, type_id, strength)
    VALUES (LAST_INSERT_ID(), (SELECT brand_id FROM brand WHERE name = ?), (SELECT type_id FROM dosage_type WHERE name = ?), ?);
    INSERT INTO stock (med_id, brand_id, type_id, strength, exp_date, price_of_sell, price_of_buy, quantity)
    VALUES (LAST_INSERT_ID(), (SELECT brand_id FROM brand WHERE name = ?), (SELECT type_id FROM dosage_type WHERE name = ?), ?, ?, ?, ?, ?);
  `;

  db.query(insertQuery, [medicine_name, category, brand, type, strength, brand, type, strength, exp_date, price_of_sell, price_of_buy, quantity], (err, result) => {
    if (err) {
      console.error('Error adding medicine', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Medicine added successfully' });
    }
  });
};

// Update medicine
export const updateMedicine = (req, res) => {
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
      s.exp_date = ?,
      s.price_of_sell = ?,
      s.price_of_buy = ?,
      s.quantity = ?
    WHERE m.med_id = ?;
  `;

  db.query(updateQuery, [medicine_name, category, type, brand, exp_date, price_of_sell, price_of_buy, quantity, id], (err, result) => {
    if (err) {
      console.error('Error updating medicine', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Medicine updated successfully' });
    }
  });
};

// Delete medicine
export const deleteMedicine = (req, res) => {
  const id = req.params.id;

  const deleteQuery = `
    DELETE FROM stock WHERE med_id = ?;
    DELETE FROM med_brand WHERE med_id = ?;
    DELETE FROM medicine WHERE med_id = ?;
  `;

  db.query(deleteQuery, [id, id, id], (err, result) => {
    if (err) {
      console.error('Error deleting medicine', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Medicine deleted successfully' });
    }
  });
};
