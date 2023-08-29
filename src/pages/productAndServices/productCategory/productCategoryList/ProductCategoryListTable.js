import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import { FormInput } from '../../../../components';
import EditProductModel from './model/editProduct/EditProductModel';
import './ProductCategoryList.css'
import { categoryList, categoryDelete } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import MainLoader from "../../../../components/MainLoader"
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import DeleteModel from '../../../../helpers/deleteModel/DeleteModel';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';


const ProductCategoryListTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const categoryListData = store?.ProductCategoryList?.categoryList?.data;
    const categoryLists = categoryListData?.categoryList?.data;
    const paginationValues = store.ProductCategoryList?.categoryList?.meta?.pagination
    const productCategoryDelete = store?.ProductCategoryDelete
    const productCategoryDeleteStatus = store?.ProductCategoryDelete?.status
    const productCategoryDeleteMessage = store?.ProductCategoryDelete?.message

    const [categoryListCheckboxData, setCategoryListCheckboxData] = useState([])
    const [categoryCheckboxDeleteData, setCategoryCheckboxDeleteData] = useState([]);
    const [categoryCheckboxDeleteMsg, setCategoryCheckboxDeleteMsg] = useState("");
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")

    const btnHideShow = () => {
        TableShowBtn();
    };
    //model
    const [parentEditModel, setParentEditModel] = useState('')
    const [getRowData, setRowData] = useState('')
    const openModalEditModel = (fill, data) => {
        setParentEditModel(fill)
        setRowData(data)
    };
    const childEmptyEditModel = (empty) => {
        setParentEditModel(empty)
    }
    //end model

    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen); };
    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = []
    if (categoryLists) {
        headers = DynamicHeaders(categoryLists, ['cat_id']);
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
        var dataLists = categoryListData?.categoryList?.data;
        exportPdf(dataLists, headers, 'Product Category');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions

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
            categoryDelete({
                id: deleteId,
            })
        );
    };
    // end delete handle model


    useEffect(() => {
        dispatch(categoryList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
    }, [page, showLimit, searchText])
    const getItemList = useCallback(() => {
        dispatch(categoryList(
            {
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            }
        ))
    }, []);
    //start toast handle
    useEffect(() => {
        if (productCategoryDeleteStatus === true) {
            ToastHandle('success', productCategoryDeleteMessage);
            getItemList();
        } else if (productCategoryDeleteStatus === false) {
            ToastHandle('error', productCategoryDeleteMessage);
        }
    }, [productCategoryDeleteStatus]);
    //end toast handle

    // start checkbox 
    useEffect(() => {
        setCategoryListCheckboxData(categoryListData)
    }, [categoryListData])


    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        if (name === "allselect") {
            const checkedValue = categoryListCheckboxData?.map((user) => {
                return { ...user, isChecked: checked }
            })
            setCategoryListCheckboxData(checkedValue)
        } else {
            const checkedValues = categoryListCheckboxData?.map((users) =>
                users.category_name === name ? { ...users, isChecked: checked } : users
            )
            setCategoryListCheckboxData(checkedValues)
        }
    }

    const handleDelete = () => {
        const checkedInputValue = [];
        for (let i = 0; i < categoryListCheckboxData.length; i++) {
            if (categoryListCheckboxData[i].isChecked === true) {
                checkedInputValue.push(parseInt(categoryListCheckboxData[i].cat_id));
            }
        }
    }
    useEffect(() => {
        setCategoryCheckboxDeleteData(productCategoryDelete)
    }, [productCategoryDelete])
    // end checkbox 
    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className='pt-0'>
                                <Col xl={12}>
                                    <div className="text-lg-end mt-xl-0 ">
                                        <Row>
                                            <Col xl={12} className='mt-2'>
                                                <div className="text-lg-end mt-xl-0">
                                                    <Button
                                                        variant="white"
                                                        className=" border py-0 pe-4 bg-primary text-white"
                                                        onClick={btnHideShow}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <h3>
                                                                <i class="bi bi-plus me-1 text-dark" />
                                                            </h3>
                                                            <div>New Product Category</div>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Row className=" d-flex align-items-center p-0 ms-1 my-2">
                                    <Col xl={8} className="d-flex align-items-center justify-content-xl-start mt-2 mb-2 ps-0 justify-content-between">
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
                                            <p className='mb-0 ms-2' >Records</p>
                                        </div>
                                    </Col>
                                    <Col xl={4}>
                                        <form className="row gy-2 gx-2 align-items-center justify-content-xl-end me-1">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <Row>
                                                        {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={categoryListData?.categoryList?.data} headers={headers} target="_blank" />}
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
                                </Row>

                                {categoryListData?.loading ? <MainLoader /> :
                                    <Row>
                                        <Col>
                                            <Table ref={componentRef} className="mb-0" size="sm">
                                                <thead>
                                                    <tr className='bg-light'>
                                                        <th>
                                                            <input
                                                                type="checkbox"
                                                                name="allselect"
                                                                checked={!categoryListCheckboxData?.some((user) => user?.isChecked !== true)}
                                                                onChange={(e) => { handleChangeCheckbox(e) }}
                                                            />
                                                        </th>
                                                        <th>Category ID</th>
                                                        <th>Service Name</th>
                                                        <th>Status</th>
                                                        <th>Description</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categoryListCheckboxData?.map((record, index) => {
                                                        return (
                                                            <tr key={index} className='align-middle'>
                                                                <th>
                                                                    <input
                                                                        type="checkbox"
                                                                        name={record.category_name}
                                                                        checked={record?.isChecked || false}
                                                                        onChange={(e) => { handleChangeCheckbox(e) }}
                                                                    />
                                                                </th>
                                                                <td scope="row">{index + 1}</td>
                                                                <td>{record.category_name}</td>
                                                                <td>{record.status}</td>
                                                                <td>{record.category_descr}</td>
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
                                                                                <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalEditModel('lg', record)} >
                                                                                    <i className="mdi mdi-square-edit-outline" ></i>
                                                                                </button>
                                                                            </OverlayTrigger>{' '}

                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                                <button
                                                                                    onClick={() => openModalProductCategoryDelete('modal-dialog-centered', record.cat_id)}
                                                                                    className='border p-1 px-2 ms-3 bt_color_hover bg-white'>
                                                                                    <i className="mdi mdi-delete"></i>
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
                                                <EditProductModel rowData={getRowData} parentEditModel={parentEditModel} childEmptyEditModel={childEmptyEditModel} />
                                            </div>
                                            {paginationValues && <Col lg={12}>
                                                <Row className='mt-3'>
                                                    <Col>
                                                        <Row>
                                                            <Col className="d-flex align-items-center mt-2 mb-2">
                                                                {/* <div>
                                                                    <p className='mb-0 me-2' >Display</p>
                                                                </div>
                                                                <FormInput name="select" type="select" className="form-select form-select-sm" key="select" onChange={(e) => {
                                                                    setShowLimit(e.target.value)
                                                                }}>
                                                                    <option>10</option>
                                                                    <option>25</option>
                                                                    <option>50</option>
                                                                    <option>100</option>
                                                                </FormInput> */}
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
                                                        <HandleDeleteModel
                                                            parentDelete={parentDelete}
                                                            childEmptyDelete={childEmptyDelete}
                                                            confirmDeleteHandle={confirmDeleteHandle}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>}
                                        </Col>
                                    </Row>}
                                <Row>
                                    <Col>
                                        <h4 className='text-danger'>
                                            <i class="bi bi-trash3" ></i>
                                            <button onClick={() => handleDelete()} className="btn btn-danger ms-2">Delete</button>
                                        </h4>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProductCategoryListTable