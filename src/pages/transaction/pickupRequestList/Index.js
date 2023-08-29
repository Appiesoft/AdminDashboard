import React, { useEffect, useState } from 'react'
import PickupTable from './pickupRequestListTable/PickupTable'
import CreatePickupForm from './createPickupRequest/CreatePickupForm'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HyperDatepicker from '../../../components/Datepicker';
import './Index.css'
import { storeList } from '../../../redux/locationStore/actions';
import { useDispatch, useSelector } from 'react-redux';
import { pickupRequestList } from '../../../redux/actions';
import { DatePicker, Form } from "antd"
import dayjs from 'dayjs';



const Index = ({ showBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const storeListdata = store.StoreList?.storeList

    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [storeFilterData, setStoreFilterData] = useState([])
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [componentShow, setComponentShow] = useState(false)
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()

    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    //header
    const btnTransfer = () => {
        showBtn();
    };
    //start Model
    const [parentEdit, setParentEdit] = useState('');

    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };

    const handleStore = (datat) => {
        console.log(datat, "ddd")
    }
    // end model
    const getStoreList = () => {
        dispatch(
            storeList({
                searchValue: "",
                pageNumber: 1,
                showLimit: 10
            }
            )
        );
    };
    useEffect(() => {
        getStoreList();
    }, []);

    useEffect(() => {
        if (storeListdata) {
            setStoreFilterData(storeListdata)
        }
    }, [storeListdata]);

    useEffect(() => {
        dispatch(pickupRequestList({
            pageNumber: page,
            showLimit: showLimit,
            from: dateRangeStart?.startDate,
            to: dateRangeEnd?.endDate,
        }))
    }, [page, showLimit, dateRangeStart, dateRangeEnd])

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
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
                                    <Dropdown
                                        addonType="append"
                                        isOpen={isSortDropdownOpen}
                                        toggle={toggleSortDropDown}
                                        align="end">
                                        <Dropdown.Toggle variant="primary ">
                                            <i className="dripicons-store me-1"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className=' ms-2 px-2 '>
                                            <Container className='p-3 scroll_br'>
                                                <Row >
                                                    <Col lg={12}>
                                                        {storeListdata?.map((item) =>
                                                            <>
                                                                <Row>
                                                                    <Col className='d-flex border select_hover my-1'>
                                                                        <p className='mb-0 py-1 '>{item.short_name}</p>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </form>
                            </div>

                        </div>
                        <h4 className="page-title">{!componentShow ? "Pickup Request List" : "Create Pickup Request"}</h4>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col>
                    {!componentShow ? <PickupTable TableShowBtn={TableShowBtn} /> : <CreatePickupForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
        </>
    )
}

export default Index