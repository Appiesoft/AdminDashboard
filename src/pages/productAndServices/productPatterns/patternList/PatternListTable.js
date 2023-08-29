import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import { productPatternsList, patternDelete } from '../../../../redux/actions';
import { FormInput } from '../../../../components';
import EditPattern from './model/editModelPattern/EditPattern';
import { useSelector, useDispatch } from 'react-redux';
import MainLoader from '../../../../components/MainLoader';
import "./PatternList.css"
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import Paginations from '../../../../helpers/paginations/Pagination';
import DeleteModel from '../../../../helpers/deleteModel/DeleteModel';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';

// const ActionColumn = (props) => {
//     const reportTemplateRef = useRef(null);

//     const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

//     const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };

//     const [getRowData, setRowData] = useState('')

//     //model

//     const [parentEditModel, setParentEditModel] = useState('')

//     const openModalEditModel = (fill) => {
//         setParentEditModel(fill)
//         setRowData(props.rowData)
//     };

//     const childEmptyEditModel = (empty) => {
//         setParentEditModel(empty)
//     }
//     const dispatch = useDispatch()
//     const store = useSelector((state) => state);
//     const patternDeleteLoad = store.ProductPatternsDelete

//     const [parentModelDelete, setParentModelDelete] = useState('')

//     const openModalhandelDelete = (fill) => {
//         setParentModelDelete(fill)
//     }

//     const ChildcloseModalHandel = (empty) => {
//         setParentModelDelete(empty)
//     }

//     const deleteAction = (id) => {
//         dispatch(patternDelete({ 'id': id }))
//     }

//     const getItemList = useCallback(() => {
//         dispatch(productPatternsList(
//             {
//                 searchValue: '',
//                 pageNumber: 1,
//                 showLimit: 10,
//             }
//         ))
//     }, []);

//     useEffect(() => {
//         if (patternDeleteLoad?.status) {
//             getItemList();
//         }
//     }, [patternDeleteLoad])
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
//                     <Dropdown.Item className='bg-light'>
//                         <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Edit </Tooltip>}>
//                             <button className='border p-1 px-2 bt_color_hover bg-white' onClick={() => openModalEditModel('lg')} >
//                                 <i className="mdi mdi-square-edit-outline" ></i>
//                             </button>
//                         </OverlayTrigger>{' '}

//                         <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
//                             <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
//                                 onClick={() => openModalhandelDelete('modal-dialog-centered')}>
//                                 <i className="mdi mdi-delete"></i>
//                             </button>
//                         </OverlayTrigger>{' '}
//                     </Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//             <div>
//                 <DeleteModel parentModelDelete={parentModelDelete} deleteId={props.rowData.id} deleteAction={deleteAction} ChildcloseModalHandel={ChildcloseModalHandel} />

//                 <EditPattern rowData={getRowData} parentEditModel={parentEditModel} childEmptyEditModel={childEmptyEditModel} />
//             </div>
//         </>
//     );
// };


const PatternListTable = ({ TableShowBtn }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => { setIsSortDropdownOpen(!isSortDropdownOpen) };


    const dispatch = useDispatch()
    const store = useSelector((state) => state);

    const productPatternsListData = store.ProductPatternsList;
    const productPatternsLists = productPatternsListData?.productPatternsList?.data;
    const paginationValues = store.ProductPatternsList?.productPatternsList?.meta?.pagination
    const productPatternDeleteStatus = store?.ProductPatternsDelete?.status
    const productPatternDeleteMessage = store?.ProductPatternsDelete?.message

    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const btnHideShow = () => {
        TableShowBtn();
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

    useEffect(() => {
        dispatch(productPatternsList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ))
    }, [page, showLimit, searchText])

    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }

    let headers = []
    if (productPatternsLists) {
        headers = DynamicHeaders(productPatternsLists, ['id', 'images']);
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
        var dataLists = productPatternsListData?.productPatternsList?.data;
        exportPdf(dataLists, headers, 'Patterns Lits');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
        dispatch(patternDelete({ id: deleteId }))
    };
    // end delete handle model


    //start toast handle
    useEffect(() => {
        if (productPatternDeleteStatus === true) {
            ToastHandle('success', productPatternDeleteMessage);
            dispatch(productPatternsList(
                {
                    searchValue: searchText,
                    pageNumber: page,
                    showLimit: showLimit,
                }
            ))

        } else if (productPatternDeleteStatus === false) {
            ToastHandle('error', productPatternDeleteMessage);
        }
    }, [productPatternDeleteStatus]);
    //end toast handle






    return (
        <>
            <div>
                <Card>
                    <Card.Body className='pt-0'>
                        <Row>
                            <Col xs={12} >
                                <Row className=" d-flex align-items-center p-0 ms-1 my-2 ">
                                    <Col xl={8} className='ps-1'>
                                        <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <Row>
                                                        {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={productPatternsListData?.productPatternsList?.data} headers={headers} target="_blank" />}
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
                                                    <div className="text-lg-end mt-xl-0 ">
                                                        <Button
                                                            variant="white"
                                                            className=" border py-0 pe-4 bg-primary text-white"
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
                                {productPatternsListData?.loading ? <MainLoader /> :

                                    <Row>
                                        <Col>
                                            <Table ref={componentRef} className="mb-0 " size="sm">
                                                <thead>
                                                    <tr className='bg-light'>
                                                        <th><input type='checkbox' /></th>
                                                        <th>Sr.No.</th>
                                                        <th>Pattern Name</th>
                                                        <th>Image</th>
                                                        <th>Remarks</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productPatternsListData?.productPatternsList?.data?.map((item, index) => {
                                                        return (
                                                            <tr key={index} className='align-middle'>
                                                                <td><input type='checkbox' /></td>

                                                                <th scope="row">{index + 1}</th>
                                                                <td >{item.name}</td>
                                                                <td >{imageFormatter(item.images)}</td>
                                                                <td >{item.remark}</td>
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

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <div>
                    <EditPattern rowData={getRowData} parentEditModel={parentEditModel} childEmptyEditModel={childEmptyEditModel} />
                    <HandleDeleteModel
                        parentDelete={parentDelete}
                        childEmptyDelete={childEmptyDelete}
                        confirmDeleteHandle={confirmDeleteHandle} />
                </div>
            </div>
        </>)
}

export default PatternListTable