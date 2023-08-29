import React, { useEffect } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { paymentSettingList } from '../../../../../redux/actions';
import { initialValues, validationSchema, customerOptions, onlinePaymentOptions } from './FormData';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from '../../../../../components/Form Components/SelectField';
import MainLoader from '../../../../../components/MainLoader';

const PaymentSettings = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const PaymentSettingLoader = store.PaymentSettingtList?.loading;
    const PaymentSettingeData = store?.PaymentSettingtList?.paymentSettingList?.data;

    const getPaymentSetting = () => {
        dispatch(paymentSettingList());
    };

    useEffect(() => {
        getPaymentSetting();
    }, []);

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

    useEffect(() => {
        const activePg = PaymentSettingeData?.pg_details
            ?.filter((item) => item?.status === 'enable')
            .map((item) => item.name)[0];
        reset({
            online_payment: PaymentSettingeData?.payment_setting?.online_payment.toUpperCase(),
            payment_option_for_customer: PaymentSettingeData?.payment_setting?.open_payment_option_for_customer
                .split('_')[0]
                .toUpperCase(),
            active_pg: activePg.toUpperCase(),
        });
    }, [PaymentSettingeData]);
    const onSubmit = (data) => {
        dispatch();
    };
    return (
        <>
            <h5 className="border p-2 rounded-2 mx-2">
                Please select the payment gateways through which yours customers can pay you from the online payment
                link on the invoices.
            </h5>

            {PaymentSettingLoader ? (
                <MainLoader />
            ) : (
                <Form onSubmit={handleSubmit(onSubmit)} className="mx-2 mb-3">
                    <Row>
                        <Col lg={6} className="my-2">
                            <Controller
                                control={control}
                                name="online_payment"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={onlinePaymentOptions}
                                        error={errors?.online_payment}
                                        placeholder="Online Payment"
                                    />
                                )}
                            />
                            {errors?.online_payment && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.online_payment?.message}
                                </Form.Text>
                            )}
                        </Col>

                        <Col lg={6} className="my-2">
                            <Controller
                                control={control}
                                name="payment_option_for_customer"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={customerOptions}
                                        error={errors?.payment_option_for_customer}
                                        placeholder="Open order's payment option for customer"
                                    />
                                )}
                            />
                            {errors?.payment_option_for_customer && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.payment_option_for_customer?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Table className="mb-0" size="sm">
                        <thead style={{ backgroundColor: '#f3f2f1' }}>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Payment Gateways</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PaymentSettingeData?.pg_details?.map((record) => {
                                return (
                                    <tr className="vertical_align">
                                        <td scope="row">{record.id}</td>
                                        <td>
                                            <input
                                                name="payment_type"
                                                value={record.name.toUpperCase()}
                                                type="radio"
                                                {...register('active_pg')}
                                            />
                                            <span className="ms-3">
                                                <img src={record.logo} alt="" height="60px" />
                                            </span>
                                        </td>
                                        <td>{record.name}</td>
                                        <td className="text-success cursor-pointer">Setup</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-center mt-2">
                        <Button
                            className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                            onClick={() => reset(initialValues)}>
                            Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            {PaymentSettingeData ? 'Update' : 'Save'} <i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            )}
        </>
    );
};

export default PaymentSettings;
