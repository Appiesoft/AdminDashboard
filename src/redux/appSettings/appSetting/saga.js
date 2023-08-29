import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import AppSettingActionTypes from './constant';
import { appSettingListApi, appSettingUpdateApi } from './api';

// start app List
function* appSettingList() {
    try {
        yield put({
            type: AppSettingActionTypes.APP_SETTING_LIST_LOADING,
            payload: {},
        });
        const response = yield call(appSettingListApi, {});
        if (response.data.status) {
            yield put({
                type: AppSettingActionTypes.APP_SETTING_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: AppSettingActionTypes.APP_SETTING_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AppSettingActionTypes.APP_SETTING_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end app List

// start app update
function* appSettingUpdate({ payload: {
    name,
    startTime,
    endTime,
    intervalPerSlot,
    diffBetweenPickupAndDropOff,
    diffBetweenPickupAndDropOffForExpress,
    pickupOffset,
    loginWith,
    deliverySelection,
    recurringPickup,
    reccuringDescription
} }) {
    try {
        yield put({
            type: AppSettingActionTypes.APP_SETTING_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(appSettingUpdateApi,
            {
                name: name,
                start_time: startTime,
                end_time: endTime,
                interval_per_slot: intervalPerSlot,
                diff_between_pickup_and_drop_off: diffBetweenPickupAndDropOff,
                diff_between_pickup_and_drop_off_for_express: diffBetweenPickupAndDropOffForExpress,
                pickup_offset: pickupOffset,
                login_with: loginWith.toUpperCase(),
                delivery_selection: deliverySelection.toUpperCase(),
                recurring_pickup: recurringPickup.toUpperCase(),
                reccuring_description: reccuringDescription
            });
        if (response.data.status) {
            yield put({
                type: AppSettingActionTypes.APP_SETTING_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: AppSettingActionTypes.APP_SETTING_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: AppSettingActionTypes.APP_SETTING_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AppSettingActionTypes.APP_SETTING_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end app update


export function* getAppSettingList(): any {
    yield takeEvery(AppSettingActionTypes.GET_APP_SETTING_LIST, appSettingList);
}

export function* updateAppSetting(): any {
    yield takeEvery(AppSettingActionTypes.APP_SETTING_UPDATE, appSettingUpdate);
}


function* appSettingSaga(): any {
    yield all([
        fork(getAppSettingList),
        fork(updateAppSetting),
    ]);
}

export default appSettingSaga;
