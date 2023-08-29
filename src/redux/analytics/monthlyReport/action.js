import MonthlyReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Monthly report List
export const MonthlyReportList = (data): AuthAction => ({
    type: MonthlyReportActionTypes.GET_MONTHLY_REPORT_LIST,
    payload: data
})

