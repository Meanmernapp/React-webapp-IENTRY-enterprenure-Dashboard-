import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const vehicleDocumentSlice = createSlice({
    name: "vehicleDocuments",
    initialState: {
        allVehicles: [],
    },
    reducers: {
        saveNormalEventDetail: (state, action) => {
            state.normalEventDetails = action.payload
        },

    },
    extraReducers: {
        ['vehicleDocuments/createVehicles/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)

            if (status >= 200 && status < 300) {
                // toast(data.message)
                // state.eventFilters = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in eventFilters")
            }
        },
        ['vehicleDocuments/getCompanyVehicles/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.allVehicles = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in eventFilters")
            }
        },
    }
})

export const {
} = vehicleDocumentSlice.actions;

export default vehicleDocumentSlice.reducer;