import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import IncomeReportActionTypes from './constant';
import { incomeReportList } from './api';

// start income report List
function* IncomeReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to, cancelOrder } }) {
    try {
        yield put({
            type: IncomeReportActionTypes.INCOME_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(incomeReportList, {
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
                type: IncomeReportActionTypes.INCOME_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: IncomeReportActionTypes.INCOME_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
            yield put({
                type: IncomeReportActionTypes.INCOME_REPORT_LIST_RESET,
                payload: {},
            });
        }
    } catch (error) {
        yield put({
            type: IncomeReportActionTypes.INCOME_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });

    }
}
// end monthly report List


export function* getIncomeReportList(): any {
    yield takeEvery(IncomeReportActionTypes.GET_INCOME_REPORT_LIST, IncomeReportList);
}

function* incomeReportListSaga(): any {
    yield all([
        fork(getIncomeReportList),
    ]);
}

export default incomeReportListSaga;
