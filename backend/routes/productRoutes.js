import express from 'express';
const router = express.Router();

//add controllers
import { 
    getProducts, 
    getProductById  
} from '../controllers/productController.js'

// Public routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;