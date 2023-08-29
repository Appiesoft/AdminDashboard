import React, { useEffect } from 'react';
import { Col, Form, Modal, Row, Button } from 'react-bootstrap';
import { validationSchema, initialValues, price_list_options } from './FormData';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { priceList, priceCreate } from '../../../../redux/actions';
import SelectField from '../../../../components/Form Components/SelectField';
import Field from '../../../../components/Form Components/Field';
import ToastHandle from '../../../../helpers/toastMessage';

const AddPriceListModal = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const priceListData = store.PriceList?.priceList;
    const createPriceList = store.PriceCreate;

    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    const onSubmit = (value) => {
        dispatch(priceCreate(value));
        dispatch(
            priceList({
                searchValue: '',
                pageNumber: '',
                showLimit: '',
            })
        );
        if (createPriceList.status) {
            ToastHandle('success', createPriceList.message);
        } else if (createPriceList.status === false) {
            ToastHandle('error', createPriceList.message);
        }
        onHide(false);
        reset(initialValues);
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
                    <h4>Price List </h4>
                    <hr />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Field
                                label="Price List Name"
                                placeholder="Price List Name"
                                type="text"
                                disabled={false}
                                error={errors?.price_list_name}
                                errorMessage={errors?.price_list_name}
                                register={register('price_list_name')}
                            />
                        </Col>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="price_list_id"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={
                                            Array.isArray(priceListData?.data)
                                                ? priceListData?.data?.map((item) => ({
                                                      label: item.price_list_name,
                                                      value: item.id,
                                                  }))
                                                : []
                                        }
                                        error={errors?.price_list_id}
                                        placeholder="Price list"
                                    />
                                )}
                            />
                            {errors?.price_list_id && (
                                <Form.Text className="text-danger text-start">
                                    {errors?.price_list_id?.message}
                                </Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="my-1">
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        options={price_list_options}
                                        error={errors?.type}
                                        placeholder="Price of Price List"
                                    />
                                )}
                            />
                            {errors?.type && (
                                <Form.Text className="text-danger text-start">{errors?.type?.message}</Form.Text>
                            )}
                        </Col>
                        {watch('type') !== '' && (
                            <Col lg={6} className="my-1">
                                <Field
                                    label="% "
                                    placeholder="%"
                                    type="text"
                                    disabled={false}
                                    error={errors?.percentage}
                                    errorMessage={errors?.percentage}
                                    register={register('percentage')}
                                />
                            </Col>
                        )}
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

export default AddPriceListModal;
