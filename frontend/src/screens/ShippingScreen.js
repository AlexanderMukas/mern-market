import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';

const ShippingScreen = ( { history } ) => {
    const cart = '';

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState(0);
    const [country, setCountry] = useState('');
    
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
    }

    return (
        <FormContainer>
           <h1>Shipping</h1>
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

export default ShippingScreen;
