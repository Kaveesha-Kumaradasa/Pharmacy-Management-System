import express from 'express';
import { getSuppliers } from '../controller/suppliers.js';

const router = express.Router();

router.get('/', getSuppliers);



export default router;
