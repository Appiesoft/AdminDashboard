import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Customer active passive List 
function customerDetailApi(params: any): any {
    return api.create(URL.CUSTOMER_DETAIL, params);
}


export { customerDetailApi }