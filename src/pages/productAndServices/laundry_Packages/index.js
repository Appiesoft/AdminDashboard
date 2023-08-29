import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { laundryPackagesList, laundryPackageDelete } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/TablePage/Table';
import DeleteModal from '../../../components/DeleteModal';
import ToastHandle from '../../../helpers/toastMessage';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import { useNavigate } from 'react-router-dom';
import NewLaundryPackagesModal from './modal';

const LaundryPackages = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);

    const [newLoundryPackage, setNewLoundryPackage] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const laundryPackagesListLoader = store.LaundryPackagesList?.loading;
    const laundryPackagesListData = store.LaundryPackagesList?.laundryPackagesList?.data;
    const pagination = store.LaundryPackagesList?.laundryPackagesList?.meta?.pagination;
    const laundryPackagesDeleteData = store?.LaundryPackagesDelete;

    const getLaundryPackagesList = () => {
        dispatch(
            laundryPackagesList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };

    useEffect(() => {
        getLaundryPackagesList();
    }, [page, showLimit, searchText]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(laundryPackageDelete({ id: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (laundryPackagesDeleteData?.status === true) {
            ToastHandle('success', laundryPackagesDeleteData?.message);
            getLaundryPackagesList();
        } else if (laundryPackagesDeleteData?.status === false) {
            ToastHandle('error', laundryPackagesDeleteData?.message);
        }
    }, [laundryPackagesDeleteData]);

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
            Header: 'ID',
            accessor: (row) => (row.pkg_id ? row.pkg_id : 'N/A'),
        },
        {
            Header: 'Services',
            accessor: (row) => (row.services ? row.services : 'N/A'),
        },
        {
            Header: 'Package Name',
            accessor: (row) => (row.package_name ? row.package_name : 'N/A'),
        },
        {
            Header: 'Capacity',
            accessor: (row) => (row.usage_limit ? row.usage_limit : 'N/A'),
        },
        {
            Header: 'Pickup Option',
            accessor: (row) => (row.pickup ? row.pickup : 'N/A'),
        },
        {
            Header: 'Duration',
            accessor: (row) => (row.duration ? row.duration : 'N/A'),
        },
        {
            Header: 'Amount',
            accessor: (row) => (row.amount ? row.amount : 'N/A'),
        },
        {
            Header: 'Description',
            accessor: (row) => (row.description ? row.description : 'N/A'),
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
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setEditRow(row?.original);
                            setNewLoundryPackage(true);
                        }}>
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setSeletedItem(row?.original?.pkg_id);
                            setIsDeleteModelOpen(!isDeleteModelOpen);
                        }}>
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
                title="Laundry Packages"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">New Entry</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => setNewLoundryPackage(true)}
                        // onClick={() => navigate('/productservices/laundryPackage/add')}
                    >
                        <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <NewLaundryPackagesModal show={newLoundryPackage} onHide={setNewLoundryPackage} editRow={editRow} />
            {laundryPackagesListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(laundryPackagesListData) ? (
                            <Table
                                Data={laundryPackagesListData}
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
            <DeleteModal
                show={isDeleteModelOpen}
                onHide={setIsDeleteModelOpen}
                deleteRecord={setDeleteRecordConfirmation}
            />
        </Card>
    );
};

export default LaundryPackages;
