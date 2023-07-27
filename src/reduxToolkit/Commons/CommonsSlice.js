import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const CommonsSlice = createSlice({
    name: "commons",
    initialState: {
        deleteItemsApi: null,
        getAllMedia: []
    },
    extraReducers: {

        ["commons/deleteItemsApi/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.deleteItemsApi = data || true
                toast.success("Deleted Successfully")
            }
            else if (status >= 400 && status < 500) {
                toast.success("Fail to delete Records")
            }
        },
        ["commons/getAllMedia/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllMedia = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
    },

})

export default CommonsSlice.reducer;