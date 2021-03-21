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

    useEffect( async () => {
        if(productId) {
            dispatch( addToCart(productId, qty) );
        } 
        
    }, [dispatch, productId, qty]);


    return (
        <div>
        <h1>Cart</h1>
        </div>
    )
}

export default CartScreen;
