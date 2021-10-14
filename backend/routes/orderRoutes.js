import express from 'express';
const router = express.Router();

import { addOrderItems, 
         getOrderById, 
         updateOrderToPaid,
         getMyOrders,
         getOrders,
         updateOrder,
         updateOrderToDelivered
} from '../controllers/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// add protect middleware in route
// url/orders/
router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);
    
router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById)
                    // .put(protect, admin, updateOrder);

router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);



export default router;

