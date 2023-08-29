import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { upchargesCreate, upchargesList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';

const NewEnteryForm = ({ TableShowBtn }) => {

    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const upChargesCreateStatus = store?.UpchargesCreate?.status
    const upChargesCreateMessage = store?.UpchargesCreate?.message
    const upChargesCreateLorder = store?.UpchargesCreate?.loading


    console.log(store)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const handleReset = (e) => {
        reset({
            name: "",
            unit: "",
            price: ""
        })
    }
    const onSubmit = async (data) => {
        dispatch(upchargesCreate(data))

    };

    const btnChild = () => {
        TableShowBtn()
    }


    //start toast handle
    useEffect(() => {
        if (upChargesCreateStatus === true) {
            ToastHandle('success', upChargesCreateMessage);
            dispatch(upchargesList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ))
            TableShowBtn()

        } else if (upChargesCreateStatus === false) {
            ToastHandle('error', upChargesCreateMessage);
        }
    }, [upChargesCreateStatus]);
    //end toast handle


    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-start'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white ms-2" onClick={btnChild} >
                                <div className='d-flex align-items-center'>
                                    <div className="d-flex align-items-center">
                                        <h3>
                                            <i class="bi bi-plus me-1 text-dark" />
                                        </h3>
                                        <div>UpCharges List</div>
                                    </div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {upChargesCreateLorder ? <MainLoader /> : <Form
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
                            <Col lg={6} className='mx-auto'>
                                <Row className='my-3'>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control {...register('name')}
                                                        type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} className='my-3'>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Price Unit :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select {...register('unit')}
                                                            id="disabledSelect" aria-label="Default select example" >
                                                            <option hidden value=''>--Select Package--</option>
                                                            <option value="Qty/Lbs">Qty/Lbs</option>
                                                            <option value="Lbs">Lbs</option>
                                                            <option value="Sq.Ft">Sq.Ft</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Price (USD) :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('price')}
                                                        type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className='text-center  py-3'>
                                        <Button type="submit" className='btn btn-success'>Save</Button>
                                        <Button type="reset" className='btn btn-light ms-3' onClick={handleReset}>Reset</Button>

                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Form>}


                </Card.Body>
            </Card>
        </>)
}

export default NewEnteryForm