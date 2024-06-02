// routes/orders.js

import express from 'express';
import { getSuppliers, getProductsBySupplier, createOrder, getOrdersBySupplier, getOrdersByAdmin,updateOrderDeliveryStatus } from '../controller/orders.js';

const router = express.Router();

router.get('/suppliers', getSuppliers);
router.get('/products', getProductsBySupplier);
router.post('/orders', createOrder);
router.get('/orders', getOrdersBySupplier);
router.get('/admin/orders', getOrdersByAdmin); 
router.put('/delivery/status', updateOrderDeliveryStatus);

export default router;
