import React, { useState } from "react";
import { DatePicker, Form } from "antd"
import { Row, Col, Card, Collapse, Button } from 'react-bootstrap';

const AttendanceReportForm = ({ isOpen }) => {
    const [dateRange, setDateRange] = useState();

    return (
        <>
            <Collapse in={isOpen}>
                <Card>
                    <Card.Body>
                        <Row className="p-3 ">
                            <Col lg={12}>
                                <Row className="my-3">
                                    <Col lg={12} className="d-flex  justify-content-evenly" >
                                        <Col lg={6} >
                                            <Row className="mx-auto ">
                                                <Col lg={5}>
                                                    <Form.Item label="Start Date - End Date" colon={false}></Form.Item>
                                                </Col>
                                                <Col lg={6}>
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
                                        <Col lg={6}>
                                            <Row className="mx-auto">
                                                <Col lg={4}>
                                                    <Form.Item label="Employee" colon={false}></Form.Item>
                                                </Col>
                                                <Col lg={6}>
                                                    <select class="chosen-select form-control" name="employee" data-placeholder="Choose a employee...">
                                                        {/* <option value=""> Feburary  </option */}
                                                        <option value="1">--None---</option>
                                                        <option value="2" selected="">All</option>
                                                        <option value="3">The Washp</option>
                                                    </select>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} className="text-center  mt-2">
                                        <Button type="submit" className="btn btn-success">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Collapse>
        </>
    )
}


export default AttendanceReportForm
