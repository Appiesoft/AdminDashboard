import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { itemCreate, itemList } from '../../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';


const AddItemForm = ({ parentAddItemForm, childEmptyAddItemForm }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const categoryLists = store.ProductCategoryList.categoryList;
    const serviceCategoryLists = store.ServiceCategoryList.serviceCategoryList;
    const priceLists = store.PriceList.priceList;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [resetDataHandling, setResetDataHandling] = useState(null)
    const resetHandlingBtn = () => {
        setResetDataHandling(null)
    }

    const resetForm = () => {
        if (categoryLists?.employeeDetails !== null) {
            const data = categoryLists?.categoryLists?.data
            setResetDataHandling(data)
        }

    }

    const inputDataFill = () => {
        reset({
            priceListId: resetDataHandling?.data,
            serviceId: resetDataHandling?.data,
            categoryId: resetDataHandling?.data,
            clothId: resetDataHandling?.data,
            shortCode: resetDataHandling?.data,
            price: resetDataHandling?.data,
            minPrice: resetDataHandling?.data,
            piece: resetDataHandling?.data,
            unit: resetDataHandling?.data,
            active: resetDataHandling?.data,
            online: resetDataHandling?.data,
            priority: resetDataHandling?.data,
            tax: resetDataHandling?.data
        })
    }
    useEffect(() => {
        if (resetDataHandling !== null) {
            inputDataFill()
        }
    }, [resetDataHandling])


    const onSubmit = async (data) => {
        dispatch(itemCreate(data))
        setTimeout(() => {
            toggle();
        },
            1000);
    };

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const starRequired = (<span className='text-danger'>*</span>)


    const toggle = () => {
        setModal(!modal);
        childEmptyAddItemForm('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentAddItemForm == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentAddItemForm]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Add Item</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form noValidate
                                            onSubmit={
                                                handleSubmit((data) => {
                                                    onSubmit(data)

                                                }, (err) => {
                                                    console.log(err)
                                                })
                                            }
                                        >
                                            <Row className="">
                                                <Col lg={12}>
                                                    <Row className="">
                                                        <Col lg={10} className='mx-auto'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex  justify-content-evenly align-items-baseline">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Price ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} className='my-3'>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            value='18'
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>Price List{starRequired} :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Group
                                                                        >
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                aria-label="Default select example"
                                                                                placeholder="Member Group"
                                                                                {...register('priceListId', { required: true })}
                                                                                isInvalid={errors.priceListId}
                                                                            >
                                                                                <option hidden value=''>
                                                                                    Open this select menu
                                                                                </option>
                                                                                {priceLists?.data?.map((item, index) => {
                                                                                    return (
                                                                                        <option value={item.id}>{item.price_list_name}</option>
                                                                                    )
                                                                                })}
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                        {errors.priceListId && <span className='text-danger'>Please select one price List Id</span>}
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Service Name{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} className='my-3'>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            {...register('serviceId', { required: true })}
                                                                            isInvalid={errors.serviceId}
                                                                        >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            {serviceCategoryLists?.data?.map((item, index) => {
                                                                                return (
                                                                                    <option value={item.id}>{item.service_name1}</option>
                                                                                )
                                                                            })
                                                                            }
                                                                        </Form.Select>
                                                                        {errors.serviceId && <span className='text-danger'>Please select one Service name</span>}
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>Category Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            {...register('categoryId')}>
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            {
                                                                                categoryLists?.data?.map((item, index) => {
                                                                                    return (
                                                                                        <option value={item.cat_id}>{item.category_name}</option>

                                                                                    )
                                                                                })
                                                                            }
                                                                        </Form.Select>
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Product List{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} className='my-3'>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            {...register('clothId', { required: true })}
                                                                            isInvalid={errors.clothId}
                                                                        >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                        {errors.clothId && <span className='text-danger'>Please select one Product List</span>}
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>Short Code{starRequired} :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('shortCode', { required: true })}
                                                                            isInvalid={errors.shortCode}
                                                                            type="text"
                                                                        />

                                                                        {errors.shortCode && <span className='text-danger'>Please enter short code</span>}
                                                                    </Col>
                                                                    <Col lg={3} >
                                                                        <Form.Label>
                                                                            Price ($){starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} className='my-3'>
                                                                        <Form.Control
                                                                            {...register('price', { required: true })}
                                                                            isInvalid={errors.price}
                                                                            type="text"
                                                                        />

                                                                        {errors.price && <span className='text-danger'>Please select one price</span>}
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Min Price ($) :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('minPrice')}
                                                                            type="text"
                                                                        />

                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>Pieces :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} className='my-3'>
                                                                        <Form.Control
                                                                            {...register('piece',)}
                                                                            type="text"
                                                                        />

                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>Price Unit{starRequired} :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            {...register('unit', { required: true })}
                                                                            isInvalid={errors.unit} >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>
                                                                        </Form.Select>
                                                                        {errors.unit && <span className='text-danger'>Please select one price unit</span>}
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Active{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} className='my-3'>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            {...register('active', { required: true })}
                                                                            isInvalid={errors.active}
                                                                        >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="yes">yes</option>
                                                                            <option value="no">no</option>
                                                                        </Form.Select>
                                                                        {errors.active && <span className='text-danger'>Please select one active</span>}
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Online{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            {...register('online', { required: true })}
                                                                            isInvalid={errors.online}
                                                                        >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="yes">yes</option>
                                                                            <option value="no">no</option>
                                                                        </Form.Select>
                                                                        {errors.online && <span className='text-danger'>Please select one online</span>}
                                                                    </Col>
                                                                    <Col lg={3} className='my-3'>
                                                                        <Form.Label>
                                                                            Priority{starRequired} :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9} className='my-3'>
                                                                        <Form.Control
                                                                            {...register('priority', { required: true })}
                                                                            type="text"
                                                                            isInvalid={errors.priority}
                                                                        />
                                                                        {errors.priority && <span className='text-danger'>Please enter Priority</span>}
                                                                    </Col>
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Taxes :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Group >
                                                                            <Form.Check
                                                                                {...register('tax')}
                                                                                label=" TAX(10.00)%"
                                                                                feedback="You must agree before submitting."
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4} className="mx-auto d-flex mt-2">
                                                            <Col className="text-center ">
                                                                <Button type="submit" className="btn btn-success">
                                                                    Update
                                                                </Button>
                                                            </Col>
                                                            <Col className="text-center">
                                                                <Button type="reset" className="btn btn-secondary" onClick={() => resetHandlingBtn()}>
                                                                    Reset
                                                                </Button>
                                                            </Col>
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

export default AddItemForm