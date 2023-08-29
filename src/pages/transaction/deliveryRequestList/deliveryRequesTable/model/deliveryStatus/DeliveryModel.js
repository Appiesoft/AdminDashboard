import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';

const DeliveryModel = ({ parentDelivery, childEmptyDelivery }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyDelivery("")
    };

    const openModalWithSize = (data) => {
        setSize(null);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentDelivery == "lg") {
            openModalWithSize("lg");
        }
    }, [parentDelivery]);
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className='bg-light'>
                    <h4 className="modal-title">Delivery Status</h4>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex align-items-center'>
                            <Col lg={4} className='fw-bold'>Delivery Request Id :</Col>
                            <Col lg={8} className='input_outline border'><input type="text" className='w-100 input_outline border py-1' value="DEL124" disabled /></Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex align-items-center my-2'>
                            <Col lg={4} className='fw-bold'>Customer Name :</Col>
                            <Col lg={8} className='input_outline border'><input type="text" className='w-100 input_outline border py-1' value="AJtester " disabled /></Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex align-items-center '>
                            <Col lg={4} className='fw-bold'>Delivery Status :</Col>
                            <Col lg={8} className='input_outline border'>
                                <Form.Group className="" placeholder='Member Group'>
                                    <Form.Select id="disabledSelect" aria-label="Default select example" placeholder='Member Group' required>
                                        <option hidden>Schedule</option>
                                        <option value="1">B select</option>
                                        <option value="2">C select</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggle}>
                        Reset
                    </Button>{' '}
                    <Button variant="success" onClick={toggle}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>        </>
    )
}

export default DeliveryModel