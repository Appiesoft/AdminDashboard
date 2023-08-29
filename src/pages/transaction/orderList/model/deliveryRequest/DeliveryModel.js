import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import { useForm } from 'react-hook-form';


const DeliveryModel = ({ parentDelivery, childEmptyDelivery }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const starRequired = (<span className='text-danger'>*</span>)

    const toggle = () => {
        setModal(!modal);
        childEmptyDelivery("")
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };
    useEffect(() => {
        if (parentDelivery == "lg") {
            openModalWithSize('lg');
        }
    }, [parentDelivery]);

    //form validation
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const submitData = (data) => {
        console.log(data)
        toggle();
    };
    // end form validation

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className='bg-light '>
                    <h4 className="modal-title ">Delivery Request</h4>
                </Modal.Header>
                <Modal.Body className='pt-0 '>
                    <Row>
                        <Col className='px-0'>
                            <>
                                <Card className='mb-0'>
                                    <Card.Body className='py-0'>
                                        <Form noValidate
                                            onSubmit={handleSubmit(
                                                (data) => {
                                                    submitData(data);
                                                },
                                                (err) => {

                                                    console.log(err);
                                                }
                                            )}>
                                            <Row className='p-3 pb-0'>
                                                <Col lg={12}>
                                                    <Row >
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Customer Name :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" value='nikki sharma' placeholder="" disabled />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Delivery Id :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" value='DEL128' placeholder="" disabled />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className='my-3'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Order Id{starRequired} :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" value='TWH1106' placeholder="" disabled />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Qty :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" value='110' placeholder="" disabled />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row className='my-3'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Store Name:</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="text" value='The Wash House' placeholder="" disabled />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Delivery Date{starRequired} :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Control required type="date"
                                                                            {...register('deliveryDate', { required: true })}
                                                                            isInvalid={errors.deliveryDate}
                                                                            placeholder="Address2" />
                                                                        {errors.deliveryDate && <span className='text-danger'>  Please select Delivery date</span>}
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className='my-3 d-flex align-items-center'>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">

                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Delivery Time{starRequired} :</Form.Label></Col>
                                                                    <Col lg={12}>
                                                                        <Form.Group className="" placeholder='Member Group'>
                                                                            <Form.Select id="disabledSelect"
                                                                                {...register('deliveryTime', { required: true })}
                                                                                isInvalid={errors.deliveryTime}
                                                                                aria-label="Default select example" placeholder='Member Group' required>
                                                                                <option hidden value=''>--None--</option>
                                                                                <option value="1">B select</option>
                                                                                <option value="2">C select</option>
                                                                            </Form.Select>
                                                                            {errors.deliveryTime && <span className='text-danger'>  Please select one Delivery Time</span>}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group controlId="validationCustom01">

                                                                <Row className='d-flex align-items-center'>
                                                                    <Col lg={12}><Form.Label>Driver :</Form.Label></Col>
                                                                    <Col lg={12} className='d-flex justify-content-between'>
                                                                        <Form.Group className="w-100" placeholder='Member Group'>
                                                                            <Form.Select id="disabledSelect"
                                                                                {...register('driver', { required: true })}
                                                                                isInvalid={errors.driver}
                                                                                aria-label="Default select example" placeholder='Member Group' required>
                                                                                <option hidden value=''>--None--</option>
                                                                                <option value="1">B select</option>
                                                                                <option value="2">C select</option>

                                                                            </Form.Select>
                                                                            {errors.driver && <span className='text-danger'>  Please select one Driver</span>}

                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className='text-center  py-3'>
                                                            <Button type="submit" className='btn btn-success'>Save</Button>
                                                            <Button type="submit" className='btn btn-light ms-3'>Rest</Button>
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
            </Modal></>

    )
}

export default DeliveryModel