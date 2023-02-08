import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

//slice to manage payroll state
const employeeOnBoardingSlice = createSlice({
    name: "employeeOnBoarding",
    initialState: {
        getOnBoarding: {},
        getOnBoardingById: {},
        getallzone: [],
        getallEmployee: [],
        createOnBoardingProcess: {},
        createOnBoarding: {},
        createListWithProcess: [],
        deleteOnboardingProcess: {},
        updateOnBoarding: {},
        getAllOnBoardingProcess: []



    },
    reducers: {
        ResetOnboardingById: (state, action) => {
            state.getOnBoardingById = {}
        },
        ResetOnboardingProcess: (state, action) => {
            state.getAllOnBoardingProcess = []
        }

    },
    extraReducers: {
        ['employeeOnBoarding/getOnBoarding/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getOnBoarding = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getOnBoarding")
            }
        },
        ['employeeOnBoarding/getOnBoardingById/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getOnBoardingById = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getOnBoardingById")
            }
        },
        ['employeeOnBoarding/getallzone/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getallzone = data?.data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getallzone")
            }
        },
        ['employeeOnBoarding/getallEmployee/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getallEmployee = data?.data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getallEmployee")
            }
        },
        ['employeeOnBoarding/createOnBoardingProcess/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.createOnBoardingProcess = data?.data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createOnBoardingProcess")
            }
        },
        ['employeeOnBoarding/createOnBoarding/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.createOnBoarding = data?.data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createOnBoarding")
            }
        },
        ['employeeOnBoarding/createListWithProcess/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.createListWithProcess = data?.data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createListWithProcess")
            }
        },
        ['employeeOnBoarding/deleteOnboardingProcess/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.deleteOnboardingProcess = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in deleteOnboardingProcess")
            }
        },
        ['employeeOnBoarding/updateOnBoarding/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.updateOnBoarding = data?.data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in updateOnBoarding")
            }
        },
        ['employeeOnBoarding/getAllOnBoardingProcess/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getAllOnBoardingProcess = data?.data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getAllOnBoardingProcess")
            }
        },

    }
})

export const { ResetOnboardingById, ResetOnboardingProcess } = employeeOnBoardingSlice.actions;

export default employeeOnBoardingSlice.reducer;