import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductListActionTypes from './constant';
import { productList } from './api';

// start Product List
function* ProductList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to } }) {
    try {
        yield put({
            type: ProductListActionTypes.PRODUCT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(productList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
            from: from,
            to: to

        });
        if (response.data.status) {
            yield put({
                type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductListActionTypes.PRODUCT_LIST_ERROR,
                payload: { ...response.data },
            });
            yield put({
                type: ProductListActionTypes.PRODUCT_LIST_RESET,
                payload: {},
            });

        }
    } catch (error) {
        yield put({
            type: ProductListActionTypes.PRODUCT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end monthly report List


export function* getProductList(): any {
    yield takeEvery(ProductListActionTypes.GET_PRODUCT_LIST, ProductList);
}

function* productListSaga(): any {
    yield all([
        fork(getProductList),
    ]);
}

export default productListSaga;
