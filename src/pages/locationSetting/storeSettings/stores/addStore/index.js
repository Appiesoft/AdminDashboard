import React, { useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { validationSchema, initialValues, assignPriceListOptions, statusOptions } from './FormData';
import { storeCreate, priceList, storeDetails, storeUpdate } from '../../../../../redux/actions';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../../../../../components/BreadCrumb';
import Field from '../../../../../components/Form Components/Field';
import MobileField from '../../../../../components/Form Components/MobileField';
import SelectField from '../../../../../components/Form Components/SelectField';
import ToastHandle from '../../../../../helpers/toastMessage';
import NewImageUploader from '../../../../../components/Form Components/NewImageUploader';
import MainLoader from '../../../../../components/MainLoader';

const StoreForm = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const current_build = store?.Auth?.current_build;
    const country_code = store?.Auth?.country_code;
    const createStore = store?.StoreCreate;
    const updateStore = store?.StoreUpdate;
    const priceListData = store.PriceList?.priceList?.data;
    const storeDetailData = store.StoreDetails;

    console.log('StoreDetails', storeDetailData);

    useEffect(() => {
        dispatch(
            priceList({
                searchValue: '',
                pageNumber: '',
                showLimit: '',
            })
        );
    }, []);

    useEffect(() => {
        if (createStore?.status === true) {
            ToastHandle('success', createStore?.message);
            navigate(-1);
        } else if (createStore?.status === false) {
            ToastHandle('error', createStore?.message);
        }
    }, [createStore]);
    useEffect(() => {
        if (updateStore?.status === true) {
            ToastHandle('success', updateStore?.message);
            navigate(-1);
        } else if (updateStore?.status === false) {
            ToastHandle('error', updateStore?.message);
        }
    }, [updateStore]);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    const resetForm = () => {
        if (storeId) {
            reset({
                store_name: storeDetailData?.storeDetails?.store_name,
                short_name: storeDetailData?.storeDetails?.short_name,
                mobile: storeDetailData?.storeDetails?.phone,
                email_id: storeDetailData?.storeDetails?.email,
                password: '',
                status: '',
                address1: storeDetailData?.storeDetails?.address1,
                address2: storeDetailData?.storeDetails?.address2,
                assignVendor: '',
                assignPriceList: [],
                defaultRetailPriceList: '',
                description: storeDetailData?.storeDetails?.remarks,
                city: storeDetailData?.storeDetails?.city,
                state: storeDetailData?.storeDetails?.state,
                zipcode: storeDetailData?.storeDetails?.zipcode,
                landline: storeDetailData?.storeDetails?.landline,
                store_tax_no: storeDetailData?.storeDetails?.store_tax_no,
                store_logo: '',
                // is_main_store: '',
                store_zipcode: '',
                default_price_list_id: '',
                country: '',
            });
        } else {
            reset(initialValues);
        }
    };

    useEffect(() => {
        resetForm();
    }, [storeDetailData]);

    useEffect(() => {
        dispatch(
            storeDetails({
                storeId: storeId,
            })
        );
    }, [storeId]);

    const onSubmit = (data) => {
        if (storeId) {
            dispatch(
                storeUpdate({
                    storeId: storeId,
                    storeName: data?.store_name,
                    shortName: data?.short_name,
                    mobile: data?.mobile.replace(/ /g, ''),
                    emailId: data?.email_id,
                    password: data?.password,
                    status: data?.status,
                    address1: data?.address1,
                    address2: data?.address2,
                    city: data?.city,
                    state: data?.state,
                    zipcode: data?.zipcode,
                    landline: data?.landline,
                    storeTaxNo: data?.store_tax_no,
                    isMainStore: 'yes',
                    defaultPriceListId: '1',
                })
            );
        } else {
            dispatch(
                storeCreate({
                    storeName: data?.store_name,
                    shortName: data?.short_name,
                    mobile: data?.mobile.replace(/ /g, ''),
                    emailId: data?.email_id,
                    password: data?.password,
                    status: data?.status,
                    address1: data?.address1,
                    address2: data?.address2,
                    city: data?.city,
                    state: data?.state,
                    zipcode: data?.zipcode,
                    landline: data?.landline,
                    storeTaxNo: data?.store_tax_no,
                    isMainStore: 'yes',
                    defaultPriceListId: '1',
                    // defaultPriceListId: data?.default_price_list_id,
                })
            );
        }
    };

    return (
        <>
            <BreadCrumb currPage="Create Store" prevPage="Stores" />
            <Card>
                <Card.Body>
                    {storeDetailData?.loading ? (
                        <MainLoader />
                    ) : (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex">
                                <span style={{ width: '80px' }}>
                                    <p>Store Info.</p>
                                </span>
                                <hr width="100%" />
                            </div>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Store Name"
                                        placeholder="Store Name"
                                        type="text"
                                        disabled={false}
                                        error={errors?.store_name}
                                        errorMessage={errors?.store_name?.message}
                                        register={register('store_name')}
                                    />
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Short Name"
                                        placeholder="Short Name"
                                        type="text"
                                        disabled={false}
                                        error={errors?.short_name}
                                        errorMessage={errors?.short_name?.message}
                                        register={register('short_name')}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <MobileField
                                        label="Mobile"
                                        current_build={current_build}
                                        country_code={country_code}
                                        disabled={false}
                                        error={errors?.mobile}
                                        register={register('mobile')}
                                    />
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Landline"
                                        placeholder="Landline"
                                        type="text"
                                        disabled={false}
                                        error={errors?.landline}
                                        errorMessage={errors?.landline?.message}
                                        register={register('landline')}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
                                        disabled={false}
                                        error={errors?.email_id}
                                        errorMessage={errors?.email_id?.message}
                                        register={register('email_id')}
                                    />
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Tax Id"
                                        placeholder="Tax Id"
                                        type="text"
                                        disabled={false}
                                        error={errors?.store_tax_no}
                                        errorMessage={errors?.store_tax_no?.message}
                                        register={register('store_tax_no')}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Store Password"
                                        placeholder="Store Password"
                                        type="password"
                                        disabled={false}
                                        error={errors?.password}
                                        errorMessage={errors?.password?.message}
                                        register={register('password')}
                                    />
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Zip Code"
                                        placeholder="Zip Code"
                                        type="text"
                                        disabled={false}
                                        error={errors?.zipcode}
                                        errorMessage={errors?.zipcode?.message}
                                        register={register('zipcode')}
                                    />
                                </Col>
                            </Row>

                            <div className="d-flex">
                                <span style={{ width: '120px' }}>
                                    <p>Store Address.</p>
                                </span>
                                <hr width="100%" />
                            </div>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Address/Apt No."
                                        placeholder="Address/Apt No."
                                        type="text"
                                        disabled={false}
                                        error={errors?.address1}
                                        errorMessage={errors?.address1?.message}
                                        register={register('address1')}
                                    />
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Address 2"
                                        placeholder="Address 2"
                                        type="text"
                                        disabled={false}
                                        error={errors?.address2}
                                        errorMessage={errors?.address2?.message}
                                        register={register('address2')}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Store City"
                                        placeholder="Store City"
                                        type="text"
                                        disabled={false}
                                        error={errors?.city}
                                        errorMessage={errors?.city?.message}
                                        register={register('city')}
                                    />
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Store state"
                                        placeholder="Store state"
                                        type="text"
                                        disabled={false}
                                        error={errors?.state}
                                        errorMessage={errors?.state?.message}
                                        register={register('state')}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Store Zip Code"
                                        placeholder="Store Zip Code"
                                        type="text"
                                        disabled={false}
                                        error={errors?.store_zipcode}
                                        errorMessage={errors?.store_zipcode?.message}
                                        register={register('store_zipcode')}
                                    />
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Store Country"
                                        placeholder="Store Country"
                                        type="text"
                                        disabled={false}
                                        error={errors?.country}
                                        errorMessage={errors?.country?.message}
                                        register={register('country')}
                                    />
                                </Col>
                            </Row>
                            <div className="d-flex">
                                <span style={{ width: '120px' }}>
                                    <p>Other Details.</p>
                                </span>
                                <hr width="100%" />
                            </div>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Controller
                                        control={control}
                                        name="default_price_list_id"
                                        render={({ field }) => (
                                            <SelectField
                                                isMulti={false}
                                                field={field}
                                                options={assignPriceListOptions}
                                                error={errors?.default_price_list_id}
                                                placeholder="Select form Default Price List"
                                            />
                                        )}
                                    />
                                    {errors?.default_price_list_id && (
                                        <Form.Text className="text-danger text-start">
                                            {errors?.default_price_list_id?.message}
                                        </Form.Text>
                                    )}
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Controller
                                        control={control}
                                        name="status"
                                        render={({ field }) => (
                                            <SelectField
                                                isMulti={false}
                                                field={field}
                                                options={statusOptions}
                                                error={errors?.status}
                                                placeholder="Select form Price List"
                                            />
                                        )}
                                    />
                                    {errors?.status && (
                                        <Form.Text className="text-danger text-start">
                                            {errors?.status?.message}
                                        </Form.Text>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Controller
                                        control={control}
                                        name="assignVendor"
                                        render={({ field }) => (
                                            <SelectField
                                                isMulti={false}
                                                field={field}
                                                options={assignPriceListOptions}
                                                error={errors?.assignVendor}
                                                placeholder="Assign Vendor"
                                            />
                                        )}
                                    />
                                    {errors?.assignVendor && (
                                        <Form.Text className="text-danger text-start">
                                            {errors?.assignVendor?.message}
                                        </Form.Text>
                                    )}
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Controller
                                        control={control}
                                        name="assignPriceList"
                                        render={({ field }) => (
                                            <SelectField
                                                isMulti={true}
                                                field={field}
                                                options={
                                                    Array.isArray(priceListData)
                                                        ? priceListData.map((item) => ({
                                                              label: item.price_list_name,
                                                              value: item.id,
                                                          }))
                                                        : []
                                                }
                                                error={errors?.assignPriceList}
                                                placeholder="Assign Price List"
                                            />
                                        )}
                                    />
                                    {errors?.assignPriceList && (
                                        <Form.Text className="text-danger text-start">
                                            {errors?.assignPriceList?.message}
                                        </Form.Text>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} className="my-1">
                                    <Controller
                                        control={control}
                                        name="defaultRetailPriceList"
                                        render={({ field }) => (
                                            <SelectField
                                                isMulti={false}
                                                field={field}
                                                options={assignPriceListOptions}
                                                error={errors?.defaultRetailPriceList}
                                                placeholder="Default Retail Price List"
                                            />
                                        )}
                                    />
                                    {errors?.defaultRetailPriceList && (
                                        <Form.Text className="text-danger text-start">
                                            {errors?.defaultRetailPriceList?.message}
                                        </Form.Text>
                                    )}
                                </Col>
                                <Col lg={6} className="my-1">
                                    <Field
                                        label="Description"
                                        placeholder="Description"
                                        type="text"
                                        disabled={false}
                                        error={errors?.description}
                                        errorMessage={errors?.description?.message}
                                        register={register('description')}
                                    />
                                </Col>
                            </Row>
                            <NewImageUploader
                                name="store_logo"
                                register={register('store_logo')}
                                setValue={setValue}
                                label="Store Logo"
                                image={watch('store_logo')}
                            />
                            <div className="d-flex justify-content-center mt-2">
                                <Button
                                    className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                                    onClick={resetForm}>
                                    Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                                </Button>
                                <Button className="rounded-pill mx-2" type="submit">
                                    {storeId ? 'Update' : 'Create'} <i className="bi bi-save"></i>
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default StoreForm;
