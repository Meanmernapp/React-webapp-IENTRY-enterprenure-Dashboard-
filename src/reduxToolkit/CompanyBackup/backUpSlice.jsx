import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const backUpSlice = createSlice({
    name: "companyBackup",
    initialState: {
        getAllEntities: [],
        getRecordInTimePeriod:[],
        singleFileDetail:[],
        restoreDB:[]
    },
    reducers: {
        restoreSingleData: (state, action) => {
            console.log("in Soter",action.payload)
            state.singleFileDetail = action.payload
        },
        restoreDatabase: (state, action) => {
            console.log("In selected",action.payload)
            state.restoreDB = action.payload
        },

    },
    extraReducers: {
        [`dbBackUp/getAllEntities/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllEntities = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`dbBackUp/GetRecordInTimePeriod/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getRecordInTimePeriod = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
    }
})

export const {restoreSingleData,restoreDatabase} = backUpSlice.actions;

export default backUpSlice.reducer;

export const allEntities =(state) => state.BackUpSlice.getAllEntities
export const recordInTimePeriod =(state) => state.BackUpSlice.getRecordInTimePeriod

export const fileDetail =(state) => state.BackUpSlice.singleFileDetail
export const restoreData =(state) => state.BackUpSlice.restoreDB


