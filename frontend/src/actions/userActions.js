import axios from 'axios';
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET
} from '../constants/userConstants';

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        //for spinner "LOADING..."
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config );
        // data : 
        // {
        //     "_id": "6047da4cd853c880e2c69e23",
        //     "name": "Alex Ivanov",
        //     "email": "a.ivanov@example.com",
        //     "isAdmin": false,
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDdkYTRjZDg1M2M4ODBlMmM2OWUyMyIsImlhdCI6MTYxNzAyNzExMSwiZXhwIjoxNjE5NjE5MTExfQ.EkqCfS0FT3wCI9HKwO3KFF0h2NHfKtx_YAwvRCflsPA"
        // }

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT});
    // for delete session
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name,  email, password }, config );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({ type: USER_DETAILS_REQUEST })

        // this information from Redux from ALL STATE
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}`, 
            config 
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// getState for send the TOKEN
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

        // this information from Redux from ALL STATE
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        //pass user in PUT request in Mongo
        const { data } = await axios.put(
            `/api/users/profile`,
            user, 
            config 
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}