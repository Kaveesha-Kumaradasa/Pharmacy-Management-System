import express from 'express';
import { getAllMedicines,addMedicine,updateMedicine,deleteMedicine } from '../controller/med-admin.js';

const router = express.Router();

router.get('/medicines', getAllMedicines);
router.delete('/medicines/:id', deleteMedicine);
router.post('/medicines', addMedicine);
router.put('/medicines/:id', updateMedicine);


export default router;
