/*
Author : Arman Ali
Module: Department
github: https://github.com/Arman-Arzoo
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstanceV2 } from '../../Apis/AxiosV2';
import { UploadImage } from "../ShareSlice/shareApi";
import { PanoramaSharp } from "@mui/icons-material";

//List all the Employee
export const GetAllVehicle = createAsyncThunk("vehicleSection/getAllVehicle", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`vehicle-company-service/get-all-pageable/by-company-id`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// @create vehicle
export const CreateVehicleEmployee = createAsyncThunk("vehicleSection/createVehicleEmployee", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`vehicle-service/create-for-company`,params?.vehicleData).then(function (response) {
        if(params?.imageFile){
            const imgData = {
                vehicle: {
                    id: response?.data?.data?.id,
                },
                accessMethod: {
                    id: "5"
                },
                description: "Face recognition"
    
            }
            dispatch(CreateVehicleImage({imgData, file: params?.imageFile}))
        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// get status of the vehicle
export const GetVehicleStatus = createAsyncThunk("vehicleSection/getVehicleStatus", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`status-service/get-all-to-vehicle`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// get tags of the vehicle
export const GetVehicleTags = createAsyncThunk("vehicleSection/getVehicleTags", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`status-service/get-all-to-tags`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// vehicle image create
export const CreateVehicleImage = createAsyncThunk("vehicleSection/createVehicleImage", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`vehicle-service/vehicle-image/create`,params?.imgData).then(function (response) {
        // this api need id, file and option
        let formData = new FormData();
        formData.append('id', response?.data?.data?.id);
        formData.append('option', "vehicle");
        formData.append('file', params?.file);
        dispatch(UploadImage(formData))
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

//@update vehicle
//get vehicle by it id
export const GetVehicleById = createAsyncThunk("vehicleSection/getVehicleById", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`vehicle-service/get-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// update vehicle data
export const UpdateVehicleEmployee = createAsyncThunk("vehicleSection/updateVehicleEmployee", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.put(`vehicle-service/update`,params?.vehicleData).then(function (response) {
        if(params?.imageFile){
            const imgData = {
                vehicle: {
                    id: response?.data?.data?.id,
                },
                accessMethod: {
                    id: "5"
                },
                description: "Face recognition"
    
            }
            dispatch(CreateVehicleImage({imgData, file: params?.imageFile}))
        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// delete vehicle image
export const DeleteVehicleImage = createAsyncThunk("vehicleSection/deleteVehicleImage", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.delete(`image-service/delete-by-id/${params?.id}/option/${params?.option}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
//@vehicle Detail 


//get all driver with relation to user and vehicle by vehicleID
export const GetAllDriverRelationship = createAsyncThunk("vehicleSection/getAllDriverRelationship", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`vehicle-company-service/user-permission/get-all/by-vehicle-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

//get all permissionType
export const PremmissionType = createAsyncThunk("vehicleSection/premmissionType", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`vehicle-company-service/permission-type/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

//add driver to vehicle
export const AddDriver = createAsyncThunk("vehicleSection/addDriver", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`vehicle-company-service/user-permission/create`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
//Remove driver to vehicle
export const RemoveDriverEmployee = createAsyncThunk("vehicleSection/removeDriverEmployee", async (params, { dispatch, getState }) => {
    let result = await apiInstanceV2.delete(`vehicle-company-service/user-permission/delete-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});


//update driver
export const UpdateDriver = createAsyncThunk("vehicleSection/updateDriver", async (params, { dispatch, getState }) => {
    let result = await apiInstanceV2.put(`vehicle-company-service/user-permission/update`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

//get list of images
export const GetListOfVehicleImages = createAsyncThunk("vehicleSection/getListOfVehicleImages", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`vehicle-service/vehicle-image/get-all-pageable/by-vehicle-id/${params?.vehicleId}`,params.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
