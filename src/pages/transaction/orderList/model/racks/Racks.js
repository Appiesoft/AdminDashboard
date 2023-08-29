import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import './Racks.css'
import { useForm } from 'react-hook-form';



const Racks = ({ parentRocks, childEmptyRock }) => {
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);


    const toggle = () => {
        setModal(!modal);
        childEmptyRock("")
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
        if (parentRocks == "lg") {
            openModalWithScroll();
        }
    }, [parentRocks]);

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton>
                    <h4 className="modal-title">Edit Racks</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form
                    >
                        <Form.Group controlId="validationCustom01">
                            <Row className='d-flex align-items-center'>
                                <Col lg={3}><Form.Label>Rack Number :</Form.Label></Col>
                                <Col lg={9}>
                                    <Form.Control required {...register('rackNumber', { required: true })}
                                        isInvalid={errors.rackNumber} />
                                    {errors.rackNumber && <span className='text-danger'>Please enter Rack number</span>}

                                </Col>

                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-center my-2'>
                            <Button variant="success" onClick={handleSubmit(
                                (data) => {
                                    submitData(data);
                                },
                                (err) => {

                                    console.log(err);
                                }
                            )} >
                                Submit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default Racks