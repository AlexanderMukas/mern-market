// rafce + tab

import React, {useEffect} from 'react';

import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions'

const HomeScreen = ( {match} ) => {

    // CHEACK THE KEYWORD
    // from url, like "http://localhost:3000/search/Sony"
    // keyword = "Sony"
    const keyword = match.params.keyword; 

    // PAGINATION
    const pageNumber = match.params.pageNumber || 1; 

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect( async () => {

        dispatch( listProducts(keyword, pageNumber) );

    }, [dispatch, keyword]);

    return (
        <>
            <h1>Latest products</h1>
            {loading ? (
                <Loader />
            ) : error ? ( 
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map( product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

                            <Product product={product} />

                        </Col>
                    ))}
                </Row> 
                )
            }
            
        </>
    )
}

export default HomeScreen;
