import React, { useState, useEffect } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { upchargesList, upchargesDelete } from '../../../redux/actions';
import MainLoader from '../../../components/MainLoader';
import Table from '../../../components/TablePage/Table';
import DeleteModal from '../../../components/DeleteModal';
import ToastHandle from '../../../helpers/toastMessage';
import PageHeader from '../../../components/TablePage/PageHeader';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import NewUpCharges from './modal';

const UpCharges = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [openNewUpCharges, setOpenNewUpCharges] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const upchargesListLoader = store.UpchargesList?.loading;
    const upchargesListData = store.UpchargesList?.upchargesList;
    const pagination = store.UpchargesList?.upchargesList?.meta?.pagination;
    const upChargeDelete = store.UpchargesDelete;

    const getUpChargesList = () => {
        dispatch(
            upchargesList({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };

    useEffect(() => {
        getUpChargesList();
    }, [page, showLimit, searchText]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(upchargesDelete({ id: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (upChargeDelete?.status === true) {
            ToastHandle('success', upChargeDelete?.message);
            getUpChargesList();
        } else if (upChargeDelete?.status === false) {
            ToastHandle('error', upChargeDelete?.message);
        }
    }, [upChargeDelete]);

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
            accessor: (row) => (row.id ? row.id : 'N/A'),
        },
        {
            Header: 'Name',
            accessor: (row) => (row.name ? row.name : 'N/A'),
        },
        {
            Header: 'Unit',
            accessor: (row) => (row.unit ? row.unit : 'N/A'),
        },
        {
            Header: 'Price',
            accessor: (row) => (row.price ? row.price : 'N/A'),
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
                            setOpenNewUpCharges(true);
                        }}>
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setSeletedItem(row?.original?.id);
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
                title="Up Charges"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">New Product Color</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => setOpenNewUpCharges(true)}>
                        <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <NewUpCharges show={openNewUpCharges} onHide={setOpenNewUpCharges} editRow={editRow} />
            {upchargesListLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(upchargesListData) ? (
                            <Table
                                Data={upchargesListData}
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

export default UpCharges;
