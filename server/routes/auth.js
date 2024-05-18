import express from "express";
import { register, login, logout, getRoles } from "../controller/auth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/roles', getRoles); // Add route to get roles

export default router;
