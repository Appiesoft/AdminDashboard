import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Table, Button, Modal, Spinner } from 'react-bootstrap';
import Item from 'antd/es/list/Item';

function CreditAmountEdit({ parentCredit, childCloseBtn }) {
    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [phoneCode, setPhoneCode] = useState("+91")


    const toggle = () => {
        setModal(!modal);
        childCloseBtn('');
    };

    const openModalWithEditModel = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };
    // end model

    useEffect(() => {
        if (parentCredit == 'lg') {
            openModalWithEditModel('lg');
        }
    }, [parentCredit]);

    return (
        <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
            <Modal.Header onHide={toggle} closeButton className="bg-light ">
                <h4 className="modal-title ">Edit Record</h4>
            </Modal.Header>
            <Modal.Body className="p-0 ">
                <div>
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col lg={12} className="align-items-center d-flex justify-content-between">
                                            <Col lg={2}>
                                                <h4>Credit Limit :</h4>
                                            </Col>
                                            <Col lg={7}>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    isValid={false}
                                                    isInvalid={false}
                                                />
                                            </Col>
                                            <Col lg={3} className='ms-4'>
                                                <Button type="button" className="btn btn-primary rounded-pill py-1 px-3">Update</Button>
                                            </Col>
                                        </Col>

                                        <Table className="mb-0 mt-3" size="sm">
                                            <thead>
                                                <tr className="bg-light">

                                                    <th scope="col" className="text-truncate">
                                                        #
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        #Trans ID
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Trans Date
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Credit Use
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Payment
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className="text-truncate"></th>
                                                    <th className="text-truncate"></th>
                                                    <th className="text-truncate">Payable Amount</th>
                                                    <th className="text-truncate"></th>
                                                    <th className="text-truncate"></th>
                                                    <th className="text-truncate"></th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>)
}

export default CreditAmountEdit