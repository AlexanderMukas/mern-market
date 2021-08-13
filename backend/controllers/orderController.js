import asyncHandler from 'express-async-handler';

//MongoDB models
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
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    // console.log(order);

    if(order){
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
})


// @desc        Update order to paid
// @route       PUT /api/orders/:id/pay
// @access      Private
const updateOrderToPaid = asyncHandler( async (req, res) => {
    
    //PUT = UPDATE
    const order = await Order.findById(req.params.id);
    // console.log(order);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();

        //payment result from PayPal 
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        //save in MongoDB this staf
        const updatedOrder = await order.save();

        res.json(updatedOrder);

    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
})


// @desc        Get logged in user orders
// @route       GET /api/orders/myorders
// @access      Private
const getMyOrders = asyncHandler( async (req, res) => {
    
    //find from MongoDB
    const orders = await Order.find( { user: req.user._id } );

    //send to frontend
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
}