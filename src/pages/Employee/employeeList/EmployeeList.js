import React, { useState, useEffect, useRef } from 'react';
import {
    Row,
    Col,
    Form,
    Card,
    Table,
    Modal,
    InputGroup,
    Dropdown,
    OverlayTrigger,
    Tooltip,
    Button,
    Pagination,
} from 'react-bootstrap';
import FormInput from '../../../components/FormInput';
import { Link } from 'react-router-dom';
import './Employee.css';
import Edit from './model/editModel/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { employeeDelete, employeeDetails, employeeList } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import { copyToClipboard } from '../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import ShowHide from '../model/showHideColumns/ShowHide';
import Paginations from '../../../helpers/paginations/Pagination';
import HandleDeleteModel from '../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import DynamicHeaders from '../../../helpers/dynamicHeaders';
import ToastHandle from '../../../helpers/toastMessage';

const EmployeeList = ({ showBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const employeListData = store.EmployeeList;
    const employeList = employeListData?.employeeList?.data;
    const employeeListLoader = store.EmployeeList;
    const paginationValues = store.EmployeeList?.employeeList?.meta?.pagination;
    const employeeDeleteData = store.EmployeeDelete;
    const employeeStatus = store?.EmployeeDelete?.status;
    const emoloyeeMessage = store?.EmployeeDelete?.message;

    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnTransfer = () => {
        showBtn();
    };
    //start Model
    const [parentEdit, setParentEdit] = useState('');
    const openModalEditEmployeeList = (fill, emp_id) => {
        setParentEdit(fill);
        dispatch(employeeDetails({ employeeId: emp_id }));
    };
    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDelete = (fill, emp_id) => {
        setParentDelete(fill);
        setDeleteId(emp_id);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            employeeDelete({
                employeeId: deleteId,
            })
        );
    };
    // end delete handle model

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (employeList) {
        headers = DynamicHeaders(employeList, ['emp_id']);
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
        var dataLists = employeListData?.employeeList?.data;
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
        const arr = employeListData?.employeeList?.data;
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
            employeeList({
                storeId: [],
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    }, [page, showLimit, searchText]);

    useEffect(() => {
        if (employeeDeleteData.status) {
            dispatch(
                employeeList({
                    storeId: [],
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                })
            );
        }
    }, [employeeDeleteData]);

    useEffect(() => {
        if (employeeStatus) {
            ToastHandle('success', emoloyeeMessage);
        } else if (employeeStatus === false) {
            ToastHandle('error', emoloyeeMessage);
        }
    }, [employeeStatus]);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className="pt-0">
                            <Row className=" d-flex align-items-center p-0 ps-2 my-2">
                                {isCsvDownload && (
                                    <CSVDownload
                                        filename={'patternList.csv'}
                                        data={employeListData?.employeeList?.data}
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
                                                                onChange={(e) => {
                                                                    setSearchText(e.target.value);
                                                                }}
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
                                                                                    openModalWithClass('modal-right')
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

                                <Col xl={4}>
                                    <div className="text-lg-end mt-xl-0 ">
                                        <Row className=" ">
                                            <Col xl={12}>
                                                <div className="text-lg-end mt-xl-0 mt-2">
                                                    <Button
                                                        variant="white"
                                                        className=" border py-0 pe-4 bg-primary btn-sm text-white "
                                                        onClick={() => {
                                                            btnTransfer();
                                                        }}>
                                                        <div className="d-flex align-items-center">
                                                            <h3>
                                                                <i class="bi bi-plus me-1 text-dark" />
                                                            </h3>
                                                            <div>New Entry</div>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="h-100 position-relative">
                                {employeeListLoader.loading && <MainLoader />}
                                <Col className=" overflow-auto ">
                                    <Table ref={componentRef} className="mb-0 table">
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeListData?.employeeList?.data?.map((item, index) => {
                                                return (
                                                    <tr key={index} className="align-middle">
                                                        <td><input type="checkbox" /></td>
                                                        {getChecKBoxData().map((itmde) => {
                                                            if (itmde === 'emp_id') {
                                                                return <th scope="row">{item[itmde]}</th>;
                                                            } else {
                                                                return <td className="text-truncate">{item[itmde]}</td>;
                                                            }
                                                        })}
                                                        <td className="text-truncate">
                                                            <Link to="#" className="action-icon">
                                                                <i
                                                                    className="mdi mdi-square-edit-outline"
                                                                    onClick={() =>
                                                                        openModalEditEmployeeList('lg', item.emp_id)
                                                                    }></i>
                                                            </Link>
                                                            <Link to="#" className="action-icon">
                                                                <i
                                                                    className="mdi mdi-delete"
                                                                    onClick={() =>
                                                                        openModalWithDelete(
                                                                            'modal-dialog-centered',
                                                                            item.emp_id
                                                                        )
                                                                    }></i>
                                                            </Link>
                                                        </td>
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <Edit parentEdit={parentEdit} childEmptyEdit={childEmptyEdit} />
                    </div>
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
                <HandleDeleteModel
                    parentDelete={parentDelete}
                    childEmptyDelete={childEmptyDelete}
                    confirmDeleteHandle={confirmDeleteHandle}
                />
            </div>
        </>
    );
};

export default EmployeeList;
