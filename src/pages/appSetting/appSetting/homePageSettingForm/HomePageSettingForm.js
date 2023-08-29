import React, { useEffect, useState } from 'react';
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination, FormControl, FormGroup, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MainLoader from '../../../../components/MainLoader';
import { homePageSettingList, homePageSettingUpdate } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';

const HomePageSettingForm = ({ showBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const homePageSettingListData = store?.HomePageSettingList?.homePageSettingList?.data
    const homePageSettingLoader = store?.HomePageSettingList
    const homePageSettingUpdateStatus = store?.HomePageSettingUpadte?.status
    const homePageSettingUpdateMessage = store?.HomePageSettingUpadte?.message
    const homePageSettingUpdateLoader = store?.HomePageSettingUpadte

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        showBtn()
    }

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const handleHomeSetting = () => {
        const data = homePageSettingListData
        reset({
            expressOrderIcon: data?.express_order_icon,
            expressOrderHeading: data?.express_order_heading,
            expressOrderSubheading: data?.express_order_subheading,
            expressOrderButton: data?.express_order_button,
            expressOrderColor: data?.express_order_color,
            expressOrderShowHide: data?.express_order_show_hide,
            expressOrderPriority: data?.express_order_priority,
            normalOrderIcon: data?.normal_order_icon,
            normalOrderHeading: data?.normal_order_heading,
            normalOrderSubheading: data?.normal_order_subheading,
            normalOrderButton: data?.normal_order_button,
            normalOrderColor: data?.normal_order_color,
            normalOrderShowHide: data?.normal_order_show_hide,
            normalOrderPriority: data?.normal_order_priority,
            priceEstimationIcon: data?.price_estimation_icon,
            PriceEstimationHeading: data?.price_estimation_heading,
            priceEstimationSubheading: data?.price_estimation_subheading,
            priceEstimationBution: data?.price_estimation_button,
            priceEstimationColor: data?.price_estimation_color,
            priceEstimationShowHide: data?.price_estimation_show_hide,
            priceEstimationPriority: data?.price_estimation_priority,
            pickupRequestIcon: data?.pickup_request_icon,
            pickupRequestHeading: data?.pickup_request_heading,
            PickupRequestSubheading: data?.pickup_request_subheading,
            pickupRequestButton: data?.pickup_request_button,
            pickupRequestColor: data?.pickup_request_color,
            pickupRequestShowHide: data?.pickup_request_show_hide,
            pickupReqestPriorty: data?.pickup_request_priority
        })
    }

    useEffect(() => {
        handleHomeSetting()
    }, [homePageSettingListData])

    useEffect(() => {
        dispatch(homePageSettingList())
    }, [])

    const handleHomePageUpdate = (data) => {
        dispatch(homePageSettingUpdate(
            {
                expressOrderIcon: data.expressOrderIcon,
                expressOrderHeading: data.expressOrderHeading,
                expressOrderSubheading: data.expressOrderSubheading,
                expressOrderButton: data.expressOrderButton,
                expressOrderColor: data.expressOrderColor,
                expressOrderShowHide: data.expressOrderShowHide,
                expressOrderPriority: data.expressOrderPriority,
                normalOrderIcon: data.normalOrderIcon,
                normalOrderHeading: data.normalOrderHeading,
                normalOrderSubheading: data.normalOrderSubheading,
                normalOrderButton: data.normalOrderButton,
                normalOrderColor: data.normalOrderColor,
                normalOrderShowHide: data.normalOrderShowHide,
                normalOrderPriority: data.normalOrderPriority,
                priceEstimationIcon: data.priceEstimationIcon,
                priceEstimationHeading: data.PriceEstimationHeading,
                priceEstimationSubheading: data.priceEstimationSubheading,
                priceEstimationButton: data.priceEstimationBution,
                priceEstimationColor: data.priceEstimationColor,
                priceEstimationShowHide: data.priceEstimationShowHide,
                priceEstimationPriority: data.priceEstimationPriority,
                pickupRequestIcon: data.pickupRequestIcon,
                pickupRequestHeading: data.pickupRequestHeading,
                pickupRequestSubheading: data.PickupRequestSubheading,
                pickupRequestButton: data.pickupRequestButton,
                pickupRequestColor: data.pickupRequestColor,
                pickupRequestShowHide: data.pickupRequestShowHide,
                pickupRequestPriority: data.pickupReqestPriorty
            }
        ))
    }
    useEffect(() => {
        if (homePageSettingUpdateStatus) {
            ToastHandle('success', homePageSettingUpdateMessage);
        } else if (homePageSettingUpdateStatus === false) {
            ToastHandle('error', homePageSettingUpdateMessage);
        }
    }, [homePageSettingUpdateStatus]);

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            {homePageSettingLoader?.loading ? <MainLoader /> :
                                homePageSettingUpdateLoader?.loading ? <MainLoader /> :
                                    <Form noValidate
                                        onSubmit={handleSubmit(
                                            (data) => {
                                                handleHomePageUpdate(data)
                                            },
                                            (err) => {
                                                console.log(err);
                                            }
                                        )}>
                                        <Row className=" d-flex align-items-center p-0 ps-2 my-2">
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
                                                                        <div>App Settings</div>
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='border p-4'>
                                                <Row className="mb-3">
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>Express Order Icon :</Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('expressOrderIcon')}
                                                                        placeholder='lni-bolt-alt-2 text-white'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>Express Order Heading :</Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('expressOrderHeading')}

                                                                        placeholder='Express Order'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>


                                                <Row>
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Express Order Subheading :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <textarea className='w-100 form-control'
                                                                        required
                                                                        type="text"
                                                                        {...register('expressOrderSubheading')}

                                                                        placeholder='Just enter your quantity or kg. Dont need to select the any costume or schedule'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>Express Order Button :</Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('expressOrderButton')}

                                                                        placeholder='Book Now'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Row className="my-3">
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Express Order Color :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('expressOrderColor')}
                                                                        placeholder='#000'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>Express Order Show/Hide:</Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Group className="" placeholder="Member Group">
                                                                        <Form.Select
                                                                            {...register('expressOrderShowHide')}
                                                                        >
                                                                            <option hidden>Open this select menu</option>
                                                                            <option value="yes">Yes</option>
                                                                            <option value="no">No</option>

                                                                        </Form.Select>
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
                                                                    <Form.Label>
                                                                        Express Order Priority :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('expressOrderPriority')}
                                                                        placeholder='1'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Normal Order Icon
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('normalOrderIcon')}
                                                                        placeholder='bi bi-box text-white'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row>
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>Normal Order Heading :</Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('normalOrderHeading')}
                                                                        placeholder='Normal Order'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>Normal Order Subheading :</Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <textarea className='w-100 form-control'
                                                                        required
                                                                        type="text"
                                                                        {...register('normalOrderSubheading')}
                                                                        placeholder='Select your dress or costumes to wash, ironing and clean with schedule'

                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>


                                                <Row className="my-3">
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Normal Order Button :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        {...register('normalOrderButton')}
                                                                        placeholder='Book Now'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group >
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Normal Order Color :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('normalOrderColor')}
                                                                        placeholder='#5780d9'
                                                                    />
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
                                                                    <Form.Label>
                                                                        Normal Order Show/Hide:
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Group className="" placeholder="Member Group">
                                                                        <Form.Select
                                                                            {...register('normalOrderShowHide')}
                                                                        >
                                                                            <option hidden>Open this select menu</option>
                                                                            <option value="yes">Yes</option>
                                                                            <option value="no">No</option>

                                                                        </Form.Select>
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
                                                                        Normal Order Priority :
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('normalOrderPriority')}
                                                                        placeholder='2'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <hr />

                                                <Row className="my-3">
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Price Estimation Icon:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('priceEstimationIcon')}
                                                                        placeholder='bi bi-currency-rupee text-white'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Price Estimation Heading:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('PriceEstimationHeading')}
                                                                        placeholder='Price Estimation'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Row className="my-3">
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Price Estimation SubHeading:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <textarea className='w-100 form-control'
                                                                        required
                                                                        type='text'
                                                                        {...register('priceEstimationSubheading')}
                                                                        placeholder='Click to see the pricing of ironing, dry clean, laundry and more'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>

                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Price Estimation Button:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('priceEstimationBution')}
                                                                        placeholder='Explore'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="my-3">
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Price Estimation Color:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('priceEstimationColor')}
                                                                        placeholder='#000'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>Price Estimation Show/Hide:</Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Group className="" >
                                                                        <Form.Select
                                                                            {...register('priceEstimationShowHide')}
                                                                        >
                                                                            <option hidden>Open this select menu</option>
                                                                            <option value="yes">Yes</option>
                                                                            <option value="no">No</option>

                                                                        </Form.Select>
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
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Price Estimation Priority:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('priceEstimationPriority')}
                                                                        placeholder='3'
                                                                    />
                                                                </Col>


                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Pickup Request Icon:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('pickupRequestIcon')}
                                                                        placeholder='bi bi-truck fa-flip-horizontal text-white'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="my-3">
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Pickup Request Heading:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('pickupRequestHeading')}
                                                                        placeholder='Request Pickup'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Pickup Request Subheading:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <textarea className='w-100 form-control'
                                                                        required

                                                                        type='text'
                                                                        {...register('PickupRequestSubheading')}
                                                                        placeholder='Your pick up is just a tap away.Select your preferred slot free doorstep pickup and deliver.Poweres by Doordash'
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="my-3">
                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Pickup Request Button:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('pickupRequestButton')}
                                                                        placeholder='Lets Start'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col lg={6}>
                                                        <Form.Group>
                                                            <Row className="d-flex align-items-center">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Pickup Request Color:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('pickupRequestColor')}
                                                                        placeholder='#5780d9'
                                                                    />
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
                                                                    <Form.Label>
                                                                        Pickup Request Show/Hide
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Group className="" placeholder="Member Group">
                                                                        <Form.Select
                                                                            {...register('pickupRequestShowHide')}
                                                                        >
                                                                            <option hidden>Open this select menu</option>
                                                                            <option value="yes">Yes</option>
                                                                            <option value="no">No</option>

                                                                        </Form.Select>
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
                                                                        Pickup Request Priority:
                                                                    </Form.Label>
                                                                </Col>

                                                                <Col lg={9}>
                                                                    <Form.Control
                                                                        required
                                                                        type='text'
                                                                        {...register('pickupReqestPriorty')}
                                                                        placeholder='0'
                                                                    />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="text-center  mt-4">
                                                        <Button type="submit" className="btn btn-success">
                                                            Update
                                                        </Button>
                                                        <Button type="submit" className="btn btn-primary ms-3">
                                                            Reset
                                                        </Button>
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
        </div>
    )
}
export default HomePageSettingForm