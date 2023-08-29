import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import DatewiseReportActionTypes from './constant';
import { datewiseReport } from './api';


// start Datewise Report

function* datewiseReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to, cancelOrder } }) {
    try {
        yield put({
            type: DatewiseReportActionTypes.DATEWISE_REPORT_LOADING,
            payload: {},
        });
        const response = yield call(datewiseReport, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
            from: from,
            to: to,
            cancel_order: cancelOrder
        });
        if (response.data.status) {
            yield put({
                type: DatewiseReportActionTypes.DATEWISE_REPORT_SUCCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: DatewiseReportActionTypes.DATEWISE_REPORT_RESET,
            //     payload: {},
            // });
        } else {
            yield put({
                type: DatewiseReportActionTypes.DATEWISE_REPORT_ERROR,
                payload: { ...response.data },
            });
            yield put({
                type: DatewiseReportActionTypes.DATEWISE_REPORT_RESET,
                payload: {},
            });
        }
    } catch (error) {
        yield put({
            type: DatewiseReportActionTypes.DATEWISE_REPORT_ERROR,
            payload: { message: error.message },
        });
        yield put({
            type: DatewiseReportActionTypes.DATEWISE_REPORT_RESET,
            payload: {},
        });
    }
}
// end Due Amount Report List


export function* getDatewiseReport(): any {
    yield takeEvery(DatewiseReportActionTypes.GET_DATEWISE_REPORT, datewiseReportList);
}

function* datewiseReportSaga(): any {
    yield all([
        fork(getDatewiseReport),
    ]);
}

export default datewiseReportSaga;
