import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"
 
const api = new APICore();

// start upcharges List 
function upchargesListApi(params: any): any {
    return api.create(URL.PRODUCT_UPCHARGES_LIST,params);
}
 
//  start upcharges Create
function upchargesCreateApi(params: any): any {  
    return api.create(URL.PRODUCT_UPCHARGES_CREATE, params);
}
 
//   start upcharges Update
function upchargesUpdateApi(params: any): any {
    return api.create(URL.PRODUCT_UPCHARGES_UPDATE,params);
}
  
//   start upcharges Delete
function upchargesDeleteApi(params: any): any {
    return api.delete(URL.PRODUCT_UPCHARGES_DELETE + '/' + params);
}

export { upchargesListApi,upchargesCreateApi,upchargesUpdateApi,upchargesDeleteApi}