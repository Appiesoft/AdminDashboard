import React, { useState } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';

const TipSettingForm = () => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        setValidated(true);
    };
    const [inputValue, setInputValue] = useState({
        tip_status: "",
        calculate_for_percentage: "",
        tip_is_mandatory: ""
    })

    console.log(inputValue)
    const handleOnchange = (e) => {
        const { name, checked } = e.target
        setInputValue({ ...inputValue, [name]: checked })
    }

    const handleOnClick = (item) => {
        setInputValue({ ...inputValue, calculate_for_percentage: item })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='px-3'>
                        <Row className='p-3 mt-3 border'>
                            <Row className='d-flex align-items-center mt-4 mb-3'>
                                <Col>
                                    <Col xl={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <p className='text-dark'>
                                                    Tip Status  :
                                                </p>
                                            </Col>
                                            <Col lg={6} className=''>
                                                <div className='text-dark'>
                                                    <Form>
                                                        <Form.Check type="switch"
                                                            name='tip_status'
                                                            onChange={(e) => handleOnchange(e)}
                                                            id="custom-switch"
                                                            label={inputValue.tip_status === true ? <span className='text-success'>Enable</span> : <span className='text-danger'>Disable</span>} />
                                                    </Form>
                                                </div>

                                            </Col>

                                        </Row>
                                    </Col>
                                </Col>
                                <Col>
                                    <Col xl={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <p className='text-dark'>
                                                    Calculate for percentage :
                                                </p>
                                            </Col>
                                            <Col lg={6} className=''>
                                                <Form >
                                                    <div className=' d-flex justify-content-between'>
                                                        <div className='text-danger'>
                                                            <Form.Check type="radio"
                                                                name="calculate_for_percentage"
                                                                onClick={() => handleOnClick("with_tax")}
                                                                id="custom-switch" label="With tax" />
                                                        </div>
                                                        <div className='text-success'>
                                                            <Form.Check type="radio"
                                                                onClick={() => handleOnClick("without_tax")}

                                                                name='calculate_for_percentage' id="custom-switch" label="Without tax" />
                                                        </div>
                                                    </div>
                                                </Form>

                                            </Col>

                                        </Row>
                                    </Col>
                                </Col>
                            </Row>

                            <Row className='d-flex align-items-center mt-4 mb-3'>
                                <Col>
                                    <Col xl={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <p className='text-dark'>
                                                    Tip is Mandatory  :
                                                </p>
                                            </Col>
                                            <Col lg={6}>
                                                <div className='text-dark'>
                                                    <Form>
                                                        <Form.Check type="switch"
                                                            name='tip_is_mandatory'
                                                            onChange={(e) => handleOnchange(e)}
                                                            id="custom-switch"
                                                            //  label="Yes" 
                                                            label={inputValue.tip_is_mandatory === true ? <span className='text-success'>Yes</span> : <span className='text-danger'>No</span>}
                                                        />
                                                    </Form>
                                                </div>

                                            </Col>

                                        </Row>
                                    </Col>
                                </Col>
                                <Col>
                                    <Col xl={12}>
                                        <Row>
                                            <Col lg={6}>
                                                <p className='text-dark'>
                                                    Default Tips  :
                                                </p>
                                            </Col>
                                            <Col lg={6} className='d-flex justify-content-between'>
                                                <div className='text-danger'>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                    />
                                                </div>
                                                <div className='text-danger ms-3'>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                    />
                                                </div>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Card.Body >
            </Card >
        </>)
}

export default TipSettingForm