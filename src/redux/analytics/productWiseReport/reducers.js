import ProductWiseReportListActionTypes from './constant';
const PRODUCT_WISE_REPORT_LIST_INITIAL_STATE = {
    productWiseReportList: [],
    loading: false,
};

// start product List
const ProductWiseReportList = (state = PRODUCT_WISE_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_LOADING:
            return {
                productWiseReportList: state.productWiseReportList,
                loading: true,
            };
        case ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_SUCCESS:
            return {
                productWiseReportList: action?.payload,
                loading: false,
            };
        case ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_RESET:
            return PRODUCT_WISE_REPORT_LIST_INITIAL_STATE
        case ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_ERROR:
            return {
                productWiseReportList: action?.payload,
                loading: false,
            };
        case ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_RESET:
            return PRODUCT_WISE_REPORT_LIST_INITIAL_STATE
        default:
            return { ...state };
    }
};
// end product List

export { ProductWiseReportList };
