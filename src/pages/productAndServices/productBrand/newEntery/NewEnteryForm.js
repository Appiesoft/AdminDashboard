import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { brandCreate, brandList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getBase64 } from '../../.././../helpers/imageToBase64';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';




const NewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const brandCreateStatus = store?.BrandCreate?.status
    const brandCreateMessage = store?.BrandCreate?.message
    const brandCreateLorder = store?.BrandCreate

    console.log()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const handleReset = (e) => {
        reset({
            brand_name: "",
            image: "",
            brand_remark: ""
        })
    }

    const curdAction = (data) => {
        dispatch(brandCreate(data))
        // setTimeout(() => {
        // },
        //     1000);
        // TableShowBtn()

    }

    const brandListUpdate = () => {
        dispatch(brandList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ))
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

    //start toast handle
    useEffect(() => {
        if (brandCreateStatus === true) {
            ToastHandle('success', brandCreateMessage);
            TableShowBtn()
            brandListUpdate()
        } else if (brandCreateStatus === false) {
            ToastHandle('error', brandCreateMessage);
        }
    }, [brandCreateStatus]);
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
                                    <div>Brand List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {brandCreateLorder.loading ? <MainLoader /> : <Form
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
                                    <Col lg={6} className='mx-auto'>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Brand ID :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        disabled
                                                        value='15'
                                                        type="text" />
                                                </Col>
                                                <Col lg={3}><Form.Label>Brand Name :</Form.Label></Col>
                                                <Col lg={9} className='my-2'>
                                                    <Form.Control
                                                        {...register('brand_name'
                                                        )}
                                                        type="text" placeholder="Adidas, Raymond, Vimal etc" />
                                                </Col>
                                                <Col lg={3}><Form.Label>Image :</Form.Label></Col>
                                                <Col lg={9}>
                                                    <Form.Control
                                                        {...register('image'
                                                        )}
                                                        type="file" />
                                                </Col>
                                                <Col lg={3}><Form.Label>Remarks :</Form.Label></Col>
                                                <Col lg={9} className='my-2'>
                                                    <Form.Control
                                                        {...register('brand_remark')}
                                                        type="text" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center'>
                                        <Button type="submit" className='btn btn-success'>Save</Button>
                                        <Button type="reset" className='btn btn-light ms-3' onClick={handleReset}>Reset</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>}
                </Card.Body>
            </Card>
        </>
    )
}

export default NewEnteryForm