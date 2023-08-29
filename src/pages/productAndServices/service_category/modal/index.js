import React, { useEffect } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceCategoryCreate, serviceCategoryUpdate, serviceCategoryList } from '../../../../redux/actions';
import { initialValues, validationSchema, options } from './FormData';
import { useDispatch, useSelector } from 'react-redux';
import ToastHandle from '../../../../helpers/toastMessage';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';
import ImageUploader from '../../../../components/Form Components/ImageUploader';

const AddServiceCategoryModal = ({ show, onHide, editRow }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const createServiceCategory = store.ServiceCategoryCreate;
    const updateServiceCategory = store?.ServiceCategoryUpdate;

    useEffect(() => {
        if (createServiceCategory?.status === true) {
            ToastHandle('success', createServiceCategory?.message);
            dispatch(
                serviceCategoryList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (createServiceCategory?.status === false) {
            ToastHandle('error', createServiceCategory?.message);
        }
    }, [createServiceCategory]);

    useEffect(() => {
        if (updateServiceCategory?.status === true) {
            ToastHandle('success', updateServiceCategory?.message);
            dispatch(
                serviceCategoryList({
                    searchValue: '',
                    pageNumber: 1,
                    showLimit: 10,
                })
            );
            onHide(false);
        } else if (updateServiceCategory?.status === false) {
            ToastHandle('error', updateServiceCategory?.message);
        }
    }, [updateServiceCategory]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (editRow) {
            reset({
                service_name: editRow?.service_name1,
                service_name1: editRow?.service_name2,
                show_hide: editRow?.show_hide,
                show_hide_on_website: editRow?.show_hide_on_website,
                image: editRow?.image,
                priority: editRow?.priority,
            });
        } else {
            reset(initialValues);
        }
    }, [editRow]);

    const onSubmit = (data) => {
        if (editRow) {
            dispatch(
                serviceCategoryUpdate({
                    ...data,
                    service_id: editRow?.id,
                })
            );
        } else {
            dispatch(
                serviceCategoryCreate({
                    ...data,
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
                                label="Service Name"
                                placeholder="Service Name (English) "
                                type="text"
                                disabled={false}
                                error={errors?.service_name}
                                errorMessage={errors?.service_name?.message}
                                register={register('service_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Service Name (English)"
                                placeholder="Service Name (English)"
                                type="text"
                                disabled={false}
                                error={errors?.service_name1}
                                errorMessage={errors?.service_name1?.message}
                                register={register('service_name1')}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="show_hide"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={options}
                                        error={errors?.show_hide}
                                        placeholder="Show/Hide"
                                    />
                                )}
                            />
                            {errors?.show_hide && (
                                <Form.Text className="text-danger text-start">{errors?.show_hide?.message}</Form.Text>
                            )}
                        </Col>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="show_hide_on_website"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={options}
                                        error={errors?.show_hide_on_website}
                                        placeholder="Show/Hide On Website"
                                    />
                                )}
                            />
                            {errors?.show_hide_on_website && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.show_hide_on_website?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Description"
                                placeholder="Description"
                                type="text"
                                disabled={false}
                                error={errors?.root}
                                errorMessage={errors?.root?.message}
                                register={register('root')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Priority"
                                placeholder="Priority"
                                type="text"
                                disabled={false}
                                error={errors?.priority}
                                errorMessage={errors?.priority?.message}
                                register={register('priority')}
                            />
                        </Col>
                    </Row>
                    <ImageUploader register={register('image')} setValue={setValue} name="image" />
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

export default AddServiceCategoryModal;
