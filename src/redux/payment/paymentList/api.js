import { APICore } from "../../../helpers/api/apiCore"
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Admin profile
function paymnetListApi(params: any): any {
    return api.create(URL.PAYMENT_LIST, params);
}

export { paymnetListApi }