import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { paymentChargesList, PaymentTypeListAction, paymentChargesCreate, paymentChargesRemove, paymentChargesUpdate } from '../../../../redux/actions';
import { useForm } from 'react-hook-form';
import Loader from "../../../../components/MainLoader"

const PaymentChargesForm = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const [editFieldData, setEditFieldData] = useState(null)
    const [paymentChargesData, setPaymentChargesData] = useState([])
    const paymentChargesCreateRes = store?.PaymentChargesCreate?.status
    const paymentChargesRemoveRes = store?.PaymentChargesRemove?.status
    const paymentChargeListData = store?.PaymentChargesList?.paymentChargesList?.data
    const paymentTypeData = store?.PaymentTypeListReducer?.paymentTypeList?.data
    const PaymentChargeLoader = store.PaymentChargesList;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const submitData = (data) => {
        console.log(data, 'payment charge')

    };


    const getPaymentCharges = () => {
        dispatch(PaymentTypeListAction(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 10
            }
        ));

        dispatch(paymentChargesList());


    }
    const getPaymentListData = (idx) => {
        const addPaymentCharges = paymentChargesData.map((itmd) => itmd.payment_method_id)
        const data = paymentTypeData?.filter((itdmc) => itdmc.payment_id === idx ? true : !addPaymentCharges.includes(itdmc.payment_id))
        return data
    }

    useEffect(() => {
        getPaymentCharges()
    }, []);
    useEffect(() => {
        if (paymentChargeListData) {
            setPaymentChargesData(paymentChargeListData)
        }
    }, [paymentChargeListData])
    useEffect(() => {
        if (paymentChargesCreateRes) {
            getPaymentCharges()
        }
    }, [paymentChargesCreateRes])
    useEffect(() => {
        if (paymentChargesRemoveRes) {
            getPaymentCharges()
        }
    }, [paymentChargesRemoveRes])
    return (
        <>
            <Card>
                <Card.Body>
                    {PaymentChargeLoader?.loading ? <Loader /> :
                        <Form noValidate onSubmit={handleSubmit(
                            (data) => {
                                submitData(data);
                            },
                            (err) => {
                                console.log(err);
                            }
                        )} className='px-3'>
                            <Row className='p-3 mt-3 border'>
                                {paymentChargesData?.map((itms) => {
                                    const disableFieldStatus = editFieldData?.payment_charges_id !== itms.payment_charges_id
                                    const paymentListGenerate = getPaymentListData(itms.payment_method_id)
                                    return (
                                        <Col lg={12}>
                                            <Row className=' d-flex align-items-center mb-2'>
                                                <Col>
                                                    <Row>
                                                        <Col lg={12}>
                                                            Payment Type
                                                        </Col>
                                                        <Col lg={12} className='mt-1'>
                                                            <Form.Group className="" placeholder='Member Group'  >
                                                                <Form.Select onChange={(e) => {
                                                                    setPaymentChargesData(paymentChargesData.map((itmdx, indx) => itmdx.payment_charges_id === itms.payment_charges_id ? { ...itmdx, payment_method_id: e.target.value } : itmdx))

                                                                }} id="disabledSelect" value={itms.payment_method_id} aria-label="Default select example" disabled={disableFieldStatus}>
                                                                    {paymentListGenerate?.map((itemdxs) => {
                                                                        return (
                                                                            <option value={itemdxs.payment_id}>{itemdxs.method}</option>
                                                                        )
                                                                    })}

                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col lg={12} className='mt-1'>
                                                            Payment Amount (Percentage)
                                                        </Col>
                                                        <Col lg={12} className='mt-1'>
                                                            <Form.Control onChange={(e) => {
                                                                setPaymentChargesData(paymentChargesData.map((itmdx, indx) => itmdx.payment_charges_id === itms.payment_charges_id ? { ...itmdx, amount: e.target.value } : itmdx))

                                                            }} required type="number" value={itms.amount} disabled={disableFieldStatus} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col lg={12}>
                                                            Status
                                                        </Col>
                                                        <Col lg={12} className='mt-1'>
                                                            <div className='d-flex mt-1'>
                                                                <div className=''>
                                                                    <Form>
                                                                        <Form.Check onChange={() => {
                                                                            setPaymentChargesData(paymentChargesData.map((itmdx, indx) => itmdx.payment_charges_id === itms.payment_charges_id ? { ...itmdx, status: itmdx.status === "enable" ? "disable" : "enable" } : itmdx))
                                                                        }} type="switch" checked={itms.status === "enable" ? true : false} id="custom-switch" label={itms.status === "enable" ? <span className='text-success'>Enable</span> : <span className='text-danger'>Disable</span>} disabled={disableFieldStatus} />
                                                                    </Form>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col lg={12} className='mt-1 text-center'>
                                                            {disableFieldStatus ? (
                                                                <> <button onClick={() => {
                                                                    setEditFieldData(itms)
                                                                }} className='btn bg-success text-white'>
                                                                    <i className="dripicons-document-edit"></i>
                                                                </button>
                                                                    <button onClick={() => {
                                                                        dispatch(paymentChargesRemove({
                                                                            paymentChargesId: itms.payment_charges_id
                                                                        }));
                                                                    }} className='btn bg-danger text-white ms-2'>
                                                                        <i className="mdi mdi-delete"></i>
                                                                    </button></>
                                                            ) :
                                                                (
                                                                    <>
                                                                        <button onClick={() => {
                                                                            const reqData = paymentChargesData.find((itdn) => itdn.payment_charges_id === editFieldData.payment_charges_id)
                                                                            if (editFieldData.payment_charges_id === "new") {
                                                                                dispatch(paymentChargesCreate({
                                                                                    status: reqData.status,
                                                                                    paymentMethodId: reqData.payment_method_id,
                                                                                    amount: reqData.amount
                                                                                }));
                                                                                setEditFieldData(null)
                                                                            } else {
                                                                                dispatch(paymentChargesUpdate({
                                                                                    status: reqData.status,
                                                                                    paymentMethodId: reqData.payment_method_id,
                                                                                    paymentChargesId: reqData.payment_charges_id,
                                                                                    amount: reqData.amount
                                                                                }));
                                                                                setEditFieldData(null)
                                                                            }
                                                                        }} className='btn bg-primary text-white'>
                                                                            Save
                                                                        </button>
                                                                        <button onClick={() => {
                                                                            setEditFieldData(null)
                                                                        }} className='btn bg-light text-dark ms-2'>
                                                                            cancel
                                                                        </button>
                                                                    </>
                                                                )}
                                                        </Col>
                                                    </Row>
                                                </Col >
                                            </Row>
                                            <hr />
                                        </Col>
                                    )

                                })}


                                <Row>
                                    <Col>
                                        <button onClick={() => {
                                            if ((paymentChargesData.length + 1) > paymentTypeData.length) {
                                                return 1
                                            } else {
                                                if (editFieldData === null) {
                                                    setPaymentChargesData([...paymentChargesData, {
                                                        amount: "",
                                                        payment_charges_id: "new",
                                                        payment_method: "new",
                                                        payment_method_id: "new",
                                                        status: "disable"
                                                    }])
                                                    setEditFieldData({
                                                        amount: "",
                                                        payment_charges_id: "new",
                                                        payment_method: "new",
                                                        payment_method_id: "new",
                                                        status: "disable"
                                                    })
                                                }
                                            }


                                        }} className='btn  bg-primary text-white'><i className="uil uil-plus"></i></button>
                                    </Col>
                                </Row>

                            </Row>

                        </Form>}


                </Card.Body>
            </Card>
        </>)
}

export default PaymentChargesForm