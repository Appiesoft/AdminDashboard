import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import PackageActionTypes from './constant';
import {  packageListApi } from "./api"


// start Employee List 
function* packageList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: PackageActionTypes.PACKAGE_LIST_LOADING,
            payload: {}
        });
        const response = yield call(packageListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: PackageActionTypes.PACKAGE_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: PackageActionTypes.PACKAGE_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: PackageActionTypes.PACKAGE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Employee List 

// // // start Employee Create 
// function* employeeCreate() {
//     try {
//         yield put({
//             type: PackageActionTypes.EMPLOYEE_CREATE_LOADING,
//             payload: {}
//         });
//         const response = yield call(employeeCreateApi);
//         if (response.data.status) {
//             yield put({
//                 type: PackageActionTypes.EMPLOYEE_CREATE_SUCESS,
//                 payload: { data: response.data },
//             });

//         } else {
//             yield put({
//                 type: PackageActionTypes.EMPLOYEE_CREATE_ERROR,
//                 payload: { ...response.data },
//             });

//         }
//     } catch (error) {
//         // yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
//         // api.setLoggedInUser(null);
//         // setAuthorization(null);
//     }
// }
// // end Employee Create

// // start Employee Update
// function* employeeUpdate() {
//     try {
//         yield put({
//             type: EmployeeActionTypes.EMPLOYEE_UPDATE_LOADING,
//             payload: {}
//         });
//         const response = yield call(employeeUpdateApi);
//         if (response.data.status) {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_UPDATE_SUCESS,
//                 payload: { ...response.data },
//             });

//         } else {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_UPDATE_ERROR,
//                 payload: { ...response.data },
//             });

//         }
//     } catch (error) {
//         // yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
//         // api.setLoggedInUser(null);
//         // setAuthorization(null);
//     }
// }
// // end Employee Update

// // start Employee Details
// function* employeeDetailsApi() {
//     try {
//         yield put({
//             type: EmployeeActionTypes.EMPLOYEE_DETAILS_LOADING,
//             payload: {}
//         });
//         const response = yield call(employeeUpdateApi);
//         if (response.data.status) {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_DETAILS_SUCESS,
//                 payload: { ...response.data },
//             });

//         } else {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_DETAILS_ERROR,
//                 payload: { ...response.data },
//             });

//         }
//     } catch (error) {
//         // yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
//         // api.setLoggedInUser(null);
//         // setAuthorization(null);
//     }
// }
// // end Employee Details

export function* getPackageList(): any {
    yield takeEvery(PackageActionTypes.GET_PACKAGE_LIST, packageList);
}
// export function* createEmployee(): any {
//     yield takeEvery(PackageActionTypes.CREATE_EMPLOYEE, employeeCreate);
// }
// export function* updateEmployee(): any {
//     yield takeEvery(EmployeeActionTypes.UPDATEs_EMPLOYEE, employeeUpdate);
// }
// export function* detailsEmployee(): any {
//     yield takeEvery(EmployeeActionTypes.DETAILS_EMPLOYEE, employeeDetails);
// }


function* packageListSaga(): any {
    yield all([
        fork(getPackageList),
        // fork(createEmployee),
        // fork(updateEmployee),
        // fork(detailsEmployee),
    ]);
}

export default packageListSaga;