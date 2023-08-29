import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import { FormInput } from '../../../../components';
import './PaymentListTable.css'
import RefundPaymentForm from './model/refundPayment/RefundPaymentForm';
import { useDispatch, useSelector } from 'react-redux';
import { paymentList } from '../../../../redux/actions';
import Loader from "../../../../components/MainLoader"
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import ShowHide from './model/showHideColumns/ShowHide';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';


const PaymentListTable = () => {

    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const PaymentListLoader = store.PaymentList;
    const paymentListData = store?.PaymentList?.paymentList?.data;
    const paginationValues = store?.PaymentList?.paymentList?.meta?.pagination
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [parentRefundPayment, setParentRefundPayment] = useState('')

    //paginations start
    const getPaginationNumberView = () => {
        const collectionPagination = []
        if ((paginationValues.total_page - page) <= 5) {
            for (let i = paginationValues.total_page - 5; i <= paginationValues?.total_page; i++) {
                const active = page === i
                collectionPagination.push((<Pagination className={active ? 'pagination_style mx-1 btn-hover bg-primary text-white' : "pagination_style mx-1 btn-hover"} onClick={() => {
                    setPage(i)
                }}>{i}</Pagination>))
            }
        } else {

            for (let i = 0; i < 5; i++) {
                const active = page === (page + i)
                collectionPagination.push((<Pagination className={active ? 'pagination_style mx-1 btn-hover bg-primary text-white' : "pagination_style mx-1 btn-hover"} onClick={() => {
                    setPage(page + i)
                }}>{page + i}</Pagination>))
            }
            collectionPagination.push((<Pagination className='pagination_style'>...</Pagination>
            ))
            collectionPagination.push((<Pagination onClick={() => {
                setPage(paginationValues.total_page)
            }} className={page === paginationValues.total_page ? 'pagination_style mx-1 btn-hover bg-primary text-white' : "pagination_style mx-1 btn-hover"}>{paginationValues.total_page}</Pagination>))
        }

        return collectionPagination
    }
    // end pagination

    //Dropdown start
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    //Dropdown end


    //model start
    const openModalRefundPayment = (fill) => {
        setParentRefundPayment(fill)
    };

    const childEmptyRefundPayment = (empty) => {
        setParentRefundPayment(empty)
    }
    //model end


    const getPaymentList = () => {

        dispatch(
            paymentList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
                orderDate: '',
            })
        );
    };

    useEffect(() => {
        getPaymentList();
    }, [page, showLimit, searchText]);

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    let headers = [];

    if (paymentListData) {
        headers = DynamicHeaders(paymentListData, []);
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
        var dataLists = paymentListData;
        exportPdf(dataLists, headers, 'Payment Lists');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions


    //model sidebar model hide and show
    const [parentShowHide, setParentShowHide] = useState('')

    const openModalWithClass = (fill) => {
        setIsDropdownOpen(!isDropdownOpen);
        setParentShowHide(fill)
    };
    const childEmptyShowHide = (empty) => {
        setParentShowHide(empty)
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
        const arr = paymentListData
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

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className=" mb-2 d-flex align-items-center p-0 ms-1">
                                <Col xl={8}>
                                    <form className="row gy-2 mb-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={paymentListData} headers={headers} target="_blank" />}
                                                    <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0">
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
                            {PaymentListLoader?.loading ? <Loader /> : <>

                                <Row>
                                    <Col>
                                        <Col className='overflow-auto '>
                                            <Table ref={componentRef} className="mb-0 mt-3" size="sm">
                                                <thead>
                                                    <tr className='bg-light'>
                                                        <th><input type="checkbox" /></th>
                                                        {getChecKBoxData().map((itmde) => (<th scope="col" className="text-truncate">
                                                            {itmde.split("_").join(" ").toUpperCase()}
                                                        </th>))}
                                                        <th className='text-truncate'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paymentListData?.map((item, index) => {
                                                        return (
                                                            <tr key={index} className='align-middle'>
                                                                <td><input type="checkbox" /></td>
                                                                {getChecKBoxData().map((itmde) => {
                                                                    if (itmde === "order_id") {
                                                                        return (<th scope="row">{item[itmde]}</th>)
                                                                    } else {
                                                                        return (<td className="text-truncate">{item[itmde]}</td>)
                                                                    }
                                                                })}
                                                                <td>
                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">Refund</Tooltip>}>
                                                                        <button className='border p-1 px-2 bt_color_hover bg-primary text-white' onClick={() => openModalRefundPayment('lg')}>
                                                                            <i className="dripicons-retweet"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>

                                        <div>
                                            {<RefundPaymentForm parentRefundPayment={parentRefundPayment} childEmptyRefundPayment={childEmptyRefundPayment} />}
                                        </div>
                                        {paginationValues &&
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
                                                                <p className='mb-0 ms-2' >Page <span className='fw-bold'>1 of 10</span></p>
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
                                            </Row>}
                                    </Col>
                                </Row></>}


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div  >
                <ShowHide checkBoxStatus={checkBoxStatus} setCheckBoxStatus={setCheckBoxStatus} parentShowHide={parentShowHide} childEmptyShowHide={childEmptyShowHide} handleOnChange={handleOnChange} />
            </div >
        </>
    )
}

export default PaymentListTable