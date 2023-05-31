/*
Author : Arman Ali
Module: Department
github: https://github.com/Arman-Arzoo
*/
import { createSlice } from "@reduxjs/toolkit";

const vehicleSlice = createSlice({
    name: "vehicleSection",
    initialState: {
        getAllVehicle:{},
        createVehicleEmployee:{},
        getVehicleStatus:[],
        getVehicleTags:[],
        createVehicleImage:{},
        getVehicleById:{},
        updateVehicleEmployee:{},
        deleteVehicleImage:{},
        getAllDriverRelationship:[],
        premmissionType:[],
        addDriver:{},
        removeDriverEmployee:{},
        updateDriver:{},
        getListOfVehicleImages:{},
     
    },
    reducers: {
        
    },
    extraReducers: {
       
        ["vehicleSection/getAllVehicle/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllVehicle slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllVehicle = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/createVehicleEmployee/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createVehicleEmployee slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createVehicleEmployee = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/getVehicleStatus/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getVehicleStatus slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getVehicleStatus = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/getVehicleTags/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getVehicleTags slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getVehicleTags = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 

        ["vehicleSection/createVehicleImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createVehicleImage slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createVehicleImage = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/getVehicleById/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getVehicleById slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getVehicleById = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/updateVehicleEmployee/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from updateVehicleEmployee slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.updateVehicleEmployee = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        },  
        ["vehicleSection/getAllDriverRelationship/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllDriverRelationship slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllDriverRelationship = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/premmissionType/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from premmissionType slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.premmissionType = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/addDriver/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from addDriver slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.addDriver = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/removeDriverEmployee/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from removeDriverEmployee slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.removeDriverEmployee = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        },  
        ["vehicleSection/updateDriver/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from updateDriver slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.updateDriver = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/getListOfVehicleImages/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getListOfVehicleImages slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getListOfVehicleImages = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        ["vehicleSection/deleteVehicleImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from deleteVehicleImage slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.deleteVehicleImage = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        },
        
       
        
    },})

export const {  } = vehicleSlice.actions;

export default vehicleSlice.reducer;