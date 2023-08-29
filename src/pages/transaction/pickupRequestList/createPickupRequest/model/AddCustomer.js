import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Container, InputGroup, Button, Modal } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './AddCustomer.css';
import HyperDatepicker from '../../../../../components/Datepicker';
import MainLoader from '../../../../../components/MainLoader';
import { discountChargesList, laundryPackagesList, priceList, promoCouponList, storeList } from '../../../../../redux/actions';
import { customerCreate } from '../../../../../redux/customer/customerList/action';
import ToastHandle from '../../../../../helpers/toastMessage';



const AddCustomer = ({ parentFill, childEmpty }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeListData = store?.StoreList?.storeList
    const laundryPackagesListData = store?.LaundryPackagesList?.laundryPackagesList?.data
    const priceListData = store.PriceList?.priceList?.data
    const discountChargeData = store?.DiscountChargesList?.discountChargesList?.data
    const promoCouponData = store?.PromoCouponList?.promoCouponList?.data
    const discountChargeLoader = store?.DiscountChargesList
    const promoCouponLoader = store?.PromoCouponList
    const customerCreateStatus = store?.CustomerCreate?.status
    const customerCreateMessage = store?.CustomerCreate?.message
    const customerCreateLoader = store?.CustomerCreate

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
    const [phoneCode, setPhoneCode] = useState("+91")


    const toggle = () => {
        setModal(!modal);
        childEmpty("")
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    const starRequired = (<span className='text-danger'>*</span>)

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    useEffect(() => {
        if (parentFill == "lg") {
            openModalWithSize('lg');
        }
    }, [parentFill]);


    //form validation
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // const submitData = (data) => {
    //     console.log(data)
    //     // showBtn();
    // };

    // end form validation
    const handleReset = () => {
        reset(
            {
                firstName: "",
                lastName: "",
                addressAptNo: "",
                city: "",
                zipCode: "",
                locationFor: "",
                emailId: "",
                taxId: "",
                taxExempt: "",
                storeName: "",
                discountCharges: "",
                promoCoupon: "",
                priceList: "",
                choosePackage: "",
                preferences: "",
                pin: "",

            }
        )
        setPhoneCode("+91")

    }

    const discountData = discountCharges.filter((itm) => itm.check).map((itn) => itn.charge_id)
    const promoData = promoCoupons.filter((itm) => itm.check).map((itn) => itn.charge_id)

    const handleCreate = (data) => {
        dispatch(customerCreate({
            taxExempt: data.textExempt ? 1 : 0,
            lastName: data.lastName,
            taxId: data.textId,
            firstName: data.firstName,
            address: data.addressAptNo,
            zipcode: data.zipCode,
            city: data.city,
            country: "india",
            custMapPos: "11.476537009948718, 76.88430238967284",
            emailId: data.emailId,
            mobile: data.mobile,
            countryCode: " + 1",
            countryPrefixCode: "us",
            custCharges: [...discountData, ...promoData],
            locationFor: data.location,
            storeId: data.storeName,
            priceListId: data.priceList,
            preferences: data.preferences
        }))
    }

    useEffect(() => {
        dispatch(storeList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
        dispatch(laundryPackagesList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
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
        if (customerCreateStatus) {
            ToastHandle('success', customerCreateMessage);
            toggle()
        } else if (customerCreateStatus === false) {
            ToastHandle('error', customerCreateMessage);
        }
    }, [customerCreateStatus]);


    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className='bg-light '>
                    <h4 className="modal-title ">Customer Details</h4>
                </Modal.Header>
                <Modal.Body className='pt-0 '>
                    <Row>
                        <Col className='px-0'>
                            <>
                                <Card className='mb-0'>
                                    <Card.Body className='py-0'>
                                        {customerCreateLoader?.loading ? <MainLoader /> :
                                            <Form noValidate
                                                onSubmit={handleSubmit(
                                                    (data) => {
                                                        handleCreate(data);
                                                    },
                                                    (err) => {

                                                        console.log(err);
                                                    }
                                                )}>
                                                <Row className='p-3 pb-0'>
                                                    <Col lg={12}>
                                                        <Row >
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Customer ID :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control required type="text" placeholder="Customer ID" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Join Date :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <HyperDatepicker
                                                                                value={selectedDate}
                                                                                inputClass="form-control-light"
                                                                                onChange={(date) => {
                                                                                    onDateChange(date);
                                                                                }}
                                                                            />                                                                    </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row className='my-3'>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>First Name{starRequired} :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control required type="text"
                                                                                {...register('firstName', { required: true })}
                                                                                isInvalid={errors.firstName}
                                                                                placeholder="First name" />
                                                                            {errors.firstName && <span className='text-danger'>Please enter your First name</span>}
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Last Name :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control required type="text"
                                                                                {...register('lastName')}
                                                                                placeholder="Last Name" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row className='my-3'>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Address/Apt no :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                {...register('addressAptNo')}
                                                                                type="text" placeholder="Address/Apt no" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>City :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control type="text"
                                                                                {...register('city')}
                                                                                placeholder="City" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row className='my-3 d-flex align-items-center'>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">

                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Zip Code :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control type="text"
                                                                                {...register('zipCode')}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">

                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Use this location for :</Form.Label></Col>
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

                                                        <Row>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Email ID :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control type="text"
                                                                                {...register('emailId'
                                                                                )}
                                                                                placeholder="Email ID" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Phone{starRequired} :
                                                                        </Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <InputGroup>
                                                                                <DropdownButton onSelect={(e) => { setPhoneCode(e) }}
                                                                                    variant="outline-secondary"
                                                                                    title=<i class="bi bi-flag me-2">{phoneCode}</i>>
                                                                                    <Dropdown.Item eventKey="+62" >+62</Dropdown.Item>
                                                                                    <Dropdown.Item eventKey="+52" >+52</Dropdown.Item>
                                                                                    <Dropdown.Item eventKey="+82" >+82</Dropdown.Item>
                                                                                    <Dropdown.Item eventKey="+92" >+92</Dropdown.Item>
                                                                                </DropdownButton>
                                                                                <Form.Control
                                                                                    type="number"
                                                                                    aria-label=" input with dropdown button"
                                                                                    {...register('mobile', {
                                                                                        required: true,
                                                                                        pattern: {
                                                                                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                                                                            message: "only numbers are allowed"
                                                                                        },
                                                                                        maxLength: 10,
                                                                                        minLength: 10

                                                                                    })}

                                                                                    placeholder="Mobile"
                                                                                    isInvalid={errors.mobile}
                                                                                />
                                                                            </InputGroup>
                                                                            {errors.mobile?.type === "minLength" && <span className="text-danger">
                                                                                mnm 10 digits are allowed
                                                                            </span>
                                                                            }
                                                                            {errors.mobile?.type === "maxLength" && <span className="text-danger">
                                                                                mxm 10 digits are allowed
                                                                            </span>
                                                                            }
                                                                            {errors.mobile?.type === "required" && <span className="text-danger">
                                                                                This field is required
                                                                            </span>}
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row className='my-3 d-flex align-items-center'>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Tax Id :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                {...register('taxId')}
                                                                                type="text" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Tax Exempt :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Check type="checkbox"
                                                                                {...register('taxExempt')}
                                                                                id="default-checkbox" label="" />

                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row className='my-3' >
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Discount /Charges :</Form.Label></Col>
                                                                        <Col lg={12}>
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
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Promo / Coupon :</Form.Label></Col>
                                                                        <Col lg={12}>
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
                                                                            </Container>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row className='my-3'>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">

                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Store Name{starRequired} :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Group className="" >
                                                                                <Form.Select
                                                                                    {...register('storeName', { required: true })}
                                                                                    isInvalid={errors.storeName} enabled>
                                                                                    {storeListData?.map((item) => {
                                                                                        return (
                                                                                            <>
                                                                                                <option hidden value=''>--None--</option>
                                                                                                <option value={item.store_id}> {item.store_name}</option>
                                                                                            </>
                                                                                        )
                                                                                    })}
                                                                                </Form.Select>
                                                                                {errors.storeName && <span className='text-danger'>Please select one Store name </span>}

                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">

                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Price List:</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Group className="" >
                                                                                <Form.Select id="disabledSelect"
                                                                                    {...register('priceList')}
                                                                                    aria-label="Default select example">
                                                                                    {priceListData?.map((itemb) => {
                                                                                        return (
                                                                                            <>
                                                                                                <option hidden value=''>--Select--</option>
                                                                                                <option value={itemb.id}> {itemb.price_list_name}</option>
                                                                                            </>
                                                                                        )
                                                                                    })}                                                                            </Form.Select>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row className='my-3'>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">

                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Choose Package :</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Group className="" >
                                                                                <Form.Select id="disabledSelect"
                                                                                    {...register('choosePackage')}
                                                                                    aria-label="Default select example">
                                                                                    {laundryPackagesListData?.map((itemd) => {
                                                                                        return (
                                                                                            <>
                                                                                                <option hidden value=''>--None--</option>
                                                                                                <option value={itemd.pkg_id}> {itemd.package_name} [ {itemd.pkg_unit}/{itemd.usage_limit} Rs.{itemd.amount} ] </option>
                                                                                            </>
                                                                                        )
                                                                                    })}                                                                            </Form.Select>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className='d-flex align-items-center'>
                                                                        <Col lg={12}><Form.Label>Preferences:</Form.Label></Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                {...register('preferences')}
                                                                                type="text" placeholder="Preferences" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='text-end  py-3'>
                                                                <Button type="submit" className='btn-lg btn-success'>Save</Button>
                                                                <Button type="reset" className='btn-lg btn-light ms-3' onClick={handleReset}>Reset</Button>
                                                            </Col>

                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        }
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddCustomer