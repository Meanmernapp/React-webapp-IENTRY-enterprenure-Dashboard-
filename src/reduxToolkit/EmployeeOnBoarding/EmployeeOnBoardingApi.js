import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiInstance from "../../Apis/Axios";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/


// list of on boarding
export const GetOnBoarding = createAsyncThunk("employeeOnBoarding/getOnBoarding", async (params) => {
    // /corporate-user-pre-prod-v1/
    let response = await apiInstance.post('onboarding-service/get-all-pageable', params).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});


// get onboarding by id
export const GetOnBoardingById = createAsyncThunk("employeeOnBoarding/getOnBoardingById", async (params) => {
    // /corporate-user-pre-prod-v1/
    let response = await apiInstance.get(`onboarding-service/get-by-id/${params}`).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

//  get all zone
export const GetAllZone = createAsyncThunk("employeeOnBoarding/getallzone", async () => {

    let response = await apiInstance.get('work-shift-service/get-all/allowed-zones').then((response) => {

        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;


    return { data, status }

});

//  get all Employee
export const GetAllEmployee = createAsyncThunk("employeeOnBoarding/getallEmployee", async () => {

    let response = await apiInstance.get('employee-service/get-all/only-user-data').then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

//  Create On boarding
export const CreateOnBoarding = createAsyncThunk("employeeOnBoarding/createOnBoarding", async (params) => {

    let response = await apiInstance.post('onboarding-service/create', params).then((response) => {
        toast.success("onBoarding Created successfully")
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

// get all onbaording process

export const GetAllOnBoardingProcess = createAsyncThunk("employeeOnBoarding/getAllOnBoardingProcess", async (params) => {

    let response = await apiInstance.get(`onboarding-service/process/get-all/by-onboarding-id/${params}`).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

// create on boarding process
export const CreateOnBoardingProcess = createAsyncThunk("employeeOnBoarding/createOnBoardingProcess", async (params) => {

    let response = await apiInstance.post('onboarding-service/process/create', params).then((response) => {
        toast.success("Process created Successfully")
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

//  Create List with process
export const CreateListWithProcess = createAsyncThunk("employeeOnBoarding/createListWithProcess", async (params) => {

    let response = await apiInstance.post('onboarding-service/process/create-list', params).then((response) => {
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

// delete step
export const DeleteOnboardingProcess = createAsyncThunk("employeeOnBoarding/deleteOnboardingProcess", async (params) => {

    let response = await apiInstance.delete(`onboarding-service/process/delete-by-id/${params}`).then((response) => {
        toast.success("process delete Successfully")
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});


// update onboarding
export const UpdateOnBoarding = createAsyncThunk("employeeOnBoarding/updateOnBoarding", async (params) => {

    console.log(params)
    let response = await apiInstance.put('onboarding-service/update', params).then((response) => {
        toast.success("update Successfully")
        return response
    }).catch((error) => {
        return error.response
    })
    const { data, status } = response;
    return { data, status }

});

// get all onboarding process
//onboarding-service/process/get-all/by-onboarding-id/{onboardingId}

// get onboarding by it id
//onboarding-service/get-by-id/{id}