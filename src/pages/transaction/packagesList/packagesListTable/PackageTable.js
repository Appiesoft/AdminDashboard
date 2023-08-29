import React, { useState, useRef } from 'react';
import {
    Row,
    Col,
    Dropdown,
    InputGroup,
    Form,
    Card,
    OverlayTrigger,
    Tooltip,
    Button,
    Pagination,
    Table,
} from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data';
import { FormInput } from '../../../../components';
import { useEffect } from 'react';
import { assignedPackageDelete, assignedPackageList } from '../../../../redux/transactions/assignedPackageList/action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../components/MainLoader';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import ShowHide from '../showHideColumns/ShowHide';
import Paginations from '../../../../helpers/paginations/Pagination';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';

const PackageTable = ({ TableShowBtn, showBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnChild = () => {
        TableShowBtn();
    };
    const dispatch = useDispatch();

    const store = useSelector((state) => state);
    const getPackageListdata = store.AssignedPackageList;
    const packageDataList = store.AssignedPackageList;
    const packageDataLists = getPackageListdata?.assignedPackageLists?.data;
    const assignPackageDeleteData = store?.AssignPackageDelete?.data?.data
    const assignPackageDeleteStatus = store?.AssignPackageDelete?.data?.data?.status
    const assignPackageDeleteMessage = store?.AssignPackageDelete?.data?.data?.message

    const [searchText, setSearchText] = useState('');
    const paginationValues = store.AssignedPackageList?.assignedPackageLists?.meta?.pagination;
    const [showLimit, setShowLimit] = useState(10);
    const [page, setPage] = useState(1);


    const btnTransfer = () => {
        showBtn();
    };

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDelete = (fill, assignId) => {
        setParentDelete(fill);
        setDeleteId(assignId);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            assignedPackageDelete({
                assignId: deleteId,
            })
        );
    };
    // end delete handle model

    //start Model
    const [parentEdit, setParentEdit] = useState('');

    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model
    const getPackageList = () => {
        dispatch(
            assignedPackageList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };
    useEffect(() => {
        getPackageList();
    }, [page, showLimit, searchText]);

    const [parentDelivery, setParentDelivery] = useState('');

    const openModalWithScrolls = (fill) => {
        setParentDelivery(fill);
    };

    const childEmptyDelivery = (empty) => {
        setParentDelivery(empty);
    };

    const [parentRocks, setParentRocks] = useState('');

    const openModalWithScroll = (fill) => {
        setParentRocks(fill);
    };

    const childEmptyRock = (empty) => {
        setParentRocks(empty);
    };

    const [parentFill, setParentFill] = useState('');

    const openModalWithSize = (fill) => {
        setParentFill(fill);
    };

    const childEmpty = (empty) => {
        setParentFill(empty);
    };

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (packageDataLists) {
        headers = DynamicHeaders(packageDataLists, []);
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
        var dataLists = getPackageListdata?.assignedPackageLists?.data;
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
        const { name, checked } = e.target;
        setTableShowHide({ ...tableShowHide, [name]: checked });
    };

    const getChecKBoxData = () => {
        const arr = getPackageListdata?.assignedPackageLists?.data;
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
        if (assignPackageDeleteData?.status) {
            dispatch(
                assignedPackageList({
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                })
            );
        }

    }, [assignPackageDeleteData])

    useEffect(() => {
        if (assignPackageDeleteStatus) {
            ToastHandle('success', assignPackageDeleteMessage);
        } else if (assignPackageDeleteStatus === false) {
            ToastHandle('error', assignPackageDeleteMessage);
        }
    }, [assignPackageDeleteStatus]);
    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className="pt-0">
                                <Row className="  d-flex align-items-center p-0 ps-2 my-2">
                                    {isCsvDownload && (
                                        <CSVDownload
                                            filename={'patternList.csv'}
                                            data={getPackageListdata?.assignedPackageLists?.data}
                                            headers={headers}
                                            target="_blank"
                                        />
                                    )}
                                    <Col xl={8}>
                                        <div className="text-lg-end mt-xl-0 ">
                                            <Row>
                                                <Col xl={12} className='ps-0'>
                                                    <div className="text-lg-start mt-xl-0 ">
                                                        <Button
                                                            variant="white"
                                                            className="border py-0 pe-4 bg-primary text-white "
                                                            onClick={btnChild}>
                                                            <div className="d-flex align-items-center">
                                                                <h3>
                                                                    <i class="bi bi-plus me-1 text-dark" />
                                                                </h3>
                                                                <div>Assign Package</div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col xl={4}>
                                        <form className="row gy-2  gx-2 align-items-center justify-content-xl-end justify-content-between">
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
                                {packageDataList?.loading ? (
                                    <Loader />
                                ) : (
                                    <Row className="h-100">
                                        <Col lg={12} className="overflow-auto table_container">
                                            <Table ref={componentRef} className="mb-0" size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th><input type="checkbox" /></th>
                                                        {getChecKBoxData().map((itmde) => (
                                                            <th scope="col" className="text-truncate">
                                                                {itmde.split('_').join(' ').toUpperCase()}
                                                            </th>
                                                        ))}
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getPackageListdata?.assignedPackageLists?.data?.map(
                                                        (item, index) => {
                                                            return (
                                                                <tr key={index} className="align-middle">
                                                                    <td><input type="checkbox" /></td>
                                                                    {getChecKBoxData().map((itmde) => {
                                                                        if (itmde === 'pkg_id') {
                                                                            return <th scope="row">{item[itmde]}</th>;
                                                                        } else {
                                                                            return (
                                                                                <>
                                                                                    <td className="text-truncate">
                                                                                        {item[itmde]}
                                                                                    </td>
                                                                                </>
                                                                            );
                                                                        }
                                                                    })}
                                                                    <td>
                                                                        <Dropdown
                                                                            addonType="append"
                                                                            isOpen={isSortDropdownOpen}
                                                                            toggle={toggleSortDropDown}
                                                                            align="end">
                                                                            <Dropdown.Toggle variant="light ">
                                                                                <i className="uil uil-sort-amount-down "></i>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu className='bg-light px-2'>
                                                                                <Dropdown.Item className='bg-light'>
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> View </Tooltip>}>
                                                                                        <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                        // onClick={() => openModalAutomateEdit("lg", item.id)}
                                                                                        >
                                                                                            <i className="mdi mdi-square-edit-outline "></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>

                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                                        <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                            onClick={() => openModalWithDelete("modal-dialog-centered", item.pkg_id)}
                                                                                        >
                                                                                            <i className="mdi mdi-delete"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
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
            <div>
                <HandleDeleteModel
                    parentDelete={parentDelete}
                    childEmptyDelete={childEmptyDelete}
                    confirmDeleteHandle={confirmDeleteHandle}
                />
            </div>
        </>
    );
};

export default PackageTable;
