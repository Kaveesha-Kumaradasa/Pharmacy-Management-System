import { db } from '../db.js';
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

        // Insert the new user without hashing the password
        const q = 'INSERT INTO users (name, email, phone_number, address, username, password, role_id) VALUES (?)';
        const values = [name, email, phone_number, address, username, password, role_id];

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
  
        // Check password without hashing
        if (password !== user.password) return res.status(400).json("Wrong password!");
  
        // Generate token
        const token = jwt.sign({ id: user.user_id, role: user.role_id }, 'your_jwt_secret_key', { expiresIn: '5h' });
  
        // Include user_id in the response
        res.status(200).json({ token, id: user.user_id, role_id: user.role_id });
    });
};

export const logout = (req, res) => {
    // Optional: Implement server-side logout logic here if needed
    res.status(200).json('Logged out successfully');
};

