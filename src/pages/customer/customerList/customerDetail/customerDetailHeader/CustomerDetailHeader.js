import React, { useState } from "react";
import { Row, Col, Card, Container, Form, Collapse, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreditAmountEdit from "./model/creditAmountEdit/CreditAmountEdit";
import WalletAmountEdit from "./model/walletAmountEdit/WalletAmountEdit";

const CustomerDetailHeader = ({ isOpen }) => {

    const [parentCredit, setParentCredit] = useState("")
    const CredtiModelOpen = (fill) => {
        setParentCredit(fill)
    }
    const childCloseBtn = (empty) => {
        setParentCredit(empty)
    }


    const [parentWallet, setParentWallet] = useState("")
    const WalletModelOpen = (fill) => {
        setParentWallet(fill)
    }
    const childCloseBtnWallet = (empty) => {
        setParentWallet(empty)
    }

    return (
        <>
            <Collapse in={isOpen}>
                <div>
                    <Card>
                        <Card.Body>
                            <Row >
                                <Col lg={12} className='d-flex p-2 ms-1'>
                                    <Col lg={7} >
                                        <Row>
                                            <Col lg={6}>
                                                <Row>
                                                    <Col lg={6} className='py-1' >
                                                        Customer Name:
                                                    </Col>
                                                    <Col lg={6} className='py-1 ps-0 fw-bold' >
                                                        yuy
                                                    </Col>
                                                    <Col lg={6} >
                                                        Customer Type:
                                                    </Col>
                                                    <Col lg={6} className="ps-0 fw-bold" >
                                                        Pickup & Delivery
                                                    </Col>
                                                    <Col lg={6} className='py-1'>
                                                        Price List
                                                    </Col>
                                                    <Col lg={6} className='py-1 ps-0 fw-bold'>
                                                        The Wash House Pricelist
                                                    </Col>
                                                    <Col lg={6} >
                                                        Total Revenue
                                                    </Col>
                                                    <Col lg={6} className='ps-0 fw-bold'>
                                                        INR 149.90
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={5}>
                                                <Row>
                                                    <Col lg={6} className='py-1' >
                                                        Mobile :
                                                    </Col>
                                                    <Col lg={6} className='py-1 ps-0 fw-bold'>
                                                        (878) 678-6897
                                                    </Col>
                                                    <Col lg={6} >
                                                        Amount Due :
                                                    </Col>
                                                    <Col lg={6} className='text-primary ps-0 fw-bold'>
                                                        <Link to='/customer/customerdues'>
                                                            INR 0.000
                                                        </Link>
                                                    </Col>
                                                    <Col lg={6} className='py-1' >
                                                        Total Pending:
                                                    </Col>
                                                    <Col lg={6} className='py-1 ps-0 fw-bold'>
                                                        0
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col lg={5} >
                                        <Row >
                                            <Col lg={6}>
                                                <Row className='d-flex justify-content-end'>
                                                    <Col lg={6} className='py-1'>
                                                        Email ID :
                                                    </Col>
                                                    <Col lg={6} className='ps-0 py-1 fw-bold'>
                                                        Xyz@gmail.com
                                                    </Col>
                                                    <Col lg={6} >
                                                        Store :
                                                    </Col>
                                                    <Col lg={6} className='ps-0 fw-bold ' >
                                                        The Wash House
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6}>
                                                <Row className='d-flex justify-content-end'>
                                                    <div
                                                        onClick={() => WalletModelOpen("lg")}
                                                        className='d-flex'>
                                                        <Col lg={6} className='text-primary py-1' >
                                                            Wallet (Bal):
                                                        </Col>
                                                        <Col lg={6} className='ps-0 text-primary fw-bold  py-1'>
                                                            INR 0.00
                                                        </Col>
                                                    </div>
                                                    <div onClick={() => CredtiModelOpen("lg")} className='d-flex'>
                                                        <Col lg={6} className='text-primary ' >
                                                            Credit Used :
                                                        </Col>
                                                        <Col lg={6} className='text-primary ps-0 fw-bold'>
                                                            INR 0 / 0.00
                                                        </Col>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <div>
                        <CreditAmountEdit parentCredit={parentCredit} childCloseBtn={childCloseBtn} />
                        <WalletAmountEdit parentWallet={parentWallet} childCloseBtnWallet={childCloseBtnWallet} />
                    </div>
                </div>
            </Collapse>
        </>
    )
}

export default CustomerDetailHeader