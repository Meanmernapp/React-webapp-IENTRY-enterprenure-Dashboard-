/*
Author : Arman Ali
Module: Shared State
github: https://github.com/Arman-Arzoo
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../Apis/Axios";

//List all the Employee
export const UploadImage = createAsyncThunk("sharedSlice/uploadImage", async (params, { dispatch, getState }) => {
    
    let result = await apiInstance.put(`image-service/upload`,params).then(function (response) {

        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log("dfkjdkljfl",result)

    return { data, status }
});

