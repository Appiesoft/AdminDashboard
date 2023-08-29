import React, { useEffect, useState } from "react";
import { DatePicker, Form } from "antd"
import { Row, Col, Card, Collapse, Button, Container, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { storeList } from "../../../../redux/actions";
import ToastHandle from "../../../../helpers/toastMessage";


const ProductWiseReportForm = ({ isOpen, parentProductWiseReportTable, toggle }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeListData = store.StoreList?.storeList
    const productWiseReportListStatus = store?.ProductWiseReportList?.productWiseReportList?.status;
    const productWiseReportListMessage = store?.ProductWiseReportList?.productWiseReportList?.message;


    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [dateRangeStart, setDateRangeStart] = useState();
    const [dateRangeEnd, setDateRangeEnd] = useState()
    const [getStoreId, setGetStoreId] = useState("")
    const [serviceId, setServiceId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [productId, setProductId] = useState("")


    const handleDateGet = (x) => {
        if (x) {
            setDateRangeStart({ ...dateRangeStart, startDate: x[0]?.$d.toISOString().slice(0, 10) })
            setDateRangeEnd({ ...dateRangeEnd, endDate: x[1]?.$d.toISOString().slice(0, 10) })
        }
    }

    const getProductWiseReport = () => {
        parentProductWiseReportTable({
            startDate: dateRangeStart?.startDate,
            endDate: dateRangeEnd?.endDate,
            getStoreId: getStoreId,
            serviceId: serviceId,
            categoryId: categoryId,
            productId: productId
        })
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


    useEffect(() => {
        if (productWiseReportListStatus === true) {
            ToastHandle('success', productWiseReportListMessage);
            toggle();
        } else if (productWiseReportListStatus === false) {
            ToastHandle('error', productWiseReportListMessage);
        }
    }, [productWiseReportListStatus]);
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
                                                <Col lg={5}>
                                                    <Form.Item label="Services :" colon={false}></Form.Item>
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
                                <Row className="my-3">
                                    <Col lg={12} className="d-flex justify-content-evenly" >
                                        <Col lg={6} >
                                            <Row className="mx-auto">
                                                <Col lg={5}>
                                                    <Form.Item label="Category :" colon={false}></Form.Item>
                                                </Col>
                                                <Col lg={6} className='ps-2'>
                                                    <select class="chosen-select form-control" name="Category" data-placeholder="Choose a Category...">
                                                        {/* <option value=""> Feburary  </option */}
                                                        <option value="1">Regular</option>
                                                        <option value="2" selected="">Down</option>
                                                        <option value="3">Small</option>

                                                    </select>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6}>
                                            <Row className="mx-auto">
                                                <Col lg={12} className="d-flex" >

                                                    <Col lg={5}>
                                                        <Form.Item label="Products :" colon={false}></Form.Item>
                                                    </Col>
                                                    <Col lg={6} className='ps-2'>
                                                        <select class="chosen-select form-control" name="month" data-placeholder="Choose a Services...">
                                                            <option value="1">Twin</option>
                                                            <option value="2" selected="">Wash</option>
                                                            <option value="3">King</option>
                                                        </select>
                                                    </Col>
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
                                                                </Container >
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
                                    <Col lg={11} className="text-center  mt-2">
                                        <Button type="submit" className="btn btn-success" onClick={() => getProductWiseReport()}  >
                                            Submit
                                        </Button>
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

export default ProductWiseReportForm
