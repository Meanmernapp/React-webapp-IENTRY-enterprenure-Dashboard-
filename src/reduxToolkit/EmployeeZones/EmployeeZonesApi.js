/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';
import apiInstanceV2 from "../../Apis/AxiosV2";


//List all the father zones ( pagination) (done)
export const GetListFatherZones = createAsyncThunk("employeeZones/getListFatherZones", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`zone-service/get-zones-and-children`, params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

// display all the status in the dropdown (done)
export const GetListStatusZone = createAsyncThunk("employeeZones/getListStatusZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`status-service/get-all-to-zone`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// Create Father Zone (done)
export const CreateFatherZone = createAsyncThunk("employeeZones/createFatherZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`zone-service/create-father`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// Create Child Zone (done)
export const CreateChildZone = createAsyncThunk("employeeZones/createChildZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`zone-service/create-child`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// Retrieve the information (Zone Detail) Details Common Area Sub Zones Total Access Devices and the list ( company-module zone-controller) (done)
export const ZoneDetailFatherAndChild = createAsyncThunk("employeeZones/zoneDetailFatherAndChild", async (params, { dispatch, getState }) => {
    const { zoneId } = params
    let result = await apiInstance.post(`zone-service/get-zone-father-and-children/by-zone-id/${zoneId}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// Retrieve the information (Zone Detail) Autorized Employees (done)
export const ZoneDetailAuthorizedEmployee = createAsyncThunk("employeeZones/zoneDetailAuthorizedEmployee", async (params, { dispatch, getState }) => {
    const { zoneId } = params
    let result = await apiInstance.post(`zone-service/get-all-pageable/authorized-employees/${zoneId}`
    // zone-service/get-all/authorized-employees/${zoneId}`
    , params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});
// without pagination
export const ZoneDetailAuthorizedEmployeeNoPagination = createAsyncThunk("employeeZones/zoneDetailAuthorizedEmployeeNoPagination", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`zone-service/get-all/authorized-employees/${localStorage.getItem("singlezoneId")}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// Retrieve the information (Zone Detail) List of devices (done)
export const ZoneDetailListDevice = createAsyncThunk("employeeZones/zoneDetailListDevice", async (params, { dispatch, getState }) => {
    const { zoneId } = params
    let result = await apiInstance.get(`zone-service/zone-plane/get-all/by-zone-id/${zoneId}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//update zone /update company-module zone-controller (done)

export const UpdateZone = createAsyncThunk("employeeZones/updateZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`zone-service/update`, params?.updateZoneFormData).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    if (status == 200 || status == "OK") {
        params?.navigate("/dashboard/employee/zones/singlezonedetails")
    }

    return { data, status }
});

//common-area/create company-module zone-controller (done)
export const CreateCommonAreaZone = createAsyncThunk("employeeZones/createCommonAreaZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`zone-service/common-area/create`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//common-area/update company-module zone-controller (done)
export const UpdateCommonAreaZone = createAsyncThunk("employeeZones/updateCommonAreaZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`zone-service/common-area/update`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//access-type/get-all company-module device-controller
export const GetAccessType = createAsyncThunk("employeeZones/getAccessType", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/device-access-type/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }

})

//device-type/get-all company-module device-controller

export const GetDeviceType = createAsyncThunk("employeeZones/getDeviceType", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/device-type/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }

})

//create device in Zone /create company-module device-controller

export const CreateDeviceZone = createAsyncThunk("employeeZones/createDeviceZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`device-service/create`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//create device smartlock in Zone /create company-module device-controller

export const CreateDeviceSmartlock = createAsyncThunk("employeeZones/createDeviceSmartlock", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`device-service/smart-lock/create`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//get device in Zone /get company-module device-controller

export const GetDeviceZone = createAsyncThunk("employeeZones/getDeviceZone", async (id, { dispatch, getState }) => {

    let result = await apiInstance.get(`device-service/get-by-id/${id}`).then(function (response) {
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

//delete device smartlock in Zone /delete company-module device-controller

export const DeleteDevice = createAsyncThunk("employeeZones/deleteDevice", async (id, { dispatch, getState }) => {

    let result = await apiInstance.put(`device-service/remove-device/by-id/${id}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//update device in Zone /update company-module device-controller

export const UpdateDeviceZone = createAsyncThunk("employeeZones/updateDeviceZone", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`device-service/update`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//update device smartlock in Zone /update company-module device-controller

export const UpdateDeviceSmartlock = createAsyncThunk("employeeZones/updateDeviceSmartlock", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`device-service/smart-lock/update`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});


//Call API, remove the user /user-zone/delete-by-user-id/{userId}/by-zone-id/{zoneId} company-module zone-controller

export const DeleteZoneUser = createAsyncThunk("employeeZones/deleteZoneUser", async (params, { dispatch, getState }) => {
    const { userId, zoneId } = params
    // let result = await apiInstance.delete(`zone-service/user-zone/delete-by-user-id/${userId}/by-zone-id/${zoneId}`, params).then(function (response) {
    let result = await apiInstance.post(`zone-service/user-zone/delete-by-user-id-list/by-zone-id/${zoneId}`, params?.userIds).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

//Create list with user zone relationships


export const CreateUserZoneList = createAsyncThunk("employeeZones/createUserZoneList", async (params, { dispatch, getState }) => {

    let result = await apiInstance.post(`zone-service/user-zone/create-list`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});


// display all the zone map in the dropdown (done)
export const GetListZoneMap = createAsyncThunk("employeeZones/getListZoneMap", async (params, { dispatch, getState }) => {

    const { zoneId } = params
    let result = await apiInstance.get(`zone-service/zone-plane/get-all/by-zone-id/${zoneId}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// zone-plane/create company-module zone-controller (done)
export const CreateZonePlane = createAsyncThunk("employeeZones/createZonePlane", async (params, { dispatch, getState }) => {

    const { name, zone, file, option } = params

    let result = await apiInstance.post(`zone-service/zone-plane/create`, { name, zone }).then(function (response) {

        let formData = new FormData();
        formData.append('id', response?.data?.data?.id);
        formData.append('option', "zone");
        formData.append('file', file);
        dispatch(UploadImgZonePlane(formData))

        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// upload image zone(done)
export const UploadImgZonePlane = createAsyncThunk("employeeZones/uploadImgZonePlane", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`image-service/upload`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// delele image zone plane(done)
export const DeleteimgZonePlane = createAsyncThunk("employeeZones/deleteImgZonePlane", async (params, { dispatch, getState }) => {

    const { id } = params
    let option = "zone"
    let result = await apiInstance.delete(`image-service/delete-by-id/${id}/option/${option}`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

// set-coordinates company-module device-controller
export const SetZoneImageCoordinate = createAsyncThunk("employeeZones/setZoneImageCoordinate", async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`device-service/zone-plane/set-coordinates`, params?.data).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    // if (status === 200) {
    //     params?.setMarkers({})
    // }


    return { data, status }
});

//device-server/zone-plane/get-all/by-zone-plane-id/{zonePlaneId}

export const GetZoneDevicesLists = createAsyncThunk("employeeZones/getZoneDevicesLists", async (params, { dispatch, getState }) => {

    const { zonePlaneId } = params
    let result = await apiInstance.get(`device-service/zone-plane/get-all/by-zone-plane-id/${zonePlaneId}`, params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});



