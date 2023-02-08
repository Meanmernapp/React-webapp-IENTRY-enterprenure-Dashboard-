import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../Apis/Axios";

export const createVehicles = createAsyncThunk("vehicleDocuments/createVehicles", async (body) => {

    const options = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            // console.log(`${loaded}kb of ${total}kb | ${percent}%`);

            // if (percent < 100) {
            //     this.setState({ uploadPercentage: percent })
            // }
        }
    }

    let response = await apiInstance.post(`document-service/external-vehicle/create`, body, options).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

export const getCompanyVehicles = createAsyncThunk("vehicleDocuments/getCompanyVehicles", async (body) => {

    let response = await apiInstance.post(`document-service/external-vehicle/get-all/for-company`, body).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});