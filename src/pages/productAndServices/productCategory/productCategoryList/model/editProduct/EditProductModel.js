import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { categoryList, categoryUpdate } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
import ToastHandle from '../../../../../../helpers/toastMessage';


const EditProductModel = ({ rowData, parentEditModel, childEmptyEditModel }) => {

    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const productCategoryEditStatus = store?.ProductCategoryUpdate?.status
    const productCategoryEditMessage = store?.ProductCategoryUpdate?.message


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const starRequired = (<span className='text-danger'>*</span>)

    const toggle = () => {
        setModal(!modal);
        childEmptyEditModel('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);


    const onSubmit = async (data) => {
        data.category_id = rowData.cat_id;
        dispatch(categoryUpdate(data))
    };
    const categoryListUpdate = () => {
        dispatch(categoryList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ));
    }
    useEffect(() => {
        reset({
            category_name: rowData.category_name,
            category_remark: rowData.category_descr,
            status: rowData.status
        })
    }, [rowData])

    //start toast handle
    useEffect(() => {
        if (productCategoryEditStatus === true) {
            ToastHandle('success', productCategoryEditMessage);
            categoryListUpdate();
            toggle();
        } else if (productCategoryEditStatus === false) {
            ToastHandle('error', productCategoryEditMessage);
        }
    }, [productCategoryEditStatus]);
    //end toast handle
    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="pt-0 ">
                    <Row>
                        <Col className="px-0">
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form
                                            noValidate
                                            onSubmit={
                                                handleSubmit((data) => {
                                                    onSubmit(data)

                                                }, (err) => {
                                                    console.log(err)
                                                })
                                            }
                                        >
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Category ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            value='16'
                                                                            disabled
                                                                        />

                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Category Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('category_name')}
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Status :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Select
                                                                            id="disabledSelect"
                                                                            aria-label="Default select example"
                                                                            {...register('status')}
                                                                        >
                                                                            <option hidden value=''>
                                                                                Open this select menu
                                                                            </option>
                                                                            <option value="show">Show</option>
                                                                            <option value="hide">Hide</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Description</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('category_remark')}
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className='text-center  py-3'>
                                                            <Button type="submit" className='btn btn-success'>Update</Button>
                                                            <Button type="reset" className='btn btn-light ms-3'>Reset</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>
        </>)
}

export default EditProductModel