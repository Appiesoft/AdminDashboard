import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Payment setting List 
function paymentSettingtApi(params: any): any {
    return api.get(URL.PAYMENT_SETTING_LIST, params);
}



export { paymentSettingtApi }