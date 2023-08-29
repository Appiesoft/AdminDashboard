import React from 'react'
import SystemSettingsForm from './systemSettings/SystemSettingsForm'
import { Row, Col } from 'react-bootstrap';


const Index = () => {
    return (
        <>
            <Row className='mt-3'>
                <Col><SystemSettingsForm />
                </Col>
            </Row>
        </>
    )
}

export default Index