
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';

//Delete Items /assets-service/delete-by-ids/by-table/${table} assets-module assets-controller
export const DeleteItemsApi = createAsyncThunk("commons/deleteItemsApi", async ({ tableName, body}, { dispatch, getState }) => {

    let result = await apiInstance.post(`assets-service/delete-by-ids/by-table/${tableName}`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

//Get Media /assets-service/media/get-all assets-module assets-controller
export const GetAllMedia = createAsyncThunk("commons/getAllMedia", async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`assets-service/media/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});







