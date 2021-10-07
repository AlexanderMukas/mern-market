import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { listProductDetails, updateProduct } from '../actions/productActions';

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const OrderEditScreen = () => {

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

                        <Form.File 
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                        {uploading && <Loader />}
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

export default OrderEditScreen
