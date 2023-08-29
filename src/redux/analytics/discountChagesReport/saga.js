import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import DiscountChargesReportActionTypes from './constant';
import { discountChargesReport } from './api';


// start discount charge Report

function* discountChargeReportList({ payload: { searchValue, pageNumber, showLimit, from, to, storeId } }) {
    try {
        yield put({
            type: DiscountChargesReportActionTypes.DISCOUNT_CHARGES_REPORT_LOADING,
            payload: {},
        });
        const response = yield call(discountChargesReport, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,

        });
        if (response.data.status) {
            yield put({
                type: DiscountChargesReportActionTypes.DISCOUNT_CHARGES_REPORT_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DiscountChargesReportActionTypes.DISCOUNT_CHARGES_REPORT_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DiscountChargesReportActionTypes.DISCOUNT_CHARGES_REPORT_ERROR,
            payload: { message: error.message },
        });
    }
}
// end discount charge report List


export function* getDiscountChargeReport(): any {
    yield takeEvery(DiscountChargesReportActionTypes.GET_DISCOUNT_CHARGES_REPORT, discountChargeReportList);
}

function* discountChargeReportSaga(): any {
    yield all([
        fork(getDiscountChargeReport),
    ]);
}

export default discountChargeReportSaga;
