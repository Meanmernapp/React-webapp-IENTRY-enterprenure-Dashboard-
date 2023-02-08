import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const headersSlice = createSlice({
    name: "headers",
    initialState: {
        headersList: [],
    },
    reducers: {},
    extraReducers: {
        ["headers/GetHeaders/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.headersList = data?.data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["headers/UpdateHeaders/fulfilled"]: (state, action) => {
            const { status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("headers updated successfully")
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to update")
            }
        },
    },

})

export const { } = headersSlice.actions;

export default headersSlice.reducer;