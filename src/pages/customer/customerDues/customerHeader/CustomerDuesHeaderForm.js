import React, { useState } from "react";
import { Row, Col, Card, Container, Form, Collapse, Button } from 'react-bootstrap';
import WalletEdit from '../../../../pages/customer/customerDues/customerDuesTable/model/walletHistoryEdit/WalletEdit'

const CustomerDuesHeaderForm = ({ isOpen }) => {
    const [dateRange, setDateRange] = useState();
    //start Model
    const [parentEdit, setParentEdit] = useState('');

    const openModalWithScrolls = (fill) => {
        setParentEdit(fill);
    };

    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model

    return (
        <>
            <Collapse in={isOpen}>
                <div>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col className='px-4 '>
                                    <Row className=' mb-3'>
                                        <Col lg={12} className='d-flex mt-2 mb-2'>
                                            <Col lg={7} >
                                                <Row>
                                                    <Col lg={6}>
                                                        <Row>
                                                            <Col lg={6} className='py-1' >
                                                                Customer Name:
                                                            </Col>
                                                            <Col lg={6} className='py-1 ps-0 fw-bold' >
                                                                Vishal Gupta
                                                            </Col>
                                                            <Col lg={6} className='py-1'>
                                                                Price List:
                                                            </Col>
                                                            <Col lg={6} className='py-1 ps-0 fw-bold'>
                                                                The Wash House Pricelist
                                                            </Col>
                                                            <Col lg={6} >
                                                                Clear Dues :
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Row>
                                                            <Col lg={5} className='py-1' >
                                                                Mobile :
                                                            </Col>
                                                            <Col lg={7} className='py-1 ps-0 fw-bold'>
                                                                (878) 678-6897
                                                            </Col>
                                                            <Col lg={5} className='py-1' >
                                                                Total Pending:
                                                            </Col>
                                                            <Col lg={7} className='py-1 ps-0 fw-bold'>
                                                                0
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col lg={5} >
                                                <Row >
                                                    <Col lg={8}>
                                                        <Row >
                                                            <Col lg={5} className='py-1'>
                                                                Email ID :
                                                            </Col>
                                                            <Col lg={6} className='ps-0 py-1 fw-bold'>
                                                                xyz@gmail.com
                                                            </Col>
                                                            <Col lg={5} className='py-1' >
                                                                Amount Due :
                                                            </Col>
                                                            <Col lg={6} className='ps-0 fw-bold py-1 ' >
                                                                USD 79
                                                            </Col>
                                                            <Col lg={5}>
                                                                Store :
                                                            </Col>
                                                            <Col lg={6} className='ps-0 fw-bold ' >
                                                                The Wash House
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Row className='d-flex justify-content-end align-items-center'>
                                                            <Col lg={6} className='text-primary py-1' >
                                                                Wallet (Bal)
                                                            </Col>
                                                            <Col lg={6} className='ps-0 text-primary fw-bold  '>
                                                                <button className='btn px-2' onClick={() => openModalWithScrolls('lg')}>
                                                                    USD 0.00
                                                                </button>
                                                            </Col>
                                                            <Col lg={6} className='text-primary '>
                                                                Credit Used
                                                            </Col>
                                                            <Col lg={6} className='text-primary ps-0 fw-bold'>
                                                                <button className='btn px-2' onClick={() => openModalWithScrolls('lg')}>
                                                                    USD 0/0
                                                                </button>                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Col>
                                        <Row>
                                            <Col>
                                                <WalletEdit parentEdit={parentEdit} childEmptyEdit={childEmptyEdit} /></Col>
                                        </Row>

                                        <Row className="my-2">
                                            <Col>
                                                <Row>
                                                    <Col lg={7} >
                                                        <Form.Group controlId="ne_country">
                                                            <Row className="d-flex align-items-end ">
                                                                <Col lg={3}>
                                                                    <Form.Label>
                                                                        Payment Type :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={7} className='px-0'>
                                                                    <Form.Group className="" placeholder="Member Group">
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            // {...register('country')}
                                                                            aria-label="Default select example"
                                                                            isValid={false}
                                                                            isInvalid={false}
                                                                            required>
                                                                            <option hidden>Cash</option>
                                                                            <option value="1">B Checkque</option>
                                                                            <option value="2">C select</option>

                                                                        </Form.Select>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>

                                                    </Col>
                                                    <Col lg={5}>
                                                        <Form.Group controlId="ne_country">
                                                            <Row className="d-flex align-items-end ">
                                                                <Col lg={3} className='ps-0'>
                                                                    <Form.Label>
                                                                        Amount Paid :
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Form.Group className="" placeholder="Member Group">
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            // {...register('country')}
                                                                            aria-label="Default select example"
                                                                            isValid={false}
                                                                            isInvalid={false}
                                                                            required>
                                                                            <option hidden>Open this select menu</option>
                                                                            <option value="1">B select</option>
                                                                            <option value="2">C select</option>

                                                                        </Form.Select>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col lg={12} className="mx-auto d-flex justify-content-center mt-3 mb-2">
                                                <button className='btn btn-success'>Submit</button>
                                                <button className='btn btn-dark ms-3'>Back</button>


                                            </Col>
                                        </Row>
                                    </Row>

                                </Col>
                            </Row>
                            {/* <Container>
                                <Row className="p-3">
                                    <Col lg={12}>
                                        <Row className="my-3">
                                            <Col lg={12} >
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={6}>
                                                        <Form.Item label="Start Date - End Date" className="mb-0" colon={false}></Form.Item>
                                                    </Col>
                                                    <Col lg={6} className='ps-0'>
                                                        <DatePicker.RangePicker
                                                            format="MMM Do, YYYY"
                                                            className="w-100 "
                                                            value={dateRange}
                                                            separator={"-"}
                                                            onChange={x => {
                                                                setDateRange(x);
                                                            }}
                                                            allowClear={false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={12} className='d-flex mt-4'>
                                                <Col lg={6}>
                                                    <span className="fw-bold">
                                                        Including Cancelled Order
                                                    </span>
                                                    <span className="mx-1">/</span>
                                                    <span className="fw-bold"> Excluding Cancelled Order</span>
                                                </Col>
                                                <Col lg={6} className='d-flex justify-content-center'>
                                                    <span>
                                                        <Switch></Switch>

                                                    </span>
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col lg={12} className="text-center mt-5">

                                                <Button type="submit" className="btn btn-success">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container> */}
                        </Card.Body>
                    </Card>
                </div>
            </Collapse>
        </>
    )
}

export default CustomerDuesHeaderForm