import React from 'react'
import OrderTable from './orderTable/OrderTable'
import { Row, Col } from 'react-bootstrap';

import Header from './Header';

const Index = () => {

    return (
        <>
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>

            <Row>
                <Col>
                    <OrderTable />
                </Col>
            </Row>

        </>
    )
}

export default Index