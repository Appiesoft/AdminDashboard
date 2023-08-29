import Item from 'antd/es/list/Item';
import React, { useEffect, useState, useRef } from 'react';
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
    Table,
    Pagination,
} from 'react-bootstrap';
import './CustomerListTable.css';
import FormInput from '../../../components/FormInput';
import CustomerListEdit from './model/customerListEditmodel/CustomerListEdit';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { costomerList, customerDelete, customerDetail, customerUpdate, } from '../../../redux/actions';
import Loader from '../../../components/MainLoader';
import Paginations from '../../../helpers/paginations/Pagination';
import { copyToClipboard } from '../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import ShowHide from './model/model/showHideColumns/ShowHide';
// import HandleDeleteModel from '../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HandleDeleteModel from '../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';

const CustomerListTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const costomerListData = store?.CostomerList?.costomerList?.data;
    const paginationValues = store?.CostomerList?.costomerList?.meta?.pagination;
    const constomerListLoader = store.CostomerList;
    const customerDeleteData = store.CustomerDelete;
    const customerDeleteStatus = store?.CustomerDelete?.status;

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        TableShowBtn();
    };
    /**View model  */
    const [parentCustomerList, setParentCustomerList] = useState('');
    const opernMoalCustomerList = (fill, customerId) => {
        dispatch(customerDetail({ customerId: customerId }));
        setParentCustomerList(fill);
    };

    const childEmptyCustomerList = (empty) => {
        setParentCustomerList(empty);
    };

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const openModalWithCustomerDelete = (fill, customerId) => {
        console.log(fill, customerId);
        setParentDelete(fill);
        setDeleteId(customerId);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            customerDelete({
                customerId: deleteId,
            })
        );
    };
    // end delete handle model

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const headers = [
        { label: 'Customer Id', key: 'id' },
        { label: 'Cust Code', key: 'cust_code' },
        { label: 'TaxId', key: 'taxId' },
        { label: 'Tax Exempt', key: 'tax_exempt' },
        { label: 'Join Date', key: 'join_date' },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Address1', key: 'address1' },
        { label: 'Address2', key: 'address2' },
        { label: 'City', key: 'city' },
        { label: 'State', key: 'state' },
        { label: 'Zipcode', key: 'zipcode' },
        { label: 'Country', key: 'country' },
        { label: 'Cust Map Pos', key: 'cust_map_pos' },
        { label: 'Email Id', key: 'email_id' },
        { label: 'Phone', key: 'phone' },
        { label: 'Country Code', key: 'country_code' },
        { label: 'Country Prefix Code', key: 'country_prefix_code' },
        { label: 'Mobile', key: 'mobile' },
        { label: 'Status', key: 'status' },
        { label: 'Discount Type', key: 'discount_type' },
        { label: 'Discount Val', key: 'discount_val' },
        { label: 'Address3', key: 'address3' },
        { label: 'Landmrk', key: 'landmrk' },
        { label: 'Add Default', key: 'add_default' },
        { label: 'Profile Image', key: 'profile_image' },
        { label: 'Price List Id', key: 'price_list_id' },
        { label: 'Preferences', key: 'preferences' },
        { label: 'Laundry Store', key: 'laundry_store' },
        { label: 'Discount', key: 'discount' },
        { label: 'Charges', key: 'charges' },
    ];

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
        var dataLists = costomerListData;
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
        const arr = costomerListData;
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

    const getCustomerList = () => {
        dispatch(
            costomerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
            })
        );
    };

    useEffect(() => {
        getCustomerList();
    }, [page, showLimit, searchText]);


    useEffect(() => {
        if (customerDeleteData.status) {
            dispatch(
                costomerList({
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                    storeId: [],
                })
            );
        }
    }, [customerDeleteData]);

    useEffect(() => {
        if (customerDeleteStatus) {
            toast.success(store?.CustomerDelete?.message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else if (customerDeleteStatus === false) {
            toast.error(store?.CustomerDelete?.message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    }, [customerDeleteStatus]);

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className="pt-0">
                            <Row className="  d-flex align-items-center p-0 my-2">
                                {isCsvDownload && (
                                    <CSVDownload
                                        filename={'patternList.csv'}
                                        data={costomerListData}
                                        headers={headers}
                                        target="_blank"
                                    />
                                )}
                                <Col xl={4}>
                                    <div>
                                        <Row>
                                            <Col xl={7}>
                                                <div className="text-lg-start mt-xl-0 mt-2">
                                                    <Button
                                                        variant="white"
                                                        className=" border py-0 ps-1 pe-2 bg-primary text-white me-2"
                                                        onClick={() => btnChild()}>
                                                        <div className="d-flex align-items-center">
                                                            <h3>
                                                                <i class="bi bi-plus me-1 text-dark" />
                                                            </h3>
                                                            <div>Active / Passive Customer List</div>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col xl={8}>
                                    <form className="row gy-2  gx-2 align-items-center justify-content-xl-end justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0 me-2">
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
                            </Row>
                            <Row className='mx-auto mb-1'>
                                <Col xl={8} className="d-flex align-items-center justify-content-xl-start mt-2 mb-2 ps-0 justify-content-between">
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
                                        <p className='mb-0 ms-2' >Records</p>
                                    </div>
                                </Col>
                            </Row>

                            {constomerListLoader?.loading ? (
                                <Loader />
                            ) : (
                                <>
                                    <Row>
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
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {costomerListData?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td><input type="checkbox" /></td>
                                                                {getChecKBoxData().map((itmde) => {
                                                                    if (itmde === 'id') {
                                                                        return <th scope="row">{item[itmde]}</th>;
                                                                    } else if (itmde === 'charges') {
                                                                        if (item?.charges?.length > 0) {
                                                                            return (
                                                                                <td className="text-truncate">
                                                                                    {item.charges[0]?.charge_name}{' '}
                                                                                </td>
                                                                            );
                                                                        } else {
                                                                            return (
                                                                                <td className="text-truncate">{''}</td>
                                                                            );
                                                                        }
                                                                    } else if (itmde === 'discount') {
                                                                        return (
                                                                            <td className="text-truncate">
                                                                                {'discount'}
                                                                            </td>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <td className="text-truncate">
                                                                                {item[itmde]}
                                                                            </td>
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
                                                                        <Dropdown.Menu className="bg-light px-2">
                                                                            <Dropdown.Item className="bg-light">
                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    overlay={
                                                                                        <Tooltip id="overlay-example">
                                                                                            Details
                                                                                        </Tooltip>
                                                                                    }>
                                                                                    <Link
                                                                                        to="/customer/customerdetail"
                                                                                        className="border p-1 px-2 bt_color_hover text-dark bg-white">
                                                                                        <i className="uil uil-search-plus"></i>
                                                                                    </Link>
                                                                                </OverlayTrigger>

                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    overlay={
                                                                                        <Tooltip id="overlay-example">
                                                                                            Edit
                                                                                        </Tooltip>
                                                                                    }>
                                                                                    <button
                                                                                        className="border p-1 px-2 ms-3 bt_color_hover bg-white"
                                                                                        onClick={() =>
                                                                                            opernMoalCustomerList(
                                                                                                'lg',
                                                                                                item.id
                                                                                            )
                                                                                        }>
                                                                                        <i className="mdi mdi-square-edit-outline "></i>
                                                                                    </button>
                                                                                </OverlayTrigger>

                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    overlay={
                                                                                        <Tooltip id="overlay-example">
                                                                                            Delete
                                                                                        </Tooltip>
                                                                                    }>
                                                                                    <button
                                                                                        className="border p-1 px-2 ms-3 bt_color_hover bg-white"
                                                                                        onClick={() => {
                                                                                            openModalWithCustomerDelete(
                                                                                                'modal-dialog-centered',
                                                                                                item.id
                                                                                            );
                                                                                        }}>
                                                                                        <i className="mdi mdi-delete"></i>
                                                                                    </button>
                                                                                </OverlayTrigger>
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    {paginationValues && (
                                        <Row className="mt-3">
                                            <Col>
                                                <Row>
                                                    <Col className="d-flex align-items-center mt-2 mb-2">
                                                        {/* <div>
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
                                                        </FormInput> */}
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
                                    )}
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <CustomerListEdit
                        parentCustomerList={parentCustomerList}
                        childEmptyCustomerList={childEmptyCustomerList}
                    />
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
        </div>
    );
};

export default CustomerListTable;
