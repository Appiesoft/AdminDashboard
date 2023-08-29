import CryptoJS from 'crypto-js';
import * as STRING from "../constants/string"

export const encryptedPassword = (role, password) => {
    switch (role) {
        case STRING.ADMIN:
            return CryptoJS.SHA1(password).toString();
            break;
        case STRING.EMPLOYEE:
            return CryptoJS.MD5(password).toString();
            break;
        case STRING.STORE:
            return CryptoJS.MD5(password).toString();
            break;
        default:
            throw STRING.PLEASE_SELECT_ROLE
    }
};