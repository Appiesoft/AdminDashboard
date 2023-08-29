import React, { useEffect, useState } from 'react'
import { Row, Col, } from 'react-bootstrap';
import PackageTable from './packagesListTable/PackageTable'
import AssignForm from './assignPackageForm/AssignForm'
import './Index.css'
import { useDispatch, useSelector } from 'react-redux';
import { storeList } from '../../../redux/locationStore/actions';

const Index = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeData = store.StoreList;


    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [componentShow, setComponentShow] = useState(false)

    const TableShowBtn = () => {
        setComponentShow(!componentShow)
    }
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

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
    return (<>
        <Row>
            <Col>
                <div className="page-title-box">
                    <h4 className="page-title">{!componentShow ? "Package List" : "Assign Package"}</h4>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                {!componentShow ? <PackageTable TableShowBtn={TableShowBtn} /> : <AssignForm TableShowBtn={TableShowBtn} />}
            </Col>
        </Row>

    </>
    )
}

export default Index