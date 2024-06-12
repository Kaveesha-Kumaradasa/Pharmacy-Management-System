import express from 'express';
import { getTotals, getMonthlySales, getTopSelling} from '../controller/dashboard.js';

const router = express.Router();

router.get('/totals', getTotals);
router.get('/top-selling', getTopSelling);
router.get('/monthly-sales', getMonthlySales);


export default router;
