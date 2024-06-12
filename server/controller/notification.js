import { db } from '../db.js';
import { io } from '../index.js';

export const getItems = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const [results] = await promiseDb.query(`
      SELECT 
        p.batch_number,
        p.product_id,
        p.product_name,
        p.exp_date,
        p.quantity,
        dt.name AS dosage_type
      FROM 
        product p
      JOIN 
        dosage_type dt ON p.type_id = dt.type_id
      WHERE 
        (p.exp_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 90 DAY))
        OR 
        (dt.name IN ('tablets', 'capsules') AND p.quantity < 100 AND p.quantity >= 0)
        OR 
        (dt.name NOT IN ('tablets', 'capsules') AND p.quantity < 15 AND p.quantity >= 0)
    `);

    res.json(results);

    // Emitting new notification
    io.emit('new_notification', results);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Error fetching items' });
  }
};
