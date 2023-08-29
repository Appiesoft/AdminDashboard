import WalletHistoryReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Wallet history report List
export const WalletHistoryReportList = (data): AuthAction => ({
    type: WalletHistoryReportActionTypes.GET_WALLET_HISTORY_REPORT_LIST,
    payload: data
})

