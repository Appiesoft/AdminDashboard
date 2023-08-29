import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import OrderActionTypes from './constant';
import { orderListApi } from "./api"


// start Order List 
function* orderList({ payload: { storeId, searchValue, pageNumber, showLimit, orderDate } }) {

    try {
        yield put({
            type: OrderActionTypes.ORDER_LIST_LOADING,
            payload: {}
        });
        const response = yield call(orderListApi, { store_id: storeId, search_value: searchValue, page_number: pageNumber, show_limit: showLimit, order_date: orderDate });
        if (response.data.status) {
            yield put({
                type: OrderActionTypes.ORDER_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: OrderActionTypes.ORDER_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: OrderActionTypes.ORDER_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Order List 


export function* getOrderList(): any {
    yield takeEvery(OrderActionTypes.GET_ORDER_LIST, orderList);
}

function* orderListSaga(): any {
    yield all([
        fork(getOrderList),
    ]);
}

export default orderListSaga;