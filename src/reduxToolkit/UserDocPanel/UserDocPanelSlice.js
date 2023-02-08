import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const UserDocPanelSlice = createSlice({
    name: "userDocPanel",
    initialState: {
        EmployeesDocuments: [],
        ExternalDocuments: [],
    },
    reducers: {},
    extraReducers: {
        ["userDocPanel/getAllEmployeesDocuments/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.EmployeesDocuments = data
            }
            else if (status >= 400 && status < 500) {
                toast("Failed to fetch data")
            }
        },
        ["userDocPanel/getAllExternalDocuments/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.ExternalDocuments = data
            }
            else if (status >= 400 && status < 500) {
                toast("Failed to fetch data")
            }
        },
    },

})

export const { } = UserDocPanelSlice.actions;

export default UserDocPanelSlice.reducer;