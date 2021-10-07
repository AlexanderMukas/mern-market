import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { getOrderDetails, updateOrder } from '../actions/orderActions';

import { ORDER_UPDATE_RESET } from '../constants/orderConstants';


const OrderEditScreen = ( {match, history} ) => {
    const orderId = match.params.id;

    const [isPaid, setIsPaid] = useState(false);
   
    const [isDelivered, setIsDelivered] = useState(false);

    const dispatch = useDispatch();
    
    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, order } = orderDetails;

    // console.log(`loading: ${loading}`);
    // console.log(`error: ${error}`);
    // console.log(`order: ${order}`);

    const orderUpdate = useSelector(state => state.orderUpdate);
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate } = orderUpdate;

    
        useEffect( () => {
            if(successUpdate){
                dispatch({ type: ORDER_UPDATE_RESET});
                history.push('/admin/orderlist')
            } else {
    
                if(order._id !== orderId){
                    dispatch( getOrderDetails(orderId) )
                } else {
                    setIsPaid(order.isPaid)
                    setIsDelivered(order.isDelivered)
                }
            }
        
        }, [dispatch, history, orderId, order, successUpdate ]);
    
    
        const submitHandler = (e) => {
            e.preventDefault();

            dispatch( updateOrder({_id: orderId, isPaid, isDelivered}) );   
        }

    return (
        <>
            <Link to='/admin/orderlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Order</h1>
                { loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            
                { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                
                <Form onSubmit={submitHandler}>
                    
                    {/* ---IS PAID--- */}
                    <Form.Group controlId='ispaid'>
                        
                        <Form.Check
                            type='checkbox' 
                            label='Is Paid'
                            checked={isPaid}
                            onChange={ (e) => setIsPaid(e.target.checked)}
                        > 
                        </Form.Check>
                    </Form.Group>

                    {/* ---IS DELIVERED--- */}
                    <Form.Group controlId='isdelivered'>
                        
                        <Form.Check
                            type='checkbox' 
                            label='Is Delivered'
                            checked={isDelivered}
                            onChange={ (e) => setIsDelivered(e.target.checked)}
                        > 
                        </Form.Check>
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
