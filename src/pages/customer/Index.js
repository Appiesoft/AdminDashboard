import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomerListTable from './customerList/CustomerListTable';
import ActivePassiveCustomerListTable from './customerList/activePassiveCustomerList/ActivePassiveCustomerListTable';
import { costomerList, storeList } from '../../redux/actions';
import './Index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeListData = store.StoreList?.storeList
    console.log("storeListData", storeListData)


    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [storeFilterData, setStoreFilterData] = useState([])
    const [componentCustomer, setComponentCustomer] = useState(false)
    const [togglesBtns, setTogglesBtns] = useState(true)



    const TableShowBtn = () => {
        setComponentCustomer(!componentCustomer)
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
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
    }, [])

    useEffect(() => {
        if (storeListData) {
            setStoreFilterData(storeListData)
        }
    }, [storeListData]);

    useEffect(() => {
        dispatch(
            costomerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id)
            })
        );
    }, [searchText, page, showLimit, storeFilterData])


    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex position-relative">
                                <div className="input-group">
                                    <Dropdown onClick={() => setTogglesBtns(!togglesBtns)}>
                                        <Dropdown.Toggle variant="primary">
                                            <i className="dripicons-store me-1"></i>
                                        </Dropdown.Toggle>
                                        {!togglesBtns ? <>
                                            <div className=" bg-light p-0 dropdownbox">
                                                <Container className='p-3 scroll_br'>
                                                    <Row >
                                                        <Col lg={12}>
                                                            {storeFilterData?.map((item) => {
                                                                return (
                                                                    <>
                                                                        <Row onClick={(e) => {
                                                                            setStoreFilterData(storeFilterData.map((itmdx) => itmdx.store_id === item.store_id ? { ...itmdx, check: !itmdx.check } : itmdx))
                                                                        }}>
                                                                            <Col className={item.check ? 'd-flex border selected_store_btn my-1' : "d-flex border select_hover my-1"}>
                                                                                <p className='mb-0 py-1' >{item.store_name}</p>
                                                                            </Col>
                                                                        </Row>
                                                                    </>
                                                                )
                                                            }
                                                            )}
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </> : ''}
                                    </Dropdown>
                                </div>
                            </form>
                        </div>
                        <h4 className="page-title m-0 my-2 fw-bold">{!componentCustomer ? "Customers List" : "Active/Passive Customer List"}</h4>
                    </div>


                </Col>
            </Row >
            <Row >
                <Col>
                    {!componentCustomer ? <CustomerListTable TableShowBtn={TableShowBtn} /> : <ActivePassiveCustomerListTable TableShowBtn={TableShowBtn} />}
                </Col>
            </Row>
            <Row>
                <Col>
                    <ToastContainer />
                </Col>
            </Row>

        </>
    )
}

export default Index