
import Item from 'antd/es/list/Item';
import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import './ProfitAndLossTable.css'
import ProfitAndLossForm from '../ProfitAndLossForm/ProfitAndLossForm';
import { useSelector, useDispatch } from 'react-redux';
import { ProfitAndLossReportList } from '../../../../redux/actions';
import MainLoader from '../../../../components/MainLoader';
import Paginations from '../../../../helpers/paginations/Pagination';

const ProfitAndLossTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const profitAndLossReportListData = store?.ProfitAndLossReportList?.profitAndLossReportList?.data
    const paginationValues = store?.ProfitAndLossReportList?.profitAndLossReportList?.meta?.pagination
    const profitAndLossReportLoader = store?.ProfitAndLossReportList
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
        setIsOpen(true)
    };

    const closeIsOpen = () => {
        setIsOpen(false)
    }

    // form data get
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [store_Id, setStore_Id] = useState("")
    const [cancelOrder, setcancelOrder] = useState("")

    const parentProfitAndLossReportTable = (item) => {
        setDateStart(item?.startDate);
        setDateEnd(item?.endDate);
        setStore_Id(item?.getStoreId);
        setcancelOrder(item?.cancelOrder);
    }

    useEffect(() => {
        dispatch(
            ProfitAndLossReportList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                from: dateStart,
                to: dateEnd,
                storeId: store_Id,
                cancelOrder: cancelOrder

            })
        )

    }, [searchText, page, showLimit, dateStart, dateEnd, store_Id, cancelOrder])

    return (
        <>
            <Row>
                <Col>
                    <h4>
                        Profit And Loss Report
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
                                    <ProfitAndLossForm isOpen={isOpen} parentProfitAndLossReportTable={parentProfitAndLossReportTable} closeIsOpen={closeIsOpen} />
                                </Col>
                            </Row>
                            {profitAndLossReportLoader?.loading ? <MainLoader /> :
                                <>
                                    <Row >
                                        <Col className='overflow-auto table_container'>
                                            <Table className="mb-0 " size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th scope="col" className="text-truncate">
                                                            Sr.No.
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Transaction Date
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Income Amount (Including Unpaid Order)
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Expenses Amount
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Amount
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {profitAndLossReportListData?.map((item, index) => {
                                                        return (
                                                            <tr key={index} className='my-3'>
                                                                <th className="text-truncate">{index + 1}</th>
                                                                <th className="text-truncate">{item.transaction_date}</th>
                                                                <th className="text-truncate ">{item.income_amount}</th>
                                                                <th className="text-truncate">{item.expenses_amount}</th>
                                                                <th className="text-truncate">{item.amount}</th>
                                                            </tr>
                                                        );
                                                    })}
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
                                                                value={showLimit}
                                                                className="form-select form-select-sm"
                                                                key="select"
                                                                onChange={(e) => {
                                                                    setShowLimit(e.target.value);
                                                                }}>
                                                                <option value='10'>10</option>
                                                                <option value='25'>25</option>
                                                                <option value='50'>50</option>
                                                                <option value='100'>100</option>
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
        </>
    )
}

export default ProfitAndLossTable
