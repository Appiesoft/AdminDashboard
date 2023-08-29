import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Laundry Packages List 
function laundryPackagesListApi(params: any): any {
    return api.create(URL.LAUNDRY_PACKAGES_LIST, params);
}

//  start Laundry Packages Create
function laundryPackagesCreateApi(params: any): any {
    return api.create(URL.LAUNDRY_PACKAGES_CREATE, params);
}

//   start Laundry Packages Update
function laundryPackagesUpdateApi(params: any): any {
    return api.create(URL.LAUNDRY_PACKAGES_UPDATE, params);
}

//   start laundry packages Delete
function laundryPackagesDeleteApi(params: any): any {
    return api.delete(URL.LAUNDRY_PACKAGES_DELETE + '/' + params);
}

export { laundryPackagesListApi, laundryPackagesCreateApi, laundryPackagesUpdateApi, laundryPackagesDeleteApi }