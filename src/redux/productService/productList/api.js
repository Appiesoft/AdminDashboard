import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from '../../../constants/endPoints';
const api = new APICore();

// start price List
function productListApi(params: any): any {
    console.log("Api inside api :",URL.PRODUCTS)
    return api.create(URL.PRODUCTS, params);
}

export { productListApi };
