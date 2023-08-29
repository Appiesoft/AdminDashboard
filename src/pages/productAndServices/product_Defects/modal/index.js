import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defectList, defectCreate, defectUpdate } from '../../../../redux/actions';
import { initialValues, validationSchema } from './FormData';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import Field from '../../../../components/Form Components/Field';

const NewProductDefect = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const productDefectCreate = store?.DefectCreate;
    const productDefectUpdate = store?.DefectUpdate;

    useEffect(() => {
        if (productDefectCreate?.status === true) {
            ToastHandle('success', productDefectCreate?.message);
            dispatch(
                defectList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productDefectCreate?.status === false) {
            ToastHandle('error', productDefectCreate?.message);
        }
    }, [productDefectCreate]);

    useEffect(() => {
        if (productDefectUpdate?.status === true) {
            ToastHandle('success', productDefectUpdate?.message);
            dispatch(
                defectList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (productDefectUpdate?.status === false) {
            ToastHandle('error', productDefectUpdate?.message);
        }
    }, [productDefectUpdate]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (editRow) {
            reset({
                defect_name: editRow?.defect_name,
                remark: editRow?.defect_remark,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                defectUpdate({
                    defect_id: editRow?.id,
                    defect_name: data?.defect_name,
                    defect_remark: data?.remark,
                })
            );
        } else {
            dispatch(
                defectCreate({
                    defect_name: data?.defect_name,
                    defect_remark: data?.remark,
                })
            );
        }
        reset(initialValues);
        onHide(false);
    };

    return (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="d-block">
                    <h4>New Record </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Defect Name"
                                placeholder="Defect Name"
                                type="text"
                                disabled={false}
                                error={errors?.defect_name}
                                errorMessage={errors?.defect_name}
                                register={register('defect_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Remarks"
                                placeholder="Remarks"
                                type="text"
                                disabled={false}
                                error={errors?.remark}
                                errorMessage={errors?.remark}
                                register={register('remark')}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center mt-2">
                        <Button
                            className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                            onClick={() => reset(initialValues)}>
                            Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                        </Button>
                        <Button className="rounded-pill mx-2" type="submit">
                            Save<i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewProductDefect;
