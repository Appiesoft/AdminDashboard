import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import DiscountChargesActionTypes from './constant';
import { discountChargesListApi, discountChargesCreateApi, discountChargesDeleteApi, discountChargesDetailApi, discountChargesUpdateApi } from './api';


// start discount charges List
function* discountChargesList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_LIST_LOADING,
            payload: {},
        });
        const response = yield call(discountChargesListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
        });
        if (response.data.status) {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end discount charges List

// // start discount charges Create
function* discountChargesCreate({
    payload: {
        applicationApply,
        customerId,
        discountChargeName,
        transactionType,
        inTransaction,
        transactionValue,
        defaults,
        description,
    },
}) {
    try {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(discountChargesCreateApi, {
            application_apply: applicationApply,
            customer_id: customerId,
            discount_charge_name: discountChargeName,
            transaction_type: transactionType,
            in_transaction: inTransaction,
            transaction_value: transactionValue,
            default: defaults,
            description: description

        });
        if (response.data.status) {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end discount charges Create

// // start discount charges detail
function* discountChargesDetail({
    payload: {
        discountChargesId
    },
}) {
    try {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_LOADING,
            payload: {},
        });
        const response = yield call(discountChargesDetailApi, {
            id: discountChargesId
        });
        if (response.data.status) {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DETAIL_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end discount charges detail

// // start discount charges update
function* discountChargesUpdate({
    payload: {
        discountChargeId,
        applicationApply,
        customerId,
        discountChargeName,
        transactionType,
        inTransaction,
        transactionValue,
        defaults,
        description
    },
}) {
    try {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(discountChargesUpdateApi, {
            discount_charge_id: discountChargeId,
            application_apply: applicationApply,
            customer_id: customerId,
            discount_charge_name: discountChargeName,
            transaction_type: transactionType,
            in_transaction: inTransaction,
            transaction_value: transactionValue,
            default: defaults,
            description: description
        });
        if (response.data.status) {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end discount charges update

// // start discount charges Delete
function* discountChargesDelete({
    payload: {
        discountId
    },
}) {
    try {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(discountChargesDeleteApi, {
            discountId: discountId

        });
        if (response.data.status) {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DiscountChargesActionTypes.DISCOUNT_CHARGES_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end discount charges Create


export function* getDiscountChargesList(): any {
    yield takeEvery(DiscountChargesActionTypes.GET_DISCOUNT_CHARGES_LIST, discountChargesList);
}

export function* createDiscountCharges(): any {
    yield takeEvery(DiscountChargesActionTypes.CREATE_DISCOUNT_CHARGES, discountChargesCreate);
}
export function* detailDiscountCharges(): any {
    yield takeEvery(DiscountChargesActionTypes.DETAIL_DISCOUNT_CHARGES, discountChargesDetail);
}
export function* updateDiscountCharges(): any {
    yield takeEvery(DiscountChargesActionTypes.UPDATE_DISCOUNT_CHARGES, discountChargesUpdate);
}

export function* deleteDiscountCharges(): any {
    yield takeEvery(DiscountChargesActionTypes.DELETE_DISCOUNT_CHARGES, discountChargesDelete);
}

function* discountChargesSaga(): any {
    yield all([
        fork(getDiscountChargesList),
        fork(detailDiscountCharges),
        fork(updateDiscountCharges),
        fork(createDiscountCharges),
        fork(deleteDiscountCharges),
    ]);
}

export default discountChargesSaga;
