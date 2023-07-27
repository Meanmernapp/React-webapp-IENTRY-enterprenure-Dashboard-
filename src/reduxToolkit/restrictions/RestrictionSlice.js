import { createSlice } from "@reduxjs/toolkit";
import { restriction,getUserRestriction, getDocumentRestriction, getEventRestriction,
     getSupplierRestriction, getContractorRestriction, updateUserRestriction,
      updateDocumentRestriction, updateEventRestriction, updateSupplierRestriction,
       updateContractorRestriction, 
       getDocumentRestrictionsingle} from "../../constant/restriction";
import { toast } from "react-toastify";

const restrictionSlice = createSlice({
    name: restriction,
    initialState: {
        getUserRestriction: {},
        getDocumentRestriction:[],
        getDocumentRestrictionsingle:{},
        getEventRestriction:{},
        getSupplierRestriction:{},
        getContractorRestriction:{},
        updateUserRestriction: {},
        updateDocumentRestriction:[],
        updateEventRestriction:{},
        updateSupplierRestriction:{},
        updateContractorRestriction:{}
    },
    extraReducers: {

        // get slice
        [`${restriction}/${getUserRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getUserRestriction = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${getDocumentRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getDocumentRestriction = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${getEventRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getEventRestriction = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${getSupplierRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getSupplierRestriction = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${getContractorRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getContractorRestriction = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${getDocumentRestrictionsingle}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getDocumentRestrictionsingle = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        
        // update slice
        [`${restriction}/${updateUserRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.updateUserRestriction = data?.data
                toast.success("Successfully Updated")
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${updateDocumentRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.updateDocumentRestriction = data?.data
                toast.success("Successfully Updated")
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${updateEventRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.updateEventRestriction = data?.data
                toast.success("Successfully Updated")
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${updateSupplierRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.updateSupplierRestriction = data?.data
                toast.success("Successfully Updated")
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
        [`${restriction}/${updateContractorRestriction}/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.updateContractorRestriction = data?.data
                toast.success("Successfully Updated")
            }
            else if (status >= 400 && status < 500) {
                // toast.success("Fail to ")
            }
        },
      
    },

})

export default restrictionSlice.reducer;