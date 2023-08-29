import React, { useState } from 'react';
import { Card, DropdownButton, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { paymentAdjustmentList, paymentAdjustmentDelete } from '../../../redux/actions';
import { useEffect } from 'react';
import DeleteModal from '../../../components/DeleteModal';
import MainLoader from '../../../components/MainLoader';
import ToastHandle from '../../../helpers/toastMessage';
import Table from '../../../components/ClientSideTable/Table';
import AddPaymentAdjustmentModal from './modal';

const PaymentAdjustment = () => {
    const [seletedItem, setSeletedItem] = useState(null);
    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [openNewEntry, setOpenNewEntry] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const PaymentAdjustmentLoader = store.PaymentAdjustmentList?.loading;
    const paymentAdjustmentData = store?.PaymentAdjustmentList?.paymentAdjustmentList?.data;
    const paymentDelete = store?.PaymentAdjustmentDelete;

    console.log('paymentAdjustmentData', paymentAdjustmentData);

    const getPaymentAjustment = () => {
        dispatch(
            paymentAdjustmentList({
                searchValue: '',
                pageNumber: '',
                showLimit: '',
                from: '',
                to: '',
                driverId: '',
                chooseFor: '',
            })
        );
    };

    useEffect(() => {
        getPaymentAjustment();
    }, []);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(paymentAdjustmentDelete({ paymentAdjustmentId: seletedItem }));
            setSeletedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        if (paymentDelete?.status === true) {
            ToastHandle('success', paymentDelete?.message);
            getPaymentAjustment();
        } else if (paymentDelete?.status === false) {
            ToastHandle('error', paymentDelete?.message);
        }
    }, [paymentDelete]);

    const COLUMNS = [
        {
            Header: 'Sr. No.',
            accessor: (row, index) => index + 1,
            width: 50,
        },
        {
            Header: 'Payment Adjustment',
            accessor: (row) => (row.type ? row.type : 'N/A'),
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
            <div className="d-flex justify-content-between mx-2 my-1">
                <div className="d-flex gap-2 ps-0 my-1">
                    <h4 className="page-title color">Payment Adjustment List</h4>
                </div>
                <div className="col-sm-6 d-flex my-1 pe-0 align-self-center gap-1 justify-content-end">
                    <span
                        className="px-2 py-1 border rounded-2 fw-semibold btn-hover"
                        style={{
                            backgroundColor: '#e74023',
                            color: 'white',
                        }}
                        onClick={() => {
                            setEditRow(null);
                            setOpenNewEntry(true);
                        }}>
                        Add Payment Adjustment
                    </span>
                </div>
            </div>
            <AddPaymentAdjustmentModal show={openNewEntry} onHide={setOpenNewEntry} editRow={editRow} />
            {PaymentAdjustmentLoader ? (
                <MainLoader />
            ) : (
                <>
                    {Array.isArray(paymentAdjustmentData) ? (
                        <Table Data={paymentAdjustmentData} Columns={COLUMNS} />
                    ) : (
                        <h4 className="text-center">Oops There is No Data To Show</h4>
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

export default PaymentAdjustment;
