import DashboardActionTypes from "./constant";

type AuthAction = { type: string, payload: {} | string };

// start dashboard list
export const dashboardList = (): AuthAction => ({
    type: DashboardActionTypes.GET_DASHBOARD_LIST,
    payload: undefined,
});

// start today order list
export const todayOrderList = (data): AuthAction => ({
    type: DashboardActionTypes.GET_TODAY_ORDER_LIST,
    payload: data,
});

// start order status
export const orderStatus = (): AuthAction => ({
    type: DashboardActionTypes.GET_ORDER_STATUS,
    payload: undefined,
});
