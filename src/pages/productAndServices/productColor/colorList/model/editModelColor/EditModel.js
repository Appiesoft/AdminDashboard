import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { colorUpdate, colorList } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
import { getBase64 } from '../../.././../../../helpers/imageToBase64';
import ToastHandle from '../../../../../../helpers/toastMessage';
import MainLoader from '../../../../../../components/MainLoader';


const EditModel = ({ rowData, parentEditModel, childEmptyEditModel }) => {

    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const productUpdatStatus = store?.ProductColorUpdate?.status;
    const productUpdatmessage = store?.ProductColorUpdate?.message;
    const productUpdateLorder = store?.ProductColorUpdate
    console.log(productUpdatStatus, 'kkkk')

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
        dispatch(colorUpdate(data))
    }

    const onSubmit = async (data) => {
        data.color_id = rowData.id;
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
    }


    useEffect(() => {

        reset({
            color_name: rowData.color_name,
            color_code: rowData.color_code,
            color_remark: rowData.color_remark
        })
    }, [rowData])

    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);


    //start toast handle
    useEffect(() => {
        if (productUpdatStatus === true) {
            ToastHandle('success', productUpdatmessage);
            toggle()
            dispatch(colorList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ));

        } else if (productUpdatStatus === false) {
            ToastHandle('error', productUpdatmessage);
        }
    }, [productUpdatStatus]);
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
                                        {productUpdateLorder?.loading ? <MainLoader /> :
                                            <Form noValidate
                                                onSubmit={
                                                    handleSubmit((data) => {
                                                        onSubmit(data)

                                                    }, (err) => {
                                                        console.log(err)
                                                    })
                                                }>
                                                <Row className="px-3">
                                                    <Col lg={12}>
                                                        <Row className="my-3">
                                                            <Col lg={12}>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={3}>
                                                                            <Form.Label>Color ID :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Control
                                                                                required
                                                                                type="text"
                                                                                value='7'
                                                                                disabled
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={12} className="mt-3">
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={3}>
                                                                            <Form.Label>Color Name :</Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Control
                                                                                {...register('color_name')}
                                                                                type="text"
                                                                                placeholder='Other'
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
                                                            <Col lg={12} className="mt-3">
                                                                <Form.Group controlId="validationCustom01">
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={3}>
                                                                            <Form.Label>
                                                                                Color Code  :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Control
                                                                                {...register('color_code')}
                                                                                type="color"
                                                                                className='w-100'
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
                                                                                Remarks :
                                                                            </Form.Label>
                                                                        </Col>
                                                                        <Col lg={9}>
                                                                            <Form.Control
                                                                                {...register('color_remark')}
                                                                                type="text"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="text-center  py-3">
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

export default EditModel