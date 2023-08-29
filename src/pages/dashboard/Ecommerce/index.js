// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import HyperDatepicker from '../../../components/Datepicker';

import Statistics from './Statistics';
import PerformanceChart from './PerformanceChart';
import RevenueChart from './RevenueChart';
import RevenueByLocationChart from './RevenueByLocationChart';
import SalesChart from './SalesChart';
import Activity from './Activity';
import Products from './Products';
import { dashboardList, storeList, todayOrderList } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import TodayOrders from './TodayOrders';
import TopCustomers from './TopCustomers';
import TopOrders from './TopOrders';

const EcommerceDashboard = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const dashboardListLoader = store?.DashboardList

    const [selectedDate, setSelectedDate] = useState(new Date());
    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    useEffect(() => {
        dispatch(storeList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 10
            }
        ))
    }, [])

    useEffect(() => {
        dispatch(dashboardList())
    }, [])

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <div className="input-group">
                                    <HyperDatepicker
                                        value={selectedDate}
                                        inputClass="form-control-light"
                                        onChange={(date) => {
                                            onDateChange(date);
                                        }}
                                    />
                                </div>
                                <Link to="#" className="btn btn-primary ms-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </Link>
                                <Link to="#" className="btn btn-primary ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </Link>
                            </form>
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={12} lg={12} >
                    <Statistics />
                </Col>
            </Row>
            {/* <Row>
                <Col xl={5} lg={6}>
                    <Statistics />
                </Col>

                <Col xl={7} lg={6}>
                    <PerformanceChart />
                </Col>
            </Row> */}

            <Row>
                <Col lg={12}>
                    <TodayOrders />
                </Col>
            </Row>

            <Row>
                <Col xl={{ span: 6, order: 1 }} lg={{ span: 12, order: 2 }}>
                    <TopCustomers />
                </Col>
                <Col xl={6} lg={{ span: 6, order: 1 }}>
                    <TopOrders />
                </Col>
            </Row>


        </>
    );
};

export default EcommerceDashboard;
