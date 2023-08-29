import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import PaymentChargesActionTypes from './constant';
import {
    paymentChargesCreateApi,
    paymentChargesRemoveApi,
    paymentChargesListApi,
    paymentChargesUpdateApi,
} from './api';
import CryptoJS from 'crypto-js';

// start payment charges List
function* paymentChargesList() {
    try {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_LIST_LOADING,
            payload: {},
        });
        const response = yield call(paymentChargesListApi, {});
        if (response.data.status) {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Payment charges List

// // start Payment charges Create
function* paymentChargesCreate({ payload: { status, paymentMethodId, amount } }) {
    try {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(paymentChargesCreateApi, {
            status: status,
            payment_method_id: paymentMethodId,
            amount: amount,
        });
        if (response.data.status) {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Payment charges Create

// // start Payment charges Update
function* paymentChargesUpdate({ payload: { status, paymentMethodId, paymentChargesId, amount } }) {
    try {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(paymentChargesUpdateApi, {
            status: status,
            payment_method_id: paymentMethodId,
            payment_charges_id: paymentChargesId,
            amount: amount,
        });
        if (response.data.status) {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_ERROR,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_RESET,
                payload: {},
            });
        }
    } catch (error) {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_ERROR,
            payload: { message: error.message },
        });
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_UPDATE_RESET,
            payload: {},
        });
    }
}
// // end Payment charges Update

// // start Payment charges remove
function* paymentChargesRemove({ payload: { paymentChargesId } }) {
    try {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_LOADING,
            payload: {},
        });
        const response = yield call(paymentChargesRemoveApi, { payment_charges_id: paymentChargesId });
        if (response.data.status) {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_ERROR,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_RESET,
                payload: {},
            });
        }
    } catch (error) {
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_ERROR,
            payload: { message: error.message },
        });
        yield put({
            type: PaymentChargesActionTypes.PAYMENT_CHARGES_REMOVE_RESET,
            payload: {},
        });
    }
}
// // end Payment charges remove

export function* getPaymentChargesList(): any {
    yield takeEvery(PaymentChargesActionTypes.GET_PAYMENT_CHARGES_LIST, paymentChargesList);
}
export function* createPaymentCharges(): any {
    yield takeEvery(PaymentChargesActionTypes.CREATE_PAYMENT_CHARGES, paymentChargesCreate);
}
export function* updatePaymentCharges(): any {
    yield takeEvery(PaymentChargesActionTypes.UPDATE_PAYMENT_CHARGES, paymentChargesUpdate);
}
export function* removePaymentCharges(): any {
    yield takeEvery(PaymentChargesActionTypes.REMOVE_PAYMENT_CHARGES, paymentChargesRemove);
}

function* paymentChargesListSaga(): any {
    yield all([
        fork(getPaymentChargesList),
        fork(createPaymentCharges),
        fork(updatePaymentCharges),
        fork(removePaymentCharges),
    ]);
}

export default paymentChargesListSaga;
