import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import PaymentAdjustmentTypeListTable from './paymentAdjustmentTypeList/PaymentAdjustmentTypeListTable'
import NewEnteryForm from './newEntery/NewEnteryForm'
const Index = () => {
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    return (
        <>
            <Row >
                <Col>
                    <h4 className="page-title">{!componentShow ? "Payment Adjustment Type List" : "New Record"}</h4>
                </Col>
            </Row>
            <Row >
                <Col>
                    {!componentShow ? <PaymentAdjustmentTypeListTable TableShowBtn={TableShowBtn} /> : <NewEnteryForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>
    )
}

export default Index