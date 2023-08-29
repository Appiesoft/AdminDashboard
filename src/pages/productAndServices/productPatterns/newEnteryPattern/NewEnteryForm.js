import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { productPatternsCreate, productPatternsList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getBase64 } from '../../.././../helpers/imageToBase64';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';


const NewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const productPatternCreateStatus = store?.ProductPatternsCreate?.status
    const productPatternCreateMessage = store?.ProductPatternsCreate?.message
    const productPatternCreateLorder = store?.ProductPatternsCreate?.loading


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const curdAction = (data) => {
        dispatch(productPatternsCreate(data))

    }

    const onSubmit = async (data) => {
        let file = data.image[0];
        if (file) {
            await getBase64(file)
                .then(result => {
                    data.image = result
                    curdAction(data)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            curdAction(data);
        }
    };
    const btnChild = () => {
        TableShowBtn()
    }


    //start toast handle
    useEffect(() => {
        if (productPatternCreateStatus === true) {
            ToastHandle('success', productPatternCreateMessage);
            dispatch(productPatternsList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ))
            TableShowBtn()
        } else if (productPatternCreateStatus === false) {
            ToastHandle('error', productPatternCreateMessage);
        }
    }, [productPatternCreateStatus]);
    //end toast handle
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
                                    <div>Pattern List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {productPatternCreateLorder ? <MainLoader /> : <Form noValidate
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
                                                <Col lg={3}><Form.Label>Pattern ID :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        disabled
                                                        type="text" value='4' />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Pattern Name :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('pattern_name')}
                                                        type="text" placeholder="Buffalo Check, Chevron, Damask etc" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='my-4' >
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Remarks :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control  {...register('pattern_remark')} type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Image :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control   {...register('image')} type="file" />
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
                    </Form>}

                </Card.Body>
            </Card>
        </>)
}

export default NewEnteryForm