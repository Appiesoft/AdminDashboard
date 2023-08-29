import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import HyperDatepicker from '../../../../components/Datepicker';
import MainLoader from '../../../../components/MainLoader';
import { costomerList, promoCouponCreate } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import Select from 'react-select'


const CoupanNewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const customerListApidata = store?.CostomerList?.costomerList?.data
    const promoCouponStatus = store?.PromoCouponCreate?.status
    const promoCouponMessage = store?.PromoCouponCreate?.message
    const promoCouponLorder = store?.PromoCouponCreate;


    const [applicationApplySelect, setApplicationApplySelect] = useState(null)
    const [customerAllData, setCustomerAllData] = useState([])
    const [selectedDropdwonCustomer, setSelectedDropdwonCustomer] = useState([])
    const selectedCustomerId = selectedDropdwonCustomer?.map((ind) => ind.id)


    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }

    const btnChild = () => {
        TableShowBtn()
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

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

    const submitData = (data) => {
        dispatch(promoCouponCreate(
            {
                applicationApply: data.applicationApply,
                customerId: selectedCustomerId,
                promoCouponName: data.promoCoupanName,
                transactionType: data.transactionType,
                usageWithOtherCoupon: data.otherCoupon,
                typeOfPromoCoupon: data.typePromoCoupon,
                minOrderValue: data.minimumOrderValue,
                maxValueOfDescount: data.maxValueDiscount,
                maxTimeUses: data.maxTimeUser,
                couponValue: data.couponValue,
                expiryDate: selectedDate,
                defaults: data.default,
                description: data.description,
                image: imageFormatter(data.image)
            }
        ))
    }

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
        if (promoCouponStatus) {
            ToastHandle('success', promoCouponMessage);
            TableShowBtn();

        } else if (promoCouponStatus === false) {
            ToastHandle('error', promoCouponMessage);
        }
    }, [promoCouponStatus]);

    // end error and success model 

    useEffect(() => {
        if (customerListApidata) {
            setCustomerAllData(customerListApidata.map((items) => ({ ...items, value: items.id, label: `${items.first_name} ${items.last_name} ${items.mobile}` })))
        }
    }, [customerListApidata])

    return (
        <Row >
            <Col xs={12}>
                <Card>
                    <Card.Body className='pt-0'>
                        <Row className=" d-flex align-items-center p-0 ps-2 my-2">
                            <Col xl={12}>
                                <div className="text-lg-end mt-xl-0 ">
                                    <Row>
                                        <Col xl={12}>
                                            <div className="text-lg-end mt-xl-0 ">
                                                <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2"
                                                    onClick={() => btnChild()}
                                                >
                                                    <div className='d-flex align-items-center'>
                                                        <h3>
                                                            <i class="bi bi-plus me-1 text-dark" />
                                                        </h3>
                                                        <div>Coupons List</div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        {promoCouponLorder?.loading ? <MainLoader />
                            :

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
                                <Row className='p-3'>
                                    <Col xs={12} >
                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className=" d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className=''>
                                                                Coupon ID :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="" >
                                                                <Form.Control
                                                                    disabled
                                                                    type="text"
                                                                    placeholder='3'
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group>
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                Application Apply :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={4} className='d-flex justify-content-between'>

                                                            <Form>
                                                                <div className='d-flex'>
                                                                    <div>
                                                                        <Form.Check type='radio'
                                                                            {...register('applicationApply', { required: true })}
                                                                            isInvalid={errors.applicationApply}
                                                                            label="All User" value='ALL_USERS'
                                                                            onChange={(e) => {
                                                                                setApplicationApplySelect(e.target.value)
                                                                            }}
                                                                        />

                                                                    </div>
                                                                    <div className='ms-4'>
                                                                        <Form.Check type='radio'
                                                                            {...register('applicationApply', { required: true })}
                                                                            isInvalid={errors.applicationApply}
                                                                            label="Specific User" value='SPECIFIC_USER'
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
                                                </Form.Group>
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
                                                <Form.Group>
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                Type of Promo/Coupon :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={4} >

                                                            <Form>
                                                                <div className='d-flex '>
                                                                    <div>
                                                                        <Form.Check type='radio'
                                                                            {...register('typePromoCoupon', { required: true })}
                                                                            isInvalid={errors.typePromoCoupon}
                                                                            label="Discount"
                                                                            value='DISCOUNT' />
                                                                    </div>
                                                                    <div className='ms-4'>
                                                                        <Form.Check type='radio'
                                                                            {...register('typePromoCoupon', { required: true })}
                                                                            isInvalid={errors.typePromoCoupon}
                                                                            label="Cash back"
                                                                            value='CASHBACK' />
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
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className='mt-1'>
                                                                Promo / Coupon Name<span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="mt-1" >
                                                                <Form.Control
                                                                    type="text"
                                                                    {...register('promoCoupanName', { required: true })}
                                                                    isInvalid={errors.promoCoupanName}
                                                                    placeholder='HPY10,FIR20,OFF30 etc'
                                                                />
                                                                {errors.promoCoupanName && <span className='text-danger'>Please enter promo coupon name </span>}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>


                                        </Row>
                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center ">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                Transaction Type :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="" >
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
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className='mt-1'>
                                                                Coupon Value <span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="mt-1" >
                                                                <Form.Control
                                                                    {...register('couponValue', { required: true, pattern: /^[0-9+-]+$/ })}
                                                                    isInvalid={errors.couponValue}
                                                                    type="text"
                                                                />
                                                                {errors.couponValue && <span className='text-danger'>Please enter promo coupon value</span>}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center mt-1">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                Minimum Order Value <span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className=" mt-2">
                                                                Expire Date :

                                                            </Form.Label>
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

                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center mt-2">
                                                        <Col lg={3}>
                                                            <Form.Label className=''>
                                                                Default (Y/N) :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className=" mt-1">
                                                                Max Time Uses <span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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

                                        </Row>
                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center mt-2">
                                                        <Col lg={3}>
                                                            <Form.Label className=''>
                                                                Usage with other coupon :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className=" mt-1">
                                                                Description :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="" >
                                                                <textarea
                                                                    {...register('description', { required: true })}
                                                                    isInvalid={errors.description}
                                                                    className='w-100 form-control '
                                                                    type="text"
                                                                    placeholder='description'
                                                                />
                                                                {errors.description && <span className='text-danger'>Please enter description </span>}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group controlId="ne_logo">
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                Image:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Control
                                                                {...register('image', { required: true })}
                                                                isInvalid={errors.image}
                                                                type="file"
                                                            />
                                                            {errors.image && <span className='text-danger'>Please choose image </span>}
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className=" mt-1">
                                                                Maximum Value of Discount <span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="mt-1" >
                                                                <Form.Control
                                                                    {...register('maxValueDiscount', { required: true, pattern: /^[0-9+-]+$/ })}
                                                                    isInvalid={errors.maxValueDiscount}
                                                                    type="text"
                                                                />
                                                                {errors.maxValueDiscount && <span className='text-danger'>Please enter maximum value of discount</span>}
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col lg={12} className="text-center  mt-4">
                                            <Button type="submit" className="btn btn-success">Save</Button>
                                            <Button type="submit" className="btn btn-primary ms-3">Reset</Button>
                                        </Col>

                                    </Col>
                                </Row>
                            </Form>
                        }
                    </Card.Body>
                </Card>
            </Col >
        </Row >
    )
}

export default CoupanNewEnteryForm