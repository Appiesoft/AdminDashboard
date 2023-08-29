import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import TipReportListActionTypes from './constant';
import { tipReportList } from './api';

// start Tip report list
function* TipReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to } }) {
    try {
        yield put({
            type: TipReportListActionTypes.TIP_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(tipReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,
        });

        if (response.data.status) {
            yield put({
                type: TipReportListActionTypes.TIP_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: TipReportListActionTypes.TIP_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: TipReportListActionTypes.TIP_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Tip report list


export function* gettipReportList(): any {
    yield takeEvery(TipReportListActionTypes.GET_TIP_REPORT_LIST, TipReportList);
}

function* tipReportListSaga(): any {
    yield all([
        fork(gettipReportList),
    ]);
}

export default tipReportListSaga;
