import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductColorActionTypes from '../productColor/constant';
import { colorListApi, colorCreateApi, colorUpdateApi, colorDeleteApi } from "../productColor/api"


// start color List 
function* colorList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductColorActionTypes.COLOR_LIST_LOADING,
            payload: {}
        });
        const response = yield call(colorListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: ProductColorActionTypes.COLOR_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductColorActionTypes.COLOR_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductColorActionTypes.COLOR_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end color List 


// start color Create 
function* colorCreate({ payload: { color_name, color_remark, color_code, image } }) {
    try {
        yield put({
            type: ProductColorActionTypes.COLOR_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(colorCreateApi, { color_name: color_name, color_remark: color_remark, image: image, color_code: color_code });
        if (response.data.status) {
            yield put({
                type: ProductColorActionTypes.COLOR_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: ProductColorActionTypes.COLOR_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductColorActionTypes.COLOR_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductColorActionTypes.COLOR_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end color Create

// start color Update
function* colorUpdate({ payload: { color_id, color_name, color_remark, color_code, image } }) {
    try {
        yield put({
            type: ProductColorActionTypes.COLOR_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(colorUpdateApi, { color_id: color_id, color_remark: color_remark, color_name: color_name, color_code: color_code, image: image });
        if (response.data.status) {
            yield put({
                type: ProductColorActionTypes.COLOR_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductColorActionTypes.COLOR_UPDATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductColorActionTypes.COLOR_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductColorActionTypes.COLOR_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end color Update


// start color delete
function* colorDelete({ payload: { id } }) {
    try {
        yield put({
            type: ProductColorActionTypes.COLOR_DELETE_LOADING,
            payload: {}
        });
        const response = yield call(colorDeleteApi, id);
        if (response.data.status) {
            yield put({
                type: ProductColorActionTypes.COLOR_DELETE_SUCESS,
                payload: { ...response.data }
            });
            yield put({
                type: ProductColorActionTypes.COLOR_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductColorActionTypes.COLOR_DELETE_ERROR,
                payload: { ...response.data }
            });
        }
    } catch (error) {
        yield put({
            type: ProductColorActionTypes.COLOR_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end color delete

export function* getColorList(): any {
    yield takeEvery(ProductColorActionTypes.GET_COLOR_LIST, colorList);
}
export function* createColor(): any {
    yield takeEvery(ProductColorActionTypes.CREATE_COLOR, colorCreate);
}
export function* updateColor(): any {
    yield takeEvery(ProductColorActionTypes.UPDATE_COLOR, colorUpdate);
}

export function* deleteColor(): any {
    yield takeEvery(ProductColorActionTypes.DELETE_PRODUCT_COLOR, colorDelete);
}

function* productColorSaga(): any {
    yield all([
        fork(getColorList),
        fork(createColor),
        fork(updateColor),
        fork(deleteColor)

    ]);
}

export default productColorSaga;