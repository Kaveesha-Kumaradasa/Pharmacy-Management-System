import express from 'express';
import { getUsers,getUserById,updateUser } from '../controller/user.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.put('/users/:id', updateUser);




export default router;