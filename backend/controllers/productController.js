import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc        Fetch all products
// @route       GET /api/products/
// @access      Public
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find( {} );

    // res.status(401)
    // throw new Error('Not Authorized')
    if(products){
        res.json(products)
    } else {
        res.status(404);
        throw new Error('Products not found!.');
    }
    
});


// @desc        Fetch single product by ID
// @route       GET /api/products/:id
// @access      Public
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

        if(product){
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found!.');
        }
});

// @desc        Update product by ID
// @route       PUT /api/products/:id
// @access      Private/Admin
const updateProduct = asyncHandler( async (req, res) => {

    const product = await Product.findById(req.params.id);
    
    if(product) {
        product.name = req.body.name || product.name;
        product.category = req.body.category || product.category;
        product.brand = req.body.brand || product.brand;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.description = req.body.description || product.description;
    
        const updatedProduct = await product.save();

        res.json({
            _id: updatedProduct._id,
            name: updatedProduct.name,
            category: updatedProduct.category,
            brand: updatedProduct.brand,
            price: updatedProduct.price,
            countInStock: updatedProduct.countInStock,
            description: updatedProduct.description
        })

    } else {
        res.status(404);
        throw new Error('Product not found...')
    }

});

// @desc        Delete product
// @route       DELETE /api/products/:id
// @access      Private/Admin
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        await product.remove() // delete from MongoDB
        res.json({ message: `product: '${product.name}' removed!` })
    } else {
        res.status(404);
        throw new Error('Product not found...')
    }
});

// @desc        Create a new product
// @route       POST /api/products
// @access      Private/Admin
const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save();

    if(createdProduct) {
        res.status(201).json(createdProduct)

    } else {
        res.status(400)
        throw new Error('Invalid product data')
    }
    
});

export {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct,
}