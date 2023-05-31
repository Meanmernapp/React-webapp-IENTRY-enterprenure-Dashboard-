
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';
import apiInstanceV2 from "../../Apis/AxiosV2";


// List all the posible device status in the dropdown (done)
export const GetListStatusDevice = createAsyncThunk("devices/getListStatusDevice", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`status-service/get-all-to-company`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});



//anti-pass-back-type/get-all company-module device-controller

export const GetAntiPassBackType = createAsyncThunk("devices/getAntiPassBackType", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/anti-pass-back-type/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }

})

//escort-mode/get-all company-module device-controller

export const GetEscortMode = createAsyncThunk("devices/getEscortMode", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/escort-mode/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }

})

//List all the Company Devices by id
export const GetAllDevices = createAsyncThunk("devices/getAllDevices", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`device-service/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//List all the Company Devices with zone=null by id
export const GetAllDevicesZoneNull = createAsyncThunk("devices/getAllDevicesZoneNull", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`device-service/get-all/by-zone-id-null`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//create device /create company-module device-controller

export const CreateDeviceApi = createAsyncThunk("devices/createDeviceApi", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`device-service/create`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//create airbnk-lock /create company-module device-controller

export const CreateAirbnkLock = createAsyncThunk("devices/createAirbnkLock", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`device-service/airbnk-lock/create`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//get device smartlock in Zone /get company-module device-controller

export const GetDeviceSmartlock = createAsyncThunk("employeeZones/getDeviceSmartlock", async (id, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/smart-lock/get-by-device-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//get device airbnkLock /get company-module device-controller

export const GetDeviceAirbnkLock = createAsyncThunk("devices/getDeviceAirbnkLock", async (id, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/airbnk-lock/get-by-device-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//get device details by id /get company-module device-controller

export const GetDeviceDetails = createAsyncThunk("devices/getDeviceDetails", async (id, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/get-by-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//list logs device by id /get company-module device-controller
export const GetDeviceLog = createAsyncThunk("devices/getDeviceLog", async (id, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/log/get-all/by-device-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//add free device to Zone /add company-module device-controller

export const AddFreeDevice = createAsyncThunk("devices/addFreeDevice", async (params, { dispatch, getState }) => {
    const { id, zoneId } = params;
    let result = await apiInstance.put(`device-service/add-device/by-id/${id}/to-zone-id/${zoneId}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//Update device Zone to Null /update company-module device-controller

export const RemoveDevicesZone = createAsyncThunk("devices/removeDevicesZone", async (body, { dispatch, getState }) => {

    let result = await apiInstance.put(`device-service/remove-zone/by-device-list`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//update device /update company-module device-controller

export const UpdateDeviceApi = createAsyncThunk("devices/updateDeviceApi", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`device-service/v1/app/update`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//update Airbnk /update company-module device-controller
export const UpdateAirbnk = createAsyncThunk("devices/updateAirbnk", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`device-service/airbnk-lock/update`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//Delete Airbnk /device-service/airbnk-lock/delete-by-device-id/${id} company-module device-controller
export const DeleteAirbnk = createAsyncThunk("devices/deleteAirbnk", async (id, { dispatch, getState }) => {
    let result = await apiInstance.delete(`device-service/airbnk-lock/delete-by-device-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//Delete smart-lock /device-service/smart-lock/delete-by-device-id/${id} company-module device-controller
export const DeleteSmartLock = createAsyncThunk("devices/deleteSmartLock", async (id, { dispatch, getState }) => {
    let result = await apiInstance.delete(`device-service/smart-lock/delete-by-device-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//Delete items specified for devices  /assets-service/delete-by-ids/by-table/device assets-module assets-controller
export const DeleteDevicesApi = createAsyncThunk("devices/deleteDevicesApi", async (body, { dispatch, getState }) => {

    let result = await apiInstance.post(`assets-service/delete-by-ids/by-table/device`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});






