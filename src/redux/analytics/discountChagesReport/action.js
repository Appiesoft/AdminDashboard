import DiscountChargesReportActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start discount charges Report
export const discountChargesReportList = (data): AuthAction => ({
    type: DiscountChargesReportActionTypes.GET_DISCOUNT_CHARGES_REPORT,
    payload: data
})

