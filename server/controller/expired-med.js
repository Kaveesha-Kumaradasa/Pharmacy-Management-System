import { db } from '../db.js';

export const getExpiringProducts = async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT 
          p.product_name, 
          p.exp_date, 
          c.name AS category, 
          b.name AS brand, 
          u.name AS supplier 
        FROM 
          product p 
        JOIN 
          category c ON p.cat_id = c.cat_id 
        JOIN 
          brand b ON p.brand_id = b.brand_id 
        JOIN 
          users u ON p.supplier_id = u.user_id 
        WHERE 
          p.exp_date >= DATE_ADD(CURRENT_DATE(), INTERVAL 3 MONTH);
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  