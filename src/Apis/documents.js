import apiInstance from "./Axios";
import { endpoints } from "./Constants";

const {
    CREATE_EXTERNAL_DOCS,
    CREATE_EMPLOYEE_DOCS,
    CREATE_VEHICLE_DOCS,
    GET_ALL_EXTERNAL_DOCS,
    GET_ALL_EMPLOYEE_DOCS,
    GET_ALL_VEHICLE_DOCS,
} = endpoints;


// creating docs
export const createExternalDocuments = (body) => apiInstance.post(
    CREATE_EXTERNAL_DOCS,
    body
);

export const createEmployeeDocuments = (body) => apiInstance.post(
    CREATE_EMPLOYEE_DOCS,
    body
);

export const createExternalVehicleDocuments = (body) => apiInstance.post(
    CREATE_VEHICLE_DOCS,
    body
);

// geting docs
export const getAllExternalDocuments = (body) => apiInstance.post(GET_ALL_EXTERNAL_DOCS, body);

export const getAllEmployeesDocuments = () => apiInstance.get(GET_ALL_EMPLOYEE_DOCS);

export const getAllExternalVehicleDocuments = (body) => apiInstance.post(GET_ALL_VEHICLE_DOCS, body);
