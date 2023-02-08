import apiInstance from "./Axios";
import { endpoints } from "./Constants";
const {
    CREATE_VEHICLE,
    UPDATE_VEHICLE,
    GET_COMPANY_VEHICLES_PAGEABLE,
    GET_SINGLE_VEHICLE_BY_ID,
    ORDER_BY_VEHICLES
} = endpoints;

export const createVehicle = (body) => apiInstance.post(CREATE_VEHICLE, body.vehicle);

export const updateVehicle = (body) => apiInstance.put(UPDATE_VEHICLE, body.vehicle);

export const getAllCompanyVehicles = (pagination) => apiInstance.post(
    GET_COMPANY_VEHICLES_PAGEABLE,
    pagination
);

export const getVehicleByVehicleId = (id) => apiInstance.get(GET_SINGLE_VEHICLE_BY_ID + id);

export const orderByVehicles = () => apiInstance.get(ORDER_BY_VEHICLES);
