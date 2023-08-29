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
import { FormInput } from '../../../../components';
import ViewModel from './model/view/ViewModel';
import DeliveryModel from './model/deliveryStatus/DeliveryModel';
import { useDispatch, useSelector } from 'react-redux';
import { diliveryRequestList } from '../../../../redux/transactions/deliveryRequestList/actions';
import MainLoader from '../../../../components/MainLoader';
import './DeliveryTable.css';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import ShowHide from './model/showHideColumns/ShowHide';
import Paginations from '../../../../helpers/paginations/Pagination';
import { ordersList } from '../../../../redux/transactions/order/actions';
import { costomerList } from '../../../../redux/actions';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';

const DeliveryTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const deliveryRequestData = store.DeliveryRequestList;
    const deliveryRequestLoader = store.DeliveryRequestList;
    const deliveryRequestLists = deliveryRequestData?.deliveryRequestList?.data;
    const paginationValues = store.DeliveryRequestList?.deliveryRequestList?.meta?.pagination;

    const [showLimit, setShowLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    const btnChild = () => {
        TableShowBtn();
    };

    // action
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    /**View model  */
    const [parentView, setParentView] = useState('');
    const opernMoalView = (fill) => {
        setParentView(fill);
    };
    const childEmptyView = (empty) => {
        setParentView(empty);
    };

    /**Delivery model */
    const [parentDelivery, setParentDelivery] = useState('');
    const opernMoalDelivery = (fill) => {
        setParentDelivery(fill);
    };
    const childEmptyDelivery = (empty) => {
        setParentDelivery(empty);
    };

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = []

    if (deliveryRequestLists) {
        headers = DynamicHeaders(deliveryRequestLists, ['items', 'order_address']);
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
        var dataLists = deliveryRequestData?.deliveryRequestList?.data;
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
        const arr = deliveryRequestData?.deliveryRequestList?.data;
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
            diliveryRequestList(
                {
                    pageNumber: page,
                    showLimit: showLimit,
                    from: "",
                    to: ""
                }
            )
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
                                            data={deliveryRequestData?.deliveryRequestList?.data}
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

                                    <Col xl={4}>
                                        <div className="text-lg-end mt-xl-0 ">
                                            <Row>
                                                <Col xl={12}>
                                                    <div className="text-lg-end mt-xl-0 ">
                                                        <Button
                                                            variant="white"
                                                            className=" border py-0 pe-4 bg-primary text-white me-2"
                                                            onClick={btnChild}>
                                                            <div className="d-flex align-items-center">
                                                                <h3>
                                                                    <i class="bi bi-plus me-1 text-dark" />
                                                                </h3>
                                                                <div>Create Delivery Request</div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='d-flex align-items-baseline'>
                                        <h4 className='me-2'>Driver Selection :</h4>
                                        <div className="d-flex align-items-center">
                                            <h4>
                                                <i class="uil uil-truck me-1" />
                                            </h4>
                                            <h4>Driver Assign</h4>
                                        </div>
                                    </Col>
                                </Row>
                                {deliveryRequestLoader?.loading ? (
                                    <MainLoader />
                                ) : (
                                    <Row>
                                        <Col className="overflow-auto ">
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {deliveryRequestData?.deliveryRequestList?.data?.map(
                                                        (item, index) => {
                                                            return (
                                                                <tr key={index} className="align-middle">
                                                                    <td><input type="checkbox" /></td>
                                                                    {getChecKBoxData().map((itmde) => {
                                                                        if (itmde === 'order_id') {
                                                                            return <th scope="row">{item[itmde]}</th>;
                                                                        } else if (itmde === 'order_address') {
                                                                            return (
                                                                                <td className="text-truncate">
                                                                                    {'address'}
                                                                                </td>
                                                                            );
                                                                        } else if (itmde === 'items') {
                                                                            return (
                                                                                <td className="text-truncate">
                                                                                    {'items'}
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
                                                                                                {' '}
                                                                                                Assign Driver{' '}
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <button
                                                                                            className="border p-1 px-2 bt_color_hover bg-white"
                                                                                            onClick={() =>
                                                                                                alert(
                                                                                                    'You can not assign a driver until the order status is Ready for Delivery.'
                                                                                                )
                                                                                            }>
                                                                                            <i className="uil uil-truck"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger
                                                                                        placement="bottom"
                                                                                        overlay={
                                                                                            <Tooltip id="overlay-example">
                                                                                                {' '}
                                                                                                View{' '}
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <button
                                                                                            className="border p-1 px-2 ms-3 bt_color_hover bg-white"
                                                                                            onClick={() =>
                                                                                                opernMoalView('lg')
                                                                                            }>
                                                                                            <i className="uil uil-search-plus"></i>
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
                                                                                        <button className="border p-1 px-2 ms-3 bt_color_hover bg-white">
                                                                                            <i class="bi bi-trash3"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
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
                                            <div>
                                                <ViewModel parentView={parentView} childEmptyView={childEmptyView} />
                                            </div>
                                            <div>
                                                <DeliveryModel
                                                    parentDelivery={parentDelivery}
                                                    childEmptyDelivery={childEmptyDelivery}
                                                />
                                            </div>
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

export default DeliveryTable;
