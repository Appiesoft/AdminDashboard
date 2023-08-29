import TaxCollectionReportListActionTypes from './constant';
const TAX_COLLECTION_REPORT_LIST_INITIAL_STATE = {
    taxCollectionReportList: [],
    loading: false,
};

// start Tax Collection Repor tList
const TaxCollectionReportList = (state = TAX_COLLECTION_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case TaxCollectionReportListActionTypes.TAX_COLLECTION_REPORT_LIST_LOADING:
            return {
                taxCollectionReportList: state.taxCollectionReportList,
                loading: true,
            };
        case TaxCollectionReportListActionTypes.TAX_COLLECTION_REPORT_LIST_SUCCESS:
            return {
                taxCollectionReportList: action?.payload,
                loading: false,
            };
        case TaxCollectionReportListActionTypes.TAX_COLLECTION_REPORT_LIST_ERROR:
            return {
                taxCollectionReportList: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Tax Collection Report List

export { TaxCollectionReportList };
