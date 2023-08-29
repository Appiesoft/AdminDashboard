import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import HyperDatepicker from '../../../../components/Datepicker';
import { diliveryRequestCreate, diliveryRequestList, employeeList, storeList } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';

const CreateForm = ({ TableShowBtn, showBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const orderLists = store.OrderList?.orderList?.data
    const employeListData = store.EmployeeList?.employeeList?.data;
    const storeListData = store?.StoreList?.storeList;
    const deliveryRequestLoader = store?.DeliveryRequestCreate;
    const deliveryRequestMessage = store?.DeliveryRequestCreate?.message
    const deliveryRequestStatus = store?.DeliveryRequestCreate?.status

    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [showLimit, setShowLimit] = useState(10)
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };
    const btnChild = () => {
        TableShowBtn()
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const starRequired = (<span className='text-danger'>*</span>)

    const handleReset = () => {
        reset(
            {
                orderId: '',
                deliveryDate: "",
                deliveryTime: "",
                qty: "",
                driverId: '',
                deliveryRequestId: "",
                storeId: ""

            }
        )
    }

    const submitData = (data) => {
        dispatch(diliveryRequestCreate(
            {
                orderId: data?.orderId,
                deliveryDate: "2022-10-04",
                deliveryTime: data?.deliveryTime,
                qty: data?.qty,
                driverId: data?.driverAssign,
                deliveryRequestId: "DEL317",
                storeId: data?.store
            }
        ))
    }

    useEffect(() => {
        dispatch(storeList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }
        ))
        dispatch(
            employeeList(
                {
                    storeId: [],
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                }
            )
        );
    }, [])

    useEffect(() => {
        if (deliveryRequestStatus === true) {
            ToastHandle('success', deliveryRequestMessage);
            TableShowBtn();
        } else if (deliveryRequestStatus === false) {
            ToastHandle('error', deliveryRequestMessage);
        }
    }, [deliveryRequestStatus]);
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnChild} >
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Delivery Request List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>

                    <Form noValidate
                        onSubmit={handleSubmit(
                            (data) => {
                                submitData(data)
                            },
                            (err) => {
                                console.log(err);
                            }
                        )} className='px-3'>
                        <Row className='p-3 mt-3 border'>
                            <Col lg={12}>
                                <Row className='my-3'>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_orderid">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Order id{starRequired} :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group >
                                                        <Form.Select
                                                            // {...register('orderId')}
                                                            {...register('orderId', { required: true })}
                                                            isInvalid={errors.orderId}
                                                            placeholder="Choose Order Id..."
                                                            id="disabledSelect"
                                                            aria-label="Default select example"

                                                        >
                                                            <option hidden value=''>---select---</option>
                                                            {orderLists?.map((item, index) => {
                                                                return (
                                                                    <option value={item.order_id}>{item.invoice_number}</option>
                                                                )
                                                            })}
                                                        </Form.Select>
                                                        {errors.orderId && <span className='text-danger'>Please select one Order id</span>}

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_custommername">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Customer Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                            {...register('customerName')}
                                                            placeholder="Choose Order Id..."
                                                            id="disabledSelect" disabled
                                                            aria-label="Default select example"
                                                        >
                                                            <option hidden value=''>---select---</option>

                                                            {/* {costomerList?.map((item, index) => {
                                                                return (
                                                                    <option value={item.id}>{item.first_name}</option>
                                                                )
                                                            })} */}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row className='my-3' >
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_deliverydate">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Delivery Date{starRequired} :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('deliveryDate', { required: true })}
                                                        type="date" required isInvalid={errors.deliveryDate} />
                                                    {errors.deliveryDate && <span className='text-danger'>Please enter Delivery date</span>}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_deliverytime">

                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Delivery Time{starRequired} :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                            {...register('deliveryTime', { required: true })}
                                                            isInvalid={errors.deliveryTime}
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                            required
                                                        >
                                                            <option hidden value=''>--None--</option>
                                                            <option value="" selected=""> -- None -- </option>
                                                            <option value="08AM-10AM"> 8:00 AM to 10:00 AM</option><option value="10AM-12PM"> 10:00 AM to 12:00 PM</option><option value="12PM-02PM"> 12:00 PM to 2:00 PM</option><option value="02PM-04PM"> 2:00 PM to 4:00 PM</option><option value="04PM-06PM"> 4:00 PM to 6:00 PM</option><option value="06PM-08PM"> 6:00 PM to 8:00 PM</option><option value="08PM-10PM"> 8:00 PM to 10:00 PM</option>

                                                        </Form.Select>
                                                        {errors.deliveryTime && <span className='text-danger'>Please select one Delivery time</span>}

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='my-3'>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_deliveryidrequest">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Delivery Id Request{starRequired} :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control  {...register('deliveryIdRequest')}
                                                        isInvalid={errors.deliveryIdRequest}

                                                        placeholder="DEL125"
                                                        type="text"
                                                        disabled />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    {errors.deliveryIdRequest && <span className='text-danger'>delivery Id Request is required</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_qtybag">

                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Qty/Bag :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control {...register('qty')}
                                                        type="text" disabled
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row className='my-3'>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_store">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Store :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                            {...register('store', { required: true })}
                                                            isInvalid={errors.store}
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                        >
                                                            <option hidden value=''>--None--</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>
                                                        </Form.Select>
                                                        {errors.store && <span className='text-danger'>Please select one Store</span>}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_driverdesign">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Driver Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                            {...register('driverAssign')}
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                            required>
                                                            <option hidden value=''>--Select--</option>
                                                            <option value="1">B select</option>
                                                            <option value="2">C select</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center  py-3'>
                                        <Button type="submit" className='btn btn-success'>Submit</Button>
                                        <Button type="reset" className='btn btn-light px-3 ms-3' onClick={handleReset}>Reset</Button>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>

                </Card.Body>
            </Card>
        </>
    )
}

export default CreateForm