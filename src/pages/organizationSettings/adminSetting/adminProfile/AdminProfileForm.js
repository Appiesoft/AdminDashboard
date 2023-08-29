import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Card, Form, Button, Collapse, Popover, OverlayTrigger } from 'react-bootstrap';
import Profile from '../../../../assets/images/organization/profile.jpg';
import './AdminProfileForm.css'
import EditProfileForm from '../model/editProfileModel/EditProfileForm';
import ChangePasswordForm from '../model/changePasswordModel/ChangePasswordForm';
import { useDispatch, useSelector } from 'react-redux';
import { adminProfile } from '../../../../redux/actions';
import MainLoader from '../../../../components/MainLoader';

const AdminProfileForm = () => {
    const [isMoreOptionShown, setIsMoreOptionShown] = useState({
        visible: false,
        color: 'green',
    });
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const getAdminStoreData = store?.AdminProfile?.data
    const adminStoreLoader = store?.AdminProfile
    const adminStorestatus = store?.AdminProfile?.status
    const [adminStoreData, setAdminStoreData] = useState(null)
    const [show, setShow] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    //model edit
    const [parentEditProfile, setParentEditProfile] = useState('')
    const openModalEditProfile = (fill) => {
        setParentEditProfile(fill)
    };
    const childEmptyEditProfile = (empty) => {
        setParentEditProfile(empty)
    }

    //model change password
    const [parentChangePasswordModel, setParentChangePasswordModel] = useState('')
    const openModalChangePasswordModel = (fill) => {
        setParentChangePasswordModel(fill)
    };
    const childEmptyChangePasswordModel = (empty) => {
        setParentChangePasswordModel(empty)
    }

    const getdata = () => {
        dispatch(adminProfile())
    }
    useEffect(() => {
        getdata()
    }, [])

    useEffect(() => {
        if (adminStorestatus) {
            setAdminStoreData(getAdminStoreData)
        }
    }, [adminStorestatus])
    // console.log('option:', isMoreOptionShown);


    return (
        <>
            <Card className='mt-3'>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <h2>Admin Profile</h2>
                            </Col>
                        </Row>
                        <Row className='border mt-3'>
                            <Col lg={12} className='d-flex align-items-center justify-content-center'>
                                <Col lg={6} className='d-flex align-items-center justify-content-center'>
                                    <Row>
                                        <Col lg={12} className='mx-auto mt-2 border shadow p-2'>
                                            <Row className='mx-2'>
                                                <Col>
                                                    <Row>
                                                        <Col >
                                                            <div className='text-center'><img src={Profile} className='img-fluid' alt="" /></div>
                                                            {['bottom'].map((placement) => (
                                                                <OverlayTrigger
                                                                    show={show}
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Popover popper id={`popover-positioned-${placement}`}>
                                                                            <Popover.Body>
                                                                                <p>Change Status</p>
                                                                                <div className='d-flex cursor_btn' onClick={() => {
                                                                                    setIsMoreOptionShown({
                                                                                        visible: !isMoreOptionShown.visible,
                                                                                        color: 'green',
                                                                                    });
                                                                                    setShow(false);
                                                                                }}>
                                                                                    <i className="uil uil-circle me-2 text-success"></i>
                                                                                    <p className='text-success'> Available</p>
                                                                                </div>
                                                                                <div className='d-flex cursor_btn' onClick={() => {
                                                                                    setShow(false);
                                                                                    setIsMoreOptionShown({
                                                                                        visible: !isMoreOptionShown.visible,
                                                                                        color: 'red',
                                                                                    });

                                                                                }}>
                                                                                    <i className="uil uil-circle me-2 text-danger"></i>
                                                                                    <p className='text-danger'> Busy</p>
                                                                                </div>
                                                                                <div className='d-flex cursor_btn' onClick={() => {
                                                                                    setIsMoreOptionShown({
                                                                                        visible: !isMoreOptionShown.visible,
                                                                                        color: 'gray',
                                                                                    });
                                                                                    setShow(false);
                                                                                }}>
                                                                                    <i className="uil uil-circle me-2 text-dark"></i>
                                                                                    <p className='text-dark'> Invisible</p>
                                                                                </div>
                                                                            </Popover.Body>
                                                                        </Popover>
                                                                    }
                                                                >
                                                                    <div className='d-grid mb-2'><button className='btn-primary border-0' onClick={() => { setShow(!show) }}>Sifabso</button></div>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className='d-flex'>
                                                            <div>
                                                                <button className='btn btn-primary border-0'
                                                                    // onClick={() => openModalEditProfile('lg', adminStoreData)}
                                                                    onClick={() => openModalChangePasswordModel('lg')}

                                                                >Edit Profile</button>
                                                                {/* <EditProfileForm parentEditProfile={parentEditProfile} childEmptyEditProfile={childEmptyEditProfile} /> */}

                                                            </div>
                                                            <div className=' d-grid ms-1'>
                                                                <button className='btn btn-primary border-0'
                                                                    onClick={() => openModalChangePasswordModel('lg')}
                                                                >Change Password</button>
                                                                <ChangePasswordForm parentChangePasswordModel={parentChangePasswordModel} childEmptyChangePasswordModel={childEmptyChangePasswordModel} />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col lg={6} className='mt-3'>
                                    <>
                                        <Card>
                                            {adminStoreLoader?.loading ? <MainLoader /> : <Card.Body>
                                                <Form noValidate >
                                                    <Row className="p-3">
                                                        <Col lg={12}>
                                                            <Row className="my-3">
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>Name :</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                {adminStoreData?.admin_name}
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col lg={12} className="mt-3">
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>Mobile :</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                {adminStoreData?.mobile}
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Email ID :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                {adminStoreData?.email_id}
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={12} className="my-3">
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Username :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                {adminStoreData?.username}
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Location :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                New York New York
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={12} className="my-3">
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center border-bottom">
                                                                            <Col lg={3}>
                                                                                <Form.Label className='mb-0'>
                                                                                    Last Online :	                                                                        </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                1 Minute ago
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            {/* <Row>
                                                                <Col className="text-center  py-3">
                                                                    <Button type="submit" className="btn btn-success">
                                                                        Save
                                                                    </Button>
                                                                </Col>
                                                            </Row> */}
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Card.Body>}

                                        </Card>
                                    </>
                                </Col>
                            </Col>
                        </Row>
                    </Container>

                </Card.Body>
            </Card>
        </>
    )
}

export default AdminProfileForm