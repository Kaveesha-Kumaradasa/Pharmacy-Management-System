import { db } from '../db.js';

// Existing getUsers function
export const getUsers = (req, res) => {
  const query = `
  SELECT u.user_id, u.name, u.email, u.phone_number, u.address, u.username, r.name as role
  FROM users u
  JOIN role r ON u.role_id = r.role_id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// New function to get user details by ID
export const getUserById = (req, res) => {
  const { id } = req.params;
  const query = `
  SELECT u.user_id, u.name, u.email, u.phone_number, u.address, u.username, r.name as role
  FROM users u
  JOIN role r ON u.role_id = r.role_id
  WHERE u.user_id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

// New function to update user details
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, address, username } = req.body;
  const query = `
  UPDATE users
  SET name = ?, email = ?, phone_number = ?, address = ?, username = ?
  WHERE user_id = ?
  `;

  db.query(query, [name, email, phone_number, address, username, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated successfully' });
  });
};
