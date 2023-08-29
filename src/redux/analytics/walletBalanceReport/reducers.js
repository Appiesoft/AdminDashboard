import WalletBalanceReportListActionTypes from './constant';
const WALLET_BALANCE_REPORT_LIST_INITIAL_STATE = {
    walletBalanceReportList: [],
    loading: false,
};

// start product List
const WalletBalanceReportList = (state = WALLET_BALANCE_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case WalletBalanceReportListActionTypes.WALLET_BALANCE_REPORT_LIST_LOADING:
            return {
                walletBalanceReportList: state.walletBalanceReportList,
                loading: true,
            };
        case WalletBalanceReportListActionTypes.WALLET_BALANCE_REPORT_LIST_SUCCESS:
            return {
                walletBalanceReportList: action?.payload,
                loading: false,
            };
        case WalletBalanceReportListActionTypes.WALLET_BALANCE_REPORT_LIST_ERROR:
            return {
                walletBalanceReportList: state.walletBalanceReportList,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end product List

export { WalletBalanceReportList };
