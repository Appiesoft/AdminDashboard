import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../../../../components/MainLoader';
import { walletPromoUpdate } from '../../../../../../redux/actions';
import ToastHandle from '../../../../../../helpers/toastMessage';


const WalletPromoEdit = ({ parentWalletPromoEdit, childEmptyWalletPromoEdit }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const walletPromoDetailData = store?.WalletPromoDetail?.walletPromoDetail?.data
    const walletPromoDetailLoader = store?.WalletPromoDetail
    const walletPromoUpdateStatus = store?.WalletPromoUpdate?.status
    const walletPromoUpdateMessage = store?.WalletPromoUpdate?.message
    const walletPromoUpdateLoader = store?.WalletPromoUpdate

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyWalletPromoEdit('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    // end model


    useEffect(() => {
        if (parentWalletPromoEdit == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentWalletPromoEdit]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const resetForm = () => {
        const data = walletPromoDetailData
        reset({
            walletId: data?.id,
            offerName: data?.offer_name,
            offerSubtitle: data?.offer_subtitle,
            payAmount: data?.pay_amount,
            discountPercent: data?.discount_percent,
            rechargeAmount: data?.recharge_amount,
            showHide: data?.status,
            priority: data?.priority,
        })
    }

    useEffect(() => {
        resetForm()
    }, [walletPromoDetailData])

    //start error and success model 
    useEffect(() => {
        if (walletPromoUpdateStatus) {
            ToastHandle('success', walletPromoUpdateMessage);
            toggle()
        } else if (walletPromoUpdateStatus === false) {
            ToastHandle('error', walletPromoUpdateMessage);
        }
    }, [walletPromoUpdateStatus]);

    // end error and success model 

    return (
        <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
            <Modal.Header onHide={toggle} closeButton className="bg-light ">
                <h4 className="modal-title ">Edit Record</h4>
            </Modal.Header>
            <Modal.Body className="pt-0 ">
                <Row >
                    <Col xs={12}>
                        <Card>
                            <Card.Body className='pt-0'>
                                {walletPromoUpdateLoader?.loading ? <MainLoader /> :
                                    <Form
                                        noValidate
                                        onSubmit={handleSubmit(
                                            (data) => {
                                                dispatch(walletPromoUpdate({
                                                    id: data?.walletId,
                                                    offerName: data?.offerName,
                                                    offerSubtitle: data?.offerSubtitle,
                                                    discountPercent: data?.discountPercent,
                                                    rechargeAmount: data?.rechargeAmount,
                                                    payAmount: data?.payAmount,
                                                    status: data?.showHide,
                                                    priority: data?.priority
                                                }))
                                            },
                                            (err) => {
                                                console.log(err);
                                            }
                                        )}>
                                        {walletPromoDetailLoader?.loading ? <MainLoader /> :

                                            <Row className='p-3'>
                                                <Col xs={12} >
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label className=''>
                                                                            wallet Id :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group>
                                                                            <Form.Control
                                                                                {...register('walletId')}
                                                                                type="text"
                                                                            // disabled
                                                                            />
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
                                                                            Offer Name :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group>
                                                                            <Form.Control
                                                                                {...register('offerName', { required: true })}
                                                                                type="text"
                                                                                isInvalid={errors.offerName}
                                                                            />
                                                                            {errors.offerName && (
                                                                                <span className="text-danger">Please add your offer name</span>
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
                                                                        <Form.Label>
                                                                            Offer Subtitle :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group>
                                                                            <Form.Control
                                                                                {...register('offerSubtitle', { required: true })}
                                                                                isInvalid={errors.offerSubtitle}
                                                                                type="text"
                                                                            />
                                                                            {errors.offerSubtitle && (
                                                                                <span className="text-danger">Please add your offer subtitle</span>
                                                                            )}
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
                                                                            Pay Amount:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group >
                                                                            <Form.Control
                                                                                {...register('payAmount', { required: true })}
                                                                                type="text"
                                                                                isInvalid={errors.payAmount}
                                                                            />
                                                                            {errors.payAmount && (
                                                                                <span className="text-danger">Please add your amount</span>
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
                                                                        <Form.Label>
                                                                            Discount Percent:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group >
                                                                            <Form.Control
                                                                                {...register('discountPercent', { required: true })}
                                                                                type="text"
                                                                                isInvalid={errors.discountPercent}
                                                                            />
                                                                            {errors.discountPercent && (
                                                                                <span className="text-danger">Please add your discount percent </span>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-2">
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Recharge Amount
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group >
                                                                            <Form.Control
                                                                                {...register('rechargeAmount', { required: true })}
                                                                                type="text"
                                                                                isInvalid={errors.rechargeAmount}
                                                                            />
                                                                            {errors.rechargeAmount && (
                                                                                <span className="text-danger">Please add your recharge amount </span>
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
                                                                        <Form.Label>
                                                                            Show/Hide:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group >
                                                                            <Form.Select
                                                                                {...register('showHide', { required: true })}
                                                                                isInvalid={errors.showHide}

                                                                            >
                                                                                <option hidden value=''>select </option>
                                                                                <option value="SHOW">Show </option>
                                                                                <option value="HIDE">Hide</option>

                                                                            </Form.Select>
                                                                            {errors.showHide && (
                                                                                <span className="text-danger">Please select one </span>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group >
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label className=" mt-2">
                                                                            Priority:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group  >
                                                                            <Form.Control
                                                                                {...register('priority', { required: true, pattern: /^[0-9+-]+$/, })}
                                                                                type="text"
                                                                                isInvalid={errors.priority}
                                                                            />
                                                                            {errors.priority && (
                                                                                <span className="text-danger">Please add your priority </span>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={12} className="text-center  mt-4">
                                                            <Button type="submit" className="btn btn-success">Update</Button>
                                                            <Button type="reset" className="btn btn-primary ms-3">Reset</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        }
                                    </Form>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default WalletPromoEdit
