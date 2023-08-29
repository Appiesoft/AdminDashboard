import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import BulkInvoiceActionTypes from './constant';
import { bulkInvoiceListApi } from './api';

function* bulkinvoiceList({ payload: { pageNumber, showLimit } }) {
    try {
        yield put({
            type: BulkInvoiceActionTypes.BULK_INVOICE_LIST_LOADING,
            payload: {}
        });
        const response = yield call(bulkInvoiceListApi, { page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: BulkInvoiceActionTypes.BULK_INVOICE_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: BulkInvoiceActionTypes.BULK_INVOICE_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: BulkInvoiceActionTypes.BULK_INVOICE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}


export function* getBulkInvoiceList(): any {
    yield takeEvery(BulkInvoiceActionTypes.GET_BULK_INVOICE_LIST, bulkinvoiceList);
}


function* bulkInvoiceSaga(): any {
    yield all([
        fork(getBulkInvoiceList),
    ]);
}

export default bulkInvoiceSaga;