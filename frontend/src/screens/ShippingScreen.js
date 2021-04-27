import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';

const ShippingScreen = ( { history } ) => {
    const [address, useAddress] = useState('');
    
    return (
        <div>
           Shipping Page here...
        </div>
    )
}

export default ShippingScreen;
