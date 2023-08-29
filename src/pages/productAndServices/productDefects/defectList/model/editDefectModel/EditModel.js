import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { defectUpdate, defectList } from '../../../../../../redux/actions';
import { useSelector, useDispatch, reset } from 'react-redux';
import ToastHandle from '../../../../../../helpers/toastMessage';
import MainLoader from '../../../../../../components/MainLoader';

const EditModel = ({ rowData, parentEditModel, childEmptyEditModel }) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const brandCreateData = store.BrandCreate;
    const defectListUpdateStatus = store?.DefectUpdate?.status;
    const defectListUpdateMessage = store?.DefectUpdate?.message;
    const productDefectsLorder = store?.DefectUpdate

    console.log(store.DefectUpdate, 'eddef')

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

    const onSubmit = (data) => {
        data.defect_id = rowData.id;
        dispatch(defectUpdate(data));
        // setTimeout(() => {
        //     dispatch(defectList(
        //         { 
        //             searchValue: "",
        //             pageNumber: 1,
        //             showLimit: 20,
        //         }
        //     ));
        // },
        //     1000
        // );
        // toggle();

    };
    const defectListUpdate = () => {
        dispatch(defectList(
            {
                searchValue: "",
                pageNumber: 1,
                showLimit: 20,
            }
        ));
    }


    useEffect(() => {
        if (parentEditModel == 'lg') {
            openModalWithSize('lg');
        }
    }, [parentEditModel]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        reset({
            defect_name: rowData.defect_name,
            defect_remark: rowData.defect_remark
        })
    }, [rowData])

    useEffect(() => {
        if (defectListUpdateStatus) {
            ToastHandle('success', defectListUpdateMessage);
            defectListUpdate();
            toggle();
        } else if (defectListUpdateStatus === false) {
            ToastHandle('error', defectListUpdateMessage);
        }
    }, [defectListUpdateStatus]);
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
                                        {productDefectsLorder?.loading ? <MainLoader /> : <Form
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

                                                        <Col lg={12} className="mt-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Row className="d-flex align-items-center">
                                                                    <Col lg={3}>
                                                                        <Form.Label>Defect Name :</Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('defect_name')}
                                                                            type="text"
                                                                            placeholder='Stains'
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
                                                                            Remarks :
                                                                        </Form.Label>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <Form.Control
                                                                            {...register('defect_remark')}
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