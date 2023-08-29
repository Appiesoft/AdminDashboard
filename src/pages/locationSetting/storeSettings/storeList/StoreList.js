import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Card, Table, Form, Button, Collapse, Popover, OverlayTrigger, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../../components/MainLoader';
import { storeDelete, storeDetails, storeList } from '../../../../redux/actions';
import EditStoreForm from '../editStoreModel/EditStoreForm';
import HandleDeleteModel from '../../../../helpers/deleteModel/handleDeleteModel/HandleDeleteModel';
import ToastHandle from '../../../../helpers/toastMessage';

const StoreList = ({ showBtn }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const storeListData = store?.StoreList
    const storeDeleteData = store?.StoreDelete
    const storeDeleteStatus = store?.StoreDelete?.status
    const storeDeleteMessage = store?.StoreDelete?.message
    const storeEditStatus = store?.StoreUpdate?.status


    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [showLimit, setShowLimit] = useState(10)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    //model edit
    const [parentEditStore, setParentEditStore] = useState('');

    const childEmptyEditStore = (empty) => {
        setParentEditStore(empty);
    };
    //component btn
    const btnTransfer = () => {
        showBtn();
    };

    const openModalEditStore = (fill, storeId) => {
        setParentEditStore(fill);
        dispatch(storeDetails({ storeId: storeId }))
    };

    //start delete handle Model
    const [parentDelete, setParentDelete] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const openStoreDelete = (fill, emp_id) => {
        setParentDelete(fill);
        setDeleteId(emp_id);
    };
    const childEmptyDelete = (empty) => {
        setParentDelete(empty);
    };
    const confirmDeleteHandle = () => {
        dispatch(
            storeDelete({
                storeId: deleteId,
            })
        );
    };
    // end delete handle model

    useEffect(() => {
        dispatch(storeList({
            searchValue: searchText,
            pageNumber: page,
            showLimit: showLimit
        }))
    }, [searchText, page, showLimit])

    useEffect(() => {
        if (storeDeleteData.status) {
            dispatch(storeList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }))
        }
    }, [storeDeleteData])

    useEffect(() => {
        if (storeEditStatus) {
            dispatch(storeList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit
            }))
        }

    }, [storeEditStatus])
    // start toast
    useEffect(() => {
        if (storeDeleteStatus) {
            ToastHandle('success', storeDeleteMessage);

        } else if (storeDeleteStatus === false) {
            ToastHandle('error', storeDeleteMessage);
        }
    }, [storeDeleteStatus])
    // end toast

    return (
        <>
            <Card >
                <Card.Body className='pt-0'>
                    <Container>
                        <Row className=" d-flex align-items-center my-2">
                            <Col xl={6} className='ps-3'>
                                <h2>Store Mangement</h2>
                            </Col>
                            <Col xl={6} className='pe-0'>
                                <div className="text-lg-end mt-xl-0 ">
                                    <Button
                                        variant="white"
                                        className="mb-2 border py-0 pe-4 bg-primary text-white me-2"
                                        onClick={btnTransfer}
                                    >
                                        <div className="d-flex align-items-center">
                                            <h3>
                                                <i class="bi bi-plus me-1 text-dark" />
                                            </h3>
                                            <div>Add Store</div>
                                        </div>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        {storeListData.loading ? <MainLoader /> : <Row className='  '>
                            <Col lg={12}>
                                <Row>
                                    {storeListData?.storeList?.map((item, index) => (
                                        <Col lg={4} className=' mb-4 position-relative'>
                                            <Row className='mx-auto border mb-4 h-100' key={index}>
                                                <Col lg={12} className='d-flex flex-column'>
                                                    <Row className='border bg-light'>
                                                        <Col lg={12}><h3>The Wash House</h3></Col>
                                                    </Row>
                                                    <Row className='mt-3'>
                                                        <Col lg={12} className='mt-2 border-bottom '>
                                                            <Row className='border-bottom'>
                                                                <Col lg={4}>Address:</Col>
                                                                <Col lg={8}>{item.address1}</Col>
                                                            </Row>
                                                            <Row className='my-2 border-bottom'>
                                                                <Col lg={4}>City/State :</Col>
                                                                <Col lg={8}>{item.city},{item.state}</Col>
                                                            </Row>
                                                            <Row className='border-bottom'>
                                                                <Col lg={4}>Email:</Col>
                                                                <Col lg={8}>{item.email}</Col>
                                                            </Row>
                                                            <Row className='my-2 border-bottom'>
                                                                <Col lg={4}>Phone :</Col>
                                                                <Col lg={8}>{item.phone}</Col>
                                                            </Row>
                                                            <Row className='border-bottom'>
                                                                <Col lg={4}>Tax Id :</Col>
                                                                <Col lg={8}>{item.store_tax_no}</Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mt-auto py-4'>
                                                        <Col className='d-flex justify-content-center'>
                                                            <button className='btn-success border-0 px-2 py-1'>Login</button>
                                                            <button className='ms-3 btn-warning border-0 px-2 py-1' onClick={() => openModalEditStore('lg', item.store_id)}>Edit</button>
                                                            <button className='ms-3 btn-danger border-0 px-2 py-1' onClick={() => { openStoreDelete('modal-dialog-centered', item.store_id) }}>Delete</button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>}
                    </Container>

                </Card.Body>
            </Card>
            <Row>
                <Col>
                    <EditStoreForm
                        parentEditStore={parentEditStore}
                        childEmptyEditStore={childEmptyEditStore}
                    />
                </Col>
                <Col>
                    <HandleDeleteModel
                        parentDelete={parentDelete}
                        childEmptyDelete={childEmptyDelete}
                        confirmDeleteHandle={confirmDeleteHandle}
                    />
                </Col>

            </Row>
        </>
    )
}

export default StoreList