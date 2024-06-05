import { db } from '../db.js';

export const getUsers = (req, res) => {
  
  const query = `
  SELECT u.name,u.email,u.phone_number,u.address,u.username,u.password, r.name as role
  FROM users u
  JOIN role r ON u.role_id= r.role_id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};