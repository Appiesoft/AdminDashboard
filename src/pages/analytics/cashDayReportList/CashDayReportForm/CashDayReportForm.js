import React, { useEffect, useState } from "react";
import { DatePicker, Form } from "antd"
import { Row, Col, Container, Card, Collapse, Button, Dropdown } from 'react-bootstrap';
import MainLoader from "../../../../components/MainLoader";
import { useDispatch, useSelector } from "react-redux";
import { storeList } from "../../../../redux/actions";
import ToastHandle from "../../../../helpers/toastMessage";

const CashDayReportForm = ({ isOpen, parentCashDayReportTable, closeIsopen }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const storeListData = store.StoreList?.storeList
    const cashDayReportStatus = store?.CashDayReportList?.cashDayReport?.status;
    const cashDayReportMessage = store?.CashDayReportList?.cashDayReport?.message;
    const cashDayReportLorder = store?.CashDayReportList?.loading;


    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()
    const [getStoreId, setGetStoreId] = useState("")

    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    const handlecashDayReport = () => {
        parentCashDayReportTable({
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
        closeIsopen();

    }

    useEffect(() => {
        if (cashDayReportStatus === true) {
            ToastHandle('success', cashDayReportMessage);
            closeIsopenBtn();
        } else if (cashDayReportStatus === false) {
            ToastHandle('error', cashDayReportMessage);
        }
    }, [cashDayReportStatus]);
    return (
        <>
            <Collapse in={isOpen}>
                <div>
                    <Card>
                        <Card.Body>
                            {cashDayReportLorder ? <MainLoader /> : <Row className="p-3 ">
                                <Col lg={9} className='mx-auto'>
                                    <Row className="my-3">
                                        <Col lg={12} >
                                            <Row>
                                                <Col lg={12}>
                                                    <Row className="d-flex justify-content-around align-items-center">
                                                        <Col lg={2}>
                                                            <label className="fw-bold">
                                                                Start Date - End Date
                                                            </label>
                                                        </Col>
                                                        <Col lg={7}>
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
                                                    <Row className="d-flex my-3 justify-content-around align-items-center">
                                                        <Col lg={2}>
                                                            <label className="fw-bold" >
                                                                Store Name :
                                                            </label>
                                                        </Col>
                                                        <Col lg={7}>
                                                            <Dropdown onClick={() => setTogglesBtns(!togglesBtns)} >
                                                                <Dropdown.Toggle variant="primary" className='w-100'>
                                                                    <i className="dripicons-store me-1"></i>
                                                                </Dropdown.Toggle>
                                                                {!togglesBtns ? <>
                                                                    <div className=" bg-light p-0">
                                                                        <Container className='p-3 scroll_br'>
                                                                            <Row >
                                                                                <Col lg={12}>
                                                                                    {storeFilterData?.map((item) =>
                                                                                        <>
                                                                                            <Row onClick={(e) => {
                                                                                                setStoreFilterData(storeFilterData.map((itmdx) => itmdx.store_id === item.store_id ? { ...itmdx, check: !itmdx.check } : itmdx))
                                                                                            }}>
                                                                                                <Col className={item.check ? 'd-flex border selected_store_btn my-1' : "d-flex border select_hover my-1"}>
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
                                                    <Row>
                                                        <Col lg={12} className="d-flex justify-content-center">
                                                            <Button type="submit" className="btn btn-success" onClick={() => handlecashDayReport()}>
                                                                Submit
                                                            </Button>
                                                            <Button onClick={closeIsopenBtn} className="ms-3">Close</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>}

                        </Card.Body>
                    </Card>
                </div>
            </Collapse>
        </>
        // <>
        //     <Collapse in={isOpen}>
        //         <Card>
        //             <Card.Body>
        //                 <Row className="p-3 ">
        //                     <Col lg={12}>
        //                         <Row className="my-3">
        //                             <Col lg={12} className="d-flex  justify-content-evenly" >
        //                                 <Col lg={12} >
        //                                     <Row className="mx-auto ">
        //                                         <Col lg={5}>
        //                                             <Form.Item label="Start Date - End Date" colon={false}></Form.Item>
        //                                         </Col>
        //                                         <Col lg={6}>
        //                                             <DatePicker.RangePicker
        //                                                 format="MMM Do, YYYY"
        //                                                 className="w-100 "
        //                                                 separator={"-"}
        //                                                 onChange={x => {
        //                                                     handleDateGet(x);
        //                                                 }}
        //                                                 allowClear={false}
        //                                             />
        //                                         </Col>
        //                                     </Row>
        //                                 </Col>
        //                             </Col>
        //                         </Row>
        //                         <Row>
        //                             <Col lg={12} className="text-center  mt-2">
        //                                 <Button type="submit" className="btn btn-success" onClick={() => { handlecashDayReport() }}>
        //                                     Submit
        //                                 </Button>
        //                             </Col>
        //                         </Row>
        //                         <Row className="mb-3 mt-4">
        //                             <Col lg={12} className="d-flex justify-content-evenly" >
        //                                 <Col lg={6} >
        //                                     <Row className="mx-auto d-flex align-items-center">
        //                                         <Col lg={5}>
        //                                             <label className="fw-bold" >
        //                                                 Store Name :
        //                                             </label>
        //                                         </Col>
        //                                         <Col lg={6} className='ps-2'>
        //                                             <Dropdown onClick={() => setTogglesBtns(!togglesBtns)}>
        //                                                 <Dropdown.Toggle variant="primary" className='w-100'>
        //                                                     <i className="dripicons-store me-1"></i>
        //                                                 </Dropdown.Toggle>
        //                                                 {!togglesBtns ? <>
        //                                                     <div className=" bg-light p-0 ">
        //                                                         <Container className='p-3 scroll_br'>
        //                                                             <Row >
        //                                                                 <Col lg={12}>
        //                                                                     {storeFilterData?.map((item) =>
        //                                                                         <>
        //                                                                             <Row onClick={(e) => {
        //                                                                                 setStoreFilterData(storeFilterData.map((itmdx) => itmdx.store_id === item.store_id ? { ...itmdx, check: !itmdx.check } : itmdx))
        //                                                                             }}>
        //                                                                                 <Col className={item.check ? 'd-flex border selected_store_btn my-1 bt-primary' : "d-flex border select_hover my-1"}>
        //                                                                                     <p className='mb-0 py-1' >{item.store_name}</p>
        //                                                                                 </Col>
        //                                                                             </Row>
        //                                                                         </>
        //                                                                     )}
        //                                                                 </Col>
        //                                                             </Row>
        //                                                         </Container>
        //                                                     </div>
        //                                                 </> : ''}
        //                                             </Dropdown>

        //                                         </Col>
        //                                     </Row>
        //                                 </Col>
        //                                 <Col lg={6} >

        //                                 </Col>
        //                             </Col>
        //                         </Row>
        //                     </Col>
        //                 </Row>
        //             </Card.Body>
        //         </Card>
        //     </Collapse>
        // </>
    )
}


export default CashDayReportForm
