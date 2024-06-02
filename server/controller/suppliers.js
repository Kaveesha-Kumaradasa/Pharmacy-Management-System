import { db } from '../db.js';

export const getSuppliers = (req, res) => {
  const roleId = 3;
  const query = 'SELECT name, email, phone_number, address FROM users WHERE role_id = ?';

  db.query(query, [roleId], (error, results) => {
      if (error) {
          console.error('Error fetching suppliers:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);
      }
  });
};
