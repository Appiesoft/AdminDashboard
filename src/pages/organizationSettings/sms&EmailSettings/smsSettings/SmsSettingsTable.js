import React, { useEffect } from 'react'
import { Row, Col, Form, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { smsAndEmail } from '../../../../redux/actions';
import './SmsSettingsTable.css'
import Loader from "../../../../components/MainLoader"


const SmsSettingsTable = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const smsData = store.SmsAndEmail
    const smsSettingCategoryDataList = store.SmsAndEmail;

    useEffect(() => {
        dispatch(smsAndEmail({
            type: "SMS"
        }))
    }, [])
    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            {smsSettingCategoryDataList?.loading ? <Loader /> :
                                <Card.Body>
                                    <Row className='border p-2 bg-primary text-white'>
                                        <Col>SMS Settings</Col>
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
                                                        <th className="text-truncate">SMS Enable Disable</th>
                                                        <th className="text-truncate">Template id</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {smsData?.smsAndEmail?.data?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td><input type="checkbox" /></td>
                                                                <th scope="row">{item.id}</th>
                                                                <td>{item.sms_templates_US}</td>
                                                                <td>{item.sms_templates}</td>
                                                                <td><button className='btn bg-white text-success border-0'>{item.status}</button></td>
                                                                <td>{item.template_id}</td>
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

export default SmsSettingsTable