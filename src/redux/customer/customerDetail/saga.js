import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { customerDetailApi } from './api';
import CustomerDetailTypes from './constant';



// start customer Detail
function* customerDetail({ payload: { customerId } }) {
    try {
        yield put({
            type: CustomerDetailTypes.CUSTOMER_DETAIL_LOADING,
            payload: {},
        });
        const response = yield call(customerDetailApi, {
            customer_id: customerId
        });
        if (response.data.status) {
            yield put({
                type: CustomerDetailTypes.CUSTOMER_DETAIL_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CustomerDetailTypes.CUSTOMER_DETAIL_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerDetailTypes.CUSTOMER_DETAIL_ERROR,
            payload: { message: error.message },
        });
    }
}
// end customer Detail


export function* getCustomerDetail(): any {
    yield takeEvery(CustomerDetailTypes.CUSTOMER_DETAIL, customerDetail);
}


function* customerDetailSaga(): any {
    yield all([fork(getCustomerDetail)]);
}

export default customerDetailSaga;
