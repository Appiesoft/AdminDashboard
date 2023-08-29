import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import WalletBalanceReportListActionTypes from './constant';
import { walletBalanceReportList } from './api';

// start Wallet balance  Report List
function* WalletBalanceReportList({ payload: { searchValue, pageNumber, showLimit, storeId, } }) {
    try {
        yield put({
            type: WalletBalanceReportListActionTypes.WALLET_BALANCE_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(walletBalanceReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
        });

        if (response.data.status) {
            yield put({
                type: WalletBalanceReportListActionTypes.WALLET_BALANCE_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: WalletBalanceReportListActionTypes.WALLET_BALANCE_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletBalanceReportListActionTypes.WALLET_BALANCE_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Wallet balance  Report List

export function* getWalletBalanceReportList(): any {
    yield takeEvery(WalletBalanceReportListActionTypes.GET_WALLET_BALANCE_REPORT_LIST, WalletBalanceReportList);
}

function* walletBalanceReportListSaga(): any {
    yield all([
        fork(getWalletBalanceReportList),
    ]);
}

export default walletBalanceReportListSaga;
