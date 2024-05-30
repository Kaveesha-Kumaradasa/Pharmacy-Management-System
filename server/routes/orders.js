// routes/orders.js

import express from 'express';
import { getSuppliers, getProductsBySupplier, createOrder, getOrdersBySupplier, getOrdersByAdmin } from '../controller/orders.js';

const router = express.Router();

router.get('/suppliers', getSuppliers);
router.get('/products', getProductsBySupplier);
router.post('/orders', createOrder);
router.get('/orders', getOrdersBySupplier);
router.get('/admin/orders', getOrdersByAdmin); // Add route for fetching orders by admin

export default router;
