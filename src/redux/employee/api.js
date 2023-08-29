import { APICore } from '../../helpers/api/apiCore';
import * as URL from "../../constants/endPoints"

const api = new APICore();

// start Employee List 
function employeeListApi(params: any): any {
    return api.create(URL.EMPLOYEE_LIST, params);
}


// start Employee Create
function employeeCreateApi(params: any): any {
    return api.create(URL.EMPLOYEE_CREATE, params);
}


// start Employee Details
function employeeDetailsApi(params: any): any {
    return api.create(URL.EMPLOYEE_DETAILS, params);
}


// start Employee Update
function employeeUpdateApi(params: any): any {
    return api.create(URL.EMPLOYEE_UPDATE, params);
}

// start Employee Delete
function employeeDeleteApi(params: any): any {
    return api.delete(`${URL.EMPLOYEE_DELETE}/${params.employeeId}`);
}


export { employeeListApi, employeeCreateApi, employeeUpdateApi, employeeDetailsApi, employeeDeleteApi }