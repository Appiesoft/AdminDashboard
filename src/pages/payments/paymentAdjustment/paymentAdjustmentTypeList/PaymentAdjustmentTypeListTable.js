import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Dropdown, Card, Table, Pagination, OverlayTrigger, Tooltip, Button, InputGroup, Form, } from 'react-bootstrap';
import EditRecordForm from './model/editRecordModel/EditRecordForm';
import { useDispatch, useSelector } from 'react-redux';
import { paymentAdjustmentList, paymentAdjustmentDelete } from '../../../../redux/actions';
import Loader from "../../../../components/MainLoader"
import { FormInput } from '../../../../components';
import "./PaymentAdjustmentTypeListTable.css"
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import ToastHandle from '../../../../helpers/toastMessage';



const PaymentAdjustmentTypeListTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const paymentAdjustmentData = store?.PaymentAdjustmentList?.paymentAdjustmentList?.data
    const paginationValues = store?.PaymentAdjustmentList?.paymentAdjustmentList?.meta?.pagination
    const paymentDeleteStatus = store?.PaymentAdjustmentDelete?.status
    const paymentDeleteMessage = store?.PaymentAdjustmentDelete?.message
    const PaymentAdjustmentLoader = store.PaymentAdjustmentList;
    const [searchText, setSearchText] = useState("")
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)


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



    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnHideShow = () => {
        TableShowBtn();
    };

    // model

    const [parentEditRecord, setParentEditRecord] = useState('')
    const [paymentEditData, setPaymentEditData] = useState(null)

    const openModalEditRecord = (fill, data) => {
        setPaymentEditData(data)
        setParentEditRecord(fill)
    };

    const childEmptyEditRecord = (empty) => {
        setParentEditRecord(empty)
    }

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
        dispatch(paymentAdjustmentDelete({
            paymentAdjustmentId: deleteId
        }))
    };
    // end delete handle model


    const getPaymentAjustment = () => {
        dispatch(paymentAdjustmentList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                from: "",
                to: "",
                driverId: "",
                chooseFor: ""
            }
        ));
    };

    useEffect(() => {
        getPaymentAjustment();
    }, [showLimit, searchText, page]);

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = [];

    if (paymentAdjustmentData) {
        headers = DynamicHeaders(paymentAdjustmentData, []);
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
        var dataLists = paymentAdjustmentData;
        exportPdf(dataLists, headers, 'Payment Adjustment List');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions

    useEffect(() => {
        if (paymentDeleteStatus) {
            ToastHandle('success', paymentDeleteMessage);
            getPaymentAjustment()
        } else if (paymentDeleteStatus === false) {
            ToastHandle('error', paymentDeleteMessage);
        }

    }, [paymentDeleteStatus])

    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className='pt-0'>
                                <Row className='d-flex align-items-center my-2'>
                                    <Col>
                                        <Col xl={12}>
                                            <div className="text-lg-start mt-xl-0 ">
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
                                    </Col>
                                    <Col>
                                        <Col lg={12} className="d-flex justify-content-end px-2">
                                            <Row>
                                                {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={paymentAdjustmentData} headers={headers} target="_blank" />}
                                                <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0">
                                                    <span className="mdi mdi-magnify search-icon"></span>
                                                    <InputGroup>
                                                        <Form.Control placeholder="Search..." className='border-0 bg-light' onChange={(e) => {
                                                            setSearchText(e.target.value)
                                                        }} />
                                                        <Dropdown
                                                            addonType="append"
                                                            align="end"
                                                            show={isDropdownOpen}
                                                            autoClose={false}
                                                            onToggle={(e) => toogleActions()}
                                                        >
                                                            <Dropdown.Toggle variant="secondary">
                                                                <i className="uil uil-sort-amount-down "></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className='bg-light'>
                                                                <Dropdown.Item className='bg-light'>
                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example" >Copy to clipboard</Tooltip>}>
                                                                        <button onClick={() => commanActions(1)} className='border p-1 px-2 bt_color_hover bg-white'>
                                                                            <i class="bi bi-file-earmark-richtext"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}

                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Print</Tooltip>}>
                                                                        <button onClick={() => commanActions(2)} className='border p-1 px-2 ms-3 bt_color_hover bg-white '>
                                                                            <i class="bi bi-printer"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className='bg-light'>
                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to PDF</Tooltip>}>
                                                                        <button onClick={() => commanActions(3)} className='border p-1 px-2 bt_color_hover bg-white '>
                                                                            <i class="bi bi-file-earmark-x"></i>
                                                                        </button>

                                                                    </OverlayTrigger>{' '}
                                                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to Excel</Tooltip>}>
                                                                        <button onClick={() => commanActions(4)} className='border p-1 ms-3 px-2 bt_color_hover  bg-white'>
                                                                            <i class="bi bi-file-earmark-pdf"></i>
                                                                        </button>
                                                                    </OverlayTrigger>{' '}
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Col>

                                </Row>
                                {PaymentAdjustmentLoader?.loading ? <Loader /> : <Row>
                                    <Col>

                                        <Table ref={componentRef} className="mb-0" size="sm">
                                            <thead className='bg-light'>
                                                <tr>
                                                    <th><input type="checkbox" /></th>
                                                    <th>Sr.No.</th>
                                                    <th></th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paymentAdjustmentData?.map((record, index) => {
                                                    return (
                                                        <tr key={index} className='align-middle'>
                                                            <th scope="row"><input type="checkbox" /></th>
                                                            <td>{record.id}</td>
                                                            <td>{record.type}</td>
                                                            <td><Dropdown
                                                                addonType="append"
                                                                isOpen={isSortDropdownOpen}
                                                                toggle={toggleSortDropDown}
                                                                align="end">
                                                                <Dropdown.Toggle variant="light ">
                                                                    <i className="uil uil-sort-amount-down "></i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className='bg-light px-2'>
                                                                    <Dropdown.Item className='bg-light'>
                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                                                                            <button className='border p-1 px-2 bt_color_hover bg-white'
                                                                                onClick={() => openModalEditRecord('lg', record)}
                                                                            >
                                                                                <i className="mdi mdi-square-edit-outline" ></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}

                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'>
                                                                                <i className="mdi mdi-delete"
                                                                                    onClick={() =>
                                                                                        openModalWithDelete('modal-dialog-centered',
                                                                                            record.id)
                                                                                    }></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                        <div>
                                            <EditRecordForm parentEditRecord={parentEditRecord} childEmptyEditRecord={childEmptyEditRecord} paymentEditData={paymentEditData} />
                                        </div>
                                        {paginationValues && <Row className='mt-3'>
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
                                </Row>}


                            </Card.Body>
                        </Card>
                    </Col>
                    <HandleDeleteModel
                        parentDelete={parentDelete}
                        childEmptyDelete={childEmptyDelete}
                        confirmDeleteHandle={confirmDeleteHandle}
                    />
                </Row>
            </div>
        </>)
}

export default PaymentAdjustmentTypeListTable