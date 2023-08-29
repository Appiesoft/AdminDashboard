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
import MainLoader from '../../../components/MainLoader';
import { dashboardList } from '../../../redux/actions';

const TopOrders = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state)
    const topOrdersData = store?.DashboardList?.dashboardList?.data?.top_orders
    const dashboardListLoader = store?.DashboardList


    useEffect(() => {
        dispatch(dashboardList())
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
                                                        <h4 className="mb-0 me-2 align-items-center ustify-content-center"><i class="bi bi-boxes"></i>
                                                        </h4>
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-0 me-2">Top Orders</h3>
                                                    </div>
                                                </Col>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        {dashboardListLoader?.loading ? <MainLoader /> :
                            <Row>
                                <Col>
                                    <Row className="h-100 position-relative">
                                        <Col className=" overflow-auto ">
                                            <Table className="mb-0 table">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                    {topOrdersData?.map((item) => {
                                                        const topOrdersPercentage = (item.top_orders / item?.total_orders) * 100
                                                        return (
                                                            <tr className="align-middle">
                                                                <td>
                                                                    < Row>
                                                                        <Col lg={4}>
                                                                            <h6>{item.customer_name} ({item.top_orders}/{item?.total_orders})</h6>
                                                                        </Col>
                                                                        <Col lg={7}>
                                                                            <div class="progress">
                                                                                <div class="progress-bar" role="progressbar" style={{ width: `${Math.round(topOrdersPercentage)}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col lg={1}>{Math.round(topOrdersPercentage)}%</Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </Row >

    )
}

export default TopOrders