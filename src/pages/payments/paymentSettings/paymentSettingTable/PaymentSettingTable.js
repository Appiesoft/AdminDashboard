import React, { useState, useEffect } from 'react'
import { Row, Col, Dropdown, Card, Table, OverlayTrigger, Tooltip, Button, Form } from 'react-bootstrap';
import RozorBlack from '../../../../assets/images/paymentSetting/razor_black.png'
import Stripe from '../../../../assets/images/paymentSetting/Payment-Gateway_Stripe.png'
import './PaymentSettingTable.css'
import { useDispatch, useSelector } from 'react-redux';
import { paymentSettingList } from '../../../../redux/actions';
import PaymentSettingModelForm from '../model/setUpDone/PaymentSettingModelForm';
import Loader from "../../../../components/MainLoader"


const PaymentSettingTable = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const PaymentSettingLoader = store.PaymentSettingtList;
    const PaymentSettingeData = store?.PaymentSettingtList?.paymentSettingList?.data?.pg_details
    const FormData = store?.PaymentSettingtList?.paymentSettingList?.data?.payment_setting
    const [parentPaymentSetting, setParentPaymentSetting] = useState('')
    const [paymentGateway, setPaymentGateway] = useState(null)
    const [onlinePayment, setOnlinePayment] = useState(null)
    const [paymentOptionCustomer, setPaymentOptionCustomer] = useState(null)
    const [paymentSettingFormData, setPaymentSettingFormData] = useState([])


    const handleOnchage = (e) => {
        const { name, checked } = e.target
        setPaymentSettingFormData({ ...paymentSettingFormData, [name]: checked === true ? "enable" : "disable" })
    }

    const handleOnchages = (item) => {
        setPaymentSettingFormData({ ...paymentSettingFormData, open_payment_option_for_customer: item })
    }
    // start model
    const openModalPaymentSetting = (fill) => {
        setParentPaymentSetting(fill)
    };

    const childEmptyPaymentSetting = (empty) => {
        setParentPaymentSetting(empty)
    }
    // end model

    const getPaymentSetting = () => {
        dispatch(paymentSettingList());
    };

    useEffect(() => {
        getPaymentSetting();
    }, []);
    useEffect(() => {
        if (FormData?.online_payment) {
            setPaymentSettingFormData(FormData)
        }
    }, [FormData])

    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                {PaymentSettingLoader?.loading ? <Loader /> : <>
                                    <Row className='d-flex align-items-center mb-2'>
                                        <Col xl={10} className='d-flex'>
                                            <Col lg={5}>
                                                <h4 className='text-dark'>
                                                    Online Payment:
                                                </h4>
                                            </Col>
                                            <Col lg={4} className='d-flex justify-content-between'>
                                                <div >
                                                    <Form>
                                                        <Form.Check
                                                            name='online_payment'
                                                            onChange={(e) => handleOnchage(e)}
                                                            checked={paymentSettingFormData?.online_payment === 'enable' ? true : false}
                                                            type="switch" id="custom-switch" label={paymentSettingFormData?.online_payment === 'enable' ? <span className='text-success' >Enable</span> : <span className='text-danger'>Disable</span>} />
                                                    </Form>
                                                </div>

                                            </Col>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xl={10} className='d-flex mb-3'>
                                            <Col lg={5}>
                                                <h4 className='text-dark'>
                                                    Open order's payment option for customer:
                                                </h4>
                                            </Col>
                                            <Col lg={4} >
                                                <Form className='d-flex justify-content-between'>
                                                    <div className='text-success'>
                                                        <Form.Check
                                                            name='open_payment_option_for_customer'
                                                            onClick={() => handleOnchages("before_in_process")}
                                                            checked={paymentSettingFormData?.open_payment_option_for_customer === 'before_in_process' ? true : false}
                                                            type="radio" id="custom-switch" label="Before in process" />
                                                    </div>
                                                    <div className='text-danger'>
                                                        <Form.Check type="radio"
                                                            onClick={() => handleOnchages("after_in_process")}
                                                            name='open_payment_option_for_customer'

                                                            checked={paymentSettingFormData?.open_payment_option_for_customer == 'after_in_process' ? true : false}
                                                            id="custom-switch" label="After in process" />
                                                    </div>
                                                </Form>

                                            </Col>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>

                                            <Table className="mb-0" size="sm">
                                                <thead className='bg-light'>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Payment Gateways</th>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {PaymentSettingeData?.map((record) => {
                                                        return (
                                                            <>
                                                                <tr className='vertical_align'>
                                                                    <th scope="row">{record.id}</th>
                                                                    <td >
                                                                        <div>
                                                                            <input name='payment_type' onChange={(e) => {
                                                                                setPaymentGateway(record.name)
                                                                            }} value={true} type="radio" />
                                                                            <span className='ms-3'>
                                                                                <img src={record.logo} alt="" className='img-style' />
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>{record.name}</td>
                                                                    <td>
                                                                        <button className='btn bg-white text-success' onClick={() => openModalPaymentSetting('lg')}>Setup Done </button>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )

                                                    }
                                                    )}

                                                </tbody>
                                            </Table>
                                            <Row>
                                                <Col>
                                                    <div className='text-center mt-3'>
                                                        <button type='submit' className='btn  bg-success text-white'>Save</button>
                                                        <button type='reset' className='btn  bg-light ms-2 text-black'>Reset</button>

                                                    </div>
                                                </Col>
                                            </Row>
                                            <div>
                                                <PaymentSettingModelForm parentPaymentSetting={parentPaymentSetting} childEmptyPaymentSetting={childEmptyPaymentSetting} />
                                            </div>
                                        </Col>
                                    </Row></>}


                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default PaymentSettingTable