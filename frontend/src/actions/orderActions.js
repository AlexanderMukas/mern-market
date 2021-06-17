import axios from 'axios';
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        
        dispatch({ type: ORDER_CREATE_REQUEST })

        // this information from Redux from ALL STATE
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

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