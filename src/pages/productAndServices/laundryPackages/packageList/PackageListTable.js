import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FormInput } from '../../../../components';
import { laundryPackagesList, serviceCategoryList, laundryPackageDelete } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import MainLoader from '../../../../components/MainLoader';
import EditModel from '../../laundryPackages/packageList/model/packageListEditModel/EditModel';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import ShowHide from './model/showHideColumns/ShowHide';
import DeleteModel from '../../../../helpers/deleteModel/DeleteModel';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';



// const ActionColumn = (props) => {
//     const dispatch = useDispatch()
//     const store = useSelector((state) => state);
//     const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
//     const [getRowData, setRowData] = useState('')

//     const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };

//     const [parentEditModel, setParentEditModel] = useState('')

//     const openModalEditModel = (fill) => {
//         setParentEditModel(fill)
//         setRowData(props.rowData)
//     };

//     const childEmptyEditModel = (empty) => {
//         setParentEditModel(empty)
//     }

//     const laundryDeleteLoad = store.LaundryPackagesDelete

//     const [parentModelDelete, setParentModelDelete] = useState('')

//     const openModalhandelDelete = (fill) => {
//         setParentModelDelete(fill)
//     }

//     const ChildcloseModalHandel = (empty) => {
//         setParentModelDelete(empty)
//     }

//     const deleteAction = (id) => {
//         dispatch(laundryPackageDelete({ 'id': id }))
//     }

//     const getItemList = useCallback(() => {
//         dispatch(laundryPackagesList(
//             {
//                 searchValue: '',
//                 pageNumber: 1,
//                 showLimit: 10,
//             }
//         ))
//     }, []);


//     useEffect(() => {
//         if (laundryDeleteLoad?.status) {
//             getItemList();
//         }
//     }, [laundryDeleteLoad])

//     return (
//         <>
//             <Dropdown
//                 addonType="append"
//                 isOpen={isSortDropdownOpen}
//                 toggle={toggleSortDropDown}
//                 align="end">
//                 <Dropdown.Toggle variant="light ">
//                     <i className="uil uil-sort-amount-down "></i>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu className='bg-light px-2'>
//                     <Dropdown.Item className='bg-light '>
//                         <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example" > Edit </Tooltip>}>
//                             <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalEditModel('lg')}>
//                                 <i className="mdi mdi-square-edit-outline" ></i>
//                             </button>
//                         </OverlayTrigger>{' '}
//                         <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
//                             <button onClick={() => openModalhandelDelete('modal-dialog-centered')} className='border p-1 px-2 ms-3 bt_color_hover bg-white'>
//                                 <i className="mdi mdi-delete"></i>
//                             </button>
//                         </OverlayTrigger>{' '}
//                     </Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//             <div>
//                 <DeleteModel parentModelDelete={parentModelDelete} deleteId={props.rowData.pkg_id} deleteAction={deleteAction} ChildcloseModalHandel={ChildcloseModalHandel} />

//             </div>
//         </>
//     );
// };

const PackageListTable = ({ TableShowBtn }) => {
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
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




    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // end png
    //end header actions

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnHideShow = () => {
        TableShowBtn();
    };


    const dispatch = useDispatch()
    const store = useSelector((state) => state);

    const laundryPackagesListData = store.LaundryPackagesList;
    const laundryPackagesLists = laundryPackagesListData?.laundryPackagesList?.data;
    const paginationValues = store.LaundryPackagesList?.laundryPackagesList?.meta?.pagination;
    const laundaryDeleteStatus = store?.LaundryPackagesDelete?.status
    const laundaryDeleteMessage = store?.LaundryPackagesDelete?.message

    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")


    let headers = []
    if (laundryPackagesLists) {
        headers = DynamicHeaders(laundryPackagesLists, ['id']);
    }

    const handleGeneratePdf = () => {
        var dataLists = laundryPackagesListData?.laundryPackagesList?.data;
        exportPdf(dataLists, headers, 'Packages Pdf');
    };

    // start pagination 
    const getPaginationNumberView = () => {
        const collectionPagination = []
        if ((paginationValues.total_page - page) <= 5) {
            for (let i = paginationValues.total_page - 5; i <= paginationValues.total_page; i++) {
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
        const arr = laundryPackagesListData?.laundryPackagesList?.data
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

    //new code 
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
        dispatch(laundryPackageDelete({ id: deleteId }))
    };
    // end delete handle model

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



    useEffect(() => {
        dispatch(laundryPackagesList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
    }, [page, showLimit, searchText])

    useEffect(() => {
        dispatch(serviceCategoryList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
    }, [])

    //start toast handle
    useEffect(() => {
        if (laundaryDeleteStatus === true) {
            ToastHandle('success', laundaryDeleteMessage);
            dispatch(laundryPackagesList(
                {
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                }
            ))
        } else if (laundaryDeleteStatus === false) {
            ToastHandle('error', laundaryDeleteMessage);
            setDeleteId('')
        }
    }, [laundaryDeleteStatus]);
    //end toast handle

    return (
        <>
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body className='pt-0 '>
                                <Col xl={8} className='ps-0'>
                                    <div className="mt-xl-0 ">
                                        <Row >
                                            <Col xl={12} className='ps-1 mt-2'>
                                                <div className="text-lg-start mt-xl-0 ">
                                                    {/* <Button
                                                        variant="white"
                                                        className=" border py-0 pe-4 bg-primary text-white ms-1"
                                                        onClick={btnHideShow}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <h3>
                                                                <i class="bi bi-plus me-1 text-dark" />
                                                            </h3>
                                                            <div>Package List</div>
                                                        </div>
                                                    </Button> */}
                                                    <Button
                                                        variant="white"
                                                        className=" border py-0 pe-4 bg-primary text-white ms-1"
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
                                        <form className="row gy-2 gx-2 align-items-center justify-content-xl-end justify-content-between me-1">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <Row>
                                                        {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={laundryPackagesListData?.laundryPackagesList?.data} headers={headers} target="_blank" />}
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

                                {laundryPackagesListData?.loading ? <MainLoader /> :

                                    <Row className='d-flex align-items-center'>

                                        <Col>
                                            <Table ref={componentRef} className="mb-0 " size="sm">
                                                <thead>
                                                    <tr className='bg-light'>
                                                        {getChecKBoxData().map((itmde) => (<th scope="col" className="text-truncate">
                                                            {itmde.split("_").join(" ").toUpperCase()}
                                                        </th>))}
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {laundryPackagesListData?.laundryPackagesList?.data?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                {getChecKBoxData().map((itmde) => {
                                                                    if (itmde === "order_id") {
                                                                        return (<th scope="row">{item[itmde]}</th>)
                                                                    } else {
                                                                        return (<td className="text-truncate">{item[itmde]}</td>)
                                                                    }
                                                                })}
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
                                                                                        onClick={() => openModalProductCategoryDelete('modal-dialog-centered', item.pkg_id)}
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
                                                                {/* <div>
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
                                                    </Col>
                                                </Row>
                                            </Col>}
                                        </Col>
                                    </Row>
                                }
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

            </div>

            <div>
                <HandleDeleteModel
                    parentDelete={parentDelete}
                    childEmptyDelete={childEmptyDelete}
                    confirmDeleteHandle={confirmDeleteHandle}
                />
            </div>
        </>)
}

export default PackageListTable