import express from 'express';
import { getAllMedicines } from '../controller/med-cashier.js';

const router = express.Router();

router.get('/medicines', getAllMedicines);

export default router;
