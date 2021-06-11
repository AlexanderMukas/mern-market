import express from 'express';
const router = express.Router();

//add controller
import addOrderItems from '../controllers/orderController';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);

// put middleware on first argument first
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// router.route('/profile').put(protect, updateUserProfile);

export default router;

