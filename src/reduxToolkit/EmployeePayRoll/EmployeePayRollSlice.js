import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

//slice to manage payroll state
const employeePayrollSlice = createSlice({
    name: "employeePayRoll",
    initialState: {
        // employee state
        getAllEmployeesPayroll: [],
        getAllSelectedEmployees: [],
        addEmployeesToListPayroll: {},
        deleteEmployeesToListPayroll: {},

        // device state
        getAllDevicePayroll: [],
        getAllSelectedDevice: [],
        addDeviceToListPayroll: {},
        deleteDeviceToListPayroll: {},

        // email setting
        getEmailSetting: [],
        updateEmailSetting: {},

        // change time and checkbox
        changeTimeAndSelectedDaysUpdate: {},
        getAllListOfAccess: {
            content: []
        }

    },
    reducers: {
        ClearDeleteEmployeesToListPayroll: (state, action) => {
            state.deleteEmployeesToListPayroll = false
        },
        ClearDeleteDeviceToListPayroll: (state, action) => {
            state.deleteDeviceToListPayroll = false
        },
    },
    extraReducers: {

        ['employeePayRoll/getAllListOfAccess/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getAllListOfAccess = data
            } else if (status >= 400 && status < 500) {
                // toast("Something went wrong in getAllListOfAccess")
            }
        },
        // employee payroll slice
        ['employeePayRoll/getAllEmployeesPayroll/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getAllEmployeesPayroll = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getAllEmployeesPayroll")
            }
        },
        ['employeePayRoll/getAllSelectedEmployees/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getAllSelectedEmployees = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getAllSelectedEmployees")
            }
        },
        ['employeePayRoll/addEmployeesToListPayroll/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.addEmployeesToListPayroll = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in addEmployeesToListPayroll")
            }
        },
        ['employeePayRoll/deleteEmployeesToListPayroll/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.deleteEmployeesToListPayroll = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in deleteEmployeesToListPayroll")
            }
        },

        //device payroll slice
        ['employeePayRoll/getAllDevicePayroll/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getAllDevicePayroll = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getAllDevicePayroll")
            }
        },
        ['employeePayRoll/getAllSelectedDevice/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getAllSelectedDevice = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getAllSelectedDevice")
            }
        },
        ['employeePayRoll/addDeviceToListPayroll/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.addDeviceToListPayroll = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in addDeviceToListPayroll")
            }
        },
        ['employeePayRoll/deleteDeviceToListPayroll/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.deleteDeviceToListPayroll = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in deleteDeviceToListPayroll")
            }
        },

        // email setting payroll slice
        ['employeePayRoll/getEmailSetting/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getEmailSetting = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getEmailSetting")
            }
        },
        ['employeePayRoll/updateEmailSetting/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.updateEmailSetting = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in updateEmailSetting")
            }
        },
        // change the time or checkbox payroll
        ['employeePayRoll/changeTimeAndSelectedDaysUpdate/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.changeTimeAndSelectedDaysUpdate = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in changeTimeAndSelectedDaysUpdate")
            }
        }

    }
})

export const {
    ClearDeleteEmployeesToListPayroll,
    ClearDeleteDeviceToListPayroll
} = employeePayrollSlice.actions;

export default employeePayrollSlice.reducer;