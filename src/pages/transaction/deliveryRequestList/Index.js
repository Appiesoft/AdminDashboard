import React, { useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import DeliveryTable from './deliveryRequesTable/DeliveryTable'
import CreateForm from './createDeliveryRequest/CreateForm'
import './Index.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storeList } from '../../../redux/locationStore/actions';
import { DatePicker } from 'antd';
import { diliveryRequestList } from '../../../redux/actions';


const Index = ({ showBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const storeListdata = store.StoreList;


    const [dateRangeStart, setDateRangeStart] = useState(Date());
    const [dateRangeEnd, setDateRangeEnd] = useState(Date())
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    /** component connect */
    const [componentDelivery, setComponentDelivery] = useState(false)
    const TableShowBtn = () => {
        setComponentDelivery(!componentDelivery)
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

    useEffect(() => {
        dispatch(
            storeList({
                searchValue: "",
                pageNumber: 1,
                showLimit: 10
            })
        );
    }, []);

    useEffect(() => {
        dispatch(
            diliveryRequestList(
                {
                    pageNumber: page,
                    showLimit: showLimit,
                    from: dateRangeStart?.startDate,
                    to: dateRangeEnd?.endDate,
                }
            )
        );
    }, [page, showLimit, dateRangeStart, dateRangeEnd]);

    return (
        <>
            <Row>
                <Col>
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
                                                    {storeListdata.storeList.map((item) =>
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
                        <h4 className="page-title">{!componentDelivery ? "Delivery Request List" : "Create Delivery Request"}</h4>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col>
                    {!componentDelivery ? <DeliveryTable TableShowBtn={TableShowBtn} /> : <CreateForm TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
        </>
    )
}

export default Index