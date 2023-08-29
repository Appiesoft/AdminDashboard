import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { upchargesUpdate, upchargesList } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
import ToastHandle from '../../../../../../helpers/toastMessage';
import MainLoader from '../../../../../../components/MainLoader';


const EditUpCharges = ({ rowData, parentEditModel, childEmptyEditModel }) => {

    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const upChargesUpdateStatus = store?.UpchargesUpdate?.status
    const upChargesUpdateMessage = store?.UpchargesUpdate?.message
    const upChargesUpdateLorder = store?.UpchargesUpdate?.loading



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




    const onSubmit = async (data) => {
        data.upcharge_id = rowData.id;
        dispatch(upchargesUpdate(data))
        setTimeout(() => {

        },
            1000
        );
    };


    useEffect(() => {

        reset({
            name: rowData.name,
            unit: rowData.unit,
            price: rowData.price

        })
    }, [rowData])

    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);


    //start toast handle
    useEffect(() => {
        if (upChargesUpdateStatus === true) {
            ToastHandle('success', upChargesUpdateMessage);
            dispatch(upchargesList(
                {
                    searchValue: "",
                    pageNumber: 1,
                    showLimit: 20,
                }
            ));
            toggle()

        } else if (upChargesUpdateStatus === false) {
            ToastHandle('error', upChargesUpdateMessage);
        }
    }, [upChargesUpdateStatus]);
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
                                        {upChargesUpdateLorder ? <MainLoader /> : <Form noValidate
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
                                                                            {...register('name')}
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
                                                                        <Form.Label>Price (USD) :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('price')}
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
                                                                            Unit :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Group>
                                                                            <Form.Select id="disabledSelect" aria-label="Default select example"
                                                                                {...register('unit')}
                                                                            >
                                                                                <option hidden value="">--Select Package--</option>
                                                                                <option value="Qty/Lbs">Qty/Lbs</option>
                                                                                <option value="Lbs">Lbs</option>
                                                                                <option value="Sq.Ft">Sq.Ft</option>

                                                                            </Form.Select>
                                                                        </Form.Group>
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

export default EditUpCharges