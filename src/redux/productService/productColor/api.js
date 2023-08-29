import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start color List 
function colorListApi(params: any): any {
    return api.create(URL.PRODUCT_COLOR_LIST, params);
}

//  start color Create
function colorCreateApi(params: any): any {
    return api.create(URL.PRODUCT_COLOR_CREATE, params);
}

//   start color Update
function colorUpdateApi(params: any): any {
    return api.create(URL.PRODUCT_COLOR_UPDATE, params);
}

//   start color Delete
function colorDeleteApi(params: any): any {
    return api.delete(URL.COLOR_PRODUCT_DELETE + '/' + params);
}

export { colorListApi, colorCreateApi, colorUpdateApi, colorDeleteApi }