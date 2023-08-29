import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doordeshSettingList, doordeshSettingUpdate } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';


const DoorDashSettingForm = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const doordashSettingList = store?.DoordashSettingList?.doordashSettingList?.data
    const doorDashUpdateStatus = store?.DoordashSettingUpdate?.status
    const doorDashUpdateMessage = store?.DoordashSettingUpdate?.message

    const handleDoordashSetting = (e) => {
        dispatch(doordeshSettingUpdate(
            {
                doordashStatus: doordashSettingList?.doordash_status === "ENABLE" ? "DISABLE" : "ENABLE"
            }
        ))
    }


    useEffect(() => {
        dispatch(doordeshSettingList())
    }, [])

    useEffect(() => {
        if (doorDashUpdateStatus) {
            dispatch(doordeshSettingList())
        }
    }, [doorDashUpdateStatus])

    useEffect(() => {
        if (doorDashUpdateStatus) {
            ToastHandle('success', doorDashUpdateMessage);
        } else if (doorDashUpdateStatus === false) {
            ToastHandle('error', doorDashUpdateMessage);
        }
    }, [doorDashUpdateStatus]);


    return (
        <>
            <Row>
                <Col>
                    <h4>Doordash Settings</h4>
                </Col>
            </Row>
            <Card className=' p-5'>
                <Card.Body className='p-5'>
                    <Form
                        className='p-5 '>
                        <Row className="p-1 py-0 text-center ">
                            <Col lg={12}>
                                <Row>
                                    <Col lg={6}>
                                        <div className=' fw-bold ms-4 text-center  '>
                                            Doordash :
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='d-flex  '>
                                            <div className='text-danger ms-4'>
                                                <Form>
                                                    <Form.Check type="switch"
                                                        checked={doordashSettingList?.doordash_status === "ENABLE" ? true : false}
                                                        id="custom-switch"
                                                        name='doordash_setting'
                                                        onChange={(e) => {
                                                            handleDoordashSetting(e)
                                                        }}
                                                        label={doordashSettingList?.doordash_status === "ENABLE" ? <span className='text-success'>{"ENABLE"}</span> : <span className='text-danger'>{"DISABLE"}</span>}
                                                    />
                                                </Form>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default DoorDashSettingForm