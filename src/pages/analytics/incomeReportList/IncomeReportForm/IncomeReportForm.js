import React, { useState, useEffect } from "react";
import { DatePicker, Form, Switch } from "antd"
import { Row, Col, Card, Container, Collapse, Dropdown, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { storeList } from "../../../../redux/actions";
import ToastHandle from '../../../../helpers/toastMessage';

const IncomeReportForm = ({ isOpen, parentIncomeReportTable, closeToggle }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const storeListData = store.StoreList?.storeList
    const incomeReportListStatus = store?.IncomeReportList?.incomeReportList?.status;
    const incomeReportListMessage = store?.IncomeReportList?.incomeReportList?.message;

    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()
    const [getStoreId, setGetStoreId] = useState("")
    const [cancelOrder, setCancelOrder] = useState(false);

    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    const getIncomeReportDataBtn = () => {
        parentIncomeReportTable({
            startDate: dateRangeStart?.startDate,
            endDate: dateRangeEnd?.endDate,
            cancelOrder: cancelOrder,
            getStoreId: getStoreId
        });

    }
    useEffect(() => {
        if (storeListData) {
            setStoreFilterData(storeListData)
        }
    }, [storeListData]);

    useEffect(() => {
        if (storeFilterData) {
            setGetStoreId(storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id))
        }
    }, [storeFilterData])


    useEffect(() => {
        if (incomeReportListStatus === true) {
            ToastHandle('success', incomeReportListMessage);
            closeToggle(1);
            dispatch(storeList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10
            }))
        } else if (incomeReportListStatus === false) {
            ToastHandle('error', incomeReportListMessage);
        }
    }, [incomeReportListStatus]);
    return (
        <>
            <Collapse in={isOpen}>
                <div>
                    <Card>
                        <Card.Body>
                            <Row className="p-3 ">
                                <Col lg={12}>
                                    <Row className="mb-3 mt-3">
                                        <Col lg={12} className="d-flex  justify-content-evenly" >
                                            <Col lg={6} >
                                                <Row className="mx-auto ">
                                                    <Col lg={5}>
                                                        <Form.Item label="Start Date - End Date" colon={false}></Form.Item>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <DatePicker.RangePicker
                                                            format="MMM Do, YYYY"
                                                            className="w-100 "
                                                            separator={"-"}
                                                            onChange={x => {
                                                                handleDateGet(x);
                                                            }}
                                                            allowClear={false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6}>
                                                <Row className="mx-auto">
                                                    <Col lg={5}>
                                                        {cancelOrder ? <span className="fw-bold text-danger">
                                                            Including Cancelled Order
                                                        </span> : <span className="fw-bold text-success"> Excluding Cancelled Order</span>
                                                        }
                                                    </Col>
                                                    <Col lg={6}>
                                                        <span>
                                                            <Switch
                                                                name='tip_status'
                                                                onChange={(e) => setCancelOrder(e)}
                                                            ></Switch>

                                                        </span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3 mt-4">
                                        <Col lg={12} className="d-flex justify-content-evenly" >
                                            <Col lg={6} >
                                                <Row className="mx-auto d-flex align-items-center">
                                                    <Col lg={5}>
                                                        <label className="fw-bold" >
                                                            Store Name :
                                                        </label>
                                                    </Col>
                                                    <Col lg={6} className='ps-2'>
                                                        <Dropdown onClick={() => setTogglesBtns(!togglesBtns)}>
                                                            <Dropdown.Toggle variant="primary" className='w-100'>
                                                                <i className="dripicons-store me-1"></i>
                                                            </Dropdown.Toggle>
                                                            {!togglesBtns ? <>
                                                                <div className=" bg-light p-0 ">
                                                                    <Container className='p-3 scroll_br'>
                                                                        <Row >
                                                                            <Col lg={12}>
                                                                                {storeFilterData?.map((item) =>
                                                                                    <>
                                                                                        <Row onClick={(e) => {
                                                                                            setStoreFilterData(storeFilterData.map((itmdx) => itmdx.store_id === item.store_id ? { ...itmdx, check: !itmdx.check } : itmdx))
                                                                                        }}>
                                                                                            <Col className={item.check ? 'd-flex border selected_store_btn my-1 bt-primary' : "d-flex border select_hover my-1"}>
                                                                                                <p className='mb-0 py-1' >{item.store_name}</p>
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

                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6} >

                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12} className="text-center  mt-2">
                                            <Button type="submit" className="btn btn-success" onClick={() => getIncomeReportDataBtn()}>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Collapse>
        </>
    )
}

export default IncomeReportForm
