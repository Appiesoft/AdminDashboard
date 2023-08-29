import React from 'react';
import { initialValues, validationSchema, options, cardOnStages } from './FormData';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Row, Col, Button } from 'react-bootstrap';
import SelectField from '../../../../../components/Form Components/SelectField';
import { advanceSettingForStripeActions } from '../../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MainLoader from '../../../../../components/MainLoader';

const StripeSetting = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const AdvanceSettingData = store?.AdvanceSettingForStripe?.advanceSettingForStripe?.data;
    const AdvanceSettingLorder = store?.AdvanceSettingForStripe?.loading;
    const {
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
        dispatch(advanceSettingForStripeActions());
    }, []);

    useEffect(() => {
        reset({
            card_mandatory_for_pickup: AdvanceSettingData?.card_mandatory_for_pickup,
            payment_by_card_stage: AdvanceSettingData?.payment_by_card_stage,
            failure_sms_for_admin: AdvanceSettingData?.failure_sms_for_admin,
            failure_sms_for_customer: AdvanceSettingData?.failure_sms_for_customer,
        });
    }, [AdvanceSettingData]);

    const onSubmit = (data) => {
        console.log('Data', data);
    };
    return (
        <div className="mt-2">
            {AdvanceSettingLorder ? (
                <MainLoader />
            ) : (
                <Form onSubmit={handleSubmit(onSubmit)} className="mx-2 my-4">
                    <Row>
                        <Col lg={6} className="my-3">
                            <Controller
                                control={control}
                                name="card_mandatory_for_pickup"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={options}
                                        error={errors?.card_mandatory_for_pickup}
                                        placeholder="Card Mandatory For Pickup"
                                    />
                                )}
                            />
                            {errors?.card_mandatory_for_pickup && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.card_mandatory_for_pickup?.message}
                                </Form.Text>
                            )}
                        </Col>

                        <Col lg={6} className="my-3">
                            <Controller
                                control={control}
                                name="payment_by_card_stage"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={cardOnStages}
                                        error={errors?.payment_by_card_stage}
                                        placeholder="Auto Charged From Online Added Card On StageShow/Hide"
                                    />
                                )}
                            />
                            {errors?.payment_by_card_stage && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.payment_by_card_stage?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-3">
                            <Controller
                                control={control}
                                name="failure_sms_for_admin"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={options}
                                        error={errors?.failure_sms_for_admin}
                                        placeholder="Payment Failure Time Go SMS To Admin"
                                    />
                                )}
                            />
                            {errors?.failure_sms_for_admin && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.failure_sms_for_admin?.message}
                                </Form.Text>
                            )}
                        </Col>

                        <Col lg={6} className="my-3">
                            <Controller
                                control={control}
                                name="failure_sms_for_customer"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={options}
                                        error={errors?.failure_sms_for_customer}
                                        placeholder="Payment Failure Time Go SMS To Customer "
                                    />
                                )}
                            />
                            {errors?.failure_sms_for_customer && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.failure_sms_for_customer?.message}
                                </Form.Text>
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
                            Update <i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default StripeSetting;
