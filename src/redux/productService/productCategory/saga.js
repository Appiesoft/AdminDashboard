import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductCategoryActionTypes from '../productCategory/constant';
import { categoryListApi, categoryCreateApi, categoryUpdateApi, categoryDeleteApi } from "../productCategory/api"


// start category List 
function* categoryList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_LIST_LOADING,
            payload: {}
        });
        const response = yield call(categoryListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end category List 


// start category Create 
function* categoryCreate({ payload: { category_name, category_remark, status } }) {
    try {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(categoryCreateApi, { category_name: category_name, category_remark: category_remark, status: status });
        if (response.data.status) {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_CREATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end category Create

// start category Update
function* categoryUpdate({ payload: { category_id, category_name, category_remark, status } }) {
    try {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(categoryUpdateApi, { category_id: category_id, category_name: category_name, category_remark: category_remark, status: status });
        if (response.data.status) {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_UPDATE_RESET,
                payload: {},
            });


        } else {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end category Update


// start category delete
function* categoryDelete({ payload: { id } }) {
    try {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_DELETE_LOADING,
            payload: {}
        });
        const response = yield call(categoryDeleteApi, id);
        if (response.data.status) {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_DELETE_SUCESS,
                payload: { ...response.data }
            });
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductCategoryActionTypes.CATEGORY_DELETE_ERROR,
                payload: { ...response.data }
            });
        }
    } catch (error) {
        yield put({
            type: ProductCategoryActionTypes.CATEGORY_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end category delete


export function* getCategoryList(): any {
    yield takeEvery(ProductCategoryActionTypes.GET_CATEGORY_LIST, categoryList);
}
export function* createCategory(): any {
    yield takeEvery(ProductCategoryActionTypes.CREATE_CATEGORY, categoryCreate);
}
export function* updateCategory(): any {
    yield takeEvery(ProductCategoryActionTypes.UPDATE_CATEGORY, categoryUpdate);
}

export function* deleteCategory(): any {
    yield takeEvery(ProductCategoryActionTypes.DELETE_CATEGORY, categoryDelete);
}


function* productCategorySaga(): any {
    yield all([
        fork(getCategoryList),
        fork(createCategory),
        fork(updateCategory),
        fork(deleteCategory)

    ]);
}

export default productCategorySaga;