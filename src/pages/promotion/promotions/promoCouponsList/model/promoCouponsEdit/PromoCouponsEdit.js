import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import HyperDatepicker from '../../../../../../components/Datepicker';
import { costomerList, promoCouponDetail, promoCouponList, promoCouponUpadte } from '../../../../../../redux/actions';
import Select from "react-select"
import MainLoader from '../../../../../../components/MainLoader';
import ToastHandle from '../../../../../../helpers/toastMessage';

const PromoCouponsEdit = ({ open, close }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const customerListApidata = store?.CostomerList?.costomerList?.data
    const promoCouponDetailData = store?.PromoCouponDetail?.promoCouponDetail?.data
    const promoCouponDetailLoader = store?.PromoCouponDetail
    const promoCouponUpadteStatus = store?.PromoCouponUpadte?.status
    const promoCouponUpadteMessage = store?.PromoCouponUpadte?.message

    const [applicationApplySelect, setApplicationApplySelect] = useState(null)
    const [customerAllData, setCustomerAllData] = useState([])
    const [selectedDropdwonCustomer, setSelectedDropdwonCustomer] = useState([])
    const selectedCustomerId = selectedDropdwonCustomer?.map((ind) => ind.id)


    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);

    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }
    const toggle = () => {
        setModal(!modal);
        close(false)
    };

    const openModalWithEditModel = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (open) {
            setModal(true)
        }
    }, [open])

    const starRequired = (<span className='text-danger'>*</span>)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const resetForm = () => {
        const data = promoCouponDetailData
        reset({
            promoCouponId: data?.charge_id,
            applicationApply: data?.application_apply,
            promoCoupanName: data?.promo_charge_name,
            typePromoCoupon: data?.type_of_promo_coupon,
            transactionType: data?.transaction_type,
            couponValue: data?.coupon_value,
            minimumOrderValue: data?.min_order_value,
            default: data?.default,
            maxTimeUser: data?.max_time_uses,
            otherCoupon: data?.usage_with_other_coupon,
            description: data?.description,
            image: imageFormatter(data?.image)
        })
    }

    useEffect(() => {
        resetForm()
    }, [promoCouponDetailData])

    useEffect(() => {
        if (customerListApidata) {
            setCustomerAllData(customerListApidata.map((items) => ({ ...items, value: items.id, label: `${items.first_name} ${items.last_name} ${items.mobile}` })))
        }
    }, [customerListApidata])

    useEffect(() => {
        dispatch(
            costomerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
            })
        );
    }, [])

    //start error and success model 
    useEffect(() => {
        if (promoCouponUpadteStatus) {
            ToastHandle('success', promoCouponUpadteMessage);
            toggle();
            dispatch(promoCouponList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }))
        } else if (promoCouponUpadteStatus === false) {
            ToastHandle('error', promoCouponUpadteMessage);
        }
    }, [promoCouponUpadteStatus]);

    // end error and success model 

    return (

        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={"lg"} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row >
                        <Col xs={12}>
                            <Card>
                                <Card.Body className='pt-0'>
                                    {promoCouponDetailLoader?.loading ? <MainLoader /> :
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit(
                                                (data) => {
                                                    dispatch(promoCouponUpadte(
                                                        {
                                                            promoCouponId: data?.promoCouponId,
                                                            applicationApply: data?.applicationApply,
                                                            customerId: selectedCustomerId,
                                                            promoCouponName: data?.promoCoupanName,
                                                            transactionType: data?.transactionType,
                                                            usageWithOtherCoupon: data?.otherCoupon,
                                                            typeOfPromoCoupon: data?.typePromoCoupon,
                                                            minOrderValue: data?.minimumOrderValue,
                                                            maxValueOfDiscount: 5,
                                                            maxTimeUses: data?.maxTimeUser,
                                                            couponValue: data?.couponValue,
                                                            expiryDate: selectedDate,
                                                            defaults: data?.default,
                                                            description: data?.description,
                                                            image: data?.image
                                                        }
                                                    ))
                                                },
                                                (err) => {
                                                    console.log(err);
                                                }
                                            )}>
                                            <Row className='py-2'>
                                                <Col xs={12} >
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className=" d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Coupon ID :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group  >
                                                                            <Form.Control
                                                                                type="text"
                                                                                {...register('promoCouponId')}

                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col lg={6}>
                                                            <Form>
                                                                <div className='d-flex'>
                                                                    <div>
                                                                        <Form.Check type='radio'
                                                                            {...register('applicationApply', { required: true })}
                                                                            isInvalid={errors.applicationApply}
                                                                            label="All User" value="ALL_USERS"
                                                                            onChange={(e) => {
                                                                                setApplicationApplySelect(e.target.value)
                                                                            }}
                                                                        />

                                                                    </div>
                                                                    <div className='ms-4'>
                                                                        <Form.Check type='radio'
                                                                            {...register('applicationApply', { required: true })}
                                                                            isInvalid={errors.applicationApply}
                                                                            label="Specific User" value="SPECIFIC_USER"
                                                                            onChange={(e) => {
                                                                                setApplicationApplySelect(e.target.value)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {errors.applicationApply && <span className='text-danger'> Please choose any application apply  </span>}
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                    {applicationApplySelect && applicationApplySelect === "SPECIFIC_USER" ?
                                                        <Row className="my-3">
                                                            <Col lg={6}>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group >
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={3}>
                                                                            <Form.Label className='mt-1'>
                                                                                Customers <span className="text-danger">*</span>:
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Group className="" >
                                                                                <Select options={customerAllData} isMulti onChange={(e) => {
                                                                                    setSelectedDropdwonCustomer(e)
                                                                                }} />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        : null
                                                    }
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label className='mt-1'>
                                                                            Customers :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group>
                                                                            <textarea className='w-100' disabled />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label className='mt-1'>
                                                                            Promo / Coupon Name{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="mt-1" >
                                                                            <Form.Control
                                                                                type="text"
                                                                                {...register('promoCoupanName', { required: true })}
                                                                                isInvalid={errors.promoCoupanName}
                                                                                placeholder='HPY10,FIR20,OFF30 etc'
                                                                            />
                                                                            {errors.promoCoupanName && <span className='text-danger'>Please enter promo coupon name </span>}
                                                                        </Form.Group>                                                              </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group>
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Type of Promo/Coupon :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12} >
                                                                        <Form>
                                                                            <div className='d-flex '>
                                                                                <div>
                                                                                    <Form.Check type='radio'
                                                                                        {...register('typePromoCoupon', { required: true })}
                                                                                        isInvalid={errors.typePromoCoupon}
                                                                                        label="Discount"
                                                                                        value="DISCOUNT" />
                                                                                </div>
                                                                                <div className='ms-4'>
                                                                                    <Form.Check type='radio'
                                                                                        {...register('typePromoCoupon', { required: true })}
                                                                                        isInvalid={errors.typePromoCoupon}
                                                                                        label="Cash back"
                                                                                        value="CASHBACK" />
                                                                                </div>
                                                                            </div>
                                                                            {errors.typePromoCoupon && <span className='text-danger'> Please choose any type of promo coupon  </span>}
                                                                        </Form>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center ">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Transaction Type :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group>
                                                                            <Form.Select
                                                                                {...register('transactionType', { required: true })}
                                                                                isInvalid={errors.transactionType}>
                                                                                <option hidden>select </option>
                                                                                <option value="PERCENTAGE">Percentage (%) </option>
                                                                                <option value="AMOUNT"> Ammount (USD)</option>
                                                                            </Form.Select>
                                                                            {errors.transactionType && <span className='text-danger'>Please select one transaction type </span>}

                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3" >
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Coupon Value{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            {...register('couponValue', { required: true, pattern: /^[0-9+-]+$/ })}
                                                                            isInvalid={errors.couponValue}
                                                                            type="text"
                                                                        />
                                                                        {errors.couponValue && <span className='text-danger'>Please enter promo coupon value</span>}

                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Minimum Order Value{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="mt-2" >
                                                                            <Form.Control
                                                                                {...register('minimumOrderValue', { required: true, pattern: /^[0-9+-]+$/ })}
                                                                                isInvalid={errors.minimumOrderValue}
                                                                                type="text"
                                                                            />
                                                                            {errors.minimumOrderValue && <span className='text-danger'>Please enter minimum order value</span>}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Expire Date :

                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center ">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Default (Y/N) :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" >
                                                                            <Form.Select
                                                                                {...register('default', { required: true })}
                                                                                isInvalid={errors.default}
                                                                            >
                                                                                <option hidden value="">select</option>
                                                                                <option value="YES">Yes</option>
                                                                                <option value="NO">No</option>
                                                                            </Form.Select>
                                                                            {errors.default && <span className='text-danger'>Please select one </span>}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="my-3">

                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Max Time Uses{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="mt-1" >
                                                                            <Form.Control
                                                                                {...register('maxTimeUser', { required: true, pattern: /^[0-9+-]+$/ })}
                                                                                isInvalid={errors.maxTimeUser}
                                                                                type="text"
                                                                            />
                                                                            {errors.maxTimeUser && <span className='text-danger'>Please enter maximum time of discount</span>}
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
                                                                            Usage with other coupon :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" >
                                                                            <Form.Select
                                                                                {...register('otherCoupon', { required: true })}
                                                                                isInvalid={errors.otherCoupon}
                                                                            >
                                                                                <option hidden>select</option>
                                                                                <option value="YES">Yes</option>
                                                                                <option value="NO">No</option>
                                                                            </Form.Select>
                                                                            {errors.otherCoupon && <span className='text-danger'>Please select one  </span>}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    <Row className="my-3">

                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Description :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" >
                                                                            <textarea
                                                                                {...register('description')}
                                                                                className='w-100 form-control '
                                                                                type="text"
                                                                                placeholder='description'
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_logo">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Image:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            {...register('image')}
                                                                            type="file"
                                                                        />

                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={12} className="text-center  mt-4">
                                                            <Button type="submit" className="btn btn-success">Update</Button>
                                                            <Button type="reset" className="btn btn-light px-3 ms-3">Reset</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PromoCouponsEdit