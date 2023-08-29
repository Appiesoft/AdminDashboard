import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import DeliveryRequestActionTypes from './constant';
import { deliveryRequestCreateApi, deliveryRequestListApi } from './api';

function* deliveryRequestList({ payload: { pageNumber, showLimit, from, to } }) {
    try {
        yield put({
            type: DeliveryRequestActionTypes.DELIVERY_REQUEST_LIST_LOADING,
            payload: {}
        });
        const response = yield call(deliveryRequestListApi, {
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to
        });
        if (response.data.status) {
            yield put({
                type: DeliveryRequestActionTypes.DELIVERY_REQUEST_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: DeliveryRequestActionTypes.DELIVERY_REQUEST_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: DeliveryRequestActionTypes.DELIVERY_REQUEST_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
function* deliveryRequestCreate({
    payload: {
        orderId,
        deliveryDate,
        deliveryTime,
        qty,
        driverId,
        deliveryRequestId,
        storeId
    } }) {
    try {
        yield put({
            type: DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(deliveryRequestCreateApi, {
            order_id: orderId,
            delivery_date: deliveryDate,
            delivery_time: deliveryTime,
            qty: qty, driver_id: driverId,
            delivery_request_id: deliveryRequestId,
            store_id: storeId
        });
        if (response.data.status) {
            yield put({
                type: DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: DeliveryRequestActionTypes.DELIVERY_REQUEST_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}


export function* getDeliveryRequestList(): any {
    yield takeEvery(DeliveryRequestActionTypes.GET_DELIVERY_REQUEST_LIST, deliveryRequestList);
}
export function* createDeliveryRequest(): any {
    yield takeEvery(DeliveryRequestActionTypes.CREATE_DELIVERY_REQUEST, deliveryRequestCreate);
}


function* deliveryRequestSaga(): any {
    yield all([
        fork(getDeliveryRequestList),
        fork(createDeliveryRequest),
    ]);
}

export default deliveryRequestSaga;