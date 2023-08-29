import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { paymentTypeUpdate, PaymentTypeListAction } from '../../../../../../redux/actions';
import { getBase64 } from '../../.././../../../helpers/imageToBase64';
import { useForm } from 'react-hook-form';
import ToastHandle from '../../../../../../helpers/toastMessage';
import Loader from "../../../../../../components/MainLoader"

const EditRecordForm = ({ parentEditRecord, childEmptyEditRecord, editData }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const paymentUpdateStatus = store?.PaymentTypeUpdate?.status
    const paymentUpdateMessage = store?.PaymentTypeUpdate?.message
    const PaymentUpdateLoader = store.PaymentTypeUpdate;
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [getEditData, setGetEditData] = useState([])

    const toggle = () => {
        setModal(!modal);
        childEmptyEditRecord('');
    };

    const openModalWithSize = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };


    //copy
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const curdAction = (data) => {

        dispatch(paymentTypeUpdate(
            {
                paymentMethodId: editData.payment_id,
                method: data.name,
                image: data.image
            }
        ));
        // setModal(!modal);

    }


    const onSubmit = async (data) => {
        // data.brand_id = getEditData.id;
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
        if (editData?.method) {
            reset({
                name: editData.method,
            })
        }
    }, [editData])
    // copy end


    useEffect(() => {
        if (parentEditRecord == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditRecord]);


    const paymentListUpdate = () => {
        dispatch(PaymentTypeListAction(
            {
                searchValue: '',
                pageNumber: 1,
                showLimit: 10
            }
        ));
    }

    useEffect(() => {
        if (paymentUpdateStatus) {
            ToastHandle('success', paymentUpdateMessage);
            paymentListUpdate();
            toggle();
        } else if (paymentUpdateStatus === false) {
            ToastHandle('error', paymentUpdateMessage);
        }

    }, [paymentUpdateStatus])
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
                                <Card className='mb-0'>
                                    <Card.Body>
                                        {
                                            PaymentUpdateLoader?.loading ? <Loader /> :
                                                <Form noValidate
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
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center">
                                                                            <Col lg={3}>
                                                                                <Form.Label>Name :</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                <Form.Control
                                                                                    required
                                                                                    type="text"
                                                                                    name='method'
                                                                                    {...register('name', { required: true })}
                                                                                    isInvalid={errors.name}
                                                                                // value={getEditData?.method}
                                                                                // onChange={(e) => handleEdit(e)}
                                                                                />
                                                                                <Form.Control.Feedback>
                                                                                    Looks good!
                                                                                </Form.Control.Feedback>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col lg={12} className='mt-3'>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <Row className="d-flex align-items-center">
                                                                            <Col lg={3}>
                                                                                <Form.Label>Image</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9}>
                                                                                <Form.Control
                                                                                    required
                                                                                    type="file"
                                                                                    {...register('image')}

                                                                                // name='image_url'
                                                                                // onChange={(e) => handleEdit(e)}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col lg={12}>
                                                                    <Row className="d-flex align-items-center">
                                                                        <Col lg={4}>
                                                                            <h3>Previous Image</h3>
                                                                        </Col>
                                                                        <Col lg={8}>
                                                                            {<img style={{ width: 50 }} src={getEditData?.image_url} />}
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className="text-center  mt-4">
                                                                    <Button type="submit" className="btn btn-success">
                                                                        Update
                                                                    </Button>
                                                                    <Button type="submit" className="btn btn-primary ms-3">
                                                                        Reset
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                        }

                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal >
        </>)
}

export default EditRecordForm