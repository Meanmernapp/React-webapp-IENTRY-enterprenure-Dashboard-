
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';

//Get Attributes Filter /advanced-search-service/get-all/by-module-id/{moduleId} search-module searching-controller
export const GetAttributesFilter = createAsyncThunk("search/getAttributesFilter", async ( moduleId, { dispatch, getState }) => {

    let result = await apiInstance.get(`advanced-search-service/get-all/by-module-id/${moduleId}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

//Get Condition Filter /advanced-search-service/get-all/by-module-id/{moduleId} search-module searching-controller
export const GetConditionFilter = createAsyncThunk("search/getConditionFilter", async ( typeAttribute, { dispatch, getState }) => {

    let result = await apiInstance.get(`advanced-search-service/get-operation-keys/by-type/${typeAttribute}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

//Get Values By Option and Field /advanced-search-service/{option}/{field}/values-to-filter search-module searching-controller
export const GetValuesByOptionAndField = createAsyncThunk("search/getValuesByOptionAndField", async ( { option, field }, { dispatch, getState }) => {

    let result = await apiInstance.get(`advanced-search-service/${option}/${field}/values-to-filter`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

// Get Search By Filters /advanced-search-service/{option} search-module searching-controller
export const SearchByFilters = createAsyncThunk("search/searchByFilters", async ({ option, body}, { dispatch, getState }) => {

    let result = await apiInstance.post(`advanced-search-service/${option}`, body).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});



//Get Attributes Filter /advanced-search-service/get-all/by-module-id/{moduleId} search-module searching-controller
// export const DeleteItemsApi = createAsyncThunk("commons/deleteItemsApi", async ({ tableName, body}, { dispatch, getState }) => {

//     let result = await apiInstance.post(`assets-service/delete-by-ids/by-table/${tableName}`, body).then(function (response) {
//         return response
//     }).catch(function (error) {
//         return error.response
//     })
//     const { data, status } = result
//     return { data, status }
// });

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







