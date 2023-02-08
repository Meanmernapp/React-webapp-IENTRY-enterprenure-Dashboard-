import axios from "axios";
import { endpoints, URL } from "./Constants";
import cryptoJs from 'crypto-js';
import securekey from "../config";

const token = sessionStorage.getItem('bearerToken');
const bytes = cryptoJs.AES.decrypt(token || "no", securekey)
const bearerToken = bytes.toString(cryptoJs.enc.Utf8);

const config = {
    headers: {
        "Accept": "application/json",
        "Content-type": "multipart/form-data",
        "Authorization": "Bearer " + bearerToken,
    }
}

export const uploadImg = (formData) => {
    return axios.put(`${URL + endpoints.UPDATE_COMPANY_IMG}`, formData, config);
}

export const deleteImg = (body) => {
    return axios.delete(`${URL + endpoints.DELETE_COMPANY_IMG + body.id}/option/${body.option}`, config);
}

export const downloadImg = (body) => {
    return axios.get(`${URL + endpoints.DOWNLOAD_COMPANY_IMG + body.id}/option/${body.option}`, {
        headers: {
            "Accept": "application/json",
            "Content-type": "multipart/form-data",
            "Authorization": "Bearer " + bearerToken,
            "responseType": "blob",
        }
    });
}