import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc        Fetch all products
// @route       GET /api/products
// @access      Public
const getProducts = asyncHandler( async (req, res) => {

    // PAGINATIION functionality
    const pageSize = 2
    const page = Number(req.query.pageNumber) || 1  // ?pageNumber=1 default




    // with 'keyword' QUERY : /api/products?keyword=amazon
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    // output : keyword = { name : {$regex : ''amazon , $options}}

    const count = await Product.count({ ...keyword })


    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    if(products){
        res.json({ products, page, pages: Math.ceil(count / pageSize)})
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
    const { name, category, brand, price, countInStock, description, image } = req.body;
    const product = await Product.findById(req.params.id);
    
    if(product) {
        product.name         = name || product.name;
        product.category     = category || product.category;
        product.brand        = brand || product.brand;
        product.price        = price || product.price;
        product.countInStock = countInStock || product.countInStock;
        product.description  = description || product.description;
        product.image        = image || product.image;
    
        const updatedProduct = await product.save(); 
        res.json(updatedProduct);

    } else {
        res.status(404);
        throw new Error('Product not found!')
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

// @desc        Create new review
// @route       POST /api/products/:id/reviews
// @access      Private
const createProductReview = asyncHandler( async (req, res) => {
    
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
     
    if(product) {
        const alreadyReviewed = product.reviews.find( 
            (r) => r.user.toString() === req.user._id.toString()
        )

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed!')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id 
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce( (acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' })

    } else {
        res.status(404);
        throw new Error('Product not found!')
    }

});

export {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct,
    createProductReview,
}