import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"
 
const api = new APICore();

// start price List 
function priceListApi(params: any): any {
    return api.get(URL.PRODUCT_PRICE_LIST,params);
}
 
//  start price Create
function priceCreateApi(params: any): any {  
    return api.create(URL.PRODUCT_PRICE_CREATE, params);
}
 
//   start price Update
function priceUpdateApi(params: any): any {
    return api.create(URL.PRODUCT_PRICE_UPDATE,params);
}

// start item List 
function itemListApi(params: any): any {
    return api.create(URL.PRODUCT_ITEM_LIST,params);
}
 
//  start item Create
function itemCreateApi(params: any): any {  
    return api.create(URL.PRODUCT_ITEM_CREATE, params);
}
 
// start item Details
function itemDetailsApi(params: any): any {
    return api.create(URL.PRODUCT_ITEM_DETAILS, params);
}


//   start item Update
function itemUpdateApi(params: any): any {
    return api.create(URL.PRODUCT_ITEM_UPDATE,params);
}
  
//   start item Delete
function itemDeleteApi(params: any): any {
    return api.delete(URL.PRODUCT_ITEM_DELETE + '/' + params);
}
export { priceListApi,priceCreateApi,priceUpdateApi,itemListApi,itemCreateApi,itemUpdateApi,itemDeleteApi,itemDetailsApi}