import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"
import * as STRING from "../../../constants/string"

const api = new APICore();

// start Employee List 
function packageListApi(params: any): any {
    return api.create(URL.PACKAGE_LIST, params);
}

export { packageListApi}