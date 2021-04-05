import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { login } from '../actions/userActions';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();





    // button Login or Sign In
    const loginHandler = () => {
        // history.push(`/cart/${match.params.id}?qty=${qty}`);  //redirect

    }

    return (
        <>
            <Form>

            
                <Row>
                    <Col>
                    
                    </Col>
                </Row>

                <Row>
                    <Col>
                    
                    </Col>
                </Row>

                <Row>
                    <Col>
                    
                    </Col>
                </Row>

                <Row>
                    <Col>
                    
                    </Col>
                </Row>
            </Form>
            
        </>
    )
}

export default LoginScreen
