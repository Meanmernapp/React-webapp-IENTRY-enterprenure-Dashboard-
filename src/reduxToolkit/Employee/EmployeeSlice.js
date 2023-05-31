/*
Author : Arman Ali
Module: Department
github: https://github.com/Arman-Arzoo
*/
import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: "employeeSection",
    initialState: {
        getAllEmployees:{},
   

    },
    reducers: {
        
    },
    extraReducers: {
       
        ["employeeSection/getAllEmployees/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllEmployees slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllEmployees = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        
    },})

export const {  } = employeeSlice.actions;

export default employeeSlice.reducer;