import React, { useEffect } from 'react';
import { Col, Form, Modal, Row, Button } from 'react-bootstrap';
import { validationSchema, initialValues, paymentOptions } from './FormData';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { costomerList, laundryPackagesList } from '../../../../redux/actions';
import SelectField from '../../../../components/Form Components/SelectField';
import DateField from '../../../../components/Form Components/DateField';

const AssignPackage = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const customerListData = store.CostomerList?.costomerList?.data;
    const packageListData = store.LaundryPackagesList?.laundryPackagesList?.data;
    // console.log('packageListData:', packageListData);

    useEffect(() => {
        dispatch(
            costomerList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 100,
                storeId: [],
            })
        );
        dispatch(
            laundryPackagesList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 100,
            })
        );
    }, []);

    // console.log('Data :', packageListData);

    const {
        register,
        handleSubmit,
        control,
        reset,
        // watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    const onSubmit = (value) => {
        console.log('onSubmit', value);
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
                    <h4>Assign Package to Customer</h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="customer_id"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={
                                            Array.isArray(customerListData)
                                                ? customerListData?.map((list) => ({
                                                      label: list?.first_name + ' ' + list?.last_name,
                                                      value: list?.id,
                                                  }))
                                                : []
                                        }
                                        error={errors?.customer_id}
                                        placeholder="Select Customer"
                                    />
                                )}
                            />
                            {errors?.customer_id && (
                                <Form.Text className="text-danger text-start">{errors?.customer_id?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="Package Name"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={
                                            Array.isArray(packageListData)
                                                ? packageListData?.map((list) => ({
                                                      label: list?.package_name,
                                                      value: list?.pkg_id,
                                                  }))
                                                : []
                                        }
                                        error={errors?.pkg_id}
                                        placeholder="Package Name"
                                    />
                                )}
                            />
                            {errors?.pkg_id && (
                                <Form.Text className="text-danger text-start">{errors?.pkg_id?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="text-start my-1">
                            <Controller
                                control={control}
                                name="start_date"
                                render={({ field }) => (
                                    <DateField
                                        field={field}
                                        error={errors?.start_date}
                                        errorMessage={errors?.start_date?.message}
                                        label="Package start date"
                                    />
                                )}
                            />
                        </Col>

                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="payment_mode"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={paymentOptions}
                                        error={errors?.payment_mode}
                                        placeholder="Payment Mode"
                                    />
                                )}
                            />
                            {errors?.payment_mode && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.payment_mode?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-2">
                        <Button className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center">
                            Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            Save<i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AssignPackage;
