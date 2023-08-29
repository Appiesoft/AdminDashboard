import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import Profile from '../../../assets/images/organization/profile.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { adminProfile } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import AdminProfileForm from './adminForm';
import './Admin.css';

const Admin = () => {
    const [isMoreOptionShown, setIsMoreOptionShown] = useState({
        visible: false,
        color: 'green',
    });
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const adminStoreLoader = store?.AdminProfile?.loading;
    const adminStoreData = store?.AdminProfile?.data;

    useEffect(() => {
        dispatch(adminProfile());
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center mt-1">
            {adminStoreLoader ? (
                <MainLoader />
            ) : (
                <Card className="my-2 p-2 w-100">
                    <Row>
                        <Col lg={4} className="d-flex align-items-center justify-content-center ">
                            <div>
                                <div
                                    className="border rounded-circle"
                                    style={{ height: '200px', width: '200px', overflow: 'hidden' }}>
                                    <img src={Profile} alt="" height="200px" width="200px" />
                                </div>
                                <OverlayTrigger
                                    trigger="click"
                                    show={show}
                                    placement="bottom"
                                    overlay={
                                        <Popover popper id={`popover-positioned-1`}>
                                            <Popover.Body className="p-0 m-0">
                                                <div className="d-flex justify-content-center my-1">Change Status</div>
                                                <div
                                                    className="d-flex align-items-center available px-2"
                                                    onClick={() => {
                                                        setIsMoreOptionShown({
                                                            visible: !isMoreOptionShown.visible,
                                                            color: 'green',
                                                        });
                                                        setShow(!show);
                                                    }}>
                                                    <i
                                                        className="bi bi-circle-fill fw-bolder fs-4"
                                                        style={{ color: 'green' }}></i>
                                                    &nbsp;&nbsp; Available
                                                </div>
                                                <div
                                                    className="d-flex align-items-center px-2 available"
                                                    onClick={() => {
                                                        setIsMoreOptionShown({
                                                            visible: !isMoreOptionShown.visible,
                                                            color: 'red',
                                                        });
                                                        setShow(!show);
                                                    }}>
                                                    <i
                                                        className="bi bi-circle-fill fw-bolder fs-4"
                                                        style={{ color: 'red' }}></i>
                                                    &nbsp;&nbsp; Busy
                                                </div>
                                                <div
                                                    className="d-flex align-items-center px-2 available"
                                                    onClick={() => {
                                                        setIsMoreOptionShown({
                                                            visible: !isMoreOptionShown.visible,
                                                            color: 'gray',
                                                        });
                                                        setShow(!show);
                                                    }}>
                                                    <i
                                                        className="bi bi-circle-fill fw-bolder fs-4"
                                                        style={{ color: 'gray' }}></i>
                                                    &nbsp;&nbsp; Invisible
                                                </div>
                                            </Popover.Body>
                                        </Popover>
                                    }>
                                    <div className="d-grid mb-2">
                                        <Button
                                            className="d-flex align-items-center justify-content-center fw-bolder my-1"
                                            style={{ backgroundColor: 'white', color: '#e74023' }}
                                            onClick={() => setShow(!show)}>
                                            <i
                                                className="bi bi-circle-fill fw-bolder fs-4"
                                                style={{ color: isMoreOptionShown.color }}></i>
                                            &nbsp;&nbsp;TurnsApp
                                        </Button>
                                    </div>
                                </OverlayTrigger>
                                <div className="d-flex align-items-center my-1">
                                    <i
                                        className="bi bi-circle-fill fw-bolder border rounded-2 p-1 fs-4 d-flex "
                                        style={{ color: 'green' }}></i>
                                    &nbsp;&nbsp;1 min ago
                                </div>
                                <div className="d-flex align-items-center my-1">
                                    <i
                                        className="bi bi-pin-map fw-bolder border rounded-2 p-1 fs-4 d-flex "
                                        style={{ color: 'red' }}></i>
                                    &nbsp;&nbsp; Noida
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <AdminProfileForm data={adminStoreData} />
                        </Col>
                    </Row>
                </Card>
            )}
        </div>
    );
};

export default Admin;
