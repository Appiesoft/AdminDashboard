import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductDefectsActionTypes from '../productDefects/constant';
import { defectUpdateApi, defectListApi, defectCreateApi, defectDeleteApi } from "./api"

// start Defect List 
function* defectList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductDefectsActionTypes.DEFECT_LIST_LOADING,
            payload: {}
        });
        const response = yield call(defectListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductDefectsActionTypes.DEFECT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
//end defect list

//start defect create 
function* defectCreate({ payload: { defect_name, defect_remark } }) {
    try {
        yield put({
            type: ProductDefectsActionTypes.DEFECT_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(defectCreateApi, { defect_name: defect_name, defect_remark: defect_remark });
        if (response.data.status) {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_CREATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductDefectsActionTypes.DEFECT_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductDefectsActionTypes.EMPLOYEE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
//end defect create 


// start defect update
function* defectUpdate({ payload: { defect_id, defect_name, defect_remark } }) {
    try {
        yield put({
            type: ProductDefectsActionTypes.DEFECT_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(defectUpdateApi, { defect_id: defect_id, defect_name: defect_name, defect_remark: defect_remark });
        if (response.data.status) {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductDefectsActionTypes.DEFECT_UPDATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductDefectsActionTypes.EMPLOYEE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end defect update

// start defect delete
function* defectDelete({ payload: { id } }) {
    try {
        yield put({
            type: ProductDefectsActionTypes.DEFECT_DELETE_LOADING,
            payload: {}
        });
        const response = yield call(defectDeleteApi, { id: id });
        if (response.data.status) {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_DELETE_SUCESS,
                payload: { ...response.data }
            });
            yield put({
                type: ProductDefectsActionTypes.DEFECT_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductDefectsActionTypes.DEFECT_DELETE_ERROR,
                payload: { ...response.data }
            });
        }
    } catch (error) {
        yield put({
            type: ProductDefectsActionTypes.DEFECT_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end defect delete

export function* getDefectList(): any {
    yield takeEvery(ProductDefectsActionTypes.GET_DEFECT_LIST, defectList);
}

export function* createDefect(): any {
    yield takeEvery(ProductDefectsActionTypes.CREATE_DEFECT, defectCreate);
}

export function* updateDefect(): any {
    yield takeEvery(ProductDefectsActionTypes.UPDATE_DEFECT, defectUpdate);
}

export function* deleteDefect(): any {
    yield takeEvery(ProductDefectsActionTypes.DELETE_DEFECT, defectDelete);
}

function* productDefectsSaga(): any {
    yield all([
        fork(getDefectList),
        fork(createDefect),
        fork(updateDefect),
        fork(deleteDefect)
    ]);
}

export default productDefectsSaga;