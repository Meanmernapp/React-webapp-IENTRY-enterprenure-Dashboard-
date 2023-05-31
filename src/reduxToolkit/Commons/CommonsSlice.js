import { createSlice } from "@reduxjs/toolkit";

const CommonsSlice = createSlice({
    name: "commons",
    initialState: {
        deleteItemsApi: null
        
    },
    extraReducers: {

        ["commons/deleteItemsApi/fulfilled"]: (state, action) => {

            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
            }
            else if (status >= 400 && status < 500) {
            }
        },


    },

})

export default CommonsSlice.reducer;