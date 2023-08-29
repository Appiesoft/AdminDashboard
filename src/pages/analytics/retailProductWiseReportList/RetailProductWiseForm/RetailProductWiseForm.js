import React, { useEffect, useState } from "react";
import { DatePicker, Form } from "antd"
import { Row, Col, Card, Container, Collapse, Button, Dropdown } from 'react-bootstrap';
import { ProducttList, storeList } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToastHandle from "../../../../helpers/toastMessage";


const RetailProductWiseForm = ({ isOpen, parentRetailReportTable, closeIsopen }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const storeListData = store.StoreList?.storeList

    const retailProductReportListStatus = store?.RetailProductWiseReportList?.retailProductReportList?.status;
    const retailProductReportListMessage = store?.RetailProductWiseReportList?.retailProductReportList?.message;

    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()
    const [getStoreId, setGetStoreId] = useState("")
    // const [getProductId, setProductId] = useState("");

    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    const handleRetailReport = () => {
        parentRetailReportTable({
            startDate: dateRangeStart?.startDate,
            endDate: dateRangeEnd?.endDate,
            getStoreId: getStoreId
        });

    }

    useEffect(() => {
        dispatch(storeList({
            searchValue: '',
            pageNumber: 1,
            showLimit: 10
        }))
    }, [])
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

    const closeIsopenBtn = () => {
        closeIsopen()
    }

    useEffect(() => {
        if (retailProductReportListStatus === true) {
            ToastHandle('success', retailProductReportListMessage);
            closeIsopenBtn();
        } else if (retailProductReportListStatus === false) {
            ToastHandle('error', retailProductReportListMessage);
        }
    }, [retailProductReportListStatus]);

    useEffect(() => {
        dispatch(ProducttList({
            searchValue: "",
            pageNumber: 1,
            showLimit: 10,
            storeId: [],
            from: "",
            to: ""
        }))
    }, [])

    return (
        <>
            <Collapse in={isOpen}>
                <Card>
                    <Card.Body>
                        <Row className="p-3 ">
                            <Col lg={12}>
                                <Row className="my-3">
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
                                                <Col lg={4}>
                                                    <Form.Item label="Retail Products :" colon={false}></Form.Item>
                                                </Col>
                                                <Col lg={6}>
                                                    <select class="chosen-select form-control" name="services" data-placeholder="Choose a Services...">
                                                        {/* <option value=""> Feburary  </option */}
                                                        <option value="1">Comfortable</option>
                                                        <option value="2" selected="">Select Services</option>
                                                        <option value="3">BLANKETS</option>
                                                    </select>
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
                                        <Button type="submit" className="btn btn-success" onClick={() => { handleRetailReport() }}>
                                            Submit
                                        </Button>
                                        <Button onClick={closeIsopenBtn} className='ms-3'>Close</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Collapse>
        </>
    )
}


export default RetailProductWiseForm
