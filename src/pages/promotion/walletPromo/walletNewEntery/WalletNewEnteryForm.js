import React, { useEffect } from 'react'
import { Row, Col, Form, Card, Button, } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { walletPromoCreate } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';


const WalletNewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const walletPromoStatus = store?.WalletPromoCreate?.status
    const walletPromoMessage = store?.WalletPromoCreate?.message
    const walletPromoLorder = store?.WalletPromoCreate;

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
        dispatch(walletPromoCreate(
            {
                offerName: data.offerName,
                offerSubtitle: data.offerSubtitle,
                discountPercent: data.discountPercent,
                rechargeAmount: data.rechargeAmount,
                payAmount: data.payAmount,
                status: data.showHide,
                priority: data.priority
            }
        ))
    };

    //start error and success model 
    useEffect(() => {
        if (walletPromoStatus) {
            ToastHandle('success', walletPromoMessage);
            TableShowBtn();

        } else if (walletPromoStatus === false) {
            ToastHandle('error', walletPromoMessage);
        }
    }, [walletPromoStatus]);

    // end error and success model 

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
                                                        <div>Wallet Promo List</div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        {walletPromoLorder?.loading ? (
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
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group >
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label className=''>
                                                            Offer Name :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" >
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
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Offer Subtitle :
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" >
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
                                                    <Col lg={3}>
                                                        <Form.Label className=''>
                                                            Pay Amount:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" >
                                                            <Form.Control
                                                                {...register('payAmount', { required: true, pattern: /^[0-9+-]+$/, })}
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
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Discount Percent:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" >
                                                            <Form.Control
                                                                {...register('discountPercent', { required: true, pattern: /^[0-9+-]+$/, })}
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
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group >
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label className='mt-1'>
                                                            Recharge Amount
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="mt-1" >
                                                            <Form.Control
                                                                {...register('rechargeAmount', { required: true, pattern: /^[0-9+-]+$/, })}
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
                                                    <Col lg={3}>
                                                        <Form.Label>
                                                            Show/Hide:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="" >
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
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group >
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label className=" mt-2">
                                                            Priority:
                                                        </Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Group className="mt-2" >
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
                                            <Button type="submit" className="btn btn-success">Save</Button>
                                            <Button type="submit" className="btn btn-primary ms-3">Reset</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>}

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default WalletNewEnteryForm