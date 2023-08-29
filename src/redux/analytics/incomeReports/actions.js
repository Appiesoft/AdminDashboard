import IncomeReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start income report List
export const IncomeReportList = (data): AuthAction => ({
    type: IncomeReportActionTypes.GET_INCOME_REPORT_LIST,
    payload: data
})

