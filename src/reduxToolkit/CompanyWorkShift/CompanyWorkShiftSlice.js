import {createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const companyWorkShiftSlice = createSlice({
    name: "companyWorkShift",
    initialState: {
        createContract: [],
        AllWorkShifts:[],
        AllUserWithThisWorkAccess:[],
        AllUser:[],
        AllByWorkShiftId:[],
        updateWorkShiftName:{},
        allEmployees: [],


    },
    reducers: {
        customScduleTime: (state, { payload }) => {
            state.customSchdulTime = payload
        },
        updateAllEmployees: (state, action) => {
            state.allEmployees = action.payload
        }
    },
    extraReducers: {
        [`companyWorkShift/CreateCompanyWorkShift/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.createContract = data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        
        [`companyWorkShift/updateWorkShiftName/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.updateWorkShiftName = data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`companyWorkShift/GetAllWorkShifts/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.AllWorkShifts = data.data
            }
            else if (status >= 400 && status < 500) {
                toast.error("Fail to Fetch Work Shift")
            }
        },
        [`companyWorkShift/UserWorkSchedule/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.AllUserWithThisWorkAccess = data.data
            }
            else if (status >= 400 && status < 500) {
                toast.error("Fail to Fetch user")
            }
        },
        [`companyWorkShift/GetAllUsers/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.AllUser = data.data
            }
            else if (status >= 400 && status < 500) {
                toast.error("Fail to Fetch user")
            }
        },
        [`companyWorkShift/GetAllByWorkShiftId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.AllByWorkShiftId = data.data
            }
            else if (status >= 400 && status < 500) {
                toast.error("Fail to Fetch user")
            }
        },
        
    }
})

export const { customScduleTime,updateAllEmployees} = companyWorkShiftSlice.actions;

export const AllWorkShiftTime =(state) => state.CompanyWorkShiftSlice.AllWorkShifts;
export const getAllUserWithThisWorkAccess =(state) => state.CompanyWorkShiftSlice.AllUserWithThisWorkAccess;
export const getAllUser =(state) => state.CompanyWorkShiftSlice.AllUser;
export const getAllByWorkShiftId =(state) => state.CompanyWorkShiftSlice.AllByWorkShiftId;


export const allEmployeesData =(state) => state.CompanyWorkShiftSlice.allEmployees;

export default companyWorkShiftSlice.reducer;