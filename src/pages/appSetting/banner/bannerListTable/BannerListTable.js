import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, InputGroup, Form, Card, OverlayTrigger, Tooltip, Button, Table, Pagination } from 'react-bootstrap';
import FormInput from "../../../../components/FormInput"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bannerDetail, bannerList } from '../../../../redux/appSettings/banner/actions';
import Paginations from '../../../../helpers/paginations/Pagination';
import MainLoader from '../../../../components/MainLoader';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import { bannersDelete } from '../../../../redux/appSettings/banner/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import BannerEditModel from './model/bannerEditModel';

// import "./BannerList.css"

const BannerListTable = ({ showBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const bannerListData = store?.BannerList?.bannerList?.data
    const paginationValues = store?.BannerList?.bannerList?.meta?.pagination
    const bannerLoader = store?.BannerList
    const bannerDeleteData = store?.BannerDelete
    const bannerDeleteStatus = store?.BannerDelete?.status
    const bannerDeleteMessage = store?.BannerDelete?.message

    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openModalWithDelete = (fill, bannerId) => {
        setParentDelete(fill);
        setDeleteId(bannerId);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            bannersDelete({
                bannerId: deleteId,
            })
        );
    };
    // end delete handle model

    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const btnChild = () => {
        showBtn()
    }

    //start Model
    const [parentEdit, setParentEdit] = useState('');
    const openModalEditBannerList = (fill, bannerId) => {
        setParentEdit(fill);
        dispatch(bannerDetail({ bannerId: bannerId }));
    };
    const childEmptyEdit = (empty) => {
        setParentEdit(empty);
    };
    // end model


    useEffect(() => {
        dispatch(bannerList(
            {
                search: searchText,
                pageNumber: page,
                showLimit: showLimit
            }
        ))
    }, [searchText, page, showLimit])

    useEffect(() => {
        if (bannerDeleteData?.status) {
            dispatch(bannerList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }))
        }

    }, [bannerDeleteData])


    useEffect(() => {
        if (bannerDeleteStatus) {
            ToastHandle('success', bannerDeleteMessage);
        } else if (bannerDeleteStatus === false) {
            ToastHandle('error', bannerDeleteMessage);
        }
    }, [bannerDeleteStatus]);



    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className='pt-0'>
                            <Row className=" d-flex align-items-center p-0 ps-2 my-2">
                                <Col xl={8}>
                                    <form className="row gy-2  gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <Row>
                                                    <Col className="d-flex  align-items-center border-start bg-light border-top border-bottom pe-0">
                                                        <span className="mdi mdi-magnify search-icon"></span>
                                                        <InputGroup>
                                                            <Form.Control onChange={(e) => {
                                                                setSearchText(e.target.value)
                                                            }} placeholder="Search..." className='border-0 bg-light' />
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
                                                            <div>Add Banner</div>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            {bannerLoader?.loading ? <MainLoader />
                                :
                                <>
                                    <Row >
                                        <Col className=' table_container'>
                                            <Table className="mb-0 " size="sm">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th scope="col" className="text-truncate">
                                                            Sr.No.
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Image
                                                        </th>
                                                        <th scope="col" className="text-truncate">
                                                            Name
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
                                                    {bannerListData?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-truncate">{index + 1}</td>
                                                                <td className="text-truncate">{imageFormatter(item.banner_image)}</td>
                                                                <td className="text-truncate text-success">{item.banner_name}</td>
                                                                <td className="text-truncate">{item.banner_description}</td>
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
                                                                                {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> Assign Driver </Tooltip>}>
                                                                    <button className='border p-1 px-2 bt_color_hover bg-white'
                                                                    >
                                                                        <i className="uil uil-search-plus"></i>
                                                                    </button>
                                                                    <Link to='/customer/customerdetail' className='border p-1 px-2 bt_color_hover text-dark bg-white'>
                                                                        <i className="uil uil-search-plus"></i>
                                                                    </Link>
                                                                </OverlayTrigger> */}

                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> View </Tooltip>}>
                                                                                    <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                        onClick={() => openModalEditBannerList("lg", item.id)}
                                                                                    >
                                                                                        <i className="mdi mdi-square-edit-outline "></i>
                                                                                    </button>
                                                                                </OverlayTrigger>

                                                                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="overlay-example"> View </Tooltip>}>
                                                                                    <button className='border p-1 px-2 ms-3 bt_color_hover bg-white'
                                                                                        onClick={() => openModalWithDelete("modal-dialog-centered", item.id)}
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
                        <div>
                            <BannerEditModel parentEdit={parentEdit} childEmptyEdit={childEmptyEdit} />
                        </div>
                    </Card>
                </Col>
            </Row>

        </div>

    )
}

export default BannerListTable