import React, { useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';

import BannerListTable from './bannerListTable/BannerListTable'
import AddBannerForm from './addBannerForm/AddBannerForm'

const Index = () => {
    const [tableBtn, setTableBtn] = useState(false);

    const showBtn = () => {
        setTableBtn(!tableBtn);
    };
    return (
        <div>
            <Row>
                <Col>
                    <h4 className="page-title fw-bold">{!tableBtn ? 'Banner List' : 'Add Banner'}</h4>
                </Col>
            </Row>
            <Row>
                <Col>{!tableBtn ? <BannerListTable showBtn={showBtn} /> : <AddBannerForm showBtn={showBtn} />}</Col>
            </Row>

        </div>
        // <div>
        //     <BannerListTable />
        //     <AddBannerForm />
        // </div>
    )
}

export default Index