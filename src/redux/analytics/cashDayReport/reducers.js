import CashDayReportActionTypes from './constant';
const CASH_DAY_REPORT_INITIAL_STATE = {
    cashDayReport: [],
    loading: false,
};

// start cash day report
const CashDayReportList = (state = CASH_DAY_REPORT_INITIAL_STATE, action) => {
    switch (action.type) {
        case CashDayReportActionTypes.CASH_DAY_REPORT_LOADING:
            return {
                cashDayReport: state.cashDayReport,
                loading: true,
            };

        case CashDayReportActionTypes.CASH_DAY_REPORT_SUCCESS:
            return {
                cashDayReport: action?.payload,
                loading: false,
            };
        case CashDayReportActionTypes.CASH_DAY_REPORT_ERROR:
            return {
                cashDayReport: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end cash day report


export { CashDayReportList };
