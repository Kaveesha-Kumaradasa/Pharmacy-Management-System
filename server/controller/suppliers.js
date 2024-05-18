import { db } from '../db.js';

export const getSuppliers = async (req, res) => {
  const sql = 'SELECT * FROM users WHERE role_id = ?';
  db.query(sql, [3], (err, data) => { // Assuming '2' is the role_id for 'supplier'
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.json(data);
  });
};
