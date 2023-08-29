import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { initialValues, validationSchema, roles } from './FormData';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Field from '../../../components/Form Components/Field';
import SelectField from '../../../components/Form Components/SelectField';
import { useSelector, useDispatch } from 'react-redux';
import MobileField from '../../../components/Form Components/MobileField';
import { storeList, groups, employeeCreate, employeeDetails, employeeUpdate } from '../../../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastHandle from '../../../helpers/toastMessage';
import BreadCrumb from '../../../components/BreadCrumb';

const CreateEmployee = () => {
    const [position, setPosition] = useState(null);
    const { empId } = useParams();
    // console.log('Employee Id:', empId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const current_build = store?.Auth?.current_build;
    const country_code = store?.Auth?.country_code;
    const storeListData = store?.StoreList?.storeList;
    const groupsData = store.Groups.groupsList;
    const errorHandle = store?.EmployeeCreate?.message?.status;
    const successHandle = store?.EmployeeCreate?.status;
    const employeeDetailsData = store?.EmployeeDetails;
    // const employeeDetailsStutas = store?.EmployeeDetails?.employeeDetails?.status;
    const employeeDetailUpdateStatus = store?.EmployeeUpdate?.employeeUpdate?.status;
    //loader while creating
    // const employeeCreateLoader = store?.EmployeeCreate;

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
        // shouldUnregister: true,
    });

    useEffect(() => {
        dispatch(
            storeList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 100,
            })
        );
        dispatch(groups());

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

    useEffect(() => {
        if (errorHandle === false) {
            toast.error(store?.EmployeeCreate?.message?.message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    }, [errorHandle]);

    useEffect(() => {
        if (successHandle === true) {
            // showBtn();
            ToastHandle('success', store?.EmployeeCreate?.message);
            navigate('/employeeTable');
        }
    }, [successHandle]);

    useEffect(() => {
        dispatch(employeeDetails({ employeeId: empId + '' }));
    }, [empId]);

    // console.log('employeeDetailsData', employeeDetailsData?.employeeDetails?.data);

    useEffect(() => {
        reset(employeeDetailsData?.employeeDetails?.data);
    }, [employeeDetailsData]);

    useEffect(() => {
        if (employeeDetailUpdateStatus) {
            toast.success(store?.EmployeeUpdate?.employeeUpdate?.message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            // toggle()
        } else if (employeeDetailUpdateStatus === false) {
            toast.error(store?.EmployeeUpdate?.employeeUpdate?.message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    }, [employeeDetailUpdateStatus]);

    return (
        <>
            <BreadCrumb prevPage={'Employee List'} currPage={'Employee'} />
            <Card>
                <Card.Body>
                    <Form
                        onSubmit={handleSubmit(
                            (data) => {
                                data.lat = position.lat + '';
                                data.long = position.lng + '';
                                data.country_code = country_code + '';
                                // console.log('submit');
                                if (empId) {
                                    // console.log('api hit');
                                    dispatch(
                                        employeeUpdate({
                                            employeeId: empId,
                                            firstName: data.first_name,
                                            lastName: data.last_name,
                                            mobile: data.mobile.replace(/ /g, ''),
                                            emailId: data.email_id,
                                            password: data.password,
                                            status: data.status,
                                            lat: position.lat + '',
                                            long: position.lng + '',
                                            address1: data.address1,
                                            address2: data.address2,
                                            countryCode: country_code,
                                            city: data.city,
                                            state: data.state,
                                            zipcode: data.zipcode,
                                            designation: data.designation,
                                            groupMemberId: data.group_member_id,
                                            driverRole: data.driver_role,
                                            pin: data.pin,
                                            stores: data.stores,
                                        })
                                    );
                                } else {
                                    dispatch(
                                        employeeCreate({
                                            firstName: data.first_name,
                                            lastName: data.last_name,
                                            mobile: data.mobile.replace(/ /g, ''),
                                            emailId: data.email_id,
                                            password: data.password,
                                            status: data.status,
                                            lat: position.lat + '',
                                            long: position.lng + '',
                                            address1: data.address1,
                                            address2: data.address2,
                                            countryCode: country_code,
                                            city: data.city,
                                            state: data.state,
                                            zipcode: data.zipcode,
                                            designation: data.designation,
                                            groupMemberId: data.group_member_id,
                                            driverRole: data.driver_role,
                                            pin: data.pin,
                                            stores: data.stores,
                                        })
                                    );
                                }
                            },
                            (err) => {
                                console.log(err);
                            }
                        )}>
                        <div className="d-flex">
                            <span style={{ width: '122px' }}>
                                <p className="fw-semibold font-13">Employee Details</p>
                            </span>
                            <hr width="100%" />
                        </div>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="First Name"
                                    placeholder="First Name"
                                    type="text"
                                    disabled={false}
                                    error={errors?.first_name}
                                    errorMessage={errors?.first_name?.message}
                                    register={register('first_name')}
                                />
                            </Col>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Last Name"
                                    placeholder="Last Name"
                                    type="text"
                                    disabled={false}
                                    error={errors?.last_name}
                                    errorMessage={errors?.last_name?.message}
                                    register={register('last_name')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Email"
                                    placeholder="Email"
                                    type="text"
                                    disabled={false}
                                    error={errors?.email_id}
                                    errorMessage={errors?.email_id?.message}
                                    register={register('email_id')}
                                />
                            </Col>
                            <Col lg={6} className="my-1">
                                <MobileField
                                    label="Mobile"
                                    error={errors?.mobile}
                                    current_build={current_build}
                                    country_code={country_code}
                                    register={register('mobile')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    disabled={false}
                                    error={errors?.password}
                                    errorMessage={errors?.password?.message}
                                    register={register('password')}
                                />
                            </Col>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="PIN"
                                    placeholder="PIN"
                                    type="text"
                                    disabled={false}
                                    error={errors?.pin}
                                    errorMessage={errors?.pin?.message}
                                    register={register('pin')}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="group_member_id"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={
                                                Array.isArray(groupsData)
                                                    ? groupsData?.map((list) => ({
                                                          label: list?.group_name,
                                                          value: list?.id,
                                                      }))
                                                    : []
                                            }
                                            error={errors?.group_member_id}
                                            placeholder="Member Group"
                                        />
                                    )}
                                />
                                {errors?.group_member_id && (
                                    <Form.Text className="text-danger text-start">
                                        {errors?.group_member_id?.message}
                                    </Form.Text>
                                )}
                            </Col>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="stores"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={true}
                                            options={
                                                Array.isArray(storeListData)
                                                    ? storeListData?.map((list) => ({
                                                          label: list?.store_name,
                                                          value: list?.store_id,
                                                      }))
                                                    : []
                                            }
                                            error={errors?.stores}
                                            placeholder="Laundry Stores"
                                        />
                                    )}
                                />
                                {errors?.stores && (
                                    <Form.Text className="text-danger text-start">{errors?.stores?.message}</Form.Text>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="driver_role"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={roles?.map((list) => ({
                                                label: list?.label,
                                                value: list?.value,
                                            }))}
                                            error={errors?.driver_role}
                                            placeholder="Driver Role"
                                        />
                                    )}
                                />
                                {errors?.driver_role && (
                                    <Form.Text className="text-danger text-start">
                                        {errors?.driver_role?.message}
                                    </Form.Text>
                                )}
                            </Col>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={roles?.map((list) => ({
                                                label: list?.label,
                                                value: list?.value,
                                            }))}
                                            error={errors?.status}
                                            placeholder="LogIn Status"
                                        />
                                    )}
                                />
                                {errors?.status && (
                                    <Form.Text className="text-danger text-start">{errors?.status?.message}</Form.Text>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Designation"
                                    placeholder="Designation"
                                    type="text"
                                    disabled={false}
                                    error={errors?.designation}
                                    errorMessage={errors?.designation?.message}
                                    register={register('designation')}
                                />
                            </Col>
                        </Row>
                        <div className="d-flex mt-1">
                            <span style={{ width: '130px' }}>
                                <p className="fw-semibold font-13">Employee Address</p>
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
                                    label="Address2"
                                    placeholder="Address2"
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
                            <Col lg={6} className="my-1">
                                <Field label="Country " placeholder="Country " type="text" disabled={false} />
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-2">
                            <Button
                                className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                                onClick={() => reset(initialValues)}>
                                Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                            </Button>
                            <Button className="rounded-pill mx-2" type="submit">
                                {empId ? 'Update' : 'Create'} <i className="bi bi-save"></i>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default CreateEmployee;
