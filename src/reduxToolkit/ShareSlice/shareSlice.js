/*
Author : Arman Ali
Module: Department
github: https://github.com/Arman-Arzoo
*/
import { createSlice } from "@reduxjs/toolkit";

const vehicleSlice = createSlice({
    name: "sharedSlice",
    initialState: {
        uploadImage:{},
        changeCount:0
       
   

    },
    reducers: {
        
    },
    extraReducers: {
       
        ["sharedSlice/uploadImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from uploadImage slice ", data)
            let count = 0;
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.changeCount = count + 1;
                state.uploadImage = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to fetch data")
            }
        }, 
        
        
    },})

export const {  } = vehicleSlice.actions;

export default vehicleSlice.reducer;