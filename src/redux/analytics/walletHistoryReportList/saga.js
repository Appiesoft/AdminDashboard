import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import WalletHistoryReportActionTypes from './constant';
import { walletHistoryReporttList } from './api';

// start wallet history report List
function* WalletHistoryReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to } }) {
    try {
        yield put({
            type: WalletHistoryReportActionTypes.WALLET_HISTORY_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(walletHistoryReporttList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
            from: from,
            to: to

        });
        if (response.data.status) {
            yield put({
                type: WalletHistoryReportActionTypes.WALLET_HISTORY_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: WalletHistoryReportActionTypes.WALLET_HISTORY_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletHistoryReportActionTypes.WALLET_HISTORY_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end monthly report List


export function* getWalletHistoryReportList(): any {
    yield takeEvery(WalletHistoryReportActionTypes.GET_WALLET_HISTORY_REPORT_LIST, WalletHistoryReportList);
}

function* walletHistoryReportListSaga(): any {
    yield all([
        fork(getWalletHistoryReportList),
    ]);
}

export default walletHistoryReportListSaga;
