import TipReportListActionTypes from './constant';
const TIP_REPORT_LIST_INITIAL_STATE = {
    tipReportList: [],
    loading: false,
};

// start Tip Repor tList
const TipReportList = (state = TIP_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case TipReportListActionTypes.TIP_REPORT_LIST_LOADING:
            return {
                tipReportList: state.tipReportList,
                loading: true,
            };
        case TipReportListActionTypes.TIP_REPORT_LIST_SUCCESS:
            return {
                tipReportList: action?.payload,
                loading: false,
            };
        case TipReportListActionTypes.TIP_REPORT_LIST_ERROR:
            return {
                tipReportList: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Tip Report List

export { TipReportList };
