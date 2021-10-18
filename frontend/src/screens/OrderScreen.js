import React, { useState, useEffect } from 'react';

//for PayPal
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

// Bootstrap
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

// Redux
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Message';

import { Link } from 'react-router-dom';

// Actions
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = ( { history, match } ) => {
    const orderId = match.params.id;

    const [ sdkReady, setSdkReady ] = useState(false);

    const dispatch = useDispatch();
    
    const orderDetails = useSelector( state => state.orderDetails )
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector( state => state.orderPay )
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector( state => state.orderDeliver )
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect( () => {
        if(!userInfo){
            history.push('/login');
        }

        // Dynamically adding the PAYPAL Script on HTML BODY
        // <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            console.log(clientId);     // for TEST

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => setSdkReady(true);
            document.body.appendChild(script)
        }

        // addPayPalScript()              // for TEST

        if(!order || successPay || successDeliver) {
            // console.log('order=', order);
            // console.log('successPay=', successPay);

            dispatch( { type: ORDER_PAY_RESET}) // Because it has already been paid for.
            dispatch( { type: ORDER_DELIVER_RESET}) 

            dispatch(getOrderDetails(orderId))
            
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript();
            }
        } else {
            setSdkReady(true);
        }


        
    }, [dispatch, orderId, successPay, order])

    //// calculate prices on Order Screen
    // fixed tax 15% for some USA state : 0.15
    // toFixed - 0.00 price
    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2) 
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce( 
            (acc, item) => acc + item.price * item.qty,
            0
        ));
        order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100 )
        order.taxPrice = addDecimals( Number( (0.15 * order.itemsPrice).toFixed(2)) );
        order.totalPrice = ( 
            Number(order.itemsPrice) + 
            Number(order.shippingPrice) + 
            Number(order.taxPrice)
        ).toFixed(2);
    }

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    }

    const deliverHandler = () => {
        dispatch( deliverOrder(order) )
    }
    
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <> 
        <h1>Order: {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name},</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                            </p>

                            {/* Delivering Check */}
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message>
                            }

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {/* Paid Check */}
                            {order.isPaid ? <Message variant='success'>Paid on {order.paymentMethod}</Message> :
                                <Message variant='danger'>Not Paid</Message>
                            }

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 
                            ? <Message>Order is empty</Message>
                            : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map( (item, index)=> (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                {/* Image column */}
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                
                                                {/* Product name and link column */}
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                {/* Qty and price column */}
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                    }
                                </ListGroup>
                            )}

                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* && - like THEN */}
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton 
                                          amount={order.totalPrice} 
                                          onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button 
                                        type='button' 
                                        className='btn btn-block' 
                                        onClick={deliverHandler}
                                    >
                                        Mark as Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
    </>
}

export default OrderScreen;
