import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start app list
function appSettingListApi(params: any): any {
    return api.get(URL.APP_SETTING, params);
}

// start app update
function appSettingUpdateApi(params: any): any {
    return api.create(URL.APP_SETTING_UPDATE, params);
}


export { appSettingListApi, appSettingUpdateApi }