import React, { useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { validationSchema, initialValues, unitOptions, options, TaxesOptions } from './FormData';
import BreadCrumb from '../../../../components/BreadCrumb';
import Field from '../../../../components/Form Components/Field';
import SelectField from '../../../../components/Form Components/SelectField';
import {
    priceList,
    serviceCategoryList,
    categoryList,
    productsLists,
    upchargesList,
    itemDetails,
    itemUpdate,
} from '../../../../redux/actions';
import ToastHandle from '../../../../helpers/toastMessage';
import { useNavigate, useParams } from 'react-router-dom';

const AddItem = () => {
    const { priceListId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const categoryLists = store.ProductCategoryList.categoryList;
    const serviceCategoryLists = store.ServiceCategoryList.serviceCategoryList;
    const priceListData = store.PriceList?.priceList;
    const productListData = store.ProductLists?.productList?.data;
    const upchargesListData = store.UpchargesList?.upchargesList;
    const itemDetailsData = store.ProductItemDetails?.productItemDetails?.data[0];
    const itemUpdateData = store.ProductItemUpdate;
    console.log('ItemUpdate: ', itemUpdateData);

    const resetForm = () => {
        reset({
            priceListId: itemDetailsData?.price_list_id || '',
            serviceId: itemDetailsData?.service_id || '',
            categoryId: itemDetailsData?.category_id || '',
            clothId: itemDetailsData?.product_id || '',
            shortCode: itemDetailsData?.short_code || '',
            price: itemDetailsData?.price || '',
            minPrice: itemDetailsData?.min_price || '',
            piece: itemDetailsData?.piece || '',
            unit: itemDetailsData?.service_unit || '',
            active: itemDetailsData?.active || '',
            online: itemDetailsData?.online || '',
            priority: itemDetailsData?.priority || '',
            tax: [],
            addon: [],
        });
    };
    useEffect(() => {
        dispatch(
            priceList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 1000,
            })
        );
        dispatch(
            serviceCategoryList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 1000,
            })
        );
        dispatch(
            categoryList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 1000,
            })
        );
        dispatch(
            productsLists({
                searchValue: '',
                pageNumber: 1,
                showLimit: 1000,
            })
        );
        dispatch(
            upchargesList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 1000,
            })
        );
    }, []);

    useEffect(() => {
        dispatch(itemDetails({ itemId: priceListId }));
    }, [priceListId]);

    useEffect(() => {
        resetForm();
    }, [itemDetailsData]);

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
    });

    // useEffect(() => {
    //     if (itemUpdateData.status === true) {
    //         // showBtn();
    //         ToastHandle('success', itemUpdateData.message);
    //         navigate(-1);
    //     }
    // }, [itemUpdateData]);

    return (
        <>
            <BreadCrumb prevPage={'Price List'} currPage={'Price Item'} />
            <Card>
                <Card.Body>
                    <Form
                        onSubmit={handleSubmit((data) => {
                            dispatch(itemUpdate({ ...data, itemId: priceListId }));
                            if (itemUpdateData.status === true) {
                                // showBtn();
                                ToastHandle('success', itemUpdateData.message);
                                navigate('/productservices/price');
                            } else if (itemUpdateData.status === false) {
                                ToastHandle('error', itemUpdateData.message);
                            }
                        })}>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="priceListId"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={
                                                Array.isArray(priceListData?.data)
                                                    ? priceListData?.data?.map((list) => ({
                                                          label: list?.price_list_name,
                                                          value: list?.id,
                                                      }))
                                                    : []
                                            }
                                            error={errors?.group_member_id}
                                            placeholder="Price List"
                                        />
                                    )}
                                />
                                {errors?.priceListId && (
                                    <Form.Text className="text-danger text-start">
                                        {errors?.priceListId?.message}
                                    </Form.Text>
                                )}
                            </Col>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="serviceId"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={
                                                Array.isArray(serviceCategoryLists?.data)
                                                    ? serviceCategoryLists?.data?.map((list) => ({
                                                          label: list?.service_name1 + ' ' + list?.service_name2,
                                                          value: list?.id,
                                                      }))
                                                    : []
                                            }
                                            error={errors?.serviceId}
                                            placeholder="Service Name"
                                        />
                                    )}
                                />
                                {errors?.serviceId && (
                                    <Form.Text className="text-danger text-start">
                                        {errors?.serviceId?.message}
                                    </Form.Text>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={
                                                Array.isArray(categoryLists?.data)
                                                    ? categoryLists?.data?.map((list) => ({
                                                          label: list?.category_name,
                                                          value: list?.cat_id,
                                                      }))
                                                    : []
                                            }
                                            error={errors?.categoryId}
                                            placeholder="Category Name"
                                        />
                                    )}
                                />
                                {errors?.categoryId && (
                                    <Form.Text className="text-danger text-start">
                                        {errors?.categoryId?.message}
                                    </Form.Text>
                                )}
                            </Col>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="clothId"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={
                                                Array.isArray(productListData)
                                                    ? productListData?.map((list) => ({
                                                          label: list?.cloth_name,
                                                          value: list?.id,
                                                      }))
                                                    : []
                                            }
                                            error={errors?.clothId}
                                            placeholder="Product List"
                                        />
                                    )}
                                />
                                {errors?.clothId && (
                                    <Form.Text className="text-danger text-start">{errors?.clothId?.message}</Form.Text>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Short Code"
                                    placeholder="Short Code"
                                    type="text"
                                    disabled={false}
                                    error={errors?.shortCode}
                                    errorMessage={errors?.shortCode?.message}
                                    register={register('shortCode')}
                                />
                            </Col>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Price"
                                    placeholder="Price"
                                    type="text"
                                    disabled={false}
                                    error={errors?.price}
                                    errorMessage={errors?.price?.message}
                                    register={register('price')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Min Price"
                                    placeholder="Min Price"
                                    type="text"
                                    disabled={false}
                                    error={errors?.minPrice}
                                    errorMessage={errors?.minPrice?.message}
                                    register={register('minPrice')}
                                />
                            </Col>
                            <Col lg={6} className="my-1">
                                <Field
                                    label="Pieces"
                                    placeholder="Pieces"
                                    type="text"
                                    disabled={false}
                                    error={errors?.piece}
                                    errorMessage={errors?.piece?.message}
                                    register={register('piece')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="active"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={options}
                                            error={errors?.active}
                                            placeholder="Active"
                                        />
                                    )}
                                />
                                {errors?.active && (
                                    <Form.Text className="text-danger text-start">{errors?.active?.message}</Form.Text>
                                )}
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
                                <Controller
                                    control={control}
                                    name="online"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={false}
                                            options={options}
                                            error={errors?.online}
                                            placeholder="Online"
                                        />
                                    )}
                                />
                                {errors?.online && (
                                    <Form.Text className="text-danger text-start">{errors?.online?.message}</Form.Text>
                                )}
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
                        <Row>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="tax"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={true}
                                            options={TaxesOptions}
                                            error={errors?.tax}
                                            placeholder="Taxs"
                                        />
                                    )}
                                />
                                {errors?.tax && (
                                    <Form.Text className="text-danger text-start">{errors?.tax?.message}</Form.Text>
                                )}
                            </Col>
                            <Col lg={6} className="my-1">
                                <Controller
                                    control={control}
                                    name="addon"
                                    render={({ field }) => (
                                        <SelectField
                                            field={field}
                                            isMulti={true}
                                            options={
                                                Array.isArray(upchargesListData) && watch('unit') !== ''
                                                    ? upchargesListData
                                                          .filter((item) => item.unit === watch('unit'))
                                                          .map((list) => ({
                                                              label: list?.price
                                                                  ? list?.name + ' (' + list?.price + ')'
                                                                  : list?.name,
                                                              value: list?.name,
                                                          }))
                                                    : []
                                            }
                                            error={errors?.addon}
                                            placeholder="addon"
                                        />
                                    )}
                                />
                                {errors?.addon && (
                                    <Form.Text className="text-danger text-start">{errors?.addon?.message}</Form.Text>
                                )}
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-2">
                            <Button
                                className="rounded-pill mx-2 btn-reset d-flex align-items-center justify-content-center"
                                onClick={() => resetForm()}>
                                Reset &nbsp;<i className="bi bi-arrow-counterclockwise fw-bold"></i>
                            </Button>
                            <Button className="rounded-pill mx-2" type="submit">
                                {priceListId ? 'Update' : 'Create'} <i className="bi bi-save"></i>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default AddItem;
