import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Dropdown, InputGroup, Form, Spinner, Card, OverlayTrigger, Tooltip, Table, Pagination } from 'react-bootstrap';
import './OrderTable.css';
import { FormInput } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { ordersList } from '../../../../redux/transactions/order/actions';
import Racks from '../model/racks/Racks';
import DeliveryModel from '../model/deliveryRequest/DeliveryModel';
import ShowHide from '../model/showHideColumns/ShowHide';
import OrderNotes from '../model/order/OrderNotes';
import MainLoader from '../../../../components/MainLoader';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVDownload } from 'react-csv';
import Paginations from '../../../../helpers/paginations/Pagination';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';

const OrderTable = () => {

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const orderListdata = store.OrderList;
    const ordersDataLoader = store.OrderList;
    const orderList = orderListdata?.orderList?.data;
    const paginationValues = store.OrderList?.orderList?.meta?.pagination
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const storeList = JSON.parse(localStorage.getItem('storeList')).map((itm) => itm.order_id);

    const getOrderList = () => {
        dispatch(
            ordersList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: storeList,
                orderDate: '',
            })
        );
    };

    useEffect(() => {
        getOrderList();
    }, [page, showLimit, searchText]);


    //Dropdown 
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {

        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    //order Table all model
    const [parentFill, setParentFill] = useState('')

    const openModalWithSize = (fill) => {
        setParentFill(fill)
    };

    const childEmpty = (empty) => {
        setParentFill(empty)
    }

    /***model Rocks*/
    const [parentRocks, setParentRocks] = useState('')

    const openModalWithScroll = (fill) => {
        setParentRocks(fill)
    };

    /** model Delivery */
    const [parentDelivery, setParentDelivery] = useState('')

    const openModalWithScrolls = (fill) => {
        setParentDelivery(fill)
    };
    const childEmptyDelivery = (empty) => {
        setParentDelivery(empty)
    }

    //model sidebar model hide and show
    const [parentShowHide, setParentShowHide] = useState('')

    const openModalWithClass = (fill) => {
        setIsDropdownOpen(!isDropdownOpen);
        setParentShowHide(fill)
    };
    const childEmptyShowHide = (empty) => {
        setParentShowHide(empty)
    }
    const childEmptyRock = (empty) => {
        setParentRocks(empty)
    }

    // start table hide and show
    const [checkBoxStatus, setCheckBoxStatus] = useState({
        order_id: true
    })
    const [tableShowHide, setTableShowHide] = useState({
        check_box: "",
        order: "",
        price_list: ""
    })
    const handleOnChange = (e) => {
        const { name, checked } = e.target;
        setTableShowHide({ ...tableShowHide, [name]: checked })
    }

    const getChecKBoxData = () => {
        const arr = orderListdata?.orderList?.data
        const obj = Array.isArray(arr) && arr[0]
        const checkData = typeof obj === 'object' && Object.keys(obj)
        let finalData = checkData ? checkData : []
        finalData = finalData.filter((itmdx, indx) => {
            if (checkBoxStatus[itmdx] !== false) {
                return true
            } else {
                return false
            }
        })
        return finalData
    }
    // end  table hide and show

    //start header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = []

    if (orderList) {
        headers = DynamicHeaders(orderList, ['action_icons']);
    }

    const commanActions = (type) => {
        if (type === 4) {
            setIsCsvDownload(true)
        } else if (type === 1) {
            copyToClipboard()
        } else if (type === 3) {
            handleGeneratePdf()
        } else if (type === 2) {
            handlePrint()
        }
        setIsDropdownOpen(false);
    }

    const toogleActions = () => {
        setIsCsvDownload(false)
        setIsDropdownOpen(!isDropdownOpen);
    }


    const handleGeneratePdf = () => {
        var dataLists = orderListdata?.orderList?.data;
        exportPdf(dataLists, headers, '');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card className='h-100'>
                        <Card.Body className='pt-0'>
                            <Row className=" mb-2 d-flex align-items-center p-0 ps-2 my-2">
                                {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={orderListdata.orderList.data} headers={headers} target="_blank" />}
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
                                                                    setSearchText(e.target.value)
                                                                }}
                                                            />
                                                            <Dropdown
                                                                onToggle={(e) => toogleActions()}
                                                                addonType="append"
                                                                isOpen={isSortDropdownOpen}
                                                                toggle={toggleSortDropDown}
                                                                show={isDropdownOpen}
                                                                autoClose={false}
                                                                align="end"
                                                            >
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
                                                                            <button onClick={() => commanActions(1)} className="border p-1 px-2 ms-3 bt_color_hover bg-white">
                                                                                <i class="bi bi-file-earmark-richtext"></i>
                                                                            </button>
                                                                        </OverlayTrigger>
                                                                        <OverlayTrigger
                                                                            placement="bottom"
                                                                            overlay={
                                                                                <Tooltip id="overlay-example"> Print</Tooltip>
                                                                            }>
                                                                            <button onClick={() => commanActions(2)} className="border p-1 px-2 ms-3 bt_color_hover bg-white ">
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
                                                                            <button onClick={() => commanActions(3)} className="border p-1 px-2 bt_color_hover bg-white ">
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
                                                                            <button onClick={() => commanActions(4)} className="border p-1 ms-3 px-2 bt_color_hover  bg-white">
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
                            {ordersDataLoader?.loading ? <MainLoader /> : <Row >
                                <Col className='overflow-auto '>
                                    <Table ref={componentRef} className="mb-0 " size="sm">
                                        <thead>
                                            <tr className="bg-light">
                                                <th><input type="checkbox" /></th>
                                                {getChecKBoxData().map((itmde) => (
                                                    <th scope="col" className="text-truncate">
                                                        {itmde.split("_").join(" ").toUpperCase()}
                                                    </th>))}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderListdata?.orderList?.data?.map((item, index) => {
                                                return (
                                                    <tr key={index} className='align-middle'>
                                                        <td><input type="checkbox" /></td>
                                                        {getChecKBoxData().map((itmde) => {
                                                            if (itmde === "action_icons") {
                                                                return (<td>
                                                                    <>
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
                                                                                    {/* {item.action_icons.map((itemd) => {
                                                                                        return (
                                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> {itemd.name} </Tooltip>}>
                                                                                                <button className='border p-1 px-2 bt_color_hover' onClick={() => openModalWithSize("lg")}>
                                                                                                    <i class={itemd.icon}></i>
                                                                                                </button>
                                                                                            </OverlayTrigger>
                                                                                        )
                                                                                    })} */}
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Order Notes </Tooltip>}>
                                                                                        <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalWithSize("lg")}>
                                                                                            <i class="bi bi-info-lg text-dark  "></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                                                                                        <button className='border p-1 px-2 ms-3 bt_color_hover bg-white '>
                                                                                            <i class="bi bi-pencil-square"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                                        <button className='border p-1 px-2 ms-3  bg-white bt_color_hover'>
                                                                                            <i class="bi bi-trash3"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item className='bg-light'>
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Mini invoice </Tooltip>}>
                                                                                        <button className='border p-1 px-2 bt_color_hover bg-white '>
                                                                                            <i class="bi bi-file-earmark-text"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> whats App </Tooltip>}>
                                                                                        <button className='border p-1 ms-3 px-2 bt_color_hover bg-white'>
                                                                                            <i class="bi bi-whatsapp"></i></button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Send sms </Tooltip>}>
                                                                                        <button className='border p-1 px-2 ms-3  bg-white bt_color_hover'><i class="bi bi-envelope"></i></button>
                                                                                    </OverlayTrigger>{' '}
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item className='bg-light'>
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Racks</Tooltip>}>
                                                                                        <button className='border p-1 px-2  bg-white bt_color_hover' onClick={() => openModalWithScroll("lg")}>
                                                                                            <i class="bi bi-image"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delivery Request </Tooltip>}>
                                                                                        <button className='border p-1 px-2 ms-3  bg-white bt_color_hover' onClick={() => openModalWithScrolls("lg")}><i className="uil uil-truck"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Packing Sticker </Tooltip>}>
                                                                                        <button className='border p-1 px-2 ms-3  bg-white bt_color_hover'><i className="uil uil-smile"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item className='bg-light'>
                                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Barcode</Tooltip>}>
                                                                                        <button className='border p-1 px-2  bg-white bt_color_hover' >
                                                                                            <i className="uil uil-newspaper"></i>
                                                                                        </button>
                                                                                    </OverlayTrigger>{' '}
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </>
                                                                </td>)
                                                            } else if (itmde === "order_id") {
                                                                return (<th scope="row">{item[itmde]}</th>)
                                                            } else {
                                                                return (<td className="text-truncate">{item[itmde]}</td>)
                                                            }
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                                <div>
                                    <Racks parentRocks={parentRocks} childEmptyRock={childEmptyRock} />
                                    <OrderNotes parentFill={parentFill} childEmpty={childEmpty} />
                                    <DeliveryModel parentDelivery={parentDelivery} childEmptyDelivery={childEmptyDelivery} />
                                </div>
                                {paginationValues && <Col lg={12}>
                                    <Row className='mt-3'>
                                        <Col>
                                            <Row>
                                                <Col className="d-flex align-items-center mt-2 mb-2">
                                                    <div>
                                                        <p className='mb-0 me-2' >Display</p>
                                                    </div>
                                                    <FormInput name="select" type="select" className="form-select form-select-sm" key="select" onChange={(e) => {
                                                        setShowLimit(e.target.value)
                                                    }}>
                                                        <option>10</option>
                                                        <option>25</option>
                                                        <option>50</option>
                                                        <option>100</option>
                                                    </FormInput>
                                                    <div>
                                                        <p className='mb-0 ms-2' >Page <span className='fw-bold'>{`${page} of ${paginationValues.total_page}`}</span></p>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <p className='mb-0 ms-2 me-2' >Go to page:
                                                        </p>
                                                        <Form.Control
                                                            max={paginationValues.total_page}
                                                            min={1}
                                                            value={page}
                                                            required
                                                            type="number"
                                                            className='input_Style px-1 py-1'
                                                            onChange={(e) => {
                                                                setPage(e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='d-flex justify-content-end'>
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
                                                onPageChange={page => setPage(page)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>}
                            </Row>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row >
            {/* model */}
            <div  >
                <ShowHide checkBoxStatus={checkBoxStatus} setCheckBoxStatus={setCheckBoxStatus} parentShowHide={parentShowHide} childEmptyShowHide={childEmptyShowHide} handleOnChange={handleOnChange} />
            </div >
        </>
    );
};

export default OrderTable;