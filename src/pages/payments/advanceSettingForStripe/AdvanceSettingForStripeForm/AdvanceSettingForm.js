import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { advanceSettingForStripeActions } from '../../../../redux/actions';
import Loader from "../../../../components/MainLoader"

const AdvanceSettingForm = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const FormData = store?.AdvanceSettingForStripe?.advanceSettingForStripe?.data
    const AdvanceSettingLorder = store?.AdvanceSettingForStripe
    const [advanceSettingFormData, setAdvanceSettingFormData] = useState([])
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const handleUpdate = (e) => {
        const { name, checked } = e.target
        setAdvanceSettingFormData({ ...advanceSettingFormData, [name]: checked === true ? "yes" : 'no' })
    };

    // start DropDown
    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };
    // end DropDown

    useEffect(() => {
        dispatch(advanceSettingForStripeActions())
    }, [])
    useEffect(() => {
        if (FormData?.id) {
            setAdvanceSettingFormData(FormData)
        }

    }, [FormData])

    return (
        <>
            <Card>
                <Card.Body>
                    {AdvanceSettingLorder?.loading ? <Loader /> : <Form
                        noValidate
                    >
                        <Row className='d-flex align-items-center mt-4 mb-3 p-3 mt-3 border'>
                            <Col xl={12}>
                                <Row>
                                    <Col lg={5} className='align-self-end'>
                                        <h4 className='text-dark'>
                                            Card Mandatory For Pickup  :
                                        </h4>
                                    </Col>
                                    <Col lg={4} className='d-flex justify-content-start my-3'>
                                        <div className='text-dark'>
                                            <Form>
                                                <Form.Check type="switch"
                                                    name='card_mandatory_for_pickup'
                                                    value={advanceSettingFormData?.card_mandatory_for_pickup}
                                                    onChange={(e) =>
                                                        handleUpdate(e)
                                                    }
                                                    checked={advanceSettingFormData?.card_mandatory_for_pickup == "yes" ? true : false}
                                                    id="custom-switch" label={advanceSettingFormData?.card_mandatory_for_pickup == "yes" ? <span className='text-success'>Yes</span> : <span className='text-danger'>No</span>}
                                                />
                                            </Form>
                                        </div>
                                    </Col>
                                    <Col lg={5} className='align-self-end'>
                                        <h4 className='text-dark'>
                                            Auto Charged From Online Added Card On Stage  :
                                        </h4>
                                    </Col>
                                    <Col lg={4} className='d-flex justify-content-start'>
                                        <Dropdown
                                            addonType="append"
                                            isOpen={isSortDropdownOpen}
                                            toggle={toggleSortDropDown}
                                            align="end">
                                            <Dropdown.Toggle variant="light ">
                                                <i className="uil uil-sort-amount-down "></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className='bg-light px-2'>
                                                <Dropdown.Item className='bg-light'>
                                                    <div className='text-danger'>
                                                        <Form className='border p-1 px-2 bt_color_hover bg-white'>
                                                            <Form.Check type="switch" label="New Order" />
                                                        </Form>
                                                    </div>
                                                    <div className='text-danger my-1'>
                                                        <Form className='border p-1 px-2 bt_color_hover bg-white'>
                                                            <Form.Check type="switch" id="custom-switch" label="Picked up" />
                                                        </Form>
                                                    </div>

                                                    <div className='text-danger'>
                                                        <Form className='border p-1 px-2 bt_color_hover bg-white'>
                                                            <Form.Check type="switch" id="custom-switch" label="In Store" />
                                                        </Form>
                                                    </div>

                                                    <div className='text-danger my-1'>
                                                        <Form className='border p-1 px-2 bt_color_hover bg-white'>
                                                            <Form.Check type="switch" id="custom-switch" label=" In Process" />
                                                        </Form>
                                                    </div>

                                                    <div className='text-danger'>
                                                        <Form className='border p-1 px-2 bt_color_hover bg-white'>
                                                            <Form.Check type="switch" id="custom-switch" label="Ready for Delivery" />
                                                        </Form>
                                                    </div>

                                                    <div className='text-danger my-1'>
                                                        <Form className='border p-1 px-2 bt_color_hover bg-white'>
                                                            <Form.Check type="switch" id="custom-switch" label="Delivered" />
                                                        </Form>
                                                    </div>

                                                    <div className='text-danger'>
                                                        <Form className='border p-1 px-2 bt_color_hover bg-white'>
                                                            <Form.Check type="switch" id="custom-switch" label="Cancelled" />
                                                        </Form>
                                                    </div>

                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                    <Col lg={5} className='align-self-end'>
                                        <h4 className='text-dark'>
                                            Payment Failure Time Go SMS To Admin  :
                                        </h4>
                                    </Col>
                                    <Col lg={4} className='d-flex justify-content-start my-3'>
                                        <div className='text-dark'>
                                            <Form>
                                                <Form.Check type="switch"
                                                    name='failure_sms_for_admin'
                                                    onChange={(e) =>
                                                        handleUpdate(e)
                                                    }
                                                    checked={advanceSettingFormData?.failure_sms_for_admin == "yes" ? true : false}
                                                    label={advanceSettingFormData?.failure_sms_for_admin == "yes" ? <span className='text-success'>Yes</span> : <span className='text-danger'>No</span>}

                                                    id="custom-switch" />
                                            </Form>
                                        </div>
                                    </Col>
                                    <Col lg={5} className='align-self-end'>
                                        <h4 className='text-dark'>
                                            Payment Failure Time Go SMS To Customer  :
                                        </h4>
                                    </Col>
                                    <Col lg={4} className='d-flex justify-content-start'>
                                        <div className='text-dark '>
                                            <Form>
                                                <Form.Check type="switch"
                                                    name='failure_sms_for_customer'
                                                    onChange={(e) =>
                                                        handleUpdate(e)
                                                    }
                                                    checked={advanceSettingFormData?.failure_sms_for_customer == "yes" ? true : false}
                                                    label={advanceSettingFormData?.failure_sms_for_customer == "yes" ?
                                                        <span className='text-success'>Yes</span>
                                                        : <span className='text-danger'>No</span>}
                                                    id="custom-switch" />
                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>}
                </Card.Body>
            </Card>
        </>)
}

export default AdvanceSettingForm