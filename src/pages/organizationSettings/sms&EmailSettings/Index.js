import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Dropdown, Button, Container } from 'react-bootstrap';
import EmailSettingsTable from './emailSettings/EmailSettingsTable'
import NotificationsSettingsTable from './notificationSettings/NotificationsSettingsTable'
import SmsSettingsTable from './smsSettings/SmsSettingsTable'

const Index = () => {
    const [table, setTable] = useState(null)

    const treeComponent = (items) => {

        if (items == "SMS") {
            setTable(<SmsSettingsTable />)
        } else if (items == 'Email') {
            setTable(<EmailSettingsTable />)

        } else if (items == 'Notification') {
            setTable(<NotificationsSettingsTable />)

        } else {
            setTable(<SmsSettingsTable />)
        }
    }

    useEffect(() => {
        treeComponent()
    }, [])

    return (
        <>
            <Row >
                <Col>
                    <Row className='my-2'>
                        <Col className='d-flex justify-content-start'>
                            <button onClick={() => treeComponent("SMS")} className='btn bg-primary text-white border'>SMS Settings</button>
                            <button onClick={() => treeComponent("Email")} className='btn bg-primary text-white border'>Email Settings</button>
                            <button onClick={() => treeComponent("Notification")} className='btn bg-primary text-white border'>Notification Settings</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {table}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Index