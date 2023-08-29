import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { paymentAdjustmentCreate, paymentAdjustmentList } from '../../../../redux/payment/paymentAdjustment/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import Loader from "../../../../components/MainLoader"




const NewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const paymentAdjustmentCreateStatus = store?.PaymentAdjustmentCreate?.status
    const paymentAdjustmentCreateMessage = store?.PaymentAdjustmentCreate?.message
    const PaymentAdjustmentLoader = store.PaymentAdjustmentCreate;



    const btnChild = () => {
        TableShowBtn()
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const submitData = (data) => {
        dispatch(paymentAdjustmentCreate(
            {
                adjustmentName: data.name,
            }
        ));

    };

    const paymentAdjustmentUpdate = () => {
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
        if (paymentAdjustmentCreateStatus) {
            ToastHandle('success', paymentAdjustmentCreateMessage);
            TableShowBtn()
            paymentAdjustmentUpdate()

        } else if (paymentAdjustmentCreateStatus === false) {
            ToastHandle('error', paymentAdjustmentCreateMessage);
        }

    }, [paymentAdjustmentCreateStatus])



    return (
        <>
            <Card>
                <Card.Body>
                    <Row className='my-3'>
                        <Col className='d-flex justify-content-start'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white ms-2"
                                onClick={btnChild}>
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Payment Adjustment Type List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {PaymentAdjustmentLoader?.loading ? <Loader /> :
                        <Form noValidate onSubmit={handleSubmit(
                            (data) => {
                                submitData(data);
                            },
                            (err) => {
                                console.log(err);
                            }
                        )} className='px-3'>
                            <Row className='p-3 my-3 border mx-auto'>
                                <Col lg={7} className='mx-auto my-3'>
                                    <Row>
                                        <Col lg={6} className='mx-auto'>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Name :</Form.Label></Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('name')}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className='text-center mt-3'>
                                            <Button type="submit" className='btn btn-success'>Save</Button>
                                            <Button type="reset" className='btn btn-light ms-3'>Reset</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>}


                </Card.Body>
            </Card>
        </>)
}

export default NewEnteryForm