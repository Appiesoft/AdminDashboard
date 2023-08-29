import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import MonthlyReportActionTypes from './constant';
import { monthlyReportList } from './api';

// start monthly report List
function* MonthlyReportList({ payload: { searchValue, pageNumber, showLimit, date, storeId, cancelOrder } }) {
    try {
        yield put({
            type: MonthlyReportActionTypes.MONTHLY_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(monthlyReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
            date: date,
            cancel_order: cancelOrder

        });
        if (response.data.status) {
            yield put({
                type: MonthlyReportActionTypes.MONTHLY_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: MonthlyReportActionTypes.MONTHLY_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: MonthlyReportActionTypes.MONTHLY_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end monthly report List


export function* getMonthlyReportList(): any {
    yield takeEvery(MonthlyReportActionTypes.GET_MONTHLY_REPORT_LIST, MonthlyReportList);
}

function* monthlyReportListSaga(): any {
    yield all([
        fork(getMonthlyReportList),
    ]);
}

export default monthlyReportListSaga;
