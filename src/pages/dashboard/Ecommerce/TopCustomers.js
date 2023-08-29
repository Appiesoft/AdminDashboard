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
const TopCustomers = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state)
    const topCustoersData = store?.DashboardList?.dashboardList?.data?.top_customer
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
                                            <div className="text-lg-start mt-xl-0 ">
                                                <Col className="d-flex align-items-center mt-2 mb-2">
                                                    <div>
                                                        <h4 className="mb-0 me-2 align-items-center ustify-content-center"><i class="bi bi-people"></i>
                                                        </h4>
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-0 me-2">Top Customers</h3>
                                                    </div>
                                                </Col>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        {dashboardListLoader?.loading ? <MainLoader /> :
                            <Row className="h-100 position-relative">
                                <Col className=" overflow-auto ">
                                    <Table className="mb-0 table">
                                        <thead>
                                            <tr className="bg-light">
                                                <th scope="col" className="text-truncate">
                                                    #
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Name
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Contact
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Email
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Total Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topCustoersData?.map((item, index) => {
                                                return (
                                                    <tr className="align-middle">
                                                        <td className="text-truncate">{index + 1}</td>
                                                        <td className="text-truncate">{item?.customer_name}</td>
                                                        <td className="text-truncate">{item?.mobile}</td>
                                                        <td className="text-truncate">{item?.email_id}</td>
                                                        <td className="text-truncate">{item?.total}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default TopCustomers