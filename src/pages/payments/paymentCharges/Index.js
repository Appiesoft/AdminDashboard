import React from 'react'
import { Row, Col } from 'react-bootstrap';
import PaymentChargesForm from './PaymentChargesForm/PaymentChargesForm'

const Index = () => {
    return (
        <>
            <Row>
                <Col className='my-1 ' >
                    <h4 className='border p-2 bg-light'>
                        Payment Charges
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PaymentChargesForm />
                </Col>
            </Row>
        </>)
}

export default Index