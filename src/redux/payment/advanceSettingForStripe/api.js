import { APICore } from "../../../helpers/api/apiCore"
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Admin profile
function advanceSettingForStripeApi(params: any): any {
    return api.get(URL.ADVANCE_SETTING_FOR_STRIPE, params);
}

export { advanceSettingForStripeApi }