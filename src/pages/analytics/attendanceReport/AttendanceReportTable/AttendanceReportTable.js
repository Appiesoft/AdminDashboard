import Item from 'antd/es/list/Item';
import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import './AttendanceReportTable.css'
import AttendanceReportForm from '../AttendanceReportForm/AttendanceReportForm';

const AttendanceReportTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        TableShowBtn()
    }

    // Accordions
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen)
    };


    const records = [
        { sno: '1', employeename: 'wash', designation: 'The House', date: 'xyz ', clockin: '2023', clockout: 'xyz ', hours: '2023' }
        , { sno: '1', employeename: 'wash', designation: 'The House', date: 'xyz ', clockin: '2023', clockout: 'xyz ', hours: '2023' }
        , { sno: '1', employeename: 'wash', designation: 'The House', date: 'xyz ', clockin: '2023', clockout: 'xyz ', hours: '2023' }
        , { sno: '1', employeename: 'wash', designation: 'The House', date: 'xyz ', clockin: '2023', clockout: 'xyz ', hours: '2023' }
        , { sno: '1', employeename: 'wash', designation: 'The House', date: 'xyz ', clockin: '2023', clockout: 'xyz ', hours: '2023' }
        , { sno: '1', employeename: 'wash', designation: 'The House', date: 'xyz ', clockin: '2023', clockout: 'xyz ', hours: '2023' }
        ,
        { sno: '1', employeename: 'wash', designation: 'The House', date: 'xyz ', clockin: '2023', clockout: 'xyz ', hours: '2023' }

    ];
    return (
        <>
            <Row>
                <Col>
                    <h4>
                        Attendance Report List
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            <Row className="d-flex align-items-center p-0 ps-2 my-2">
                                <Col xl={8}>
                                    <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0">
                                                        <span className="mdi mdi-magnify search-icon"></span>
                                                        <InputGroup>
                                                            <Form.Control placeholder="Search..." className='border-0 bg-light' />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </form>
                                </Col>

                                <Col xl={4}>
                                    <div className="text-lg-end mt-xl-0 ">
                                        <Row>
                                            <Col xl={12}>
                                                <div className="text-lg-end mt-xl-0 ">
                                                    <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => toggle()}>
                                                        <div className='d-flex align-items-center'>
                                                            <h3>
                                                                <i class="bi bi-plus me-1 text-dark" />
                                                            </h3>
                                                            <div>Report</div>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AttendanceReportForm isOpen={isOpen} />
                                </Col>
                            </Row>

                            <Row >
                                <Col className='overflow-auto table_container'>
                                    <Table className="mb-0" size="sm">
                                        <thead>
                                            <tr className="bg-light">
                                                <th scope="col" className="text-truncate">
                                                    S.No.
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Employee Name
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Designation
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Clock In
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Clock Out
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Hours
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records?.map((item, index) => {
                                                return (
                                                    <tr key={index} className='my-3'>
                                                        {/* <th className="text-truncate">{item.order}</th> */}
                                                        <th className="text-truncate">{item.sno}</th>
                                                        <th className="text-truncate">{item.employeename}</th>
                                                        <th className="text-truncate ">{item.designation}</th>
                                                        <th className="text-truncate">{item.date}</th>
                                                        <th className="text-truncate">{item.clockin}</th>
                                                        <th className="text-truncate">{item.clockout}</th>
                                                        <th className="text-truncate">{item.hours}</th>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <Row>
                                        <Col className="d-flex align-items-center mt-2 mb-2">
                                            <div>
                                                <p className='mb-0 me-2' >Display</p>
                                            </div>
                                            <FormInput name="select" type="select" className="form-select form-select-sm" key="select">
                                                <option>10</option>
                                                <option>25</option>
                                                <option>50</option>
                                                <option>100</option>
                                            </FormInput>
                                            <div>
                                                <p className='mb-0 ms-2' >Page <span className='fw-bold'>1 of 10</span></p>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 ms-2 me-2' >Go to page:
                                                </p>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    className='input_Style px-1 py-1'
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col className='d-flex justify-content-end'>
                                    <Pagination>
                                        <Pagination className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                        <Pagination className='pagination_style bg-primary text-white mx-1'>{1}</Pagination>
                                        <Pagination className='pagination_style btn-hover'>{2}</Pagination>
                                        <Pagination className='pagination_style mx-1 btn-hover'>{3}</Pagination>
                                        <Pagination className='pagination_style btn-hover'>{4}</Pagination>
                                        <Pagination className='pagination_style mx-1 btn-hover'>{5}</Pagination>
                                        <Pagination className='pagination_style'>...</Pagination>
                                        <Pagination className='pagination_style mx-1 btn-hover'>{10}</Pagination>
                                        <Pagination className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                    </Pagination>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default AttendanceReportTable

