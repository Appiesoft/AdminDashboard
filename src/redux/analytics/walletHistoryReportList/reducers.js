import WalletHistoryReportActionTypes from './constant';
const WALLET_HISTORY_REPORT_LIST_INITIAL_STATE = {
    walletHistoryReportList: [],
    loading: false,
};

// start wallet history report List
const WalletHistoryReportList = (state = WALLET_HISTORY_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletHistoryReportActionTypes.WALLET_HISTORY_REPORT_LIST_LOADING:
            return {
                walletHistoryReportList: state.walletHistoryReportList,
                loading: true,
            };
        case WalletHistoryReportActionTypes.WALLET_HISTORY_REPORT_LIST_SUCCESS:
            return {
                walletHistoryReportList: action?.payload,
                loading: false,
            };
        case WalletHistoryReportActionTypes.WALLET_HISTORY_REPORT_LIST_ERROR:
            return {
                walletHistoryReportList: action?.payload, loading: false,
            };
        default:
            return { ...state };
    }
};
// end wallet history Report List

export { WalletHistoryReportList };
