import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select, { components } from 'react-select';
import InputMask from 'react-input-mask';
import { InputGroup } from 'react-bootstrap';
import Flag from 'react-world-flags';
import './NewCustomer.scss';
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import {
    discountChargesList,
    laundryPackagesList,
    priceList,
    promoCouponList,
    storeList,
} from '../../../redux/actions';

import { validationSchema, initialValues, locations } from './FormData';
import { useParams } from 'react-router-dom';
import { customerDetail } from '../../../redux/actions';
const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children?.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
        </ValueContainer>
    );
};

const CreateCustomer = () => {
    const dispatch = useDispatch();
    const [position, setPosition] = useState(null);
    const [formData, setFormData] = useState(null);
    const { customerId } = useParams();

    console.log('CustomerId:', customerId);

    const store = useSelector((state) => state);
    const current_build = store?.Auth?.current_build;
    const country_code = store?.Auth?.country_code;
    const storeListData = store?.StoreList?.storeList;
    const laundryPackagesListData = store?.LaundryPackagesList?.laundryPackagesList?.data;
    const priceListData = store.PriceList?.priceList?.data;
    const discountChargeData = store?.DiscountChargesList?.discountChargesList?.data;
    const promoCouponData = store?.PromoCouponList?.promoCouponList?.data;

    const customerDetailData = store.CustomerDetail?.customerDetail;

    console.log('CustomerDetail:', customerDetailData);

    useEffect(() => {
        dispatch(
            storeList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            })
        );
        dispatch(
            laundryPackagesList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            })
        );
        dispatch(
            priceList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            })
        );
        dispatch(
            discountChargesList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            })
        );
        dispatch(
            promoCouponList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            })
        );
    }, []);

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

    console.log('rendering...');
    //browser lat lng
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) =>
                    setPosition({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    }),
                (err) => console.error(err)
            );
        }
    }, []);

    console.log('Postion:', position);

    useEffect(() => {
        dispatch(customerDetail({ customerId: customerId }));
    }, [customerId]);

    useEffect(() => {
        setFormData(customerDetailData);
    }, [customerDetailData]);

    return (
        <Card className="mt-1">
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex">
                        <span style={{ width: '122px' }}>
                            <p>Personal Details</p>
                        </span>
                        <hr width="100%" />
                    </div>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Customer ID"
                                className={errors?.customerId && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('customerId')}
                                    placeholder="Customer ID"
                                    value="65"
                                    disabled
                                    isInvalid={errors?.customerId}
                                />
                            </FloatingLabel>
                            {errors?.customerId && (
                                <Form.Text className="text-danger">{errors.customerId.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <Controller
                                control={control}
                                name="joinDate"
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
                                                    label="Join Date"
                                                    className={`w-100 ${errors?.joinDate && 'text-danger'}`}>
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
                                                        placeholder="Join Date"
                                                    />
                                                </FloatingLabel>
                                                <div style={{ marginLeft: '1px !important', width: '15%' }}>
                                                    <span
                                                        className="bg-primary text-white d-flex justify-content-center align-items-center rounded-end"
                                                        style={{ height: 'calc(2.9rem + 2px)' }}>
                                                        <i className="mdi mdi-calendar-range font-15"></i>
                                                    </span>
                                                </div>
                                                {errors?.joinDate && (
                                                    <Form.Text className="text-danger text-start">
                                                        {errors?.joinDate?.message}
                                                    </Form.Text>
                                                )}
                                            </div>
                                        }
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="First name"
                                className={errors?.first_name && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('first_name', { required: true })}
                                    placeholder="First name"
                                    isInvalid={errors.first_name}
                                />
                            </FloatingLabel>
                            {errors?.first_name && (
                                <Form.Text className="text-danger text-start">{errors.first_name?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Last name"
                                className={errors?.last_name && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('last_name')}
                                    placeholder="Last Name"
                                    isInvalid={errors?.last_name}
                                />
                            </FloatingLabel>
                            {errors?.last_name && (
                                <Form.Text className="text-danger text-start">{errors.last_name?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className={errors?.email_id && 'text-danger'}>
                                <Form.Control
                                    type="email"
                                    {...register('email_id', { required: true })}
                                    placeholder="Email"
                                    isInvalid={errors.email_id}
                                />
                            </FloatingLabel>
                            {errors?.email_id && (
                                <Form.Text className="text-danger text-start">{errors.email_id?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <InputGroup className={`border rounded ${errors?.mobile && 'text-danger border-danger'}`}>
                                <div
                                    className={`d-flex justify-content-center align-items-center`}
                                    style={{ width: '20%' }}>
                                    <Flag
                                        code={current_build?.length > 1 ? current_build : 'in'}
                                        height="16"
                                        fallback={<span>N/A</span>}
                                    />
                                    &nbsp; {country_code?.length > 1 ? country_code : '+91'}
                                </div>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Phone"
                                    style={{ width: '80%' }}
                                    className="border-start">
                                    <InputMask
                                        mask={current_build === 'us' ? '(999) 999-9999' : '99999 99999'}
                                        maskChar={null}
                                        placeholder="Enter phone number"
                                        className="form-control"
                                        isInvalid={errors?.mobile}
                                        {...register('mobile')}
                                        style={{ border: 'none' }}
                                    />
                                </FloatingLabel>
                            </InputGroup>
                            {errors?.mobile && (
                                <Form.Text className="text-danger text-start">{errors.mobile?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <div className="d-flex">
                        <span style={{ width: '122px' }}>
                            <p>Address Details</p>
                        </span>
                        <hr />
                    </div>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Address"
                                className={errors?.address && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('address', { required: true })}
                                    placeholder="Address"
                                    isInvalid={errors.address}
                                />
                            </FloatingLabel>
                            {errors?.address && (
                                <Form.Text className="text-danger text-start">{errors?.address.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="City"
                                className={errors?.city && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('city')}
                                    placeholder="City"
                                    isInvalid={errors.city}
                                />
                            </FloatingLabel>
                            {errors.city && (
                                <Form.Text className="text-danger text-start">{errors.city?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Pin Code"
                                className={errors?.zipcode && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('zipcode', { required: true })}
                                    placeholder="Pin Code"
                                    isInvalid={errors.zipcode}
                                />
                            </FloatingLabel>
                            {errors?.zipcode && (
                                <Form.Text className="text-danger text-start">{errors?.zipcode?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <Controller
                                control={control}
                                name="location_for"
                                render={({ field }) => (
                                    <Select
                                        inputRef={field.ref}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        options={locations}
                                        isClearable
                                        defaultValue={field.value}
                                        onChange={(val) => field.onChange(val.value)}
                                        components={{
                                            ValueContainer: CustomValueContainer,
                                        }}
                                        placeholder="Select Location"
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                overflow: 'visible',
                                            }),
                                            container: (provided, state) => ({
                                                ...provided,
                                                // marginTop: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: errors?.location_for && '#fa5c7c  !important',
                                                height: 'calc(2.9rem + 2px)',
                                            }),
                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                position:
                                                    state.hasValue || state.selectProps.inputValue
                                                        ? 'absolute'
                                                        : 'sticky',
                                                fontWeight: 600,
                                                top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                                                transform:
                                                    (state.hasValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important') ||
                                                    (state.selectProps.inputValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important'),
                                                backgroundColor: 'transparent',
                                                backdropFilter: 'blur(1px)',
                                                color: errors?.location_for && '#fa5c7c  !important',
                                            }),
                                        }}
                                    />
                                )}
                            />
                            {errors?.location_for && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.location_for?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>
                    <div className="d-flex">
                        <span style={{ width: '122px' }}>
                            <p>Other Details</p>
                        </span>
                        <hr />
                    </div>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tax ID"
                                className={errors?.tax_id && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('tax_id', { required: true })}
                                    placeholder="Tax ID"
                                    isInvalid={errors.tax_id}
                                />
                            </FloatingLabel>
                            {errors?.tax_id && (
                                <Form.Text className="text-danger text-start">{errors?.tax_id?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start align-self-center">
                            <Form.Group controlId="ne_taxExempt">
                                <Row className="d-flex ">
                                    <Col lg={4} className="d-flex">
                                        <Form.Label className="switchLabel">Tax Exempt :</Form.Label>
                                    </Col>
                                    <Col lg={8}>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            className="switch"
                                            label=""
                                            {...register('tax_exempt', { required: true })}
                                        />
                                        {errors?.tax_exempt && (
                                            <Form.Text className="text-danger text-start">
                                                {errors?.tax_exempt?.message}
                                            </Form.Text>
                                        )}
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <Controller
                                control={control}
                                name="cust_charges"
                                render={({ field }) => (
                                    <Select
                                        inputRef={field.ref}
                                        options={discountChargeData?.map((discount) => ({
                                            label: discount?.charge_name + discount?.charge_amt,
                                            value: discount?.charge_id,
                                        }))}
                                        onChange={(selected) => {
                                            field.onChange(selected ? selected.map((option) => option.value) : []);
                                        }}
                                        isMulti
                                        isClearable
                                        defaultValue={field.value}
                                        label="Select a package"
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        components={{
                                            ValueContainer: CustomValueContainer,
                                        }}
                                        placeholder="Select Discount/Charges"
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                overflow: 'visible',
                                            }),
                                            container: (provided, state) => ({
                                                ...provided,
                                                // marginTop: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: errors?.cust_charges && '#fa5c7c  !important',
                                                minHeight: 'calc(2.9rem + 2px)',
                                            }),

                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontWeight: 600,
                                                position:
                                                    state.hasValue || state.selectProps.inputValue
                                                        ? 'absolute'
                                                        : 'sticky',
                                                top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                                                transform:
                                                    (state.hasValue &&
                                                        'scale(0.85) translateY(-0.1rem) translateX(-0.5rem)!important') ||
                                                    (state.selectProps.inputValue &&
                                                        'scale(0.85) translateY(-0.1rem) translateX(-0.5rem)!important'),
                                                backgroundColor: 'transparent',
                                                backdropFilter: 'blur(1px)',
                                                color: errors?.cust_charges && '#fa5c7c  !important',
                                            }),
                                        }}
                                    />
                                )}
                            />
                            {errors?.cust_charges && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.cust_charges?.message}
                                </Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <Controller
                                control={control}
                                name="promo"
                                render={({ field }) => (
                                    <Select
                                        inputRef={field.ref}
                                        options={promoCouponData?.map((promo) => ({
                                            label: promo?.charge_name + ' (' + promo?.charge_amt + ')',
                                            value: promo?.charge_id,
                                        }))}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        onChange={(selected) => {
                                            field.onChange(selected ? selected.map((option) => option.value) : []);
                                        }}
                                        isClearable
                                        isMulti
                                        components={{
                                            ValueContainer: CustomValueContainer,
                                        }}
                                        placeholder="Select Promo/Coupon"
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                overflow: 'visible',
                                            }),
                                            container: (provided, state) => ({
                                                ...provided,
                                                // marginTop: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: errors?.promo && '#fa5c7c !important',
                                                minHeight: 'calc(2.9rem + 2px)',
                                                // overflow:"visible"
                                            }),
                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontWeight: 600,
                                                position:
                                                    state.hasValue || state.selectProps.inputValue
                                                        ? 'absolute'
                                                        : 'sticky',
                                                top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                                                transform:
                                                    (state.hasValue &&
                                                        'scale(0.85) translateY(-0.1rem) translateX(-0.5rem)!important') ||
                                                    (state.selectProps.inputValue &&
                                                        'scale(0.85) translateY(-0.1rem) translateX(-0.5rem)!important'),
                                                backgroundColor: 'transparent',
                                                backdropFilter: 'blur(1px)',
                                                color: errors?.promo && '#fa5c7c !important',
                                            }),
                                        }}
                                    />
                                )}
                            />
                            {errors?.promo && (
                                <Form.Text className="text-danger text-start">{errors?.promo?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <Controller
                                control={control}
                                name="store_id"
                                render={({ field }) => (
                                    <Select
                                        inputRef={field.ref}
                                        options={storeListData?.map((store) => ({
                                            label: store?.store_name,
                                            value: store?.store_id,
                                        }))}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        defaultValue={field.value}
                                        isClearable
                                        onChange={(val) => field.onChange(val.value)}
                                        components={{
                                            ValueContainer: CustomValueContainer,
                                        }}
                                        placeholder="Select Store"
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                overflow: 'visible',
                                            }),
                                            container: (provided, state) => ({
                                                ...provided,
                                                // marginTop: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: errors?.store_id && '#fa5c7c !important',
                                                height: 'calc(2.9rem + 2px)',
                                                // overflow:"visible"
                                            }),
                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontWeight: 600,
                                                position:
                                                    state.hasValue || state.selectProps.inputValue
                                                        ? 'absolute'
                                                        : 'sticky',
                                                top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                                                transform:
                                                    (state.hasValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important') ||
                                                    (state.selectProps.inputValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important'),
                                                backgroundColor: 'transparent',
                                                backdropFilter: 'blur(1px)',
                                                color: errors?.store_id && '#fa5c7c !important',
                                            }),
                                        }}
                                    />
                                )}
                            />
                            {errors?.store_id && (
                                <Form.Text className="text-danger text-start">{errors?.store_id?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <Controller
                                control={control}
                                name="price_list_id"
                                render={({ field }) => (
                                    <Select
                                        inputRef={field.ref}
                                        options={priceListData?.map((list) => ({
                                            label: list?.price_list_name,
                                            value: list?.id,
                                        }))}
                                        defaultValue={field.value}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        onChange={(val) => field.onChange(val.value)}
                                        components={{
                                            ValueContainer: CustomValueContainer,
                                        }}
                                        isClearable
                                        placeholder="Select Price List"
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                overflow: 'visible',
                                            }),
                                            container: (provided, state) => ({
                                                ...provided,
                                                // marginTop: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: errors?.price_list_id && '#fa5c7c  !important',
                                                height: 'calc(2.9rem + 2px)',
                                                // overflow:"visible"
                                            }),
                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontWeight: 600,
                                                position:
                                                    state.hasValue || state.selectProps.inputValue
                                                        ? 'absolute'
                                                        : 'sticky',
                                                top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                                                transform:
                                                    (state.hasValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important') ||
                                                    (state.selectProps.inputValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important'),
                                                backgroundColor: 'transparent',
                                                backdropFilter: 'blur(1px)',
                                                color: errors?.price_list_id && '#fa5c7c  !important',
                                            }),
                                        }}
                                    />
                                )}
                            />
                            {errors?.price_list_id && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.price_list_id?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col lg={6} className="text-start">
                            <Controller
                                control={control}
                                name="package"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        inputRef={field.ref}
                                        options={laundryPackagesListData?.map((pkg) => ({
                                            label: pkg?.package_name,
                                            value: pkg?.pkg_id,
                                        }))}
                                        isClearable
                                        defaultValue={field.value}
                                        onChange={(val) => field.onChange(val.value)}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        components={{
                                            ValueContainer: CustomValueContainer,
                                        }}
                                        placeholder="Select a package"
                                        styles={{
                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                overflow: 'visible',
                                            }),
                                            container: (provided, state) => ({
                                                ...provided,
                                                // marginTop: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: errors?.package && '#fa5c7c !important',
                                                height: 'calc(2.9rem + 2px)',
                                                // overflow:"visible"
                                            }),
                                            placeholder: (baseStyles, state) => ({
                                                ...baseStyles,
                                                fontWeight: 600,
                                                position:
                                                    state.hasValue || state.selectProps.inputValue
                                                        ? 'absolute'
                                                        : 'sticky',
                                                top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                                                transform:
                                                    (state.hasValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important') ||
                                                    (state.selectProps.inputValue &&
                                                        'scale(0.85) translateY(-0.2rem) translateX(-0.5rem)!important'),
                                                backgroundColor: 'transparent',
                                                backdropFilter: 'blur(1px)',
                                                color: errors?.package && '#fa5c7c !important',
                                            }),
                                        }}
                                    />
                                )}
                            />

                            {errors?.package && (
                                <Form.Text className="text-danger text-start">{errors?.package?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="text-start">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Preferences"
                                className={errors?.preferences && 'text-danger'}>
                                <Form.Control
                                    type="text"
                                    {...register('preferences', { required: true })}
                                    placeholder="Preferences"
                                    isInvalid={errors.preferences}
                                />
                            </FloatingLabel>
                            {errors?.preferences && (
                                <Form.Text className="text-danger text-start">{errors.preferences?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center  py-3">
                            <Button type="submit" className="btn btn-success">
                                Save
                            </Button>
                            <Button className="btn btn-error ms-4" onClick={() => reset(initialValues)}>
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateCustomer;
