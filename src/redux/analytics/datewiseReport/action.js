import DatewiseReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Datewise Report
export const datewiseReportList = (data): AuthAction => ({
    type: DatewiseReportActionTypes.GET_DATEWISE_REPORT,
    payload: data
})

