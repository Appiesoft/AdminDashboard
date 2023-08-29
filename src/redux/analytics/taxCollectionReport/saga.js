import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import TaxCollectionReportListActionTypes from './constant';
import { taxCollectionReportList } from './api';

// start Tax collection report list
function* TaxCollectionReportList({ payload: { searchValue, pageNumber, showLimit, storeId, from, to } }) {
    try {
        yield put({
            type: TaxCollectionReportListActionTypes.TAX_COLLECTION_REPORT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(taxCollectionReportList, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            from: from,
            to: to,
            store_id: storeId,
        });

        if (response.data.status) {
            yield put({
                type: TaxCollectionReportListActionTypes.TAX_COLLECTION_REPORT_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: TaxCollectionReportListActionTypes.TAX_COLLECTION_REPORT_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: TaxCollectionReportListActionTypes.TAX_COLLECTION_REPORT_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Tax collection report list


export function* gettaxCollectionReportList(): any {
    yield takeEvery(TaxCollectionReportListActionTypes.GET_TAX_COLLECTION_REPORT_LIST, TaxCollectionReportList);
}

function* taxCollectionReportListSaga(): any {
    yield all([
        fork(gettaxCollectionReportList),
    ]);
}

export default taxCollectionReportListSaga;
