import ProductWiseReportListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start Product wise report List
export const ProductWiseReportList = (data): AuthAction => ({
    type: ProductWiseReportListActionTypes.GET_PRODUCT_WISE_REPORT_LIST,
    payload: data
})

