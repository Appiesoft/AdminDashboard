import React, { useState, useEffect } from "react";
import { DatePicker, Form } from "antd"
import { Row, Col, Card, Container, Collapse, Dropdown, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { storeList } from "../../../../redux/actions";
import ToastHandle from "../../../../helpers/toastMessage";
import MainLoader from '../../../../components/MainLoader';


const DueOrderListForm = ({ isOpen, parentOrderListTable, toggle }) => {
    // const [dateRange, setDateRange] = useState();
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const storeListData = store.StoreList?.storeList
    const dueOrderListStatus = store?.DueOrderListReducer?.dueOrderList?.status
    const dueOrderListMessage = store?.DueOrderListReducer?.dueOrderList?.message
    const dueOrderListLoader = store?.DueOrderListReducer?.loading


    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()
    const [deliveryOrderchecked, setDeliveryOrderChecked] = useState(false);
    const [getStoreId, setGetStoreId] = useState("")


    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    const getOrderListDataBtn = () => {
        parentOrderListTable({
            startDate: dateRangeStart?.startDate,
            endDate: dateRangeEnd?.endDate,
            deliveryOrderchecked: deliveryOrderchecked,
            getStoreId: getStoreId
        });
    }



    useEffect(() => {

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

    useEffect(() => {
        if (dueOrderListStatus === true) {
            ToastHandle('success', dueOrderListMessage);
            toggle();
            dispatch(storeList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10
            }))
        } else if (dueOrderListStatus === false) {
            ToastHandle('error', dueOrderListMessage);
        }
    }, [dueOrderListStatus]);

    return (
        <>

            <Collapse in={isOpen}>
                <Card>
                    <Card.Body>
                        {dueOrderListLoader ? <MainLoader /> : <Form noValidate>
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
                                                        <label className="fw-bold" >
                                                            Delivery Order :
                                                        </label>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <input type="checkbox"
                                                            required
                                                            onChange={(e) => setDeliveryOrderChecked(e.target.checked)}
                                                        />
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
                                            </Col>
                                            <Col lg={6} >
                                                <Row className="mx-auto d-flex align-items-center">
                                                    <Col lg={5}>
                                                        <label className="fw-bold mt-1" >
                                                            No of Due Orders :
                                                        </label>
                                                    </Col>
                                                    <Col lg={6} className='ps-2'>

                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12} className="text-center  mt-2">
                                            <Button type="submit" className="btn btn-success" onClick={() => getOrderListDataBtn()}>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>}

                    </Card.Body>
                </Card>
            </Collapse>
        </>
    )
}

export default DueOrderListForm
