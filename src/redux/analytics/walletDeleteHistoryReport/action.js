import WalletDeleteHistoryReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Walllet Delete History report List
export const WalletDeleteHistoryReportList = (data): AuthAction => ({
    type: WalletDeleteHistoryReportListActionTypes.GET_WALLET_DELETE_HISTORY_REPORT_LIST,
    payload: data
})

