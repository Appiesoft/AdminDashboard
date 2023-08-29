import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { homePageSettingListApi, homePageSettingUpdateApi } from './api';
import HomePageSettingActionTypes from './constant';

// start home page setting list
function* homePageSettingList() {
    try {
        yield put({
            type: HomePageSettingActionTypes.HOME_PAGE_SETTING_LIST_LOADING,
            payload: {},
        });
        const response = yield call(homePageSettingListApi, {});
        if (response.data.status) {
            yield put({
                type: HomePageSettingActionTypes.HOME_PAGE_SETTING_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: HomePageSettingActionTypes.HOME_PAGE_SETTING_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: HomePageSettingActionTypes.HOME_PAGE_SETTING_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end home page setting

// start home page setting update
function* homePageSettingUpdate({ payload: {
    expressOrderIcon,
    expressOrderHeading,
    expressOrderSubheading,
    expressOrderButton,
    expressOrderColor,
    expressOrderShowHide,
    expressOrderPriority,
    normalOrderIcon,
    normalOrderHeading,
    normalOrderSubheading,
    normalOrderButton,
    normalOrderColor,
    normalOrderShowHide,
    normalOrderPriority,
    priceEstimationIcon,
    priceEstimationHeading,
    priceEstimationSubheading,
    priceEstimationButton,
    priceEstimationColor,
    priceEstimationShowHide,
    priceEstimationPriority,
    pickupRequestIcon,
    pickupRequestHeading,
    pickupRequestSubheading,
    pickupRequestButton,
    pickupRequestColor,
    pickupRequestShowHide,
    pickupRequestPriority
} }) {
    try {
        yield put({
            type: HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(homePageSettingUpdateApi, {
            express_order_icon: expressOrderIcon,
            express_order_heading: expressOrderHeading,
            express_order_subheading: expressOrderSubheading,
            express_order_button: expressOrderButton,
            express_order_color: expressOrderColor,
            express_order_show_hide: expressOrderShowHide,
            express_order_priority: expressOrderPriority,
            normal_order_icon: normalOrderIcon,
            normal_order_heading: normalOrderHeading,
            normal_order_subheading: normalOrderSubheading,
            normal_order_button: normalOrderButton,
            normal_order_color: normalOrderColor,
            normal_order_show_hide: normalOrderShowHide,
            normal_order_priority: normalOrderPriority,
            price_estimation_icon: priceEstimationIcon,
            price_estimation_heading: priceEstimationHeading,
            price_estimation_subheading: priceEstimationSubheading,
            price_estimation_button: priceEstimationButton,
            price_estimation_color: priceEstimationColor,
            price_estimation_show_hide: priceEstimationShowHide,
            price_estimation_priority: priceEstimationPriority,
            pickup_request_icon: pickupRequestIcon,
            pickup_request_heading: pickupRequestHeading,
            pickup_request_subheading: pickupRequestSubheading,
            pickup_request_button: pickupRequestButton,
            pickup_request_color: pickupRequestColor,
            pickup_request_show_hide: pickupRequestShowHide,
            pickup_request_priority: pickupRequestPriority
        });
        if (response.data.status) {
            yield put({
                type: HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end home page setting update


export function* getHomePageSettingList(): any {
    yield takeEvery(HomePageSettingActionTypes.GET_HOME_PAGE_SETTING_LIST, homePageSettingList);
}

export function* updateHomePageSetting(): any {
    yield takeEvery(HomePageSettingActionTypes.HOME_PAGE_SETTING_UPDATE, homePageSettingUpdate);
}


function* homePageSettingSaga(): any {
    yield all([
        fork(getHomePageSettingList),
        fork(updateHomePageSetting),
    ]);
}

export default homePageSettingSaga;
