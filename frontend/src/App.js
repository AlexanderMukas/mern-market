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


const App = () => {
  return (
    <Router>
        <Header />

        <main className="py-3">
          <Container>

            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />

            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />

            <Route path='/profile' component={ProfileScreen} />

            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/' component={HomeScreen} exact />

          </Container>
        </main> 

        <Footer />
    </Router>
  );
}

export default App;
