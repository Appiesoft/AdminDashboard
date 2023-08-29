import DueAmountReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Due Amount Report List
export const dueAmountReportList = (data): AuthAction => ({
    type: DueAmountReportActionTypes.GET_DUE_AMOUNT_REPORT_LIST,
    payload: data
})

