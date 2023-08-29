import DriverActionTypes from "./constant";
type AuthAction = { type: string, payload: {} | string };

export const driverList = (data): AuthAction => ({
    type: DriverActionTypes.GET_DRIVER_LIST,
    payload: { ...data }
})
