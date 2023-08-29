import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../../../../components/MainLoader';
import { automatedPromoList, automatedPromoUpdate, promoCouponList } from '../../../../../../redux/actions';
import ToastHandle from '../../../../../../helpers/toastMessage';



const AutomateEditModelForm = ({ parentAutomateEdit, childEmptyAutomateEdit }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    // const promoCouponListData = store?.PromoCouponList?.promoCouponList?.data
    const automatedPromoDetailData = store?.AutomatedPromoDetail?.automatedPromoDetail?.data
    const automatedPromoDetaiLoader = store?.AutomatedPromoDetail
    const automatedPromoUpdateStatus = store?.AutomatedPromoUpdate?.status
    const automatedPromoUpdateMessage = store?.AutomatedPromoUpdate?.message

    const [searchText, setSearchText] = useState("")
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [promoTypeSelect, setPromoTypeSelect] = useState(null)

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyAutomateEdit('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    // end model

    useEffect(() => {
        if (parentAutomateEdit == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentAutomateEdit]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // const [resetDataHandling, setResetDataHandling] = useState(null)

    // const resetForm = () => {
    //     const data = automatedPromoDetailData
    //     setResetDataHandling(data)
    // }

    const resetForm = () => {
        const data = automatedPromoDetailData
        reset({
            promoId: data?.id,
            promoName: data?.promo_name,
            segments: data?.segment,
            promoType: data?.promo_name,
            applicableOn: data?.applicable_on,
            cashbackAmount: data?.wallet_amount,
            // coupon: resetDataHandling?.
        })
    }

    useEffect(() => {
        resetForm()
    }, [automatedPromoDetailData])

    useEffect(() => {
        dispatch(promoCouponList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
    }, [])

    useEffect(() => {
        if (automatedPromoUpdateStatus) {
            ToastHandle('success', automatedPromoUpdateMessage);
            toggle()
            dispatch(automatedPromoList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }))
        } else if (automatedPromoUpdateStatus === false) {
            ToastHandle('error', automatedPromoUpdateMessage);
        }
    }, [automatedPromoUpdateStatus]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Row >
                    {automatedPromoDetaiLoader?.loading ? <MainLoader /> :
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <Form
                                        noValidate
                                        onSubmit={handleSubmit(
                                            (data) => {
                                                dispatch(automatedPromoUpdate(
                                                    {
                                                        promoId: data?.promoId,
                                                        promoName: data?.promoName,
                                                        promoType: data?.promoType,
                                                        walletAmount: data?.cashbackAmount,
                                                        applicableOn: data?.applicableOn,
                                                        couponId: 0,
                                                        segmentId: 1
                                                    }

                                                ))
                                            },
                                            (err) => {
                                                console.log(err);
                                            }
                                        )}>
                                        <Row className='p-3'>
                                            <Col xs={12} >
                                                <Row>
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={12}>
                                                                    <Form.Label className=''>
                                                                        Promo id :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <Form.Group className="" >
                                                                        <Form.Control
                                                                            type="text"
                                                                            {...register('promoId')}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={12}>
                                                                    <Form.Label className=''>
                                                                        Promo Name :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={12}>
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
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={12}>
                                                                    <Form.Label className=''>
                                                                        Segments <span className="text-danger">*</span>:
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <Form.Group className="" >
                                                                        <Form.Select
                                                                            {...register('segments', { required: true })}
                                                                            isInvalid={errors.segments}
                                                                        >
                                                                            <option hidden>select</option>
                                                                            <option value="test segment">test segment</option>
                                                                            {/* <option value="no">No</option> */}
                                                                        </Form.Select>
                                                                        {errors.segments && <span className='text-danger'>Please select one segment  </span>}
                                                                    </Form.Group>
                                                                </Col>
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
                                                                        Promo Type:
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={12} className='d-flex mt-1'>
                                                                    <Form>
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <Form.Check type='radio'
                                                                                    {...register('promoType')}
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
                                                                                    label="Coupon" value='Coupon'
                                                                                    // isInvalid={errors.promoType}
                                                                                    onChange={(e) => {
                                                                                        setPromoTypeSelect(e.target.value)
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {errors.promoType && <span className='text-danger'>Please select one promo type  </span>}
                                                                    </Form>                                                            </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={12}>
                                                                    <Form.Label>
                                                                        Applicable On:
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={12} className='d-flex mt-1'>
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
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="my-">
                                                    {/* {promoTypeSelect && promoTypeSelect === "WALLET" ? ( */}
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center ">
                                                                <Col lg={12}>
                                                                    <Form.Label className=''>
                                                                        Cashback Amount:
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={12}>
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
                                                    {/* ) : */}
                                                    {/* <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center mt-2">
                                                                <Col lg={6}>
                                                                    <Form.Label className=''>
                                                                        Coupon <span className="text-danger">*</span>:
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={12}>
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
                                                } */}
                                                </Row>
                                                <Col lg={12} className="text-center  mt-4">
                                                    <Button type="submit" className="btn btn-success">Update</Button>
                                                    <Button type="reset" className="btn btn-primary ms-3">Reset</Button>
                                                </Col>

                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    }
                </Row>
            </Modal>
        </>
    )
}

export default AutomateEditModelForm