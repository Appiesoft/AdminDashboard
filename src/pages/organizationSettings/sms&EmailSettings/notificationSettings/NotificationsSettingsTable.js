import React, { useEffect } from 'react'
import { Row, Col, Form, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { smsAndEmail } from '../../../../redux/actions';
import "./NotificationsSettingsTable.css"
import MainLoader from '../../../../components/MainLoader';

const NotificationsSettingsTable = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const notificationData = store.SmsAndEmail;
    const notificationCategoryDataList = store.SmsAndEmail;

    useEffect(() => {
        dispatch(smsAndEmail({ type: "NOTIFICATION" }))
    }, [])
    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            {notificationCategoryDataList?.loading ? <MainLoader /> : <Card.Body>
                                <Row className='border p-2 bg-primary text-white'>
                                    <Col>Notifications Settings</Col>
                                </Row>
                                <Row className='d-flex align-items-center my-4'>
                                    <Col lg={2}>
                                        <p className='mb-0 text-danger'>Sender Id :</p>
                                    </Col>
                                    <Col lg={2}>
                                        <Form.Control
                                            value='SIFBSO'
                                            disabled
                                        />
                                    </Col>
                                </Row>
                                <Row className="position-relative">
                                    <Col>
                                        <Table className="mb-0 " size="sm">
                                            <thead>
                                                <tr className='bg-light '>
                                                    <th><input type="checkbox" /></th>
                                                    <th className="text-truncate">Sr.No.</th>
                                                    <th className="text-truncate">Comment</th>
                                                    <th className="text-truncate">SMS Templates</th>
                                                    <th className="text-truncate">SMS Enable Disable	</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {notificationData?.smsAndEmail?.data?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='align-middle'>
                                                            <td><input type="checkbox" /></td>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{item.notification_templates}</td>
                                                            <td>{item.notification_template_US}</td>
                                                            <td><button className='btn bg-white text-success border-0'>{item.status}</button></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Card.Body>}

                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default NotificationsSettingsTable