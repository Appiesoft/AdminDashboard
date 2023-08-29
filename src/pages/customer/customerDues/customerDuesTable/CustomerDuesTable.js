import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
// import './CustomerDue.css'
import { Link } from 'react-router-dom';
import FormInput from "../../../../components/FormInput"
import CustomerDuesHeaderForm from '../customerHeader/CustomerDuesHeaderForm';
import WalletEdit from './model/walletHistoryEdit/WalletEdit';
import { useSelector, useDispatch } from 'react-redux';
import { customerDue } from '../../../../redux/actions';
import MainLoader from '../../../../components/MainLoader';
import Paginations from '../../../../helpers/paginations/Pagination';

const CustomerDuesTable = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const customerDueData = store?.CustomerDue?.customerDue?.data
    const paginationValues = store.CustomerDue?.customerDue?.meta?.pagination;
    const customerDueLoader = store?.CustomerDue

    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        // TableShowBtn()
    }
    //start Model
    const [parentEdit, setParentEdit] = useState('');

    const openModalWithScrolls = (fill) => {
        setParentEdit(fill);
    };

    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model
    // Accordions
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    useEffect(() => {
        dispatch(customerDue({
            customerId: 370
        }))
    }, [])

    return (
        <div>
            <Row >
                <Col className=''>
                    <h4>Customer Due</h4>
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
                                                            <Form.Control placeholder="Search..." className='border-0 bg-light' />
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
                                                <div className='d-flex justify-content-end'>
                                                    <div className="text-lg-end mt-xl-0 mt-2">
                                                        <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => toggle()}>
                                                            <div className='d-flex align-items-center'>
                                                                <h3>
                                                                    <i class="bi bi-plus me-1 text-dark" />
                                                                </h3>
                                                                <div className='text-white'>Report </div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                    <div className="text-lg-end mt-xl-0 mt-2">
                                                        <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => btnChild()}>
                                                            <div className='d-flex align-items-center'>
                                                                <h3>
                                                                    <i class="bi bi-plus me-1 text-dark" />
                                                                </h3>
                                                                <Link to='/customer/customerdetail'>
                                                                    <div className='text-white'>Customer Detail</div>
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
                                    <CustomerDuesHeaderForm isOpen={isOpen} /></Col>
                            </Row>

                            {customerDueLoader?.loading ? <MainLoader /> :
                                <>
                                    <Row >
                                        <Col className='overflow-auto table_container'>
                                            <Table className="mb-0" size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th><input type="checkbox" /></th>
                                                        <th scope="col" className="text-truncate">
                                                            Order#
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Order Date
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Oreder Status
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Qlt/Lbs
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {customerDueData?.orders?.map((item) =>
                                                    (
                                                        <tr >
                                                            <td><input type="checkbox" /></td>
                                                            <td className="text-truncate">{item.invoice_number}</td>
                                                            <td className="text-truncate">{item.delivery_date}</td>
                                                            <td className="text-truncate">{item.order_status_name}</td>
                                                            <td className="text-truncate">{item.qty}</td>
                                                            <td className="text-truncate">{item.currency}</td>
                                                            <td className="text-truncate">{item.total_amount}</td>
                                                            <td className="text-truncate">{item.details}</td>
                                                            <td className="text-truncate">{item.adjustment}</td>
                                                            <td className="text-truncate">{item.amount_due}</td>
                                                            <td className="text-truncate">payment</td>
                                                            <td className="text-truncate">{item.remark}</td>
                                                        </tr>
                                                    )

                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    {paginationValues && (
                                        <Col lg={12}>
                                            <Row className="mt-3">
                                                <Col>
                                                    <Row>
                                                        <Col className="d-flex align-items-center mt-2 mb-2">
                                                            <div>
                                                                <p className="mb-0 me-2">Display</p>
                                                            </div>
                                                            <FormInput
                                                                name="select"
                                                                type="select"
                                                                className="form-select form-select-sm"
                                                                key="select"
                                                                onChange={(e) => {
                                                                    setShowLimit(e.target.value);
                                                                }}>
                                                                <option>10</option>
                                                                <option>25</option>
                                                                <option>50</option>
                                                                <option>100</option>
                                                            </FormInput>
                                                            <div>
                                                                <p className="mb-0 ms-2">
                                                                    Page{' '}
                                                                    <span className="fw-bold">{`${page} of ${paginationValues.total_page}`}</span>
                                                                </p>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <p className="mb-0 ms-2 me-2">Go to page:</p>
                                                                <Form.Control
                                                                    max={paginationValues.total_page}
                                                                    min={1}
                                                                    value={page}
                                                                    required
                                                                    type="number"
                                                                    className="input_Style px-1 py-1"
                                                                    onChange={(e) => {
                                                                        setPage(e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col className="d-flex justify-content-end">
                                                    <Paginations
                                                        currentPage={parseInt(paginationValues?.current_page)}
                                                        totalCount={paginationValues?.total_data}
                                                        pageSize={showLimit}
                                                        onPageChange={(page) => setPage(page)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    )}
                                </>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div >
    )
}


export default CustomerDuesTable