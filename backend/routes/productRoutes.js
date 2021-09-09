import express from 'express';
const router = express.Router();

import { protect, admin } from '../middleware/authMiddleware.js';
// put middleware on first argument first

import { 
    getProducts, 
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

// /api/products/...
router.route('/').get(getProducts);

router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;