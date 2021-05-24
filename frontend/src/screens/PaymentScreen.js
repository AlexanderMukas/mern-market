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
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check 
                        type='radio' 
                        label='PayPal or Credit Card' 
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        onChange={ (e) => setPaymentMethod(e.target.value)}
                        checked
                    >
                    </Form.Check>

                    {/* second payment method */}
                    <Form.Check 
                        type='radio' 
                        label='Stripe' 
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={ (e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>



                </Col>
            
                <Button type='submit' variant='primary'>
                    Continue
                </Button>

           </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
