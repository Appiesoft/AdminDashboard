import Item from 'antd/es/list/Item';
import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Container, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import './DueAmountReportListTable.css'
import { dueAmountReportList, storeList } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Paginations from '../../../../helpers/paginations/Pagination';
import ShowHide from '../model/showHideColumns/ShowHide';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import MainLoader from '../../../../components/MainLoader';
import ToastHandle from '../../../../helpers/toastMessage';


const DueAmountReportListTable = () => {

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const storeListData = store.StoreList?.storeList
    const dueAmountReportListData = store?.DueAmountReportList?.dueAmountReportList?.data
    const dueAmountReportListStatus = store?.DueAmountReportList?.dueAmountReportList?.status
    const dueAmountReportListMessage = store?.DueAmountReportList?.dueAmountReportList?.message
    const paginationValues = store?.DueAmountReportList?.dueAmountReportList?.meta?.pagination
    const dueAmountReportListLoader = store.DueAmountReportList;


    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');



    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };


    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (dueAmountReportListData) {
        headers = DynamicHeaders(dueAmountReportListData, ['emp_id']);
    }

    const commanActions = (type) => {
        if (type === 4) {
            setIsCsvDownload(true);
        } else if (type === 1) {
            copyToClipboard();
        } else if (type === 3) {
            handleGeneratePdf();
        } else if (type === 2) {
            handlePrint();
        }
        setIsDropdownOpen(false);
    };

    const toogleActions = () => {
        setIsCsvDownload(false);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleGeneratePdf = () => {
        var dataLists = dueAmountReportListData
        exportPdf(dataLists, headers, '');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions


    //model sidebar model hide and show
    const [parentShowHide, setParentShowHide] = useState('');

    const openModalWithClass = (fill) => {
        setIsDropdownOpen(!isDropdownOpen);

        setParentShowHide(fill);
    };
    const childEmptyShowHide = (empty) => {
        setParentShowHide(empty);
    };

    // start table hide and show
    const [checkBoxStatus, setCheckBoxStatus] = useState({
        order_id: true,
    });
    const [tableShowHide, setTableShowHide] = useState({
        check_box: '',
        order: '',
        price_list: '',
    });
    const handleOnChange = (e) => {
        e.preventDefault();
        const { name, checked } = e.target;
        setTableShowHide({ ...tableShowHide, [name]: checked });
    };

    const getChecKBoxData = () => {
        const arr = dueAmountReportListData
        const obj = Array.isArray(arr) && arr[0];
        const checkData = typeof obj === 'object' && Object.keys(obj);
        let finalData = checkData ? checkData : [];
        finalData = finalData.filter((itmdx, indx) => {
            if (checkBoxStatus[itmdx] !== false) {
                return true;
            } else {
                return false;
            }
        });
        return finalData;
    };
    // end  table hide and show

    useEffect(() => {
        dispatch(
            dueAmountReportList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id),
            })
        );
    }, [searchText, page, showLimit, storeFilterData]);

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
        if (dueAmountReportListStatus === true) {
            ToastHandle('success', dueAmountReportListMessage);
        } else if (dueAmountReportListStatus === false) {
            ToastHandle('error', dueAmountReportListMessage);
        }
    }, [dueAmountReportListStatus]);

    return (
        <div>
            <Row>
                <Col>
                    <h4>
                        Due Amount Report List
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            <Row className="  d-flex align-items-center p-0 ps-2 my-2">
                                {isCsvDownload && (
                                    <CSVDownload
                                        filename={'patternList.csv'}
                                        data={dueAmountReportListData}
                                        headers={headers}
                                        target="_blank"
                                    />
                                )}
                                <Col xl={12}>
                                    <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
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
                                        <Col>
                                            <Col xl={12}>

                                                <div className="text-lg-end mt-xl-0 ">
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
                                                    </div>
                                                </div>
                                            </Col>
                                        </Col>
                                    </form>
                                </Col>
                            </Row>
                            {dueAmountReportListLoader.loading ? <MainLoader /> : <>
                                <Row >
                                    <Col className='overflow-auto '>
                                        <Table ref={componentRef} className="mb-0" size="sm">
                                            <thead>
                                                <tr className="bg-light">
                                                    {getChecKBoxData().map((itmde) => (
                                                        <th scope="col" className="text-truncate">
                                                            {itmde.split('_').join(' ').toUpperCase()}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dueAmountReportListData?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='align-middle'>
                                                            {getChecKBoxData().map((itmde) => {
                                                                if (itmde === 'emp_id') {
                                                                    return <th scope="row">{item[itmde]}</th>;
                                                                } else {
                                                                    return <td className="text-truncate">{item[itmde]}</td>;
                                                                }
                                                            })}
                                                        </tr>
                                                    );
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
                                                            value={showLimit}
                                                            className="form-select form-select-sm"
                                                            key="select"
                                                            onChange={(e) => {
                                                                setShowLimit(e.target.value);
                                                            }}>
                                                            <option value='10'>10</option>
                                                            <option value='25'>25</option>
                                                            <option value='50'>50</option>
                                                            <option value='100'>100</option>
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
                                )}</>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div>
                <ShowHide
                    checkBoxStatus={checkBoxStatus}
                    setCheckBoxStatus={setCheckBoxStatus}
                    parentShowHide={parentShowHide}
                    childEmptyShowHide={childEmptyShowHide}
                    handleOnChange={handleOnChange}
                />
            </div>
        </div>
    )
}

export default DueAmountReportListTable

