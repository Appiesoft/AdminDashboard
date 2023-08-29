import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema } from './FormData';
import { paymentTypeCreate, PaymentTypeListAction, paymentTypeUpdate } from '../../../../redux/actions';
import ImageUploader from '../../../../components/Form Components/NewImageUploader';
import Field from '../../../../components/Form Components/Field';
import ToastHandle from '../../../../helpers/toastMessage';

const AddPaymentModal = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const paymentCreate = store?.paymentTypeCreate;
    const paymentUpdate = store?.PaymentTypeUpdate;

    useEffect(() => {
        if (paymentCreate?.status === true) {
            ToastHandle('success', paymentCreate?.message);
            dispatch(
                PaymentTypeListAction({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
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
                PaymentTypeListAction({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
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
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    const resetFormData = () => {
        if (editRow) {
            reset({
                method: editRow?.method,
                image: editRow?.image_url,
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
                paymentTypeUpdate({
                    paymentMethodId: editRow?.payment_id,
                    method: data?.method,
                    image: data?.image,
                })
            );
        } else {
            dispatch(
                paymentTypeCreate({
                    method: data?.method,
                    image: data?.image,
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
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="d-block">
                    <h4>Add payment </h4>
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
                                error={errors?.method}
                                errorMessage={errors?.method}
                                register={register('method')}
                            />
                        </Col>
                    </Row>
                    <ImageUploader
                        register={register('image')}
                        setValue={setValue}
                        name="image"
                        label="Payment Slip"
                        image={watch('image')}
                    />
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

export default AddPaymentModal;
