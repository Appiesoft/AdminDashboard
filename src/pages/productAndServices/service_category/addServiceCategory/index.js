import React, { useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, initialValues, options } from './FormData';
import { serviceCategoryCreate, serviceCategoryList } from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import BreadCrumb from '../../../../components/BreadCrumb';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';
import ImageUploader from '../../../../components/Form Components/ImageUploader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const AddServiceCategory = () => {
    const { serviceId } = useParams();
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const createServiceCategory = store.ServiceCategoryCreate;
    // console.log('createServiceCategory', createServiceCategory);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
        // shouldUnregister: true,
    });
    // console.log('serviceId', serviceId);
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
            navigate(-1);
        } else if (createServiceCategory?.status === false) {
            ToastHandle('error', createServiceCategory?.message);
        }
    }, [createServiceCategory]);
    return (
        <>
            <BreadCrumb prevPage={'Service And Category List'} currPage={'New Entry'} />
            <Card>
                <Card.Body>
                    <Form
                        onSubmit={handleSubmit((data) => {
                            dispatch(
                                serviceCategoryCreate({
                                    ...data,
                                })
                            );
                        })}>
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
                                    <Form.Text className="text-danger text-start">
                                        {errors?.show_hide?.message}
                                    </Form.Text>
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
                                {serviceId ? 'Update' : 'Save'} <i className="bi bi-save"></i>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default AddServiceCategory;
