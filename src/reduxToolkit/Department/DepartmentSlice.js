/*
Author : Arman Ali
Module: Department
github: https://github.com/Arman-Arzoo
*/
import { createSlice } from "@reduxjs/toolkit";

const departmentSectionSlice = createSlice({
    name: "departmentSection",
    initialState: {
        getAllDepartments:{},
        createDepartment:{},
        deleteDepartment:{},
        getAllNonDepartmentUser:[],
        addDepartmentById:{},
        removeAlluserFromDepartment:{},
        listOfUsersDepartment:{},
        removeUserFromDepartment:{}

    },
    reducers: {
        
    },
    extraReducers: {
        ["departmentSection/getAllDepartments/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllDepartments slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllDepartments = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["departmentSection/createDepartment/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createDepartment slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createDepartment = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["departmentSection/deleteDepartment/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from deleteDepartment slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.deleteDepartment = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["departmentSection/getAllNonDepartmentUser/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllNonDepartmentUser slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllNonDepartmentUser = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["departmentSection/addDepartmentById/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from addDepartmentById slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.addDepartmentById = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["departmentSection/removeAlluserFromDepartment/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from removeAlluserFromDepartment slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.removeAlluserFromDepartment = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["departmentSection/listOfUsersDepartment/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from listOfUsersDepartment slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.listOfUsersDepartment = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["departmentSection/removeUserFromDepartment/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from removeUserFromDepartment slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.removeUserFromDepartment = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        
    },})

export const {  } = departmentSectionSlice.actions;

export default departmentSectionSlice.reducer;