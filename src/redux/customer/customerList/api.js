import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Customer List 
function customerListApi(params: any): any {
    return api.create(URL.CUSTOMER_LIST, params);
}

// start Customer create 
function customerCreateApi(params: any): any {
    return api.create(URL.CUSTOMER_CREATE, params);
}
// start Customer update 
function customerUpdateApi(params: any): any {
    return api.create(URL.CUSTOMER_UPDATE, params);
}

// start Customer delete
function customerDeleteApi(params: any): any {
    return api.delete(`${URL.CUSTOMER_DELETE}/${params.customerId}`);
}


export { customerListApi, customerCreateApi, customerDeleteApi, customerUpdateApi }