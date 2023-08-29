import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start app list
function homePageSettingListApi(params: any): any {
    return api.get(URL.HOME_PAGE_SETTING, params);
}

// start app update
function homePageSettingUpdateApi(params: any): any {
    return api.create(URL.HOME_PAGE_SETTING_UPDATE, params);
}


export { homePageSettingListApi, homePageSettingUpdateApi }