import React, { useEffect, useDispatch, useSelector } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loader from './Loader';
import Message from './Message';
import { getTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector( state => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect( () => {
        dispatch( getTopProducts() );
    }, [dispatch])
    
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : (
            <Carousel pause='hover' className='bg-dark'>
                {products.map( product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/api/products/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
}

export default ProductCarousel
