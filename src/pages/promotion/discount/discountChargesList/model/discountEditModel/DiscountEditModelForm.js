import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { costomerList, discountChargesDetail, discountChargesList, discountChargesUpdate } from '../../../../../../redux/actions';
import Select from 'react-select'
import MainLoader from '../../../../../../components/MainLoader';
import ToastHandle from '../../../../../../helpers/toastMessage';

const DiscountEditModelForm = ({ parentDiscountEdit, childEmptyDiscountEdit }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const discountChargesDetailData = store?.DiscountChargesDetail?.discountChargesDetail?.data?.data
    const discountChargesDetailLoader = store?.DiscountChargesDetail
    const customerListApidata = store?.CostomerList?.costomerList?.data
    const DiscountChargesUpdateStatus = store?.DiscountChargesUpdate?.data?.status
    const DiscountChargesUpdateMessage = store?.DiscountChargesUpdate?.data?.message
    const DiscountChargesUpdateLoader = store?.DiscountChargesUpdate

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [recurringPickupSelect, setRecurringPickupSelect] = useState(null)
    const [customerAllData, setCustomerAllData] = useState([])
    const [selectedDropdwonCustomer, setSelectedDropdwonCustomer] = useState([])
    const selectedCustomerId = selectedDropdwonCustomer?.map((ind) => ind.id)

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyDiscountEdit('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    // end model

    useEffect(() => {
        if (parentDiscountEdit == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentDiscountEdit]);


    const { register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()


    const resetForm = () => {
        const data = discountChargesDetailData
        reset({
            discountId: data?.discount_charge_id,
            recurringPickup: data?.application_apply,
            customer: data?.customer_id,
            discountChargeName: data?.discount_charge_name,
            transactionType: data?.transaction_type,
            inTransaction: data?.in_transaction,
            transactionValue: data?.transaction_value,
            default: data?.default,
            description: data?.description

        })
    }


    useEffect(() => {
        resetForm()
    }, [discountChargesDetailData])

    useEffect(() => {
        dispatch(
            costomerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
            })
        );
    }, [])

    useEffect(() => {
        if (customerListApidata) {
            setCustomerAllData(customerListApidata.map((itmdx, indx) => ({ ...itmdx, value: itmdx.id, label: `${itmdx.first_name} ${itmdx.last_name} - ${itmdx.mobile}` })))
        }
    }, [customerListApidata])


    useEffect(() => {
        if (DiscountChargesUpdateStatus) {
            ToastHandle('success', DiscountChargesUpdateMessage);
            toggle()
            dispatch(
                discountChargesList({
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit
                })
            );
        } else if (DiscountChargesUpdateStatus === false) {
            ToastHandle('error', DiscountChargesUpdateMessage);
        }
    }, [DiscountChargesUpdateStatus]);


    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Row>
                    <Col>
                        {DiscountChargesUpdateLoader?.loading ? <MainLoader /> :

                            <Form
                                noValidate
                                onSubmit={handleSubmit(
                                    (data) => {
                                        dispatch(discountChargesUpdate({
                                            discountChargeId: data?.discountId,
                                            applicationApply: data?.recurringPickup,
                                            customerId: selectedCustomerId,
                                            discountChargeName: data?.discountChargeName,
                                            transactionType: data?.transactionType,
                                            inTransaction: data?.inTransaction,
                                            transactionValue: data?.transactionValue,
                                            defaults: data?.default,
                                            description: data?.description
                                        }))
                                    },
                                    (err) => {
                                        console.log(err);
                                    }
                                )}>
                                <Row >
                                    <Col xs={12}>
                                        <Card>
                                            <Card.Body>
                                                {discountChargesDetailLoader?.loading ? <MainLoader /> :

                                                    <Row className='p-3'>
                                                        <Col xs={12} >
                                                            <Row >
                                                                <Col lg={6}>
                                                                    <Form.Group >
                                                                        <Row className="d-flex align-items-center">
                                                                            <Col lg={12}>
                                                                                <Form.Label className=''>
                                                                                    Charge ID :
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="" >
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        placeholder='2'
                                                                                        {...register('discountId')}
                                                                                    />
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
                                                                                    Application Apply:
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={4} className='d-flex justify-content-between'>
                                                                                <Form>
                                                                                    <div className='d-flex'>
                                                                                        <div>
                                                                                            <Form.Check type='radio'
                                                                                                {...register('recurringPickup', { required: true })}
                                                                                                isInvalid={errors.recurringPickup}
                                                                                                label="All User" value='ALL_USERS'
                                                                                                onChange={(e) => {
                                                                                                    setRecurringPickupSelect(e.target.value)
                                                                                                }}
                                                                                            />

                                                                                        </div>
                                                                                        <div className='ms-4'>
                                                                                            <Form.Check type='radio'
                                                                                                {...register('recurringPickup', { required: true })}
                                                                                                isInvalid={errors.recurringPickup}
                                                                                                label="Specific User" value='SPECIFIC_USER'
                                                                                                onChange={(e) => {
                                                                                                    setRecurringPickupSelect(e.target.value)
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    {errors.recurringPickup && <span className='text-danger'> Please choose any recurring pickup  </span>}
                                                                                </Form>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            {recurringPickupSelect && recurringPickupSelect === "SPECIFIC_USER" ?
                                                                <Row className="my-3">
                                                                    <Col lg={6}>
                                                                    </Col>
                                                                    <Col lg={6}>
                                                                        <Form.Group >
                                                                            <Row className="d-flex align-items-center">
                                                                                <Col lg={3}>
                                                                                    <Form.Label className='mt-1'>
                                                                                        Customers <span className="text-danger">*</span>:
                                                                                    </Form.Label>
                                                                                </Col>
                                                                                <Col lg={9}>
                                                                                    <Form.Group className="" >
                                                                                        <Select  {...register('customer', { required: true })} options={customerAllData} isMulti onChange={(e) => {
                                                                                            setSelectedDropdwonCustomer(e)
                                                                                        }} />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            </Row>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                : ""
                                                            }
                                                            <Row className="my-3">
                                                                <Col lg={6}>
                                                                    <Form.Group >
                                                                        <Row className="d-flex align-items-center">
                                                                            <Col lg={12}>
                                                                                <Form.Label className=''>
                                                                                    Customer:
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="" >
                                                                                    <Form.Select disabled>

                                                                                    </Form.Select>
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
                                                                                    Discount/Charge Name <span className="text-danger">*</span>:
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="" >
                                                                                    <Form.Control
                                                                                        {...register('discountChargeName', {
                                                                                            required: true

                                                                                        })}
                                                                                        isInvalid={errors.discountChargeName}
                                                                                    />
                                                                                    {errors.discountChargeName && <span className='text-danger'>Please enter discount charge name </span>}

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
                                                                                <Form.Label className='mt-1'>
                                                                                    Transaction Type :
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="" >
                                                                                    <Form.Select
                                                                                        {...register('transactionType', { required: true })}
                                                                                        isInvalid={errors.transactionType}>
                                                                                        <option hidden>select </option>
                                                                                        <option value="PERCENTAGE">Percentage (%) </option>
                                                                                        <option value="AMOUNT"> Ammount (USD)</option>
                                                                                    </Form.Select>
                                                                                    {errors.transactionType && <span className='text-danger'>Please select one transaction type </span>}
                                                                                </Form.Group>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Form.Group >
                                                                        <Row className="d-flex align-items-center">
                                                                            <Col lg={12}>
                                                                                <Form.Label className='mt-1'>
                                                                                    In Transaction  :
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="" >
                                                                                    <Form.Select
                                                                                        {...register('inTransaction', { required: true })}
                                                                                        isInvalid={errors.inTransaction}>
                                                                                        <option hidden>select </option>
                                                                                        <option value="ADD_AMOUNT">Add Ammount </option>
                                                                                        <option value="MINUS_AMOUNT"> Minus Ammount</option>
                                                                                    </Form.Select>
                                                                                    {errors.inTransaction && <span className='text-danger'>Please select one transaction </span>}
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
                                                                                <Form.Label className=" mt-1">
                                                                                    Transaction Value <span className="text-danger">*</span>:
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="mt-1" >
                                                                                    <Form.Control
                                                                                        {...register('transactionValue', { required: true, pattern: /^[0-9+-]+$/ })}
                                                                                        isInvalid={errors.transactionValue}
                                                                                        type="text"
                                                                                    />
                                                                                    {errors.transactionValue && <span className='text-danger'>Please enter transaction value</span>}
                                                                                </Form.Group>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Form.Group >
                                                                        <Row className="d-flex align-items-center mt-2">
                                                                            <Col lg={12}>
                                                                                <Form.Label className=''>
                                                                                    Default (Y/N) :
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="" >
                                                                                    <Form.Select
                                                                                        {...register('default', { required: true })}
                                                                                        isInvalid={errors.default}
                                                                                    >
                                                                                        <option hidden value="">select</option>
                                                                                        <option value="YES">Yes</option>
                                                                                        <option value="NO">No</option>
                                                                                    </Form.Select>
                                                                                    {errors.default && <span className='text-danger'>Please select one </span>}

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
                                                                                <Form.Label className=" ">
                                                                                    Description :
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={12}>
                                                                                <Form.Group className="" >
                                                                                    <textarea
                                                                                        {...register('description')}
                                                                                        className='w-100 form-control '
                                                                                        type="text"
                                                                                        placeholder='description'
                                                                                    />
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
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Form>
                        }
                    </Col>
                </Row>
            </Modal>
        </>

    )
}

export default DiscountEditModelForm