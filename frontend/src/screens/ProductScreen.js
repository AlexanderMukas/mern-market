import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ( {match} ) => {

    // find single product, params = :id in URL, backend will do it later    
    const product = products.find( product => product._id === match.params.id);
    // console.log(product.brand);
    
    
    return (
        <div>
            {product.name}
        </div>
    )
}

export default ProductScreen;
