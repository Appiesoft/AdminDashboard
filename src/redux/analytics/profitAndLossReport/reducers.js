import ProfitAndLossReportListActionTypes from './constant';
const PROFIT_AND_LOSS_REPORT_LIST_INITIAL_STATE = {
    profitAndLossReportList: [],
    loading: false,
};

// start Profit and loss Repor tList
const ProfitAndLossReportList = (state = PROFIT_AND_LOSS_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProfitAndLossReportListActionTypes.PROFIT_AND_LOSS_REPORT_LIST_LOADING:
            return {
                profitAndLossReportList: state.profitAndLossReportList,
                loading: true,
            };
        case ProfitAndLossReportListActionTypes.PROFIT_AND_LOSS_REPORT_LIST_SUCCESS:
            return {
                profitAndLossReportList: action?.payload,
                loading: false,
            };
        case ProfitAndLossReportListActionTypes.PROFIT_AND_LOSS_REPORT_LIST_ERROR:
            return {
                profitAndLossReportList: action?.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Tax Collection Report List

export { ProfitAndLossReportList };
