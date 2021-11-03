import React from 'react';

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

// товар детализированно 
import ProductScreen from './screens/ProductScreen';

// корзина заказов 
import CartScreen from './screens/CartScreen';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// Login/Registration
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import ProfileScreen from './screens/ProfileScreen';
// step1 step2 step3 step4
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

import OrderListScreen from './screens/OrderListScreen';

// import SearchBox from './components/SearchBox';
// import OrderEditScreen from './screens/OrderEditScreen';

const App = () => {
  return (
    <Router>
        <Header />

        <main className="py-3">
          <Container>

            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />

            <Route path='/order/:id' component={OrderScreen} />

            <Route path='/payment' component={PaymentScreen} />

            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />

            <Route path='/profile' component={ProfileScreen} />

            <Route path='/product/:id' component={ProductScreen} />

            <Route path='/cart/:id?' component={CartScreen} />

            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />

            <Route path='/admin/productlist' component={ProductListScreen} exact />
            <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact/>

            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

            <Route path='/admin/orderlist' component={OrderListScreen} />

                        {/* pagination and search */}
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />

            <Route path='/' component={HomeScreen} exact />

          </Container>
        </main> 

        <Footer />
    </Router>
  );
}

export default App;
