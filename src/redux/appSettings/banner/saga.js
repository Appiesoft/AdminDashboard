import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import BannerListActionTypes from './constant';
import { bannerCreateApi, bannerDeleteApi, bannerDetailApi, bannerListApi, bannerUpdateApi } from './api';

// start banner List
function* bannerList({ payload: { search, pageNumber, showLimit } }) {
    try {
        yield put({
            type: BannerListActionTypes.BANNER_LIST_LOADING,
            payload: {},
        });
        const response = yield call(bannerListApi, {
            search: search,
            page_number: pageNumber,
            show_limit: showLimit,
        });
        if (response.data.status) {
            yield put({
                type: BannerListActionTypes.BANNER_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: BannerListActionTypes.BANNER_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: BannerListActionTypes.BANNER_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

// start banner create
function* bannerCreate({ payload:
    {
        bannerName,
        bannerDescription,
        bannerImage
    } }) {
    try {
        yield put({
            type: BannerListActionTypes.BANNER_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(bannerCreateApi, {
            banner_name: bannerName,
            banner_description: bannerDescription,
            banner_image: bannerImage
        });
        if (response.data.status) {
            yield put({
                type: BannerListActionTypes.BANNER_CREATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: BannerListActionTypes.BANNER_CREATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: BannerListActionTypes.BANNER_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: BannerListActionTypes.BANNER_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end banner create

// start banner detail
function* bannerDetail({ payload:
    {
        bannerId
    } }) {
    try {
        yield put({
            type: BannerListActionTypes.BANNER_DETAIL_LOADING,
            payload: {},
        });
        const response = yield call(bannerDetailApi, {
            banner_id: bannerId
        });
        if (response.data.status) {
            yield put({
                type: BannerListActionTypes.BANNER_DETAIL_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: BannerListActionTypes.BANNER_DETAIL_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: BannerListActionTypes.BANNER_DETAIL_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: BannerListActionTypes.BANNER_DETAIL_ERROR,
            payload: { message: error.message },
        });
    }
}
// end banner create

// start banner update
function* bannerUpdate({ payload:
    {
        id,
        bannerName,
        bannerDescription,
        bannerImage
    } }) {
    try {
        yield put({
            type: BannerListActionTypes.BANNER_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(bannerUpdateApi, {
            id: id,
            banner_name: bannerName,
            banner_description: bannerDescription,
            banner_image: bannerImage
        });
        if (response.data.status) {
            yield put({
                type: BannerListActionTypes.BANNER_UPDATE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: BannerListActionTypes.BANNER_UPDATE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: BannerListActionTypes.BANNER_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: BannerListActionTypes.BANNER_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end banner update

// start banner delete
function* bannerDelete({ payload: { bannerId } }) {
    try {
        yield put({
            type: BannerListActionTypes.BANNER_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(bannerDeleteApi, {
            bannerId: bannerId
        });
        if (response.data.status) {
            yield put({
                type: BannerListActionTypes.BANNER_DELETE_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: BannerListActionTypes.BANNER_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: BannerListActionTypes.BANNER_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: BannerListActionTypes.BANNER_DELETE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end banner delete


export function* getBannerList(): any {
    yield takeEvery(BannerListActionTypes.GET_BANNER_LIST, bannerList);
}

export function* createBanner(): any {
    yield takeEvery(BannerListActionTypes.BANNER_CREATE, bannerCreate);
}

export function* detailBanner(): any {
    yield takeEvery(BannerListActionTypes.BANNER_DETAIL, bannerDetail);
}

export function* updateBanner(): any {
    yield takeEvery(BannerListActionTypes.BANNER_UPDATE, bannerUpdate);
}

export function* deleteBanner(): any {
    yield takeEvery(BannerListActionTypes.BANNER_DELETE, bannerDelete);
}


function* bannerSaga(): any {
    yield all([
        fork(getBannerList),
        fork(createBanner),
        fork(detailBanner),
        fork(updateBanner),
        fork(deleteBanner),
    ]);
}

export default bannerSaga;
