import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';


export const createVehicle = createAsyncThunk("companyVehicles/createVehicle", async (body, { dispatch, getState }) => {

    let result = await apiInstance.post(`vehicle-service/create-for-company`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

export const updateVehicle = createAsyncThunk("companyVehicles/updateVehicle", async (body, { dispatch, getState }) => {

    let result = await apiInstance.put(`vehicle-service/update`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

export const updateCompanyVehicle = createAsyncThunk("companyVehicles/updateCompanyVehicle", async (body, { dispatch, getState }) => {

    let result = await apiInstance.post(`vehicle-company-service/update`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

export const singleVehicleDetail = createAsyncThunk("companyVehicles/singleVehicleDetail", async (id, { dispatch, getState }) => {

    let result = await apiInstance.get(`vehicle-company-service/get-by-vehicle-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

export const ImagesByVehicleId = createAsyncThunk("companyVehicles/ImagesByVehicleId", async (body, { dispatch, getState }) => {

    let result = await apiInstance.post(`vehicle-service/vehicle-image/get-all-pageable/by-vehicle-id/${body?.id}`, body.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

export const createVehicleImgObject = createAsyncThunk("companyVehicles/createVehicleImgObject", async (body, { dispatch, getState }) => {

    let result = await apiInstance.post(`vehicle-service/vehicle-image/create`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

export const downloadVehicleImages = createAsyncThunk("companyVehicles/downloadVehicleImages", async (id) => {

    let result = await apiInstance.get(`image-service/download-by-id/${id}/option/vehicle`, {
        responseType: 'blob'
    }).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })

    const { data, status } = result
    return { data, status }
});


