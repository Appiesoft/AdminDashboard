import React, { useState, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip, Row, Col, Button, Form } from 'react-bootstrap';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import MainLoader from '../../../components/MainLoader';
import { useDispatch, useSelector } from 'react-redux';
import { driverList, employeeList } from '../../../redux/actions';
import Table from '../../../components/TablePage/Table';
import Select from 'react-select';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, validationSchema } from './FormData';
import SelectField from '../../../components/Form Components/SelectField';

const deliveryOptions = [
    { label: 'Delivery', value: '0' },
    { label: 'Pickup', value: '1' },
];

const Driver = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [formData, setFormData] = useState(null);
    // const [showFilter, setShowFilter] = useState(false);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const driverListLoader = store.DriverList?.loading;
    const driverListData = store.DriverList?.driverList?.data;
    const pagination = store.DriverList?.driverList?.meta?.pagination;
    const employeListData = store?.EmployeeList?.employeeList?.data;

    useEffect(() => {
        dispatch(
            driverList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                from: formData?.date[0],
                to: formData?.date[1],
                driverId: formData?.driver,
                chooseFor: formData?.choose_for,
            })
        );
    }, [page, showLimit, searchText, formData]);

    useEffect(() => {
        dispatch(
            employeeList({
                storeId: [],
                searchValue: '',
                pageNumber: 1,
                showLimit: 1000,
            })
        );
    }, []);

    //table options
    const handlePrintPdf = () => {
        setPrintPdf(true);
        setTimeout(() => setPrintPdf(false), 1000);
    };
    const handleExportPdf = () => {
        setExportPdf(true);
        setTimeout(() => setExportPdf(false), 1000);
    };
    const handleExportCSV = () => {
        setExportCSV(true);
        setTimeout(() => setExportCSV(false), 1000);
    };

    const COLUMNS = [
        // {
        //     Header: 'Order',
        //     accessor: (row) => (row.order ? row.order : 'N/A'),
        // },
        {
            Header: 'Customer Name',
            accessor: (row) => (row.customer_name ? row.customer_name : 'N/A'),
        },
        {
            Header: 'Driver Name',
            accessor: (row) => (row.driver_name ? row.driver_name : 'N/A'),
            // minWidth: 200,
        },

        {
            Header: 'Mobile',
            accessor: (row) => (row.mobile ? row.mobile : 'N/A'),
        },
        {
            Header: 'Store Name',
            accessor: (row) => (row.store_name ? row.store_name : 'N/A'),
        },
        {
            Header: 'Pickup Date',
            accessor: (row) => (row.pickup_date ? row.pickup_date : 'N/A'),
        },
        {
            Header: 'Delivery Date',
            accessor: (row) => (row.delivery_date ? row.delivery_date : 'N/A'),
        },
        {
            Header: 'Order Status',
            accessor: (row) => (row.order_status ? row.order_status : 'N/A'),
        },
        {
            Header: 'Payment Status',
            accessor: (row) => (row.payment_stauts ? row.payment_stauts : 'N/A'),
        },
        {
            Header: 'Payment Date',
            accessor: (row) => (row.paid_date ? row.paid_date : 'N/A'),
        },
        {
            Header: 'Order Type',
            accessor: (row) => (row.order_type ? row.order_type : 'N/A'),
        },
        {
            Header: 'Payment Details',
            accessor: (row) => (row.payment_details ? row.payment_details : 'N/A'),
        },
        {
            Header: 'Qty/Kg',
            accessor: (row) => (row.total_qty ? row.total_qty : 'N/A'),
        },
        {
            Header: 'Currency',
            accessor: (row) => (row.currency ? row.currency : 'N/A'),
        },
        {
            Header: 'Amount',
            accessor: (row) => (row.amount ? row.amount : 'N/A'),
        },
    ];

    //form Data

    const {
        register,
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onTouched',
        defaultValues: initialValues,
        // shouldUnregister: true,
    });

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Driver List"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                {/* <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Filter Record</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => setShowFilter(!showFilter)}>
                        <i class="bi bi-funnel fs-4"></i>
                    </span>
                </OverlayTrigger> */}
            </PageHeader>
            <div className="d-block">
                <Form
                    onSubmit={handleSubmit((data) => {
                        setFormData(data);
                    })}>
                    <Row className="px-2 my-1">
                        <Col lg={6} className="mt-1">
                            <Controller
                                control={control}
                                name="driver"
                                // defaultValue={getValues('status')}
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        // value={getValues('status')}
                                        options={employeListData?.map((item) => ({
                                            label: item?.first_name + ' ' + item?.last_name,
                                            value: item?.emp_id,
                                        }))}
                                        error={errors?.driver}
                                        placeholder="Select Driver"
                                    />
                                )}
                            />
                            {errors?.driver && (
                                <Form.Text className="text-danger text-start">{errors?.driver?.message}</Form.Text>
                            )}
                            {/* <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                options={employeListData?.map((item) => ({
                                    label: item?.first_name + ' ' + item?.last_name,
                                    value: item?.emp_id,
                                }))}
                                isClearable
                                placeholder="Select Driver"
                            /> */}
                        </Col>
                        <Col lg={6} className="mt-1">
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <DatePicker.RangePicker
                                        format="MMM Do, YYYY"
                                        className="w-100 rounded-2"
                                        separator={'-'}
                                        allowClear={false}
                                        selected={field.value}
                                        style={{ height: 'calc(2.9rem + 2px)' }}
                                        onChange={(date) =>
                                            field.onChange(date.map((date) => dayjs(date).format('YYYY-MM-DD')))
                                        }
                                        // onChange={(data) => console.log(data.map((date) => dayjs(date).format('YYYY-MM-DD')))}
                                        // {...register('date')}
                                    />
                                )}
                            />
                            {errors?.date && (
                                <Form.Text className="text-danger text-start">{errors?.date?.message}</Form.Text>
                            )}
                        </Col>
                    </Row>
                    <Row className="px-2 my-1">
                        <Col lg={6} className="mt-1">
                            <Controller
                                control={control}
                                name="choose_for"
                                // defaultValue={getValues('status')}
                                render={({ field }) => (
                                    <SelectField
                                        field={field}
                                        isMulti={false}
                                        // value={getValues('status')}
                                        options={deliveryOptions}
                                        error={errors?.choose_for}
                                        placeholder="Choose for"
                                    />
                                )}
                            />
                            {errors?.choose_for && (
                                <Form.Text className="text-danger text-start">{errors?.choose_for?.message}</Form.Text>
                            )}
                            {/* <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                options={deliveryOptions}
                                isClearable
                                placeholder="Choose For"
                            /> */}
                        </Col>
                        <Col lg={6} className="mt-1 d-flex justify-content-end">
                            <Button className="rounded-pill" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            {driverListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                            {Array.isArray(driverListData) ? (
                            <Table
                                Data={driverListData}
                                Columns={COLUMNS}
                                printPdf={printPdf}
                                exportPdf={exportPdf}
                                exportCSV={exportCSV}
                                openTableOption={openTableOption}
                                onClickOutside={() => setOpenTableOption(false)}
                            />
                        ) : (
                            <h4 className="text-center">Oops There is No Data To Show</h4>
                        )}
                    </div>
                    <PaginationArea
                        setShowLimit={setShowLimit}
                        current_page={pagination?.current_page}
                        total_page={pagination?.total_page}
                        setPage={setPage}
                        page={page}
                    />
                </>
            )}
        </Card>
    );
};

export default Driver;
