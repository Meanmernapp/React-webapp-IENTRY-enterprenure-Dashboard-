/*
Author : Arman Ali
Module: Department
github: https://github.com/Arman-Arzoo
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstanceV2 } from '../../Apis/AxiosV2';

//List all the Employee
export const GetAllEmployees = createAsyncThunk("employeeSection/getAllEmployees", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`employee-service/get-all-pageable/employee-data`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});