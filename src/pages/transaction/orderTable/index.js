import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { DatePicker } from 'antd';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Row, Col, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { storeList, ordersList } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import Table from '../../../components/TablePage/Table';

const OrderTable = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const orderListdata = store.OrderList?.orderList?.data;
    const orderListLoader = store.OrderList?.loading;
    const pagination = store.OrderList?.orderList?.meta?.pagination;
    const storeListData = store?.StoreList?.storeList;

    useEffect(() => {
        dispatch(
            ordersList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
                storeId: [],
                orderDate: '',
            })
        );
    }, [page, showLimit, searchText]);

    useEffect(() => {
        dispatch(
            storeList({
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
        {
            id: 1,
            Header: 'Order',
            accessor: 'invoice_number',
            Cell: ({ value }) => <span style={{ color: '#e74023' }}>{value}</span>,
        },
        {
            id: 2,
            Header: 'Price List',
            accessor: (row) => 'N/A',
        },
        { id: 3, Header: 'Store', accessor: (row) => 'N/A' },
        {
            id: 4,
            Header: 'Customer Name',
            accessor: (row) => (row.customer_name ? row.customer_name : 'N/A'),
        },
        {
            id: 5,
            Header: 'Mobile',
            accessor: (row) => (row.customer_phone_number ? row.customer_phone_number : 'N/A'),
        },
        { id: 6, Header: 'Address', accessor: (row) => 'N/A' },
        {
            id: 7,
            Header: 'Order Date',
            accessor: (row) =>
                row.order_date ? new Date(row.order_date).toLocaleDateString() + '[' + row.order_time + ']' : 'N/A',
        },
        {
            id: 8,
            Header: 'Pickup Date',
            accessor: (row) =>
                row.pickup_date
                    ? new Date(row.pickup_date).toLocaleDateString() +
                      `${row.pickup_time ? ' [' + row.pickup_time + '] ' : ''}`
                    : 'N/A',
        },
        {
            id: 9,
            Header: 'Due Date',
            accessor: (row) =>
                row.delivery_date
                    ? new Date(row.delivery_date).toLocaleDateString() +
                      `${row.delivery_time ? ' [' + row.delivery_time + '] ' : ''}` +
                      `${row.days ? ' (' + row.days + ') ' : ''}`
                    : 'N/A',
        },
        {
            id: 10,
            Header: 'Order Status',
            accessor: (row) => (row.order_status ? row.order_status : 'N/A'),
        },
        { id: 11, Header: 'Order Type', accessor: (row) => 'N/A' },
        {
            id: 12,
            Header: 'Order Place',
            accessor: (row) => 'N/A',
        },
        {
            id: 13,
            Header: 'Order details',
            accessor: (row) => 'N/A',
        },
        {
            id: 14,
            Header: 'Total Quantity (pieces)',
            accessor: (row) => (row?.qty ? row?.qty + ' ' + row?.unit : 'N/A'),
            width: 180,
        },
        {
            id: 15,
            Header: 'Currency',
            accessor: (row) => 'N/A',
        },
        {
            id: 16,
            Header: 'Amount',
            accessor: (row) => (row?.total_amount ? row?.total_amount : 'N/A'),
        },
        {
            id: 17,
            Header: 'Discount/Charges',
            accessor: (row) => 'N/A',
        },
        {
            id: 18,
            Header: 'Promo/Coupon',
            accessor: (row) => 'N/A',
        },
        {
            id: 19,
            Header: 'Details',
            accessor: (row) => 'N/A',
        },
        { id: 20, Header: 'Item Notes', accessor: (row) => (row?.item_note ? row?.item_note : 'N/A') },
        {
            id: 21,
            Header: 'Token No',
            accessor: (row) => 'N/A',
        },
        {
            id: 22,
            Header: 'Adjustment',
            accessor: (row) => 'N/A',
        },
        {
            id: 23,
            Header: 'Due Amount',
            accessor: (row) => 'N/A',
        },
        {
            id: 24,
            Header: 'Payment',
            accessor: (row) => (row?.paid_status ? row?.paid_status : 'N/A'),
        },
        {
            id: 25,
            Header: 'Remarks',
            accessor: (row) => 'N/A',
        },
        {
            id: 26,
            Header: 'Racks',
            accessor: (row) => (row?.rack_count ? row?.rack_count : 'N/A'),
        },
        {
            id: 27,
            Header: 'Actions',
            accessor: 'action_icons',
            Cell: ({ row }) => (
                <div className="tableHeadRow d-flex flex-wrap" key={row}>
                    <DropdownButton
                        as="span"
                        variant="link"
                        align={{ sm: 'end' }}
                        className="actionButton"
                        id={`dropdown-row-${row.id}`}
                        title={<i className="bi bi-three-dots"></i>}>
                        {row.original.action_icons.map((action, index) => (
                            <Dropdown.Item className="my-dropdown-item" key={index}>
                                {action?.name === 'Order Notes' ? (
                                    <i class="bi bi-journal-bookmark-fill"></i>
                                ) : action?.name === 'Delete Order' ? (
                                    <i class="bi bi-trash3"></i>
                                ) : action?.name === 'Mini Invoice' ? (
                                    <i class="bi bi-receipt-cutoff"></i>
                                ) : action?.name === 'Send Invoice' ? (
                                    <i class="bi bi-send-fill"></i>
                                ) : action?.name === 'Edit Order' ? (
                                    <i class="bi bi-pencil-square"></i>
                                ) : action?.name === 'Send SMS' ? (
                                    <i class="bi bi-envelope"></i>
                                ) : action?.name === 'Delivery Request' ? (
                                    <i class="bi bi-truck"></i>
                                ) : (
                                    <i class="bi bi-receipt"></i>
                                )}
                                &nbsp;&nbsp; {action?.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
            ),
        },
    ];

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Order List"
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
                            className="react-select"
                            classNamePrefix="react-select"
                            options={storeListData?.map((store) => ({
                                label: store?.store_name,
                                value: store?.store_id,
                            }))}
                            isClearable
                            placeholder="Select Store"
                        />
                    </Col>
                    <Col lg={6} className="mt-1">
                        <DatePicker.RangePicker
                            format="MMM Do, YYYY"
                            className="w-100 rounded-2"
                            separator={'-'}
                            allowClear={false}
                            style={{ height: '2.4rem' }}
                        />
                    </Col>
                </Row>
            </div>
            {orderListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(orderListdata) ? (
                            <Table
                                Data={orderListdata}
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

export default OrderTable;
