import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiInstance from "../../Apis/Axios";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

// payroll pagenation


export const GetAllListOfAccess = createAsyncThunk("employeePayRoll/getAllListOfAccess", async (params) => {

    let response = await apiInstance.post(`log-service/user-access/get-all-pageable/from/${params?.from}/to/${params?.to}`, params.pagination).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});
// device Api payroll


export const GetAllDevicePayroll = createAsyncThunk("employeePayRoll/getAllDevicePayroll", async () => {

    let response = await apiInstance.get('device-service/get-all').then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

export const GetAllSelectedDevice = createAsyncThunk("employeePayRoll/getAllSelectedDevice", async () => {

    let response = await apiInstance.get('email-settings-service/device-email/get-all/only-device-data').then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

export const AddDeviceToListPayroll = createAsyncThunk("employeePayRoll/addDeviceToListPayroll", async (params) => {

    let response = await apiInstance.post('email-settings-service/device-email/create', params).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

export const DeleteDeviceToListPayroll = createAsyncThunk("employeePayRoll/deleteDeviceToListPayroll", async (params) => {

    let response = await apiInstance.delete(`email-settings-service/device-email/delete-by-device-id/${params}`).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

// employee Api payroll

export const GetAllEmployeesPayroll = createAsyncThunk("employeePayRoll/getAllEmployeesPayroll", async () => {

    let response = await apiInstance.get('employee-service/get-all/only-user-data').then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

export const GetAllSelectedEmployees = createAsyncThunk("employeePayRoll/getAllSelectedEmployees", async (params) => {

    let response = await apiInstance.post('email-settings-service/user-email/get-all-pageable/only-user-data', params).then((response) => {

        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;

    console.log(response)

    return { data, status }

});

export const AddEmployeesToListPayroll = createAsyncThunk("employeePayRoll/addEmployeesToListPayroll", async (params) => {

    let response = await apiInstance.post('email-settings-service/user-email/create', params).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

export const DeleteEmployeesToListPayroll = createAsyncThunk("employeePayRoll/deleteEmployeesToListPayroll", async (params) => {

    let response = await apiInstance.delete(`email-settings-service/user-email/delete-by-user-id/${params}`).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});


// Email setting Api Payroll

export const GetEmailSetting = createAsyncThunk("employeePayRoll/getEmailSetting", async () => {

    let response = await apiInstance.get('email-settings-service/get').then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

export const UpdateEmailSetting = createAsyncThunk("employeePayRoll/updateEmailSetting", async (params, { dispatch, getState }) => {

    let response = await apiInstance.put('email-settings-service/update', params).then((response) => {
        toast.success("Update Email Setting Successfully")
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

// change the time or checkbox payroll
export const ChangeTimeAndSelectedDaysUpdate = createAsyncThunk("employeePayRoll/changeTimeAndSelectedDaysUpdate", async (params, { dispatch, getState }) => {

    let response = await apiInstance.put('email-settings-service/update', params).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});