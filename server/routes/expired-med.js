// routes/productsRouter.js
import express from 'express';
import { getExpiringProducts } from '../controller/expired-med.js';

const router = express.Router();

router.get('/', getExpiringProducts);

export default router;
