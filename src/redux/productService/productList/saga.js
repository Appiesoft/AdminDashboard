import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductListActionTypes from './constant';
import { productListApi } from './api';

// start price List
function* productList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductListActionTypes.PRODUCT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(productListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
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
        }
    } catch (error) {
        yield put({
            type: ProductListActionTypes.PRODUCT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getproductList(): any {
    yield takeEvery(ProductListActionTypes.GET_PRODUCT_LIST, productList);
}

function* productsListSaga(): any {
    yield all([
        //fork price
        fork(getproductList),
    ]);
}

export default productsListSaga;
