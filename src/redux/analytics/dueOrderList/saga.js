import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import DueOrderActionTypes from './constant';
import { dueOrderList } from './api';


// start Due Amount Report List

function* DueOrderList({ payload: { searchValue, pageNumber, showLimit, from, to, storeId, deliveredOrder } }) {
    try {
        yield put({
            type: DueOrderActionTypes.DUE_ORDER_LIST_LOADING,
            payload: {},
        });
        const response = yield call(dueOrderList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,
            delivered_order: deliveredOrder

        });
        if (response.data.status) {
            yield put({
                type: DueOrderActionTypes.DUE_ORDER_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DueOrderActionTypes.DUE_ORDER_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DueOrderActionTypes.DUE_ORDER_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Due Amount Report List


export function* getDueOrderList(): any {
    yield takeEvery(DueOrderActionTypes.GET_DUE_ORDER_LIST, DueOrderList);
}

function* dueOrderListSaga(): any {
    yield all([
        fork(getDueOrderList),
    ]);
}

export default dueOrderListSaga;
