import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const LogSlice = createSlice({
    name: "logSlice",
    initialState: {
        CrudLogList: [],
        LoginLogList: [],
    },
    reducers: {},
    extraReducers: {
        ["logSlice/getCrudLogList/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.CrudLogList = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["logSlice/getLoginLogList/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.LoginLogList = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
    },

})

export const { } = LogSlice.actions;

export default LogSlice.reducer;