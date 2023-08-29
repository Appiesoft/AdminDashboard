import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import DiscountChargeListTable from './discountChargesList/DiscountChargeListTable'
import DiscountNewEntryForm from './discountNewEntry/DiscountNewEntryForm'
const Index = () => {
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    return (
        <>
            <Row className=''>
                <Col>
                    <h4 className="page-title">{!componentShow ? "Discount/Charges List" : "New Record"}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!componentShow ? <DiscountChargeListTable TableShowBtn={TableShowBtn} /> : <DiscountNewEntryForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>
    )
}

export default Index