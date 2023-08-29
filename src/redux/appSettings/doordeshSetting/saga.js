import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { doordashSettingListApi, doordashSettingUpdateApi } from './api';
import DoordeshSettingActionTypes from './constant';

// start app List
function* doordashSettingList() {
    try {
        yield put({
            type: DoordeshSettingActionTypes.DOORDESH_SETTING_LIST_LOADING,
            payload: {},
        });
        const response = yield call(doordashSettingListApi, {});
        if (response.data.status) {
            yield put({
                type: DoordeshSettingActionTypes.DOORDESH_SETTING_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DoordeshSettingActionTypes.DOORDESH_SETTING_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DoordeshSettingActionTypes.DOORDESH_SETTING_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end app List

// start app update
function* doordashSettingUpdate({ payload: { doordashStatus } }) {
    try {
        yield put({
            type: DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(doordashSettingUpdateApi, {
            doordash_status: doordashStatus
        });
        if (response.data.status) {
            yield put({
                type: DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end doordesh setting update


export function* getDoordeshSettingList(): any {
    yield takeEvery(DoordeshSettingActionTypes.GET_DOORDESH_SETTING_LIST, doordashSettingList);
}

export function* updateDoordashSetting(): any {
    yield takeEvery(DoordeshSettingActionTypes.DOORDESH_SETTING_UPDATE, doordashSettingUpdate);
}


function* doordeshSettingSaga(): any {
    yield all([
        fork(getDoordeshSettingList),
        fork(updateDoordashSetting),
    ]);
}

export default doordeshSettingSaga;
