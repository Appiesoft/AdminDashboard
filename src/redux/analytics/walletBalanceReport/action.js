import WalletBalanceReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Walllet balance report List
export const WalletBalanceReportList = (data): AuthAction => ({
    type: WalletBalanceReportListActionTypes.GET_WALLET_BALANCE_REPORT_LIST,
    payload: data
})

