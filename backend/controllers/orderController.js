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
            totalPrice,
            shippingPrice
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
    const orders = await Order.find({user: req.user._id});

    //send to frontend
    res.json(orders)
})

// @desc        Get all orders
// @route       GET /api/orders
// @access      Private/Admin
const getOrders = asyncHandler( async (req, res) => {

    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders)
})

// @desc        Update order by ID
// @route       PUT /api/orders/:id
// @access      Private/Admin
const updateOrder = asyncHandler( async (req, res) => {
    const { isPaid, isDelivered } = req.body;
    const order = await Order.findById(req.params.id);
    
    if(order) {
        order.isPaid         = isPaid || order.isPaid;
        order.isDelivered     = isDelivered || order.isDelivered;
    
        const updatedOrder = await order.save(); 
        res.json(updatedOrder);

    } else {
        res.status(404);
        throw new Error('Order not found!')
    }

});

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrder,
}