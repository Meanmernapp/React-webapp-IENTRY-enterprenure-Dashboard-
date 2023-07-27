
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from '../../Apis/Axios';
import { restriction,getUserRestriction, getDocumentRestriction, 
    getEventRestriction, getSupplierRestriction, getContractorRestriction, updateUserRestriction, updateDocumentRestriction, updateEventRestriction, updateSupplierRestriction, updateContractorRestriction, getDocumentRestrictionsingle,
} from "../../constant/restriction";

// gets api
export const GetUserRestriction = createAsyncThunk(`${restriction}/${getUserRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`user-service/restriction/get`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

export const GetDocumentRestriction = createAsyncThunk(`${restriction}/${getDocumentRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`assets-service/media/get-all`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});
// get
export const GetDocumentRestrictionsingle = createAsyncThunk(`${restriction}/${getDocumentRestrictionsingle}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`document-service/restriction/get`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});
export const GetEventRestriction = createAsyncThunk(`${restriction}/${getEventRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`event-service/restriction/get`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

export const GetSupplierRestriction = createAsyncThunk(`${restriction}/${getSupplierRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`supplier-service/restriction/get`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

export const GetContractorRestriction = createAsyncThunk(`${restriction}/${getContractorRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.get(`contractor-service/restriction/get`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

// update api
export const UpdateUserRestriction = createAsyncThunk(`${restriction}/${updateUserRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`user-service/restriction/update`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

export const UpdateDocumentRestriction = createAsyncThunk(`${restriction}/${updateDocumentRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`document-service/restriction/update`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

export const UpdateEventRestriction = createAsyncThunk(`${restriction}/${updateEventRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`event-service/restriction/update`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

export const UpdateSupplierRestriction = createAsyncThunk(`${restriction}/${updateSupplierRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`supplier-service/restriction/update`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});

export const UpdateContractorRestriction = createAsyncThunk(`${restriction}/${updateContractorRestriction}`, async (params, { dispatch, getState }) => {

    let result = await apiInstance.put(`contractor-service/restriction/update`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    return { data, status }
});









