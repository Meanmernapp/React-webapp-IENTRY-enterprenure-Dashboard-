import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const documentPanelSlice = createSlice({
    name: "documentPanel",
    initialState: {
        getAllEmployeeDoc:[],
        getAllSupplierDoc:[],
        getAllContractorDoc:[],
        downloadDocumentById:{},
        deleteDocumentById:{},
        deleteAllDocument:{},
        getAllDepartments:[],
        createEmployeeDoc:{},
        createSupplierDoc:{},
        createContractorDoc:{},
        uploadDocImg:{}
    },
    reducers: {
        
    },
    extraReducers: {
        ["documentPanel/getAllEmployeeDoc/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllEmployeeDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllEmployeeDoc = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to fetch data")
            }
        },
        ["documentPanel/getAllSupplierDoc/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllSupplierDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllSupplierDoc = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to fetch data")
            }
        },
        ["documentPanel/getAllContractorDoc/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllContractorDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllContractorDoc = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to fetch data")
            }
        },
        ["documentPanel/downloadDocumentById/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from downloadDocumentById slice ", data)

            if (status >= 200 && status < 300) {
                // toast(data.message)


                // state.downloadDocumentById = data
            }
            else if (status >= 400 && status < 500) {

                
            }
        },
        ["documentPanel/deleteDocumentById/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from deleteDocumentById slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.deleteDocumentById = data
            }
            else if (status >= 400 && status < 500) {

                
            }
        },
        ["documentPanel/deleteAllDocument/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from deleteAllDocument slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.deleteAllDocument = data
            }
            else if (status >= 400 && status < 500) {

               
            }
        },
        ["documentPanel/getAllDepartments/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllDepartments slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllDepartments = data?.data
            }
            else if (status >= 400 && status < 500) {

                
            }
        },
        ["documentPanel/createEmployeeDoc/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createEmployeeDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createEmployeeDoc = data?.data
            }
            else if (status >= 400 && status < 500) {

                
            }
        },
        ["documentPanel/createSupplierDoc/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createSupplierDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createSupplierDoc = data?.data
            }
            else if (status >= 400 && status < 500) {

                
            }
        },
        ["documentPanel/createContractorDoc/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createContractorDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createContractorDoc = data?.data
            }
            else if (status >= 400 && status < 500) {

                
            }
        },
        ["documentPanel/uploadDocImg/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from uploadDocImg slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.uploadDocImg = data
            }
            else if (status >= 400 && status < 500) {

                
            }
        }
    },})

export const {  } = documentPanelSlice.actions;

export default documentPanelSlice.reducer;