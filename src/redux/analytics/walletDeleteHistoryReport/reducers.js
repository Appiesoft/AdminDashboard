import WalletDeleteHistoryReportListActionTypes from './constant';
const WALLET_DELETE_HISTORY_REPORT_LIST_INITIAL_STATE = {
    walletDeleteHistoryReportList: [],
    loading: false,
};

// start product List
const WalletDeleteHistoryReportList = (state = WALLET_DELETE_HISTORY_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_LOADING:
            return {
                walletDeleteHistoryReportList: state.walletDeleteHistoryReportList,
                loading: true,
            };
        case WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_SUCCESS:
            return {
                walletDeleteHistoryReportList: action?.payload,
                loading: false,
            };
        case WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_RESET:
            return WALLET_DELETE_HISTORY_REPORT_LIST_INITIAL_STATE
        case WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_ERROR:
            return {
                walletDeleteHistoryReportList: action?.payload,
                loading: false,
            };
        case WalletDeleteHistoryReportListActionTypes.WALLET_DELETE_HISTORY_REPORT_LIST_RESET:
            return WALLET_DELETE_HISTORY_REPORT_LIST_INITIAL_STATE
        default:
            return { ...state };
    }
};
// end product List

export { WalletDeleteHistoryReportList };
