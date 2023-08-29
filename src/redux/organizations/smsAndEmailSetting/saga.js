import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { smsAndEmailApi, updateSmsAndEmailApi } from './api';
import SmsAndEmailActionTypes from './constant';

function* smsAndEnail({ payload: { type } }) {
    try {
        yield put({
            type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_LOADING,
            payload: {},
        });
        const response = yield call(smsAndEmailApi, { type: type });
        if (response.data.status) {
            yield put({
                type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
function* updateSmsAndEmail({ payload: { id, type, status } }) {
    try {
        yield put({
            type: SmsAndEmailActionTypes.SMS_AND_EMAIL_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(updateSmsAndEmailApi, { id: id, type: type, status: status });
        if (response.data.status) {
            yield put({
                type: SmsAndEmailActionTypes.SMS_AND_EMAIL_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: SmsAndEmailActionTypes.SMS_AND_EMAIL_UPDATE_SUCCESS,
                payload: {},
            });
        } else {
            yield put({
                type: SmsAndEmailActionTypes.SMS_AND_EMAIL_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: SmsAndEmailActionTypes.SMS_AND_EMAIL_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* smsAndEmailUpdate(): any {
    yield takeEvery(SmsAndEmailActionTypes.UPDATE_SMS_AND_EMAIL, updateSmsAndEmail);
}

export function* getSmsAndEmail(): any {
    yield takeEvery(SmsAndEmailActionTypes.GET_SMS_AND_EMAIL_LIST, smsAndEnail);
}

function* smsAndEmailSaga(): any {
    yield all([fork(getSmsAndEmail)]);
    yield all([fork(smsAndEmailUpdate)]);
}

export default smsAndEmailSaga;
