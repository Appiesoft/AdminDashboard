import Item from 'antd/es/list/Item';
import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import './DueOrderListTable.css'
import DueOrderListForm from '../dueOrderListForm/DueOrderListForm'
import { useDispatch, useSelector } from 'react-redux';
import { DueOrderList } from '../../../../redux/actions';
import Paginations from '../../../../helpers/paginations/Pagination';
import MainLoader from '../../../../components/MainLoader';
import ShowHide from './model/showHideColumns/ShowHide';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';


const DueOrderListTable = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const dueOrderListData = store?.DueOrderListReducer?.dueOrderList?.data?.due_order_list
    const paginationValues = store?.DueOrderListReducer?.dueOrderList?.meta?.pagination
    const dueOrderListLoader = store.DueOrderListReducer;

    // start pagination and search
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
    // end pagination and search
    // sidebar hide and show
    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (dueOrderListData) {
        headers = DynamicHeaders(dueOrderListData, ['emp_id']);
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
        var dataLists = dueOrderListData
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
        const arr = dueOrderListData
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
    const [delivered_order, setDelivered_order] = useState("")
    const parentOrderListTable = (item) => {
        setDateStart(item?.startDate);
        setDateEnd(item?.endDate);
        setStore_Id(item?.getStoreId);
        setDelivered_order(item?.deliveryOrderchecked);
    }

    useEffect(() => {
        dispatch(
            DueOrderList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                from: dateStart,
                to: dateEnd,
                storeId: store_Id,
                deliveredOrder: delivered_order

            })
        );
    }, [page, showLimit, searchText, dateStart, dateEnd, store_Id, delivered_order]);
    return (
        <div>
            <Row >
                <Col>
                    <h4>
                        Due Order List
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            <Row className=" d-flex align-items-center p-0 ps-2 my-2">
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
                                    <DueOrderListForm isOpen={isOpen} parentOrderListTable={parentOrderListTable} toggle={toggle} />
                                </Col>
                            </Row>
                            {dueOrderListLoader.loading ? <MainLoader /> : <>
                                <Row >
                                    <Col className='overflow-auto table_container'>
                                        <Table ref={componentRef} className="mb-0 " size="sm">
                                            <thead>
                                                <tr className="bg-light">
                                                    <th><input type="checkbox" /></th>
                                                    {getChecKBoxData().map((itmde) => (
                                                        <th scope="col" className="text-truncate">
                                                            {itmde.split('_').join(' ').toUpperCase()}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dueOrderListData?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='align-middle'>
                                                            <td><input type="checkbox" /></td>
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
                                )}
                            </>}

                            {/* <Row className='mt-3'>
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

export default DueOrderListTable
