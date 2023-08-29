import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductUpchargesActionTypes from '../productUpcharges/constant';
import { upchargesListApi, upchargesCreateApi, upchargesUpdateApi, upchargesDeleteApi } from "../productUpcharges/api"


// start upcharges List 
function* upchargesList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_LIST_LOADING,
            payload: {}
        });
        const response = yield call(upchargesListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end upcharges List 


// start upcharges Create 
function* upchargesCreate({ payload: { name, unit, price } }) {
    try {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(upchargesCreateApi, { name: name, unit: unit, price: price });
        if (response.data.status) {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end upcharges Create

// start upcharges Update
function* upchargesUpdate({ payload: { upcharge_id, name, unit, price } }) {
    try {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(upchargesUpdateApi, { upcharge_id: upcharge_id, name: name, unit: unit, price: price });
        if (response.data.status) {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_UPDATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end upcharges Update


// start upcharges delete
function* upchargesDelete({ payload: { id } }) {
    try {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_DELETE_LOADING,
            payload: {}
        });
        const response = yield call(upchargesDeleteApi, id);
        if (response.data.status) {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_DELETE_SUCESS,
                payload: { ...response.data }
            });
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductUpchargesActionTypes.UPCHARGES_DELETE_ERROR,
                payload: { ...response.data }
            });
        }
    } catch (error) {
        yield put({
            type: ProductUpchargesActionTypes.UPCHARGES_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end upcharges delete

export function* getUpchargesList(): any {
    yield takeEvery(ProductUpchargesActionTypes.GET_UPCHARGES_LIST, upchargesList);
}
export function* createUpcharges(): any {
    yield takeEvery(ProductUpchargesActionTypes.CREATE_UPCHARGES, upchargesCreate);
}
export function* updateUpcharges(): any {
    yield takeEvery(ProductUpchargesActionTypes.UPDATE_UPCHARGES, upchargesUpdate);
}

export function* deleteUpcharges(): any {
    yield takeEvery(ProductUpchargesActionTypes.DELETE_UPCHARGES, upchargesDelete);
}


function* productUpchargesSaga(): any {
    yield all([
        fork(getUpchargesList),
        fork(createUpcharges),
        fork(updateUpcharges),
        fork(deleteUpcharges),

    ]);
}

export default productUpchargesSaga;