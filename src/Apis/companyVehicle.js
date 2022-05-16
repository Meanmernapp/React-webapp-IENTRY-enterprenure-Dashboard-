import axios from "axios";
import { endpoints, URL } from "./Constants";

const config = {
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("bearerToken"),
    }
}

export const createVehicle = (body) => {
    return axios.post(
        `http://182.176.161.38:8080/corporate-user-pre-prod-v1/vehicle-service/create?companyId=${body.companyId}&email=${body.email}&userId=${body.userId}`,
        body.vehicle,
        config
    )
}

export const updateVehicle = (body) => {
    return axios.put(
        `http://182.176.161.38:8080/corporate-user-pre-prod-v1/vehicle-service/update?companyId=${body.companyId}&email=${body.email}&userId=${body.userId}`,
        body.vehicle,
        config
    )
}

export const getAllCompanyVehicles = (body) => {

    return axios.post(
        `http://182.176.161.38:8080/corporate-user-pre-prod-v1/vehicle-company-service/get-all-pageable/by-company-id?companyId=${body.companyId}&email=${body.email}&userId=${body.userId}&userTypes=${body.userTypes}`,
        body.pagination,
        config
    )
}

export const getVehicleByVehicleId = (id) => {

    return axios.get(
        `http://182.176.161.38:8080/corporate-user-pre-prod-v1/vehicle-service/get-by-id/${id}`,
        config
    )
}