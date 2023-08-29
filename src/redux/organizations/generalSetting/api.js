import { APICore } from "../../../helpers/api/apiCore"
import * as URL from "../../../constants/endPoints"

const api = new APICore()


function generalSettingApi(params: any): any {
    return api.get(URL.GENERAL_SETTING, params);
}


function generalSettingUpdateApi(params: any): any {
    return api.create(URL.GENERAL_UPDATE, params);
}

export { generalSettingApi, generalSettingUpdateApi }