import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import CashDayReportActionTypes from './constant';
import { cashDayReport } from './api';


// start cash day Report

function* cashDayReportList({ payload: { searchValue, pageNumber, showLimit, from, to, storeId } }) {
    try {
        yield put({
            type: CashDayReportActionTypes.CASH_DAY_REPORT_LOADING,
            payload: {},
        });
        const response = yield call(cashDayReport, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,

        });

        if (response.data.status) {
            yield put({
                type: CashDayReportActionTypes.CASH_DAY_REPORT_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CashDayReportActionTypes.CASH_DAY_REPORT_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CashDayReportActionTypes.CASH_DAY_REPORT_ERROR,
            payload: { message: error.message },
        });
    }
}
// end cash day Report List


export function* getCashDayReport(): any {
    yield takeEvery(CashDayReportActionTypes.GET_CASH_DAY_REPORT, cashDayReportList);
}

function* cashDayReportSaga(): any {
    yield all([
        fork(getCashDayReport),
    ]);
}

export default cashDayReportSaga;
