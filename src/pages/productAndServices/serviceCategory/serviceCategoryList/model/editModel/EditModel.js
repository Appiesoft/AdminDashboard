import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { serviceCategoryUpdate, serviceCategoryList } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
import { getBase64 } from '../../.././../../../helpers/imageToBase64';
import ToastHandle from '../../../../../../helpers/toastMessage';
import MainLoader from '../../../../../../components/MainLoader';

const EditModel = ({ rowData, parentEditModel, childEmptyEditModel }) => {
    const dispatch = useDispatch();

    const store = useSelector((state) => state);
    const serviceCategoryStatus = store?.ServiceCategoryUpdate?.status;
    const serviceCategoryMessage = store?.ServiceCategoryUpdate?.message;
    const loader = store?.ServiceCategoryUpdate;

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyEditModel('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);

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
        if (serviceCategoryStatus?.serviceCategoryStatus !== null) {
            const data = serviceCategoryStatus?.serviceCategoryStatus?.data
            setResetDataHandling(data)
        }

    }

    useEffect(() => {
        reset({
            service_id: rowData.id,
            service_name: rowData.service_name1,
            service_name1: rowData.service_name2,
            service_unit: rowData.service_unit,
            service_code: rowData.service_code,
            show_hide: rowData.show_hide,
            show_hide_on_website: rowData.show_hide_on_website,
            priority: rowData.priority,
        });
    }, [rowData]);

    const curdAction = (data) => {
        console.log(data);
        dispatch(serviceCategoryUpdate(data));
        setTimeout(() => {
            dispatch(
                serviceCategoryList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 20,
                })
            );
        }, 1000);
        // toggle();
    };

    const onSubmit = async (data) => {
        data.service_id = rowData.id;
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
            curdAction(data);
        }
    };

    useEffect(() => {
        if (serviceCategoryStatus === true) {
            ToastHandle('success', serviceCategoryMessage);
            toggle();
        } else if (serviceCategoryStatus === false) {
            ToastHandle('error', serviceCategoryMessage);
        }
    }, [serviceCategoryStatus]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
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
                                                )}>
                                                <Row className="p-3">
                                                    <Col lg={12}>
                                                        <Row className="my-3">
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Service ID :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                value='5'
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Service Name [English] :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                {...register('service_name1')}
                                                                                type="text"
                                                                                placeholder="WASH AND FOLD"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Service Name [ english ] :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                {...register('service_name', { required: true })}
                                                                                isInvalid={errors.service_name}
                                                                                type="text"
                                                                            />
                                                                            {errors.service_name && <span className='text-danger'>Please enter service name</span>}

                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Show/Hide :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                aria-label="Default select example"
                                                                                {...register('show_hide'
                                                                                )}
                                                                                isInvalid={errors.show_hide}>
                                                                                <option hidden value="">
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>
                                                                                Show/Hide On Website :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Select
                                                                                id="disabledSelect"
                                                                                aria-label="Default select example"
                                                                                {...register('show_hide_on_website'
                                                                                )}>
                                                                                <option hidden value="">
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
                                                                        <Col lg={12}>
                                                                            <Form.Label>Priority :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                {...register('priority', { required: true })}
                                                                                isInvalid={errors.priority}
                                                                                type="number"
                                                                            />
                                                                            {errors.priority && <span className='text-danger'>Please enter one priority</span>}
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row className="my-3">
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Description :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
                                                                            <Form.Control
                                                                                type='text'
                                                                            >
                                                                            </Form.Control>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={12}>
                                                                            <Form.Label>Image :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={12}>
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
                                        )}
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='ms-4'>
                            <h4>
                                Note :<Card.Link href="https://translate.google.co.in/"> Google Translate</Card.Link></h4>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditModel;
