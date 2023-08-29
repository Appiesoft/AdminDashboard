import Item from 'antd/es/list/Item';
import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Container, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import './WalletDeleteHistoryReportListTable.css'
import FormInput from "../../../../components/FormInput"
import { useSelector, useDispatch } from 'react-redux';
import { storeList, WalletDeleteHistoryReportList } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import Paginations from '../../../../helpers/paginations/Pagination';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import MainLoader from '../../../../components/MainLoader';
import ShowHide from '../../datewiseReportList/datewiseReportListTable/model/showHideColumns/ShowHide';




const WalletDeleteHistoryReportListTable = () => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const storeListData = store.StoreList?.storeList
    const walletDelteHistoryData = store?.WalletDeleteHistoryReportList?.walletDeleteHistoryReportList?.data
    const paginationValues = store?.WalletDeleteHistoryReportList?.walletDeleteHistoryReportList?.meta?.pagination
    const walletDeleteHistoryReportListStatus = store?.WalletDeleteHistoryReportList?.walletDeleteHistoryReportList?.status
    const walletDeleteHistoryReportListMessage = store?.WalletDeleteHistoryReportList?.walletDeleteHistoryReportList?.message
    const dateWiseReportListLoader = store?.WalletDeleteHistoryReportList;


    const [storeFilterData, setStoreFilterData] = useState([])
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)
    const [cancelOrder, setCancelOrder] = useState(null)
    const [store_Id, setStore_Id] = useState("")

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    let headers = [];
    if (walletDelteHistoryData) { headers = DynamicHeaders(walletDelteHistoryData, ['emp_id']); }
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
        var dataLists = walletDelteHistoryData
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
        const arr = walletDelteHistoryData
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
        dispatch(WalletDeleteHistoryReportList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit,
            storeId: storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id),

        }))
    }, [searchText, page, showLimit, storeFilterData])

    useEffect(() => {
        dispatch(storeList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
    }, [page, showLimit, searchText])

    useEffect(() => {
        if (storeListData) {
            setStoreFilterData(storeListData)
        }
    }, [storeListData]);


    return (
        <div><Row className='mt-2'>
            <h4>Wallet Delete History Report</h4>
        </Row>

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-2'>
                            <Row className='d-flex align-items-center my-2'>
                                <Col>
                                    <Col lg={12} className="d-flex  px-2">
                                        <Row>
                                            <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0">
                                                <span className="mdi mdi-magnify search-icon"></span>
                                                <InputGroup>
                                                    <Form.Control placeholder="Search..." className='border-0 bg-light'
                                                        onChange={(e) => {
                                                            setSearchText(e.target.value)
                                                        }} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
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
                            </Row>

                            {dateWiseReportListLoader.loading ? <MainLoader /> : <>
                                <Row >
                                    <Col className='overflow-auto'>
                                        <Table className="mb-0" ref={componentRef} size="sm">
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
                                                {walletDelteHistoryData?.map((item, index) => {
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


                            {/* <Row >
                                <Col className='overflow-auto table_container'>
                                    <Table className="mb-0 mt-2" size="sm">
                                        <thead>
                                            <tr className="bg-light">

                                                <th scope="col" className="text-truncate">
                                                    Customer Name
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Trans ID
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Delete Date
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Amount Deleted
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Payment Remark
                                                </th>
                                                <th scope="col" className="text-truncate">
                                                    Done By
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records?.map((item, index) => {
                                                return (
                                                    <tr key={index}>

                                                        <th className="text-truncate">{item.customername}</th>
                                                        <th className="text-truncate">{item.transid}</th>
                                                        <th className="text-truncate">{item.deletedate}</th>
                                                        <th className="text-truncate">{item.amountdeleted}</th>
                                                        <th className="text-truncate">{item.paymentremark}</th>
                                                        <th className="text-truncate">{item.doneby}</th>

                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <Col>
                                    <Row>
                                        <Col className="d-flex align-items-center mt-2 mb-2">
                                            <div>
                                                <p className='mb-0 me-2' >Display</p>
                                            </div>
                                            <FormInput name="select" type="select" className="form-select form-select-sm" key="select">
                                                <option>10</option>
                                                <option>25</option>
                                                <option>50</option>
                                                <option>100</option>
                                            </FormInput>
                                            <div>
                                                <p className='mb-0 ms-2' >Page <span className='fw-bold'>1 of 10</span></p>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 ms-2 me-2' >Go to page:
                                                </p>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    className='input_Style px-1 py-1'
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col className='d-flex justify-content-end'>
                                    <Pagination>
                                        <Pagination className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                        <Pagination className='pagination_style bg-primary text-white mx-1'>{1}</Pagination>
                                        <Pagination className='pagination_style btn-hover'>{2}</Pagination>
                                        <Pagination className='pagination_style mx-1 btn-hover'>{3}</Pagination>
                                        <Pagination className='pagination_style btn-hover'>{4}</Pagination>
                                        <Pagination className='pagination_style mx-1 btn-hover'>{5}</Pagination>
                                        <Pagination className='pagination_style'>...</Pagination>
                                        <Pagination className='pagination_style mx-1 btn-hover'>{10}</Pagination>

                                        <Pagination className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                    </Pagination>
                                </Col>
                            </Row> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default WalletDeleteHistoryReportListTable
