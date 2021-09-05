import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Tab } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listProducts, deleteProduct } from '../actions/productActions'

const ProductListScreen = ( {history} ) => {
    
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // const productDelete = useSelector(state => state.productDelete);
    // const { success: successDelete } = productDelete;


    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
       
    }, [dispatch, history, userInfo ])
    
    const deleteHandler = (id) => {

        console.log('Delete Handler action!' + id);

        // if(window.confirm('Are you sure')){
        //     dispatch( productUser(id) );
        // }
        
    }
    
    return (
        <>
          <h1>Products</h1>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
          : (
              <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>CATEGORY</th>
                          <th>BRAND</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>COUNT IN STOCK</th>

                          {/* empty 'th' for delete button */}
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {products.map( product => (
                        <tr key={product._id}>

                            <td>{product._id}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.countInStock}</td>
                            
                            {/* delete */}
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button 
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;

