import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { costomerList, employeeList, priceList, pickupRequestCreate, storeList } from '../../../../redux/actions';
import AddCustomer from './model/AddCustomer';
import { useForm } from 'react-hook-form';
import HyperDatepicker from '../../../../components/Datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { pickupRequestList } from '../../../../redux/transactions/pickupRequestList/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';

const CreatePickupForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const employeListData = store?.EmployeeList?.employeeList?.data
    const costomerListData = store.CostomerList?.costomerList?.data;
    const storeListData = store?.StoreList?.storeList
    const createPickupStatus = store?.PickupRequestCreate?.status;
    const createPickupMessage = store?.PickupRequestCreate?.message;
    const createPickupLorder = store?.PickupRequestCreate;

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);

    const btnChild = () => {
        TableShowBtn();
    };
    /**model**/
    const [parentFill, setParentFill] = useState('');
    const openModalWithSize = (fill) => {
        setParentFill(fill);
    };
    const childEmpty = (empty) => {
        setParentFill(empty);
    };


    const [selectedDate, setSelectedDate] = useState(new Date());


    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    //form validation
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const handleReset = () => {
        reset(
            {
                customerId: "",
                pickupDate: "",
                pickupTime: "",
                qtyBag: "",
                driverAssign: "",
                storeId: "",
                recurringPickupId: ""
            }
        )
    }

    const submitData = (data) => {
        dispatch(pickupRequestCreate(
            {
                customerId: data?.customerId,
                pickupDate: "2022-09-28",
                pickupTime: data?.pickupTime,
                qtyBag: data?.qtyBag,
                driverId: data?.driverAssign,
                storeId: data?.storeId,
                recurringPickupId: 2

            }
        ))
    };


    useEffect(() => {
        dispatch(
            costomerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
            })
        );
        dispatch(storeList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
        dispatch(
            employeeList({
                storeId: [],
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    }, [])


    useEffect(() => {
        if (createPickupStatus === true) {
            ToastHandle('success', createPickupMessage);
            TableShowBtn();
        } else if (createPickupStatus === false) {
            ToastHandle('error', createPickupMessage);
        }
    }, [createPickupStatus]);

    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className="d-flex justify-content-end">

                            <Button
                                variant="white"
                                className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                onClick={() => btnChild()}>
                                <div className="d-flex align-items-center">
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Pickup Request List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {createPickupLorder?.loading ? (
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
                            )}
                            className="px-3">
                            <Row className="p-3 mt-3 border">
                                <Col lg={12}>
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Customer Name :</Form.Label>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <Form.Group>
                                                            <Form.Select
                                                                {...register('customerId')}
                                                                id="disabledSelect"
                                                                aria-label="Default select example"
                                                            >
                                                                {costomerListData?.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <option hidden>
                                                                                --select--
                                                                            </option>
                                                                            <option value={item.id}>
                                                                                {item.first_name}
                                                                            </option>
                                                                        </>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Button
                                                            variant="white"
                                                            className=" border py-0 pe-4 bg-primary text-white"
                                                            onClick={() => openModalWithSize('lg')}>
                                                            <div className="d-flex align-items-center">
                                                                <h6>
                                                                    <i class="bi bi-plus me-1 text-dark" />
                                                                </h6>
                                                                <div>Add Customer</div>
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Pickup Date :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={8}>
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

                                    <Row className="my-3">

                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Pickup Time :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <Form.Group>
                                                            <Form.Select
                                                                id="disabledSelect"
                                                                {...register('pickupTime')}
                                                                aria-label="Default select example"
                                                            >
                                                                <option hidden>
                                                                    --None--
                                                                </option>
                                                                <option value="8:00Am to 10:00 AM">
                                                                    8:00Am to 10:00 AM
                                                                </option>
                                                                <option value="10:00Am to 12:00 PM">
                                                                    10:00Am to 12:00 PM
                                                                </option>
                                                                <option value="12:00PM to 2:00 PM">
                                                                    12:00PM to 2:00 PM
                                                                </option>
                                                                <option value="2:00PM to 4:00 PM">
                                                                    2:00PM to 4:00 PM
                                                                </option>
                                                                <option value="4:00PM to 6:00 PM">
                                                                    4:00PM to 6:00 PM
                                                                </option>
                                                                <option value="6:00PM to 8:00 PM">
                                                                    6:00PM to 8:00 PM
                                                                </option>
                                                                <option value="8:00PM to 10:00 PM">
                                                                    8:00PM to 10:00 PM
                                                                </option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Qty/Bag :</Form.Label>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <Form.Control
                                                            type="text"
                                                            {...register('qtyBag')}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="my-3">

                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Driver Assign :</Form.Label>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <Form.Group>
                                                            <Form.Select
                                                                id="disabledSelect"
                                                                {...register('driverAssign')}
                                                                aria-label="Default select example"
                                                            >
                                                                <option hidden>
                                                                    --select--
                                                                </option>
                                                                {employeListData?.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <option value={item.emp_id}>
                                                                                {item.designation}
                                                                            </option>
                                                                        </>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Store :</Form.Label>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <Form.Group>
                                                            <Form.Select
                                                                id="disabledSelect"
                                                                {...register('storeId')}
                                                                aria-label="Default select example"
                                                                required>
                                                                <option hidden>
                                                                    --select--
                                                                </option>
                                                                {storeListData?.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <option value={item.store_id}>
                                                                                {item.store_name}
                                                                            </option>
                                                                        </>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='mx-auto'>
                                        <Col lg={4} className=" d-flex justify-content-center  mt-3  mx-auto">
                                            <Col lg={3} className="text-center ">
                                                <Button type="submit" className="btn btn-success px-3">
                                                    Save
                                                </Button>
                                            </Col>
                                            <Col lg={3} className="text-center">
                                                <Button type="reset" className="btn btn-secondary px-3" onClick={handleReset}>
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
            <AddCustomer parentFill={parentFill} childEmpty={childEmpty} />
        </>
    );
};

export default CreatePickupForm;
