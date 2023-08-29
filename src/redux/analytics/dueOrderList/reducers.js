import DueOrderActionTypes from './constant';
const DUE_ORDER_LIST_INITIAL_STATE = {
    dueOrderList: [],
    loading: false,
};


// start Due Amount Report List
const DueOrderListReducer = (state = DUE_ORDER_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DueOrderActionTypes.DUE_ORDER_LIST_LOADING:
            return {
                dueOrderList: state.dueOrderList,
                loading: true,
            };

        case DueOrderActionTypes.DUE_ORDER_LIST_SUCCESS:
            return {
                dueOrderList: action?.payload,
                loading: false,
            };
        case DueOrderActionTypes.DUE_ORDER_LIST_RESET:
            return DUE_ORDER_LIST_INITIAL_STATE
        case DueOrderActionTypes.DUE_ORDER_LIST_ERROR:
            return {
                dueOrderList: action?.payload,
                loading: false,
            };
        case DueOrderActionTypes.DUE_ORDER_LIST_RESET:
            return DUE_ORDER_LIST_INITIAL_STATE
        default:
            return { ...state };
    }
};
// end Due Amount Report List


export { DueOrderListReducer };
