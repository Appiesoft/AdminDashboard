import React, { useEffect } from 'react';
import { Col, Form, Modal, Row, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { costomerList, employeeList } from '../../../../redux/actions';
import { validationSchema, initialValues, driver, recurringPickup, pickupTime } from './FormData';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from '../../../../components/Form Components/SelectField';
import Field from '../../../../components/Form Components/Field';
import DatePicker from 'react-datepicker';

const PickupModel = ({ show, onHide, storeList }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const customerListData = store.CostomerList?.costomerList?.data;
    const employeListData = store?.EmployeeList?.employeeList?.data;
    console.log('customerListData :', customerListData);

    useEffect(() => {
        dispatch(
            costomerList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
                storeId: [],
            })
        );

        dispatch(
            employeeList({
                storeId: [],
                searchValue: '',
                pageNumber: 1,
                showLimit: 1000,
            })
        );
    }, []);

    const {
        register,
        handleSubmit,
        control,
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
                <div className='d-block'>
                    <h4>Create New Pickup </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="customer_name"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={customerListData?.map((list) => ({
                                            label: list?.first_name + ' ' + list?.last_name,
                                            value: list?.id,
                                        }))}
                                        error={errors?.customer_name}
                                        placeholder="Customer Name"
                                    />
                                )}
                            />
                            {errors?.customer_name && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.customer_name?.message}
                                </Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start my-1">
                            <Controller
                                control={control}
                                name="pickup_date"
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        dateFormat="MM/dd/yyyy"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        customInput={
                                            <div className="d-flex border rounded-2">
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="Pickup Date"
                                                    className={`w-100 ${errors?.pickup_date && 'text-danger'}`}>
                                                    <input
                                                        type="text"
                                                        value={
                                                            new Date(field.value).getDate() +
                                                            '/' +
                                                            new Date(field.value).getMonth() +
                                                            1 +
                                                            '/' +
                                                            new Date(field.value).getFullYear()
                                                        }
                                                        className="form-control form-control-light"
                                                        style={{ height: 'calc(2.9rem + 2px)' }}
                                                        placeholder="Pickup Date"
                                                    />
                                                </FloatingLabel>
                                                <div style={{ marginLeft: '1px !important', width: '15%' }}>
                                                    <span
                                                        className="bg-primary text-white d-flex justify-content-center align-items-center rounded-end"
                                                        style={{ height: 'calc(2.9rem + 2px)' }}>
                                                        <i className="mdi mdi-calendar-range font-15"></i>
                                                    </span>
                                                </div>
                                                {errors?.pickup_date && (
                                                    <Form.Text className="text-danger text-start">
                                                        {errors?.pickup_date?.message}
                                                    </Form.Text>
                                                )}
                                            </div>
                                        }
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="Store"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={storeList?.map((list) => ({
                                            label: list?.store_name,
                                            value: list?.store_id,
                                        }))}
                                        error={errors?.storeList}
                                        placeholder="Store"
                                    />
                                )}
                            />
                            {errors?.storeList && (
                                <Form.Text className="text-danger text-start">{errors?.storeList?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Qty/Bag"
                                placeholder="Qty/Bag"
                                type="text"
                                disabled={false}
                                error={errors?.qty_bag}
                                errorMessage={errors?.qty_bag?.message}
                                register={register('qty_bag')}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="driver_assign"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={employeListData?.map((item) => ({
                                            label: item?.first_name + ' ' + item?.last_name,
                                            value: item?.emp_id,
                                        }))}
                                        error={errors?.driver_assign}
                                        placeholder="Driver Assign"
                                    />
                                )}
                            />
                            {errors?.driver_assign && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.driver_assign?.message}
                                </Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="recurringPickup"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={recurringPickup?.map((list) => ({
                                            label: list?.label,
                                            value: list?.value,
                                        }))}
                                        error={errors?.recurringPickup}
                                        placeholder="Recurring Pickup"
                                    />
                                )}
                            />
                            {errors?.recurringPickup && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.recurringPickup?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="pickupTime"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={pickupTime?.map((list) => ({
                                            label: list?.label,
                                            value: list?.value,
                                        }))}
                                        error={errors?.pickupTime}
                                        placeholder="Pickup Time"
                                    />
                                )}
                            />
                            {errors?.pickupTime && (
                                <Form.Text className="text-danger text-start">{errors?.pickupTime?.message}</Form.Text>
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

export default PickupModel;
