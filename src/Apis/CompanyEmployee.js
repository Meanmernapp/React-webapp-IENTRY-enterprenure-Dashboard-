import axios from "axios";
import { endpoints, URL } from "./Constants";

const config = {
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("bearerToken"),
    }
}

export const createEmployee = (empObj) => {
    return axios.post(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/user-company-service/create',
        empObj,
        config
    )
}

export const getUserByUserId = (id) => {
    return axios.get(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/user-company-service/get-by-user-id/' + id,
        config
    )
}

export const preRegisterUser = async (preRegisteredBody) => {
    return axios.post(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/authentication-service/pre-register-user',
        preRegisteredBody,
        config
    )
}

export const getExtraData = (id) => {
    return axios.get(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/extra-data-service/get-by-user-id/' + id,
        config
    )
}

export const UpdateExtraData = (body, id) => {
    return axios.put(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/extra-data-service/update-by-user-id/' + id,
        body,
        config
    )
}

export const employeeInfo = (id) => {

    return axios.get(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/user-service/get-by-id/' + id,
        config
    )
}

export const getUserByEmail = (email) => {

    return axios.get(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/user-service/get-by-email/' + email,
        config
    )
}

export const getAllCompanyEmployees = (body) => {

    return axios.post(
        `http://182.176.161.38:8080/corporate-user-pre-prod-v1/user-company-service/get-all-pageable/by-company-id?companyId=${body.companyId}&email=${body.email}&userId=${body.userId}&userTypes=${body.userTypes}`,
        body.pagination,
        config
    )
}

export const getRoles = (body) => {

    return axios.get(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/role-service/get-all',
        config
    )

}

export const getWorkStations = (body) => {

    return axios.post(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/zone-service/get-all/allowed-zones',
        body,
        config
    )
}

export const deleteUser = (id) => {

    return axios.post(
        'http://182.176.161.38:8080/corporate-user-pre-prod-v1/user-company-service/delete-by-id/' + id,
        config
    )
}

export const updateUser = (body) => {

    console.log(body)
    return axios.put(
        `http://182.176.161.38:8080/corporate-user-pre-prod-v1/user-service/update?companyId=${body.companyId}&email=${body.email}&userId=${body.userId}&userTypes=${body.userTypes}`,
        body.user,
        config
    )
}