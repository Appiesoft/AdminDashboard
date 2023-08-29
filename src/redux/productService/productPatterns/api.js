import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start product patterns List 
function productPatternsListApi(params: any): any {
    return api.create(URL.PRODUCT_PATTERNS_LIST, params);
}

//  start product patterns Create
function productPatternsCreateApi(params: any): any {
    return api.create(URL.PRODUCT_PATTERNS_CREATE, params);
}

//   start product patterns Update
function productPatternsUpdateApi(params: any): any {
    return api.create(URL.PRODUCT_PATTERNS_UPDATE, params);
}

//   start product patterns Delete
function productPatternsDeleteApi(params: any): any {
    return api.delete(URL.PRODUCT_PATTERNS_DELETE + '/' + params);
}
export {productPatternsListApi, productPatternsCreateApi, productPatternsUpdateApi,productPatternsDeleteApi}