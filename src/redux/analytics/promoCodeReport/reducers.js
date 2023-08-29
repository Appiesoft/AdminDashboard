import PromoCodeReportListActionTypes from './constant';
const PROMO_CODE_REPORT_LIST_INITIAL_STATE = {
    promoCodeReportList: [],
    loading: false,
};

// start product List
const PromoCodeReportList = (state = PROMO_CODE_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case PromoCodeReportListActionTypes.PROMO_CODE_REPORT_LIST_LOADING:
            return {
                promoCodeReportList: state.promoCodeReportList,
                loading: true,
            };
        case PromoCodeReportListActionTypes.PROMO_CODE_REPORT_LIST_SUCCESS:
            return {
                promoCodeReportList: action?.payload,
                loading: false,
            };
        case PromoCodeReportListActionTypes.PROMO_CODE_REPORT_LIST_ERROR:
            return {
                promoCodeReportList: state.promoCodeReportList,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end product List

export { PromoCodeReportList };
