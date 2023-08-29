import CashDayReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start cash day Report
export const cashDayReportList = (data): AuthAction => ({
    type: CashDayReportActionTypes.GET_CASH_DAY_REPORT,
    payload: data
})

