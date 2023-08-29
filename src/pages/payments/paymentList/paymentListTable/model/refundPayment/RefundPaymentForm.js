import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Button, Modal } from 'react-bootstrap';
const RefundPaymentForm = ({ parentRefundPayment, childEmptyRefundPayment }) => {
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

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyRefundPayment('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    //table data

    const records = [
        { datetime: 1, doneby: 'TWHf1368', paymentmethod: 'testingtes', refundstatus: 'The Wash House', refundid: '9899884404' },
        { datetime: 1, doneby: 'TWHf1368', paymentmethod: 'testingtes', refundstatus: 'The Wash House', refundid: '9899884404' }
    ];


    useEffect(() => {
        if (parentRefundPayment == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentRefundPayment]);
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Refund Payment</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col>
                            <Row className="mx-auto border-bottom mt-3 pb-3">
                                <Col lg={6}>
                                    <Row>
                                        <Col lg={6} className="fw-bold"> Customer Name :</Col>
                                        <Col lg={6}> Testingtes</Col>
                                        <Col lg={6} className="my-1 fw-bold"> Phone No. </Col>
                                        <Col lg={6} className="my-1"> 4456677888</Col>
                                        <Col lg={6} className="fw-bold">Order Invoice :</Col>
                                        <Col lg={6}> TWHf1368</Col>
                                    </Row>
                                </Col>
                                <Col lg={6}>
                                    <Row>
                                        <Col lg={6} className="fw-bold">Card :</Col>
                                        <Col lg={6}>Not Added</Col>
                                        <Col lg={6} className="my-1 fw-bold">Wallet Balance :</Col>
                                        <Col lg={6} className="my-1">USD 0</Col>
                                        <Col lg={6} className="fw-bold">Order Total : </Col>
                                        <Col lg={6}>USD 45.60</Col>
                                        <Col lg={6} className="my-1 fw-bold">Due Amount :</Col>
                                        <Col lg={6} className="my-1">USD 6.00</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='overflow-auto'>
                                    <Table className="mb-0 mt-3" size="sm">
                                        <thead>
                                            <tr className='bg-light'>
                                                <th class="text-truncate" >Date/Time</th>
                                                <th class="text-truncate" >Done By</th>
                                                <th class="text-truncate">Order Status</th>
                                                <th class="text-truncate">Payment Method</th>
                                                <th class="text-truncate">Refund Status</th>
                                                <th class="text-truncate">Refund ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records.map((record, index) => {
                                                return (
                                                    <tr key={index}>
                                                        {/* <th scope="row">{record.SrNo}</th> */}
                                                        <td class="text-truncate" >{record.datetime}</td>
                                                        <td class="text-truncate">{record.doneby}</td>
                                                        <td class="text-truncate">{record.orderstatus}</td>
                                                        <td class="text-truncate">{record.paymentmethod}</td>
                                                        <td class="text-truncate">{record.refundstatus}</td>
                                                        <td class="text-truncate">{record.refundid}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <hr />

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-0 mt-3">
                                    <Col lg={12}>
                                        <Row className="my-3">
                                            <Col lg={12}>
                                                <Form.Group controlId="validationCustom01">
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>Refund Type :</Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                value='cash'
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12} className="my-2">
                                                <Form.Group controlId="validationCustom01">
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>Refund Reason :</Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                value='0'
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Group controlId="validationCustom01">
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>Amount :</Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                value='40'
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center  mt-4">
                                                <Button type="reset" className="btn btn-danger">
                                                    Cancel
                                                </Button>
                                                <Button type="submit" className="btn btn-success ms-3">
                                                    Refund
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>
        </>)
}

export default RefundPaymentForm