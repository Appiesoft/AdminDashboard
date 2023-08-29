import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProfitAndLossReportListActionTypes from './constant';
import { profitAndLossReportList } from './api';

// start Profit and Loss report list
function* ProfitAndLossReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to, cancelOrder } }) {
    try {
        yield put({
            type: ProfitAndLossReportListActionTypes.PROFIT_AND_LOSS_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(profitAndLossReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,
            cancel_order: cancelOrder
        });

        if (response.data.status) {
            yield put({
                type: ProfitAndLossReportListActionTypes.PROFIT_AND_LOSS_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProfitAndLossReportListActionTypes.PROFIT_AND_LOSS_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProfitAndLossReportListActionTypes.PROFIT_AND_LOSS_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Tax collection report list


export function* getProfitAndLossReportList(): any {
    yield takeEvery(ProfitAndLossReportListActionTypes.GET_PROFIT_AND_LOSS_REPORT_LIST, ProfitAndLossReportList);
}

function* profitAndLossReportListSaga(): any {
    yield all([
        fork(getProfitAndLossReportList),
    ]);
}

export default profitAndLossReportListSaga;
