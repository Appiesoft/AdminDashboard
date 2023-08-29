import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown } from 'react-bootstrap';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import { diliveryRequestList } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../components/MainLoader';
import Table from '../../../components/TablePage/Table';

const Delivery = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const deliveryRequestData = store.DeliveryRequestList;
    const deliveryRequestLoader = store.DeliveryRequestList?.loading;
    const deliveryRequestLists = deliveryRequestData?.deliveryRequestList?.data;
    const pagination = store.DeliveryRequestList?.deliveryRequestList?.meta?.pagination;

    console.log('deliveryRequestLists:', deliveryRequestLists);

    useEffect(() => {
        dispatch(
            diliveryRequestList({
                pageNumber: page,
                showLimit: showLimit,
                from: '',
                to: '',
            })
        );
    }, [page, showLimit]);

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
            Header: 'Order ID',
            accessor: (row) => (row.order_id ? row.order_id : 'N/A'),
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
            Header: 'Delivery Id Request',
            accessor: (row) => (row.delivery_request_id ? row.delivery_request_id : 'N/A'),
            width: 180,
        },
        {
            Header: 'Delivery Date',
            accessor: (row) => (row.delivery_date ? row.delivery_date : 'N/A'),
        },
        {
            Header: 'Delivery Time',
            accessor: (row) => (row.delivery_time ? row.delivery_time : 'N/A'),
        },
        {
            Header: 'Order Status',
            accessor: (row) => (row.order_status ? row.order_status : 'N/A'),
        },
        {
            Header: 'Delivery Status',
            accessor: (row) => (row.delivery_status_name ? row.delivery_status_name : 'N/A'),
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
                title="Delivery Request"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}></PageHeader>
            {deliveryRequestLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(deliveryRequestLists) ? (
                            <Table
                                Data={deliveryRequestLists}
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

export default Delivery;
