// rafce + tab
// import React, { useState, useEffect } from 'react';

import React, {useEffect} from 'react';

import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

// delete because use 'axios'
// import products from '../products';

// delete axios, because we use redux
// import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js'

const HomeScreen = () => {
    // delete, because use redux
    // const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;


    useEffect( async () => {
        // const fetchProducts = async () => {
        //     // const res = await axios.get('/api/products')
        //     // res.data
        //     const { data } = await axios.get('/api/products');
        //     setProducts(data);
        // }
        // fetchProducts()
        dispatch( listProducts() );
    }, [dispatch]);

    // const products = [];

    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {products.map( product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

                        <Product product={product} />

                        {/* <h3>{product.name}</h3> */}

                    </Col>
                ))}

            </Row>
        </>
    )
}

export default HomeScreen;
