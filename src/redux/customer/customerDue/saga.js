import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { customerDueApi } from './api';
import CustomerDueTypes from './constant';



// start customer Due
function* customerDue({ payload: { customerId } }) {
    try {
        yield put({
            type: CustomerDueTypes.CUSTOMER_DUE_LOADING,
            payload: {},
        });
        const response = yield call(customerDueApi, {
            customer_id: customerId
        });
        if (response.data.status) {
            yield put({
                type: CustomerDueTypes.CUSTOMER_DUE_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CustomerDueTypes.CUSTOMER_DUE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerDueTypes.CUSTOMER_DUE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end customer due


export function* getCustomerDue(): any {
    yield takeEvery(CustomerDueTypes.GET_CUSTOMER_DUE, customerDue);
}


function* customerDueSaga(): any {
    yield all([fork(getCustomerDue)]);
}

export default customerDueSaga;
