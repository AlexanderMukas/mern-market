import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc        Create new order
// @route       POST /api/orders
// @access      Private
const addOrderItems = asyncHandler( async (req, res) => {
    
    // get data from request url
    const { 
        orderItems,
        shippingAddress, 
        paymentMethod, 
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice 
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400); //bad request
        throw new Error('No order items');
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        // save to database mongoDB
        const createdOrder = await order.save();

        res.status(201).json( createdOrder );
    }
})


// @desc        Get order by ID
// @route       GET /api/orders/:id
// @access      Private
const getOrderById = asyncHandler( async (req, res) => {
    
    // get data from request url
    
})


export { addOrderItems }