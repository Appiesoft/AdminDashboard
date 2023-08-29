import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    laundryPackagesList,
    laundryPackagesCreate,
    laundryPackagesUpdate,
    serviceCategoryList,
} from '../../../../redux/actions';
import { initialValues, validationSchema, unitOptions, durationOptions, statusOptions } from './FormData';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';

const NewLaundryPackagesModal = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const laundryPackagesCreateData = store?.LaundryPackagesCreate;
    const laundryPackagesUpdateData = store?.LaundryPackagesUpdate;
    const serviceCategoryData = store.ServiceCategoryList?.serviceCategoryList?.data;

    useEffect(() => {
        dispatch(
            serviceCategoryList({
                searchValue: '',
                pageNumber: '',
                showLimit: '',
            })
        );
    }, []);

    useEffect(() => {
        if (laundryPackagesCreateData?.status === true) {
            ToastHandle('success', laundryPackagesCreateData?.message);
            dispatch(
                laundryPackagesList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (laundryPackagesCreateData?.status === false) {
            ToastHandle('error', laundryPackagesCreateData?.message);
        }
    }, [laundryPackagesCreateData]);

    useEffect(() => {
        if (laundryPackagesUpdateData?.status === true) {
            ToastHandle('success', laundryPackagesUpdateData?.message);
            dispatch(
                laundryPackagesList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (laundryPackagesUpdateData?.status === false) {
            ToastHandle('error', laundryPackagesUpdateData?.message);
        }
    }, [laundryPackagesUpdateData]);

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
                services: editRow?.services,
                package_name: editRow?.package_name,
                usage_limit: editRow?.usage_limit,
                unit: editRow?.pkg_unit,
                pickup: editRow?.pickup,
                duration: editRow?.duration,
                amount: editRow?.amount,
                description: editRow?.description,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                laundryPackagesUpdate({
                    upcharge_id: editRow?.pkg_id,
                    amount: data?.amount,
                    description: data?.description,
                    duration: data?.duration,
                    pickup: data?.pickup,
                    pkg_name: data?.package_name,
                    pkg_unit: data?.unit,
                    priority: data?.priority,
                    services: data?.services,
                    status: data?.status,
                    usage_limit: data?.usage_limit,
                })
            );
        } else {
            dispatch(
                laundryPackagesCreate({
                    amount: data?.amount,
                    description: data?.description,
                    duration: data?.duration,
                    pickup: data?.pickup,
                    pkg_name: data?.package_name,
                    pkg_unit: data?.unit,
                    priority: data?.priority,
                    services: data?.services,
                    status: data?.status,
                    usage_limit: data?.usage_limit,
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
                            <Controller
                                control={control}
                                name="services"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={
                                            Array.isArray(serviceCategoryData)
                                                ? serviceCategoryData.map((item) => ({
                                                      label: item.service_name1,
                                                      value: item.id,
                                                  }))
                                                : []
                                        }
                                        error={errors?.services}
                                        placeholder="Services"
                                    />
                                )}
                            />
                            {errors?.services && (
                                <Form.Text className="text-danger text-start">{errors?.services?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Package Name"
                                placeholder="Package Name"
                                type="text"
                                disabled={false}
                                error={errors?.package_name}
                                errorMessage={errors?.package_name}
                                register={register('package_name')}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Usage Limit"
                                placeholder="Usage Limit"
                                type="text"
                                disabled={false}
                                error={errors?.usage_limit}
                                errorMessage={errors?.usage_limit}
                                register={register('usage_limit')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="unit"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={unitOptions}
                                        error={errors?.unit}
                                        placeholder="Package Unit"
                                    />
                                )}
                            />
                            {errors?.unit && (
                                <Form.Text className="text-danger text-start">{errors?.unit?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Pickup"
                                placeholder="Pickup"
                                type="text"
                                disabled={false}
                                error={errors?.pickup}
                                errorMessage={errors?.pickup}
                                register={register('pickup')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="duration"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={durationOptions}
                                        error={errors?.duration}
                                        placeholder="Duration"
                                    />
                                )}
                            />
                            {errors?.duration && (
                                <Form.Text className="text-danger text-start">{errors?.duration?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
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
                                        options={statusOptions}
                                        error={errors?.status}
                                        placeholder="Status"
                                    />
                                )}
                            />
                            {errors?.status && (
                                <Form.Text className="text-danger text-start">{errors?.status?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Priority"
                                placeholder="Priority"
                                type="text"
                                disabled={false}
                                error={errors?.priority}
                                errorMessage={errors?.priority}
                                register={register('priority')}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-2">
                        <Button
                            className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                            onClick={() => reset(initialValues)}>
                            Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            {editRow ? 'Update' : 'Create'} <i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewLaundryPackagesModal;
