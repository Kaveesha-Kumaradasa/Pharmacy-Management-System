import express from 'express';
import {
    addInvoice,
    updateInvoice,
    getAllInvoices,
    getInvoiceById,
    getInvoicesByDate,
    deleteInvoice
} from '../controller/billing.js';

const router = express.Router();

router.post('/add-invoice', addInvoice);
router.put('/update-invoice/:id', updateInvoice);
router.get('/invoices', getAllInvoices);
router.get('/invoice/:id', getInvoiceById);
router.post('/invoices-by-date', getInvoicesByDate);
router.delete('/delete-invoice/:id', deleteInvoice);

export default router;