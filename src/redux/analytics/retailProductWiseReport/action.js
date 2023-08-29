import RetailProductWiseReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start retail product wise Report List
export const RetailProductWiseReportListAction = (data): AuthAction => ({
    type: RetailProductWiseReportListActionTypes.GET_RETAIL_PRODUCT_WISE_REPORT_LIST,
    payload: data
})

