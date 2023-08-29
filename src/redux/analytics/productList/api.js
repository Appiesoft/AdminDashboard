import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Product list 
function productList(params: any): any {
    return api.create(URL.PRODUCT_LIST, params);
}
export { productList }