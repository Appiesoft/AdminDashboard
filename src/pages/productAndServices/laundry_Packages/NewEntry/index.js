import React, { useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { serviceCategoryList } from '../../../../redux/actions';
import { initialValues, validationSchema, unitOptions, durationOptions } from './FormData';
import BreadCrumb from '../../../../components/BreadCrumb';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';

const NewLaundryPackages = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
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

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });
    return (
        <>
            <BreadCrumb prevPage={'Laundry Packages'} currPage={'New Entry'} />
            <Card>
                <Card.Body>
                    <Form
                        onSubmit={handleSubmit((data) => {
                            console.log('Data :', data);
                        })}>
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
                                    <Form.Text className="text-danger text-start">
                                        {errors?.services?.message}
                                    </Form.Text>
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
                                    <Form.Text className="text-danger text-start">
                                        {errors?.duration?.message}
                                    </Form.Text>
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
                        <div className="d-flex justify-content-center mt-2">
                            <Button
                                className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                                onClick={() => reset(initialValues)}>
                                Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                            </Button>
                            <Button className="rounded-pill mx-2" type="submit">
                                Create <i className="bi bi-save"></i>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default NewLaundryPackages;
