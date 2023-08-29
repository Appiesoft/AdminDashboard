import React from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Field from '../../../../components/Form Components/Field';
import { initialValues, validationSchema } from './FormData';

const RefundPayment = ({ show, onHide }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    const onSubmit = (data) => {
        console.log('Data:', data);
    };

    return (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="d-block">
                    <h4>Refund Payment</h4>
                    <hr />
                </div>
                <Row>
                    <Col lg={6} className="my-1">
                        <div className="d-flex">
                            <span>Customer Name:&nbsp;</span>
                            <span className="fw-bold">Sahil</span>
                        </div>
                        <div className="d-flex">
                            <span>Mobile Number:&nbsp;</span>
                            <span className="fw-bold">+91 987655442</span>
                        </div>
                        <div className="d-flex">
                            <span>Order Invoice:&nbsp;</span>
                            <span className="fw-bold">yu44</span>
                        </div>
                    </Col>
                    <Col lg={6} className="my-1">
                        <div className="d-flex">
                            <span>Card:&nbsp;</span>
                            <span className="fw-bold">Not Added</span>
                        </div>
                        <div className="d-flex">
                            <span>Wallet Balance:&nbsp;</span>
                            <span className="fw-bold">Usd 0.00</span>
                        </div>
                        <div className="d-flex">
                            <span>Order Total :&nbsp;</span>
                            <span className="fw-bold">Usd 0.00</span>
                        </div>
                        <div className="d-flex">
                            <span>Due Amount:&nbsp;</span>
                            <span className="fw-bold">Usd 0.00</span>
                        </div>
                    </Col>
                </Row>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Refund Type"
                                placeholder="Refund Type"
                                type="text"
                                disabled={false}
                                error={errors?.refund_type}
                                errorMessage={errors?.refund_type}
                                register={register('refund_type')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Amount"
                                placeholder="Amount"
                                type="text"
                                disabled={false}
                                error={errors?.amount}
                                errorMessage={errors?.amount}
                                register={register('amount')}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className="my-1">
                            <Field
                                label="Refund Reason"
                                placeholder="Refund Reason"
                                type="text"
                                disabled={false}
                                error={errors?.refund_reason}
                                errorMessage={errors?.refund_reason}
                                register={register('refund_reason')}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-2">
                        <Button
                            className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                            onClick={() => reset(initialValues)}>
                            Cancel &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            Refund <i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RefundPayment;
