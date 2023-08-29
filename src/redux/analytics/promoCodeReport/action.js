import PromoCodeReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Promo Code Report List
export const PromoCodeReportListAction = (data): AuthAction => ({
    type: PromoCodeReportListActionTypes.GET_PROMO_CODE_REPORT_LIST,
    payload: data
})

