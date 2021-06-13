import express from 'express';
const router = express.Router();

//add controller
import addOrderItems from '../controllers/orderController';

// add protect
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);


// put middleware on first argument first
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;

