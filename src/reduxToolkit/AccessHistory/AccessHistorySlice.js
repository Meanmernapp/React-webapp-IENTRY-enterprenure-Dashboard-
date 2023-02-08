import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const AccessHistorySlice = createSlice({
    name: "accessHistory",
    initialState: {
        UserListAccess: [],
        VehicleListAccess: [],
    },
    reducers: {},
    extraReducers: {
        ["accessHistory/getUserAccessList/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.UserListAccess = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["accessHistory/getVehicleAccessList/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.VehicleListAccess = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
    },

})

export const { } = AccessHistorySlice.actions;

export default AccessHistorySlice.reducer;