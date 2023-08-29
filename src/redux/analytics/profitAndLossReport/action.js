import ProfitAndLossReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Profit and loss report
export const ProfitAndLossReportList = (data): AuthAction => ({
    type: ProfitAndLossReportListActionTypes.GET_PROFIT_AND_LOSS_REPORT_LIST,
    payload: data
})

