import express from 'express';
import { getItems } from '../controller/notification.js';

const router = express.Router();

router.get('/items', getItems);

export default router;
