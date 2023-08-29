import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { productPatternsList, productPatternsUpdate } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
import { getBase64 } from '../../.././../../../helpers/imageToBase64';
import ToastHandle from '../../../../../../helpers/toastMessage';
import MainLoader from '../../../../../../components/MainLoader';
const EditPattern = ({ rowData, parentEditModel, childEmptyEditModel }) => {
    const [validated, setValidated] = useState(false);


    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const productPatternUpdateStatus = store.ProductPatternsUpdate?.status
    const productPatternUpdatemessage = store.ProductPatternsUpdate?.message
    const productPatternUpdateLorder = store.ProductPatternsUpdate?.loading


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


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const curdAction = (data) => {
        dispatch(productPatternsUpdate(data))

    }

    const onSubmit = async (data) => {
        data.pattern_id = rowData.id;
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

    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);

    useEffect(() => {

        reset({
            pattern_name: rowData.name,
            pattern_remark: rowData.remark
        })
    }, [rowData])

    //start toast handle
    useEffect(() => {
        if (productPatternUpdateStatus === true) {
            ToastHandle('success', productPatternUpdatemessage);
            dispatch(productPatternsList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ));
            toggle()
        } else if (productPatternUpdateStatus === false) {
            ToastHandle('error', productPatternUpdatemessage);
        }
    }, [productPatternUpdateStatus]);
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
                                        {productPatternUpdateLorder ? <MainLoader /> : <Form noValidate
                                            onSubmit={
                                                handleSubmit((data) => {
                                                    onSubmit(data)

                                                }, (err) => {
                                                    console.log(err)
                                                })
                                            }>
                                            <Row className="p-3">
                                                <Col lg={12}>
                                                    <Row className="my-3">

                                                        <Col lg={12} className="mt-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Pattern ID :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            type="text"
                                                                            disabled
                                                                            value='3'
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className="my-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Pattern Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control

                                                                            type="text"
                                                                            {...register('pattern_name')}
                                                                            placeholder='Checks'
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>





                                                        <Col lg={12}>
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Remarks :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('pattern_remark')}
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12} className="mt-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>
                                                                            Image :
                                                                        </Form.Label>
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
                                                        <Col className="text-center  pt-2">
                                                            <Button type="submit" className="btn btn-success">
                                                                Update
                                                            </Button>
                                                            <Button type="reset" className="btn btn-danger ms-3">
                                                                Reset
                                                            </Button>
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

export default EditPattern