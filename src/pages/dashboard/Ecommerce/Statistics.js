// @flow
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../components/MainLoader';

// components
import StatisticsWidget from '../../../components/StatisticsWidget';
import { dashboardList } from '../../../redux/actions';

const Statistics = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const dashboardListData = store?.DashboardList?.dashboardList?.data
    const dashboardListLoader = store?.DashboardList

    useEffect(() => {
        dispatch(dashboardList())
    }, [])

    return (
        <>
            {dashboardListLoader?.loading ? <MainLoader />

                :
                <>
                    <Row>
                        <Col sm={3}>
                            <StatisticsWidget
                                icon="dripicons-cart"
                                description="Number of Customers"
                                title="Today Order"
                                stats="00"
                                trend={{
                                    textClass: 'text-danger',
                                    // icon: 'mdi mdi-arrow-up-bold',
                                    value: (dashboardListData?.todays_income == "0") || (dashboardListData?.todays_income == "") ? "00" : "USD " + dashboardListData?.todays_income,
                                    time: 'Todays Income',
                                }}></StatisticsWidget>
                        </Col>

                        <Col sm={3}>
                            <StatisticsWidget
                                icon="dripicons-clock"
                                description="Number of Orders"
                                title="Total Pending"
                                stats={(dashboardListData?.total_pending_order == "0") || (dashboardListData?.total_pending_order == "") ? "00" : dashboardListData?.total_pending_order}
                                trend={{
                                    textClass: 'text-danger',
                                    // icon: 'mdi mdi-arrow-down-bold',
                                    value: (dashboardListData?.todays_pending_order == "0") || (dashboardListData?.todays_pending_order == "") ? "00" : "USD " + dashboardListData?.todays_pending_order,
                                    time: 'Todays Pending',
                                }}></StatisticsWidget>
                        </Col>
                        <Col sm={3}>
                            <StatisticsWidget
                                icon="bi bi-truck"
                                description="Revenue"
                                title="Total Delivered"
                                stats={(dashboardListData?.total_delivered_order == "0") || (dashboardListData?.total_delivered_order == "") ? "00" : dashboardListData?.total_delivered_order}
                                trend={{
                                    textClass: 'text-danger',
                                    // icon: 'mdi mdi-arrow-down-bold',
                                    value: (dashboardListData?.todays_delivery_request == "0") || (dashboardListData?.todays_delivery_request == "") ? "00" : "USD " + dashboardListData?.todays_delivery_request,
                                    time: 'Today Delivery',
                                }}></StatisticsWidget>
                        </Col>

                        <Col sm={3}>
                            <StatisticsWidget
                                icon="bi bi-people"
                                description="Growth"
                                title="Total Customers"
                                stats={(dashboardListData?.total_customer == "0") || (dashboardListData?.total_customer == "") ? "00" : dashboardListData?.total_customer}
                                trend={{
                                    textClass: 'text-danger',
                                    // icon: 'mdi mdi-arrow-up-bold',
                                    value: (dashboardListData?.new_customer == "0") || (dashboardListData?.new_customer == "") ? "00" : "USD " + dashboardListData?.new_customer,
                                    time: 'New Customer',
                                }}></StatisticsWidget>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={3}>
                            <StatisticsWidget
                                icon="mdi mdi-currency-usd"
                                description="Revenue"
                                title="Unpaid Order"
                                stats={(dashboardListData?.total_unpaid_order == "0") || (dashboardListData?.total_unpaid_order == "") ? "00" : dashboardListData?.total_unpaid_order}
                                trend={{
                                    textClass: 'text-danger',
                                    // icon: 'mdi mdi-arrow-down-bold',
                                    value: (dashboardListData?.total_unpaid_amount == "0") || (dashboardListData?.total_unpaid_amount == "") ? "00" : "USD " + dashboardListData?.total_unpaid_amount,
                                    time: 'Since last month',
                                }}></StatisticsWidget>
                        </Col>

                        <Col sm={3}>
                            <StatisticsWidget
                                icon="bi bi-truck-flatbed"
                                description="Growth"
                                title="Total Pickup Request"
                                stats={(dashboardListData?.total_pickup_request == "0") || (dashboardListData?.total_pickup_request == "") ? "00" : dashboardListData?.total_pickup_request}
                                trend={{
                                    textClass: 'text-danger',
                                    // icon: 'mdi mdi-arrow-up-bold',
                                    value: (dashboardListData?.todays_pickup_request == "0") || (dashboardListData?.todays_pickup_request == "") ? "00" : "USD " + dashboardListData?.todays_pickup_request,
                                    time: 'Todays Pickup Request',
                                }}></StatisticsWidget>
                        </Col>
                        <Col sm={3}>
                            <StatisticsWidget
                                icon="bi bi-truck"
                                description="Revenue"
                                title="Total Delivery Request"
                                stats={(dashboardListData?.total_delivery_request == "0") || (dashboardListData?.total_delivery_request == "") ? "00" : dashboardListData?.total_delivery_request}
                                trend={{
                                    textClass: 'text-danger',
                                    // icon: 'mdi mdi-arrow-down-bold',
                                    value: (dashboardListData?.todays_delivery_request == "0") || (dashboardListData?.todays_delivery_request == "") ? "00" : "USD " + dashboardListData?.todays_delivery_request,
                                    time: 'Todays Delivery Request',
                                }}></StatisticsWidget>
                        </Col>
                    </Row>
                </>
            }
        </>
    );
};

export default Statistics;
