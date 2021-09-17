import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { listProductDetails, updateProduct } from '../actions/productActions';

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

// for uploading photo of product
import axios from 'axios';

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id;

    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate } = productUpdate;

    
        useEffect( () => {
            if(successUpdate){
                dispatch({ type: PRODUCT_UPDATE_RESET});
                history.push('/admin/productlist')
            } else {
    
                if(!product.name || product._id !== productId){
                    dispatch( listProductDetails(productId) )
                } else {
                    setCategory(product.category)
                    setBrand(product.brand)
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }
            }
        
        }, [dispatch, history, productId, product, successUpdate]);
    
    
        const submitHandler = (e) => {
            e.preventDefault();

            dispatch( updateProduct({
                _id: productId, 
                category,
                brand,
                name,
                price,
                image,
                countInStock,
                description}) 
            );   
        }


    
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                { loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            
                { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                
                <Form onSubmit={submitHandler}>
                    
                    {/* ---CATEGORY--- */}
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter category'
                            value={category}
                            onChange={ (e) => setCategory(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* ---BRAND--- */}
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter brand'
                            value={brand}
                            onChange={ (e) => setBrand(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>


                    {/* ---NAME--- */}
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter name'
                            value={name}
                            onChange={ (e) => setName(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* ---PRICE--- */}
                    <Form.Group controlId='price'>
                        <Form.Label>Price in $</Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter price'
                            value={price}
                            onChange={ (e) => setPrice(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* ---IMAGE--- */}
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter image url'
                            value={image}
                            onChange={ (e) => setImage(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* ---COUNT IN STOCK--- */}
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count in stock</Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter count in stock'
                            value={countInStock}
                            onChange={ (e) => setCountInStock(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* ---DESCRIPTION--- */}
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as='textarea' 
                            placeholder='Enter description'
                            value={description}
                            onChange={ (e) => setDescription(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
                )}
            
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
