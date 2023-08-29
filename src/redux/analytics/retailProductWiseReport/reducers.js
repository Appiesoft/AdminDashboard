import RetailProductWiseReportListActionTypes from './constant';
const RETAIL_PRODUCT_WISE_REPORT_LIST_INITIAL_STATE = {
    retailProductReportList: [],
    loading: false,
};

// start retail product wise report List
const RetailProductWiseReportList = (state = RETAIL_PRODUCT_WISE_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case RetailProductWiseReportListActionTypes.RETAIL_PRODUCT_WISE_REPORT_LIST_LOADING:
            return {
                retailProductReportList: state.retailProductReportList,
                loading: true,
            };
        case RetailProductWiseReportListActionTypes.RETAIL_PRODUCT_WISE_REPORT_LIST_SUCCESS:
            return {
                retailProductReportList: action?.payload,
                loading: false,
            };
        case RetailProductWiseReportListActionTypes.RETAIL_PRODUCT_WISE_REPORT_LIST_ERROR:
            return {
                retailProductReportList: action?.payload, loading: false,
            };
        default:
            return { ...state };
    }
};
// end retail product wise report List

export { RetailProductWiseReportList };
