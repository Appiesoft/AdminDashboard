import { APICore } from "../../../helpers/api/apiCore"
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Admin profile
function adminProfileApi(params: any): any {
    return api.get(URL.ADMIN_PROFILE_CREATE, params);
}

// admin update 
function adminProfileUpdateApi(params: any): any {
    return api.create(URL.ADMIN_PROFILE_UPDATE, params);
}

export { adminProfileApi, adminProfileUpdateApi }