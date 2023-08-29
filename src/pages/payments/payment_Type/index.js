import React, { useState } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentTypeListAction, paymentTypeRemove } from '../../../redux/actions';
import PageHeader from '../../../components/TablePage/PageHeader';
import { useEffect } from 'react';
import PaginationArea from '../../../components/TablePage/PaginationArea';
import DeleteModal from '../../../components/DeleteModal';
import MainLoader from '../../../components/MainLoader';
import ToastHandle from '../../../helpers/toastMessage';
import Table from '../../../components/TablePage/Table';
import AddPaymentModal from './addPaymentModal';

const PaymentType = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [showLimit, setShowLimit] = useState(10);
    const [printPdf, setPrintPdf] = useState(false);
    const [exportPdf, setExportPdf] = useState(false);
    const [exportCSV, setExportCSV] = useState(false);
    const [openTableOption, setOpenTableOption] = useState(false);
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [openNewEntry, setOpenNewEntry] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const PaymentTypeLoader = store.PaymentTypeListReducer?.loading;
    const PaymentTypeData = store?.PaymentTypeListReducer?.paymentTypeList?.data;
    const pagination = store?.PaymentTypeListReducer?.paymentTypeList?.meta?.pagination;
    const paymentDelete = store?.PaymentTypeRemove;

    console.log('PaymentTypeData', PaymentTypeData);

    const getPaymentType = () => {
        dispatch(
            PaymentTypeListAction({
                searchValue: searchText,
                pageNumber: page,
                showLimit: showLimit,
            })
        );
    };

    useEffect(() => {
        getPaymentType();
    }, [searchText, page, showLimit]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(paymentTypeRemove({ paymentId: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (paymentDelete?.status === true) {
            ToastHandle('success', paymentDelete?.message);
            getPaymentType();
        } else if (paymentDelete?.status === false) {
            ToastHandle('error', paymentDelete?.message);
        }
    }, [paymentDelete]);

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
            width: 50,
        },
        {
            Header: 'Payment Type',
            accessor: (row) => (row.method ? row.method : 'N/A'),
        },

        {
            Header: 'Image',
            accessor: 'image_url',
            Cell: ({ row }) => (
                <span className="rounded-2">
                    <img
                        src={row?.original?.image_url}
                        alt="product img"
                        height="50px"
                        width="50px"
                        className="rounded-2"
                    />
                </span>
            ),
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <DropdownButton
                    as="span"
                    variant="link"
                    align={{ sm: 'start' }}
                    className="actionButton"
                    id={`dropdown-row-${row.id}`}
                    title={<i className="bi bi-three-dots"></i>}>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setEditRow(row?.original);
                            setOpenNewEntry(true);
                        }}>
                        <i className="mdi mdi-square-edit-outline"></i>&nbsp;&nbsp; Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="my-dropdown-item"
                        onClick={() => {
                            setSeletedItem(row?.original?.payment_id);
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
                title="Payment Types"
                searchItem={setSearchText}
                handleExportPdf={handleExportPdf}
                handleExportCSV={handleExportCSV}
                handlePrintPdf={handlePrintPdf}
                openTableOption={openTableOption}
                setOpenTableOption={setOpenTableOption}>
                <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Add Payment</Tooltip>}>
                    <span
                        className="text-center p-1 border rounded-2 tableOption color d-none d-sm-block"
                        onClick={() => {
                            setEditRow(null);
                            setOpenNewEntry(true);
                        }}>
                        <i className="bi bi-plus-lg fs-4 fw-bold"></i>
                    </span>
                </OverlayTrigger>
            </PageHeader>
            <AddPaymentModal show={openNewEntry} onHide={setOpenNewEntry} editRow={editRow} />
            {PaymentTypeLoader ? (
                <MainLoader />
            ) : (
                <>
                    <div className="mt-2 mx-2 table_container rounded-1">
                        {Array.isArray(PaymentTypeData) ? (
                            <Table
                                Data={PaymentTypeData}
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

export default PaymentType;
