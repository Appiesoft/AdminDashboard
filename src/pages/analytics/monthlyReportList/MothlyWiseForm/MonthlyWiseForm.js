import React, { useState } from "react";
import { DatePicker, Form, Switch } from "antd"
import { Row, Col, Card, Container, Collapse, Button } from 'react-bootstrap';

const MonthlyWiseForm = ({ isOpen }) => {

    const [dateRange, setDateRange] = useState();

    return (
        <>
            <Collapse in={isOpen}>
                <div>
                    <Card>
                        <Card.Body>
                            <Container>
                                <Row className="p-3 ">
                                    <Col lg={12}>
                                        <Row className="my-3">
                                            <Col lg={12} className="d-flex" >

                                                <Col lg={6}>
                                                    <Form.Item label="Month" colon={false}></Form.Item>
                                                </Col>
                                                <Col lg={6} className='ps-2'>
                                                    <select class="chosen-select form-control" name="month" data-placeholder="Choose a Services...">
                                                        {/* <option value=""> Feburary  </option */}
                                                        <option value="1"> January  </option>
                                                        <option value="2" selected="">Feburary  </option>
                                                        <option value="3">March  </option>
                                                        <option value="4">April  </option>
                                                        <option value="5">May  </option>
                                                        <option value="6">June  </option>
                                                        <option value="7">July  </option>
                                                        <option value="8">August  </option>
                                                        <option value="9">September  </option>
                                                        <option value="10">October  </option>
                                                        <option value="11">November  </option>
                                                        <option value="12">December  </option>
                                                    </select>
                                                </Col>

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
                                            <Col lg={12} className="text-center  mt-5">
                                                <Button type="submit" className="btn btn-success">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>

                </div>
            </Collapse>
        </>
    )
}

export default MonthlyWiseForm
