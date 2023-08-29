import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { brandUpdate, brandList } from '../../../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getBase64 } from '../../.././../../../helpers/imageToBase64';
import ToastHandle from '../../../../../../helpers/toastMessage';
import MainLoader from '../../../../../../components/MainLoader';

const BrandEditModel = ({ rowData, parentBrandEditModel, childEmptyEditModel }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const brandEditStatus = store?.BrandUpdate?.status
    const brandEditMessage = store?.BrandUpdate?.message
    const brandEditLorder = store.BrandUpdate
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


    const curdAction = (data) => {
        dispatch(brandUpdate(data))
    }
    const brandListUpdate = () => {
        dispatch(brandList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ));
    }

    const onSubmit = async (data) => {
        data.brand_id = rowData.id;
        let file = data.image[0];
        if (file) {
            await getBase64(file)
                .then(result => {
                    data.image = result
                    curdAction(data)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            curdAction(data);
        }

    };


    //start handle
    useEffect(() => {
        if (parentBrandEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentBrandEditModel]);
    //end handle

    useEffect(() => {
        reset({
            brand_name: rowData?.brand_name,
            brand_remark: rowData?.brand_remark
        })
    }, [rowData])

    //start toast handle
    useEffect(() => {
        if (brandEditStatus === true) {
            ToastHandle('success', brandEditMessage);
            toggle();
            brandListUpdate();
        } else if (brandEditStatus === false) {
            ToastHandle('error', brandEditMessage);
        }
    }, [brandEditStatus]);
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
                                        {brandEditLorder.loading ? <MainLoader /> : <Form
                                            noValidate
                                            onSubmit={
                                                handleSubmit((data) => {
                                                    onSubmit(data)

                                                }, (err) => {
                                                    console.log(err)
                                                })
                                            }
                                            className='px-3'>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">
                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Brand ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            disabled
                                                                            required
                                                                            type="text"
                                                                            value='15'
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Brand Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('brand_name')}
                                                                            type="text"
                                                                            placeholder='Nike'
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg={12} >
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Remarks :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('brand_remark')}
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className='mt-3'>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Image:</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('image')}
                                                                            type="file"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className='text-center  py-3'>
                                                            <Button type="submit" className='btn btn-success'>Save</Button>
                                                            <Button type="reset" className='btn btn-light ms-3'>Reset</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>}

                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>)
}

export default BrandEditModel