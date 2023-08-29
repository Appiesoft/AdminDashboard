import DiscountChargesReportActionTypes from './constant';
const DISCOUNT_CHARGES_REPORT_INITIAL_STATE = {
    discountChargeReport: [],
    loading: false,
};


// start Discount charge report
const DiscountChargeReportList = (state = DISCOUNT_CHARGES_REPORT_INITIAL_STATE, action) => {
    switch (action.type) {
        case DiscountChargesReportActionTypes.DISCOUNT_CHARGES_REPORT_LOADING:
            return {
                discountChargeReport: state.discountChargeReport,
                loading: true,
            };
        case DiscountChargesReportActionTypes.DISCOUNT_CHARGES_REPORT_SUCCESS:
            return {
                discountChargeReport: action?.payload,
                loading: false,
            };
        case DiscountChargesReportActionTypes.DISCOUNT_CHARGES_REPORT_ERROR:
            return {
                discountChargeReport: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end discount charge report


export { DiscountChargeReportList };
