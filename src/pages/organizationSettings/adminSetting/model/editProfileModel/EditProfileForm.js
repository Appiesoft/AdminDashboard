import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { adminProfileUpdate } from '../../../../../redux/organizations/adminProfile/actions';


const EditProfileForm = ({ parentEditProfile, childEmptyEditProfile }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const getAdminStoreData = store?.AdminProfile?.data
    const [adminStoreData, setAdminStoreData] = useState(null)
    const adminStorestatus = store?.AdminProfile?.status



    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
        childEmptyEditProfile('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };
    const resetForm = () => {
        if (adminStoreData) {
            reset({
                name: adminStoreData.admin_name,
                mobile: adminStoreData.mobile,
                email: adminStoreData.email_id,
                userName: adminStoreData.username,
                newPassword: ""
            })
        }

    }
    useEffect(() => {
        resetForm()
        if (parentEditProfile == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditProfile]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const submitData = (data) => {
        dispatch(adminProfileUpdate({
            adminName: data.name,
            mobile: data.mobile,
            emailId: data.email,
            password: data.newPassword
        }))
        toggle()
    }

    useEffect(() => {
        if (adminStorestatus) {
            setAdminStoreData(getAdminStoreData)
        }
    }, [adminStorestatus])


    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Admin Profile</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form noValidate
                                            onSubmit={handleSubmit(
                                                (data) => {
                                                    submitData(data);
                                                },
                                                (err) => {
                                                    console.log(err);
                                                }
                                            )}>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Admin ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            value='1'
                                                                            disabled

                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="ne_name">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('name')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={12}>
                                                            <Form.Group controlId="ne_mobile">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Mobile :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('mobile')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="ne_email">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Email :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            {...register('email')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="ne_username">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Username :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            disabled
                                                                            {...register('userName')}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="ne_newpassword">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>New Password :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            placeholder='if blank no password change'
                                                                            {...register('newPassword')}
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
                                                            <Button type="submit" className="btn btn-light ms-3">
                                                                Reset
                                                            </Button>
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

            </Modal>
        </>
    )
}

export default EditProfileForm