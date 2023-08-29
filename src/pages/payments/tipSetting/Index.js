import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import TipSettingForm from './tipSettingForm/TipSettingForm';
const Index = () => {
    return (
        <>
            <Row>
                <Col className='my-1 ' >
                    <h4 className='border p-2 bg-light'>
                        Tip Setting
                    </h4>
                </Col>
            </Row>
            <Row >
                <Col>
                    <TipSettingForm />
                </Col>
            </Row>
        </>)
}

export default Index