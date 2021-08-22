import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//add all reducers for combine in ONE summaru REDUCER
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
    userLoginReducer, 
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer
} from './reducers/userReducers';

import { orderCreateReducer, 
         orderDetailsReducer, 
         orderPayReducer,
         orderListMyReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
    productList:        productListReducer,
    productDetails:     productDetailsReducer,
    cart:               cartReducer,
    userLogin:          userLoginReducer,
    userRegister:       userRegisterReducer,
    userDetails:        userDetailsReducer,
    userUpdateProfile:  userUpdateProfileReducer,
    userList:           userListReducer,
    orderCreate:        orderCreateReducer,
    orderDetails:       orderDetailsReducer,
    orderPay:           orderPayReducer,
    orderListMy:        orderListMyReducer,
});


// for Cart
const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [] 

// for User Login
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

// shipping address from storage (form -> storage .. storage -> init state)

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {}


// global init state of react app
const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress : shippingAddressFromStorage 
    },
    userLogin: { userInfo: userInfoFromStorage},
};

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools( applyMiddleware(...middleware) ) 
);

export default store;