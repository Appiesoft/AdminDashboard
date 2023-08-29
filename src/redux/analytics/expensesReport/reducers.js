import ExpensesReportActionTypes from './constant';
const EXPENSES_REPORT_LIST_INITIAL_STATE = {
    expensesReportList: [],
    loading: false,
};

// start expenses report List
const ExpensesReportList = (state = EXPENSES_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ExpensesReportActionTypes.EXPENSE_REPORT_LIST_LOADING:
            return {
                expensesReportList: state.expensesReportList,
                loading: true,
            };
        case ExpensesReportActionTypes.EXPENSE_REPORT_LIST_SUCCESS:
            return {
                expensesReportList: action?.payload,
                loading: false,
            };
        case ExpensesReportActionTypes.EXPENSE_REPORT_LIST_RESET:
            return EXPENSES_REPORT_LIST_INITIAL_STATE
        case ExpensesReportActionTypes.EXPENSE_REPORT_LIST_ERROR:
            return {
                expensesReportList: action?.payload,
                loading: false,
            };
        case ExpensesReportActionTypes.EXPENSE_REPORT_LIST_RESET:
            return EXPENSES_REPORT_LIST_INITIAL_STATE
        default:
            return { ...state };
    }
};
// end expenses Report List

export { ExpensesReportList };
