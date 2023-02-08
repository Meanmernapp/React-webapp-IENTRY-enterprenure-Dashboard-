import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';


export const GetCrudLogList = createAsyncThunk("logSlice/getCrudLogList", async (body, { dispatch, getState }) => {

    let result = await apiInstance.post(`log-service/crud/get-all-pageable`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});


export const GetLoginLogList = createAsyncThunk("logSlice/getLoginLogList", async (body, { dispatch, getState }) => {

    let result = await apiInstance.post(`log-service/log-in/get-all-pageable`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});
