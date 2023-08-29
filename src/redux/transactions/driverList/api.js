import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"


const api = new APICore();

function driverListApi(params: any): any {
    return api.create(URL.DRIVER_LIST, params);
}

export { driverListApi }   