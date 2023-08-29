
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Container, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import HyperDatepicker from '../../../../../components/Datepicker';
import MainLoader from '../../../../../components/MainLoader';
import { customerUpdate, discountChargesList, priceList, promoCouponList, storeList } from '../../../../../redux/actions';
import "./CustomerListEdit.css"
import ToastHandle from '../../../../../helpers/toastMessage';


const CustomerListEdit = ({ parentCustomerList, childEmptyCustomerList }) => {

    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const customerDetailData = store.CustomerDetail
    const customerUpdateLoader = store?.CustomerUpdate
    const customerUpdateStatus = store?.CustomerUpdate?.status
    const customerUpdateMessage = store?.CustomerUpdate?.message
    const storeListData = store.StoreList?.storeList
    const priceListData = store.PriceList?.priceList?.data
    const discountChargeData = store.DiscountChargesList?.discountChargesList?.data
    const promoCouponData = store.PromoCouponList?.promoCouponList?.data
    const discountChargeLoader = store.DiscountChargesList
    const promoCouponLoader = store.PromoCouponList


    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [showLimit, setShowLimit] = useState(10)
    const [discountCharges, setDiscountCharges] = useState([])
    const [promoCoupons, setPromoCoupons] = useState([])


    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const toggle = () => {
        setModal(!modal);
        childEmptyCustomerList('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    // end model

    // start edit form

    useEffect(() => {
        if (parentCustomerList == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentCustomerList]);

    const resetForm = () => {
        if (customerDetailData.customerDetail !== null) {
            const data = customerDetailData.customerDetail
            reset({
                firstName: data.first_name,
                lastName: data.last_name,
                emailId: data.email_id,
                mobile: data.mobile,
                taxId: data.tax_id,
                taxExempt: data.tax_exempt,
                addressAptNo: data.Address1,
                state: data.state,
                city: data.city,
                storeName: data.store_id,
                pinCode: data.zip_code,
                priceList: data.price_list_id,
                preferences: data.preferences,
                locationFor: data.location_for
            })
        }
    }

    useEffect(() => {
        resetForm()
    }, [customerDetailData])

    useEffect(() => {
        dispatch(storeList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
        dispatch(priceList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ));
        dispatch(discountChargesList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ));
        dispatch(promoCouponList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ));
    }, [])

    useEffect(() => {
        if (discountChargeData) {
            setDiscountCharges(discountChargeData)
        }
    }, [discountChargeData]);

    useEffect(() => {
        if (promoCouponData) {
            setPromoCoupons(promoCouponData)
        }
    }, [promoCouponData]);

    useEffect(() => {
        if (customerUpdateStatus) {
            ToastHandle('success', customerUpdateMessage);
            toggle()
        } else if (customerUpdateStatus === false) {
            ToastHandle('error', customerUpdateMessage);
        }
    }, [customerUpdateStatus]);


    return (
        <>
            <>
                <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                    <Modal.Header onHide={toggle} closeButton className="bg-light ">
                        <h4 className="modal-title ">Edit Record</h4>
                    </Modal.Header>
                    <Modal.Body className="pt-0 ">
                        <>
                            <Card>
                                <Card.Body>
                                    {customerUpdateLoader?.loading ? <MainLoader /> :

                                        <Form noValidate onSubmit={handleSubmit(
                                            (data) => {
                                                const discountData = discountCharges.filter((itm) => itm.check).map((itn) => itn.charge_id)
                                                const promoData = promoCoupons.filter((itm) => itm.check).map((itn) => itn.charge_id)
                                                console.log(data, "customer")
                                                dispatch(customerUpdate(
                                                    {
                                                        customerId: 224,
                                                        firstName: data?.firstName,
                                                        lastName: data?.lastName,
                                                        emailId: data?.emailId,
                                                        mobileNumber: data?.mobile,
                                                        address: data?.addressAptNo,
                                                        state: data?.state,
                                                        city: data?.city,
                                                        pincode: data?.pinCode,
                                                        priceListId: data?.priceList,
                                                        locationFor: data?.locationFor,
                                                        storeId: data?.storeName,
                                                        preferences: data?.preferences,
                                                        custCharges: [...discountData, ...promoData],
                                                        location: [
                                                            {
                                                                "street": "Shop No.2 Baba Mkt.Nawada, near Electronic Sub-station, C Block, Phase 2, Industrial Area, Sector 62",
                                                                "landmark": "Noida",
                                                                "pincode": "201301",
                                                                "addlatlng": "28.6162944,77.3685248"
                                                            }
                                                        ]
                                                    }
                                                ))
                                            },
                                            (err) => {
                                                console.log(err);
                                            }
                                        )}>
                                            <Row className="p-1 py-0">
                                                {customerDetailData.loading && <Col lg={12} className='d-flex justify-content-center align-items-center loader_parent position-absolute top-0 bottom-0 end-0 start-0'>
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden text-center">Loading...</span>
                                                    </Spinner>
                                                </Col>}
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_customerid">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Customer ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="63"
                                                                            isValid={false}
                                                                            isInvalid={false}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_joindate">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Join Date :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
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

                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_firstname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            First Name :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control

                                                                            type="text"
                                                                            placeholder="jeffin"
                                                                            {...register('firstName')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_lastname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Last Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control

                                                                            type="text"
                                                                            placeholder="Shahji"
                                                                            {...register('lastName')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_emailid">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            Email ID :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            {...register('emailId')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_mobile">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            Mobile
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <InputGroup>
                                                                            <DropdownButton
                                                                                variant="outline-secondary"
                                                                                title=<i class="bi bi-flag me-2"> 91+</i>>
                                                                                <Dropdown.Item href="#">62+</Dropdown.Item>
                                                                                <Dropdown.Item href="#">92+</Dropdown.Item>
                                                                                <Dropdown.Item href="#">63+</Dropdown.Item>
                                                                                <Dropdown.Item href="#">91+</Dropdown.Item>
                                                                            </DropdownButton>
                                                                            <Form.Control
                                                                                aria-label="Text input with dropdown button"
                                                                                type="text"
                                                                                placeholder="9417385308"
                                                                                {...register('mobile')}
                                                                            />
                                                                        </InputGroup>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_taxid">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Tax Id:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            isValid={false}
                                                                            enable
                                                                            {...register('taxId')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_joindate">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Tax Exempt:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <input type="checkbox"
                                                                            {...register('taxExempt')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_addressaptno">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label className='truncate'>
                                                                            Address/Apt no.:
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Kochi"
                                                                            {...register('addressAptNo')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_State">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>State :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            enable
                                                                            {...register('state')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_city">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            City :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="City"
                                                                            isValid={false}
                                                                            {...register('city')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_Storename">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            Store Name :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Select enabled   {...register('storeName')}
                                                                        >
                                                                            <option hidden value=''>--None--</option>
                                                                            {storeListData?.map((item) => {
                                                                                return (
                                                                                    <>
                                                                                        <option value={item.store_id}> {item.store_name}</option>
                                                                                    </>
                                                                                )
                                                                            })}

                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_pincode">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Zip Code :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control

                                                                            type="text"
                                                                            placeholder="682030"
                                                                            isValid={false}
                                                                            {...register('pinCode')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_Pricelist">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Price List:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Select {...register('priceList')}
                                                                            isInvalid={errors.priceList} enabled>
                                                                            {priceListData?.map((itemb) => {
                                                                                return (
                                                                                    <>
                                                                                        <option hidden value=''>--Select--</option>
                                                                                        <option value={itemb.id}> {itemb.price_list_name}</option>
                                                                                    </>
                                                                                )
                                                                            })}
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_Preferences">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            Preferences :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            {...register('preferences')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_mobile">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            Use this location for :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Form.Group controlId="validationCustom01">
                                                                            <Row className='d-flex align-items-center'>
                                                                                <Col lg={12} className='d-flex justify-content-between'>
                                                                                    <Form.Check type="radio"
                                                                                        {...register('locationFor')}
                                                                                        id="default-checkbox" label="Home" value='Home' />
                                                                                    <Form.Check type="radio"
                                                                                        {...register('locationFor')}
                                                                                        id="default-checkbox" label="Office" value='Office' />
                                                                                    <Form.Check type="radio"
                                                                                        {...register('locationFor')}
                                                                                        id="default-checkbox" label="Others" value='Others' />
                                                                                </Col>
                                                                            </Row>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_Discount/Charges">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>
                                                                            Select Discount/Charges :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Container className='py-2 scroll_br border'>
                                                                            <Row >
                                                                                {discountChargeLoader?.loading ? <MainLoader /> :
                                                                                    <Col lg={12}>
                                                                                        {discountCharges?.map((itemt) => {
                                                                                            return (
                                                                                                <Row onClick={(e) => {
                                                                                                    setDiscountCharges(discountCharges.map((items) => items.charge_id === itemt.charge_id ? { ...items, check: !items.check } : items))
                                                                                                }}>
                                                                                                    <Col className={itemt.check ? "d-flex border selected_btn select_hover" : "d-flex border select_hover"}>
                                                                                                        <>
                                                                                                            <p hidden value=''>--None--</p>
                                                                                                            <p  >{itemt.charge_name} {itemt.charge_amt}</p>
                                                                                                        </>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            )
                                                                                        })}
                                                                                    </Col>
                                                                                }
                                                                            </Row>
                                                                        </Container>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_lastname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={4}>
                                                                        <Form.Label>Select Promo/Coupon :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <Container className='py-2 scroll_br border'>
                                                                            <Row >
                                                                                {promoCouponLoader?.loading ? <MainLoader />
                                                                                    :
                                                                                    <Col lg={12}>
                                                                                        {promoCoupons?.map((itemh) => {
                                                                                            return (
                                                                                                <Row onClick={() => {
                                                                                                    setPromoCoupons(promoCoupons.map((itemd) => itemd.charge_id === itemh.charge_id ? { ...itemd, check: !itemd.check } : itemd))
                                                                                                }}>
                                                                                                    <Col className={itemh.check ? "d-flex border selected_btn select_hover" : "d-flex border select_hover"}>
                                                                                                        <>
                                                                                                            <p hidden value=''>--None--</p>
                                                                                                            <p >{itemh.charge_name} {itemh.charge_amt}</p>
                                                                                                        </>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            )
                                                                                        })}
                                                                                    </Col>
                                                                                }
                                                                            </Row>
                                                                        </Container></Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4} className="mx-auto d-flex mt-4">
                                                            <Col className="text-center">
                                                                <Button type="submit" className="btn btn-success">
                                                                    Update
                                                                </Button>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <Button type="reset" className="btn btn-light">
                                                                    Reset
                                                                </Button>
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    }
                                </Card.Body>
                            </Card>
                        </>
                    </Modal.Body>
                </Modal>
            </>
        </>
    );
}

export default CustomerListEdit
