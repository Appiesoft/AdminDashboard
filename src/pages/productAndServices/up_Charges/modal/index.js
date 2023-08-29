import React,{useEffect} from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema, unitOptions } from './FormData';
import { upchargesList, upchargesCreate, upchargesUpdate } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';

const NewUpCharges = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const upchargeCreated = store?.UpchargesCreate;
    const upchargeUpdated = store?.UpchargesUpdate;

    useEffect(() => {
        if (upchargeCreated?.status === true) {
            ToastHandle('success', upchargeCreated?.message);
            dispatch(
                upchargesList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (upchargeCreated?.status === false) {
            ToastHandle('error', upchargeCreated?.message);
        }
    }, [upchargeCreated]);

    useEffect(() => {
        if (upchargeUpdated?.status === true) {
            ToastHandle('success', upchargeUpdated?.message);
            dispatch(
                upchargesList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (upchargeUpdated?.status === false) {
            ToastHandle('error', upchargeUpdated?.message);
        }
    }, [upchargeUpdated]);

    const {
        register,
        handleSubmit,
        control,
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
                name: editRow?.name,
                unit: editRow?.unit,
                price: editRow?.price,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                upchargesUpdate({
                    upcharge_id: editRow?.id,
                    name: data?.name,
                    unit: data?.unit,
                    price: data?.price,
                })
            );
        } else {
            dispatch(
                upchargesCreate({
                    name: data?.name,
                    unit: data?.unit,
                    price: data?.price,
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
                                label="Name"
                                placeholder="Name"
                                type="text"
                                disabled={false}
                                error={errors?.name}
                                errorMessage={errors?.name}
                                register={register('name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="unit"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={unitOptions}
                                        error={errors?.unit}
                                        placeholder="Price Unit"
                                    />
                                )}
                            />
                            {errors?.unit && (
                                <Form.Text className="text-danger text-start">{errors?.unit?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Price"
                                placeholder="Price"
                                type="text"
                                disabled={false}
                                error={errors?.price}
                                errorMessage={errors.price}
                                register={register('price')}
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
                            {editRow ? 'Update' : 'Save'} <i className="bi bi-save"></i>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewUpCharges;
