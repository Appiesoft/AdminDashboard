import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { initialValues, validationSchema, options } from './FormData';
import { categoryCreate, categoryList, categoryUpdate } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';

const NewProductCategory = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const productCategoryCreate = store?.ProductCategoryCreate;
    const productCategoryUpdate = store?.ProductCategoryUpdate;

    useEffect(() => {
        if (productCategoryCreate?.status === true) {
            ToastHandle('success', productCategoryCreate?.message);
            dispatch(
                categoryList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productCategoryCreate?.status === false) {
            ToastHandle('error', productCategoryCreate?.message);
        }
    }, [productCategoryCreate]);

    useEffect(() => {
        if (productCategoryUpdate?.status === true) {
            ToastHandle('success', productCategoryUpdate?.message);
            dispatch(
                categoryList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productCategoryUpdate?.status === false) {
            ToastHandle('error', productCategoryUpdate?.message);
        }
    }, [productCategoryUpdate]);

    const {
        register,
        control,
        handleSubmit,
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
                service_name: editRow?.category_name,
                status: editRow?.status,
                description: editRow?.category_descr,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                categoryUpdate({
                    category_id: editRow?.cat_id,
                    category_name: data?.service_name,
                    category_remark: data?.description,
                    status: data?.status,
                })
            );
        } else {
            dispatch(
                categoryCreate({
                    category_name: data?.service_name,
                    category_remark: data?.description,
                    status: data?.status,
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
                    <h4>New Category </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Service Name"
                                placeholder="Service Name"
                                type="text"
                                disabled={false}
                                error={errors?.service_name}
                                errorMessage={errors?.service_name}
                                register={register('service_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Description"
                                placeholder="Description"
                                type="text"
                                disabled={false}
                                error={errors?.description}
                                errorMessage={errors?.description}
                                register={register('description')}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={options}
                                        error={errors?.status}
                                        placeholder="Status"
                                    />
                                )}
                            />
                            {errors?.status && (
                                <Form.Text className="text-danger text-start">{errors?.status?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-2">
                        <Button
                            className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                            onClick={() => reset(initialValues)}>
                            Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            {editRow ? 'Update' : 'Save'}
                            <i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewProductCategory;
