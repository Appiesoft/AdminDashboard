import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema } from './FormData';
import { colorList, colorCreate, colorUpdate } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import ImageUploader from '../../../../components/Form Components/ImageUploader';
import Field from '../../../../components/Form Components/Field';

const NewProductColor = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const productColorCreate = store?.ProductColorCreate;
    const productColorUpdate = store?.ProductColorUpdate;

    useEffect(() => {
        if (productColorCreate?.status === true) {
            ToastHandle('success', productColorCreate?.message);
            dispatch(
                colorList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productColorCreate?.status === false) {
            ToastHandle('error', productColorCreate?.message);
        }
    }, [productColorCreate]);

    useEffect(() => {
        if (productColorUpdate?.status === true) {
            ToastHandle('success', productColorUpdate?.message);
            dispatch(
                colorList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productColorUpdate?.status === false) {
            ToastHandle('error', productColorUpdate?.message);
        }
    }, [productColorUpdate]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (editRow) {
            reset({
                color_name: editRow?.color_name,
                image: editRow?.images,
                remark: editRow?.color_remark,
                color_code: editRow?.color_code,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                colorUpdate({
                    color_id: editRow?.id,
                    color_name: data?.color_name,
                    color_remark: data?.remark,
                    color_code: data?.color_code,
                    image: data?.image,
                })
            );
        } else {
            dispatch(
                colorCreate({
                    color_name: data?.color_name,
                    color_remark: data?.remark,
                    color_code: data?.color_code,
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
                    <h4>New Product Color </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Color Name"
                                placeholder="Color Name"
                                type="text"
                                disabled={false}
                                error={errors?.color_name}
                                errorMessage={errors?.color_name}
                                register={register('color_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Remarks"
                                placeholder="Remarks"
                                type="text"
                                disabled={false}
                                error={errors?.remark}
                                errorMessage={errors?.remark}
                                register={register('remark')}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className="my-1">
                            <Field
                                label="Code"
                                placeholder="Code"
                                type="color"
                                disabled={false}
                                error={errors?.color_code}
                                errorMessage={errors?.color_code}
                                register={register('color_code')}
                            />
                        </Col>
                    </Row>
                    <ImageUploader register={register('image')} setValue={setValue} name="image" />
                    <div className="d-flex justify-content-center mt-2">
                        <Button
                            className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                            onClick={() => reset(initialValues)}>
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

export default NewProductColor;
