import React, { useEffect, useState } from 'react'
import HyperDatepicker from '../../../components/Datepicker';
import { Link } from 'react-router-dom';
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { storeList } from '../../../redux/locationStore/actions';
import { DatePicker, Form } from "antd"
import { ordersList } from '../../../redux/actions';




const Header = ({ showBtn }) => {
    const [dateRange, setDateRange] = useState();

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
    const btnTransfer = () => {
        showBtn();
    };
    //start Model
    const [parentEdit, setParentEdit] = useState('');


    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model
    const getOrderList = () => {
        dispatch(
            storeList({
                searchValue: "",
                pageNumber: 1,
                showLimit: 10
            })
        );
    };
    useEffect(() => {
        getOrderList();
    }, []);

    useEffect(() => {
        if (storeListData) {
            setStoreFilterData(storeListData)
        }
    }, [storeListData]);


    useEffect(() => {
        dispatch(
            ordersList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id),
                orderDate: '',
            })
        );
    }, [searchText, page, showLimit, storeFilterData])


    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

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
                                {/* <div className="input-group"> */}
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
                                {/* </div> */}
                            </form>
                        </div>
                        <h4 className="page-title">Order List</h4>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Header