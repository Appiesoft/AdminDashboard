import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import CostomerActionTypes from './constant';
import { customerCreateApi, customerDeleteApi, customerDetailApi, customerListApi, customerUpdateApi } from './api';
import CryptoJS from 'crypto-js';


// start costomer List
function* costomerList({ payload: { searchValue, pageNumber, showLimit, storeId } }) {
    try {
        yield put({
            type: CostomerActionTypes.COSTOMER_LIST_LOADING,
            payload: {},
        });
        const response = yield call(customerListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
        });
        if (response.data.status) {
            yield put({
                type: CostomerActionTypes.COSTOMER_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CostomerActionTypes.COSTOMER_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CostomerActionTypes.COSTOMER_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end costomer List

// start customer create
function* createCustomer({ payload:
    {
        taxExempt,
        lastName,
        taxId,
        firstName,
        address,
        zipcode,
        city,
        country,
        custMapPos,
        emailId,
        mobile,
        countryCode,
        countryPrefixCode,
        custCharges,
        locationFor,
        storeId,
        priceListId,
        location

    } }) {
    try {
        yield put({
            type: CostomerActionTypes.CUSTOMER_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(customerCreateApi, {
            tax_exempt: taxExempt,
            last_name: lastName,
            tax_id: taxId,
            first_name: firstName,
            address: address,
            zipcode: zipcode,
            city: city,
            country: country,
            cust_map_pos: custMapPos,
            email_id: emailId,
            mobile: mobile,
            country_code: countryCode,
            country_prefix_code: countryPrefixCode,
            cust_charges: custCharges,
            location_for: locationFor,
            store_id: storeId,
            price_list_id: priceListId,
            location: location
        });
        if (response.data.status) {
            yield put({
                type: CostomerActionTypes.CUSTOMER_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: CostomerActionTypes.CUSTOMER_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: CostomerActionTypes.CUSTOMER_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CostomerActionTypes.CUSTOMER_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}

// start customer update
function* updateCustomer({ payload:
    {
        customerId,
        firstName,
        lastName,
        emailId,
        mobileNumber,
        address,
        state,
        city,
        pincode,
        priceListId,
        locationFor,
        storeId,
        preferences,
        custCharges,
        location
    } }) {
    try {
        yield put({
            type: CostomerActionTypes.CUSTOMER_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(customerUpdateApi, {
            customer_id: customerId,
            first_name: firstName,
            last_name: lastName,
            email_id: emailId,
            mobile_number: mobileNumber,
            address: address,
            state: state,
            city: city,
            pincode: pincode,
            price_list_id: priceListId,
            location_for: locationFor,
            store_id: storeId,
            preferences: preferences,
            cust_charges: custCharges,
            location: location
        });
        if (response.data.status) {
            yield put({
                type: CostomerActionTypes.CUSTOMER_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: CostomerActionTypes.CUSTOMER_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: CostomerActionTypes.CUSTOMER_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CostomerActionTypes.CUSTOMER_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}


// start customer delete
function* deleteCustomer({ payload: { customerId } }) {
    try {
        yield put({
            type: CostomerActionTypes.CUSTOMER_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(customerDeleteApi, {
            customerId: customerId
        });
        if (response.data.status) {
            yield put({
                type: CostomerActionTypes.CUSTOMER_DELETE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: CostomerActionTypes.CUSTOMER_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: CostomerActionTypes.CUSTOMER_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CostomerActionTypes.CUSTOMER_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end customer delete


export function* getCostomerList(): any {
    yield takeEvery(CostomerActionTypes.GET_COSTOMER_LIST, costomerList);
}

export function* customerCreate(): any {
    yield takeEvery(CostomerActionTypes.CUSTOMER_CREATE, createCustomer);
}

export function* customerUpdate(): any {
    yield takeEvery(CostomerActionTypes.CUSTOMER_UPDATE, updateCustomer);
}

export function* customerDelete(): any {
    yield takeEvery(CostomerActionTypes.CUSTOMER_DELETE, deleteCustomer);
}


function* costomerListSaga(): any {
    yield all([
        fork(getCostomerList),
        fork(customerCreate),
        fork(customerUpdate),
        fork(customerDelete),
    ]);
}

export default costomerListSaga;
