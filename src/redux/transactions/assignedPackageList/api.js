import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"
import * as STRING from "../../../constants/string"
const api = new APICore();

// start assignedPackageListApi List 
function assignedPackageListApi(params: any): any {
    return api.create(URL.ASSIGNED_PACKAGE_LIST, params);
}

// start AssignPackage Create
function assignedPackageCreateApi(params: any): any {
    return api.create(URL.ASSIGNED_PACKAGE_CREATE, params);
}

// start AssignPackage Delete
function assignedPackageDeleteApi(params: any): any {
    return api.delete(`${URL.ASSIGNED_PACKAGE_DELETE}/${params.assignId}`);
}

export { assignedPackageListApi, assignedPackageCreateApi, assignedPackageDeleteApi }   