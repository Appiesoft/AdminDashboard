import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import PaymentTypeListTable from './paymentTypeList/PaymentTypeListTable'
import NewEnteryForm from './newEntery/NewEnteryForm'

const Index = () => {
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    return (
        <>
            <Row className=''>
                <Col>
                    <h4 className="page-title">{!componentShow ? "Payment Type List" : "New Record"}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!componentShow ? <PaymentTypeListTable TableShowBtn={TableShowBtn} /> : <NewEnteryForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>
    )
}

export default Index