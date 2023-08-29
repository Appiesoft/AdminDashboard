import ExpensesReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start expenses report List
export const ExpensesReportList = (data): AuthAction => ({
    type: ExpensesReportActionTypes.GET_EXPENSE_REPORT_LIST,
    payload: data
})

