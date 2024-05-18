import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getRoles = (req, res) => {
    const q = 'SELECT role_id, name FROM role';
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const register = (req, res) => {
    const { name, email, phone_number, address, username, password, role_id } = req.body;

    // Check if user already exists
    const q = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(q, [email, username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json('User already exists');

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Insert the new user
        const q = 'INSERT INTO users (name, email, phone_number, address, username, password, role_id) VALUES (?)';
        const values = [name, email, phone_number, address, username, hash, role_id];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('User created successfully');
        });
    });
};

export const login = (req, res) => {
    const { username, password } = req.body;
  
    // Check if user exists
    const q = 'SELECT * FROM users WHERE username = ?';
    db.query(q, [username], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      const user = data[0];
  
      // Check password
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) return res.status(400).json("Wrong password!");
  
      // Generate token
      const token = jwt.sign({ id: user.id, role: user.role_id }, 'your_jwt_secret_key', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    });
  };

export const logout = (req, res) => {
    // Logout logic here
};