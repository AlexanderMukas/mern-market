// rafce + tab

import React, {useEffect} from 'react';

import { Row, Col, Pagination } from 'react-bootstrap';

import Product from '../components/Product';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions'

// REACT-HELMET
// import { Helmet } from 'react-helmet';
import Meta from '../components/Meta';

const HomeScreen = ( {match} ) => {

    // CHEACK THE KEYWORD
    // from url, like "http://localhost:3000/search/Sony"
    // keyword = "Sony"
    const keyword = match.params.keyword; 

    // PAGINATION
    const pageNumber = match.params.pageNumber || 1; 

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    // const { loading, error, products } = productList;
    const { loading, error, products, page, pages } = productList;

    useEffect( async () => {
        dispatch( listProducts(keyword, pageNumber) );
    }, [dispatch, keyword, pageNumber]);

    return (
        <>  
            {/* <Helmet>
                <title>Welcome to eMarket | HOME</title>
                <meta name='description' content='We sell the best products for cheap' />
                <meta name='keywords' content='electronics, buy electronics, cheap devices' />

            </Helmet> */}

            {/* <Meta title='xxx' description='' keywords='' /> */}
            
            <Meta />

            {!keyword && <ProductCarousel /> }
            <h1>Latest products</h1>
            {loading ? (
                <Loader />
            ) : error ? ( 
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map( product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

                                <Product product={product} />

                            </Col>
                        ))}
                    </Row>
                    <Paginate 
                        pages={pages} 
                        page={page} 
                        keyword={keyword ? keyword : ''} 
                    />
                </>
                )
            }
        </>
    )
}

export default HomeScreen;
