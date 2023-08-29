import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Card, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { appSettingList, appSettingUpdate } from '../../../../../../redux/actions';
import ToastHandle from '../../../../../../helpers/toastMessage';
import MainLoader from '../../../../../../components/MainLoader';


const AppSettingEditModel = ({ parentAppSetting, childEmptyAppSetting, inputData }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const appSettingUpdateStatus = store?.AppSettingUpdate?.status
    const appSettingUpdateMessage = store?.AppSettingUpdate?.message
    const appSettingUpdateLoader = store?.AppSettingUpdate

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyAppSetting('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentAppSetting == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentAppSetting]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const handleReset = () => {
        reset({
            starttime: inputData?.start_time,
            endtime: inputData?.end_time,
            intervalPerSlot: inputData?.interval_per_slot,
            dropOff: inputData?.diff_between_pickup_and_drop_off,
            pickupOffset: inputData?.pickup_offset,
            deliverySelection: inputData?.delivery_selection,
            name: inputData?.name,
            express: inputData?.diff_between_pickup_and_drop_off_for_express,
            loginWith: inputData?.login_with,
            recurringPickup: inputData?.recurring_pickup,
            recurringDescription: inputData?.reccuring_description
        })
    }
    const listUpdate = () => {
        dispatch(
            appSettingList()
        );
    }

    useEffect(() => {
        handleReset()
    }, [inputData])

    useEffect(() => {
        if (appSettingUpdateStatus) {
            ToastHandle('success', appSettingUpdateMessage);
            toggle();
            listUpdate()
        } else if (appSettingUpdateStatus === false) {
            ToastHandle('error', appSettingUpdateMessage);
        }
    }, [appSettingUpdateStatus]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    {appSettingUpdateLoader?.loading ? <MainLoader /> :
                        <Form
                            noValidate
                            onSubmit={handleSubmit(
                                (data) => {
                                    dispatch(appSettingUpdate(
                                        {
                                            name: data?.name,
                                            startTime: data?.starttime,
                                            endTime: data?.endtime,
                                            intervalPerSlot: data?.intervalPerSlot,
                                            diffBetweenPickupAndDropOff: data?.dropOff,
                                            diffBetweenPickupAndDropOffForExpress: data?.express,
                                            pickupOffset: data?.pickupOffset,
                                            loginWith: data?.loginWith,
                                            deliverySelection: data?.deliverySelection,
                                            recurringPickup: data?.recurringPickup,
                                            reccuringDescription: data?.recurringDescription
                                        }
                                    ))
                                },
                                (err) => {
                                    console.log(err);
                                }
                            )}>
                            <Row>
                                <Col xs={12} className='p-0'>
                                    <Card>
                                        <Card.Body>
                                            <Row className="my-2 d-flex justify-content-center">

                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_joindate">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label>Start Time:</Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Control
                                                                    required
                                                                    type="time"
                                                                    {...register('starttime')}
                                                                    placeholder="08:00:00"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_joindate">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label>End Time:</Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Control
                                                                    required
                                                                    type="time"
                                                                    {...register('endtime')}
                                                                    placeholder="22:00:00"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="my-2 d-flex justify-content-center">
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label className='mt-2 pt-1'>
                                                                    Interval per slot:
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className=" pt-1" >
                                                                    <Form.Select
                                                                        {...register('intervalPerSlot')}
                                                                    >
                                                                        <option hidden> -- Select interval per slot --</option>
                                                                        <option value="1">1 Hr</option>
                                                                        <option value="2">2 Hr</option>
                                                                        <option value="3">3 Hr</option>
                                                                        <option value="4">4 Hr</option>
                                                                        <option value="5">5 Hr</option>
                                                                        <option value="6">6 Hr</option>

                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label>
                                                                    Number of day(s) difference between pick up and a Drop Off:
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className="" >
                                                                    <Form.Control
                                                                        {...register('dropOff')}
                                                                        type="text"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="my-2 d-flex justify-content-center">
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label className=''>
                                                                    Pickup offset (Hrs):
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className="" >
                                                                    <Form.Control
                                                                        {...register('pickupOffset')}
                                                                        type="text"
                                                                        placeholder='2' />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label>
                                                                    Delivery Selection:
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className="" >
                                                                    <Form.Select
                                                                        {...register('deliverySelection')}
                                                                    >

                                                                        <option value="show">Show </option>
                                                                        <option value="hide">Hide</option>

                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12}> <Button type="submit" className="btn btn-primary ">More delivery setting
                                                </Button>
                                                </Col>
                                            </Row>
                                            <Row className="my-2 d-flex justify-content-center">
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label className=" mt-2">
                                                                    Name :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className="mt-2" >
                                                                    <Form.Control
                                                                        {...register('name')}
                                                                        type="text"
                                                                        placeholder='name' />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label  >
                                                                    Number of slot(s) difference between pick up and Drop Off for express:
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className=" mb-4" >
                                                                    <Form.Select
                                                                        {...register('express')}
                                                                    >
                                                                        <option hidden> -- Select Slot -- </option>
                                                                        <option value="1">1 </option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                        <option value="6">6</option>
                                                                        <option value="7">7</option>
                                                                        <option value="8">8</option>
                                                                        <option value="9">9</option>
                                                                        <option value="10">10</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="my-2 d-flex justify-content-center">
                                                <Col lg={6}>
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label>
                                                                    Login with:
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12} className='d-flex'>
                                                                <Form.Check type='radio' name='name' label="Mobile" {...register('loginWith')} value="Mobile" />
                                                                <Form.Check type='radio' name='name' className='mx-2' label="Email" {...register('loginWith')} value="Email" />
                                                                <Form.Check type='radio' name='name' label="Both"  {...register('loginWith')} value="Both" />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group>
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label>
                                                                    Recurring Pickup:
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={12} className='d-flex '>

                                                                <Form.Check type='radio' label="Enable" className='me-2' {...register('recurringPickup')} value='Enable' />
                                                                <Form.Check type='radio' label="Disable"  {...register('recurringPickup')} value='Disable' />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="my-3 d-flex justify-content-center">
                                                <Col lg={12}>
                                                    <Form.Group >
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={12}>
                                                                <Form.Label>Recurring Description</Form.Label>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className="" ><textarea className='w-100 form-control ' {...register('recurringDescription')} type="text" /></Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12} className="text-center  mt-4">
                                                    <Button type="submit" className="btn btn-success">Update</Button>
                                                    <Button type="submit" className="btn btn-primary ms-3">Reset</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Form>
                    }
                    {/* <Row>
                        <Col>
                            <Row className="mx-auto border-bottom mt-3 pb-3">
                                <Col lg={6}>
                                    <Row>
                                        <Col lg={6} className="fw-bold"> Customer Name :</Col>
                                        <Col lg={6}> Testingtes</Col>
                                        <Col lg={6} className="my-1 fw-bold"> Phone No. </Col>
                                        <Col lg={6} className="my-1"> 4456677888</Col>
                                        <Col lg={6} className="fw-bold">Order Invoice :</Col>
                                        <Col lg={6}> TWHf1368</Col>
                                    </Row>
                                </Col>
                                <Col lg={6}>
                                    <Row>
                                        <Col lg={6} className="fw-bold">Card :</Col>
                                        <Col lg={6}>Not Added</Col>
                                        <Col lg={6} className="my-1 fw-bold">Wallet Balance :</Col>
                                        <Col lg={6} className="my-1">USD 0</Col>
                                        <Col lg={6} className="fw-bold">Order Total : </Col>
                                        <Col lg={6}>USD 45.60</Col>
                                        <Col lg={6} className="my-1 fw-bold">Due Amount :</Col>
                                        <Col lg={6} className="my-1">USD 6.00</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='overflow-auto'>
                                    <Table className="mb-0 mt-3" size="sm">
                                        <thead>
                                            <tr className='bg-light'>
                                                <th class="text-truncate" >Sr.No.</th>
                                                <th class="text-truncate" >Order Invoice</th>
                                                <th class="text-truncate">Customer Name</th>
                                                <th class="text-truncate">Store Name</th>
                                                <th class="text-truncate">Mobile Number</th>
                                                <th class="text-truncate">Mobile Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records.map((record, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{record.SrNo}</th>
                                                        <td class="text-truncate" >{record.OrderInvoice}</td>
                                                        <td class="text-truncate">{record.CustomerName}</td>
                                                        <td class="text-truncate">{record.StoreName}</td>
                                                        <td class="text-truncate">{record.MobileNumber}</td>
                                                        <td class="text-truncate">{record.MobileNumber}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <hr />

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-0 mt-3">
                                    <Col lg={12}>
                                        <Row className="my-3">
                                            <Col lg={12}>
                                                <Form.Group controlId="validationCustom01">
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>Refund Type :</Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                value='cash'
                                                                disabled

                                                            />
                                                            <Form.Control.Feedback>
                                                                Looks good!
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12} className="my-2">
                                                <Form.Group controlId="validationCustom01">
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>Refund Reason :</Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                value='0'
                                                                disabled
                                                            />
                                                            <Form.Control.Feedback>
                                                                Looks good!
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Group controlId="validationCustom01">
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>Amount :</Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                value='40'
                                                                disabled
                                                            />
                                                            <Form.Control.Feedback>
                                                                Looks good!
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center  mt-4">
                                                <Button type="submit" className="btn btn-danger">
                                                    Cancel
                                                </Button>
                                                <Button type="submit" className="btn btn-success ms-3">
                                                    Refund
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row> */}
                </Modal.Body>

            </Modal>
        </>)
}

export default AppSettingEditModel