// routes/productsRouter.js
import express from 'express';
import { getExpiringProducts } from '../controller/notification.js';

const router = express.Router();

router.get('/', getExpiringProducts);

export default router;
