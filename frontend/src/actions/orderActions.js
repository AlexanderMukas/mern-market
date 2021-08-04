import axios from 'axios';
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET
} from '../constants/orderConstants';

// создание заказа
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        
        dispatch({ type: ORDER_CREATE_REQUEST })

        // this information from Redux store from ALL STATE
        const { userLogin: { userInfo } } = getState();

        // add token on config
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        // Database POST QUERY
        //pass user in "POST request" in Mongo
        const { data } = await axios.post(
            `/api/orders`,
            order, 
            config 
        );

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// order details
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {

        //for spinner "LOADING..."
        dispatch({ type: ORDER_DETAILS_REQUEST })

        // this information from Redux store from ALL STATE
        const { userLogin: { userInfo } } = getState();

        // add token on config, GET request not need 'Content-type'!
        const config = {
            headers: {
                // 'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        // Database GET QUERY
        // pass user in "POST request" in Mongo
        const { data } = await axios.get(
            `/api/orders/${id}`,
            config 
        );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// оплата заказа
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {

        //for spinner "LOADING..."
        dispatch({ type: ORDER_PAY_REQUEST })

        // this information from Redux store from ALL STATE
        const { userLogin: { userInfo } } = getState();
        // add token on config, GET request not need Content-type!!!
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        // Database PUT QUERY for update
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config );

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}