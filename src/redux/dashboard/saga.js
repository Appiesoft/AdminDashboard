import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { dashboardApi, orderStatusApi, todayOrderListApi } from './api';
import DashboardActionTypes from './constant';

// start dashboard list 
function* dashboardList() {
    try {
        yield put({
            type: DashboardActionTypes.DASHBOARD_LIST_LOADING,
            payload: {},
        });
        const response = yield call(dashboardApi, {});
        if (response.data.status) {
            yield put({
                type: DashboardActionTypes.DASHBOARD_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.DASHBOARD_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.DASHBOARD_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

// start today order list 
function* todayOrderList({ payload: {
    search,
    pageNumber,
    showLimit,
    orderStatus
} }) {
    try {
        yield put({
            type: DashboardActionTypes.TODAY_ORDER_LIST_LOADING,
            payload: {},
        });
        const response = yield call(todayOrderListApi, {
            search: search,
            page_number: pageNumber,
            show_limit: showLimit,
            order_status: orderStatus,
        });
        if (response.data.status) {
            yield put({
                type: DashboardActionTypes.TODAY_ORDER_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.TODAY_ORDER_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.TODAY_ORDER_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

// start order status
function* orderStatus() {
    try {
        yield put({
            type: DashboardActionTypes.ORDER_STATUS_LOADING,
            payload: {},
        });
        const response = yield call(orderStatusApi, {});
        if (response.data.status) {
            yield put({
                type: DashboardActionTypes.ORDER_STATUS_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.ORDER_STATUS_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.ORDER_STATUS_ERROR,
            payload: { message: error.message },
        });
    }
}


export function* getDashbaordList(): any {
    yield takeEvery(DashboardActionTypes.GET_DASHBOARD_LIST, dashboardList);
}

export function* getTodayOrderList(): any {
    yield takeEvery(DashboardActionTypes.GET_TODAY_ORDER_LIST, todayOrderList);
}

export function* getOrderStatus(): any {
    yield takeEvery(DashboardActionTypes.GET_ORDER_STATUS, orderStatus);
}

function* dashbaordSaga(): any {
    yield all([
        fork(getDashbaordList),
        fork(getTodayOrderList),
        fork(getOrderStatus),
    ]);
}

export default dashbaordSaga;
