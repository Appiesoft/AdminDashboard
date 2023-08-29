import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, } from 'react-bootstrap';
import { useSelector, useDispatch, reset } from 'react-redux';
import { serviceCategoryCreate, serviceCategoryList } from '../../../../redux/actions';
import { useForm } from 'react-hook-form';
import { getBase64 } from '../../.././../helpers/imageToBase64';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';
import './newEnteryForm.css';


const NewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const serviceCategoryStatus = store?.ServiceCategoryCreate?.status;
    const serviceCategoryMessage = store?.ServiceCategoryCreate?.message;
    const loader = store?.ServiceCategoryCreate;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const handleReset = (e) => {
        // e.prevent.default()
        reset({
            service_name: "",
            service_name1: "",
            show_hide: "",
            show_hide_on_website: "",
            image: ""
        })
    }
    // useEffect(() => {
    //     reset({
    //         priority: 1,
    //     });
    // }, []);

    const curdAction = (data) => {
        dispatch(serviceCategoryCreate(data));
        setTimeout(() => {
            dispatch(
                serviceCategoryList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 20,
                })
            );
        }, 1000);
        // TableShowBtn();
    };

    const onSubmit = async (data) => {
        let file = data.image[0];
        if (file) {
            await getBase64(file)
                .then((result) => {
                    data.image = result;
                    curdAction(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            data.image = '';
            curdAction(data);
        }
        dispatch(
            serviceCategoryList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 20,
            })
        );
    };

    useEffect(() => {
        if (serviceCategoryStatus === true) {
            ToastHandle('success', serviceCategoryMessage);
            TableShowBtn();
        } else if (serviceCategoryStatus === false) {
            ToastHandle('error', serviceCategoryMessage);
        }
    }, [serviceCategoryStatus]);

    const btnShowHide = () => {
        TableShowBtn();
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className="d-flex justify-content-end">
                            <Button
                                variant="white"
                                className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                onClick={btnShowHide}>
                                <div className="d-flex align-items-center">
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Service Category List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {loader?.loading ? (
                        <MainLoader />
                    ) : (
                        <Form
                            noValidate
                            onSubmit={handleSubmit(
                                (data) => {
                                    onSubmit(data);
                                },
                                (err) => {
                                    console.log(err);
                                }
                            )}
                            className="px-3">
                            <Row className="p-0 mt-3 border">
                                <Col lg={12}>
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Service ID :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            value='14'
                                                            type="text"
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Service Name (English) :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            {...register('service_name')}
                                                            placeholder="DRY CLEANING, STEAM IRONING, WASH & FOLD, WASH & IRON etc"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Service Name (English) :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control {...register('service_name1')}
                                                            type="text" />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Show/Hide</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                            {...register('show_hide')}
                                                        >
                                                            <option hidden value=''>
                                                                Open this select menu
                                                            </option>
                                                            <option value="Show">Show</option>
                                                            <option value="Hide">Hide</option>
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Show/Hide On Website</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Select
                                                            id="disabledSelect"
                                                            aria-label="Default select example"
                                                            {...register('show_hide_on_website')}
                                                        >
                                                            <option hidden value=''>
                                                                Open this select menu
                                                            </option>
                                                            <option value="Show">Show</option>
                                                            <option value="Hide">Hide</option>
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Image :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            {...register('image')}
                                                            accept="image/png, image/jpeg"
                                                            type="file"
                                                        />

                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Description</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            type="text" />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={3}>
                                                        <Form.Label>Priority :</Form.Label>
                                                    </Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            {...register('priority')}
                                                            type="number"
                                                            placeholder="0"
                                                        />

                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center  py-3">
                                            <Button type="submit" className="btn btn-success">
                                                Update
                                            </Button>
                                            <Button type="reset" className="btn btn-light ms-3 px-3" onClick={handleReset} >
                                                Reset
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>)}
                    <Row>
                        <Col className='ms-2 mt-2'>
                            <h4>
                                Note :<Card.Link href="https://translate.google.co.in/"> Google Translate</Card.Link></h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default NewEnteryForm;
