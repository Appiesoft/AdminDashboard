import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { adminProfileApi, adminProfileUpdateApi } from './api';
import AdminProfileActionTypes from './constant';
import CryptoJS from 'crypto-js';



// start Employee List
function* adminProfile() {
    try {
        yield put({
            type: AdminProfileActionTypes.ADMIN_PROFILE_LOADING,
            payload: {},
        });
        const response = yield call(adminProfileApi, {});
        if (response.data.status) {
            yield put({
                type: AdminProfileActionTypes.ADMIN_PROFILE_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: AdminProfileActionTypes.ADMIN_PROFILE_RESET,
            //     payload: {},
            // });
        } else {
            yield put({
                type: AdminProfileActionTypes.ADMIN_PROFILE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AdminProfileActionTypes.ADMIN_PROFILE_ERROR,
            payload: { message: error.message },
        });
    }
}

function* adminProfileUpdate({ payload: { adminName, mobile, emailId, password } }) {
    console.log({ adminName, mobile, emailId, password })
    try {
        yield put({
            type: AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(adminProfileUpdateApi,
            {
                admin_name: adminName,
                mobile: mobile,
                email_id: emailId,
                password: CryptoJS.SHA1(password).toString()
            });
        if (response.data.status) {
            yield put({
                type: AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AdminProfileActionTypes.ADMIN_PROFILE_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getAdminProfile(): any {
    yield takeEvery(AdminProfileActionTypes.GET_ADMIN_PROFILE, adminProfile);
}
export function* getAdminProfileUpadte(): any {
    yield takeEvery(AdminProfileActionTypes.ADMIN_PROFILE_UPDATE, adminProfileUpdate);
}

function* adminProfileSaga(): any {
    yield all([fork(getAdminProfile)]);
    yield all([fork(getAdminProfileUpadte)]);
}

export default adminProfileSaga;
