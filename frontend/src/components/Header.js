// rafce + tab
import React from 'react'

import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

// add redux - show userName - not sign in
import {useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/userActions';

const Header = () => {
    
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    // const { loading, error, userInfo } = userLogin;
    const { userInfo } = userLogin;
    
    const logoutHandler = () => {
        dispatch( logout() );
    }
    
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>

                    {/* wrap inside LinkContainer */}

                    <LinkContainer  to="/">
                        <Navbar.Brand>Shop</Navbar.Brand>
                    </LinkContainer>
             
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            <LinkContainer  to="/cart">
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i> Cart
                                </Nav.Link>
                            </LinkContainer>


                            {userInfo ? ( 
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler} >
                                        LogOut
                                    </NavDropdown.Item>
                                </NavDropdown>
                                 
                            )
                            : <LinkContainer  to="/login">
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            </LinkContainer> 
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                
        </header>
    )
}

export default Header
