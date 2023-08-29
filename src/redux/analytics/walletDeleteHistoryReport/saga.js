import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import WalletDeleteHistoryReportListActionTypes from './constant';
import { walletDeleteHistoryReportList } from './api';

// start Wallet Delete History ReportList
function* WalletDeleteHistoryReportList({ payload: { searchValue, pageNumber, showLimit, storeId, } }) {
    try {
        yield put({
            type: WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(walletDeleteHistoryReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
        });

        if (response.data.status) {
            yield put({
                type: WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Wallet Delete History ReportList


export function* getWalletDeleteHistoryReportList(): any {
    yield takeEvery(WalletDeleteHistoryReportListActionTypes.GET_WALLET_DELETE_HISTORY_REPORT_LIST, WalletDeleteHistoryReportList);
}

function* walletDeleteHistoryReportListSaga(): any {
    yield all([
        fork(getWalletDeleteHistoryReportList),
    ]);
}

export default walletDeleteHistoryReportListSaga;
