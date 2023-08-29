import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { paymentTypeCreate } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getBase64 } from '../../.././../helpers/imageToBase64';
import ToastHandle from '../../../../helpers/toastMessage';
import MainLoader from '../../../../components/MainLoader';


const NewEnteryForm = ({ TableShowBtn }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const paymentCreateStatus = store?.paymentTypeCreate?.status
    const paymentCreateMessage = store?.paymentTypeCreate?.message
    const paymentCreateLorder = store?.paymentTypeCreate;

    console.log(store?.paymentTypeCreate?.status, 'new entry')
    const [validated, setValidated] = useState(false);

    const btnChild = () => {
        TableShowBtn()
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const curdAction = (data) => {
        dispatch(paymentTypeCreate(
            {
                method: data.name,
                image: data.image
            }
        ));

    }


    const submitData = async (data) => {
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
            data.image = ''
            curdAction(data);
        }
    };


    useEffect(() => {
        if (paymentCreateStatus) {
            ToastHandle('success', paymentCreateMessage);
            TableShowBtn()

        } else if (paymentCreateStatus === false) {
            ToastHandle('error', paymentCreateMessage);
        }
    }, [paymentCreateStatus]);

    return (
        <>
            <Card>
                <Card.Body>
                    <Row className='my-3'>
                        <Col className='d-flex justify-content-start'>
                            <Button variant="white" className="mb-2 border py-0 pe-4 bg-primary text-white ms-2"
                                onClick={btnChild}>
                                <div className='d-flex align-items-center'>
                                    <h3>
                                        <i className="dripicons-arrow-thin-left me-2 text-dark"></i>
                                    </h3>
                                    <div>Payment Type List</div>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    {paymentCreateLorder?.loading ? (
                        <MainLoader />
                    ) : <Form noValidate
                        onSubmit={handleSubmit(
                            (data) => {
                                console.log(data)
                                submitData(data);
                            },
                            (err) => {
                                console.log(err);
                            }
                        )} className='px-3'>
                        <Row className='p-3 mt-3 border'>
                            <Col lg={8} className='mx-auto'>
                                <Row className='my-5 ' >
                                    <Col lg={8} className='mx-auto'>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Name :</Form.Label></Col>
                                                <Col lg={8}>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        {...register('name')}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={8} className='mx-auto mt-3'>
                                        <Form.Group controlId="validationCustom01">
                                            <Row className='d-flex align-items-center'>
                                                <Col lg={3}><Form.Label>Image :</Form.Label></Col>
                                                <Col lg={8}>
                                                    <Form.Control
                                                        required
                                                        type="file"
                                                        {...register('image')}
                                                    />

                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className='text-center '>
                                        <Button type="submit" className='btn-lg btn-success'>Save</Button>
                                        <Button type="reset" className='btn-lg btn-light ms-3'>Reset</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                    }

                </Card.Body>
            </Card>
        </>)
}

export default NewEnteryForm