import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { colorCreate, colorList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getBase64 } from '../../.././../helpers/imageToBase64';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';



const NewEnterForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const productColorCreateStatus = store?.ProductColorCreate?.status
    const productColorCreateMessage = store?.ProductColorCreate?.message
    const productColorCreateLorder = store.ProductColorCreate;



    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const handleReset = (e) => {
        reset({
            color_name: "",
            image: "",
            mobile: "",
            color_code: "",
            color_remark: "",
        })
    }



    const curdAction = (data) => {
        dispatch(colorCreate(data))

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
            data.image = ''
            curdAction(data);
        }
    };
    const btnChild = () => {
        TableShowBtn()
    }

    const updateProductColor = () => {
        dispatch(colorList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ))
    }

    //start toast handle
    useEffect(() => {
        if (productColorCreateStatus === true) {
            ToastHandle('success', productColorCreateMessage);
            updateProductColor()
            TableShowBtn()

        } else if (productColorCreateStatus === false) {
            ToastHandle('error', productColorCreateMessage);
        }
    }, [productColorCreateStatus]);
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
                                    <div>Color List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {productColorCreateLorder?.loading ? <MainLoader /> :
                        <Form noValidate
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
                                    <Row className='mx-auto'>
                                        <Col lg={12} className='my-3'>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Color ID :</Form.Label></Col>
                                                    <Col lg={8}>
                                                        <Form.Control required type="text" placeholder="" value='8' disabled />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Color Name :</Form.Label></Col>
                                                    <Col lg={8}>
                                                        <Form.Control
                                                            {...register('color_name')}
                                                            type="text" placeholder="Red, Stripped Line etc" />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} className='my-3'>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Image :</Form.Label></Col>
                                                    <Col lg={8}>
                                                        <Form.Control
                                                            {...register('image')} type="file" />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Code :</Form.Label></Col>
                                                    <Col lg={8}>
                                                        <Form.Control {...register('color_code')} type="color" className='w-100' />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} className='my-3'>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Remarks :</Form.Label></Col>
                                                    <Col lg={8}>
                                                        <Form.Control {...register('color_remark')} type="text" />
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

export default NewEnterForm