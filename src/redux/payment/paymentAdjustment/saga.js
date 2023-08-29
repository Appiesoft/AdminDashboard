import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { paymentAdjustmentApi, paymentAdjustmentCreateApi, paymentAdjustmentDeleteApi, paymentAdjustmentUpdateApi } from './api';
import PaymentAdjustmentActionTypes from './constant';


function* paymentAdjustmentList({ payload: { searchValue, pageNumber, showLimit, from, to, driverId, chooseFor } }) {
    try {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(paymentAdjustmentApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit, from: from, to: to, driver_id: driverId, choose_for: chooseFor });
        if (response.data.status) {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

// start payment Adjustment Create
function* paymentAdjustmentCreate({
    payload: {
        adjustmentName
    },
}) {
    try {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(paymentAdjustmentCreateApi, {
            adjustment_name: adjustmentName
        });
        if (response.data.status) {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Payment Type Create


// // start Employee Update
function* paymentAdjustmentUpdate({
    payload: { adjustmentId, adjustmentName },
}) {
    try {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(paymentAdjustmentUpdateApi, {
            adjustment_id: adjustmentId, adjustment_name: adjustmentName
        });
        if (response.data.status) {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Employee Update

// start Payment Adjustment Delete
function* paymentAdjustmentDelete({
    payload: {
        paymentAdjustmentId,
    },
}) {
    try {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(paymentAdjustmentDeleteApi, {
            paymentAdjustmentId: paymentAdjustmentId,
        });
        if (response.data.status) {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentAdjustmentActionTypes.PAYMENT_ADJUSTMENT_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Payment charges remove




export function* getPaymentAdjustmentList(): any {
    yield takeEvery(PaymentAdjustmentActionTypes.GET_PAYMENT_ADJUSTMENT_LIST, paymentAdjustmentList);
}

export function* createPaymentAdjustment(): any {
    yield takeEvery(PaymentAdjustmentActionTypes.CREATE_PAYMENT_ADJUSTMENT, paymentAdjustmentCreate);
}

export function* updatePaymentAdjustment(): any {
    yield takeEvery(PaymentAdjustmentActionTypes.UPDATE_PAYMENT_ADJUSTMENT, paymentAdjustmentUpdate);
}

export function* deletePaymentAdjustment(): any {
    yield takeEvery(PaymentAdjustmentActionTypes.DELETE_PAYMENT_ADJUSTMENT, paymentAdjustmentDelete);
}

function* paymentAdjustmentSaga(): any {
    yield all([fork(getPaymentAdjustmentList), fork(createPaymentAdjustment), fork(updatePaymentAdjustment), fork(deletePaymentAdjustment)]);
}

export default paymentAdjustmentSaga;
