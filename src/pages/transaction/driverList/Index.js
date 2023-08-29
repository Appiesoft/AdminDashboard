import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DriverList from './driverListTable/DriverList'
import HyperDatepicker from '../../../components/Datepicker';
import './Index.css'
import { useDispatch, useSelector } from 'react-redux';
import { storeList } from '../../../redux/locationStore/actions';


const Index = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeData = store.StoreList;

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    /** component connect */
    const [componentDelivery, setComponentDelivery] = useState(false)
    const TableShowBtn = () => {
        setComponentDelivery(!componentDelivery)
    }

    // header 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    useEffect(() => {
        dispatch(storeList({
            searchValue: "",
            pageNumber: 1,
            showLimit: 10
        }))
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <h4 className="page-title">Pickup Driver Report List
                        </h4>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col>
                    <DriverList />
                </Col>
            </Row>
        </>
    )
}

export default Index