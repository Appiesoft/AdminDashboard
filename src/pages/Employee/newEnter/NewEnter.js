import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Toast, Form, InputGroup, Button } from 'react-bootstrap';
import './NewEnter.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { employeeCreate } from '../../../redux/actions';
import HyperDatepicker from '../../../components/Datepicker';
import MainLoader from '../../../components/MainLoader';
// import { toast } from 'react-toastify';
import ToastHandle from '../../../helpers/toastMessage';

const NewEntery = ({ showBtn, restBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const employeeCreateStatus = store?.EmployeeCreate?.status;
    const employeeCreateMessage = store?.EmployeeCreate?.message;
    const successHandle = store?.EmployeeCreate?.status;


    const [message, setMessage] = useState(null);
    const [successbtn, setSuccessBtn] = useState(null);
    const newEnteryLorder = store?.EmployeeCreate;
    const [phoneCode, setPhoneCode] = useState("+91")


    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };


    const btnTransfer = () => {
        showBtn();
    };

    const {
        register,
        handleSubmit,
        unregister,
        watch,
        reset,
        getValues,
        formState: { errors },
    } = useForm();

    const onClickResetForBtn = () => {
        restBtn()
    }



    const handleReset = (e) => {
        reset({
            firstName: "",
            lastName: "",
            mobile: "",
            emailId: "",
            password: "",
            status: "",
            lat: "",
            long: "",
            address1: "",
            address2: "",
            countryCode: "",
            city: "",
            state: "",
            zipcode: "",
            designation: "",
            groupMemberId: "",
            driverRole: "",
            pin: "",
            stores: "",
        })
        setPhoneCode("+91")

    }



    const submitData = (data) => {

        dispatch(
            employeeCreate({
                firstName: data.firstName,
                lastName: data.lastName,
                mobile: data.mobile,
                emailId: data.emailId,
                password: data.password,
                status: data.loginStatus,
                lat: 454523524324.54,
                long: 34545454545.45,
                address1: data.addressAptNo,
                address2: data.address2,
                countryCode: phoneCode,
                city: data.city,
                state: data.state,
                zipcode: data.pinCode,
                designation: data.designation,
                groupMemberId: 3,
                driverRole: data.driverRole,
                pin: data.pin,
                stores: [1],
            })
        );
    };

    const starRequired = (<span className='text-danger'>*</span>)

    useEffect(() => {
        if (employeeCreateStatus) {
            ToastHandle('success', employeeCreateMessage);
            showBtn()
        } else if (employeeCreateStatus === false) {
            ToastHandle('error', employeeCreateMessage);
        }
    }, [employeeCreateStatus]);


    return (
        <>
            <Card>
                <Card.Body className="pt-0">
                    <Row className=" mb-2 d-flex align-items-center p-0 ms-1 my-2">
                        <Col xl={12}>
                            <div className="text-lg-end mt-xl-0 ">
                                <Row>
                                    <Col xl={12}>
                                        <div className="text-lg-end mt-xl-0 mt-2">
                                            <Button
                                                variant="white"
                                                className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                                onClick={btnTransfer}>
                                                <div className="d-flex align-items-center ">
                                                    <h4>
                                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                                    </h4>
                                                    <div>Employee List</div>
                                                </div>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    {newEnteryLorder?.loading ? (
                        <MainLoader />
                    ) : (
                        <Form
                            noValidate
                            onSubmit={handleSubmit(
                                (data) => {
                                    submitData(data);
                                },
                                (err) => {
                                    console.log(err);
                                }
                            )}>
                            <Row className="p-2 py-0">
                                <Col lg={12}>
                                    <Row className="mb-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_employeeid">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Employee ID :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('employeeId')}
                                                            placeholder="Employee ID"
                                                            isValid={false}
                                                            isInvalid={false}
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_joindate">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Join Date :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <HyperDatepicker
                                                            value={selectedDate}
                                                            inputClass="form-control-light"
                                                            onChange={(date) => {
                                                                onDateChange(date);
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_fistname">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            First Name{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control

                                                            type="text"
                                                            {...register('firstName', {
                                                                required: true,
                                                                pattern: /^[a-zA-Z]+$/,
                                                            })}
                                                            placeholder="First name"
                                                            isInvalid={errors.firstName}
                                                        />
                                                        {errors.firstName && (
                                                            <span className="text-danger">Alphabets allowed only</span>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_lastname">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Last Name :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            type="text"
                                                            {...register('lastName')}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_addressaptno">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Address/Apt no{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('addressAptNo', {
                                                                required: true,
                                                                minLength: 10,
                                                                maxLength: 40,
                                                            })}
                                                            placeholder="addressAptNo"
                                                            isInvalid={errors.addressAptNo}
                                                        />
                                                        {errors.addressAptNo && <span className='text-danger'>Please enter a complete address (minLength:
                                                            10</span>}

                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_address2">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Address2 :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('address2')}
                                                            placeholder="Address2"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_city">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            City{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('city', {
                                                                required: true,
                                                                pattern: /^[a-zA-Z]+$/,
                                                            })} isInvalid={errors.city}
                                                            placeholder="City"
                                                        />
                                                        {errors.city && <span className='text-danger'>Alphabets allowed only</span>}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_state">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            State{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('state', {
                                                                required: true,
                                                                pattern: /^[a-zA-Z]+$/,
                                                            })}
                                                            placeholder="State"
                                                            isInvalid={errors.state}
                                                        />
                                                        {errors.state && <span className='text-danger'>Alphabets allowed only</span>}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_pincode">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Zip Code :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            {...register('pinCode')}
                                                            placeholder="Pin Code"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_country">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Country :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('country')}
                                                            placeholder="Country"
                                                            value="India"
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_emailid">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Email ID{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="email"
                                                            {...register('emailId', {
                                                                required: 'Email is required',
                                                                pattern: {
                                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                    message: 'Please enter a valid email',
                                                                },
                                                            })}
                                                            placeholder="Email ID"
                                                            isInvalid={errors.emailId}
                                                        />
                                                        {errors.emailId && (
                                                            <span className="text-danger">
                                                                Please enter a valid email
                                                            </span>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_mobile">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Mobile{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <InputGroup>
                                                            <DropdownButton onSelect={(e) => { setPhoneCode(e) }}
                                                                variant="outline-secondary"
                                                                title=<i class="bi bi-flag me-2">{phoneCode}</i>>
                                                                <Dropdown.Item eventKey="+62" >+62</Dropdown.Item>
                                                                <Dropdown.Item eventKey="+52" >+52</Dropdown.Item>
                                                                <Dropdown.Item eventKey="+82" >+82</Dropdown.Item>
                                                                <Dropdown.Item eventKey="+92" >+92</Dropdown.Item>
                                                            </DropdownButton>
                                                            <Form.Control
                                                                type="number"
                                                                aria-label=" input with dropdown button"
                                                                {...register('mobile', {
                                                                    required: true,
                                                                    pattern: {
                                                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                                                        message: "only numbers are allowed"
                                                                    },
                                                                    maxLength: 10,
                                                                    minLength: 10

                                                                })}

                                                                placeholder="Mobile"
                                                                isInvalid={errors.mobile}
                                                            />
                                                        </InputGroup>
                                                        {errors.mobile?.type === "minLength" && <span className="text-danger">
                                                            minimum 10 digits are allowed
                                                        </span>
                                                        }
                                                        {errors.mobile?.type === "maxLength" && <span className="text-danger">
                                                            maximum 10 digits are allowed
                                                        </span>
                                                        }
                                                        {errors.mobile?.type === "required" && <span className="text-danger">
                                                            This field is required
                                                        </span>}
                                                        {/* {errors.mobile?.type === "pattern" && <span className="text-danger">
                                                            only numbers are allowed
                                                        </span>} */}
                                                        {/* {getValues().mobile.typeof() === "string" && <span className="text-danger">
                                                            only numbers are allowed
                                                        </span>} */}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_designation">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Designation{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('designation', { required: true })}
                                                            placeholder="Designation"
                                                            isInvalid={errors.designation}
                                                        />
                                                        {errors.designation && (
                                                            <span className="text-danger">
                                                                Please enter designation
                                                            </span>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_membergroup">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Member Group{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" placeholder="Member Group">
                                                            <Form.Select
                                                                id="disabledSelect"
                                                                {...register('memberGroup', { required: true })}
                                                                aria-label="Default select example"
                                                                placeholder="Member Group"
                                                                isInvalid={errors.memberGroup}>
                                                                <option hidden value=''>
                                                                    -- Select Member Group --
                                                                </option>
                                                                <option value="manager">Manager</option>
                                                                <option value="driver">Driver</option>
                                                            </Form.Select>
                                                            {errors.memberGroup && (
                                                                <span className="text-danger">
                                                                    Please select one member group
                                                                </span>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_password">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Password</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            {...register('password')}
                                                            placeholder="Password"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_pin">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>PIN :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            {...register('pin')}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_loginstatus">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Login Status :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group >
                                                            <Form.Select
                                                                id="disabledSelect"
                                                                {...register('loginStatus')}
                                                                aria-label="Default select example"
                                                            >
                                                                <option hidden value=''>
                                                                    --select--
                                                                </option>
                                                                <option value="enable">Enable</option>
                                                                <option value="disable">Disable</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="ne_driverrole">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Driver Role{starRequired} :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group >
                                                            <Form.Select
                                                                id="disabledSelect"
                                                                {...register('driverRole', { required: true })}
                                                                aria-label="Default select example"
                                                                isInvalid={errors.driverRole}
                                                            >
                                                                <option hidden value=''>
                                                                    --select--
                                                                </option>
                                                                <option value="disable">Disable</option>
                                                                <option value="enable">Enable</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        {errors.driverRole && <span className="text-danger">Please select one driver Role</span>}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <label>Laundry Stores :</label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group controlId="ne_topwash">
                                                        <Form.Check
                                                            required
                                                            {...register('topwashKandivali')}
                                                            label="TOPWASH KANDIVALI"
                                                            feedback="You must agree before submitting."
                                                        />
                                                        <Form.Check
                                                            required
                                                            {...register('topwashKandivali')}
                                                            label="TOPWASH MALAD"
                                                            feedback="You must agree before submitting."
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} className="mx-auto d-flex">
                                            <Col className="text-center ">
                                                <Button type="submit" className="btn-lg btn-success">
                                                    Save
                                                </Button>
                                            </Col>
                                            <Col className="text-center">
                                                {/* <Button type="submit" className="btn-lg btn-secondary" onClick={() => onClickResetForBtn()}> */}
                                                <Button type="reset" className="btn-lg btn-secondary" onClick={handleReset}>
                                                    Reset
                                                </Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default NewEntery;
