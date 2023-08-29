import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import AutoMatedPromoListTable from './automatePromoList/AutoMatedPromoListTable'
import AutoNewEnterForm from './autoNewEnterForm/AutoNewEnterForm'
const Index = () => {
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    return (
        <>
            <Row className=''>
                <Col>
                    <h4 className="page-title">{!componentShow ? "Automated Promo List" : "New Record"}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!componentShow ? <AutoMatedPromoListTable TableShowBtn={TableShowBtn} /> : <AutoNewEnterForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>
    )
}

export default Index