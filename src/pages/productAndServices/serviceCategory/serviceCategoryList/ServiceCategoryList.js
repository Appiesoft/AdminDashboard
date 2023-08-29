import React, { useState, useEffect, useRef, useCallback } from 'react';
import { orders } from '../../../apps/Ecommerce/Data';
import { FormInput } from '../../../../components';
import { Link } from 'react-router-dom';
import EditModel from './model/editModel/EditModel';
import { serviceCategoryList, serviceCategoryDelete } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
// import HandleDeleteModel from '../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';

import {
    Row,
    Col,
    Dropdown,
    InputGroup,
    Form,
    Card,
    Table,
    OverlayTrigger,
    Tooltip,
    Button,
    Pagination,
} from 'react-bootstrap';
import MainLoader from '../../../../components/MainLoader';
import '../serviceCategoryList/ServiceCategoryList.css';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from 'react-csv';
import Paginations from '../../../../helpers/paginations/Pagination';
import DeleteModel from '../../../../helpers/deleteModel/DeleteModel';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import ToastHandle from '../../../../helpers/toastMessage';


const ServiceCategoryList = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnHideShow = () => {
        TableShowBtn();
    };
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const serviceCategoryData = store.ServiceCategoryList;
    const serviceCategoryDataList = store.ServiceCategoryList;
    const paginationValues = store.ServiceCategoryList?.serviceCategoryList?.meta?.pagination;
    const serviceLists = serviceCategoryData?.serviceCategoryList?.data;
    const [showLimit, setShowLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        dispatch(
            serviceCategoryList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    }, [page, showLimit, searchText]);

    let headers = [];

    if (serviceLists) {
        headers = DynamicHeaders(serviceLists, ['image', 'id']);
    }

    const handleGeneratePdf = () => {
        var dataLists = serviceCategoryData?.serviceCategoryList?.data;
        exportPdf(dataLists, headers, 'Packages Pdf');
    };

    const imageFormatter = (cell) => {
        return <img style={{ width: 50 }} src={cell} />;
    };


    //model
    const [getRowData, setRowData] = useState('');
    const [parentEditModel, setParentEditModel] = useState('');
    const openModalEditModel = (fill, item) => {
        setParentEditModel(fill);
        setRowData(item);
    };
    const childEmptyEditModel = (empty) => {
        setParentEditModel(empty);
    };

    const serviceCategoryStatus = store?.ServiceCategoryDelete?.status;
    const serviceCategoryMessage = store?.ServiceCategoryDelete?.message;


    const getItemList = useCallback(() => {
        dispatch(
            serviceCategoryList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            })
        );
    }, []);

    // start delete handle model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDelete = (fill, emp_id) => {
        console.log(fill, emp_id,)
        setParentDelete(fill);
        setDeleteId(emp_id);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            serviceCategoryDelete({
                id: deleteId,
            })
        );
    };
    // end delete handle model 

    //start toast handle
    useEffect(() => {
        if (serviceCategoryStatus === true) {
            ToastHandle('success', serviceCategoryMessage);
            getItemList();
        } else if (serviceCategoryStatus?.status === false) {
            ToastHandle('error', serviceCategoryMessage);
        }
    }, [serviceCategoryStatus]);
    //end toast handle

    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className="pt-0">
                                <Row className=" d-flex align-items-center my-2">
                                    <Col xl={8}>
                                        <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <Row>
                                                        {isCsvDownload && (
                                                            <CSVDownload
                                                                filename={'patternList.csv'}
                                                                data={serviceCategoryData?.serviceCategoryList?.data}
                                                                headers={headers}
                                                                target="_blank"
                                                            />
                                                        )}
                                                        <Col className="d-flex ms-1 align-items-center border-start bg-light border-top border-bottom pe-0">
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
                                                                    addonType="append"
                                                                    align="end"
                                                                    show={isDropdownOpen}
                                                                    autoClose={false}
                                                                    onToggle={(e) => toogleActions()}>
                                                                    <Dropdown.Toggle variant="secondary">
                                                                        <i className="uil uil-sort-amount-down "></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="bg-light">
                                                                        <Dropdown.Item className="bg-light">
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        Copy to clipboard
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    onClick={() => commanActions(1)}
                                                                                    className="border p-1 px-2 bt_color_hover bg-white">
                                                                                    <i class="bi bi-file-earmark-richtext"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
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
                                                                            </OverlayTrigger>{' '}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className="bg-light">
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        {' '}
                                                                                        Export to PDF
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    onClick={() => commanActions(3)}
                                                                                    className="border p-1 px-2 bt_color_hover bg-white ">
                                                                                    <i class="bi bi-file-earmark-x"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        {' '}
                                                                                        Export to Excel
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button
                                                                                    onClick={() => commanActions(4)}
                                                                                    className="border p-1 ms-3 px-2 bt_color_hover  bg-white">
                                                                                    <i class="bi bi-file-earmark-pdf"></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}
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
                                            <Row>
                                                <Col xl={12}>
                                                    <div className="text-lg-end mt-xl-0 mt-2">
                                                        <Button
                                                            variant="white"
                                                            className=" border py-0 pe-4 bg-primary text-white me-2"
                                                            onClick={btnHideShow}>
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

                                {serviceCategoryDataList?.loading ? (
                                    <MainLoader />
                                ) : (
                                    <Row>
                                        <Col>
                                            <Table ref={componentRef} size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th>Priority#</th>
                                                        <th>Image</th>
                                                        <th>Service Name (English)</th>
                                                        <th>Service Name (English)</th>
                                                        {/* <th>Description</th> */}
                                                        <th>Show/Hide</th>
                                                        <th>Show/Hide On Website</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {serviceCategoryData?.serviceCategoryList?.data?.map(
                                                        (item, index) => {
                                                            return (
                                                                <tr key={index} className="align-middle">
                                                                    <th scope="row">{item.priority}</th>
                                                                    <td>{imageFormatter(item.image)}</td>
                                                                    <td>{item.service_name2}</td>
                                                                    <td>{item.service_name1}</td>
                                                                    {/* <td >{item.service_unit}</td> */}
                                                                    <td>{item.show_hide}</td>
                                                                    <td>{item.show_hide_on_website}</td>
                                                                    <td>
                                                                        <Dropdown
                                                                            addonType="append"
                                                                            isOpen={isSortDropdownOpen}
                                                                            toggle={toggleSortDropDown}
                                                                            align="end">
                                                                            <Dropdown.Toggle variant="light ">
                                                                                <i className="uil uil-sort-amount-down "></i>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu className="bg-light px-2">
                                                                                <Dropdown.Item className="bg-light ">
                                                                                    <OverlayTrigger
                                                                                        placement="bottom"
                                                                                        overlay={
                                                                                            <Tooltip id="overlay-example">
                                                                                                {' '}
                                                                                                Edit{' '}
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <button
                                                                                            className="border p-1 px-2 bt_color_hover bg-white"
                                                                                            onClick={() =>
                                                                                                openModalEditModel('lg', item)
                                                                                            }
                                                                                        >
                                                                                            <i className="mdi mdi-square-edit-outline"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger
                                                                                        placement="bottom"
                                                                                        overlay={
                                                                                            <Tooltip id="overlay-example">
                                                                                                {' '}
                                                                                                Delete{' '}
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <button
                                                                                            className="border p-1 px-2 ms-3 bt_color_hover bg-white"
                                                                                            onClick={() =>
                                                                                                openModalWithDelete(
                                                                                                    'modal-dialog-centered',
                                                                                                    item.id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <i className="mdi mdi-delete"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                        {/* <ActionColumn rowData={item}></ActionColumn> */}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </Table>
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
                                        </Col>
                                    </Row>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <EditModel
                    rowData={getRowData}
                    parentEditModel={parentEditModel}
                    openModalEditModel={openModalEditModel}
                    childEmptyEditModel={childEmptyEditModel}
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

export default ServiceCategoryList;
