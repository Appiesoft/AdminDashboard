import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { paymentList, storeList } from '../../../redux/actions';
import PaymentListTable from './paymentListTable/PaymentListTable';
import "./Index.css"

const Index = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const storeListData = store.StoreList?.storeList
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()

    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };


    useEffect(() => {
        dispatch(storeList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
    }, [])

    useEffect(() => {
        if (storeListData) {
            setStoreFilterData(storeListData)
        }
    }, [storeListData]);

    useEffect(() => {
        dispatch(
            paymentList({
                storeId: storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id),
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                orderDate: ''
            }));
    }, [searchText, page, showLimit, storeFilterData])
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <div className="input-group me-2">
                                    <DatePicker.RangePicker
                                        format="MMM Do, YYYY"
                                        className="w-100 "
                                        separator={"-"}
                                        onChange={x => {
                                            handleDateGet(x);
                                        }}
                                        allowClear={true}
                                    />
                                </div>
                                <Dropdown onClick={() => setTogglesBtns(!togglesBtns)}>
                                    <Dropdown.Toggle variant="primary">
                                        <i className="dripicons-store me-1"></i>
                                    </Dropdown.Toggle>
                                    {!togglesBtns ? <>
                                        <div className=" bg-light p-0 dropdownbox">
                                            <Container className='p-3 scroll_br'>
                                                <Row >
                                                    <Col lg={12}>
                                                        {storeFilterData?.map((item) =>
                                                            <>
                                                                <Row onClick={(e) => {
                                                                    setStoreFilterData(storeFilterData.map((itmdx) => itmdx.store_id === item.store_id ? { ...itmdx, check: !itmdx.check } : itmdx))
                                                                }}>
                                                                    <Col className={item.check ? 'd-flex border selected_store_btn my-1' : "d-flex border select_hover my-1"}>
                                                                        <p className='mb-0 py-1' >{item.short_name}</p>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
                                    </> : ''}
                                </Dropdown>
                            </form>
                        </div>
                        <h4 className="page-title">Payment List</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PaymentListTable />
                </Col>
            </Row>
        </>)
}

export default Index