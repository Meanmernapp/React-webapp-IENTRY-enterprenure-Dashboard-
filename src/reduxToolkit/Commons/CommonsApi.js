
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';

export const DeleteItemsApi = createAsyncThunk("commons/deleteItemsApi", async ({ tableName, body}, { dispatch, getState }) => {

    let result = await apiInstance.post(`assets-service/delete-by-ids/by-table/${tableName}`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});







