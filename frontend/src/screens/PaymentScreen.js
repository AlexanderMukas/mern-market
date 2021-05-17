import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { savePaymentMethod } from '../actions/cartActions';

// shipping - delivery

const PaymentScreen = ( { history } ) => {
    // get shippingAddress from Store 
    // подтягивается адрес доставки из сохраненных данных в Store
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress){
        history.push('/shipping')
    }

    // const [paymentMethod, setPaymentMethod] = useState(savePaymentMethod);
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        
        // console.log('submit');
        dispatch( savePaymentMethod(paymentMethod) );
        history.push('/placeorder');
        
    }

    return (
        <FormContainer>

            <CheckoutSteps step1 step2 step3 />

           <h1>Payment Method</h1>
           <Form onSubmit={submitHandler}>
                {/* ---ADDRESS--- */}
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter city address'
                        value={address}
                        required
                        onChange={ (e) => setAddress(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                {/* ---CITY--- */}
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter city'
                        value={city}
                        onChange={ (e) => setCity(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                {/* ---POSTALCODE--- */}
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control 
                        type='number' 
                        placeholder='Enter postal code'
                        value={postalCode}
                        onChange={ (e) => setPostalCode(e.target.value)}
                    > 
                    </Form.Control>
                </Form.Group>

                {/* ---COUNTRY--- */}
                <Form.Group controlId='country'>
                    <Form.Label>Set country</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Country'
                        value={country}
                        onChange={ (e) => setCountry(e.target.value)}
                    > 
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>

           </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
