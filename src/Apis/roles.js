import apiInstance from "./Axios";
import { endpoints } from "./Constants";

const {
    ROLES_LISTING,
    GET_EMPLOYEE_ROLES_PAGEABLE,
    GET_ALL_ROLES_TASKS,
    UPDATE_ROLE_RESTRICTIONS,
    ADD_PERMISSION_TASK_LIST,
    GET_ROLE_BY_ID,
    CREATE_ROLE,
    DELETE_ROLE,
    REMOVE_USER_ROLE,
    GET_EMPLOYEES_IN_ROLE,
    GET_ALL_EMPLOYEES_BY_COMPANY_ID,
    UPDATE_ROLE,
    ADD_ROLE_TO_USER_LIST,
} = endpoints;

export const rolesListing = (body) => apiInstance.post(ROLES_LISTING, body);

export const getAllroleEmployeesPageable = (body) => apiInstance.post(
    GET_EMPLOYEE_ROLES_PAGEABLE + body.id,
    body.pagination
);

export const getAllRoleTasks = () => apiInstance.get(GET_ALL_ROLES_TASKS);

export const updateRoleRestriction = (body) => apiInstance.put(UPDATE_ROLE_RESTRICTIONS, body);

export const addPermissionTask = (body) => apiInstance.post(ADD_PERMISSION_TASK_LIST, body);

export const getRoleById = (roleId) => apiInstance.get(GET_ROLE_BY_ID + roleId);

export const createRole = (body) => apiInstance.post(CREATE_ROLE, body);

export const deleteRole = (roleId) => apiInstance.delete(DELETE_ROLE + roleId);

export const removeUserRole = (employeeId) => apiInstance.put(REMOVE_USER_ROLE + employeeId);

export const getAllEmployeesByRoleId = (roleId) => apiInstance.get(GET_EMPLOYEES_IN_ROLE + roleId);

export const getAllEmployeesByCompanyId = () => apiInstance.get(GET_ALL_EMPLOYEES_BY_COMPANY_ID);

export const updateRole = (body) => apiInstance.put(UPDATE_ROLE, body);

export const addRoleUserList = (body) => apiInstance.put(ADD_ROLE_TO_USER_LIST, body);