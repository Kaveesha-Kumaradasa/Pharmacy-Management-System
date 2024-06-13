import express from 'express';
import { getProducts, createBill } from '../controller/billing.js';

const router = express.Router();


router.get('/products', getProducts);
router.post('/bills', createBill);

export default router;
