import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Customer Due List 
function customerDueApi(params: any): any {
    return api.create(URL.CUSTOMER_DUE, params);
}


export { customerDueApi }