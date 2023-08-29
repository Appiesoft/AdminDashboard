// @flow
import { APICore } from './apiCore';
import * as URL from "../../constants/endPoints"
import * as STRING from "../../constants/string"

const api = new APICore();

const getEndPontForLogin = (role) => {
    switch (role) {
        case STRING.ADMIN:
            return URL.ADMIN_LOGIN
            break;
        case STRING.EMPLOYEE:
            return URL.EMPLOYEE_LOGIN
            break;
        case STRING.STORE:
            return URL.STORE_LOGIN
            break;
        default:
            throw STRING.PLEASE_SELECT_ROLE
    }
}

const getPrepairLoginData = (params) => {
    switch (params.role) {
        case STRING.ADMIN:
            return { username: params.username, password: params.password, role: params.role.toUpperCase() }
            break;
        case STRING.EMPLOYEE:
            return { email: params.username, password: params.password, role: params.role.toUpperCase() }
            break;
        case STRING.STORE:
            return { login: params.username, password: params.password, role: params.role.toUpperCase() }
            break;
        default:
            throw STRING.PLEASE_SELECT_ROLE
    }
}
// account
function login(params: any): any {
    const baseUrl = getEndPontForLogin(params.role);
    return api.create(`${baseUrl}`, getPrepairLoginData(params));
}

function logout(): any {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: any): any {
    const baseUrl = '/register/';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: any): any {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: any): any {
    const baseUrl = '/password/reset/confirm/';
    return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword, forgotPasswordConfirm };
