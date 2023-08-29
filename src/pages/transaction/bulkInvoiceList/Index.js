import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BulkTable from './bulkInvoiceListTable/BulkTable'
import HyperDatepicker from '../../../components/Datepicker';
import './Index.css'
import { useDispatch, useSelector } from 'react-redux';
import { storeList } from '../../../redux/actions';

const Index = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeData = store.StoreList;

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    //header
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
                    <h4 className="page-title">{"Bulk Invoice List"}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <BulkTable />
                </Col>
            </Row>
        </>
    )
}

export default Index