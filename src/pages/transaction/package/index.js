import React, { useState, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import { useDispatch, useSelector } from 'react-redux';
import { assignedPackageDelete, assignedPackageList } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import Table from '../../../components/TablePage/Table';
import AssignPackage from './assignPackage';

const Package = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [showAssignPackageModal, setShowAssignPackageModal] = useState(false);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const packageListLoader = store.AssignedPackageList.loading;
    const packageListData = store?.AssignedPackageList?.assignedPackageLists?.data;
    const pagination = store.AssignedPackageList?.assignedPackageLists?.meta?.pagination;

    // console.log('packageListData', packageListData);

    useEffect(() => {
        dispatch(
            assignedPackageList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    }, [page, showLimit, searchText]);

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
            Header: 'Order Id',
            accessor: (row) => (row.pkg_id ? row.pkg_id : 'N/A'),
        },
        {
            Header: 'Name',
            accessor: (row) => (row.customer_name ? row.customer_name : 'N/A'),
        },
        {
            Header: 'Package',
            accessor: (row) => (row.pref_pkg ? row.pref_pkg : 'N/A'),
        },
        {
            Header: 'Period',
            accessor: (row) => (row.pref_period ? row.pref_period : 'N/A'),
        },

        {
            Header: 'Pickup',
            accessor: (row) => (row.pref_pickup ? row.pref_pickup : 'N/A'),
        },
        {
            Header: 'Pickup start date',
            accessor: (row) => (row.pref_pickup_date ? row.pref_pickup_date : 'N/A'),
        },
        {
            Header: 'Expire',
            accessor: (row) => (row.pkg_expire_date ? row.pkg_expire_date : 'N/A'),
        },
        {
            Header: 'Capacity',
            accessor: (row) => (row.usage_limit ? row.usage_limit : 'N/A'),
        },
        {
            Header: 'Amount',
            accessor: (row) => (row.amount ? row.amount : 'N/A'),
        },
        {
            Header: 'Pay Mode',
            accessor: (row) => (row.payment_mode ? row.payment_mode : 'N/A'),
        },
        {
            Header: 'Pay Date',
            accessor: (row) => (row.payment_date ? row.payment_date : 'N/A'),
        },
        {
            Header: 'Pkg Status',
            accessor: (row) => (row.pkg_active ? row.pkg_active : 'N/A'),
        },
    ];

    return (
        <Card style={{ marginTop: '1.5rem' }}>
            <PageHeader
                title="Package List"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Assign Package</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color"
                        onClick={() => setShowAssignPackageModal(!showAssignPackageModal)}>
                        <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <AssignPackage show={showAssignPackageModal} onHide={setShowAssignPackageModal} />
            {packageListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(packageListData) ? (
                            <Table
                                Data={packageListData}
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

export default Package;
