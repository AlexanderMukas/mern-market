import express from 'express';
const router = express.Router();

import { addOrderItems, getOrderById } from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

// add protect middleware in route
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;

