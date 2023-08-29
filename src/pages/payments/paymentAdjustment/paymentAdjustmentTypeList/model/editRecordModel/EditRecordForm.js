import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { paymentAdjustmentUpdate, paymentAdjustmentList } from '../../../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../../../helpers/toastMessage';
import Loader from "../../../../../../components/MainLoader"

const EditRecordForm = ({ parentEditRecord, childEmptyEditRecord, paymentEditData }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const paymentAdjustmentUpdateStatus = store?.PaymentAdjustmentUpdate?.status
    const paymentAdjustmentUpdateMessage = store?.PaymentAdjustmentUpdate?.message
    const PaymentAdjustmentLoader = store?.PaymentAdjustmentUpdate;
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
    const [paymentAdjustmentEdit, setPaymentAdjustmentEdit] = useState([])
    console.log(paymentAdjustmentEdit)

    const toggle = () => {
        setModal(!modal);
        childEmptyEditRecord('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    const handelEdit = (e) => {
        const { name, value } = e.target
        setPaymentAdjustmentEdit({ ...paymentAdjustmentEdit, [name]: value })
    }

    const handelSubmit = () => {
        dispatch(paymentAdjustmentUpdate(
            {
                adjustmentId: paymentAdjustmentEdit.id,
                adjustmentName: paymentAdjustmentEdit.type
            }
        ))

    }

    const paymentAdjustment = () => {
        dispatch(paymentAdjustmentList(
            {
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
                from: "",
                to: "",
                driverId: "",
                chooseFor: ""
            }
        ));
    }

    useEffect(() => {
        if (parentEditRecord == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditRecord]);

    useEffect(() => {
        if (paymentEditData?.id) {
            setPaymentAdjustmentEdit(paymentEditData)
        }
    }, [paymentEditData])

    useEffect(() => {
        if (paymentAdjustmentUpdateStatus) {
            ToastHandle('success', paymentAdjustmentUpdateMessage);
            toggle();
            paymentAdjustment()

        } else if (paymentAdjustmentUpdateStatus === false) {
            ToastHandle('error', paymentAdjustmentUpdateMessage);
        }

    }, [paymentAdjustmentUpdateStatus])
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card className='mb-0'>
                                    <Card.Body>
                                        {PaymentAdjustmentLoader?.loading ? <Loader /> : <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            name='type'
                                                                            value={paymentAdjustmentEdit.type}
                                                                            onChange={(e) => handelEdit(e)}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className="text-center  mt-4">
                                                            <Button type="submit" onClick={handelSubmit} className="btn btn-success">
                                                                Update
                                                            </Button>
                                                            <Button type="reset" className="btn btn-light ms-3">
                                                                Reset
                                                            </Button>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>}

                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>
        </>)
}

export default EditRecordForm