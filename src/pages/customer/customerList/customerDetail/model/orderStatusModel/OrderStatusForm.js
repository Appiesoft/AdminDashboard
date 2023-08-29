import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal, Spinner } from 'react-bootstrap';


const OrderStatusForm = ({ parentCustomerDetailEdit, childEmptyCustomerDetailEdit }) => {
    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyCustomerDetailEdit('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    // end model

    useEffect(() => {
        if (parentCustomerDetailEdit == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentCustomerDetailEdit]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Row className="mb-0 mt-3">
                                        <Col lg={12}>
                                            <Row className="my-3">
                                                <Col lg={12}>
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Invoice No:</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    value='TWHF1384'
                                                                    disabled
                                                                />
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12} className="my-2">
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Customer Name :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    value='Jeffin Shahji'
                                                                    disabled
                                                                />
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12} >
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Order Amount :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    value='2210.0'
                                                                    disabled
                                                                />
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12} className="my-2">
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Order status :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Select enabled>
                                                                    <option>Disabled select</option>
                                                                    <option>Disabled select</option>
                                                                    <option>Disabled select</option>
                                                                    <option>Disabled select</option>
                                                                    <option>Disabled select</option>

                                                                </Form.Select>
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12}>
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Order Notes :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    value=''

                                                                />
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12} className="my-2">
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Payment Date :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    value='08-Feb-2-2023'

                                                                />
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg={12} className="text-center   mt-4">
                                                    <Button type="submit" className="btn btn-success">
                                                        Update
                                                    </Button>
                                                    <Button type="submit" className="btn btn-secondary ms-3">
                                                        Reset
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderStatusForm
