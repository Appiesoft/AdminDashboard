import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import EmployeeActionTypes from './constant';
import { employeeCreateApi, employeeDeleteApi, employeeDetailsApi, employeeListApi, employeeUpdateApi } from './api';
import CryptoJS from 'crypto-js';
import * as ENCRYPT from '../../utils/Encrypt';


// start Employee List
function* employeeList({ payload: { storeId, searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_LIST_LOADING,
            payload: {},
        });
        const response = yield call(employeeListApi, {
            store_id: storeId,
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
        });
        if (response.data.status) {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Employee List

// // start Employee Create
function* employeeCreate({
    payload: {
        firstName,
        lastName,
        mobile,
        emailId,
        password,
        status,
        lat,
        long,
        address1,
        address2,
        countryCode,
        city,
        state,
        zipcode,
        designation,
        groupMemberId,
        driverRole,
        pin,
        stores,
    },
}) {
    try {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(employeeCreateApi, {
            first_name: firstName,
            last_name: lastName,
            mobile: parseInt(mobile),
            email_id: emailId,
            password: CryptoJS.SHA1(password).toString(),
            status: 'enable',
            lat: lat,
            long: long,
            address1: address1,
            address2: address2,
            country_code: countryCode,
            city: city,
            state: state,
            zipcode: parseInt(zipcode),
            designation: designation,
            group_member_id: 3,
            driver_role: driverRole,
            pin: pin,
            stores: stores,
        });
        if (response.data.status) {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_CREATE_SUCESS,
                payload: { data: response.data },
            });
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Employee Create

// // start Employee Details
function* employeeDetails({ payload: { employeeId } }) {
    try {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_DETAILS_LOADING,
            payload: {},
        });
        const response = yield call(employeeDetailsApi, { employee_id: employeeId });
        if (response.data.status) {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_DETAILS_SUCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: EmployeeActionTypes.EMPLOYEE_DETAILS_RESET,
            //     payload: {},
            // });
        } else {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_DETAILS_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_DETAILS_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Employee Details

// // start Employee Update
function* employeeUpdate({
    payload: {
        employeeId,
        firstName,
        lastName,
        mobile,
        emailId,
        password,
        status,
        lat,
        long,
        address1,
        address2,
        countryCode,
        city,
        state,
        zipcode,
        designation,
        groupMemberId,
        driverRole,
        pin,
        stores,
    },
}) {
    try {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(employeeUpdateApi, {
            employee_id: employeeId,
            first_name: firstName,
            last_name: lastName,
            mobile: parseInt(mobile),
            email_id: emailId,
            password: CryptoJS.SHA1(password).toString(),
            status: status,
            lat: lat,
            long: long,
            address1: address1,
            address2: address2,
            country_code: countryCode,
            city: city,
            state: state,
            zipcode: parseInt(zipcode),
            designation: designation,
            group_member_id: 3,
            driver_role: driverRole,
            pin: pin,
            stores: stores,
        });
        if (response.data.status) {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_UPDATE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Employee Update

// // start Employee Delete
function* employeeDelete({
    payload: {
        employeeId,
    },
}) {
    try {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(employeeDeleteApi, {
            employeeId: employeeId,
        });
        if (response.data.status) {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_DELETE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: EmployeeActionTypes.EMPLOYEE_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: EmployeeActionTypes.EMPLOYEE_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Employee Delete

export function* getEmployeeList(): any {
    yield takeEvery(EmployeeActionTypes.GET_EMPLOYEE_LIST, employeeList);
}
export function* createEmployee(): any {
    yield takeEvery(EmployeeActionTypes.CREATE_EMPLOYEE, employeeCreate);
}
export function* updateEmployee(): any {
    yield takeEvery(EmployeeActionTypes.UPDATE_EMPLOYEE, employeeUpdate);
}
export function* detailsEmployee(): any {
    yield takeEvery(EmployeeActionTypes.DETAILS_EMPLOYEE, employeeDetails);
}
export function* deleteEmployee(): any {
    yield takeEvery(EmployeeActionTypes.DELETE_EMPLOYEE, employeeDelete);
}

function* employeeListSaga(): any {
    yield all([
        fork(getEmployeeList),
        fork(createEmployee),
        fork(updateEmployee),
        fork(detailsEmployee),
        fork(deleteEmployee)
    ]);
}

export default employeeListSaga;
