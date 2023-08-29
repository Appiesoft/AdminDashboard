import DatewiseReportActionTypes from './constant';
const DATEWISE_REPORT_INITIAL_STATE = {
    datewiseReport: [],
    loading: false,
};


// start datewise report
const DatewiseReportList = (state = DATEWISE_REPORT_INITIAL_STATE, action) => {
    switch (action.type) {
        case DatewiseReportActionTypes.DATEWISE_REPORT_LOADING:
            return {
                datewiseReport: state.datewiseReport,
                loading: true,
            };

        case DatewiseReportActionTypes.DATEWISE_REPORT_SUCCESS:
            return {
                datewiseReport: action?.payload,
                loading: false,
            };
        case DatewiseReportActionTypes.DATEWISE_REPORT_RESET:
            return DATEWISE_REPORT_INITIAL_STATE;
        case DatewiseReportActionTypes.DATEWISE_REPORT_ERROR:
            return {
                datewiseReport: action?.payload,
                loading: false,
            };
        case DatewiseReportActionTypes.DATEWISE_REPORT_RESET:
            return DATEWISE_REPORT_INITIAL_STATE
        default:
            return { ...state };
    }
};
// end datewise report


export { DatewiseReportList };
