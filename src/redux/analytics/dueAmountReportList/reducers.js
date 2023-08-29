import DueAmountReportActionTypes from './constant';
const DUE_AMOUNT_REPORT_LIST_INITIAL_STATE = {
    dueAmountReportList: [],
    loading: false,
};


// start Due Amount Report List
const DueAmountReportList = (state = DUE_AMOUNT_REPORT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DueAmountReportActionTypes.DUE_AMOUNT_REPORT_LIST_LOADING:
            return {
                dueAmountReportList: state.dueAmountReportList,
                loading: true,
            };

        case DueAmountReportActionTypes.DUE_AMOUNT_REPORT_LIST_SUCCESS:
            return {
                dueAmountReportList: action?.payload,
                loading: false,
            };
        case DueAmountReportActionTypes.DUE_AMOUNT_REPORT_LIST_ERROR:
            return {
                dueAmountReportList: state.dueAmountReportList,
                loading: false,
            };
        default:
            return { ...state };
    }
};
// end Due Amount Report List


export { DueAmountReportList };
