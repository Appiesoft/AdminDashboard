import { APICore } from "../../../helpers/api/apiCore"
import * as URL from "../../../constants/endPoints"

const api = new APICore()

function groupsApi(params: any): any {
    return api.get(URL.GROUP_LIST, params);
}

function groupCreateApi(params: any): any {
    return api.create(URL.GROUP_CREATE, params);
}

function groupUpdateApi(params: any): any {
    return api.create(URL.GROUP_UPDATE, params);
}

function groupDeleteApi(params: any): any {
    return api.delete(`${URL.GROUP_DELETE}/${params.groupsId}`);
}

export { groupsApi, groupCreateApi, groupUpdateApi, groupDeleteApi }