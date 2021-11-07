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
    })
    
    return (
        <div>
            
        </div>
    )
}

export default ProductCarousel
