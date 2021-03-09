import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

import Product from '../models/productModel.js';

// path '/api/products'...

router.get('/', asyncHandler(async (req, res) => {
    // find all products
    const products = await Product.find( {} );

    res.json(products)
}));


router.get('/:id', (req, res) => {
    const product = products.find( prod => prod._id === req.params.id);
    res.json(product);
});











export default router;