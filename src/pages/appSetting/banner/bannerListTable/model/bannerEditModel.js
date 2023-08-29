import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Modal, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../../../components/MainLoader';
import ToastHandle from '../../../../../helpers/toastMessage';
import { bannerUpdate } from '../../../../../redux/actions';
import "./bannerEditModel.css"

const BannerEditModel = ({ parentEdit, childEmptyEdit }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const bannerDetailData = store?.BannerDetail?.bannerDetail?.data
    const bannerDetailLoader = store?.BannerDetail
    const bannerUpdateStatus = store?.BannerUpdate?.status
    const bannerUpdateMessage = store?.BannerUpdate?.message
    const bannerUpdateLoader = store?.BannerUpdate

    // start model
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);


    const imageFormatter = (cell) => {
        return (<img style={{ width: 50 }} src={cell} />)
    }

    const toggle = () => {
        setModal(!modal);
        childEmptyEdit('');
    };

    const openModalWithEditModel = (data) => {
        setSize(data);
        setClassName(null);
        setScroll(null);
        toggle();
    };
    // end model

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const handleBannerUpdate = (data) => {
        console.log("ssddffaa", data)
        dispatch(
            bannerUpdate(
                {
                    id: 20,
                    bannerName: "New test Banner",
                    bannerDescription: "",
                    bannerImage: ""
                }
            )
        )
    }

    useEffect(() => {
        if (parentEdit == 'lg') {
            openModalWithEditModel('lg');
        }
    }, [parentEdit]);

    const bannerResetForm = () => {
        if (bannerDetailData) {
            const data = bannerDetailData
            reset({
                description: data.banner_description,
                bannerName: data.banner_name,
                image: imageFormatter(data.banner_image)
            })
        }
    }

    useEffect(() => {
        bannerResetForm()
    }, [bannerDetailData])


    // start toast
    useEffect(() => {
        if (bannerUpdateStatus) {
            ToastHandle('success', bannerUpdateMessage);
            toggle()
        } else if (bannerUpdateStatus === false) {
            ToastHandle('error', bannerUpdateMessage);
        }
    }, [bannerUpdateStatus])
    // end toast

    return (
        <>
            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton className="bg-light ">
                    <h4 className="modal-title ">Edit Record</h4>
                </Modal.Header>
                <Modal.Body className="p-0 ">
                    <Card>
                        <Card.Body>
                            {bannerUpdateLoader?.loading ? <MainLoader /> :
                                <Form noValidate
                                    onSubmit={handleSubmit(
                                        (data) => {
                                            handleBannerUpdate(data);
                                        },
                                        (err) => {
                                            console.log(err);
                                        }
                                    )}
                                    className='px-3'>
                                    <Row>
                                        {bannerDetailLoader?.loading && <Col lg={12} className='d-flex justify-content-center align-items-center loader_parent position-absolute top-0 bottom-0 end-0 start-0'>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden text-center">Loading...</span>
                                            </Spinner>
                                        </Col>}
                                        <Col lg={12}>
                                            <Row className='my-2'>
                                                <Col lg={12}>
                                                    <Form.Group controlId="ne_bannerid">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Banner Id :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="1"
                                                                    isValid={false}
                                                                    isInvalid={false}
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12} className='mt-2'>
                                                    <Form.Group controlId="ne_description">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Description :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    type="text"
                                                                    {...register('description', { required: true })}
                                                                    isInvalid={errors.description}
                                                                />
                                                                {errors.description && (
                                                                    <span className="text-danger">Please add some description</span>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row >
                                                <Col lg={12}>
                                                    <Form.Group controlId="ne_bannername">
                                                        <Row className="d-flex align-items-center">
                                                            <Col lg={3}>
                                                                <Form.Label>Banner Name :</Form.Label>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    type="text"
                                                                    {...register('bannerName', { required: true })}
                                                                    isInvalid={errors.bannerName}
                                                                />
                                                                {errors.bannerName && (
                                                                    <span className="text-danger">Please add banner name</span>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12} className='mt-2'>
                                                    <Form.Group controlId="image">
                                                        <Row className='d-flex align-items-center'>
                                                            <Col lg={3}><Form.Label>Image :</Form.Label></Col>
                                                            <Col lg={9}>
                                                                <Form.Control
                                                                    type="file"
                                                                    {...register('image', { required: true })}
                                                                    isInvalid={errors.image}
                                                                />
                                                                {errors.image && (
                                                                    <span className="text-danger">Please add image</span>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12} className="mx-auto d-flex mt-3 justify-content-center">
                                                    <Button type="submit" className='btn btn-success'>Save</Button>
                                                    <Button type="submit" className="btn btn-secondary ms-3">
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
                </Modal.Body>
            </Modal>
        </>)
}

export default BannerEditModel