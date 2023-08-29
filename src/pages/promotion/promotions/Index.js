import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import CoupantListTable from './promoCouponsList/CoupantListTable'
import CoupanNewEnteryForm from './coupansNewEntry/CoupanNewEnteryForm'

const Index = () => {
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    return (
        <>
            <Row className=''>
                <Col>
                    <h4 className="page-title">{!componentShow ? "Coupons List" : "New Record"}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!componentShow ? <CoupantListTable TableShowBtn={TableShowBtn} /> : <CoupanNewEnteryForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>

    )
}

export default Index