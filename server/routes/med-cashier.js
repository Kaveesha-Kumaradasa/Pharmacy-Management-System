import express from 'express';
import { getAllProducts } from '../controller/med-cashier.js';

const router = express.Router();

router.get('/product', getAllProducts);

export default router;
