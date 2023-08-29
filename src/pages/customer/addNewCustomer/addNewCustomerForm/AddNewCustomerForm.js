import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HyperDatepicker from '../../../../components/Datepicker';
import MainLoader from '../../../../components/MainLoader';
import { discountChargesList, laundryPackagesList, priceList, promoCouponList, storeList } from '../../../../redux/actions';
import { customerCreate } from '../../../../redux/customer/customerList/action';
import './AddNewCustomerForm.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastHandle from '../../../../helpers/toastMessage';



const AddNewCustomerForm = () => {
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
    const addNewCustomerLoader = store?.CustomerCreate


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [showLimit, setShowLimit] = useState(10)
    const [discountCharges, setDiscountCharges] = useState([])
    const [promoCoupons, setPromoCoupons] = useState([])
    const [phoneCode, setPhoneCode] = useState("+91")
    const navigate = useNavigate()
    const starRequired = (<span className='text-danger'>*</span>)

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

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
            mobile: data.phone,
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
            navigate("/customer/customerlist")
        } else if (customerCreateStatus === false) {
            ToastHandle('error', customerCreateMessage);
        }
    }, [customerCreateStatus]);


    return (
        <>
            <Row>
                <Col>
                    <h4> Add New Customer</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <ToastContainer />
                        </Col>
                    </Row>
                    <Card>
                        <Card.Body>
                            {addNewCustomerLoader?.loading ? <MainLoader /> :
                                <Form noValidate
                                    onSubmit={handleSubmit(
                                        (data) => {
                                            console.log(data, "ss")
                                            handleCreate(data)
                                        },
                                        (err) => {
                                            console.log(err);
                                        }
                                    )}>
                                    <Row className="p-1 py-0">
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
                                                                    First Name{starRequired} :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="jeffin"
                                                                    {...register('firstName', { required: true, pattern: /^[a-zA-Z]+$/ })}
                                                                    isInvalid={errors.firstName}
                                                                />
                                                                {errors.firstName && <span className='text-danger'>Alphabets allowed only</span>}
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
                                                    <Form.Group controlId="ne_addressaptno">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>
                                                                    Address/Apt no. :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Control
                                                                    type="text"
                                                                    {...register('addressAptNo')}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
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
                                                                    enable
                                                                    {...register('city')}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_zipcode">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>Zip Code :</Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Control
                                                                    type="number"
                                                                    enable
                                                                    {...register('zipCode')}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_joindate">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>Use this location for :</Form.Label>
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
                                            <Row className="my-3">
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_emailid">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label className='truncate'>
                                                                    Email ID :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Kochi"
                                                                // isValid={false}
                                                                // {...register('emailId', {
                                                                //     required: 'Email is required',
                                                                //     pattern: {
                                                                //         value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                //         message: 'Please enter a valid email',
                                                                //     },
                                                                // })}
                                                                // isInvalid={errors.emailId}
                                                                />
                                                                {/* {errors.emailId && <span className='text-danger'>Please enter a valid email</span>} */}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_phone">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>Phone{starRequired} :
                                                                </Form.Label>
                                                            </Col>

                                                            <Col lg={8}>
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
                                                                        {...register('phone', {
                                                                            required: true,
                                                                            pattern: {
                                                                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                                                                message: "only numbers are allowed"
                                                                            },
                                                                            maxLength: 10,
                                                                            minLength: 10

                                                                        })}
                                                                        placeholder="Mobile"
                                                                        isInvalid={errors.phone}
                                                                    />
                                                                </InputGroup>
                                                                {errors.phone?.type === "minLength" && <span className="text-danger">
                                                                    min 10 digits are allowed
                                                                </span>
                                                                }
                                                                {errors.phone?.type === "maxLength" && <span className="text-danger">
                                                                    max 10 digits are allowed
                                                                </span>
                                                                }
                                                                {errors.phone?.type === "required" && <span className="text-danger">
                                                                    numbers allowed only                                                                </span>}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="my-3">
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_textid">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>
                                                                    Tax Id :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="tax id"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_textexempt">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>
                                                                    Tax Exempt :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Check type="checkbox"
                                                                    id="default-checkbox" label="" />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_discountcharges">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>Discount /Charges: </Form.Label>
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
                                                    <Form.Group controlId="ne_promocoupon">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>Promo / Coupon :</Form.Label>
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
                                                                </Container>

                                                            </Col>

                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_storename">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>
                                                                    Store Name{starRequired} :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
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
                                                                {errors.storeName && <span className='text-danger'>Please Select one Store Name</span>}
                                                            </Col>

                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_pricelist">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>
                                                                    Price List :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Select {...register('priceList')}
                                                                    enabled>
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
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_choosepackage">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>
                                                                    Choose Package :
                                                                </Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Select {...register('choosePackage')}
                                                                >
                                                                    {laundryPackagesListData?.map((itemd) => {
                                                                        return (
                                                                            <>
                                                                                <option hidden value=''>--None--</option>
                                                                                <option value={itemd.pkg_id}> {itemd.package_name} [ {itemd.pkg_unit}/{itemd.usage_limit} Rs.{itemd.amount} ] </option>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </Form.Select>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group controlId="ne_preferences">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={4}>
                                                                <Form.Label>Preferences :</Form.Label>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder='Preferences'
                                                                    {...register('preferences')}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} className="mx-auto d-flex justify-content-between  mt-4">
                                                    <Col className="text-center ">
                                                        <Button type="submit" className="btn-lg btn-success">
                                                            Save
                                                        </Button>
                                                        <Button type="submit" className="btn-lg btn-secondary ms-5">
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

                </Col>
            </Row >
        </>)
}

export default AddNewCustomerForm