import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { promoCouponCreateApi, promoCouponDeleteApi, promoCouponDetailApi, promoCouponListApi, promoCouponUpdateApi } from './api';
import PromoCouponActionTypes from './constant';


// start promo coupon List
function* promoCouponList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_LIST_LOADING,
            payload: {},
        });
        const response = yield call(promoCouponListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
        });
        if (response.data.status) {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end promo coupon List

// start promo coupon create
function* promoCouponCreate({ payload: {
    applicationApply,
    customerId,
    promoCouponName,
    transactionType,
    usageWithOtherCoupon,
    typeOfPromoCoupon,
    minOrderValue,
    maxValueOfDescount,
    maxTimeUses,
    couponValue,
    expiryDate,
    defaults,
    description,
    image
} }) {
    try {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(promoCouponCreateApi,
            {
                application_apply: applicationApply,
                customer_id: customerId,
                promo_coupon_name: promoCouponName,
                transaction_type: transactionType,
                usage_with_other_coupon: usageWithOtherCoupon,
                type_of_promo_coupon: typeOfPromoCoupon,
                min_order_value: minOrderValue,
                max_value_of_descount: maxValueOfDescount,
                max_time_uses: maxTimeUses,
                coupon_value: couponValue,
                expiry_date: expiryDate,
                default: defaults,
                description: description,
                image: image
            }
        );
        if (response.data.status) {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end promo coupon create

// start promo coupon detail
function* promoCouponDetail({ payload: {
    promoCouponId
} }) {
    try {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_DETAIL_LOADING,
            payload: {},
        });
        const response = yield call(promoCouponDetailApi,
            {
                id: promoCouponId
            }
        );
        if (response.data.status) {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_DETAIL_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_DETAIL_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_DETAIL_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_DETAIL_ERROR,
            payload: { message: error.message },
        });
    }
}
// end promo coupon detail

// start promo coupon update
function* promoCouponUpadte({ payload: {
    promoCouponId,
    applicationApply,
    customerId,
    promoCouponName,
    transactionType,
    usageWithOtherCoupon,
    typeOfPromoCoupon,
    minOrderValue,
    maxValueOfDiscount,
    maxTimeUses,
    couponValue,
    expiryDate,
    defaults,
    description,
    image
} }) {
    try {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(promoCouponUpdateApi,
            {
                promo_coupon_id: promoCouponId,
                application_apply: applicationApply,
                customer_id: customerId,
                promo_coupon_name: promoCouponName,
                transaction_type: transactionType,
                usage_with_other_coupon: usageWithOtherCoupon,
                type_of_promo_coupon: typeOfPromoCoupon,
                min_order_value: minOrderValue,
                max_value_of_discount: maxValueOfDiscount,
                max_time_uses: maxTimeUses,
                coupon_value: couponValue,
                expiry_date: expiryDate,
                default: defaults,
                description: description,
                image: image
            }
        );
        if (response.data.status) {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end promo coupon update

// start promo coupon delete
function* promoCouponDelete({ payload: { promoCouponId } }) {
    try {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(promoCouponDeleteApi, {
            promoCouponId: promoCouponId
        });
        if (response.data.status) {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_DELETE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: PromoCouponActionTypes.PROMO_COUPON_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PromoCouponActionTypes.PROMO_COUPON_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end promo coupon delete


export function* getPromoCouponList(): any {
    yield takeEvery(PromoCouponActionTypes.GET_PROMO_COUPON_LIST, promoCouponList);
}

export function* createPromoCoupon(): any {
    yield takeEvery(PromoCouponActionTypes.CREATE_PROMO_COUPON, promoCouponCreate);
}

export function* detailPromoCoupon(): any {
    yield takeEvery(PromoCouponActionTypes.DETAIL_PROMO_COUPON, promoCouponDetail);
}

export function* updatePromoCoupon(): any {
    yield takeEvery(PromoCouponActionTypes.UPDATE_PROMO_COUPON, promoCouponUpadte);
}

export function* deletePromoCoupon(): any {
    yield takeEvery(PromoCouponActionTypes.DELETE_PROMO_COUPON, promoCouponDelete);
}

function* promoCouponSaga(): any {
    yield all([
        fork(getPromoCouponList),
        fork(createPromoCoupon),
        fork(detailPromoCoupon),
        fork(updatePromoCoupon),
        fork(deletePromoCoupon),
    ]);
}

export default promoCouponSaga;
