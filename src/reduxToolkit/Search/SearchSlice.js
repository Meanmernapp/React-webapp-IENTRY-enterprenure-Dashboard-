import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
    name: "search",
    initialState: {
        getAttributesFilter: [],
        getConditionFilter: [],
        getValuesByOptionAndField: [],
        searchByFilters: []
    },
    extraReducers: {

        // ["commons/deleteItemsApi/fulfilled"]: (state, action) => {
        //     const { data, status } = action.payload || {}
        //     if (status >= 200 && status < 300) {
        //     }
        //     else if (status >= 400 && status < 500) {
        //     }
        // },
        ["search/getAttributesFilter/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAttributesFilter = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        ["search/getConditionFilter/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getConditionFilter = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        ["search/getValuesByOptionAndField/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getValuesByOptionAndField = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        ["search/searchByFilters/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.searchByFilters = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
    },

})

export default SearchSlice.reducer;