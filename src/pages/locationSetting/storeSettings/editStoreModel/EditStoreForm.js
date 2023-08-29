import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import { WorldVectorMap } from '../../../../../components/VectorMap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { storeUpdate } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';



const EditStoreForm = ({ parentEditStore, childEmptyEditStore }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeDetails = store.StoreDetails
    const storeEditStatus = store?.StoreUpdate?.status
    const storeEditMessage = store?.StoreUpdate?.message
    const starRequired = (<span className='text-danger'>*</span>)


    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyEditStore('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const resetForm = () => {
        if (storeDetails.storeDetails !== null) {
            const data = storeDetails.storeDetails
            reset({
                storeId: data.store_id,
                createDate: data.create_date,
                storeName: data.store_name,
                shortName: data.short_name,
                addressAptNo: data.address1,
                address2: data.address2,
                storeCity: data.city,
                storeState: data.state,
                zipCode: data.zipcode,
                storeMobile: data.phone,
                storeLandline: data.landline,
                storeEmail: data.email,
                texId: data.store_tax_no,
                pinCode: data.zipcode,
                isMainStore: "yes",
                defaultPriceListId: data.default_price_list

            })
        }
    }

    useEffect(() => {
        resetForm()
    }, [storeDetails])



    useEffect(() => {
        if (parentEditStore == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditStore]);

    // start toast
    useEffect(() => {
        if (storeEditStatus) {
            ToastHandle('success', storeEditMessage);
            toggle()
        } else if (storeEditStatus === false) {
            ToastHandle('error', storeEditMessage);
        }
    }, [storeEditStatus])
    // end toast
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form noValidate onSubmit={
                                            handleSubmit((data) => {
                                                dispatch(storeUpdate({
                                                    storeId: data.storeId,
                                                    storeName: data.storeName,
                                                    shortName: data.shortName,
                                                    mobile: data.storeMobile,
                                                    emailId: data.storeEmail,
                                                    password: data.storePassword,
                                                    status: "show",
                                                    address1: data.addressAptNo,
                                                    address2: data.address2,
                                                    city: data.storeCity,
                                                    state: data.storeCity,
                                                    zipcode: data.zipCode,
                                                    landline: data.storeLandline,
                                                    storeTaxNo: data.texId,
                                                    isMainStore: "yes",
                                                    defaultPriceListId: data.defaultPriceList
                                                }))
                                            }, (err) => {
                                                console.log(err)
                                            })
                                        }>
                                            <Row className="p-3 py-0 position-relative ">
                                                {storeDetails.loading && <Col lg={12} className='d-flex justify-content-center align-items-center loader_parent position-absolute top-0 bottom-0 end-0 start-0'>
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden text-center">Loading...</span>
                                                    </Spinner>
                                                </Col>}
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_storeid">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Store ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeId')}
                                                                            isValid={false}
                                                                            isInvalid={false}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_createdate">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Create Date :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="date"
                                                                            {...register('createDate')}
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Name{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeName', { required: true, pattern: /^[a-zA-Z]+$/ })}
                                                                            isInvalid={errors.storetName}
                                                                        />
                                                                        {errors.storetName && <span className='text-danger'>Alphabets allowed only</span>}
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_shortname">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Short Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                    <hr />


                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_addressaptno">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Address/Apt no{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Address2 :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store City{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeCity', {
                                                                                required: true,
                                                                                pattern: /^[a-zA-Z]+$/
                                                                            })}
                                                                            isInvalid={errors.storeCity}
                                                                        />
                                                                        {errors.storeCity && <span className='text-danger'>This field Alphabets required</span>}
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_storestate">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store State{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('storeState', {
                                                                                required: true,
                                                                                pattern: /^[a-zA-Z]+$/
                                                                            })}

                                                                            isInvalid={errors.storeState}
                                                                        />
                                                                        {errors.storeState && <span className='text-danger'>This field Alphabets required</span>}
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_zipcode">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Zip Code{starRequired} :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                            This field is numbers required
                                                                        </span>}
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_country">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Country :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                    <hr />
                                                    <Row className="my-3">
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_storemobile">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Mobile{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                            <Form.Group controlId="ne_storelandline">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Landline :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Store Email{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Tax Id :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Show/Hide</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" >
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                {...register('status')}
                                                                                required
                                                                                aria-label="Default select example"
                                                                                placeholder="Show"
                                                                                isInvalid={errors.status}
                                                                            >
                                                                                <option hidden value="">--Select--</option>
                                                                                <option value="show">Show</option>
                                                                                <option value="hide">Hide</option>
                                                                            </Form.Select>
                                                                            {errors.status && <span className='text-danger'>Please select the Status</span>}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="storepassword">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Store Password{starRequired} :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>Zip Code :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                                    <Col lg={12}>
                                                                        <Form.Label>
                                                                            Description :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                            <Form.Group controlId="ne_assignvender">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Assign Vendor :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_uploadstorelogo">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Upload store logo :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
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
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <label>Assign Price List :</label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="">
                                                                            <Form.Check
                                                                                required
                                                                                label="The Wash House Pricelist"
                                                                                feedback="You must agree before submitting."
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="ne_defaultpricelist">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={12}>
                                                                        <Form.Label>Default Price List{starRequired} :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" placeholder="Member Group">
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                {...register('defaultPriceList', { required: true })}
                                                                                required
                                                                                aria-label="Default select example"
                                                                                isInvalid={errors.defaultPriceList}
                                                                            >
                                                                                <option hidden value="1">-- select --</option>
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="text-center  py-3">
                                                            <Button type="submit" className="btn btn-success">
                                                                Update
                                                            </Button>
                                                            <Button type="reset" className="btn btn-danger ms-3">
                                                                Reset
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>

                            </>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>)
}

export default EditStoreForm