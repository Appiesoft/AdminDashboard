import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { laundryPackagesCreate, laundryPackagesList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';

const NewEnterLaundryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const serviceCategorylits = store.ServiceCategoryList.serviceCategoryList.data;
    const laundaryCreateStatus = store?.LaundryPackagesCreate?.status
    const laundaryCreateMessage = store?.LaundryPackagesCreate?.message
    const laundaryCreateLoarding = store?.LaundryPackagesCreate?.loading

    console.log()


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        dispatch(laundryPackagesCreate(data))
    };

    const btnShowHide = () => {
        TableShowBtn()
    }

    //start toast handle
    useEffect(() => {
        if (laundaryCreateStatus === true) {
            ToastHandle('success', laundaryCreateMessage);
            dispatch(laundryPackagesList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ))
            TableShowBtn()

        } else if (laundaryCreateStatus === false) {
            ToastHandle('error', laundaryCreateMessage);
        }
    }, [laundaryCreateStatus]);
    //end toast handle
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-start ms-2'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white" onClick={btnShowHide} >
                                <div className="d-flex align-items-center">
                                    <h3>
                                        <i class="bi bi-plus me-1 text-dark" />
                                    </h3>
                                    <div>Package List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {laundaryCreateLoarding ? <MainLoader /> : <Form
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
                            <Col lg={8} className='mx-auto'>
                                <Row className='my-3'>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Package ID :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control required type="text" value='1' disabled />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} className='my-3'>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Services :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Select
                                                        id="disabledSelect"
                                                        aria-label="Default select example"
                                                        placeholder="Member Group"
                                                        {...register('services')}
                                                    >
                                                        <option hidden value=''>Open this select menu</option>
                                                        {serviceCategorylits.map((items, index) => {
                                                            return (
                                                                <option value={items.service_name1}>{items.service_name1}</option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Package Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control    {...register('pkg_name')}
                                                        type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} className='my-3'>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Usage Limit :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control {...register('usage_limit')} type="number" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">

                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Package Unit :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Select
                                                        id="disabledSelect"
                                                        aria-label="Default select example"
                                                        placeholder="Member Group"
                                                        {...register('pkg_unit')}
                                                    >
                                                        <option hidden value=''>
                                                            Open this select menu
                                                        </option>
                                                        <option value="Quantity">Quantity</option>
                                                        <option value="Lbs">Lbs</option>
                                                        <option value="Costumer">Costumer</option>

                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} className='my-3'>
                                        <Form.Group controlId="validationCustom01">

                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Pickup :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control {...register('pickup')}
                                                        type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Duration :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Select
                                                        id="disabledSelect"
                                                        aria-label="Default select example"
                                                        placeholder="Member Group"
                                                        {...register('duration')}
                                                    >
                                                        <option hidden value=''>
                                                            Open this select menu
                                                        </option>
                                                        <option value="1">One Month</option>
                                                        <option value="2">Two Month</option>
                                                        <option value="2">Three Month</option>
                                                        <option value="2">Six Month</option>
                                                        <option value="2">twelve Month</option>
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} className='my-3'>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Amount :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control {...register('amount')}
                                                        type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center '>
                                                <Col lg={3}><Form.Label>Status :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Select
                                                        id="disabledSelect"
                                                        aria-label="Default select example"
                                                        placeholder="Member Group"
                                                        {...register('status')}
                                                    >
                                                        <option hidden value=''>
                                                            Open this select menu
                                                        </option>
                                                        <option value="show">Show</option>
                                                        <option value="hide">Hide</option>
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01 ">
                                            <Row className='d-flex align-items-center my-3'>
                                                <Col lg={3}><Form.Label>Priority :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control {...register('priority')}
                                                        type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Description :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control  {...register('description')} type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center'>
                                        <Button type="submit" className='btn btn-success'>Save</Button>
                                        <Button type="reset" className='btn btn-light ms-3'>Reset</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>}

                </Card.Body>
            </Card>
        </>)
}

export default NewEnterLaundryForm