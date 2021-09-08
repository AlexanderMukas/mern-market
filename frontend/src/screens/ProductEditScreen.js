import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { listProductDetails, updateProduct } from '../actions/productActions';

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id;

    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

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
                    dispatch(listProductDetails(productId))
                } else {
                    setCategory(product.category)
                    setBrand(product.brand)
                    setName(product.name)
                    setPrice(product.price)
                }
            }
        
        }, [dispatch, productId, product, successUpdate, history]);
    
    
        const submitHandler = (e) => {
            e.preventDefault();
    
            dispatch( updateProduct({_id: productId, category, brand, name, price }) );
    
          
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
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter price'
                            value={price}
                            onChange={ (e) => setPrice(e.target.value) }
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
