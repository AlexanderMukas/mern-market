import express from 'express';
const router = express.Router();

import { addOrderItems } from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

// add protect middleware in route
router.route('/').post(protect, addOrderItems);

export default router;

