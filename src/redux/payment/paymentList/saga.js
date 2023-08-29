import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { paymnetListApi } from './api';
import PaymentActionTypes from './constant';


function* paymentList({ payload: { searchValue, pageNumber, showLimit, storeId, date } }) {
    try {
        yield put({
            type: PaymentActionTypes.PAYMENT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(paymnetListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit, store_id: storeId, date: date });
        if (response.data.status) {
            yield put({
                type: PaymentActionTypes.PAYMENT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: PaymentActionTypes.PAYMENT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentActionTypes.PAYMENT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getPaymentList(): any {
    yield takeEvery(PaymentActionTypes.GET_PAYMENT_LIST, paymentList);
}

function* paymentSaga(): any {
    yield all([fork(getPaymentList)]);
}

export default paymentSaga;
