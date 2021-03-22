import React, { useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

import Message from '../components/Message';

import { addToCart } from '../actions/cartActions';

// history - for redirect
const CartScreen = ( { match, location, history } ) => {
    const productId = match.params.id;
    // const qty = match.params.qty;
    // location.search => ?qty=1

    const qty = location.search ? Number( location.search.split('=')[1] ) : 1
    // console.log(qty); 
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    // console.log(cartItems);

    useEffect( async () => {
        if(productId) {
            dispatch( addToCart(productId, qty) );
        } 
        
    }, [dispatch, productId, qty]);


    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 
                    ? <Message>Your cart is empty <Link to="/">Go Back</Link></Message> 
                    : <h1>yes</h1>}
            </Col>
            <Col md={2}>
                2
            </Col>
            <Col md={2}>
                3
            </Col>
        </Row>
    )
}

export default CartScreen;
