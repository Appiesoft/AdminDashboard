import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema } from './FormData';
import ImageUploader from '../../../../components/Form Components/ImageUploader';
import { productPatternsList, productPatternsCreate, productPatternsUpdate } from '../../../../redux/actions';
import Field from '../../../../components/Form Components/Field';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';

const NewProductPattern = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const productPatternCreate = store?.ProductPatternsCreate;
    const productPatternUpdate = store?.ProductPatternsUpdate;

    useEffect(() => {
        if (productPatternCreate?.status === true) {
            ToastHandle('success', productPatternCreate?.message);
            dispatch(
                productPatternsList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productPatternCreate?.status === false) {
            ToastHandle('error', productPatternCreate?.message);
        }
    }, [productPatternCreate]);

    useEffect(() => {
        if (productPatternUpdate?.status === true) {
            ToastHandle('success', productPatternUpdate?.message);
            dispatch(
                productPatternsList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productPatternUpdate?.status === false) {
            ToastHandle('error', productPatternUpdate?.message);
        }
    }, [productPatternUpdate]);

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
                pattern_name: editRow?.name,
                image: editRow?.images,
                remark: editRow?.remark,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                productPatternsUpdate({
                    pattern_id: editRow?.id,
                    pattern_name: data?.pattern_name,
                    pattern_remark: data?.remark,
                    image: data?.image,
                })
            );
        } else {
            dispatch(
                productPatternsCreate({
                    pattern_name: data?.pattern_name,
                    pattern_remark: data?.remark,
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
                    <h4>New Record </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Pattern Name"
                                placeholder="Pattern Name"
                                type="text"
                                disabled={false}
                                error={errors?.pattern_name}
                                errorMessage={errors?.pattern_name}
                                register={register('pattern_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Remarks"
                                placeholder="Remarks"
                                type="text"
                                disabled={false}
                                error={errors?.remark}
                                errorMessage={errors.remark}
                                register={register('remark')}
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

export default NewProductPattern;
