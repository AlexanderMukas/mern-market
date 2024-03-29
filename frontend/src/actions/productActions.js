import axios from 'axios';
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    // PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    // PRODUCT_CREATE_RESET,
} from '../constants/productConstants.js';


// add keyword and pageNumber
export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        //for spinner "LOADING..."
        dispatch({ type: PRODUCT_LIST_REQUEST })

        // without keyword:
        // const { data } = await axios.get('/api/products');

        // with keyword
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        //for spinner "LOADING..."
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        // this information from Redux from ALL STATE
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // only Admin can update users
        const { data } = await axios.put(`/api/products/${product._id}`, product, config );

        dispatch({ type: PRODUCT_UPDATE_SUCCESS });

        // for updating product
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        // this information from Redux from ALL STATE
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // only Admin can detele products
        await axios.delete(`/api/products/${id}`, config );

        dispatch( {type: PRODUCT_DELETE_SUCCESS} );

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        // this information from Redux from ALL STATE
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                // 'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // only Admin can
        const { data } = await axios.post('/api/products', {} , config );

        dispatch({ 
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        // get state from store
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`, review , config );

        dispatch({ 
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const getTopProducts = () => async (dispatch) => {
    try {
        //for spinner "LOADING..."
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get('/api/products/top');

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

