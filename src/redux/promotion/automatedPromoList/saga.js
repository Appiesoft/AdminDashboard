import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { automatedPromoCreateApi, automatedPromoDeleteApi, automatedPromoDetailApi, automatedPromoListApi, automatedPromoUpdateApi } from './api';
import AutomatedPromoActionTypes from './constant';

// start automated promo List
function* automatedPromoList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_LIST_LOADING,
            payload: {},
        });
        const response = yield call(automatedPromoListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
        });
        if (response.data.status) {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_LIST_SUCCESS
                ,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end automated promo List

// start automated promo create
function* automatedPromoCreate({ payload:
    {
        promoName,
        promoType,
        walletAmount,
        applicableOn,
        couponId,
        segmentId
    } }) {
    try {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(automatedPromoCreateApi
            , {
                promo_name: promoName,
                promo_type: promoType,
                wallet_amount: walletAmount,
                applicable_on: applicableOn,
                coupon_id: couponId,
                segment_id: segmentId
            });
        if (response.data.status) {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end automated promo craete

// start automated promo detail
function* automatedPromoDetail({ payload:
    {
        automatedId
    } }) {
    try {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_LOADING,
            payload: {},
        });
        const response = yield call(automatedPromoDetailApi
            , {
                id: automatedId
            });
        if (response.data.status) {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DETAIL_ERROR,
            payload: { message: error.message },
        });
    }
}
// end automated promo detail

// start automated promo update
function* automatedPromoUpdate({ payload:
    {
        promoId,
        promoName,
        promoType,
        walletAmount,
        applicableOn,
        couponId,
        segmentId,
    } }) {
    try {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(automatedPromoUpdateApi
            , {
                promo_id: promoId,
                promo_name: promoName,
                promo_type: promoType,
                wallet_amount: walletAmount,
                applicable_on: applicableOn,
                coupon_id: couponId,
                segment_id: segmentId
            });
        if (response.data.status) {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end automated promo update

// start automated promo Delete
function* automatedPromoDelete({ payload: { automatedPromoId } }) {
    try {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(automatedPromoDeleteApi, {
            automatedPromoId: automatedPromoId
        });
        if (response.data.status) {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AutomatedPromoActionTypes.AUTOMATED_PROMO_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end automated promo Delete


export function* getAutomatedPromoList(): any {
    yield takeEvery(AutomatedPromoActionTypes.GET_AUTOMATED_PROMO_LIST, automatedPromoList);
}

export function* createAutomatedPromo(): any {
    yield takeEvery(AutomatedPromoActionTypes.CREATE_AUTOMATED_PROMO, automatedPromoCreate);
}
export function* detailAutomatedPromo(): any {
    yield takeEvery(AutomatedPromoActionTypes.DETAIL_AUTOMATED_PROMO, automatedPromoDetail);
}
export function* updateAutomatedPromo(): any {
    yield takeEvery(AutomatedPromoActionTypes.UPDATE_AUTOMATED_PROMO, automatedPromoUpdate);
}

export function* deleteAutomatedPromo(): any {
    yield takeEvery(AutomatedPromoActionTypes.DELETE_AUTOMATED_PROMO, automatedPromoDelete);
}

function* automatedPromoSaga(): any {
    yield all([
        fork(getAutomatedPromoList),
        fork(createAutomatedPromo),
        fork(detailAutomatedPromo),
        fork(updateAutomatedPromo),
        fork(deleteAutomatedPromo),
    ]);
}

export default automatedPromoSaga;
