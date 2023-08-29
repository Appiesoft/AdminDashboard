import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import WalletPromoListTable from './walletPromoList/WalletPromoListTable'
import WalletNewEnteryForm from './walletNewEntery/WalletNewEnteryForm'
const Index = () => {
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    return (
        <>
            <Row className=''>
                <Col>
                    <h4 className="page-title">{!componentShow ? "Wallet Promo List" : "New Record"}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!componentShow ? <WalletPromoListTable TableShowBtn={TableShowBtn} /> : <WalletNewEnteryForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>

    )
}

export default Index