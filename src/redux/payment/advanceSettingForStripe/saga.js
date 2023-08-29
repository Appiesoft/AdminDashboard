import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { advanceSettingForStripeApi } from './api';
import AdvanceSettingForStripeActionTypes from './constant';

function* advanceSettingForStripeActions() {
    try {
        yield put({
            type: AdvanceSettingForStripeActionTypes.ADVANCE_SETTING_FOR_STRIPE_LOADING,
            payload: {},
        });
        const response = yield call(advanceSettingForStripeApi, {});
        if (response.data.status) {
            yield put({
                type: AdvanceSettingForStripeActionTypes.ADVANCE_SETTING_FOR_STRIPE_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: AdvanceSettingForStripeActionTypes.ADVANCE_SETTING_FOR_STRIPE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AdvanceSettingForStripeActionTypes.ADVANCE_SETTING_FOR_STRIPE_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getAdvanceSettingForStripe(): any {
    yield takeEvery(AdvanceSettingForStripeActionTypes.UPDATE_ADVANCE_SETTING_FOR_STRIPE, advanceSettingForStripeActions);
}

function* getAdvanceSettingForStripeSaga(): any {
    yield all([fork(getAdvanceSettingForStripe)]);
}

export default getAdvanceSettingForStripeSaga;
