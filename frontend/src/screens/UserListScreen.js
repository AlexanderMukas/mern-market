import React, { useState, useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Tab } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listUsers } from '../actions/userActions'

const UserListScreen = () => {
    
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch])
    
    const deleteHandler = (id) => {
        console.log('Delete Handler action!')
    }
    
    return (
        <>
          <h1>Users</h1>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
          : (
              <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>ADMIN</th>

                          {/* empty 'th' for delete button */}
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {users.map( user => (
                        <tr key={user._id}>

                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`} >{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>) 
                                    : (<i className='fas fa-times' style={{ color: 'red'}}></i>)
                                }
                            </td>
                            
                            {/* delete */}
                            <td>
                                <LinkContainer to={`/users/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button 
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                  </tbody>
              </Table>
          )} 
        </>
    )
}

export default UserListScreen;
