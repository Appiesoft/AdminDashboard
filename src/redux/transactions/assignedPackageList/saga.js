import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import AssignedPackageActionTypes from './constant';
import { assignedPackageListApi, assignedPackageCreateApi, assignedPackageDeleteApi } from "./api"

// start AssignPackage List 
function* assignedPackageList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_LOADING,
            payload: {}
        });
        const response = yield call(assignedPackageListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end AssignPackage List 


// start AssignPackage Create 
function* assignPackageCreate({ payload: {
    customerId,
    pkgId,
    startDate,
    paymentMode
} }) {
    try {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(assignedPackageCreateApi, {
            customer_id: customerId,
            pkg_id: pkgId,
            start_date: startDate,
            payment_mode: paymentMode,
        });
        if (response.data.status) {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_CREATE_ERROR,
            payload: { message: error.message },
        });

    }
}
// end AssignPackage Create

// start AssignPackage Delete 
function* assignPackageDelete({ payload: {
    assignId
} }) {
    try {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_LOADING,
            payload: {}
        });
        const response = yield call(assignedPackageDeleteApi, {
            assignId: assignId
        });
        if (response.data.status) {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_SUCESS,
                payload: { data: response },
            });
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_RESET,
                payload: {},
            });

        } else {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_DELETE_ERROR,
            payload: { message: error.message },
        });

    }
}
// end AssignPackage Delete


export function* getAssignPackageList(): any {
    yield takeEvery(AssignedPackageActionTypes.GET_ASSIGNED_PACKAGE_LIST, assignedPackageList);
}
export function* createAssignPackage(): any {
    yield takeEvery(AssignedPackageActionTypes.CREATE_ASSIGNED_PACKAGE, assignPackageCreate);
}
export function* deleteAssignPackage(): any {
    yield takeEvery(AssignedPackageActionTypes.DELETE_ASSIGNED_PACKAGE, assignPackageDelete);
}


function* assignedPackageListSaga(): any {
    yield all([
        fork(getAssignPackageList),
        fork(createAssignPackage),
        fork(deleteAssignPackage),
    ]);
}

export default assignedPackageListSaga;