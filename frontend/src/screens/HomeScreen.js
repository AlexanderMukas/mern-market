// rafce + tab
import React from 'react';
import products from '../products';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
    return (
        <>
            <h1>Latest produts</h1>
            <Row>
                {products.map( product => {
                    <Col sm={12} md={6} lg={4} xl={3}>

                        {/* <Product /> */}

                        <h3>{product.name}</h3>

                    </Col>
                })}

            </Row>
        </>
    )
}

export default HomeScreen;
