import axios from "axios";
import { endpoints, URL, COMPANY_DATA_URL, COMPANY_RESTUCTION_URL } from "./Constants";

const bearerToken = sessionStorage.getItem("bearerToken");
// const useData = sessionStorage.getItem("userdata");
// var id = useData.data.id

const config = {
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + bearerToken,
    }
}


export const createCompanyData = (body) => {
    return axios.get(COMPANY_DATA_URL + endpoints.CREATECOMPANYDATA + body, config);
}

export const updateCompanyData = (body) => {
    return axios.put(COMPANY_DATA_URL + endpoints.UPDATECOMPANYDATA, body, config);
}

export const getCompanyData = (id) => {
    return axios.get(COMPANY_DATA_URL + endpoints.GETCOMPANYDATA + id, config);
}

export const getAllCompaniesData = () => {
    return axios.get(COMPANY_DATA_URL + endpoints.GETCOMPANYDATA, config);
}

export const getComopanyRestructions = (id) => {
    return axios.get(COMPANY_RESTUCTION_URL + endpoints.GETCOMPANYRESTRUCTIONS + id, config);
}


export const updateComopanyRestructions = (body) => {
    return axios.put(COMPANY_RESTUCTION_URL + endpoints.UPDATECOMPANYRESTRUCTIONS, body, config);
}

export const updateComopanyImg = (formData) => {
    return axios.put(`${URL + endpoints.UPDATECOMPANYIMG}`, formData, {
        headers: {
            "Accept": "application/json",
            "Content-type": "multipart/form-data",
            "Authorization": "Bearer " + bearerToken,
        },
    }
    );
}