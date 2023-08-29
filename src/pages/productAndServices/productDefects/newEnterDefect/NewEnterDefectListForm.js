import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { defectCreate, defectList } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';


const NewEnterDefectListForm = ({ TableShowBtn }) => {


    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const defectEntryFormStatus = store?.DefectCreate?.status;
    const defectEntryFormMessage = store?.DefectCreate?.message;
    const productDefectsLorder = store?.DefectCreate


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const handleReset = (e) => {
        reset({
            defect_name: "",
            defect_remark: "",
        })
    }

    const onSubmit = async (data) => {
        dispatch(defectCreate(data))
    };

    const btnChild = () => {
        TableShowBtn()
    }

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
        if (defectEntryFormStatus) {
            ToastHandle('success', defectEntryFormMessage);
            defectListUpdate();
            TableShowBtn();
        } else if (defectEntryFormStatus === false) {
            ToastHandle('error', defectEntryFormMessage);
        }
    }, [defectEntryFormStatus]);

    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className='d-flex justify-content-start ms-2'>
                            <Button variant="white" className="mb-2 border py-0 pe-3 bg-primary text-white me-2" onClick={btnChild} >
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i class="bi bi-plus me-1 text-dark" />
                                    </h3>
                                    <div>Defect List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {productDefectsLorder?.loading ? <MainLoader /> :
                        <Form
                            noValidate
                            onSubmit={
                                handleSubmit((data) => {
                                    onSubmit(data)

                                }, (err) => {
                                    console.log(err)
                                })
                            }
                            className='px-3'>
                            <Row className='p-3 mt-3 border'>
                                <Col lg={10} className='mx-auto'>
                                    <Row className='my-3'>
                                        <Col lg={12}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Defect ID :</Form.Label></Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            disabled
                                                            type="text" placeholder="17" />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='my-3'>

                                        <Col lg={12}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Defect Name :</Form.Label></Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            {...register('defect_name')}
                                                            type="text" placeholder="Fabric, Loose Button etc" />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='my-3'>
                                        <Col lg={12}>
                                            <Form.Group controlId="validationCustom01">
                                                <Row className='d-flex align-items-center'>
                                                    <Col lg={3}><Form.Label>Remarks :</Form.Label></Col>
                                                    <Col lg={9}>
                                                        <Form.Control
                                                            {...register('defect_remark'
                                                            )}
                                                            type="text" />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='text-center'>
                                            <Button type="submit" className='btn btn-success'>Save</Button>
                                            <Button type="reset" className='btn btn-light ms-3' onClick={handleReset}>Reset</Button>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>}


                </Card.Body>
            </Card>
        </>)
}

export default NewEnterDefectListForm