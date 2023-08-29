import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from "../../../../components/FormInput"
import MainLoader from '../../../../components/MainLoader';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import Paginations from '../../../../helpers/paginations/Pagination';
import { promoCouponDelete, promoCouponDetail, promoCouponList } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import PromoCouponsEdit from './model/promoCouponsEdit/PromoCouponsEdit';

const CoupantListTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const promoCouponData = store?.PromoCouponList?.promoCouponList?.data
    const paginationValues = store?.PromoCouponList?.promoCouponList?.meta?.pagination
    const promoCouponLoader = store?.PromoCouponList
    const promoCouponDeleteData = store?.PromoCouponDelete
    const promoCouponDeleteStatus = store?.PromoCouponDelete?.status
    const promoCouponDeleteMessage = store?.PromoCouponDelete?.message

    const [searchText, setSearchText] = useState("")
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [openEdModel, setOpenEditModel] = useState(false)

    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDelete = (fill, promoCouponId) => {
        setParentDelete(fill);
        setDeleteId(promoCouponId);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            promoCouponDelete({
                promoCouponId: deleteId,
            })
        );
    };
    // end delete handle model


    //start Model
    const [parentPromoEdit, setParentEdit] = useState('');
    const openModalEditEmployeeList = (fill, deleteId) => {
        setParentEdit(fill);
        dispatch(promoCouponList({ promoCouponId: deleteId }));
    };
    const childEmptyPromoEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        TableShowBtn()
    }
    const openEditModel = (promoCouponId) => {
        console.log(promoCouponId)
        setOpenEditModel(true)
        dispatch(promoCouponDetail({ promoCouponId: promoCouponId }))
    }

    const closeEditModel = (value) => {
        setOpenEditModel(false)
    }

    useEffect(() => {
        dispatch(promoCouponList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
    }, [searchText, page, showLimit])

    useEffect(() => {
        if (promoCouponDeleteData?.status) {
            dispatch(promoCouponList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }))
        }

    }, [promoCouponDeleteData])


    useEffect(() => {
        if (promoCouponDeleteStatus) {
            ToastHandle('success', promoCouponDeleteMessage);
        } else if (promoCouponDeleteStatus === false) {
            ToastHandle('error', promoCouponDeleteMessage);
        }
    }, [promoCouponDeleteStatus]);
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            <Row className="  d-flex align-items-center p-0 ps-2 my-2">
                                <Col xl={8}>
                                    <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom border-end pe-0">
                                                        <span className="mdi mdi-magnify search-icon"></span>
                                                        <InputGroup>
                                                            <Form.Control
                                                                placeholder="Search..."
                                                                className="border-0 bg-light"
                                                                onChange={(e) => {
                                                                    setSearchText(e.target.value)
                                                                }}
                                                            />
                                                            {/* <Dropdown
                                                                addonType="append"
                                                                isOpen={isSortDropdownOpen}
                                                                toggle={toggleSortDropDown}
                                                                align="end">
                                                                <Dropdown.Toggle variant="secondary">
                                                                    <i className="uil uil-sort-amount-down "></i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className='bg-light'>
                                                                    <Dropdown.Item className='bg-light'>
                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example">Copy to clipboard</Tooltip>}>
                                                                            <button className='border p-1 px-2 bt_color_hover bg-white'>
                                                                                <i class="bi bi-file-earmark-richtext"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}

                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Print</Tooltip>}>
                                                                            <button className='border p-1 px-2 ms-3 bt_color_hover bg-white '>
                                                                                <i class="bi bi-printer"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item className='bg-light'>
                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to PDF</Tooltip>}>
                                                                            <button className='border p-1 px-2 bt_color_hover bg-white '>
                                                                                <i class="bi bi-file-earmark-x"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}

                                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Export to Excel</Tooltip>}>
                                                                            <button className='border p-1 ms-3 px-2 bt_color_hover  bg-white'>
                                                                                <i class="bi bi-file-earmark-pdf"></i>
                                                                            </button>
                                                                        </OverlayTrigger>{' '}
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown> */}
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
                                                    <Button variant="white" className=" border py-0 pe-4 bg-primary text-white me-2" onClick={() => btnChild()}>
                                                        <div className='d-flex align-items-center'>
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
                            {promoCouponLoader?.loading ? <MainLoader /> :
                                <>
                                    <Row>
                                        <Col className='overflow-auto'>
                                            <Table className="mb-0" size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th scope="col" className="text-truncate">
                                                            Sr.No.
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Image
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Promo/Coupons Name
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Type of Promo/Coupons
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Transaction Type
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Coupon Value
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Minimum Order Value
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Minimum Value of Discount
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Expire Date
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Max Time Uses
                                                        </th>

                                                        <th scope="col" className="text-truncate">
                                                            Usage with Other Coupon
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Default(Y/N)
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Specific Customer
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Description
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {promoCouponData?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-truncate">{index + 1}</td>
                                                                <td className="text-truncate">{imageFormatter(item.image)}</td>
                                                                <td className="text-truncate text-success"></td>
                                                                <td className="text-truncate">{item.promo_type}</td>
                                                                <td className="text-truncate"></td>
                                                                <td className="text-truncate"></td>
                                                                <td className="text-truncate">{item.min_order_value}</td>
                                                                <td className="text-truncate"></td>
                                                                <td className="text-truncate">{item.expire_date}</td>
                                                                <td className="text-truncate">{item.max_time_uses}</td>
                                                                <td className="text-truncate">{item.usage_with_other_coupon}</td>
                                                                <td className="text-truncate">{item.defaults}</td>
                                                                <td className="text-truncate">{item.specific_customer}</td>
                                                                <td className="text-truncate"></td>

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
                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> View </Tooltip>}>
                                                                                    <button className='border p-1 px-2 bt_color_hover bg-white'
                                                                                        onClick={() => openEditModel(item.charge_id)}
                                                                                    >
                                                                                        <i className="mdi mdi-square-edit-outline "></i>
                                                                                    </button>
                                                                                </OverlayTrigger>

                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Delete </Tooltip>}>
                                                                                    <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                        onClick={() => openModalWithDelete("modal-dialog-centered", item.charge_id)}
                                                                                    >
                                                                                        <i className="mdi mdi-delete"></i>
                                                                                    </button>
                                                                                </OverlayTrigger>
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
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
                                                <Pagination className='pagination_style btn-hover'><i className="uil uil-angle-left"></i></Pagination>
                                                <Pagination className='pagination_style bg-primary text-white mx-1'>{1}</Pagination>
                                                <Pagination className='pagination_style btn-hover'>{2}</Pagination>
                                                <Pagination className='pagination_style mx-1 btn-hover'>{3}</Pagination>
                                                <Pagination className='pagination_style btn-hover'>{4}</Pagination>
                                                <Pagination className='pagination_style mx-1 btn-hover'>{5}</Pagination>
                                                <Pagination className='pagination_style'>...</Pagination>
                                                <Pagination className='pagination_style mx-1 btn-hover'>{10}</Pagination>

                                                <Pagination className='pagination_style btn-hover' ><i className="uil uil-angle-right"></i></Pagination>
                                            </Pagination> */}
                                                <Paginations
                                                    currentPage={parseInt(paginationValues?.current_page)}
                                                    totalCount={paginationValues?.total_data}
                                                    pageSize={showLimit}
                                                    onPageChange={page => setPage(page)}
                                                />
                                            </Col>
                                        </Row>
                                    }
                                </>
                            }

                        </Card.Body>
                        <div>
                            <HandleDeleteModel
                                parentDelete={parentDelete}
                                childEmptyDelete={childEmptyDelete}
                                confirmDeleteHandle={confirmDeleteHandle}
                            />
                        </div>
                    </Card>
                </Col>
                <Row>
                    <Col>
                        <div>
                            <PromoCouponsEdit open={openEdModel} close={closeEditModel} />
                        </div>
                    </Col>
                </Row>
            </Row></>
    )
}

export default CoupantListTable