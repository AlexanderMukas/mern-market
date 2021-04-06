import axios from 'axios';
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/userConstants';

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

export const logout = () => async (dispatch) => {
    try {
        
        dispatch({
            type: USER_LOGOUT,
        })
        localStorage.setItem('userInfo', JSON.stringify({ }));


    } catch (error) {
        console.log(error);
    }
}