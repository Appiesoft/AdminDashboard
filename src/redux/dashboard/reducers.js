import DashboardActionTypes from "./constant";

const DASHBOARD_LIST_INITIAL_STATE = {
    dashboardList: {},
    loading: false,
};

const TODAY_ORDER_LIST_INITIAL_STATE = {
    todayOrderList: [],
    loading: false,
};
const ORDER_STATUS_INITIAL_STATE = {
    orderStatus: [],
    loading: false,
};
// start dashboard list 
const DashboardList = (state = DASHBOARD_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.DASHBOARD_LIST_LOADING:
            return {
                dashboardList: state.dashboardList,
                loading: true,
            };

        case DashboardActionTypes.DASHBOARD_LIST_SUCCESS:
            return {
                dashboardList: action?.payload,
                loading: false,
            };
        case DashboardActionTypes.DASHBOARD_LIST_ERROR:
            return {
                dashboardList: state.dashboardList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};

// start today order list 
const TodayOrderList = (state = TODAY_ORDER_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.TODAY_ORDER_LIST_LOADING:
            return {
                todayOrderList: state.todayOrderList,
                loading: true,
            };

        case DashboardActionTypes.TODAY_ORDER_LIST_SUCCESS:
            return {
                todayOrderList: action?.payload,
                loading: false,
            };
        case DashboardActionTypes.TODAY_ORDER_LIST_ERROR:
            return {
                todayOrderList: state.todayOrderList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};

// start order status 
const OrderStatus = (state = ORDER_STATUS_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.ORDER_STATUS_LOADING:
            return {
                orderStatus: state.orderStatus,
                loading: true,
            };

        case DashboardActionTypes.ORDER_STATUS_SUCCESS:
            return {
                orderStatus: action?.payload,
                loading: false,
            };
        case DashboardActionTypes.ORDER_STATUS_ERROR:
            return {
                orderStatus: state.orderStatus,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};

export { DashboardList, TodayOrderList, OrderStatus };
