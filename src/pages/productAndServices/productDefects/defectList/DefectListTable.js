import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Pagination, Table } from 'react-bootstrap';
import { orders } from '../../../apps/Ecommerce/Data'
import { FormInput } from '../../../../components';
import EditModel from './model/editDefectModel/EditModel';
import { useSelector, useDispatch } from 'react-redux';
import { defectList, defectDelete } from '../../../../redux/actions';
import MainLoader from "../../../../components/MainLoader"
import "../defectList/defect.css"
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import ShowHide from './model/showHideColumns/ShowHide';
// import DeleteModel from '../../../../helpers/deleteModel/DeleteModel';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';




const ActionColumn = (props) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };

    //model

    const [parentEditModel, setParentEditModel] = useState('')
    const [getRowData, setRowData] = useState('')

    const openModalEditModel = (fill) => {
        setParentEditModel(fill)
        setRowData(props.rowData)

    };

    const childEmptyEditModel = (empty) => {
        setParentEditModel(empty)
    }

    const defectDeleteLoad = store.DefectDelete

    const [parentModelDelete, setParentModelDelete] = useState('')


    const openModalhandelDelete = (fill) => {
        setParentModelDelete(fill)
    }

    const ChildcloseModalHandel = (empty) => {
        setParentModelDelete(empty)
    }

    const deleteAction = (id) => {
        dispatch(defectDelete({ 'id': id }))
    }

    const getItemList = useCallback(() => {
        dispatch(defectList(
            {
                searchValue: '',
                pageNumber: 1,
                showLimit: 10,
            }
        ))
    }, []);

    useEffect(() => {
        if (defectDeleteLoad?.status) {
            getItemList();
        }
    }, [defectDeleteLoad]);

    return (
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
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                            <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalEditModel('lg')} >
                                <i className="mdi mdi-square-edit-outline" ></i>
                            </button>
                        </OverlayTrigger>{' '}

                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'>
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </OverlayTrigger>{' '}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                {/* <DeleteModel parentModelDelete={parentModelDelete} deleteId={props.rowData.id} deleteAction={deleteAction} ChildcloseModalHandel={ChildcloseModalHandel} /> */}

            </div>
        </>
    );
};

const DeffectListTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnHideShow = () => {
        TableShowBtn();
    };
    const btnChild = () => {
        TableShowBtn()
    }


    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const defectData = store.DefectList;
    const defectDataList = store.DefectList;
    const paginationValues = store.DefectList?.defectList?.meta?.pagination
    const defectLists = defectData?.defectList?.data;
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const defectListDeleteStatus = store?.DefectDelete?.status
    const defectListDeleteMessage = store?.DefectDelete?.message






    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let headers = []
    if (defectLists) {
        headers = DynamicHeaders(defectLists, ['id']);
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
        var dataLists = defectData?.defectList?.data;
        exportPdf(dataLists, headers, 'Packages Pdf');
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
        const arr = defectData?.defectList?.data
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

    // new code 
    //model

    const [parentEditModel, setParentEditModel] = useState('')
    const [getRowData, setRowData] = useState('')

    const openModalEditModel = (fill, item) => {
        setParentEditModel(fill)
        setRowData(item)

    };

    const childEmptyEditModel = (empty) => {
        setParentEditModel(empty)
    }

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDefectDelete = (fill, emp_id) => {
        setParentDelete(fill);
        setDeleteId(emp_id);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(defectDelete({ id: deleteId }))
    };
    // end delete handle model


    useEffect(() => {
        dispatch(defectList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
    }, [page, showLimit, searchText])

    //start toast handle
    useEffect(() => {
        if (defectListDeleteStatus === true) {
            ToastHandle('success', defectListDeleteMessage);
            dispatch(defectList(
                {
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                }
            ))

        } else if (defectListDeleteStatus === false) {
            ToastHandle('error', defectListDeleteMessage);
        }
    }, [defectListDeleteStatus]);
    //end toast handle



    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className='pt-0'>
                                <Row className="  d-flex align-items-center p-0 ms-1 my-3">
                                    <Col xl={8} className='d-flex ps-0'>
                                        <div className="text-lg-start mt-xl-0 d-flex">
                                            {/* <Button variant="white" className=" border py-0 pe-3 bg-primary text-white" >
                                                <div className='d-flex align-items-center'>
                                                    <h3>
                                                        <i class="bi bi-plus me-1 text-dark" />
                                                    </h3>
                                                    <div>Defect List</div>
                                                </div>
                                            </Button> */}
                                            <Button
                                                variant="white"
                                                className=" border  py-0 pe-3 bg-primary text-white "
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
                                    <Col xl={4}>
                                        <form className="row gy-2 gx-2 align-items-center justify-content-xl-end justify-content-between me-1">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <Row>
                                                        {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={defectData?.defectList?.data} headers={headers} target="_blank" />}
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
                                                                            {/* <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example"> Print</Tooltip>
                                                                                }>
                                                                                <button onClick={() => commanActions(2)} className="border p-1 px-2 ms-3 bt_color_hover bg-white ">
                                                                                    <i class="bi bi-printer"></i>
                                                                                </button>
                                                                            </OverlayTrigger> */}
                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        Export to PDF
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button onClick={() => commanActions(3)} className="border p-1 px-2 ms-3 bt_color_hover bg-white ">
                                                                                    <i class="bi bi-file-earmark-x"></i>
                                                                                </button>
                                                                            </OverlayTrigger>
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className="bg-light">

                                                                            <OverlayTrigger
                                                                                placement="bottom"
                                                                                overlay={
                                                                                    <Tooltip id="overlay-example">
                                                                                        Export to Excel
                                                                                    </Tooltip>
                                                                                }>
                                                                                <button onClick={() => commanActions(4)} className="border p-1 px-2 bt_color_hover  bg-white">
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

                                {defectDataList?.loading ? <MainLoader /> :

                                    <Row>
                                        <Col>
                                            <Table ref={componentRef} className="mb-0 mt-3" size="sm">
                                                <thead>
                                                    <tr className='bg-light'>
                                                        <th> <input type='checkbox' /></th>
                                                        {getChecKBoxData().map((itmde) => (<th scope="col" className="text-truncate">
                                                            {itmde.split("_").join(" ").toUpperCase()}
                                                        </th>))}
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {defectData?.defectList?.data?.map((item, index) => {
                                                        return (
                                                            <tr key={index} className='align-middle'>
                                                                <td> <input type='checkbox' /></td>
                                                                {/* <td className="text-truncate">
                                                            <Link to="#" className="action-icon">
                                                                <i
                                                                    className="mdi mdi-square-edit-outline"
                                                                    onClick={() => openModalWithScrolls('lg')}></i>
                                                            </Link>
                                                            <Link to="#" className="action-icon">
                                                                <i className="mdi mdi-delete"></i>
                                                            </Link>
                                                        </td> */}
                                                                {getChecKBoxData().map((itmde) => {
                                                                    if (itmde === "order_id") {
                                                                        return (<th scope="row">{item[itmde]}</th>)
                                                                    } else {
                                                                        return (<td className="text-truncate">{item[itmde]}</td>)
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
                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
                                                                                    <button className='border p-1 px-2 bt_color_hover bg-white'
                                                                                        onClick={() => openModalEditModel('lg', item)}
                                                                                    >
                                                                                        <i className="mdi mdi-square-edit-outline" ></i>
                                                                                    </button>
                                                                                </OverlayTrigger>{' '}

                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                                    <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                        onClick={() => openModalWithDefectDelete('modal-dialog-centered',
                                                                                            item.id)}>
                                                                                        <i className="mdi mdi-delete"></i>
                                                                                    </button>
                                                                                </OverlayTrigger>{' '}
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                                {/* <td><ActionColumn
                                                                    rowData={item}
                                                                ></ActionColumn></td> */}
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
                                                                    console.log(e.target.value)
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
            </div>
            <div  >
                <ShowHide checkBoxStatus={checkBoxStatus} setCheckBoxStatus={setCheckBoxStatus} parentShowHide={parentShowHide} childEmptyShowHide={childEmptyShowHide} handleOnChange={handleOnChange} />
            </div >
            <div>
                <EditModel rowData={getRowData} parentEditModel={parentEditModel} childEmptyEditModel={childEmptyEditModel} />
                <HandleDeleteModel
                    parentDelete={parentDelete}
                    childEmptyDelete={childEmptyDelete}
                    confirmDeleteHandle={confirmDeleteHandle} />
            </div>
        </>)
}

export default DeffectListTable