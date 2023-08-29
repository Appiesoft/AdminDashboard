import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { walletPromoCreateApi, walletPromoDeleteApi, walletPromoDetailApi, walletPromoListApi, walletPromoUpdateApi } from './api';
import WalletPromoActionTypes from './constant';

// start wallet promo List
function* walletPromoList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_LIST_LOADING,
            payload: {},
        });
        const response = yield call(walletPromoListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
        });
        if (response.data.status) {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end wallet promo List

// start wallet promo create
function* walletPromoCreate({ payload:
    {
        offerName,
        offerSubtitle,
        discountPercent,
        rechargeAmount,
        payAmount,
        status,
        priority
    } }) {
    try {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(walletPromoCreateApi, {
            offer_name: offerName,
            offer_subtitle: offerSubtitle,
            discount_percent: discountPercent,
            recharge_amount: rechargeAmount,
            pay_amount: payAmount,
            status: status,
            priority: priority
        });
        if (response.data.status) {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end wallet promo create

// start wallet promo detail
function* walletPromoDetail({ payload:
    {
        walletPromoId
    } }) {
    try {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_DETAIL_LOADING,
            payload: {},
        });
        const response = yield call(walletPromoDetailApi, {
            id: walletPromoId
        });
        if (response.data.status) {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_DETAIL_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_DETAIL_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_DETAIL_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_DETAIL_ERROR,
            payload: { message: error.message },
        });
    }
}
// end wallet promo detail

// start wallet promo update
function* walletPromoUpdate({ payload:
    {
        id,
        offerName,
        offerSubtitle,
        discountPercent,
        rechargeAmount,
        payAmount,
        status,
        priority
    } }) {
    try {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(walletPromoUpdateApi, {
            id: id,
            offer_name: offerName,
            offer_subtitle: offerSubtitle,
            discount_percent: discountPercent,
            recharge_amount: rechargeAmount,
            pay_amount: payAmount,
            status: status,
            priority: priority
        });
        if (response.data.status) {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end wallet promo update

// start wallet promo Delete
function* walletPromoDelete({ payload: { walletPromoId } }) {
    try {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(walletPromoDeleteApi, {
            walletPromoId: walletPromoId
        });
        if (response.data.status) {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_DELETE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: WalletPromoActionTypes.WALLET_PROMO_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: WalletPromoActionTypes.WALLET_PROMO_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end wallet promo Delete


export function* getWalletPromoList(): any {
    yield takeEvery(WalletPromoActionTypes.GET_WALLET_PROMO_LIST, walletPromoList);
}

export function* createWalletPromo(): any {
    yield takeEvery(WalletPromoActionTypes.CREATE_WALLET_PROMO, walletPromoCreate);
}
export function* detailWalletPromo(): any {
    yield takeEvery(WalletPromoActionTypes.DETAIL_WALLET_PROMO, walletPromoDetail);
}
export function* updateWalletPromo(): any {
    yield takeEvery(WalletPromoActionTypes.UPDATE_WALLET_PROMO, walletPromoUpdate);
}

export function* deleteWalletPromo(): any {
    yield takeEvery(WalletPromoActionTypes.DELETE_WALLET_PROMO, walletPromoDelete);
}

function* walletPromoSaga(): any {
    yield all([
        fork(getWalletPromoList),
        fork(createWalletPromo),
        fork(detailWalletPromo),
        fork(updateWalletPromo),
        fork(deleteWalletPromo),
    ]);
}

export default walletPromoSaga;
