import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import AdvanceSettingForm from './AdvanceSettingForStripeForm/AdvanceSettingForm'

const Index = () => {
    return (
        <>
            <Row>
                <Col className='my-1 ' >
                    <h4 className='border p-2 bg-light'>
                        Advance Setting For Stripe
                    </h4>
                </Col>
            </Row>

            <Row >
                <Col>
                    <AdvanceSettingForm />
                </Col>
            </Row>
        </>)
}

export default Index