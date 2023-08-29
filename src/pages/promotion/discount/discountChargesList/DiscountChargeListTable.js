import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import DiscountEditModelForm from './model/discountEditModel/DiscountEditModelForm';
import { useDispatch, useSelector } from 'react-redux';
import { discountChargesDelete, discountChargesDetail, discountChargesList } from '../../../../redux/actions';
import Loader from "../../../../components/MainLoader"
import Paginations from '../../../../helpers/paginations/Pagination';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';

const DiscountChargeListTable = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const discountChargeListData = store?.DiscountChargesList?.discountChargesList?.data
    const paginationValues = store?.DiscountChargesList?.discountChargesList?.meta?.pagination
    const discountChargeListLoader = store?.DiscountChargesList;
    const discountDeleteData = store?.DiscountChargesDelete?.data
    const discountDeleteStatus = store?.DiscountChargesDelete?.data?.status
    const discountDeleteMessage = store?.DiscountChargesDelete?.data?.message

    const [searchText, setSearchText] = useState("")
    const [showLimit, setShowLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [parentDiscountEdit, setParentDiscountEdit] = useState('');


    // start dropdown
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const btnChild = () => {
        TableShowBtn()
    }
    //end dropdown

    //start Model
    const openModalDiscountEdit = (fill, discountChargesId) => {
        setParentDiscountEdit(fill);
        dispatch(discountChargesDetail({ discountChargesId: discountChargesId }))
    };
    const childEmptyDiscountEdit = (empty) => {
        setParentDiscountEdit(empty);
    };
    // end model

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDelete = (fill, discountId) => {
        setParentDelete(fill);
        setDeleteId(discountId);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            discountChargesDelete({
                discountId: deleteId,
            })
        );
    };
    // end delete handle model

    useEffect(() => {
        dispatch(
            discountChargesList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            })
        );
    }, [searchText, showLimit, page]);

    useEffect(() => {
        if (discountDeleteData?.status) {
            dispatch(discountChargesList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }))
        }

    }, [discountDeleteData])

    useEffect(() => {
        if (discountDeleteStatus) {
            ToastHandle('success', discountDeleteMessage);
        } else if (discountDeleteStatus === false) {
            ToastHandle('error', discountDeleteMessage);
        }
    }, [discountDeleteStatus]);

    return (
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
                                                        <Form.Control placeholder="Search..."
                                                            onChange={(e) => {
                                                                setSearchText(e.target.value)
                                                            }} className='border-0 bg-light' />
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
                        {discountChargeListLoader?.loading ? <Loader /> :
                            <>
                                <Row >
                                    <Col className=' table_container'>
                                        <Table className="mb-0" size="sm">
                                            <thead>
                                                <tr className="bg-light">
                                                    <th scope="col" className="text-truncate">
                                                        Sr.No.
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Discount/Charge Name
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Transaction Type
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Transaction Value
                                                    </th>

                                                    <th scope="col" className="text-truncate">
                                                        Default(Y/N)
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Specific customer
                                                    </th>
                                                    <th scope="col" className="text-truncate">
                                                        Remarks
                                                    </th>
                                                    <th scope="col" className="text-truncate">

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {discountChargeListData?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th className="text-truncate">{index + 1}</th>
                                                            <th className="text-truncate">{item.charge_name}</th>
                                                            <th className="text-truncate text-success">{item.charge_type}</th>
                                                            <th className="text-truncate">{item.charge_amt}</th>
                                                            <th className="text-truncate">{item.default}</th>
                                                            <th className="text-truncate"></th>
                                                            <th className="text-truncate"></th>

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



                                                                                <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                    onClick={() => openModalDiscountEdit("lg", item.charge_id)}

                                                                                >
                                                                                    <i className="mdi mdi-square-edit-outline "></i>
                                                                                </button>
                                                                            </OverlayTrigger>

                                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> View </Tooltip>}>
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
                                        <Row>
                                            <Col>
                                                <DiscountEditModelForm parentDiscountEdit={parentDiscountEdit} childEmptyDiscountEdit={childEmptyDiscountEdit} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
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
        </Row>
    )
}

export default DiscountChargeListTable