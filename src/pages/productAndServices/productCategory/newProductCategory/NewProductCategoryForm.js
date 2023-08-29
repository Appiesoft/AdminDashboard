import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { categoryCreate, categoryList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';

const NewProductCategoryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const productCategoryCreateStatus = store?.ProductCategoryCreate?.status
    const productCategoryCreateMessage = store?.ProductCategoryCreate?.message
    const productCategoryCreateloader = store?.ProductCategoryCreate;

    const btnChild = () => {
        TableShowBtn()
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const handleReset = (e) => {
        reset({
            category_name: "",
            status: "",
            category_remark: "",
        })
    }

    const onSubmit = async (data) => {
        dispatch(categoryCreate(data))
    };

    const categoryListUpdate = () => {
        dispatch(categoryList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ))
    }

    useEffect(() => {
        if (productCategoryCreateStatus === true) {
            ToastHandle('success', productCategoryCreateMessage);
            TableShowBtn();
            categoryListUpdate()
        } else if (productCategoryCreateStatus === false) {
            ToastHandle('error', productCategoryCreateMessage);
        }
    }, [productCategoryCreateStatus]);

    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2" onClick={btnChild} >
                                <div className='d-flex align-items-center'>
                                    <h4>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h4>
                                    <div>Product Category List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {productCategoryCreateloader?.loading ? (
                        <MainLoader />
                    ) : <Form noValidate
                        onSubmit={
                            handleSubmit((data) => {
                                onSubmit(data)

                            }, (err) => {
                                console.log(err)
                            })
                        } className='px-3'>
                        <Row className='p-3 mt-3 border'>
                            <Col lg={12}>
                                <Row className='my-3'>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Category ID :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control type="text" value='17' disabled />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Service Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('category_name')}
                                                        type="text" placeholder="MAN, WOMEN, KIDS, HOUSEHOLD etc" />
                                                </Col>

                                            </Row>
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row className='my-4' >
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Status :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Group>
                                                        <Form.Select id="disabledSelect" aria-label="Default select example"
                                                            {...register('status')}
                                                        >
                                                            <option hidden value=''>--Select Package--</option>
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
                                                <Col lg={3}><Form.Label>Description :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control   {...register('category_remark')}
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
                    <Row>
                        <Col className='ms-2'>
                            <h4>
                                Note :<Card.Link href="https://translate.google.co.in/"> Google Translate</Card.Link></h4>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </>)
}

export default NewProductCategoryForm