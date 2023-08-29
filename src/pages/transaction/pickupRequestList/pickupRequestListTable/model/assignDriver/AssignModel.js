import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const AssignModel = ({ parentAssign, childEmptyAssign }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);


    const toggle = () => {
        setModal(!modal);
        childEmptyAssign("")
    };

    const openModalWithScroll = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

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

    useEffect(() => {
        if (parentAssign == "lg") {
            openModalWithScroll();
        }
    }, [parentAssign]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton>
                    <h4 className="modal-title">Assign Driver</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col className='d-flex align-items-center'>
                                <Col lg={4} className='fw-bold'>Pickup Request Id :</Col>
                                <Col lg={8} className='input_outline border'><input type="text" className='w-100 input_outline border py-1' value="PIC123" disabled /></Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex align-items-center mt-2'>
                                <Col lg={4} className='fw-bold'>Driver Name <span className='text-danger'>*</span>:</Col>
                                <Col lg={8} className='input_outline border'>
                                    <Form.Group className="" placeholder='Member Group'>
                                        <Form.Select id="disabledSelect"
                                            {...register('driverName', { required: true })}
                                            isInvalid={errors.driverName}
                                            aria-label="Default select example" placeholder='Member Group' required>
                                            <option hidden value=''>The Wash Home</option>
                                            <option value="1">matt v</option>
                                            <option value="2">nick</option>
                                            <option value="2">QA driver</option>
                                            <option value="2">Maninder</option>
                                        </Form.Select>
                                        {errors.driverName && <span className='text-danger'>Please select one Driver name</span>}
                                    </Form.Group>
                                </Col>
                            </Col>
                        </Row>
                    </Form>

                </Modal.Body>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-center my-2'>
                            <Button variant="success"
                                onClick={handleSubmit(
                                    (data) => {
                                        submitData(data);
                                    },
                                    (err) => {

                                        console.log(err);
                                    }
                                )}>
                                Submit
                            </Button>
                            <Button variant="light" className='ms-2' onClick={toggle}>
                                Reset
                            </Button>{' '}

                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default AssignModel