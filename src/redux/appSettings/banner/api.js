import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start banner list
function bannerListApi(params: any): any {
    return api.create(URL.BANNER_LIST, params);
}

// start banner create
function bannerCreateApi(params: any): any {
    return api.create(URL.BANNER_CREATE, params);
}

// start banner detail
function bannerDetailApi(params: any): any {
    return api.create(URL.BANNER_DETAIL, params);
}

// start banner update
function bannerUpdateApi(params: any): any {
    return api.create(URL.BANNER_UPDATE, params);
}

// start banner delete
function bannerDeleteApi(params: any): any {
    return api.delete(`${URL.BANNER_DELETE}/${params.bannerId}`);
}


export { bannerListApi, bannerCreateApi, bannerDetailApi, bannerUpdateApi, bannerDeleteApi, }