// rafce + tab
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

// delete because use 'axios'
// import products from '../products';

import axios from 'axios';


const HomeScreen = () => {

    const [products, setProducts] = useState([]);

    useEffect( async () => {
        // console.log('hello')

        const fetchProducts = async () => {
            // const res = await axios.get('/api/products')
            // res.data
            const { data } = await axios.get('/api/products');

            setProducts(data);
        }

        fetchProducts()


    }, []);

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
