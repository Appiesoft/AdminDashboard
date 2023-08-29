import React, { useState, useEffect, useRef } from 'react';
import {
    Row,
    Col,
    Dropdown,
    InputGroup,
    Form,
    Card,
    OverlayTrigger,
    Tooltip,
    Table,
    Pagination,
} from 'react-bootstrap';
import { FormInput } from '../../../../components';
import { useDispatch } from 'react-redux';
import { bulkInvoiceList } from '../../../../redux/actions';
import { useSelector } from 'react-redux';
import MainLoader from '../../../../components/MainLoader';
import './BulkTable.css';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import ShowHide from '../model/showHideColumns/ShowHide';
import Paginations from '../../../../helpers/paginations/Pagination';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';

const BulkTable = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const bulkInvoiceData = store.BulkInvoiceList;
    const bulkInvoiceLoader = store.BulkInvoiceList;
    const paginationValues = store.BulkInvoiceList?.bulkInvoiceLists?.meta?.pagination;
    const bulkInvoiceLists = bulkInvoiceData?.bulkInvoiceLists?.data;

    const [showLimit, setShowLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [state, setState] = useState("");
    console.log(state)

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (bulkInvoiceLists) {
        headers = DynamicHeaders(bulkInvoiceLists, ['details']);
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
        var dataLists = bulkInvoiceData?.bulkInvoiceLists?.data;
        exportPdf(dataLists, headers, '');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions

    // start pagination
    const getPaginationNumberView = () => {
        const collectionPagination = [];
        if (paginationValues.total_page - page <= 5) {
            for (let i = paginationValues.total_page - 5; i <= paginationValues.total_page; i++) {
                const active = page === i;
                collectionPagination.push(
                    <Pagination
                        className={
                            active
                                ? 'pagination_style mx-1 btn-hover bg-primary text-white'
                                : 'pagination_style mx-1 btn-hover'
                        }
                        onClick={() => {
                            setPage(i);
                        }}>
                        {i}
                    </Pagination>
                );
            }
        } else {
            for (let i = 0; i < 5; i++) {
                const active = page === page + i;
                collectionPagination.push(
                    <Pagination
                        className={
                            active
                                ? 'pagination_style mx-1 btn-hover bg-primary text-white'
                                : 'pagination_style mx-1 btn-hover'
                        }
                        onClick={() => {
                            setPage(page + i);
                        }}>
                        {page + i}
                    </Pagination>
                );
            }
            collectionPagination.push(<Pagination className="pagination_style">...</Pagination>);
            collectionPagination.push(
                <Pagination
                    onClick={() => {
                        setPage(paginationValues.total_page);
                    }}
                    className={
                        page === paginationValues.total_page
                            ? 'pagination_style mx-1 btn-hover bg-primary text-white'
                            : 'pagination_style mx-1 btn-hover'
                    }>
                    {paginationValues.total_page}
                </Pagination>
            );
        }

        return collectionPagination;
    };
    // end pagination

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
        const { name, checked } = e.target;
        setTableShowHide({ ...tableShowHide, [name]: checked });
    };

    const getChecKBoxData = () => {
        const arr = bulkInvoiceData?.bulkInvoiceLists?.data;
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
            bulkInvoiceList({
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    }, [page, showLimit]);

    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className="pt-0">
                                <Row className=" d-flex align-items-center p-0 ps-2 my-2">
                                    {isCsvDownload && (
                                        <CSVDownload
                                            filename={'patternList.csv'}
                                            data={bulkInvoiceData?.bulkInvoiceLists?.data}
                                            headers={headers}
                                            target="_blank"
                                        />
                                    )}
                                    <Col xl={8}>
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
                                                                />
                                                                <Dropdown
                                                                    onToggle={(e) => toogleActions()}
                                                                    addonType="append"
                                                                    isOpen={isSortDropdownOpen}
                                                                    toggle={toggleSortDropDown}
                                                                    show={isDropdownOpen}
                                                                    autoClose={false}
                                                                    align="end">
                                                                    <Dropdown.Toggle variant="secondary">
                                                                        <i className="uil uil-sort-amount-down "></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="bg-light">
                                                                        <Dropdown.Item className="bg-light">
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        Show hide columns
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    className="border p-1 px-2 bt_color_hover bg-white"
                                                                                    onClick={() =>
                                                                                        openModalWithClass(
                                                                                            'modal-right'
                                                                                        )
                                                                                    }>
                                                                                    <span className="mdi mdi-magnify search-icon"></span>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        Copy to clipboard
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    onClick={() => commanActions(1)}
                                                                                    className="border p-1 px-2 ms-3 bt_color_hover bg-white">
                                                                                    <i class="bi bi-file-earmark-richtext"></i>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        {' '}
                                                                                        Print
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    onClick={() => commanActions(2)}
                                                                                    className="border p-1 px-2 ms-3 bt_color_hover bg-white ">
                                                                                    <i class="bi bi-printer"></i>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className="bg-light">
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        Export to PDF
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    onClick={() => commanActions(3)}
                                                                                    className="border p-1 px-2 bt_color_hover bg-white ">
                                                                                    <i class="bi bi-file-earmark-x"></i>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        Export to Excel
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    onClick={() => commanActions(4)}
                                                                                    className="border p-1 ms-3 px-2 bt_color_hover  bg-white">
                                                                                    <i class="bi bi-file-earmark-pdf"></i>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </form>
                                    </Col>
                                </Row>
                                {bulkInvoiceLoader?.loading ? (
                                    <MainLoader />
                                ) : (
                                    <Row className="h-100">
                                        <Col className="overflow-auto table_container">
                                            <Table ref={componentRef} className="mb-0 " size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th><input type="checkbox" /></th>
                                                        {getChecKBoxData().map((itmde) => (
                                                            <th scope="col" className="text-truncate">
                                                                {itmde.split('_').join(' ').toUpperCase()}
                                                            </th>
                                                        ))}
                                                        <th scope="col" className="text-truncate">
                                                            Actions
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bulkInvoiceData?.bulkInvoiceLists?.data?.map((item, index) => {
                                                        return (
                                                            <tr key={index} className="align-middle">
                                                                <td><input type="checkbox" /></td>
                                                                {getChecKBoxData().map((itmde) => {
                                                                    if (itmde === 'id') {
                                                                        return <th scope="row">{item[itmde]}</th>;
                                                                    } else if (itmde === 'details') {
                                                                        return (
                                                                            <th scope="row">
                                                                                {item[itmde]?.slice(0, 10)}
                                                                            </th>
                                                                        );
                                                                    } else if (itmde === 'status') {
                                                                        return (
                                                                            <td className="text-truncate">
                                                                                <Form.Select value={item.status} onChange={(e) => e.target.value} >
                                                                                    <option hidden>--Select--</option>
                                                                                    <option value={"1"} >Paid</option>
                                                                                    <option value={"0"}>Unpaid</option>
                                                                                </Form.Select>
                                                                            </td>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <td className="text-truncate">
                                                                                {item[itmde]}
                                                                            </td>
                                                                        );
                                                                    }
                                                                })}
                                                                <td className="text-truncate">
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        overlay={
                                                                            <Tooltip id="overlay-example">
                                                                                Invoice
                                                                            </Tooltip>
                                                                        }>
                                                                        <div>
                                                                            <button onClick={() => commanActions(2)} className="border p-1 px-2 bt_color_hover bg-white">
                                                                                <i class="bi bi-file-earmark-richtext"></i>
                                                                            </button>
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                </td>
                                                                <td>
                                                                    <button className="border p-1 px-2 ms-1 bt_color_hover bg-primary text-white">
                                                                        Submit
                                                                    </button>

                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>
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
                                                                    className="form-select form-select-sm"
                                                                    key="select"
                                                                    onChange={(e) => {
                                                                        setShowLimit(e.target.value);
                                                                    }}>
                                                                    <option>10</option>
                                                                    <option>25</option>
                                                                    <option>50</option>
                                                                    <option>100</option>
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
                                                        {/* <Pagination>
                                                    <Pagination onClick={() => {
                                                        setPage((page - 1) > 0 ? page - 1 : 1)
                                                    }} className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                                    {getPaginationNumberView()}
                                                    <Pagination onClick={() => {
                                                        setPage((page + 1) < paginationValues.total_page ? page + 1 : paginationValues.total_page)
                                                    }} className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                                </Pagination> */}
                                                        <Paginations
                                                            currentPage={parseInt(paginationValues?.current_page)}
                                                            totalCount={paginationValues?.total_data}
                                                            pageSize={showLimit}
                                                            onPageChange={(page) => setPage(page)}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )}
                                    </Row>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div>
                <ShowHide
                    checkBoxStatus={checkBoxStatus}
                    setCheckBoxStatus={setCheckBoxStatus}
                    parentShowHide={parentShowHide}
                    childEmptyShowHide={childEmptyShowHide}
                    handleOnChange={handleOnChange}
                />
            </div>
        </>
    );
};

export default BulkTable;
