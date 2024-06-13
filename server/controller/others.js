import { db } from '../db.js';

export const getGenerics = (req, res) => {
    db.query('SELECT * FROM medicine', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };
  
  export const createGeneric = (req, res) => {
    const { generic_name } = req.body;
    db.query('INSERT INTO medicine (generic_name) VALUES (?)', [generic_name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, generic_name });
    });
  };
  
  export const updateGeneric = (req, res) => {
    const { id } = req.params;
    const { generic_name } = req.body;
    db.query('UPDATE medicine SET generic_name = ? WHERE generic_id = ?', [generic_name, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Generic updated successfully' });
    });
  };
  
  export const getCategories = (req, res) => {
    db.query('SELECT * FROM category', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };
  
  export const createCategory = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO category (name) VALUES (?)', [name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, name });
    });
  };
  
  export const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE category SET name = ? WHERE cat_id = ?', [name, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Category updated successfully' });
    });
  };
  
  export const getDosageTypes = (req, res) => {
    db.query('SELECT * FROM dosage_type', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };
  
  export const createDosageType = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO dosage_type (name) VALUES (?)', [name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, name });
    });
  };
  
  export const updateDosageType = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE dosage_type SET name = ? WHERE type_id = ?', [name, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Dosage type updated successfully' });
    });
  };
  
  export const getBrands = (req, res) => {
    db.query('SELECT * FROM brand', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };
  
  export const createBrand = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO brand (name) VALUES (?)', [name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, name });
    });
  };
  
  export const updateBrand = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE brand SET name = ? WHERE brand_id = ?', [name, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Brand updated successfully' });
    });
  };