import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductPatternsActionTypes from '../productPatterns/constant';
import { productPatternsListApi, productPatternsCreateApi, productPatternsUpdateApi, productPatternsDeleteApi } from "../productPatterns/api"


// start product patterns List 
function* productPatternsList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_LIST_LOADING,
            payload: {}
        });
        const response = yield call(productPatternsListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end product patterns List  

// start product patterns Create 
function* productPatternsCreate({ payload: { pattern_name, pattern_remark, image } }) {
    try {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(productPatternsCreateApi, { pattern_name: pattern_name, pattern_remark: pattern_remark, image: image });
        if (response.data.status) {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end product patterns Create

// start product patterns Update
function* productPatternsUpdate({ payload: { pattern_id, pattern_name, pattern_remark, image } }) {
    try {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(productPatternsUpdateApi, { pattern_id: pattern_id, pattern_name: pattern_name, pattern_remark: pattern_remark, image: image });
        if (response.data.status) {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end product patterns Update

// start patterns delete
function* productPatternsDelete({ payload: { id } }) {
    try {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_LOADING,
            payload: {}
        });
        const response = yield call(productPatternsDeleteApi, id);
        if (response.data.status) {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_SUCESS,
                payload: { ...response.data }
            });
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_ERROR,
                payload: { ...response.data }
            });
        }
    } catch (error) {
        yield put({
            type: ProductPatternsActionTypes.PRODUCT_PATTERNS_DELETE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end patterns delete

export function* getProductPatternsList(): any {
    yield takeEvery(ProductPatternsActionTypes.GET_PRODUCT_PATTERNS_LIST, productPatternsList);
}
export function* createProductPatterns(): any {
    yield takeEvery(ProductPatternsActionTypes.CREATE_PRODUCT_PATTERNS, productPatternsCreate);
}
export function* updateProductPatterns(): any {
    yield takeEvery(ProductPatternsActionTypes.UPDATE_PRODUCT_PATTERNS, productPatternsUpdate);
}

export function* deleteProductPatterns(): any {
    yield takeEvery(ProductPatternsActionTypes.DELETE_PRODUCT_PATTERNS, productPatternsDelete);
}



function* ProductPatternsSaga(): any {
    yield all([
        fork(getProductPatternsList),
        fork(createProductPatterns),
        fork(updateProductPatterns),
        fork(deleteProductPatterns)

    ]);
}

export default ProductPatternsSaga;