import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema } from './FormData';
import { brandCreate, brandList, brandUpdate } from '../../../../redux/actions';
import ImageUploader from '../../../../components/Form Components/ImageUploader';
import Field from '../../../../components/Form Components/Field';
import ToastHandle from '../../../../helpers/toastMessage';

const NewEntry = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const productBrandCreate = store?.BrandCreate;
    const productBrandUpdate = store?.BrandUpdate;
    useEffect(() => {
        if (productBrandCreate?.status === true) {
            ToastHandle('success', productBrandCreate?.message);
            dispatch(
                brandList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productBrandCreate?.status === false) {
            ToastHandle('error', productBrandCreate?.message);
        }
    }, [productBrandCreate]);

    useEffect(() => {
        if (productBrandUpdate?.status === true) {
            ToastHandle('success', productBrandUpdate?.message);
            dispatch(
                brandList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productBrandUpdate?.status === false) {
            ToastHandle('error', productBrandUpdate?.message);
        }
    }, [productBrandUpdate]);
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
                brand_name: editRow?.brand_name,
                image: editRow?.image,
                brand_remark: editRow?.brand_remark,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                brandUpdate({
                    brand_id: editRow?.id,
                    brand_name: data?.brand_name,
                    image: data?.image,
                    brand_remark: data?.brand_remark,
                })
            );
        } else {
            dispatch(
                brandCreate({
                    brand_name: data?.brand_name,
                    image: data?.image,
                    brand_remark: data?.brand_remark,
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
                    <h4>New Entry </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Brand Name"
                                placeholder="Brand Name"
                                type="text"
                                disabled={false}
                                error={errors?.brand_name}
                                errorMessage={errors?.brand_name}
                                register={register('brand_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Remarks"
                                placeholder="Remarks"
                                type="text"
                                disabled={false}
                                error={errors?.brand_remark}
                                errorMessage={errors?.brand_remark}
                                register={register('brand_remark')}
                            />
                        </Col>
                    </Row>
                    <ImageUploader
                        register={register('image')}
                        setValue={setValue}
                        name="image"
                        imageurl={editRow?.image ? editRow?.image : null}
                    />
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

export default NewEntry;
