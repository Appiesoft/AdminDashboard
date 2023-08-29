import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import PaymentSettingTable from './paymentSettingTable/PaymentSettingTable'
const Index = () => {
    return (
        <>
            <Row>
                <Col className='my-1'>
                    <h4 className='border p-2 bg-light'>
                        Please select the payment gateways through which yours customers can pay you from the online payment link on the invoices.

                    </h4>
                </Col>
            </Row>
            <Row >
                <Col>
                    <PaymentSettingTable />
                </Col>
            </Row>
        </>)
}

export default Index