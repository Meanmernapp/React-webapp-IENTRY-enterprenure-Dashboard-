import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { apiInstance } from '../../Apis/Axios';
import { URL } from "../../Apis/Constants";
import cryptoJs from 'crypto-js';
import securekey from "../../config";

const config = {
    headers: {
        "Accept": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const tokenApi = createAsyncThunk("authenticationSlice/tokenApi", async (params) => {

    let result = await axios.post(`${URL}token`, params, config).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});

export const loginMiddleware = createAsyncThunk("authenticationSlice/loginMiddleware", async (authValues, thunkAPI) => {

    try {
        let response = await apiInstance.post(`authentication-service/log-in-web-app`, authValues.values);
        if (response.status === 200) {
            const userData = cryptoJs.AES.encrypt(JSON.stringify(response), securekey)
            sessionStorage.setItem("userdata", userData)
            authValues.navigate('/login-option');
            return { ...response.data };
        } else {
            return thunkAPI.rejectWithValue(response.data);
        }
    } catch (error) {
        toast.error(error.response?.data?.message)
        return thunkAPI.rejectWithValue(error.response);
    }
});


export const RoleCheck = createAsyncThunk("authenticationSlice/roleCheck", async (params) => {

    const { roleId } = params
    let result = await apiInstance.get(`role-service/role-task/get-all/by-role-id/${roleId}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});