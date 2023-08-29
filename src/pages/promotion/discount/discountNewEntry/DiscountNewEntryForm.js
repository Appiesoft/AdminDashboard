import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { costomerList, discountChargesCreate } from '../../../../redux/actions';
import Select from 'react-select'
import MainLoader from '../../../../components/MainLoader';
import ToastHandle from '../../../../helpers/toastMessage';



const DiscountNewEntryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const customerListApidata = store?.CostomerList?.costomerList?.data
    const discountChargesStatus = store?.DiscountChargesCreate?.data?.status
    const discountChargesMessage = store?.DiscountChargesCreate?.data?.message
    const discountChargesLorder = store?.DiscountChargesCreate;

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [recurringPickupSelect, setRecurringPickupSelect] = useState(null)
    const [customerAllData, setCustomerAllData] = useState([])
    const [selectedDropdwonCustomer, setSelectedDropdwonCustomer] = useState([])
    const selectedCustomerId = selectedDropdwonCustomer?.map((ind) => ind.id)

    const btnChild = () => {
        TableShowBtn()
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

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

    const submitData = (data) => {
        dispatch(
            discountChargesCreate(
                {
                    applicationApply: data.recurringPickup,
                    customerId: selectedCustomerId,
                    discountChargeName: data.discountChargeName,
                    transactionType: data.transactionType,
                    inTransaction: data.inTransaction,
                    transactionValue: data.transactionValue,
                    defaults: data.default,
                    description: data.description
                }
            )
        );
    };


    //start error and success model 
    useEffect(() => {
        if (discountChargesStatus) {
            ToastHandle('success', discountChargesMessage);
            TableShowBtn()

        } else if (discountChargesStatus === false) {
            ToastHandle('error', discountChargesMessage);
        }
    }, [discountChargesStatus]);

    // end error and success model 

    useEffect(() => {
        if (customerListApidata) {
            setCustomerAllData(customerListApidata.map((itmdx, indx) => ({ ...itmdx, value: itmdx.id, label: `${itmdx.first_name} ${itmdx.last_name} - ${itmdx.mobile}` })))
        }
    }, [customerListApidata])

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
                                                        <div>Discount Charges</div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        {discountChargesLorder?.loading ? <MainLoader />
                            :
                            <Form
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
                                                                Charge ID:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="" >
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder='3'
                                                                    disabled
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
                                                                Recurring Pickup:
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
                                                                    <Select options={customerAllData} isMulti onChange={(e) => {
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
                                                        <Col lg={3}>
                                                            <Form.Label className=''>
                                                                Discount/Charge Name
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                Transaction Type :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className=""
                                                            >
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
                                        </Row>
                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center ">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                In Transaction :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className='mt-1'>
                                                                Transaction Value <span className="text-danger">*</span>:
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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
                                        </Row>
                                        <Row className="my-3">
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center mt-1">
                                                        <Col lg={3}>
                                                            <Form.Label>
                                                                Default (Y/N) :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
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
                                            <Col lg={6}>
                                                <Form.Group >
                                                    <Row className="d-flex align-items-center">
                                                        <Col lg={3}>
                                                            <Form.Label className=" mt-2">
                                                                Description :
                                                            </Form.Label>
                                                        </Col>
                                                        <Col lg={9}>
                                                            <Form.Group className="" >
                                                                <textarea
                                                                    {...register('description', { required: true })}
                                                                    isInvalid={errors.description}
                                                                    className='w-100 form-control '
                                                                    type="text"
                                                                    placeholder='description'
                                                                />
                                                                {errors.description && <span className='text-danger'>Please enter description </span>}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} className="text-center  mt-4">
                                                <Button type="submit" className="btn btn-success">Save</Button>
                                                <Button type="reset" className="btn btn-primary ms-3">Reset</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        }
                    </Card.Body>
                </Card>
            </Col >


        </Row >

    )
}

export default DiscountNewEntryForm