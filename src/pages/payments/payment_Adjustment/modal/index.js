import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema } from './FormData';
import { paymentAdjustmentList, paymentAdjustmentCreate, paymentAdjustmentUpdate } from '../../../../redux/actions';
import Field from '../../../../components/Form Components/Field';
import ToastHandle from '../../../../helpers/toastMessage';

const AddPaymentAdjustmentModal = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const paymentCreate = store?.PaymentAdjustmentCreate;
    const paymentUpdate = store?.PaymentAdjustmentUpdate;

    useEffect(() => {
        if (paymentCreate?.status === true) {
            ToastHandle('success', paymentCreate?.message);
            dispatch(
                paymentAdjustmentList({
                    searchValue: '',
                    pageNumber: '',
                    showLimit: '',
                    from: '',
                    to: '',
                    driverId: '',
                    chooseFor: '',
                })
            );
            onHide(false);
        } else if (paymentCreate?.status === false) {
            ToastHandle('error', paymentCreate?.message);
        }
    }, [paymentCreate]);

    useEffect(() => {
        if (paymentUpdate?.status === true) {
            ToastHandle('success', paymentUpdate?.message);
            dispatch(
                paymentAdjustmentList({
                    searchValue: '',
                    pageNumber: '',
                    showLimit: '',
                    from: '',
                    to: '',
                    driverId: '',
                    chooseFor: '',
                })
            );
            onHide(false);
        } else if (paymentUpdate?.status === false) {
            ToastHandle('error', paymentUpdate?.message);
        }
    }, [paymentUpdate]);

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

    const resetFormData = () => {
        if (editRow) {
            reset({
                adjustment_name: editRow?.type,
            });
        } else {
            reset(initialValues);
        }
    };

    useEffect(() => {
        resetFormData();
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                paymentAdjustmentUpdate({
                    adjustmentId: editRow?.id,
                    adjustmentName: data?.adjustment_name,
                })
            );
        } else {
            dispatch(
                paymentAdjustmentCreate({
                    adjustmentName: data?.adjustment_name,
                })
            );
        }
        reset(initialValues);
        onHide(false);
    };
    return (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="d-block">
                    <h4>Add Payment Adjustment </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={12} className="my-1">
                            <Field
                                label="Payment Type"
                                placeholder="Payment Type"
                                type="text"
                                disabled={false}
                                error={errors?.adjustment_name}
                                errorMessage={errors?.adjustment_name}
                                register={register('adjustment_name')}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-2">
                        <Button
                            className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                            onClick={resetFormData}>
                            Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            {editRow ? 'Update' : 'Save'} <i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPaymentAdjustmentModal;
