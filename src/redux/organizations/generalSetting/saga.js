import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import GeneralSettingActionTypes from './constant';
import { generalSettingApi, generalSettingUpdateApi } from './api';

function* generalSetting() {
    try {
        yield put({
            type: GeneralSettingActionTypes.GENERAL_SETTING_LOADING,
            payload: {},
        });
        const response = yield call(generalSettingApi, {});
        if (response.data.status) {
            yield put({
                type: GeneralSettingActionTypes.GENERAL_SETTING_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: GeneralSettingActionTypes.GENERAL_SETTING_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: GeneralSettingActionTypes.GENERAL_SETTING_ERROR,
            payload: { message: error.message },
        });
    }
}

function* updateGeneralSetting({ payload: {
    shopName,
    shopAddress1,
    shopAddress2,
    shopCity,
    shopState,
    shopZip,
    shopGmap,
    shopPhone,
    shopMobile,
    shopEmail,
    shopLogo,
    sysLang,
    sysCurrency,
    sysCurrencyShow,
    sysTimezone,
    challanName,
    pickupRequestidFrom,
    deliveryRequestidFrom,
    autoDriverAssign,
    countryPhoneCode,
    prefixCountryCode,
    openpincode,
    noOfDecimalPlaces,
    templateName,
    mobileTemplate,
    faceLink,
    instLink,
    twitLink,
    skypLink,
    linkdLink,
    yelpLink,
    pininterestLink } }) {
    try {
        yield put({
            type: GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(generalSettingUpdateApi, {
            shop_name: shopName,
            shop_address1: shopAddress1,
            shop_address2: shopAddress2,
            shop_city: shopCity,
            shop_state: shopState,
            shop_zip: shopZip,
            shop_gmap: shopGmap,
            shop_phone: shopPhone,
            shop_mobile: shopMobile,
            shop_email: shopEmail,
            shop_logo: shopLogo,
            sys_lang: sysLang,
            sys_currency: sysCurrency,
            sys_currency_show: sysCurrencyShow,
            sys_timezone: sysTimezone,
            challan_name: challanName,
            pickup_requestid_from: pickupRequestidFrom,
            delivery_requestid_from: deliveryRequestidFrom,
            auto_driver_assign: autoDriverAssign,
            country_phone_code: countryPhoneCode,
            prefix_country_code: prefixCountryCode,
            openpincode: openpincode,
            no_of_decimal_places: noOfDecimalPlaces,
            template_name: templateName,
            mobile_template: mobileTemplate,
            face_link: faceLink,
            inst_link: instLink,
            twit_link: twitLink,
            skyp_link: skypLink,
            linkd_link: linkdLink,
            yelp_link: yelpLink,
            pininterest_link: pininterestLink
        });
        if (response.data.status) {
            yield put({
                type: GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: GeneralSettingActionTypes.GENERAL_SETTING_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getGeneralSetting(): any {
    yield takeEvery(GeneralSettingActionTypes.GET_GENERAL_SETTING, generalSetting);
}
export function* generalSettingUpdate(): any {
    yield takeEvery(GeneralSettingActionTypes.GENERAL_SETTING_UPDATE, updateGeneralSetting);
}

function* generalSettingSaga(): any {
    yield all([fork(getGeneralSetting)]);
    yield all([fork(generalSettingUpdate)]);
}

export default generalSettingSaga;
