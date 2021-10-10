import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Tab, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listAllOrders } from '../actions/orderActions'
// import { ORDER_LIST_RESET } from '../constants/orderConstants';

const OrderListScreen = ( {history, match} ) => {

    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // const orderDelete = useSelector(state => state.orderDelete);
    // const { 
    //     loading: loadingDelete, 
    //     error: errorDelete, 
    //     success: successDelete 
    // } = orderDelete;


    useEffect(() => {
        // dispatch({type: PRODUCT_CREATE_RESET});

        if(!userInfo.isAdmin){
            history.push('/login')
        } else {
            dispatch( listAllOrders() );
        }
        
       
    }, [dispatch, history, userInfo]) // add successDelete


    const deleteHandler = (id) => {
        console.log(`delete order ${id}`);

        // if(window.confirm('Are you sure?')){
        //     dispatch( deleteOrder(id) );
        // }
        
    }


    return (
        <>
          <h1>Orders</h1>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
          : (
              <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                      <tr>
                          <th>№</th>
                          <th>ID</th>
                          <th>USERNAME</th>
                          <th>TOTAL PRICE</th>
                          <th>IS PAID</th>
                          <th>IS DELIVERED</th>
                          <th>CREATED AT</th>
                          <th>UPDATED AT</th>

                          {/* empty 'th' for delete button */}
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {orders.map( (order, iter) => (

                        <tr key={order._id}>
                            <td>{iter+1}</td>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.totalPrice}</td>
                            
                            <td>
                                {order.isPaid ? (<i className='fas fa-check' style={{color: 'green'}}></i>) 
                                    : (<i className='fas fa-times' style={{ color: 'red'}}></i>)
                                }
                            </td>

                            <td>
                                {order.isDelivered ? (<i className='fas fa-check' style={{color: 'green'}}></i>) 
                                    : (<i className='fas fa-times' style={{ color: 'red'}}></i>)
                                }
                            </td>
                            
                            <td>{order.createdAt}</td>
                            <td>{order.updatedAt}</td>

                            {/* delete */}
                            <td>
                                <LinkContainer to={`/admin/order/${order._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button 
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(order._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                  </tbody>
              </Table>
          )} 
        </>
    )
}

export default OrderListScreen
