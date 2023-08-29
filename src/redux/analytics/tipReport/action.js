import TipReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start TIP report
export const TipReportList = (data): AuthAction => ({
    type: TipReportListActionTypes.GET_TIP_REPORT_LIST,
    payload: data
})

