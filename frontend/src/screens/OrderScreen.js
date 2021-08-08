import React, { useEffect } from 'react';

//for PayPal
import axios from 'axios';

import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Message';

import { Link } from 'react-router-dom';

import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ( { match } ) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();
    
    const orderDetails = useSelector( state => state.orderDetails )
    const { order, loading, error } = orderDetails; 

    useEffect( () => {
        // PAYPAL CLIENT ID
        // <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            console.log(clientId);
        }

        addPayPalScript()



        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

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
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
    </>
}

export default OrderScreen;
