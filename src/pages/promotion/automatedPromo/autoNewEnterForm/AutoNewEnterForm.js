import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { automatedPromoCreate, promoCouponList } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';


const AutoNewEnterForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const promoCouponListData = store?.PromoCouponList?.promoCouponList?.data
    const automatedPromoStatus = store?.AutomatedPromoCreate?.status
    const automatedPromoMessage = store?.AutomatedPromoCreate?.message
    const automatedPromoLorder = store?.AutomatedPromoCreate;

    const [searchText, setSearchText] = useState("")
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [promoTypeSelect, setPromoTypeSelect] = useState(null)

    const btnChild = () => {
        TableShowBtn()
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const submitData = (data) => {
        dispatch(automatedPromoCreate({
            promoName: data.promoName,
            promoType: data.promoType,
            walletAmount: promoTypeSelect === "COUPON" ? "" : data.cashbackAmount,
            applicableOn: data.applicableOn,
            couponId: data.coupon,
            segmentId: 1
        }))
    };

    //start error and success model 
    useEffect(() => {
        if (automatedPromoStatus) {
            ToastHandle('success', automatedPromoMessage);
            TableShowBtn();

        } else if (automatedPromoStatus === false) {
            ToastHandle('error', automatedPromoMessage);
        }
    }, [automatedPromoStatus]);

    // end error and success model 


    useEffect(() => {
        dispatch(promoCouponList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
    }, [])

    return (
        <Row >
            <Col xs={12}>
                <Card>
                    <Card.Body className='pt-0'>
                        <Row className="  d-flex align-items-center p-0 ps-2 my-2">

                            <Col xl={12}>
                                <div className="text-lg-end mt-xl-0 ">
                                    <Row>
                                        <Col xl={12}>
                                            <div className="text-lg-end mt-xl-0 ">
                                                <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => btnChild()}>
                                                    <div className='d-flex align-items-center'>
                                                        <h3>
                                                            <i class="bi bi-plus me-1 text-dark" />
                                                        </h3>
                                                        <div>Automated Promo</div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        {automatedPromoLorder?.loading ? (
                            <MainLoader />
                        ) : <Form
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
                                    <Row >
                                        <Col lg={6}>
                                            <Form.Group >
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label className=''>
                                                            Promo Name <span className="text-danger">*</span>:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" >
                                                            <Form.Control
                                                                type="text"
                                                                {...register('promoName', { required: true })}
                                                                isInvalid={errors.promoName}
                                                            />
                                                            {errors.promoName && (
                                                                <span className="text-danger">Please add your promo name</span>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group >
                                                <Row className="d-flex align-items-center mt-2">
                                                    <Col lg={3}>
                                                        <Form.Label className=''>
                                                            Segments <span className="text-danger">*</span>:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" >
                                                            <Form.Select
                                                                {...register('segments', { required: true })}
                                                                isInvalid={errors.segments}
                                                            >
                                                                <option hidden value=''>select</option>
                                                                <option value="yes">yes</option>
                                                                <option value="no">No</option>
                                                            </Form.Select>
                                                            {errors.segments && <span className='text-danger'>Please select one segment  </span>}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='my-3'>
                                        <Col lg={6}>
                                            <Form.Group>
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Promo Type:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Form>
                                                            <div className='d-flex'>
                                                                <div>
                                                                    <Form.Check type='radio'
                                                                        {...register('promoType', { required: true })}
                                                                        label="Cashback" value='WALLET'
                                                                        // isInvalid={errors.promoType}
                                                                        onChange={(e) => {
                                                                            setPromoTypeSelect(e.target.value)
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className='ms-4'>
                                                                    <Form.Check type='radio'
                                                                        {...register('promoType', { required: true })}
                                                                        label="Coupon" value='COUPON'
                                                                        // isInvalid={errors.promoType}
                                                                        onChange={(e) => {
                                                                            setPromoTypeSelect(e.target.value)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* {errors.promoType && <span className='text-danger'>Please select one promo type  </span>} */}
                                                        </Form>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group>
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Applicable On:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={4}>

                                                        <Form>
                                                            <div className='d-flex'>
                                                                <div>
                                                                    <Form.Check type='radio'
                                                                        {...register('applicableOn', { required: true })}
                                                                        label="Mobile"
                                                                        value='MOBILE'
                                                                        isInvalid={errors.applicableOn}
                                                                    />
                                                                </div>
                                                                <div className='mx-4'>
                                                                    <Form.Check type='radio'
                                                                        {...register('applicableOn', { required: true })}
                                                                        label="Pos"
                                                                        value='POS'
                                                                        isInvalid={errors.applicableOn} />
                                                                </div>
                                                                <div>
                                                                    <Form.Check type='radio'
                                                                        {...register('applicableOn', { required: true })}
                                                                        label="Both"
                                                                        value='BOTH'
                                                                        isInvalid={errors.applicableOn} />
                                                                </div>
                                                            </div>
                                                            {errors.applicableOn && <span className='text-danger'>Please select applicable on  </span>}
                                                        </Form>
                                                    </Col>
                                                </Row>
                                            </Form.Group>coupon
                                        </Col>
                                    </Row>
                                    <Row >
                                        {promoTypeSelect && promoTypeSelect === "WALLET" ? (
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className=''>
                                                                Cashback Amount<span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="" >
                                                                <Form.Control
                                                                    {...register('cashbackAmount', {
                                                                        required: true,
                                                                        pattern: /^[0-9+-]+$/,
                                                                    })}
                                                                    type="text"
                                                                />
                                                                {errors.cashbackAmount && (
                                                                    <span className="text-danger">Please add your cashback amount </span>
                                                                )}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        ) :
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center mt-2">
                                                        <Col lg={3}>
                                                            <Form.Label className=''>
                                                                Coupon <span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="" >
                                                                <Form.Select
                                                                    {...register('coupon', { required: true })}
                                                                    isInvalid={errors.coupon}
                                                                >
                                                                    {promoCouponListData?.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option hidden>select</option>
                                                                                <option value={item.charge_id}>{item.charge_name}</option>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </Form.Select>
                                                                {errors.coupon && <span className='text-danger'>Please select one coupon  </span>}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        }

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
            </Col>


        </Row>)
}

export default AutoNewEnterForm