import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { paymentTypeCreateApi, paymentTypeApi, paymentTypeUpdateApi, paymentTypeRemoveApi } from './api';
import PaymentTypeActionTypes from './constant';

function* paymentTypeList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_LIST_LOADING,
            payload: {},
        });
        const response = yield call(paymentTypeApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}


// start Payment Type Create
function* paymentTypeCreate({
    payload: {
        method,
        image
    },
}) {
    try {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(paymentTypeCreateApi, {
            method: method, image: image
        });
        if (response.data.status) {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Payment Type Create

// // start Payment Type Update
function* paymentTypeUpdate({
    payload: {
        paymentMethodId,
        method,
        image,
    },
}) {
    try {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(paymentTypeUpdateApi, {
            payment_method_id: paymentMethodId, method: method, image: image

        });
        if (response.data.status) {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Employee Update

// start Payment charges remove
function* paymentTypeRemove({
    payload: {
        paymentId,
    },
}) {
    try {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_LOADING,
            payload: {},
        });
        const response = yield call(paymentTypeRemoveApi, {
            paymentId: paymentId,
        });
        if (response.data.status) {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentTypeActionTypes.PAYMENT_TYPE_REMOVE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Payment charges remove






export function* getPaymentTypeList(): any {
    yield takeEvery(PaymentTypeActionTypes.GET_PAYMENT_TYPE_LIST, paymentTypeList);
}

export function* createPaymentType(): any {
    yield takeEvery(PaymentTypeActionTypes.CREATE_PAYMENT_TYPE, paymentTypeCreate);
}

export function* updatePaymentType(): any {
    yield takeEvery(PaymentTypeActionTypes.UPDATE_PAYMENT_TYPE, paymentTypeUpdate);
}
export function* removePaymentType(): any {
    yield takeEvery(PaymentTypeActionTypes.REMOVE_PAYMENT_TYPE, paymentTypeRemove);
}

function* paymentTypeSaga(): any {
    yield all([fork(getPaymentTypeList), fork(createPaymentType), fork(updatePaymentType), fork(removePaymentType)]);
}



export default paymentTypeSaga;
