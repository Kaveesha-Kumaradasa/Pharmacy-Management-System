import express from 'express';
import { getAllMedicines,updateMedicine } from '../controller/med-admin.js';

const router = express.Router();

router.get('/medicines', getAllMedicines);
router.post('/medicines/:id', updateMedicine);


export default router;
