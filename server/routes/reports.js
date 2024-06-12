import express from 'express';
import { getTop3Items, getExpiringMedicines } from '../controller/reports.js';

const router = express.Router();


router.get('/top3-items', getTop3Items);
router.get('/expiring-medicines', getExpiringMedicines);

export default router;
