import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Customer active passive List 
function customerActiveListApi(params: any): any {
    return api.create(URL.CUSTOMER_ACTIVE_LIST, params);
}


export { customerActiveListApi }