import Item from 'antd/es/list/Item';
import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import './TipReportListTable.css'
import FormInput from "../../../../components/FormInput"
import TipReportHeaderForm from '../tipReportHeader/TipReportHeaderForm';
import { useSelector, useDispatch } from 'react-redux';
import { TipReportList } from '../../../../redux/actions';
import Paginations from '../../../../helpers/paginations/Pagination';
import MainLoader from '../../../../components/MainLoader';

const TipReportListTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const tipreportListData = store?.TipReportList?.tipReportList?.data
    const paginationValues = store?.TipReportList?.tipReportList?.meta?.pagination
    const tipreportListDataLoader = store?.TipReportList

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
        setIsOpen(true)
    };

    const closeIsOpen = () => {
        setIsOpen(false)
    }

    // form data get
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [store_Id, setStore_Id] = useState("")

    const parentTipReportTable = (item) => {
        console.log(item, 'item')

        setDateStart(item?.dateStart);
        setDateEnd(item?.dateEnd);
        setStore_Id(item?.getStoreId);
    }

    useEffect(() => {
        dispatch(TipReportList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit,
            from: dateStart,
            to: dateEnd,
            storeId: store_Id
        }))

    }, [searchText, page, showLimit, dateStart, dateEnd, store_Id])


    return (
        <div><Row className='mt-2'>
            <h4>Tip Report</h4>
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
                                    <TipReportHeaderForm isOpen={isOpen} parentTipReportTable={parentTipReportTable} closeIsOpen={closeIsOpen} />
                                </Col>
                            </Row>

                            {tipreportListDataLoader?.loading ? <MainLoader /> : <>
                                <Row >
                                    <Col className='overflow-auto table_container'>
                                        <Table className="mb-0 " size="sm">
                                            <thead>
                                                <tr className="bg-light">

                                                    <th scope="col" className="text-truncate">
                                                        S.No.
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Store Name
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Source
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Tip Date
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Order No.
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Amount Type
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Amount
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tipreportListData?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th className="text-truncate">{index + 1}</th>
                                                            <th className="text-truncate">{item.store_name}</th>
                                                            <th className="text-truncate">{item.source}</th>
                                                            <th className="text-truncate"></th>
                                                            <th className="text-truncate">{item.order_id}</th>
                                                            <th className="text-truncate">{item.amount_type}</th>
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

        </div>

    )
}


export default TipReportListTable