import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Table, Button, Modal, Spinner } from 'react-bootstrap';
import Item from 'antd/es/list/Item';
// import FormInput from "../../../../components/FormInput"



const WalletEdit = ({ parentEdit, childEmptyEdit }) => {
    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyEdit('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    // end model
    const records = [
        { hash: '', transid: '', transdate: 'Wallter Balance', credit: '', debit: '', paymentremark: '', notes: '0', action: '' },
    ];


    useEffect(() => {
        if (parentEdit == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEdit]);

    return (
        <>
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
                                                    <h4>Add Amount:</h4>
                                                </Col>
                                                <Col lg={7}>
                                                    <Form.Control
                                                        required
                                                        type="text"

                                                        isValid={false}
                                                        isInvalid={false}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                                <Col lg={3} className='ms-4'>
                                                    <Button type="button" className="btn btn-primary rounded-pill py-1 px-3">Proceed</Button>
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
                                                            Credit
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Debit
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Payment Remark
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Notes
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {records?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>

                                                                <th className="text-truncate">{item.hash}</th>
                                                                <th className="text-truncate">{item.transid}</th>
                                                                <th className="text-truncate">{item.transdate}</th>
                                                                <th className="text-truncate">{item.credit}</th>
                                                                <th className="text-truncate">{item.debit}</th>
                                                                <th className="text-truncate">{item.paymentremark}</th>
                                                                <th className="text-truncate">{item.notes}</th>
                                                                <th className="text-truncate">{item.action}</th>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WalletEdit