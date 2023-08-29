import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start category List 
function categoryListApi(params: any): any {
    return api.create(URL.PRODUCT_CATEGORY_LIST, params);
}

//  start category Create
function categoryCreateApi(params: any): any {
    return api.create(URL.PRODUCT_CATEGORY_CREATE, params);
}

//   start category Update
function categoryUpdateApi(params: any): any {
    return api.create(URL.PRODUCT_CATEGORY_UPDATE, params);
}

//   start category Delete
function categoryDeleteApi(params: any): any {
    return api.delete(URL.PRODUCT_CATEGORY_DELETE+'/'+params);
}  

export { categoryListApi, categoryCreateApi, categoryUpdateApi,categoryDeleteApi }