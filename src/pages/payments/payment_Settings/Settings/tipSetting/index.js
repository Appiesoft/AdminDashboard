import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Row, Col, Button } from 'react-bootstrap';
import SelectField from '../../../../../components/Form Components/SelectField';
import Field from '../../../../../components/Form Components/Field';
import { initialValues, validationSchema, options, tipOptions, percentageOptions } from './FormData';

const TipSetting = () => {
    const {
        control,
        handleSubmit,
        reset,
        register,
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
        <div className="mt-2">
            <Form onSubmit={handleSubmit(onSubmit)} className="mx-2 my-4">
                <Row>
                    <Col lg={6} className="my-2">
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <SelectField
                                    field={field}
                                    isMulti={false}
                                    options={options}
                                    error={errors?.status}
                                    placeholder="Tip Status"
                                />
                            )}
                        />
                        {errors?.status && (
                            <Form.Text className="text-danger text-start">{errors?.status?.message}</Form.Text>
                        )}
                    </Col>

                    <Col lg={6} className="my-2">
                        <Controller
                            control={control}
                            name="calculation_type"
                            render={({ field }) => (
                                <SelectField
                                    field={field}
                                    isMulti={false}
                                    options={percentageOptions}
                                    error={errors?.calculation_type}
                                    placeholder="Calculate for percentage"
                                />
                            )}
                        />
                        {errors?.calculation_type && (
                            <Form.Text className="text-danger text-start">
                                {errors?.calculation_type?.message}
                            </Form.Text>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="my-2">
                        <Controller
                            control={control}
                            name="is_mandatory"
                            render={({ field }) => (
                                <SelectField
                                    field={field}
                                    isMulti={false}
                                    options={tipOptions}
                                    error={errors?.is_mandatory}
                                    placeholder="Tip is Mandatory"
                                />
                            )}
                        />
                        {errors?.is_mandatory && (
                            <Form.Text className="text-danger text-start">{errors?.is_mandatory?.message}</Form.Text>
                        )}
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Default Value 1"
                                    placeholder="Default Value 1"
                                    type="text"
                                    disabled={false}
                                    error={errors?.default_tip1}
                                    errorMessage={errors?.default_tip1}
                                    register={register('default_tip1')}
                                />
                            </Col>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Default Value 2"
                                    placeholder="Default Value 2"
                                    type="text"
                                    disabled={false}
                                    error={errors?.default_tip2}
                                    errorMessage={errors?.default_tip2}
                                    register={register('default_tip2')}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-2">
                    <Button
                        className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                        onClick={() => reset(initialValues)}>
                        Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                    </Button>
                    <Button className="rounded-pill mx-2" type="submit">
                        Update <i className="bi bi-save"></i>
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default TipSetting;
