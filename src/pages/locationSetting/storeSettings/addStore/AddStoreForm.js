import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';
import './AddStoreForm.css';
import { useDispatch, useSelector } from 'react-redux';
import HyperDatepicker from '../../../../components/Datepicker';
import { priceList } from '../../../../redux/actions';
import { storeCreate } from '../../../../redux/locationStore/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';

const AddStoreForm = ({ showBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const priceListData = store.PriceList?.priceList?.data
    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [showLimit, setShowLimit] = useState(10)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const storeCreateStatus = store?.StoreCreate?.status
    const storeCreateMessage = store?.StoreCreate?.message
    const storeCreateLoader = store?.StoreCreate;

    const starRequired = (<span className='text-danger'>*</span>)


    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };
    //component show
    const btnTransfer = () => {
        showBtn();
    };

    // Form Data Get
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const createStoreData = (data) => {
        dispatch(storeCreate({
            storeName: data.storeName,
            shortName: data.shortName,
            mobile: data.storeMobile,
            emailId: data.storeEmail,
            password: data.storePassword,
            status: data.status,
            address1: data.addressAptNo,
            address2: data.address2,
            city: data.storeCity,
            state: data.storeState,
            zipcode: data.pinCode,
            landline: data.storeMobileLandline,
            storeTaxNo: data.texId,
            isMainStore: "yes",
            defaultPriceListId: data.defaultPriceList
        }))
    }

    useEffect(() => {
        dispatch(priceList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ));
    }, [])

    // start toast
    useEffect(() => {
        if (storeCreateStatus) {
            ToastHandle('success', storeCreateMessage);
            showBtn()

        } else if (storeCreateStatus === false) {
            ToastHandle('error', storeCreateMessage);
        }
    }, [storeCreateStatus])
    // end toast

    return (
        <>
            <Card>
                <Card.Body>
                    <Row className="mb-2 d-flex align-items-center">
                        <Col xl={12}>
                            <div className="text-lg-end mt-xl-0 mt-2">
                                <Button
                                    variant="white"
                                    className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                    onClick={btnTransfer}>
                                    <div className="d-flex align-items-center ">
                                        <h4>
                                            <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                        </h4>
                                        <div>Store List</div>
                                    </div>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    {storeCreateLoader?.loading ? (
                        <MainLoader />
                    ) : <Form noValidate onSubmit={

                        handleSubmit((data) => {
                            createStoreData(data)
                        }, (err) => {
                            console.log(err)
                        })
                    }>
                        <Row className="p-3 py-0">
                            <Col lg={12}>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storeid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Store ID :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeid')}
                                                        isInvalid={errors.storeid}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_createdate">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Create Date :</Form.Label>
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

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storename">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Name{starRequired} :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control

                                                        type="text"
                                                        {...register('storeName', { required: true, pattern: /^[a-zA-Z]+$/ })}
                                                        placeholder="maximum 15 characters"
                                                        isInvalid={errors.storeName}
                                                    />
                                                    {errors.storeName && <span className='text-danger'>Alphabets allowed only</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_shortname">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Short Name :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('shortName')}
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
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Address/Apt no{starRequired} :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('addressAptNo', {
                                                            required: true,
                                                            minLength: 10,
                                                            maxLength: 40,
                                                        })}
                                                        isInvalid={errors.addressAptNo}
                                                    />
                                                    {errors.addressAptNo && <span className='text-danger'>Please enter a complete address (minLength: 10)</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_address2">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Address2 :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('address2')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storecity">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store City{starRequired} :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeCity', {
                                                            required: true,
                                                            pattern: /^[a-zA-Z]+$/
                                                        })}
                                                        isInvalid={errors.storeCity}
                                                    />
                                                    {errors.storeCity && <span className='text-danger'>Alphabets allowed only</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storestate">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store State{starRequired} :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeState', {
                                                            required: true,
                                                            pattern: /^[a-zA-Z]+$/
                                                        })}
                                                        isInvalid={errors.storeState}
                                                    />
                                                    {errors.storeState && <span className='text-danger'>Alphabets allowed only</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_zipcode">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Zip Code{starRequired} :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        {...register('zipCode', { required: true, pattern: /^[0-9+-]+$/, minLength: 6, maxLength: 6 })}
                                                        isInvalid={errors.zipCode}
                                                    />

                                                    {errors.zipCode?.type === "minLength" && <span className="text-danger">
                                                        minimum 6 digits are allowed
                                                    </span>
                                                    }
                                                    {errors.zipCode?.type === "maxLength" && <span className="text-danger">
                                                        maximum 6 digits are allowed
                                                    </span>
                                                    }
                                                    {errors.zipCode?.type === "required" && <span className="text-danger">
                                                        This field is required
                                                    </span>}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_country">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Country :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('country')}
                                                        value="United States of America"
                                                        disabled

                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storemobile">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Mobile{starRequired} :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>

                                                    <Form.Control
                                                        type="number"
                                                        aria-label=" input with dropdown button"
                                                        {...register('storeMobile', {
                                                            required: true,
                                                            pattern: {
                                                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                                                message: "only numbers are allowed"
                                                            },
                                                            maxLength: 10,
                                                            minLength: 10

                                                        })}

                                                        placeholder="Mobile"
                                                        isInvalid={errors.storeMobile}
                                                    />
                                                    {errors.storeMobile?.type === "minLength" && <span className="text-danger">
                                                        minimum 10 digits are allowed
                                                    </span>
                                                    }
                                                    {errors.storeMobile?.type === "maxLength" && <span className="text-danger">
                                                        maximum 10 digits are allowed
                                                    </span>
                                                    }
                                                    {errors.storeMobile?.type === "required" && <span className="text-danger">
                                                        This field is required
                                                    </span>}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storemobilelandline">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Store Landline :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeMobileLandline')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_storeemail">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Store Email{starRequired} :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storeEmail',
                                                            {
                                                                required: 'Email is required',
                                                                pattern: {
                                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                    message: 'Please enter a valid email',
                                                                },
                                                            }
                                                        )}
                                                        placeholder="Email ID"
                                                        isInvalid={errors.storeEmail}
                                                    />
                                                    {errors.storeEmail && <span className='text-danger'>Please enter a valid email</span>}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_texid">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        GSTIN :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('texId')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_status">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Show/Hide :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" >
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            {...register('status')}
                                                            required
                                                            aria-label="Default select example"
                                                            placeholder="Show"
                                                        >
                                                            <option hidden value="">Select</option>
                                                            <option value="show">Show</option>
                                                            <option value="hide">Hide</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="storepassword">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Store Password{starRequired} :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('storePassword', { required: true })}
                                                        isInvalid={errors.storePassword}
                                                    />
                                                    {errors.storePassword && <span className='text-danger'>Please enter the password</span>}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_pincode">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Zip Code :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('pinCode')}
                                                        placeholder="ZipCode"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_description">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>
                                                        Description :
                                                    </Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('description')}
                                                        placeholder="description"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_password">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Assign Vendor :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Assign"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_uploadstorelogo">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Upload store logo :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        required
                                                        type="file"
                                                        {...register('storeLogo')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="assignpricelist ">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <label>Default Retail Price List :</label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select
                                                        >
                                                            <option hidden value=''>--Select--</option>
                                                            <option value='a'>A</option>
                                                            <option value='b'>B</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="ne_defaultpricelist">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <Form.Label>Default Price List{starRequired} :</Form.Label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="" >
                                                        <Form.Select {...register('defaultPriceList', { required: true })}
                                                            isInvalid={errors.defaultPriceList} enabled>
                                                            <option hidden value=''>--Select--</option>

                                                            {priceListData?.map((itemb) => {
                                                                return (
                                                                    <>
                                                                        <option value={itemb.id}> {itemb.price_list_name}</option>
                                                                    </>
                                                                )
                                                            })}

                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row className="my-3">
                                    <Col lg={6}>
                                        <Form.Group controlId="assignpricelist ">
                                            <Row className="d-flex align-items-center">
                                                <Col lg={3}>
                                                    <label>Assign Price List{starRequired} :</label>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group className="">
                                                        <Form.Check
                                                            required
                                                            {...register('assignPrice', { required: true })}
                                                            isInvalid={errors.assignPrice}
                                                            label="The Wash House Pricelist"
                                                            feedback="You must agree before submitting."
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center  py-3">
                                        <Button type="submit" className="btn btn-success">
                                            Save
                                        </Button>
                                        <Button type="reset" className="btn btn-danger ms-3">
                                            Reset
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>}
                </Card.Body>
            </Card>

        </>
    )
}

export default AddStoreForm