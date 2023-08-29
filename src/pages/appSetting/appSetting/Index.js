import React, { useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import AppSettingTable from './appSettingTable/AppSettingTable'
import HomePageSettingForm from './homePageSettingForm/HomePageSettingForm'

const Index = () => {
    const [tableBtn, setTableBtn] = useState(false);

    const showBtn = () => {
        setTableBtn(!tableBtn);
    };
    return (
        <div>
            <Row>
                <Col>
                    <h4 className="page-title fw-bold">{!tableBtn ? 'App Settings' : 'Home Page Settings'}</h4>
                </Col>
            </Row>
            <Row>
                <Col>{!tableBtn ? <AppSettingTable showBtn={showBtn} /> : <HomePageSettingForm showBtn={showBtn} />}</Col>
            </Row>

        </div>
    )
}

export default Index