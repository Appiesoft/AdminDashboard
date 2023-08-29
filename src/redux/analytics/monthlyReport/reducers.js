import MonthlyReportActionTypes from './constant';
const MONTHLY_REPORT_LIST_INITIAL_STATE = {
    monthlyReportList: [],
    loading: false,
};

// start Monthly report List
const MonthlyReportList = (state = MONTHLY_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case MonthlyReportActionTypes.MONTHLY_REPORT_LIST_LOADING:
            return {
                monthlyReportList: state.monthlyReportList,
                loading: true,
            };
        case MonthlyReportActionTypes.MONTHLY_REPORT_LIST_SUCCESS:
            return {
                monthlyReportList: action?.payload,
                loading: false,
            };
        case MonthlyReportActionTypes.MONTHLY_REPORT_LIST_ERROR:
            return {
                monthlyReportList: state.monthlyReportList,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Due Amount Report List

export { MonthlyReportList };
