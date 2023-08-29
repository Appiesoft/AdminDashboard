import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start doordesh setting list
function doordashSettingListApi(params: any): any {
    return api.get(URL.DOORDESH_SETTING_LIST, params);
}

// start doordesh setting update
function doordashSettingUpdateApi(params: any): any {
    return api.create(URL.DOORDESH_SETTING_UPDATE, params);
}


export { doordashSettingListApi, doordashSettingUpdateApi }