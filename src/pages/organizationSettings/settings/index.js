import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { generalSetting, generalSettingUpdate } from '../../../redux/actions';
import { validationSchema, initialValues, openForAllZipCodeOptions, autoDriverAssignOptions } from './FormData';
import { getBase64 } from '../../../helpers/imageToBase64';
import AddressMap from './AddressMap';
import MainLoader from '../../../components/MainLoader';
import ToastHandle from '../../../helpers/toastMessage';
import Field from '../../../components/Form Components/Field';
// import ImageUploader from '../../../components/Form Components/ImageUploader';
import NewImageUploader from '../../../components/Form Components/NewImageUploader';
import MobileField from '../../../components/Form Components/MobileField';
import SingleSelect from '../../../components/Form Components/SelectField';

const OrganizationSetting = () => {
    const [mapCoord, setMapCoord] = useState(null);
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const generalSettingData = store.GeneralSetting.generalSettings;
    const generalSettingLoader = store.GeneralSetting;
    const generalSettingStatus = store?.GeneralSettingUpdate?.status;
    const generalSettingMessage = store?.GeneralSettingUpdate?.message;
    const generalSettingUpdateLoader = store.GeneralSettingUpdate;
    const current_build = store?.Auth?.current_build;
    const country_code = store?.Auth?.country_code;

    useEffect(() => {
        dispatch(generalSetting());
    }, []);

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });
    let countryData = [];
    const getFormData = () => {
        reset({
            name: generalSettingData?.shop_name,
            address1: generalSettingData?.shop_address1,
            address2: generalSettingData?.shop_address2,
            city: generalSettingData?.shop_city,
            state: generalSettingData?.shop_state,
            zipCode: generalSettingData?.shop_zip,
            country: generalSettingData?.country,
            language: generalSettingData?.sys_lang,
            businessMobile: generalSettingData?.shop_phone,
            landline: generalSettingData?.shop_mobile,
            emailId: generalSettingData?.shop_email,
            logo: generalSettingData?.shop_logo,
            timeZone: generalSettingData?.sys_timezone,
            currency: generalSettingData?.sys_currency,
            showSystem: generalSettingData?.sys_currency_show,
            setCurrencyDecimal: generalSettingData?.no_of_decimal_places,
            allZipCode: generalSettingData?.openpincode,
            templateName: generalSettingData?.template_name,
            mobileTemplate: generalSettingData?.mobile_template,
            orderId: '1',
            autoDriverAssign: generalSettingData?.auto_driver_assign,
            challanForm: generalSettingData?.challan_name,
            pickup: generalSettingData?.pickup_requestid_from,
            delivery: generalSettingData?.delivery_requestid_from,
            facebook: generalSettingData?.face_link,
            instagram: generalSettingData?.inst_link,
            twitter: generalSettingData?.twit_link,
            skype: generalSettingData?.skyp_link,
            linkedin: generalSettingData?.linkd_link,
            yelp: generalSettingData?.yelp_link,
            retailOrderForm: '',
            pinterestLink: generalSettingData?.pininterest_link,
            googleMap: generalSettingData?.shop_gmap,
        });
    };
    useEffect(() => {
        getFormData();
        countryData = generalSettingData.currency;
        setMapCoord({
            lat: generalSettingData?.shop_gmap?.split(',')[0],
            lng: generalSettingData?.shop_gmap?.split(',')[1],
        });
    }, [generalSettingData]);

    const updateMapcoordinates = (data) => {
        setMapCoord(data);
    };

    const onSubmit = async (data) => {
        data.googleMap = '' + mapCoord?.lat + ',' + mapCoord?.lng;
        console.log('Value:', data);
    };

    return (
        <Card className="my-2">
            {generalSettingUpdateLoader?.loading ? (
                <MainLoader />
            ) : (
                <>
                    {generalSettingLoader?.loading ? (
                        <MainLoader />
                    ) : (
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="d-flex">
                                    <span style={{ width: '122px' }}>
                                        <p className="fw-semibold font-13">Business Details</p>
                                    </span>
                                    <hr width="100%" />
                                </div>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Name"
                                            placeholder="Name"
                                            type="text"
                                            disabled={false}
                                            error={errors?.name}
                                            errorMessage={errors?.name?.message}
                                            register={register('name')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <MobileField
                                            label="Mobile"
                                            current_build={current_build}
                                            country_code={country_code}
                                            disabled={false}
                                            error={errors?.businessMobile}
                                            register={register('businessMobile')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
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
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Email"
                                            placeholder="Email"
                                            type="email"
                                            disabled={false}
                                            error={errors?.emailId}
                                            errorMessage={errors?.emailId?.message}
                                            register={register('emailId')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Currency (Rs)"
                                            placeholder="Currency (Rs)"
                                            type="text"
                                            disabled={false}
                                            error={errors?.currency}
                                            errorMessage={errors?.currency?.message}
                                            register={register('currency')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Time Zone"
                                            placeholder="Time Zone"
                                            type="text"
                                            disabled={false}
                                            error={errors?.timeZone}
                                            errorMessage={errors?.timeZone?.message}
                                            register={register('timeZone')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Set currency in no. of decimal places "
                                            placeholder="Set currency in no. of decimal places"
                                            type="text"
                                            disabled={false}
                                            error={errors?.setCurrencyDecimal}
                                            errorMessage={errors?.setCurrencyDecimal?.message}
                                            register={register('setCurrencyDecimal')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Mobile Template"
                                            placeholder="Mobile Template"
                                            type="text"
                                            disabled={false}
                                            error={errors?.mobileTemplate}
                                            errorMessage={errors?.mobileTemplate?.message}
                                            register={register('mobileTemplate')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Start Pickup Request Id from"
                                            placeholder="Start Pickup Request Id from"
                                            type="text"
                                            disabled={false}
                                            error={errors?.pickup}
                                            errorMessage={errors?.pickup?.message}
                                            register={register('pickup')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Start Delivery Request Id from"
                                            placeholder="Start Delivery Request Id from"
                                            type="text"
                                            disabled={false}
                                            error={errors?.delivery}
                                            errorMessage={errors?.delivery?.message}
                                            register={register('delivery')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Start Order Id From"
                                            placeholder="Start Order Id From"
                                            type="text"
                                            disabled={false}
                                            error={errors?.pickup}
                                            errorMessage={errors?.pickup?.message}
                                            register={register('pickup')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Start Retail Orderid From"
                                            placeholder="Start Retail Orderid From"
                                            type="text"
                                            disabled={false}
                                            error={errors?.delivery}
                                            errorMessage={errors?.delivery?.message}
                                            register={register('delivery')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Template Name"
                                            placeholder="Template Name"
                                            type="text"
                                            disabled={false}
                                            error={errors?.templateName}
                                            errorMessage={errors?.templateName?.message}
                                            register={register('templateName')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Show System"
                                            placeholder="Show System"
                                            type="text"
                                            disabled={false}
                                            error={errors?.showSystem}
                                            errorMessage={errors?.showSystem?.message}
                                            register={register('showSystem')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Choose Language"
                                            placeholder="Choose Language"
                                            type="text"
                                            disabled={false}
                                            error={errors?.language}
                                            errorMessage={errors?.language?.message}
                                            register={register('language')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Start Challan from"
                                            placeholder="Start Challan from"
                                            type="text"
                                            disabled={false}
                                            error={errors?.challanForm}
                                            errorMessage={errors?.challanForm?.message}
                                            register={register('challanForm')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Controller
                                            control={control}
                                            name="allZipCode"
                                            render={({ field }) => (
                                                <SingleSelect
                                                    isMulti={false}
                                                    field={field}
                                                    options={openForAllZipCodeOptions}
                                                    error={errors?.allZipCode}
                                                    placeholder="Open For All ZipCode"
                                                />
                                            )}
                                        />
                                        {errors?.allZipCode && (
                                            <Form.Text className="text-danger text-start">
                                                {errors?.allZipCode?.message}
                                            </Form.Text>
                                        )}
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Controller
                                            control={control}
                                            name="autoDriverAssign"
                                            render={({ field }) => (
                                                <SingleSelect
                                                    isMulti={false}
                                                    field={field}
                                                    options={autoDriverAssignOptions}
                                                    error={errors?.autoDriverAssign}
                                                    placeholder="Auto Driver Assign"
                                                />
                                            )}
                                        />
                                        {errors?.autoDriverAssign && (
                                            <Form.Text className="text-danger text-start">
                                                {errors?.autoDriverAssign?.message}
                                            </Form.Text>
                                        )}
                                    </Col>

                                    {/* <Col lg={6} className="text-start align-self-center">
                                        <Form.Group controlId="ne_taxExempt" className="my-1">
                                            <Row className="d-flex ">
                                                <Col lg={6} className="d-flex">
                                                    <Form.Label className="switchLabel">Auto Driver Assign </Form.Label>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch"
                                                        className="switch"
                                                        label=""
                                                        {...register('off', { required: true })}
                                                    />
                                                    {errors?.off && (
                                                        <Form.Text className="text-danger text-start">
                                                            {errors?.off?.message}
                                                        </Form.Text>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col> */}
                                </Row>
                                {/* <ImageUploader name="logo" register={register('logo')} setValue={setValue} /> */}
                                <NewImageUploader
                                    name="logo"
                                    register={register('logo')}
                                    setValue={setValue}
                                    label="Logo"
                                    image={watch('logo')}
                                />
                                <div className="d-flex">
                                    <span style={{ width: '122px' }}>
                                        <p className="fw-semibold font-13">Address Details</p>
                                    </span>
                                    <hr width="100%" />
                                </div>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Address/Apt no"
                                            placeholder="Address/Apt no"
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
                                            label="City"
                                            placeholder="City"
                                            type="text"
                                            disabled={false}
                                            error={errors?.city}
                                            errorMessage={errors?.city?.message}
                                            register={register('city')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="State"
                                            placeholder="State"
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
                                        <Controller
                                            control={control}
                                            name="country"
                                            render={({ field }) => (
                                                <SingleSelect
                                                    isMulti={false}
                                                    field={field}
                                                    options={
                                                        Array.isArray(countryData)
                                                            ? countryData?.map((list) => ({
                                                                  label: list?.country_name,
                                                                  value: list?.id,
                                                              }))
                                                            : []
                                                    }
                                                    error={errors?.country}
                                                    placeholder="Country"
                                                />
                                            )}
                                        />
                                        {errors?.country && (
                                            <Form.Text className="text-danger text-start">
                                                {errors?.country?.message}
                                            </Form.Text>
                                        )}
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Zip Code"
                                            placeholder="Zip Code"
                                            type="text"
                                            disabled={false}
                                            error={errors?.zipCode}
                                            errorMessage={errors?.zipCode?.message}
                                            register={register('zipCode')}
                                        />
                                    </Col>
                                </Row>
                                <div className="my-2" style={{ height: '300px', width: '100%', position: 'relative' }}>
                                    <Row>
                                        <Col lg={12}>
                                            {mapCoord && (
                                                <AddressMap center={mapCoord} setMapCoord={updateMapcoordinates} />
                                            )}
                                        </Col>
                                    </Row>
                                </div>

                                <div className="d-flex">
                                    <span style={{ width: '122px' }}>
                                        <p className="fw-semibold font-13">Social Site Details</p>
                                    </span>
                                    <hr width="100%" />
                                </div>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Facebook Link"
                                            placeholder="Facebook Link"
                                            type="text"
                                            disabled={false}
                                            error={errors?.facebook}
                                            errorMessage={errors?.facebook?.message}
                                            register={register('facebook')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Instagram Link"
                                            placeholder="Instagram Link"
                                            type="text"
                                            disabled={false}
                                            error={errors?.state}
                                            errorMessage={errors?.instagram?.message}
                                            register={register('instagram')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Twitter Link"
                                            placeholder="Twitter Link"
                                            type="text"
                                            disabled={false}
                                            error={errors?.twitter}
                                            errorMessage={errors?.twitter?.message}
                                            register={register('twitter')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Skype Link"
                                            placeholder="Skype Link"
                                            type="text"
                                            disabled={false}
                                            error={errors?.skype}
                                            errorMessage={errors?.skype?.message}
                                            register={register('skype')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Linkedin Link"
                                            placeholder="Linkedin Link"
                                            type="text"
                                            disabled={false}
                                            error={errors?.linkedin}
                                            errorMessage={errors?.linkedin?.message}
                                            register={register('linkedin')}
                                        />
                                    </Col>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Yelp Link"
                                            placeholder="Yelp Link"
                                            type="text"
                                            disabled={false}
                                            error={errors?.yelp}
                                            errorMessage={errors?.yelp?.message}
                                            register={register('yelp')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} className="my-1">
                                        <Field
                                            label="Pinterest Link"
                                            placeholder="Pinterest Link"
                                            type="text"
                                            disabled={false}
                                            error={errors?.pinterestLink}
                                            errorMessage={errors?.pinterestLink?.message}
                                            register={register('pinterestLink')}
                                        />
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center mt-2">
                                    <Button
                                        className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                                        onClick={getFormData}>
                                        Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                                    </Button>
                                    <Button className="rounded-pill mx-2" type="submit">
                                        Update <i className="bi bi-save"></i>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    )}
                </>
            )}
        </Card>
    );
};

export default OrganizationSetting;
