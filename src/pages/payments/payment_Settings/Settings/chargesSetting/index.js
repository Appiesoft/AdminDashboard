import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentChargesList, PaymentTypeListAction, paymentChargesRemove } from '../../../../../redux/actions';
import MainLoader from '../../../../../components/MainLoader';
import PaymentDetailRow from './paymentDetailRow';
import { Button } from 'react-bootstrap';
import DeleteModal from '../../../../../components/DeleteModal';
import ToastHandle from '../../../../../helpers/toastMessage';

const Charges = () => {
    const [addPayment, setAddPayment] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activatedRow, setActivatedRow] = useState(null);

    const [deleteRecordConfirmation, setDeleteRecordConfirmation] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const PaymentChargeLoader = store.PaymentChargesList?.loading;
    const paymentTypeData = store?.PaymentTypeListReducer?.paymentTypeList?.data;
    const paymentChargeListData = store?.PaymentChargesList?.paymentChargesList?.data;

    const paymentChargeDelete = store?.PaymentChargesRemove;
    const paymentChargeUpdate = store?.PaymentChagesUpdate;
    const paymentChargeCreate = store?.PaymentChargesCreate;

    const paymentChargeList = () => {
        dispatch(paymentChargesList());
    };

    useEffect(() => {
        if (paymentChargeCreate?.status === true) {
            ToastHandle('success', paymentChargeCreate?.message);
            dispatch(paymentChargesList());
            setAddPayment(false);
        } else if (paymentChargeCreate?.status === false) {
            ToastHandle('error', paymentChargeCreate?.message);
        }
    }, [paymentChargeCreate?.status]);

    useEffect(() => {
        if (paymentChargeUpdate?.status === true) {
            ToastHandle('success', paymentChargeUpdate?.message);
            paymentChargeList();
        } else if (paymentChargeUpdate?.status === false) {
            ToastHandle('error', paymentChargeUpdate?.message);
        }
    }, [paymentChargeUpdate?.status]);

    useEffect(() => {
        if (paymentChargeDelete?.status === true) {
            ToastHandle('success', paymentChargeDelete?.message);
            paymentChargeList();
        } else if (paymentChargeDelete?.status === false) {
            ToastHandle('error', paymentChargeDelete?.message);
        }
    }, [paymentChargeDelete?.status]);

    useEffect(() => {
        if (deleteRecordConfirmation) {
            dispatch(paymentChargesRemove({ paymentChargesId: selectedItem }));
            setSelectedItem(null);
        }
        setDeleteRecordConfirmation(false);
    }, [deleteRecordConfirmation]);

    useEffect(() => {
        paymentChargeList();
        dispatch(
            PaymentTypeListAction({
                searchValue: '',
                pageNumber: '',
                showLimit: '',
            })
        );
    }, []);

    return (
        <div className="my-4 mx-2">
            {PaymentChargeLoader ? (
                <MainLoader />
            ) : (
                paymentChargeListData?.map((item) => (
                    <PaymentDetailRow
                        paymentType={paymentTypeData}
                        id={item?.payment_charges_id}
                        status={item?.status}
                        amount={item?.amount}
                        paymentTypeId={item?.payment_method_id}
                        setAddPayment={setAddPayment}
                        key={item?.payment_charges_id}
                        setSelectedItem={setSelectedItem}
                        setIsDeleteModelOpen={setIsDeleteModelOpen}
                        setActivatedRow={setActivatedRow}
                        activatedRow={activatedRow}
                    />
                ))
            )}
            {addPayment ? (
                <PaymentDetailRow paymentType={paymentTypeData} setAddPayment={setAddPayment} />
            ) : (
                <div className="d-flex  justify-content-center mt-3">
                    <Button className="rounded-pill mx-2" onClick={() => setAddPayment(true)}>
                        Add <i className="bi bi-plus-lg"></i>
                    </Button>
                </div>
            )}
            <DeleteModal
                show={isDeleteModelOpen}
                onHide={setIsDeleteModelOpen}
                deleteRecord={setDeleteRecordConfirmation}
            />
        </div>
    );
};

export default Charges;
