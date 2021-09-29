import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Tab, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listAllOrders } from '../actions/orderActions'
import { ORDER_LIST_RESET } from '../constants/orderConstants';

const OrderListScreen = () => {
    return (
        <div>
            Order List !!!
        </div>
    )
}

export default OrderListScreen
