import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import CostomerActiveActionTypes from './constant';
import { customerActiveListApi } from './api';

// start costomer active List
function* costomerActiveList({ payload: { searchValue, pageNumber, showLimit, storeId, type } }) {
    try {
        yield put({
            type: CostomerActiveActionTypes.COSTOMER_ACTIVE_LIST_LOADING,
            payload: {},
        });
        const response = yield call(customerActiveListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
            store_id: storeId,
            type: type
        });
        if (response.data.status) {
            yield put({
                type: CostomerActiveActionTypes.COSTOMER_ACTIVE_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CostomerActiveActionTypes.COSTOMER_ACTIVE_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CostomerActiveActionTypes.COSTOMER_ACTIVE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end costomer active List


export function* getCostomerActiveList(): any {
    yield takeEvery(CostomerActiveActionTypes.GET_COSTOMER_ACTIVE_LIST, costomerActiveList);
}


function* costomerActiveListSaga(): any {
    yield all([fork(getCostomerActiveList)]);
}

export default costomerActiveListSaga;
