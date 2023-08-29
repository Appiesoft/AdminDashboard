import React, { useState, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import { useDispatch, useSelector } from 'react-redux';
import { pickupRequestList, storeList } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import { DatePicker } from 'antd';
import Select from 'react-select';
import PickupModel from './model';
import Table from '../../../components/TablePage/Table';

const Pickup = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [showPickupModal, setShowPickupModal] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const storeListData = store?.StoreList?.storeList;
    const pickupRequestData = store.PickupRequestList;
    const pickupRequestLoader = store.PickupRequestList?.loading;
    const pickupRequestLists = pickupRequestData?.pickupRequestList?.data;
    const pagination = store.PickupRequestList?.pickupRequestList?.meta?.pagination;

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

    useEffect(() => {
        dispatch(
            pickupRequestList({
                pageNumber: page,
                showLimit: showLimit,
                from: '',
                to: '',
            })
        );
    }, [page, showLimit]);

    useEffect(() => {
        dispatch(
            storeList({
                searchValue: '',
                pageNumber: 1,
                showLimit: 100,
            })
        );
    }, []);

    // console.log('Data:', pickupRequestLists);
    const COLUMNS = [
        {
            Header: 'Source',
            accessor: (row) => (row.source ? row.source : 'N/A'),
        },
        {
            Header: 'Order Place',
            accessor: (row) => (row.order_place_from ? row.order_place_from : 'N/A'),
        },
        {
            Header: 'Store Name',
            accessor: (row) => (row.store_name ? row.store_name : 'N/A'),
            // minWidth: 200,
        },
        {
            Header: 'Driver Name',
            accessor: (row) => (row.driver_name ? row.driver_name : 'N/A'),
            // minWidth: 200,
        },

        {
            Header: 'Customer Name',
            accessor: (row) => (row.customer_name ? row.customer_name : 'N/A'),
        },
        {
            Header: 'Phone',
            accessor: (row) => (row.mobile ? row.mobile : 'N/A'),
        },
        {
            Header: 'Address',
            accessor: (row) => (row.customer_address ? row.customer_address : 'N/A'),
        },
        {
            Header: 'Qty/Bag',
            accessor: (row) => (row.total_qty ? row.total_qty : 'N/A'),
        },
        {
            Header: 'Pickup Id Request',
            accessor: (row) => (row.pickup_request_id ? row.pickup_request_id : 'N/A'),
        },
        {
            Header: 'Pickup Date',
            accessor: (row) => (row.pickup_date ? row.pickup_date : 'N/A'),
        },
        {
            Header: 'Pickup Time',
            accessor: (row) => (row.pickup_time ? row.pickup_time : 'N/A'),
        },
        {
            Header: 'Order Status',
            accessor: (row) => (row.order_status_name ? row.order_status_name : 'N/A'),
        },
        {
            Header: 'Pickup Status',
            accessor: (row) => (row.pickup_status_name ? row.pickup_status_name : 'N/A'),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <DropdownButton
                    as="span"
                    variant="link"
                    align={{ sm: 'end' }}
                    className="actionButton"
                    id={`dropdown-row-${row.id}`}
                    title={<i className="bi bi-three-dots"></i>}>
                    <Dropdown.Item className="my-dropdown-item">
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item className="my-dropdown-item">
                        <i className="mdi mdi-delete"></i>&nbsp;&nbsp;Delete
                    </Dropdown.Item>
                </DropdownButton>
            ),
            width: 100,
        },
    ];
    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Pickup Request"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Add Pickup Request</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color"
                        onClick={() => setShowPickupModal(true)}>
                        <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
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
            <PickupModel show={showPickupModal} onHide={setShowPickupModal} storeList={storeListData} />
            {pickupRequestLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(pickupRequestLists) ? (
                            <Table
                                Data={pickupRequestLists}
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

export default Pickup;
