import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import LaundryPackagesActionTypes from '../laundryPackages/constant';
import { laundryPackagesListApi, laundryPackagesCreateApi, laundryPackagesUpdateApi, laundryPackagesDeleteApi } from "../laundryPackages/api"


// start laundry Packages List 
function* laundryPackagesList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_LIST_LOADING,
            payload: {}
        });
        const response = yield call(laundryPackagesListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end laundry Packages List 


// start laundry Packages Create 
function* laundryPackagesCreate({ payload: { services, description, pkg_name, usage_limit, pkg_unit, pickup, duration, amount, status, priority } }) {
    try {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(laundryPackagesCreateApi, { services: services, description: description, pkg_name: pkg_name, usage_limit: usage_limit, pkg_unit: pkg_unit, pickup: pickup, duration: duration, amount: amount, status: status, priority: priority });
        if (response.data.status) {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end laundryPackages Create

// start laundryPackages Update
function* laundryPackagesUpdate({ payload: { amount, description, duration, pickup, pkg_name, pkg_unit, priority, services, status, upcharge_id, usage_limit } }) {
    try {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(laundryPackagesUpdateApi, {
            amount, description, duration, pickup, pkg_name, pkg_unit, priority, services, status, upcharge_id, usage_limit

        });
        if (response.data.status) {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_UPDATE_SUCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end laundry Packages Update


// start laundry Packages Create 
function* laundryPackagesDelete({ payload: { id } }) {
    try {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(laundryPackagesDeleteApi, id);
        if (response.data.status) {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_SUCESS,
                payload: { ...response.data }
            });
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: LaundryPackagesActionTypes.LAUNDRY_PACKAGES_DELETE_ERROR,
            payload: { message: error.message }
        });
    }
}
// end laundryPackages Create

export function* getLaundryPackagesList(): any {
    yield takeEvery(LaundryPackagesActionTypes.GET_LAUNDRY_PACKAGES_LIST, laundryPackagesList);
}
export function* createLaundryPackages(): any {
    yield takeEvery(LaundryPackagesActionTypes.CREATE_LAUNDRY_PACKAGES, laundryPackagesCreate);
}
export function* updateLaundryPackages(): any {
    yield takeEvery(LaundryPackagesActionTypes.UPDATE_LAUNDRY_PACKAGES, laundryPackagesUpdate);
}
export function* deleteLaundryPackages(): any {
    yield takeEvery(LaundryPackagesActionTypes.DELETE_LAUNDRY_PACKAGES, laundryPackagesDelete);
}


function* productLaundryPackagesSaga(): any {
    yield all([
        fork(getLaundryPackagesList),
        fork(createLaundryPackages),
        fork(updateLaundryPackages),
        fork(deleteLaundryPackages)
    ]);
}

export default productLaundryPackagesSaga;