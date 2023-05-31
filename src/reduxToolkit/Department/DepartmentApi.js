/*
Author : Arman Ali
Module: Department
github: https://github.com/Arman-Arzoo
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstanceV2 } from '../../Apis/AxiosV2';
import fileDownload from 'js-file-download'

//List all the department
export const GetAllDepartments = createAsyncThunk("departmentSection/getAllDepartments", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`department-service/get-all-pageable`,params?.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// create department
export const CreateDepartment = createAsyncThunk("departmentSection/createDepartment", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`department-service/create`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// delete department
export const DeleteDepartment = createAsyncThunk("departmentSection/deleteDepartment", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.delete(`department-service/delete-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// list of all user not belong to department
export const GetAllNonDepartmentUser = createAsyncThunk("departmentSection/getAllNonDepartmentUser", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.get(`department-service/get-all-users/who-dont-belong-to-department/by-departmentId/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// add user to department by it id
export const AddDepartmentById = createAsyncThunk("departmentSection/addDepartmentById", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.put(`department-service/add-department-by-id/${params?.id}/to-user-list`,params?.userids).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// remove all user from department
export const RemoveAlluserFromDepartment = createAsyncThunk("departmentSection/removeAlluserFromDepartment", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.put(`department-service/remove-all-users/to-department-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});
// list of all user from department with pagination
export const ListOfUsersDepartment = createAsyncThunk("departmentSection/listOfUsersDepartment", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.post(`department-service/get-all-pageable-user/by-department-id/${params?.id}`,params.pagination).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result

    return { data, status }
});
// remove all user from department
export const RemoveUserFromDepartment = createAsyncThunk("departmentSection/removeUserFromDepartment", async (params, { dispatch, getState }) => {

    let result = await apiInstanceV2.put(`department-service/remove-department/to-user-by-id/${params}`).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});