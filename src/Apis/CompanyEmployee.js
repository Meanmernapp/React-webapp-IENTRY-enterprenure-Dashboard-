
import apiInstance from "./Axios";
import { endpoints } from "./Constants";
const {
    CREATE_EMPLOYEE,
    GET_USER_BY_USER_ID,
    PRE_REGISTER_USER,
    GET_EXTRA_DATA,
    UPDATE_EXTRA_DATA,
    EMPLOYEE_INFO,
    GET_USER_BY_EMAIL,
    GET_ALL_EMPLOYEE_PAGEABLE,
    GET_ROLES,
    GET_WORK_STATIONS,
    DELETE_EMPLOYEE_BY_ID,
    UPDATE_USER,
    ORDER_BY_EMPLOYEES,
} = endpoints;


export const createEmployee = (empObj) => apiInstance.post(CREATE_EMPLOYEE, empObj);

export const getUserByUserId = (id) => apiInstance.get(GET_USER_BY_USER_ID + id);

export const preRegisterUser = async (preRegisteredBody) => {

    let response = await apiInstance.post(`authentication-service/pre-register-user`, preRegisteredBody).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    // const { data, status } = response;
    return response
}


export const getExtraData = (id) => apiInstance.get(GET_EXTRA_DATA + id);

export const UpdateExtraData = (body, id) => apiInstance.put(UPDATE_EXTRA_DATA + id, body);

export const employeeInfo = (id) => apiInstance.get(EMPLOYEE_INFO + id);

export const getUserByEmail = (email) => apiInstance.get(GET_USER_BY_EMAIL + email);

export const getAllCompanyEmployees = (body) => apiInstance.post(
    GET_ALL_EMPLOYEE_PAGEABLE,
    body
);

export const getRoles = () => apiInstance.get(GET_ROLES);

export const getWorkStations = () => apiInstance.get(GET_WORK_STATIONS);

export const deleteUser = (id) => apiInstance.post(DELETE_EMPLOYEE_BY_ID + id);

export const updateUser = (body) => apiInstance.put(UPDATE_USER, body.user);

export const orderByEmployees = () => apiInstance.get(ORDER_BY_EMPLOYEES);
