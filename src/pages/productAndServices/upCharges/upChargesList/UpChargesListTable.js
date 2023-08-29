import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FormInput } from '../../../../components';
import { upchargesList, upchargesDelete } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import EditUpCharges from './model/editModelUp/EditUpCharges';
import MainLoader from "../../../../components/MainLoader"
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';



const UpChargesListTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const upchargesListData = store.UpchargesList;
    const upchargesLists = upchargesListData.upchargesList;
    const paginationValues = store.UpchargesList?.upchargesList?.meta?.pagination
    const upChargesListDeleteStatus = store?.UpchargesDelete?.status
    const upChargesListDeleteMessage = store?.UpchargesDelete?.message

    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const btnHideShow = () => {
        TableShowBtn();
    };


    useEffect(() => {
        dispatch(upchargesList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
    }, [page, showLimit, searchText])

    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    let headers = []

    if (upchargesLists) {
        headers = DynamicHeaders(upchargesLists, ['id']);
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
        var dataLists = upchargesListData.upchargesList;
        exportPdf(dataLists, headers, 'Upcharges List');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions


    // new code 
    //start model edit 
    const [getRowData, setRowData] = useState('')
    const [parentEditModel, setParentEditModel] = useState('')
    const openModalBrandEditModel = (fill, data_fill) => {
        setParentEditModel(fill);
        setRowData(data_fill)
    };

    const childEmptyEditModel = (empty) => {
        setParentEditModel(empty)
    }
    //end model edit

    // start delete handle model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalProductColorDelete = (fill, emp_id) => {
        setParentDelete(fill);
        setDeleteId(emp_id);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(upchargesDelete({ 'id': deleteId }))

    };
    // end delete handle model

    // end new code 

    //start toast handle
    useEffect(() => {
        if (upChargesListDeleteStatus === true) {
            ToastHandle('success', upChargesListDeleteMessage);
            dispatch(upchargesList(
                {
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                }
            ))
        } else if (upChargesListDeleteStatus === false) {
            ToastHandle('error', upChargesListDeleteMessage);
        }
    }, [upChargesListDeleteStatus]);
    //end toast handle




    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className='pt-0'>
                                <Row className=" d-flex align-items-baseline p-0 ms-1 my-2">
                                    <Col xl={4}>
                                        <div className=" mt-xl-0 ">
                                            <Row>
                                                <Col xl={12} className='ps-0'>
                                                    <div className=" d-flex text-lg-start mt-xl-0 mt-2">
                                                        {/* <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2">
                                                            <div className='d-flex align-items-center'>
                                                                <div className="d-flex align-items-center">
                                                                    <h3>
                                                                        <i class="bi bi-plus me-1 text-dark" />
                                                                    </h3>
                                                                    <div>Upcharges List</div>
                                                                </div>
                                                            </div>
                                                        </Button> */}
                                                        <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white me-2 " onClick={btnHideShow}>
                                                            <div className='d-flex align-items-center'>
                                                                <div className="d-flex align-items-center">
                                                                    <h3>
                                                                        <i class="bi bi-plus me-1 text-dark" />
                                                                    </h3>
                                                                    <div>New Entry</div>
                                                                </div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col xl={8} className='ps-1'>
                                        <form className="row gy-2 gx-2 align-items-center justify-content-xl-end justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <Row>
                                                        {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={upchargesListData.upchargesList} headers={headers} target="_blank" />}
                                                        <Col className="d-flex align-items-center border-start bg-light border-top border-bottom pe-0 me-2">
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

                                                </div>
                                            </div>
                                        </form>
                                    </Col>
                                </Row>

                                {upchargesListData?.loading ? <MainLoader /> :

                                    <Row className='d-flex align-items-center '>
                                        <Col>
                                            <Table ref={componentRef} className="mb-0 " size="sm">
                                                <thead>
                                                    <tr className='bg-light'>
                                                        <th>Sr.No.</th>
                                                        <th>Name</th>
                                                        <th>Unit</th>
                                                        <th>Price</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {upchargesListData.upchargesList?.map((item, index) => {
                                                        return (
                                                            <tr key={index} className='align-middle'>
                                                                <th scope="row">{index + 1}</th>
                                                                <td >{item.name}</td>
                                                                <td >{item.unit}</td>
                                                                <td >{item.price}</td>
                                                                <td>
                                                                    {/* <ActionColumn
                                                                    rowData={item}
                                                                ></ActionColumn> */}
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
                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                                                                                    <button className='border p-1 px-2 bt_color_hover bg-white'
                                                                                        onClick={() => openModalBrandEditModel('lg', item)}
                                                                                    >
                                                                                        <i className="mdi mdi-square-edit-outline" ></i>
                                                                                    </button>
                                                                                </OverlayTrigger>{' '}

                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                                    <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                        onClick={() => openModalProductColorDelete('modal-dialog-centered', item.id)}
                                                                                    >
                                                                                        <i className="mdi mdi-delete"></i>
                                                                                    </button>
                                                                                </OverlayTrigger>{' '}
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
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
                                        </Col>
                                    </Row>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div>
                    <EditUpCharges rowData={getRowData} parentEditModel={parentEditModel} childEmptyEditModel={childEmptyEditModel} />

                    <div>
                        <HandleDeleteModel
                            parentDelete={parentDelete}
                            childEmptyDelete={childEmptyDelete}
                            confirmDeleteHandle={confirmDeleteHandle}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpChargesListTable