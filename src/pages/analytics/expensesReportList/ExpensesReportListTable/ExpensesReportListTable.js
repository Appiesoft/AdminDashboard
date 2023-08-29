import Item from 'antd/es/list/Item';
import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import './ExpensesReportListTable.css'
import ExpensesReportForm from '../ExpensesReportForm/ExpensesReportForm';
import { useDispatch, useSelector } from 'react-redux';
import { ExpensesReportList } from '../../../../redux/actions';

const ExpensesReportListTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
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

    // form data get
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [store_Id, setStore_Id] = useState("")

    const parentExpenseReportTable = (item) => {

        setDateStart(item?.startDate);
        setDateEnd(item?.endDate);
        setStore_Id(item?.getStoreId)
    }

    useEffect(() => {
        dispatch(
            ExpensesReportList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: store_Id,
                from: dateStart,
                to: dateEnd,
            })
        );
    }, [searchText, page, showLimit, store_Id, dateStart, dateEnd]);
    return (
        <div>
            <Row>
                <Col>
                    <h4>
                        Expenses Reports
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            <Row className="  d-flex align-items-center p-0 ms-1 my-2">
                                <Col xl={8}>
                                    <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0">
                                                        <span className="mdi mdi-magnify search-icon"></span>
                                                        <InputGroup>
                                                            <Form.Control onChange={(e) => {
                                                                setSearchText(e.target.value);
                                                            }} placeholder="Search..." className='border-0 bg-light' />
                                                            {/* <Dropdown
                                                                addonType="append"
                                                                isOpen={isSortDropdownOpen}
                                                                toggle={toggleSortDropDown}
                                                                align="end">
                                                                <Dropdown.Toggle variant="secondary">
                                                                    <i className="uil uil-sort-amount-down "></i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className='bg-light'>
                                                                    <Dropdown.Item className='bg-light'>
                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">Copy to clipboard</Tooltip>}>
                                                                            <button className='border p-1 px-2 bt_color_hover bg-white'>
                                                                                <i class="bi bi-file-earmark-richtext"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}

                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Print</Tooltip>}>
                                                                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white '>
                                                                                <i class="bi bi-printer"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className='bg-light'>
                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to PDF</Tooltip>}>
                                                                            <button className='border p-1 px-2 bt_color_hover bg-white '>
                                                                                <i class="bi bi-file-earmark-x"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}

                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to Excel</Tooltip>}>
                                                                            <button className='border p-1 ms-3 px-2 bt_color_hover  bg-white'>
                                                                                <i class="bi bi-file-earmark-pdf"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown> */}
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
                                    <ExpensesReportForm isOpen={isOpen} parentExpenseReportTable={parentExpenseReportTable} toggle={toggle} />
                                </Col>
                            </Row>
                            {/* <Row >
                                <Col className='overflow-auto table_container'>
                                    <Table className="mb-0" size="sm">
                                        <thead>
                                            <tr className="bg-light">
                                                <th scope="col" className="text-truncate">
                                                    Sr.No.
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Store Name
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Price List
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Expenses Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Month
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Payee Name
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Expenses Type
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Paid By
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Remarks
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Currency
                                                </th>
                                                <th scope="col" className="text-truncate text-primary">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records?.map((item, index) => {
                                                return (
                                                    <tr key={index} className='my-3'>
                                                        <th className="text-truncate">{item.srno}</th>
                                                        <th className="text-truncate">{item.storename}</th>
                                                        <th className="text-truncate ">{item.pricelist}</th>
                                                        <th className="text-truncate">{item.expensesdate}</th>
                                                        <th className="text-truncate">{item.month}</th>
                                                        <th className="text-truncate">{item.payeename}</th>
                                                        <th className="text-truncate">{item.expensestype}</th>
                                                        <th className="text-truncate">{item.paidby}</th>
                                                        <th className="text-truncate">{item.remarks}</th>
                                                        <th className="text-truncate">{item.currency}</th>
                                                        <th className="text-truncate">{item.amount}</th>
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
                            </Row> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ExpensesReportListTable
