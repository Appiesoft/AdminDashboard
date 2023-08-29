import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { WorldVectorMap } from '../../../../../components/VectorMap';
import { useForm, } from 'react-hook-form';
import './Edit.css';
import { useDispatch, useSelector } from 'react-redux';
import { employeeList, employeeUpdate } from '../../../../../redux/actions';
import MainLoader from '../../../../../components/MainLoader';
import ToastHandle from '../../../../../helpers/toastMessage';



const Edit = ({ parentEdit, childEmptyEdit }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const employeeDetails = store?.EmployeeDetails
    const employeeDetailsStutas = store?.EmployeeDetails?.employeeDetails?.status
    const employeeUpdateStatus = store?.EmployeeUpdate?.employeeUpdate?.status
    const employeeUpdateMessage = store?.EmployeeUpdate?.employeeUpdate?.message
    const employeeUpdateLorder = store?.EmployeeUpdate;

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [phoneCode, setPhoneCode] = useState("+91")
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');


    const toggle = () => {
        setModal(!modal);
        childEmptyEdit('');
    };

    const openModalWithEditModel = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };
    // end model

    // start edit form
    const options = {
        zoomOnScroll: false,
        markers: [
            { name: 'New York', coords: [40.71, -74.0] },
            { name: 'San Francisco', coords: [37.77, -122.41] },
            { name: 'Sydney', coords: [-33.86, 151.2] },
            { name: 'Singapore', coords: [1.3, 103.8] },
        ],
        markerStyle: {
            initial: {
                r: 9,
                fill: '#727cf5',
                'fill-opacity': 0.9,
                stroke: '#fff',
                'stroke-width': 7,
                'stroke-opacity': 0.4,
            },
            hover: {
                fill: '#727cf5',
                stroke: '#fff',
                'fill-opacity': 1,
                'stroke-width': 1.5,
            },
        },
        regionStyle: {
            initial: {
                fill: '#e3eaef',
            },
        },
    };

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const [resetDataHandling, setResetDataHandling] = useState(null)

    const resetHandlingBtn = () => {
        setResetDataHandling(null)
    }
    // end edit form
    const resetForm = () => {
        if (employeeDetails?.employeeDetails !== null) {
            const data = employeeDetails?.employeeDetails?.data
            setResetDataHandling(data)
        }

    }


    const inputDataFill = () => {
        reset({
            employeeId: resetDataHandling?.employee_id,
            joinDate: resetDataHandling?.join_date,
            firstName: resetDataHandling?.first_name,
            lastName: resetDataHandling?.last_name,
            addressAptNo: resetDataHandling?.address1,
            address2: resetDataHandling?.address2,
            city: resetDataHandling?.emp_city,
            state: resetDataHandling?.state,
            pinCode: resetDataHandling?.zipcode,
            country: "india",
            emailId: resetDataHandling?.email_id,
            mobile: resetDataHandling?.mobile,
            designation: resetDataHandling?.designation,
            memberGroup: resetDataHandling?.group_member_id,
            password: "saurabh12@",
            pin: resetDataHandling?.pin,
            loginStatus: resetDataHandling?.status,
            driverRole: resetDataHandling?.driver_role,
            topwashKandivali: "gghg",
            topwashMalad: "grty",
        })
    }

    useEffect(() => {
        if (resetDataHandling !== null) {
            inputDataFill()
        }
    }, [resetDataHandling])

    useEffect(() => {
        if (parentEdit == 'lg') {
            openModalWithEditModel('lg');
        }
    }, [parentEdit]);

    useEffect(() => {
        if (employeeDetailsStutas === true) {
            resetForm()
        }
    }, [employeeDetailsStutas])


    useEffect(() => {
        if (employeeUpdateStatus) {
            ToastHandle('success', employeeUpdateMessage);
            toggle()
            dispatch(
                employeeList({
                    storeId: [],
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                })
            );
        } else if (employeeUpdateStatus === false) {
            ToastHandle('error', employeeUpdateMessage);
        }
    }, [employeeUpdateStatus]);


    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        {employeeUpdateLorder?.loading ? (
                                            <MainLoader />
                                        ) :
                                            <Form noValidate onSubmit={handleSubmit(
                                                (data) => {
                                                    dispatch(employeeUpdate({
                                                        employeeId: data?.employeeId,
                                                        firstName: data?.firstName,
                                                        lastName: data?.lastName,
                                                        mobile: data?.mobile,
                                                        emailId: data?.emailId,
                                                        password: data?.password,
                                                        status: data?.loginStatus,
                                                        lat: 454523524324.54,
                                                        long: 34545454545.45,
                                                        address1: data?.addressAptNo,
                                                        address2: data?.address2,
                                                        countryCode: "+91",
                                                        city: data?.city,
                                                        state: data?.state,
                                                        zipcode: data?.pinCode,
                                                        designation: data?.designation,
                                                        groupMemberId: 3,
                                                        driverRole: data?.driverRole,
                                                        pin: data?.pin,
                                                        stores: [
                                                            11,
                                                            1
                                                        ]
                                                    }))
                                                },
                                                (err) => {
                                                    console.log(err);
                                                }
                                            )}>
                                                <Row className="p-3  position-relative">
                                                    {employeeDetails.loading && <Col lg={12} className='d-flex justify-content-center align-items-center loader_parent position-absolute top-0 bottom-0 end-0 start-0'>
                                                        <Spinner animation="border" role="status">
                                                            <span className="visually-hidden text-center">Loading...</span>
                                                        </Spinner>
                                                    </Col>}

                                                    <Col lg={12}>
                                                        <Row className="my-3">
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_employeeid">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Employee ID :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('employeeId')}
                                                                                placeholder="Employee ID"
                                                                                disabled
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_joindate">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Join Date :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                type="date"
                                                                                {...register('joinDate')}
                                                                                placeholder="Join Date"
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                First Name :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                type="text"
                                                                                {...register('firstName')}
                                                                                placeholder="First name"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_lastname">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Last Name :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Address/Apt no :                                                                           </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('addressAptNo')}
                                                                                placeholder="addressAptNo"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_address2">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Address2 :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                City :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('city')}
                                                                                placeholder="City"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_state">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                State :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('state')}
                                                                                placeholder="State"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_pincode">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Zip Code :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>Country :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('country')}
                                                                                placeholder="Country"
                                                                                value="India"
                                                                                disabled
                                                                            />                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row className="my-3">
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_emailid">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Email ID :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('emailId'
                                                                                    // ,
                                                                                    //     {
                                                                                    //         required: 'Email is required',
                                                                                    //         pattern: {
                                                                                    //             value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                                    //             message: 'Please enter a valid email',
                                                                                    //         },
                                                                                    //     }
                                                                                )}
                                                                                placeholder="Email ID"
                                                                            // isInvalid={errors.emailId}
                                                                            />
                                                                            {/* {errors.emailId && <span className='text-danger'>Please enter a valid email</span>} */}
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_mobile">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Mobile :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
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
                                                                                    aria-label="Text input with dropdown button"
                                                                                    type="text"
                                                                                    placeholder="9417385308"
                                                                                    {...register('phone')}
                                                                                />
                                                                            </InputGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row className="my-3">
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_designation">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Designation :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                {...register('designation')}
                                                                                placeholder="Designation"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_membergroup">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Member Group :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Group
                                                                            >
                                                                                <Form.Select
                                                                                    id="disabledSelect"
                                                                                    {...register('memberGroup')}
                                                                                    aria-label="Default select example"
                                                                                >
                                                                                    <option hidden value=''>-- Select Member Group --</option>
                                                                                    <option value="manager">Manager</option>
                                                                                    <option value="driver">Driver</option>
                                                                                </Form.Select>
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>Password :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>PIN :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>Login Status :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Group
                                                                            >
                                                                                <Form.Select
                                                                                    id="disabledSelect"
                                                                                    {...register('loginStatus')}
                                                                                    aria-label="Default select example"
                                                                                >
                                                                                    <option value="" hidden>select</option>
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Driver Role
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Group
                                                                                className=""
                                                                                placeholder="Driver role">
                                                                                <Form.Select
                                                                                    id="disabledSelect"
                                                                                    {...register('driverRole')}
                                                                                    aria-label="Default select example"
                                                                                >
                                                                                    <option value="" hidden>select</option>
                                                                                    <option value="disable">Disable</option>
                                                                                    <option value="enable">Enable</option>
                                                                                </Form.Select>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row className="my-3">
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_googlemap">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <label>Google Map :</label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <div className=" border">
                                                                                <WorldVectorMap
                                                                                    height="224px"
                                                                                    width="100%"
                                                                                    options={options}
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="ne_topwash">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <label>Laundry Stores</label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Group className="">
                                                                                <Form.Check
                                                                                    {...register('topwashKandivali')}
                                                                                    label="TOPWASH KANDIVALI"
                                                                                    feedback="You must agree before submitting."
                                                                                />
                                                                                <Form.Check
                                                                                    {...register('topwashKandivali')}
                                                                                    label="TOPWASH MALAD"
                                                                                    feedback="You must agree before submitting."
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={4} className="mx-auto d-flex mt-2">
                                                                <Col className="text-center ">
                                                                    <Button type="submit" className="btn btn-success">
                                                                        Update
                                                                    </Button>
                                                                </Col>
                                                                <Col className="text-center">
                                                                    <Button type="reset" className="btn btn-secondary" onClick={() => resetHandlingBtn()}>
                                                                        Reset
                                                                    </Button>
                                                                </Col>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Form>}
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Edit;
