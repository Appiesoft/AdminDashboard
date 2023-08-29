import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import RetailProductWiseReportListActionTypes from './constant';
import { retailProductWiseReportList } from './api';

// start retail product wise report List
function* RetailProductWiseReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to, productId } }) {
    try {
        yield put({
            type: RetailProductWiseReportListActionTypes.RETAIL_PRODUCT_WISE_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(retailProductWiseReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,
            product_id: productId
        });

        if (response.data.status) {
            yield put({
                type: RetailProductWiseReportListActionTypes.RETAIL_PRODUCT_WISE_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: RetailProductWiseReportListActionTypes.RETAIL_PRODUCT_WISE_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: RetailProductWiseReportListActionTypes.RETAIL_PRODUCT_WISE_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end product wise report List


export function* getRetailProductWiseReportList(): any {
    yield takeEvery(RetailProductWiseReportListActionTypes.GET_RETAIL_PRODUCT_WISE_REPORT_LIST, RetailProductWiseReportList);
}

function* retailproductWiseReportListSaga(): any {
    yield all([
        fork(getRetailProductWiseReportList),
    ]);
}

export default retailproductWiseReportListSaga;
