import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import './IncomeReportListTable.css'
import IncomeReportForm from '../IncomeReportForm/IncomeReportForm';
import { useDispatch, useSelector } from 'react-redux';
import { IncomeReportList } from '../../../../redux/actions';
import ShowHide from '../IncomeReportListTable/model/showHideColumns/ShowHide';
import Paginations from '../../../../helpers/paginations/Pagination';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import MainLoader from '../../../../components/MainLoader';



const IncomeReportListTable = () => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const incomeReportListData = store?.IncomeReportList?.incomeReportList?.data
    const paginationValues = store?.IncomeReportList?.incomeReportList?.meta?.pagination
    const incomeReportListLoader = store.IncomeReportList;

    // const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (incomeReportListData) {
        headers = DynamicHeaders(incomeReportListData, ['emp_id']);
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
        var dataLists = incomeReportListData
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
        const arr = incomeReportListData
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

    const closeToggle = (res) => {
        if (res === 1) {
            toggle()

        }
    }

    // form data get
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [store_Id, setStore_Id] = useState("")
    const [cancelOrder, setcancelOrder] = useState("")

    const parentIncomeReportTable = (item) => {
        setDateStart(item?.startDate);
        setDateEnd(item?.endDate);
        setStore_Id(item?.getStoreId);
        setcancelOrder(item?.cancelOrder);
    }

    useEffect(() => {
        dispatch(IncomeReportList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit,
            storeId: store_Id,
            from: dateStart,
            to: dateEnd,
            cancelOrder: cancelOrder
        }))

    }, [page, showLimit, searchText, dateStart, dateEnd, store_Id, cancelOrder])

    return (
        <div>
            <Row>
                <Col>
                    <h4>
                        Income Reports
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
                                        data={incomeReportListData}
                                        headers={headers}
                                        target="_blank"
                                    />
                                )}
                                <Col xl={8}>
                                    <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
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
                                    </form>
                                </Col>

                                <Col xl={4}>
                                    <div className="text-lg-end mt-xl-0 ">
                                        <Row>
                                            <Col xl={12}>
                                                <div className="text-lg-end mt-xl-0 ">
                                                    <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => toggle()}>
                                                        <div className='d-flex align-items-center'>
                                                            <h3>
                                                                <i class="bi bi-plus me-1 text-dark" />
                                                            </h3>
                                                            <div>Report</div>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <IncomeReportForm isOpen={isOpen} parentIncomeReportTable={parentIncomeReportTable} closeToggle={closeToggle} />
                                </Col>
                            </Row>
                            {incomeReportListLoader.loading ? <MainLoader /> : <>
                                <Row >
                                    <Col className='overflow-auto table_container'>
                                        <Table className="mb-0 " ref={componentRef} size="sm">

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
                                                {incomeReportListData?.map((item, index) => {
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

export default IncomeReportListTable
