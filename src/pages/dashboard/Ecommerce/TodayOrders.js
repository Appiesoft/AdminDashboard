import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Form,
    Card,
    Table,
    Modal,
    InputGroup,
    Dropdown,
    OverlayTrigger,
    Tooltip,
    Button,
    Pagination,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../../components';
import MainLoader from '../../../components/MainLoader';
import Paginations from '../../../helpers/paginations/Pagination';
import { dashboardList, orderStatus, todayOrderList } from '../../../redux/actions';

const TodayOrders = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state)
    const todayOrdersData = store?.TodayOrderList?.todayOrderList?.data
    const paginationValues = store?.TodayOrderList?.todayOrderList?.meta?.pagination;
    const todayOrdersLoader = store?.TodayOrderList
    const OrderStatusData = store?.OrderStatus?.orderStatus?.data

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [statusFilter, setStatusFilter] = useState([])
    const [orderStatusDropdown, setOrderStatusDropdown] = useState(null)

    const todayDate = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const todayMonths = new Date();
    let month = months[todayMonths.getMonth()];

    useEffect(() => {
        dispatch(dashboardList())
    }, [])

    useEffect(() => {
        dispatch(todayOrderList(
            {
                search: searchText,
                pageNumber: page,
                showLimit: showLimit,
                orderStatus: parseInt(orderStatusDropdown)
            }
        ))
    }, [searchText, page, showLimit, orderStatusDropdown])

    useEffect(() => {
        setStatusFilter(OrderStatusData)
    }, [OrderStatusData])

    useEffect(() => {
        dispatch(orderStatus())
    }, [])


    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <Card.Body className='py-2 px-3'>
                        <Row className=" d-flex align-items-center p-0 ps-2 mb-2">
                            <Col xl={9}>
                                <div className="text-lg-start mt-xl-0 ">
                                    <Row className=" ">
                                        <Col xl={12}>
                                            <div className="text-lg-start mt-xl-0 mt-2">
                                                <Col className="d-flex align-items-center mt-2 mb-2">
                                                    <div>
                                                        <h4 className="mb-0 me-2 align-items-center ustify-content-center"><i class="bi bi-truck"></i>
                                                        </h4>
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-0 me-2">Today Orders ({todayDate.getDate()}-{month}-{todayDate.getFullYear()})
                                                        </h3>
                                                    </div>
                                                </Col>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xl={1}>
                                <form className="row gy-2 gx-2 align-items-center justify-content-xl-end justify-content-between">
                                    <div className="col-auto">
                                        <div className="d-flex align-items-center w-auto border-radios " >
                                            <Row>
                                                <Form.Select onChange={(e) => {
                                                    setOrderStatusDropdown(e.target.value)
                                                }}>
                                                    {statusFilter?.map((item) => (
                                                        <>
                                                            <option hidden >--Status--</option>
                                                            <option value={item?.id}>{item?.status}</option>
                                                        </>
                                                    ))}
                                                </Form.Select>
                                            </Row>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                            <Col xl={2}>
                                <form className="row gy-2 gx-2 align-items-center justify-content-xl-end justify-content-between">
                                    <div className="col-auto">
                                        <div className="d-flex align-items-center w-auto">
                                            <Row>
                                                <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0">
                                                    <span className="mdi mdi-magnify search-icon"></span>
                                                    <InputGroup>
                                                        <Form.Control
                                                            placeholder="Search..."
                                                            className="border-0 bg-light"
                                                            onChange={(e) => {
                                                                setSearchText(e.target.value);
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        {
                            todayOrdersLoader?.loading ? <MainLoader /> :
                                <>
                                    <Row className="h-100 position-relative">
                                        <Col className=" overflow-auto ">
                                            <Table className="mb-0 table">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th><input type="checkbox" /></th>
                                                        <th scope="col" className="text-truncate">
                                                            Invoice
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Laundry Store
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Customer Name
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Delivery Date & Time
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Address
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Status
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Qty/Kg
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {todayOrdersData?.map((item) => {
                                                        return (
                                                            <tr className="align-middle">
                                                                <td><input type="checkbox" /></td>
                                                                <td className="text-truncate">{item?.invoice_no}</td>
                                                                <td className="text-truncate">{item?.store_name}</td>
                                                                <td className="text-truncate">{item?.customer_name}</td>
                                                                <td className="text-truncate">{item?.delivery_date}</td>
                                                                <td className="text-truncate">{item?.address}</td>
                                                                <td className="text-truncate">{item?.order_status}</td>
                                                                <td className="text-truncate">{item?.qty}</td>
                                                            </tr>
                                                        )
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
                    </Card.Body >
                </Card >
            </Col >
        </Row >

    )
}

export default TodayOrders