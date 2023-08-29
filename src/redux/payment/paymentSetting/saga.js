import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { paymentSettingtApi } from './api';
import PaymentSettingActionTypes from './constant';


function* paymentSettingList({ payload: { } }) {
    try {
        yield put({
            type: PaymentSettingActionTypes.PAYMENT_SETTING_LIST_LOADING,
            payload: {},
        });
        const response = yield call(paymentSettingtApi, {});
        if (response.data.status) {
            yield put({
                type: PaymentSettingActionTypes.PAYMENT_SETTING_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: PaymentSettingActionTypes.PAYMENT_SETTING_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PaymentSettingActionTypes.PAYMENT_SETTING_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}





export function* getPaymentSettingList(): any {
    yield takeEvery(PaymentSettingActionTypes.GET_PAYMENT_SETTING_LIST, paymentSettingList);
}




function* paymentSettingSaga(): any {
    yield all([fork(getPaymentSettingList)]);
}

export default paymentSettingSaga;
