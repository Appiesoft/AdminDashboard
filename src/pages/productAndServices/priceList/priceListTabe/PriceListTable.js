import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FormInput } from '../../../../components';
import { priceList, serviceCategoryList, categoryList, itemList, itemDelete, itemDetails } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Dropdown, InputGroup, Form, Card, Table, OverlayTrigger, Tooltip, Button, Pagination } from 'react-bootstrap';
import EditForm from '../model/editRecord/EditForm';
import AddItemForm from '../model/addItem/AddItemForm';
import { orders } from '../../../apps/Ecommerce/Data';
import { Link } from 'react-router-dom';
import "./PriceListTable.css"
import MainLoader from '../../../../components/MainLoader';
import { copyToClipboard } from '../../../../helpers/copyToClipBoard';
import { exportPdf } from '../../../../helpers/exportPdf';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import DeleteModel from '../../../../helpers/deleteModel/DeleteModel';
import DynamicHeaders from '../../../../helpers/dynamicHeaders';

const ActionColumn = (props) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const [parentEdit, setParentEdit] = useState('')
    const [getRowData, setRowData] = useState('')

    const openModalWithScrolls = (fill, id) => {
        dispatch(itemDetails({ itemId: id }))

        setParentEdit(fill)
        setRowData(props.rowData)

    };

    const childEmptyEdit = (empty) => {
        setParentEdit(empty)
    }

    const productItemListDeleteLoad = store.ProductItemDelete
    const priceListData = store.PriceList?.priceList

    const [parentModelDelete, setParentModelDelete] = useState('')

    const openModalhandelDelete = (fill) => {
        setParentModelDelete(fill)
    }

    const ChildcloseModalHandel = (empty) => {
        setParentModelDelete(empty)
    }

    const deleteAction = (id) => {
        dispatch(itemDelete({ 'id': id }))
    }

    const getItemList = useCallback(() => {
        let id = priceListData?.data[0].id;
        dispatch(itemList(
            {
                priceListId: id
            }
        ))
    }, []);

    useEffect(() => {
        if (productItemListDeleteLoad?.status) {
            getItemList();
        }
    }, [productItemListDeleteLoad]);

    return (
        <>
            <Link to="#" className="action-icon">

                <i className="mdi mdi-square-edit-outline" onClick={() => openModalWithScrolls('lg', props.rowData.id)} ></i>

            </Link>
            <Link to="#" onClick={() => openModalhandelDelete('modal-dialog-centered')} className="action-icon">
                <i className="mdi mdi-delete"></i>
            </Link>
            <div>
                <DeleteModel parentModelDelete={parentModelDelete} deleteId={props.rowData.id} deleteAction={deleteAction} ChildcloseModalHandel={ChildcloseModalHandel} />

                <EditForm rowData={getRowData} parentEdit={parentEdit} childEmptyEdit={childEmptyEdit} />
            </div>
        </>
    );
};
const PriceTable = ({ TableShowBtn }) => {

    const btnTransfer = () => {
        TableShowBtn();
    };

    const [parentAddItemForm, setParentAddItemForm] = useState('')
    const [avtiveTab, setActiveTab] = useState(0);
    const openModalAddItemForm = (fill) => {
        setParentAddItemForm(fill)
    };

    const childEmptyAddItemForm = (empty) => {
        setParentAddItemForm(empty)
    }


    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const priceListData = store.PriceList?.priceList
    const itemListData = store.ProductItemList;
    const dataTimeLists = itemListData?.productItemList?.data;
    const paginationValues = store.ProductItemList?.ProductItemList?.meta?.pagination
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const btnHideShow = () => {
        TableShowBtn();
    };

    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }
    //header actions
    const [isCsvDownload, setIsCsvDownload] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    let headers = []

    if (dataTimeLists) {
        headers = DynamicHeaders(dataTimeLists, ['image', 'id']);
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
        var dataLists = itemListData?.productItemList?.data;
        exportPdf(dataLists, headers, '');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    //end header actions

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

    const getItemList = useCallback((priceList) => {
        let id = priceList?.data[0].id;
        dispatch(itemList(
            {
                priceListId: id
            }
        ))
    }, []);

    useEffect(() => {

        if (priceListData?.status) {
            getItemList(priceListData)
        }

    }, [priceListData]);

    useEffect(() => {

        dispatch(priceList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ));

        dispatch(serviceCategoryList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ));
        dispatch(categoryList(
            {
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            }
        ));
    }, [])

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };


    const [orderList, setOrderList] = useState(orders);

    const changeOrderStatusGroup = (OrderStatusGroup) => {
        let updatedData = orders;
        //  filter
        updatedData =
            OrderStatusGroup === 'All'
                ? orders
                : [...orders].filter((o) => o.payment_status?.includes(OrderStatusGroup));
        setOrderList(updatedData);
    };

    const getListItem = (index) => {
        setActiveTab(index);
        let id = priceListData?.data[index].id;
        dispatch(itemList(
            {
                priceListId: id
            }
        ))
    }



    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0 mt-2 '>
                            <Row className=" d-flex align-items-center">
                                {isCsvDownload && <CSVDownload filename={"patternList.csv"} data={itemListData?.productItemList?.data} headers={headers} target="_blank" />}
                                <Col xl={8}>
                                    <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    <Col className="d-flex ms-1 align-items-center border-start bg-light border-top border-bottom pe-0">
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
                                        <Button
                                            variant="white"
                                            className=" border py-0 pe-4 bg-primary text-white me-2"
                                            onClick={() => openModalAddItemForm('lg')}
                                        >
                                            <div className="d-flex align-items-center">
                                                <h3>
                                                    <i class="bi bi-plus me-1 text-dark" />
                                                </h3>
                                                <div>Add Item</div>
                                            </div>
                                        </Button>
                                        <AddItemForm parentAddItemForm={parentAddItemForm} childEmptyAddItemForm={childEmptyAddItemForm} />
                                        <Button
                                            variant="white"
                                            className=" border py-0 pe-4 bg-primary text-white me-2"
                                            onClick={btnTransfer}
                                        >
                                            <div className="d-flex align-items-center">
                                                <h3>
                                                    <i class="bi bi-plus me-1 text-dark" />
                                                </h3>
                                                <div>Create new price list</div>
                                            </div>
                                        </Button>

                                    </div>
                                </Col>
                            </Row>
                            {itemListData?.loading ? <MainLoader /> :
                                <Row className='mt-2'>
                                    <Col>
                                        <Row >
                                            <Col>
                                                {priceListData?.data?.map((item, index) => {
                                                    return (
                                                        <button onClick={() => getListItem(index)} className={avtiveTab === index ? 'btn border_style' : 'btn border'}>{item.price_list_name}</button>
                                                    )
                                                })}
                                            </Col>
                                        </Row>
                                        <Table ref={componentRef} className="mb-0 " size="sm">
                                            <thead className='bg-light'>
                                                <tr>
                                                    <th><input type="checkbox" /></th>
                                                    <th>Sr.No.</th>
                                                    <th>Price List</th>
                                                    <th>Service Name</th>
                                                    <th>Category Name</th>
                                                    <th>Product List</th>
                                                    <th>Price</th>
                                                    <th>Min Price</th>
                                                    <th>Unit</th>
                                                    <th>Short Code</th>
                                                    <th>Image</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itemListData?.productItemList?.data?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='align-middle'>
                                                            <td><input type="checkbox" /></td>
                                                            <td scope="row">{index + 1}</td>
                                                            <td >{item.price_list_name}</td>
                                                            <td >{item.service_name}</td>
                                                            <td >{item.category_name}</td>
                                                            <td >{item.product_name}</td>
                                                            <td >{item.price}</td>
                                                            <td >{item.min_price}</td>
                                                            <td >{item.piece}</td>
                                                            <td >{item.short_code}</td>
                                                            <td >{imageFormatter(item.image)}</td>
                                                            <td><ActionColumn
                                                                rowData={item}
                                                            ></ActionColumn></td>
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
                                                                <p className='mb-0 ms-2' >Page<span className='fw-bold'>{`${page} of ${paginationValues.total_page}`}</span></p>
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

                                                </Col>
                                            </Row>
                                        </Col>}
                                    </Col>
                                </Row>}


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>)
}

export default PriceTable