import React, { useState, useEffect } from 'react';
import { Card, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import MainLoader from '../../../components/MainLoader';
import { bulkInvoiceList } from '../../../redux/actions';
import Table from '../../../components/TablePage/Table';
import Select from 'react-select';

const Options = [
    { label: 'Paid', value: '1' },
    { label: 'UnPaid', value: '0' },
];

const BulkInvoice = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    // const csvLinkRef = useRef();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const bulkInvoiceLoader = store.BulkInvoiceList?.loading;
    const pagination = store.BulkInvoiceList?.bulkInvoiceLists?.meta?.pagination;
    const bulkInvoiceLists = store.BulkInvoiceList?.bulkInvoiceLists?.data;
    console.log('bulkInvoiceLists:', bulkInvoiceLists);

    useEffect(() => {
        dispatch(
            bulkInvoiceList({
                pageNumber: page,
                showLimit: showLimit,
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
            Header: 'Sr. No.',
            accessor: (row) => (row.id ? row.id : 'N/A'),
        },
        {
            Header: 'Bulk Invoice',
            accessor: (row) => (row.bulk_invoice_no ? row.bulk_invoice_no : 'N/A'),
        },
        {
            Header: 'Customer Name',
            accessor: (row) => (row.customer_name ? row.customer_name : 'N/A'),
        },
        {
            Header: 'Bulk Invoice Created Date',
            accessor: (row) => (row.created_date ? row.created_date : 'N/A'),
            minWidth: 200,
        },
        {
            Header: 'Total Amount',
            accessor: (row) => (row.total_paid ? row.total_paid : 'N/A'),
            // minWidth: 200,
        },
        {
            Header: 'Details',
            accessor: (row) => (row.details ? row.details : 'N/A'),
            minWidth: 400,
        },

        {
            Header: 'Status',
            Cell: ({ row }) => (
                <Select
                    options={Options}
                    className="react-select"
                    classNamePrefix="react-select"
                    defaultValue={Options.filter((option) => option.value === row?.original?.status)}
                />
            ),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Invoice</Tooltip>}>
                    <i class="bi bi-receipt fs-4"></i>
                </OverlayTrigger>
            ),
            width: 70,
        },
        {
            Header: 'Operation',
            Cell: ({ row }) => <Button className="rounded-pill">Submit</Button>,
        },
    ];

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Bulk Invoice"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}
            />
            {bulkInvoiceLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(bulkInvoiceLists) ? (
                            <Table
                                Data={bulkInvoiceLists}
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

export default BulkInvoice;
