import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductPriceActionTypes from '../PriceList/constant';
import {
    priceListApi,
    priceCreateApi,
    priceUpdateApi,
    itemListApi,
    itemCreateApi,
    itemUpdateApi,
    itemDeleteApi,
    itemDetailsApi,
} from '../PriceList/api';

// start price List
function* priceList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductPriceActionTypes.PRICE_LIST_LOADING,
            payload: {},
        });
        const response = yield call(priceListApi, {
            search_value: searchValue,
            page_number: pageNumber,
            show_limit: showLimit,
        });
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.PRICE_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductPriceActionTypes.PRICE_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.PRICE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end price List

// start price Create
function* priceCreate({ payload: { price_list_name, price_list_id, type, percentage } }) {
    try {
        yield put({
            type: ProductPriceActionTypes.PRICE_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(priceCreateApi, {
            // price_list_name: price_list_name,
            // show_hide_on_website: show_hide_on_website,
            price_list_name: price_list_name,
            price_list_id: price_list_id,
            type: type,
            percentage: percentage,
        });
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.PRICE_CREATE_SUCESS,
                payload: { data: response.data },
            });
        } else {
            yield put({
                type: ProductPriceActionTypes.PRICE_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.PRICE_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end price Create

// start price Update
function* priceUpdate({ payload: { price_id, price_name, price_remark, image } }) {
    try {
        yield put({
            type: ProductPriceActionTypes.PRICE_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(priceUpdateApi, {
            price_id: price_id,
            price_name: price_name,
            price_remark: price_remark,
            image: image,
        });
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.PRICE_UPDATE_SUCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductPriceActionTypes.PRICE_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.PRICE_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end price Update

// start item List
function* productItemList({ payload: { priceListId } }) {
    try {
        yield put({
            type: ProductPriceActionTypes.ITEM_LIST_LOADING,
            payload: {},
        });
        const response = yield call(itemListApi, { price_list_id: priceListId });
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.ITEM_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductPriceActionTypes.ITEM_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.ITEM_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end item List

// start item Create
function* productItemCreate({
    payload: {
        priceListId,
        serviceId,
        categoryId,
        clothId,
        shortCode,
        price,
        minPrice,
        piece,
        unit,
        active,
        online,
        priority,
        tax,
        addon,
    },
}) {
    try {
        yield put({
            type: ProductPriceActionTypes.PRICE_CREATE_LOADING,
            payload: {},
        });
        const response = yield call(itemCreateApi, {
            price_list_id: priceListId,
            service_id: serviceId,
            category_id: categoryId,
            cloth_id: clothId,
            short_code: shortCode,
            price: price,
            min_price: minPrice,
            piece: piece,
            unit: unit,
            active: active,
            online: online,
            priority: priority,
            tax: tax,
            addon: addon,
        });
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.ITEM_CREATE_SUCESS,
                payload: { data: response.data },
            });
        } else {
            yield put({
                type: ProductPriceActionTypes.ITEM_CREATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.ITEM_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end item Create

// start item Update
function* productItemUpdate({
    payload: {
        itemId,
        priceListId,
        serviceId,
        categoryId,
        clothId,
        shortCode,
        price,
        minPrice,
        piece,
        unit,
        active,
        online,
        priority,
        tax,
        addon,
    },
}) {
    try {
        yield put({
            type: ProductPriceActionTypes.PRICE_UPDATE_LOADING,
            payload: {},
        });
        const response = yield call(itemUpdateApi, {
            item_id: itemId,
            price_list_id: priceListId,
            service_id: serviceId,
            category_id: categoryId,
            cloth_id: clothId,
            short_code: shortCode,
            price: price,
            min_price: minPrice,
            piece: piece,
            unit: unit,
            active: active,
            online: online,
            priority: priority,
            tax: tax,
            addon: addon,
        });

        // console.log('response.data', response.data);
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.ITEM_UPDATE_SUCESS,
                payload: { ...response.data },
                // payload: { message: response.data.message, ...response.data },
            });
        } else {
            yield put({
                type: ProductPriceActionTypes.ITEM_UPDATE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.ITEM_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end item Update

// start product Item delete
function* productItemDelete({ payload: { id } }) {
    try {
        yield put({
            type: ProductPriceActionTypes.ITEM_DELETE_LOADING,
            payload: {},
        });
        const response = yield call(itemDeleteApi, id);
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.ITEM_DELETE_SUCESS,
                payload: { ...response.data },
            });
            yield put({
                type: ProductPriceActionTypes.ITEM_DELETE_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: ProductPriceActionTypes.ITEM_DELETE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.ITEM_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}
// end product Item  delete

// // start Employee Details
function* productItemDetails({ payload: { itemId } }) {
    try {
        yield put({
            type: ProductPriceActionTypes.ITEM_DETAILS_LOADING,
            payload: {},
        });
        const response = yield call(itemDetailsApi, { item_id: itemId });
        if (response.data.status) {
            yield put({
                type: ProductPriceActionTypes.ITEM_DETAILS_SUCESS,
                payload: { ...response.data },
            });
            // yield put({
            //     type: ProductPriceActionTypes.ITEM_DETAILS_RESET,
            //     payload: {},
            // });
        } else {
            yield put({
                type: ProductPriceActionTypes.ITEM_DETAILS_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductPriceActionTypes.ITEM_DETAILS_ERROR,
            payload: { message: error.message },
        });
    }
}
// // end Employee Details

export function* getPriceList(): any {
    yield takeEvery(ProductPriceActionTypes.GET_PRICE_LIST, priceList);
}
export function* createPrice(): any {
    yield takeEvery(ProductPriceActionTypes.CREATE_PRICE, priceCreate);
}
export function* updatePrice(): any {
    yield takeEvery(ProductPriceActionTypes.UPDATE_PRICE, priceUpdate);
}

export function* getItemList(): any {
    yield takeEvery(ProductPriceActionTypes.GET_ITEM_LIST, productItemList);
}
export function* createItem(): any {
    yield takeEvery(ProductPriceActionTypes.CREATE_ITEM, productItemCreate);
}
export function* updateItem(): any {
    yield takeEvery(ProductPriceActionTypes.UPDATE_ITEM, productItemUpdate);
}

export function* deleteItem(): any {
    yield takeEvery(ProductPriceActionTypes.DELETE_ITEM, productItemDelete);
}

export function* detailsItem(): any {
    yield takeEvery(ProductPriceActionTypes.DETAILS_ITEM, productItemDetails);
}

function* productPriceSaga(): any {
    yield all([
        //fork price
        fork(getPriceList),
        fork(createPrice),
        fork(updatePrice),
        //flok item
        fork(getItemList),
        fork(createItem),
        fork(updateItem),
        fork(deleteItem),
        fork(detailsItem),
    ]);
}

export default productPriceSaga;
