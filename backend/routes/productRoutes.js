import express from 'express';
const router = express.Router();

//add controllers
import { 
    getProducts, 
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js';
// put middleware on first argument first

// Public routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// /api/products/...
router
    .route('/:id')
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;