import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Tab, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listAllOrders } from '../actions/orderActions'
import { ORDER_LIST_RESET } from '../constants/orderConstants';

const OrderListScreen = () => {

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
            dispatch(listProducts());
        }
        
       
    }, [dispatch, history, userInfo, successDelete])


    const deleteHandler = (id) => {
        console.log(`delete order ${id}`);

        // if(window.confirm('Are you sure?')){
        //     dispatch( deleteOrder(id) );
        // }
        
    }


    return (
        <div>
            Order List !!!
        </div>
    )
}

export default OrderListScreen
