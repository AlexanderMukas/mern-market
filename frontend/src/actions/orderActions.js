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
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,

} from '../constants/orderConstants';


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })

        // this information from Redux store from ALL STATE
        // add token on config
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        // Database POST QUERY for create new order
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

// all orders logged user
export const listMyOrders = () => async (dispatch, getState) => {
    try {

        //for spinner "LOADING..."
        dispatch({ type: ORDER_LIST_MY_REQUEST })

        // this information from Redux store from ALL STATE
        const { userLogin: { userInfo } } = getState();
        // add token on config, GET request not need Content-type!!!
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/orders/myorders', config);

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// all created orders
export const listAllOrders = () => async (dispatch, getState) => {
    try {
        //for spinner "LOADING..."
        dispatch({ type: ORDER_LIST_REQUEST })

        // this information from Redux store from ALL STATE
        const { userLogin: { userInfo } } = getState();
        // add token on config, GET request not need Content-type!!!
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/orders', config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const updateOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_UPDATE_REQUEST })

        // this information from Redux from ALL STATE
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // only Admin can update users
        const { data } = await axios.put(`/api/orders/${order._id}`, order, config );

        dispatch({ type: ORDER_UPDATE_SUCCESS });

        // for updating order (test this!!!)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}