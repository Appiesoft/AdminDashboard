import Item from 'antd/es/list/Item';
import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, Container, Table, Pagination } from 'react-bootstrap';
import './WalletBalanceListReportTable.css'
import FormInput from "../../../../components/FormInput"
import WalletBalanceHearderForm from '../walletBalanceHeader/WalletBalanceHearderForm';
import { useSelector, useDispatch } from 'react-redux';
import { WalletBalanceReportList, storeList } from '../../../../redux/actions';
import ShowHide from '../WalletBalanceListReportTable/model/showHideColumns/ShowHide';
import Paginations from '../../../../helpers/paginations/Pagination';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import MainLoader from '../../../../components/MainLoader';


const WalletBalanceListReportTable = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const storeListData = store.StoreList?.storeList
    const walletBalanceListReportData = store?.WalletBalanceReportList?.walletBalanceReportList?.data
    const paginationValues = store?.WalletBalanceReportList?.walletBalanceReportList?.meta?.pagination
    const walletBalanceListReportLoader = store.WalletBalanceReportList;

    // const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [togglesBtns, setTogglesBtns] = useState(true)
    const [storeFilterData, setStoreFilterData] = useState([])



    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (walletBalanceListReportData) {
        headers = DynamicHeaders(walletBalanceListReportData, ['emp_id']);
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
        var dataLists = walletBalanceListReportData
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
        const arr = walletBalanceListReportData
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
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    // Accordions
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    // form data get
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [store_Id, setStore_Id] = useState("")

    const parentWalletBalenceReportTable = (item) => {

        setDateStart(item?.startDate);
        setDateEnd(item?.endDate);
        setStore_Id(item?.getStoreId);
    }

    useEffect(() => {
        dispatch(WalletBalanceReportList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit,
            storeId: storeFilterData?.filter((itemdx) => itemdx?.check)?.map((it) => it.store_id),
        }))

    }, [page, showLimit, searchText, storeFilterData,])

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

    return (
        <div>
            <Row>
                <Col>
                    <h4>
                        Wallet Balance List Reports
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
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
                            {/* <Row>
                                <Col>
                                    <WalletBalanceHearderForm isOpen={isOpen} parentWalletBalenceReportTable={parentWalletBalenceReportTable} toggle={toggle} />
                                </Col>
                            </Row> */}
                            {walletBalanceListReportLoader.loading ? <MainLoader /> : <>
                                <Row >
                                    <Col className='overflow-auto table_container'>
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
                                                {walletBalanceListReportData?.map((item, index) => {
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

export default WalletBalanceListReportTable

