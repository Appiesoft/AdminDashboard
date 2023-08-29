import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ExpensesReportActionTypes from './constant';
import { expensesReportList } from './api';

// start expenses report List
function* ExpensesReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to } }) {
    try {
        yield put({
            type: ExpensesReportActionTypes.EXPENSE_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(expensesReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
            from: from,
            to: to

        });
        if (response.data.status) {
            yield put({
                type: ExpensesReportActionTypes.EXPENSE_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ExpensesReportActionTypes.EXPENSE_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ExpensesReportActionTypes.EXPENSE_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end expenses report List


export function* getExpenseReportList(): any {
    yield takeEvery(ExpensesReportActionTypes.GET_EXPENSE_REPORT_LIST, ExpensesReportList);
}

function* expenseReportListSaga(): any {
    yield all([
        fork(getExpenseReportList),
    ]);
}

export default expenseReportListSaga;
