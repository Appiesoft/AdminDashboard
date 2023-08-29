import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductBrandActionTypes from '../productBrand/constant';
import { brandListApi, brandCreateApi, brandUpdateApi, brandDeleteApi } from "../productBrand/api"


// start brand List 
function* brandList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductBrandActionTypes.BRAND_LIST_LOADING,
            payload: {}
        });
        const response = yield call(brandListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: ProductBrandActionTypes.BRAND_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductBrandActionTypes.BRAND_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductBrandActionTypes.BRAND_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Brand List 


// start Brand Create 
function* brandCreate({ payload: { brand_name, brand_remark, image } }) {
    try {
        yield put({
            type: ProductBrandActionTypes.BRAND_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(brandCreateApi, { brand_name: brand_name, brand_remark: brand_remark, image: image });
        if (response.data.status) {
            yield put({
                type: ProductBrandActionTypes.BRAND_CREATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductBrandActionTypes.BRAND_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductBrandActionTypes.BRAND_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductBrandActionTypes.BRAND_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end brand Create

// start brand Update
function* brandUpdate({ payload: { brand_id, brand_name, brand_remark, image } }) {
    try {
        yield put({
            type: ProductBrandActionTypes.BRAND_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(brandUpdateApi, { brand_id: brand_id, brand_name: brand_name, brand_remark: brand_remark, image: image });
        if (response.data.status) {
            yield put({
                type: ProductBrandActionTypes.BRAND_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductBrandActionTypes.BRAND_UPDATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductBrandActionTypes.BRAND_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductBrandActionTypes.BRAND_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end brand Update


// start brand delete
function* brandDelete({ payload: { id } }) {
    try {
        yield put({
            type: ProductBrandActionTypes.BRAND_DELETE_LOADING,
            payload: {}
        });
        const response = yield call(brandDeleteApi, id);
        if (response.data.status) {
            yield put({
                type: ProductBrandActionTypes.BRAND_DELETE_SUCESS,
                payload: { ...response.data }
            });
            yield put({
                type: ProductBrandActionTypes.BRAND_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductBrandActionTypes.BRAND_DELETE_ERROR,
                payload: { ...response.data }
            });
        }
    } catch (error) {
        yield put({
            type: ProductBrandActionTypes.BRAND_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end brand delete



export function* getBrandList(): any {
    yield takeEvery(ProductBrandActionTypes.GET_BRAND_LIST, brandList);
}
export function* createBrand(): any {
    yield takeEvery(ProductBrandActionTypes.CREATE_BRAND, brandCreate);
}
export function* updateBrand(): any {
    yield takeEvery(ProductBrandActionTypes.UPDATE_BRAND, brandUpdate);
}
export function* deleteBrand(): any {
    yield takeEvery(ProductBrandActionTypes.DELETE_BRAND, brandDelete);
}


function* productBrandSaga(): any {
    yield all([
        fork(getBrandList),
        fork(createBrand),
        fork(updateBrand),
        fork(deleteBrand)

    ]);
}

export default productBrandSaga;