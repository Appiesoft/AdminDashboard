import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import FormInput from "../../../../components/FormInput"
import './CustomerDetailTable.css'
import { Link } from 'react-router-dom';
import OrderStatusForm from './model/orderStatusModel/OrderStatusForm';
import CustomerDetailHeader from './customerDetailHeader/CustomerDetailHeader';
import { useDispatch, useSelector } from 'react-redux';
import { costomerList, customerDetail } from '../../../../redux/actions';


const CustomerDetailTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const customerDetailData = store.CustomerDetail?.customerDetail
    // let customerId = store.CostomerList?.costomerList?.data?.map((itemc) => itemc.id)
    // console.log("customerDetailData", store.CostomerList?.costomerList?.data?.map((itemc) => itemc.id))

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [showLimit, setShowLimit] = useState(10)

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        TableShowBtn()
    }

    //start Model
    const [parentCustomerDetailEdit, setParentCustomerDetailEdit] = useState('');

    const openModalCustomerDetailEdit = (fill) => {
        setParentCustomerDetailEdit(fill);
    };

    const childEmptyCustomerDetailEdit = (empty) => {
        setParentCustomerDetailEdit(empty);
    };
    // end model
    // Accordions
    const [isOpen, setIsOpen] = useState(true);
    // const toggle = () => {
    //     setIsOpen(!isOpen)
    // };


    useEffect(() => {
        dispatch(customerDetail(
            {
                customerId: 68
            }
        ))
    }, [])

    useEffect(() => {
        dispatch(
            costomerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: []
            })
        );
    }, [])
    return (
        <div>
            <Row >
                <Col>
                    <h4 className="page-title">Customer Details</h4>
                </Col>
            </Row>
            <Row >
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0' >
                            <Row className="  d-flex align-items-center p-0 my-2 ms-1">
                                <Col xl={12}>
                                    <div className="text-lg-end mt-xl-0 ">
                                        <Row>
                                            <Col xl={12}>
                                                <div className='d-flex justify-content-end'>
                                                    <div className="text-lg-end mt-xl-0 mt-2">
                                                        {/* <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => toggle()}>
                                                            <div className='d-flex align-items-center'>
                                                                <h3>
                                                                    <i class="bi bi-plus me-1 text-dark" />
                                                                </h3>
                                                                <div className='text-white'>Report </div>
                                                            </div>
                                                        </Button> */}
                                                    </div>
                                                    <div className="text-lg-end mt-xl-0 mt-2">
                                                        <Button variant="white" className=" border py-0 pe-4 bg-primary text-white "
                                                        >
                                                            <div className='d-flex align-items-center'>
                                                                <h3>
                                                                    <i class="dripicons-arrow-thin-left me-2 text-dark" />
                                                                </h3>
                                                                <Link to='/customer/customerlist'>
                                                                    <div className='text-white'>BACK</div>
                                                                </Link>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CustomerDetailHeader isOpen={isOpen} />
                                </Col>
                            </Row>



                            <Row >
                                <Col className='overflow-auto '>
                                    <Table className="mb-0" size="sm">
                                        <thead>
                                            <tr className="bg-light align-middle">
                                                <th><input type="checkbox" /></th>
                                                <th scope="col" className="text-truncate">
                                                    Order#
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Order Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Order status
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Qty/Kg
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Price List
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Currency
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Amount
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Details
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Adjustment
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Due Amount
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Payment
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Remarks
                                                </th>
                                                <th scope="col" className="text-truncate">

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='align-middle'>
                                                <th scope="row"><input type="checkbox" /></th>
                                                {customerDetailData?.orders?.map((item) => {
                                                    return (
                                                        <>
                                                            <td className="text-truncate">{item.invoice_number}</td>
                                                            <td className="text-truncate">{item.order_date}</td>
                                                            <td className="text-truncate">{item.order_status}</td>
                                                            <td className="text-truncate">{item.qty}</td>
                                                            <td className="text-truncate">price list</td>
                                                            <td className="text-truncate">{item.currency}</td>
                                                            <td className="text-truncate">{item.total_amount}</td>
                                                            <td className="text-truncate">{item.details}</td>
                                                            <td className="text-truncate">{item.adjustment}</td>
                                                            <td className="text-truncate">{item.amount_due}</td>
                                                            <td className="text-truncate">payment</td>
                                                            <td className="text-truncate">{item.remark}</td>
                                                        </>
                                                    )
                                                })}
                                                <td>
                                                    <Dropdown
                                                        addonType="append"
                                                        isOpen={isSortDropdownOpen}
                                                        toggle={toggleSortDropDown}
                                                        align="end">
                                                        <Dropdown.Toggle variant="light ">
                                                            <i className="uil uil-sort-amount-down "></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='bg-light px-2'>

                                                            <Dropdown.Item className="bg-light">
                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">Barcode</Tooltip>}>

                                                                    <Link to='/customer/customerdetail' className='border p-1 px-2 bt_color_hover text-dark bg-white'>
                                                                        <i className="mdi mdi-barcode"></i>
                                                                    </Link>
                                                                </OverlayTrigger>

                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> invoice </Tooltip>}>
                                                                    <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                    >
                                                                        <i className="uil uil-invoice"></i>
                                                                    </button>
                                                                </OverlayTrigger>

                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">mini invoice </Tooltip>}>
                                                                    <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                    >
                                                                        <i className="uil uil-file-alt "></i>
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className="bg-light">
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id="overlay-example">
                                                                            Export to PDF
                                                                        </Tooltip>
                                                                    }>
                                                                    <button className="border p-1 px-2 bt_color_hover bg-white ">
                                                                        <i class="bi bi-file-earmark-x"></i>
                                                                    </button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id="overlay-example">
                                                                            Export to Excel
                                                                        </Tooltip>
                                                                    }>
                                                                    <button className="border p-1 ms-3 px-2 bt_color_hover  bg-white">
                                                                        <i class="bi bi-file-earmark-pdf"></i>
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </Table >
                                    <OrderStatusForm parentCustomerDetailEdit={parentCustomerDetailEdit} childEmptyCustomerDetailEdit={childEmptyCustomerDetailEdit} />
                                </Col >
                            </Row >
                            < Row className='mt-3' >
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
                        </Card.Body >
                    </Card >
                </Col >
            </Row >
        </div >
    )
}

export default CustomerDetailTable
