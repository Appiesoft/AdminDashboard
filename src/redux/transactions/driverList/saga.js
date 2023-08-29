import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { driverListApi } from './api';
import DriverActionTypes from './constant';

function* driverList({ payload: { searchValue, pageNumber, showLimit, from, to, driverId, chooseFor } }) {
    try {
        yield put({
            type: DriverActionTypes.DRIVER_LIST_LOADING,
            payload: {}
        });
        const response = yield call(driverListApi,
            { search_value: searchValue, page_number: pageNumber, show_limit: showLimit, from: from, to: to, driver_id: driverId, choose_for: chooseFor });
        if (response.data.status) {
            yield put({
                type: DriverActionTypes.DRIVER_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: DriverActionTypes.DRIVER_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: DriverActionTypes.DRIVER_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}


export function* getDriverList(): any {
    yield takeEvery(DriverActionTypes.GET_DRIVER_LIST, driverList);
}


function* driverSaga(): any {
    yield all([
        fork(getDriverList),
    ]);
}

export default driverSaga;