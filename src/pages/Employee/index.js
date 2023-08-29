import React, { useState, useEffect } from 'react';
import NewEntery from './newEnter/NewEnter';
import EmployeeList from './employeeList/EmployeeList';
import { Row, Col, Dropdown, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import "./Index.css"
import { employeeList } from '../../redux/actions';
import { storeList } from '../../redux/actions';

const Index = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeListData = store.StoreList?.storeList

    // console.log(storeListData, 'storeListData')


    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [storeFilterData, setStoreFilterData] = useState([])
    const [tableBtn, setTableBtn] = useState(false);
    const [togglesBtns, setTogglesBtns] = useState(true)
    console.log(storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id), storeFilterData, 'store')


    const showBtn = () => {
        setTableBtn(!tableBtn);
    };

    const restBtn = () => {
        // alert("jdk")
        setTableBtn(false)
    }


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
            employeeList({
                storeId: storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id),
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }));
    }, [searchText, page, showLimit, storeFilterData])


    return (
        <>

            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
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
                                                            {storeFilterData?.map((item) =>
                                                                <>
                                                                    <Row onClick={(e) => {
                                                                        setStoreFilterData(storeFilterData.map((itmdx) => itmdx.store_id === item.store_id ? { ...itmdx, check: !itmdx.check } : itmdx))
                                                                    }}>
                                                                        <Col className={item.check ? 'd-flex border selected_store_btn my-1' : "d-flex border select_hover my-1"}>
                                                                            <p className='mb-0 py-1' >{item.store_name}</p>
                                                                        </Col>
                                                                    </Row>
                                                                </>
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
                        <h4 className="page-title fw-bold">{!tableBtn ? 'Employee List' : 'New Record'}</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>{!tableBtn ? <EmployeeList showBtn={showBtn} /> : <NewEntery showBtn={showBtn} restBtn={restBtn} />}</Col>
            </Row>
        </>
    );
};

export default Index;
