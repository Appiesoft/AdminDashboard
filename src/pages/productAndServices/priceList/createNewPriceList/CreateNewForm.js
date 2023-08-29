import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { priceCreate, priceList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import AddItemForm from '../model/addItem/AddItemForm';

const CreateForm = ({ TableShowBtn }) => {

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        dispatch(priceCreate(data))
        setTimeout(() => {

            dispatch(priceList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ))
        },
            1000);
        TableShowBtn()
    };

    const starRequired = (<span className='text-danger'>*</span>)

    const btnChild = () => {
        TableShowBtn()
    }

    //model
    const [parentAddItemForm, setParentAddItemForm] = useState('')

    const openModalAddItemForm = (fill) => {
        setParentAddItemForm(fill)
    };

    const childEmptyAddItemForm = (empty) => {
        setParentAddItemForm(empty)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={() => openModalAddItemForm('lg')} >
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i class="bi bi-plus me-1 text-dark" />
                                    </h3>
                                    <div>Add Item</div>
                                </div>
                            </Button>
                            <AddItemForm parentAddItemForm={parentAddItemForm} childEmptyAddItemForm={childEmptyAddItemForm} />
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnChild} >
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Prices List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>

                    <Form
                        noValidate
                        onSubmit={
                            handleSubmit((data) => {
                                onSubmit(data)
                            }, (err) => {
                                console.log(err)
                            })
                        }
                        className='px-3'>
                        <Row className='p-3 mt-3 border'>
                            <Col lg={12}>
                                <Row className='my-3'>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Price list name{starRequired} :
                                                </Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('price_list_name', {
                                                            required: true,
                                                            pattern: /^[a-zA-Z]+$/,
                                                        })}
                                                        isInvalid={errors.price_list_name}
                                                        type="text"
                                                    />
                                                    {errors.price_list_name && <span className='text-danger'>Alphabets allowed only</span>}

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <h4>Advanced settings</h4>
                                    </Col>
                                </Row>
                                <Row className='my-3' >
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Price List :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group
                                                        className=""
                                                        placeholder="Member Group">
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                            {...register('show_hide_on_website'
                                                            )}
                                                        >
                                                            <option hidden value=''>
                                                                -Select-
                                                            </option>
                                                            <option value="show">Show</option>
                                                            <option value="hide">Hide</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Price of price list :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group
                                                    >
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                        >
                                                            <option hidden value=''>
                                                                -Select-
                                                            </option>
                                                            <option value="Increase">Increase current in percentage</option>
                                                            <option value="Decrease">Decrease current in percentage</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center  py-3'>
                                        <Button type="submit" className='btn btn-success'>Save</Button>
                                        <Button type="reset" className='btn btn-light ms-3'>Reset</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default CreateForm