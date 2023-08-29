import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { pickupRequestCreateApi, pickupRequestListApi } from './api';
import PickupRequestActionTypes from './constant';

// start list 
function* pickupRequestList({ payload: { pageNumber, showLimit, from, to } }) {
    try {
        yield put({
            type: PickupRequestActionTypes.PICKUP_REQUEST_LIST_LOADING,
            payload: {}
        });
        const response = yield call(pickupRequestListApi, { page_number: pageNumber, show_limit: showLimit, from: from, to: to });
        if (response.data.status) {
            yield put({
                type: PickupRequestActionTypes.PICKUP_REQUEST_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: PickupRequestActionTypes.PICKUP_REQUEST_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: PickupRequestActionTypes.PICKUP_REQUEST_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

// start create 
function* pickupRequestCreate({ payload: {
    customerId,
    pickupDate,
    pickupTime,
    qtyBag,
    driverId,
    storeId,
    recurringPickupId
} }) {
    try {
        yield put({
            type: PickupRequestActionTypes.PICKUP_REQUEST_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(pickupRequestCreateApi,
            { customer_id: customerId, pickup_date: pickupDate, pickup_time: pickupTime, qty: qtyBag, driver_id: driverId, store_id: storeId, recurring_pickup_id: recurringPickupId });
        if (response.data.status) {
            yield put({
                type: PickupRequestActionTypes.PICKUP_REQUEST_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PickupRequestActionTypes.PICKUP_REQUEST_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: PickupRequestActionTypes.PICKUP_REQUEST_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: PickupRequestActionTypes.PICKUP_REQUEST_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}


export function* getPickupRequestList(): any {
    yield takeEvery(PickupRequestActionTypes.GET_PICKUP_REQUEST_LIST, pickupRequestList);
}

export function* createPickupRequest(): any {
    yield takeEvery(PickupRequestActionTypes.CREATE_PICKUP_REQUEST, pickupRequestCreate);
}


function* pickupRequestSaga(): any {
    yield all([
        fork(getPickupRequestList),
        fork(createPickupRequest),
    ]);
}

export default pickupRequestSaga;