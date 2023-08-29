import React, { useEffect, useState } from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema, options } from './FormData';
import { paymentChargesCreate, paymentChargesUpdate } from '../../../../../../redux/actions';
import SelectField from '../../../../../../components/Form Components/SelectField';
import Field from '../../../../../../components/Form Components/Field';
import ToastHandle from '../../../../../../helpers/toastMessage';

const PaymentDetailRow = ({
    paymentType,
    id,
    status,
    amount,
    paymentTypeId,
    setAddPayment,
    setSelectedItem,
    setIsDeleteModelOpen,
    activatedRow,
    setActivatedRow,
}) => {
    const [editField, setEditField] = useState(true);
    const dispatch = useDispatch();

    const {
        control,
        reset,
        watch,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    useEffect(() => {
        reset({
            status,
            payment_method_id: paymentTypeId,
            amount,
        });
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (watch('status') !== '' && watch('payment_method_id') !== '' && watch('amount') !== '') {
            if (id && !editField) {
                dispatch(
                    paymentChargesUpdate({
                        payment_charges_id: id,
                        status: watch('status'),
                        paymentMethodId: watch('payment_method_id'),
                        amount: watch('amount'),
                    })
                );
            } else {
                dispatch(
                    paymentChargesCreate({
                        status: watch('status'),
                        paymentMethodId: watch('payment_method_id'),
                        amount: watch('amount'),
                    })
                );
            }
        } else {
            if (watch('status') === '') {
                ToastHandle('error', 'Please Select Status');
            } else if (watch('payment_method_id') === '') {
                ToastHandle('error', 'Please Select Payment Method');
            } else if (watch('amount') === '') {
                ToastHandle('error', 'Please Select Status');
            }
        }
    };
    return (
        <Row className="d-flex align-items-center">
            <Col lg={12}>
                <Form>
                    <Row className="d-flex align-items-center">
                        <Col lg={3} className="my-1">
                            <Controller
                                control={control}
                                name="payment_method_id"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        disable={id && editField}
                                        options={
                                            Array.isArray(paymentType)
                                                ? paymentType.map((item) => ({
                                                      label: item?.method,
                                                      value: item?.payment_id,
                                                  }))
                                                : []
                                        }
                                        error={errors?.payment_method_id}
                                        placeholder="Payment Type"
                                    />
                                )}
                            />
                            {errors?.payment_method_id && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.payment_method_id?.message}
                                </Form.Text>
                            )}
                        </Col>
                        <Col lg={3} className="my-1">
                            <Field
                                label="Payment Amount (%)"
                                placeholder="Payment Amount (%)"
                                type="text"
                                disabled={id && editField}
                                error={errors?.amount}
                                errorMessage={errors?.amount}
                                register={register('amount')}
                            />
                        </Col>
                        <Col lg={3} className="my-1">
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        disable={id && editField}
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
                        <Col lg={3} className="my-1">
                            {id ? (
                                <Col lg={12} className="mt-1 text-center">
                                    {!editField ? (
                                        <OverlayTrigger
                                            placement="auto"
                                            overlay={<Tooltip id="tooltip-auto">Update</Tooltip>}>
                                            <button
                                                className="btn text-white"
                                                style={{ backgroundColor: 'green' }}
                                                type="submit"
                                                onClick={onSubmit}>
                                                <i className="bi bi-save2 fs-4 fw-bold"></i>
                                            </button>
                                        </OverlayTrigger>
                                    ) : (
                                        <OverlayTrigger
                                            placement="auto"
                                            overlay={<Tooltip id="tooltip-auto">Edit</Tooltip>}>
                                            <button
                                                className="btn text-white"
                                                style={{ backgroundColor: 'gray' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (activatedRow) {
                                                        ToastHandle('error', 'Only One Row can be Edit At one Time');
                                                    } else {
                                                        setEditField(!editField);
                                                        setActivatedRow(id);
                                                    }
                                                }}
                                                type="button">
                                                <i className="bi bi-pencil-square fs-4 fw-bold"></i>
                                            </button>
                                        </OverlayTrigger>
                                    )}
                                    {!editField ? (
                                        <OverlayTrigger
                                            placement="auto"
                                            overlay={<Tooltip id="tooltip-auto">Cancel</Tooltip>}>
                                            <button
                                                className="btn text-white ms-2"
                                                style={{ backgroundColor: 'gray' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActivatedRow(null);
                                                    setEditField(!editField);
                                                }}
                                                type="button">
                                                <i className="bi-x-lg fs-4 fw-bold"></i>
                                            </button>
                                        </OverlayTrigger>
                                    ) : (
                                        <OverlayTrigger
                                            placement="auto"
                                            overlay={<Tooltip id="tooltip-auto">Delete</Tooltip>}>
                                            <button
                                                className="btn text-white ms-2"
                                                style={{ backgroundColor: 'red' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedItem(id);
                                                    setIsDeleteModelOpen(true);
                                                }}>
                                                <i className="mdi mdi-delete fs-4 fw-bold"></i>
                                            </button>
                                        </OverlayTrigger>
                                    )}
                                </Col>
                            ) : (
                                <Col lg={12} className="mt-1 text-center">
                                    <OverlayTrigger
                                        placement="auto"
                                        overlay={<Tooltip id="tooltip-auto">Save</Tooltip>}>
                                        <button
                                            className="btn text-white"
                                            style={{ backgroundColor: 'green' }}
                                            type="submit"
                                            onClick={onSubmit}>
                                            <i className="bi bi-save2 fs-4 fw-bold"></i>
                                        </button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="auto"
                                        overlay={<Tooltip id="tooltip-auto">Delete</Tooltip>}>
                                        <button
                                            className="btn text-white ms-2"
                                            style={{ backgroundColor: 'gray' }}
                                            onClick={() => setAddPayment(false)}>
                                            <i className="bi-x-lg fs-4 fw-bold"></i>
                                        </button>
                                    </OverlayTrigger>
                                </Col>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export default PaymentDetailRow;
