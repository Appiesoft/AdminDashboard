import EmployeeActionTypes from './constant';

type AuthAction = { type: string, payload: {} | string };

// start employee list
export const employeeList = (data): AuthAction => ({
    type: EmployeeActionTypes.GET_EMPLOYEE_LIST,
    payload: data,
});

// start employee create
export const employeeCreate = (data): AuthAction => ({
    type: EmployeeActionTypes.CREATE_EMPLOYEE,
    payload: { ...data },
});

// start employee details
export const employeeDetails = (data): AuthAction => ({
    type: EmployeeActionTypes.DETAILS_EMPLOYEE,
    payload: { ...data },
});

// start employee update
export const employeeUpdate = (data): AuthAction => ({
    type: EmployeeActionTypes.UPDATE_EMPLOYEE,
    payload: { ...data },
});

// start employee delete
export const employeeDelete = (data): AuthAction => ({
    type: EmployeeActionTypes.DELETE_EMPLOYEE,
    payload: { ...data },
});

export const employeeDetailsReset = () => ({
    type: EmployeeActionTypes.EMPLOYEE_DETAILS_RESET,
});
