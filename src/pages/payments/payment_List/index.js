import React, { useState, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import { paymentList, storeList } from '../../../redux/actions';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import MainLoader from '../../../components/MainLoader';
import Table from '../../../components/TablePage/Table';
import Select, { components } from 'react-select';
import RefundPayment from './refundPayment';
const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children?.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
        </ValueContainer>
    );
};

const PaymentList = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [date, setDate] = useState(null);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [storeFilterData, setStoreFilterData] = useState([]);
    const [showRefundPaymentModal, setShowRefundPaymentModal] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const storeListData = store.StoreList?.storeList;
    const PaymentListLoader = store.PaymentList?.loading;
    const paymentListData = store?.PaymentList?.paymentList?.data;
    const pagination = store?.PaymentList?.paymentList?.meta?.pagination;

    useEffect(() => {
        dispatch(
            storeList({
                searchValue: '',
                pageNumber: '',
                showLimit: '',
            })
        );
    }, []);

    useEffect(() => {
        dispatch(
            paymentList({
                storeId: storeFilterData,
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                orderDate: date || '',
            })
        );
    }, [searchText, page, showLimit, date, storeFilterData]);

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
        {
            Header: 'Sr. No.',
            accessor: (row, index) => index + 1,
        },
        {
            Header: 'Order Invoice',
            accessor: (row) => (row.invoice_no ? row.invoice_no : 'N/A'),
        },
        {
            Header: 'Customer Name',
            accessor: (row) => (row.customer_name ? row.customer_name : 'N/A'),
        },
        {
            Header: 'Store Name',
            accessor: (row) => (row.store_name ? row.store_name : 'N/A'),
        },
        {
            Header: 'Mobile Number',
            accessor: (row) => (row.mobile ? row.mobile : 'N/A'),
        },
        {
            Header: 'Payment Method',
            accessor: (row) => (row.payment_method ? row.payment_method : 'N/A'),
        },
        {
            Header: 'Payment Amount',
            accessor: (row) => (row.pay_amount ? row.pay_amount : 'N/A'),
        },
        {
            Header: 'Payment Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <span style={{ color: row?.original?.status === 'SUCCESS' ? 'green' : 'red' }}>
                    {row?.original?.status ? row.original?.status : 'N/A'}
                </span>
            ),
            // accessor: (row) => (row.status ? row.status : 'N/A'),
        },
        {
            Header: 'Payment By',
            accessor: (row) => (row.payment_by ? row.payment_by : 'N/A'),
        },
        {
            Header: 'Order Date',
            accessor: (row) => (row.date ? row.date : 'N/A'),
        },
        {
            Header: 'Payment Date',
            accessor: (row) => (row.date ? row.date : 'N/A'),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <span
                    style={{ backgroundColor: 'gray', color: 'white' }}
                    className="p-1 rounded-circle btn-hover"
                    onClick={() => setShowRefundPaymentModal(true)}>
                    <i className="dripicons-retweet fs-4 fw-bold"></i>
                </span>
            ),
            width: 100,
        },
    ];

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Payment List"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Filter Record</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => setShowFilter(!showFilter)}>
                        <i class="bi bi-funnel fs-4"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            {/* Filter Options */}
            <div className={`${showFilter ? 'd-block' : 'd-none'}`}>
                <Row className="px-2">
                    <Col lg={6} className="mt-1">
                        <Select
                            options={
                                Array.isArray(storeListData)
                                    ? storeListData.map((item) => ({
                                          label: item.store_name,
                                          value: item.store_id,
                                      }))
                                    : []
                            }
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti={true}
                            onChange={(val) => {
                                setStoreFilterData(val.map((item) => item.value));
                            }}
                            components={{
                                ValueContainer: CustomValueContainer,
                            }}
                            placeholder="Select Stores"
                            styles={{
                                valueContainer: (provided) => ({
                                    ...provided,
                                    overflow: 'visible',
                                }),
                                container: (provided) => ({
                                    ...provided,
                                }),
                                control: (baseStyles) => ({
                                    ...baseStyles,

                                    height: 'calc(2.9rem + 2px)',
                                }),
                                singleValue: (baseStyles) => ({
                                    ...baseStyles,
                                    color: 'black !important',
                                }),
                                placeholder: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontWeight: 600,
                                    position: state.hasValue || state.selectProps.inputValue ? 'absolute' : 'sticky',
                                    top: state.hasValue || state.selectProps.inputValue ? -15 : 0,
                                    transform:
                                        (state.hasValue &&
                                            'scale(0.85) translateY(-0.4rem) translateX(-0.5rem)!important') ||
                                        (state.selectProps.inputValue &&
                                            'scale(0.85) translateY(-0.4rem) translateX(-0.5rem)!important'),
                                    backgroundColor: 'transparent',
                                    backdropFilter:
                                        (state.selectProps.inputValue && 'blur(5px)') ||
                                        (state.hasValue && 'blur(5px)'),
                                    color: '#667085',
                                }),
                            }}
                        />
                    </Col>
                    <Col lg={6} className="mt-1">
                        <DatePicker.RangePicker
                            format="MMM Do, YYYY"
                            className="w-100 rounded-2"
                            separator={'-'}
                            allowClear={false}
                            style={{ height: 'calc(2.9rem + 2px)' }}
                            onChange={(date) => setDate(date.map((date) => dayjs(date).format('YYYY-MM-DD')))}
                        />
                    </Col>
                </Row>
            </div>
            <RefundPayment show={showRefundPaymentModal} onHide={setShowRefundPaymentModal} />
            {PaymentListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(paymentListData) ? (
                            <Table
                                Data={paymentListData}
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
                    {pagination && (
                        <PaginationArea
                            setShowLimit={setShowLimit}
                            current_page={pagination?.current_page}
                            total_page={pagination?.total_page}
                            setPage={setPage}
                            page={page}
                        />
                    )}
                </>
            )}
        </Card>
    );
};

export default PaymentList;
