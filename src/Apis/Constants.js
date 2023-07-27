// const production = "https://examplePage.com";
// const development = "http://localhost:3000";
// export const URL =
//     process.env.NODE_ENV === "development" ? development : production;
export const URL = "http://38.65.139.14:8081/corporate-user-pre-prod-v2/";
// export const URL = "http://192.168.50.133:8081/";

export const endpoints = {
  /* AUTH */
  TOKEN: "token",
  LOGIN: "authentication-service/log-in-web-app",
  // COMPANY DATA
  CREATE_COMPANY_DATA: "company-service/create",
  UPDATE_COMPANY_DATA: "company-service/update",
  GET_COMPANY_DATA: "company-service/get-by-id/",
  GET_ALL_COMPANIES_DATA: "get-all/",
  GET_COMPANY_RESTRUCTIONS:
    "company-service/company-restriction/get-by-company-id/",
  UPDATE_COMPANY_RESTRUCTIONS: "company-service/company-restriction/update",
  // IMAGE
  UPDATE_COMPANY_IMG: "image-service/upload",
  DELETE_COMPANY_IMG: "image-service/delete-by-id/",
  DOWNLOAD_COMPANY_IMG: "image-service/download-by-id/",
  GET_COMPANY_IMG: "image-service/upload",
  // EMPLOYEE
  CREATE_EMPLOYEE: "employee-service/create",
  GET_USER_BY_USER_ID: "employee-service/get-by-user-id/",
  PRE_REGISTER_USER: "authentication-service/pre-register-user",
  GET_EXTRA_DATA: "extra-data-service/get-by-user-id/",
  UPDATE_EXTRA_DATA: "extra-data-service/update-by-user-id/",
  EMPLOYEE_INFO: "user-service/get-by-id/",
  GET_USER_BY_EMAIL: "user-service/get-by-email/",
  GET_ALL_EMPLOYEE_PAGEABLE: "employee-service/get-all-pageable/employee-data",
  GET_ROLES: "role-service/get-all",
  GET_WORK_STATIONS: "work-shift-service/get-all/allowed-zones",
  DELETE_EMPLOYEE_BY_ID: "employee-service/delete-by-id/",
  UPDATE_USER: "user-service/update",
  ORDER_BY_EMPLOYEES: "assets-service/employee/get-filters",
  // VEHICLES
  CREATE_VEHICLE: "vehicle-service/create",
  UPDATE_VEHICLE: "vehicle-service/update",
  GET_COMPANY_VEHICLES_PAGEABLE:
    "vehicle-company-service/get-all-pageable/by-company-id",
  GET_SINGLE_VEHICLE_BY_ID: "vehicle-service/get-by-id/",
  ORDER_BY_VEHICLES: "assets-service/vehicle-company/get-filters",
  // DOCUMENST
  CREATE_EXTERNAL_DOCS: "document-service/external/create",
  CREATE_EMPLOYEE_DOCS: "document-service/employee/create",
  CREATE_VEHICLE_DOCS: "document-service/external-vehicle/create",
  GET_ALL_EXTERNAL_DOCS: "document-service/external/get-all/for-company",
  GET_ALL_EMPLOYEE_DOCS: "document-service/employee/get-all/for-company",
  GET_ALL_VEHICLE_DOCS: "document-service/external-vehicle/get-all/for-company",
  // ROLES
  ROLES_LISTING: "role-service/get-all-pageable",
  GET_EMPLOYEE_ROLES_PAGEABLE: "role-service/get-all-employees-pageable/by-id/",
  GET_ALL_ROLES_TASKS: "task-service/get-all",
  UPDATE_ROLE_RESTRICTIONS: "role-service/role-restriction/update",
  ADD_PERMISSION_TASK_LIST: "role-service/add-role-task-list",
  GET_ROLE_BY_ID: "role-service/get-by-id/",
  CREATE_ROLE: "role-service/create",
  DELETE_ROLE: "role-service/delete-by-id/",
  REMOVE_USER_ROLE: "role-service/remove-role-to-user-by-id/",
  GET_EMPLOYEES_IN_ROLE: "role-service/get-all-employees/by-id/",
  GET_ALL_EMPLOYEES_BY_COMPANY_ID: "employee-service/get-all/only-user-data",
  UPDATE_ROLE: "role-service/update",
  ADD_ROLE_TO_USER_LIST: "role-service/add-role-to-users-by-ids",
};
