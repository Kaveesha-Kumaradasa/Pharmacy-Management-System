import express from 'express';
import { searchProducts, addItemToInvoice } from '../controller/billing.js'

const router = express.Router();

router.get('/products', searchProducts);
router.post('/invoice', addItemToInvoice);



export default router;
