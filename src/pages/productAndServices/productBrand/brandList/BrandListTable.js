import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FormInput } from '../../../../components';
import BrandEditModel from './model/brandEditModel/BrandEditModel';
import { brandList, brandDelete } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Dropdown, Modal, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import './BrandList.css'
import MainLoader from '../../../../components/MainLoader';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import DeleteModel from '../../../../helpers/deleteModel/DeleteModel';
import { getBrandList } from '../../../../redux/productService/productBrand/saga';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';


const imageFormatter = (cell) => {
    return (<img style={{ width: 50 }} src={cell} />)
}

const BrandListTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const brandListData = store.BrandList;
    const brandListDataList = store.BrandList;
    const brandLists = brandListData?.brandList?.data;
    const paginationValues = store.BrandList?.brandList?.meta?.pagination
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const brandDeleteStatus = store?.BrandDelete?.status
    const brandDeleteMessage = store?.BrandDelete?.message

    const [isChecked, setIsChecked] = useState(false);

    const btnHideShow = () => {
        TableShowBtn();
    };

    useEffect(() => {
        dispatch(brandList(
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

    let headers = []
    if (brandLists) {
        headers = DynamicHeaders(brandLists, ['id', 'images']);
    }

    const handleGeneratePdf = () => {
        var dataLists = brandListData?.brandList?.data;
        exportPdf(dataLists, headers, 'Brand List');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions
    const getItemList = useCallback(() => {
        dispatch(brandList(
            {
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            }
        ))
    }, []);

    // start delete handle model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalProductCategoryDelete = (fill, emp_id) => {
        setParentDelete(fill);
        setDeleteId(emp_id);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            brandDelete({
                id: deleteId,
            })
        );
    };
    // end delete handle model

    // checked handle 
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };
    //start model edit 
    const [getRowData, setRowData] = useState('')
    const [parentBrandEditModel, setParentBrandEditModel] = useState('')
    const openModalBrandEditModel = (fill, data_fill) => {
        setParentBrandEditModel(fill);
        setRowData(data_fill)
    };

    const childEmptyEditModel = (empty) => {
        setParentBrandEditModel(empty)
    }
    //end model edit

    //start toast handle
    useEffect(() => {
        if (brandDeleteStatus === true) {
            ToastHandle('success', brandDeleteMessage);
            // TableShowBtn()
            // brandListUpdate()
            setDeleteId('')
            getItemList()
        } else if (brandDeleteStatus === false) {
            ToastHandle('error', brandDeleteMessage);
            setDeleteId('')
        }
    }, [brandDeleteStatus]);
    //end toast handle

    return (
        <>
            <div>
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
                                                        {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={brandListData?.brandList?.data} headers={headers} target="_blank" />}
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
                                                            className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                                            onClick={btnHideShow}
                                                        >
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

                                {brandListDataList?.loading ? <MainLoader /> :
                                    <Row>
                                        <Col>
                                            <Table ref={componentRef} className="mb-0 mt-3" size="sm">
                                                <thead>
                                                    <tr className='bg-light'>
                                                        <th><input type="checkbox" checked={isChecked}
                                                            onChange={handleOnChange} /></th>
                                                        <th>Sr.No.</th>
                                                        <th>Brand Name</th>
                                                        <th>Image</th>
                                                        <th>Remarks</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {brandListData?.brandList?.data?.map((item, index) => {
                                                        console.log(item, 'map')
                                                        return (
                                                            <tr key={index} className='align-middle'>
                                                                <td><input type='checkbox' checked={isChecked} /></td>
                                                                <th scope="row">{index + 1}</th>
                                                                <td >{item.brand_name}</td>
                                                                <td >{imageFormatter(item.images)}</td>
                                                                <td >{item.brand_remark}</td>
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
                                                                                        onClick={() => openModalProductCategoryDelete('modal-dialog-centered', item.id)}
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
                    <div>
                        <BrandEditModel
                            rowData={getRowData}
                            parentBrandEditModel={parentBrandEditModel}
                            childEmptyEditModel={childEmptyEditModel} />
                    </div>

                    <div>
                        <HandleDeleteModel
                            parentDelete={parentDelete}
                            childEmptyDelete={childEmptyDelete}
                            confirmDeleteHandle={confirmDeleteHandle}
                        />
                    </div>
                </Row>

            </div>
        </>)
}

export default BrandListTable