import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import PromoCodeReportListActionTypes from './constant';
import { promoCodeReportList } from './api';

// start Product wise report List
function* PromoCodeReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to } }) {
    try {
        yield put({
            type: PromoCodeReportListActionTypes.PROMO_CODE_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(promoCodeReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,
        });

        if (response.data.status) {
            yield put({
                type: PromoCodeReportListActionTypes.PROMO_CODE_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: PromoCodeReportListActionTypes.PROMO_CODE_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: PromoCodeReportListActionTypes.PROMO_CODE_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end product wise report List


export function* getPromoCodeReportList(): any {
    yield takeEvery(PromoCodeReportListActionTypes.GET_PROMO_CODE_REPORT_LIST, PromoCodeReportList);
}

function* promoCodeReportListSaga(): any {
    yield all([
        fork(getPromoCodeReportList),
    ]);
}

export default promoCodeReportListSaga;
