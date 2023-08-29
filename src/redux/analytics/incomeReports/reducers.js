import IncomeReportActionTypes from './constant';
const INCOME_REPORT_LIST_INITIAL_STATE = {
    incomeReportList: [],
    loading: false,
};

// start Monthly report List
const IncomeReportList = (state = INCOME_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case IncomeReportActionTypes.INCOME_REPORT_LIST_LOADING:
            return {
                incomeReportList: state.incomeReportList,
                loading: true,
            };
        case IncomeReportActionTypes.INCOME_REPORT_LIST_SUCCESS:
            return {
                incomeReportList: action?.payload,
                loading: false,
            };
        case IncomeReportActionTypes.INCOME_REPORT_LIST_RESET:
            return INCOME_REPORT_LIST_INITIAL_STATE;
        case IncomeReportActionTypes.INCOME_REPORT_LIST_ERROR:
            return {
                incomeReportList: action?.payload,
                loading: false,
            };
        case IncomeReportActionTypes.INCOME_REPORT_LIST_RESET:
            return INCOME_REPORT_LIST_INITIAL_STATE;
        default:
            return { ...state };
    }
};
// end Due Amount Report List

export { IncomeReportList };
