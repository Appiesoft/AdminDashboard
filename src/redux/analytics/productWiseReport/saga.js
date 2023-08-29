import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductWiseReportListActionTypes from './constant';
import { productWiseReportList } from './api';

// start Product wise report List
function* ProductWiseReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to, serviceId, categoryId, productId } }) {
    try {
        yield put({
            type: ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(productWiseReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,
            service_id: serviceId,
            category_id: categoryId,
            product_id: productId

        });

        if (response.data.status) {
            yield put({
                type: ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductWiseReportListActionTypes.PRODUCT_WISE_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end product wise report List


export function* getProductWiseReportList(): any {
    yield takeEvery(ProductWiseReportListActionTypes.GET_PRODUCT_WISE_REPORT_LIST, ProductWiseReportList);
}

function* productWiseReportListSaga(): any {
    yield all([
        fork(getProductWiseReportList),
    ]);
}

export default productWiseReportListSaga;
