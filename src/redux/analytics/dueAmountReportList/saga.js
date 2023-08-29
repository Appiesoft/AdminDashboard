import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import DueAmountReportActionTypes from './constant';
import { dueAmountReport } from './api';


// start Due Amount Report List

function* dueAmountReportList({ payload: { searchValue, pageNumber, showLimit, storeId } }) {
    try {
        yield put({
            type: DueAmountReportActionTypes.DUE_AMOUNT_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(dueAmountReport, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
        });
        if (response.data.status) {
            yield put({
                type: DueAmountReportActionTypes.DUE_AMOUNT_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DueAmountReportActionTypes.DUE_AMOUNT_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DueAmountReportActionTypes.DUE_AMOUNT_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Due Amount Report List


export function* getDueAmountReportList(): any {
    yield takeEvery(DueAmountReportActionTypes.GET_DUE_AMOUNT_REPORT_LIST, dueAmountReportList);
}

function* dueAmountReportListSaga(): any {
    yield all([
        fork(getDueAmountReportList),
    ]);
}

export default dueAmountReportListSaga;
