import express from 'express';
const router = express.Router();

//add controllers
import { 
    getProducts, 
    getProductById  
} from '../controllers/productController.js'

// @desc        Fetch all products
// @route       GET /api/products/
// @access      Public
// router.get('/', getProducts);


// @desc        Fetch single product by ID
// @route       GET /api/products/:id
// @access      Public
// router.get('/:id', getProductById);

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;