import express from 'express';
const router = express.Router();

//add controllers
import { authUser } from '../controllers/userController.js';

router.post('/login', authUser);

export default router;