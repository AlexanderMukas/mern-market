import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listAllOrders } from '../actions/orderActions'

const OrderListScreen = ( {history} ) => {

    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            // history.push('/login')
            history.push('/')

        } else {
            dispatch( listAllOrders() );
        }
        
       
    }, [dispatch, history, userInfo]) 

    return (
        <>
          <h1>Orders</h1>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
          : (
              <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                      <tr>
                          <th>№</th>
                          <th>ORDER ID</th>
                          <th>USER</th>
                          <th>DATE</th>
                          <th>TOTAL PRICE</th>
                          <th>PAID</th>
                          <th>DELIVERED</th>
                      </tr>
                  </thead>
                  <tbody>
                    {orders.map( (order, iter) => (

                        <tr key={order._id}>
                            <td>{iter+1}</td>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>$ {order.totalPrice}</td>
                            
                            <td>
                                {order.isPaid ? (
                                    order.paidAt.substring(0,10)
                                ) : (<i className='fas fa-times' style={{ color: 'red'}}></i>)
                                }
                            </td>

                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0,10)
                                ) : (<i className='fas fa-times' style={{ color: 'red'}}></i>)
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>
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
