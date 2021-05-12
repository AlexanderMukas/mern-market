import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutSteps = ( { step1, step2, step3, step4 } ) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                { step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled></Nav.Link> }
            </Nav.Item>
            
        </Nav>
    )
}

export default CheckoutSteps
