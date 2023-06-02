import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';


const providersSlice = createSlice({
    name: "providers",
    initialState: {
        getProvidersByUserId: {},
        getProvidersIncoming: {},
        getProvidersRecord: {},
        providerslistOfEmployees: {},
        getProvidersEmployeeSortList: [],
        createProviderUserRelationship: {},
        uploadProviderImage: {},
        getProviderEmployeeDetail: {},
        getAllStatusProvider: [],
        getSingleProvider: {},
        checkProviderImage: {},
        getProviderImage: {},
        downloadProviderImage: {},
        downloadCompanyFile: {},
        createToExternal: {},
        setToExternal: {},
        providerVehicleSortList: [],
        providerlistOfVehicles: {},
        createVehicleAndRelation: {},
        getProviderVehicleDetail: {},
        getSingleProviderVehicle: {},
        checkProviderVehicleImage: {},
        getProviderVehicleImage: {},
        downloadProviderVehicleImage: {},
        getProviderVehicleStatus: [],
        UpdateProviderVehicleData: {},
        downloadCompanyVehicleFile: {},
        createToExternalVehicle: {},
        setToExternalVehicle: {},
        getOrderDetails: {},
        getAllProviderEmployeeListDown: [],
        getAllProviderVehicleListDown: [],
        getSingleUserProvider: {},
        getUserDocuments: {},
        getUserExtraData: {},
        getUserCompanyRestrictionData: {},
        getAllSupplierDocumentsById:[],
        createSupplierDocValue:{},
        setSupplierDocValue:{},
        saveProviderVehicleImage:{},
        saveProviderImage:{},
        imageChangeCheck:""





    },
    reducers: {},
    extraReducers: {

        // order section
        ["providers/getProvidersByUserId/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProvidersByUserId slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProvidersByUserId = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get provider by userid")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getProvidersIncoming/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProvidersIncoming slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProvidersIncoming = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get provider incoming")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getProvidersRecord/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProvidersRecord slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProvidersRecord = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get provider records")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getOrderDetails/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getOrderDetails slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getOrderDetails = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get provider records")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getAllProviderVehicleListDown/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getAllProviderVehicleListDown slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllProviderVehicleListDown = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get provider records")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/getAllProviderEmployeeListDown/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getAllProviderEmployeeListDown slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllProviderEmployeeListDown = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get provider records")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },











        // employees section 

        ["providers/providerslistOfEmployees/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from providerslistOfEmployees slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.providerslistOfEmployees = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get providers list")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getProvidersEmployeeSortList/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProvidersEmployeeSortList slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProvidersEmployeeSortList = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get providers filter list")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/createProviderUserRelationship/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from createProviderUserRelationship slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createProviderUserRelationship = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to createProviderUserRelationship")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/uploadProviderImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from uploadProviderImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.uploadProviderImage = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to uploadProviderImage")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/getProviderEmployeeDetail/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProviderEmployeeDetail slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProviderEmployeeDetail = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getProviderEmployeeDetail")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/getAllStatusProvider/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getAllStatusProvider slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllStatusProvider = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getAllStatusProvider")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getSingleProvider/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getSingleProvider slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getSingleProvider = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getSingleProvider")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/checkProviderImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from checkProviderImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.checkProviderImage = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to checkProviderImage")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getProviderImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProviderImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProviderImage = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getProviderImage")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/downloadProviderImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from downloadProviderImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.downloadProviderImage = data
            }
            else if (status >= 400 && status < 500) {
                toast.error("file not Found")
            }
        },
        ["providers/downloadCompanyFile/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from downloadCompanyFile slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.downloadCompanyFile = data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to downloadCompanyFile")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        // createToExternal

        ["providers/createToExternal/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from createToExternal slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                toast.success("created value successfully")
                state.createToExternal = data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to createToExternal")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/setToExternal/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from setToExternal slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                toast.success("set value successfully")
                state.setToExternal = data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to setToExternal")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        // vehicle section slice
        ["providers/providerlistOfVehicles/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from providerlistOfVehicles slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.providerlistOfVehicles = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get providers list")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/providerVehicleSortList/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from providerVehicleSortList slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.providerVehicleSortList = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get providers filter list")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/createVehicleAndRelation/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from createVehicleAndRelation slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createVehicleAndRelation = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Create Vehicle")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/checkProviderVehicleImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from checkProviderVehicleImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.checkProviderVehicleImage = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to checkProviderVehicleImage")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getProviderVehicleImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProviderVehicleImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProviderVehicleImage = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getProviderVehicleImage")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/downloadProviderVehicleImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from downloadProviderVehicleImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.downloadProviderVehicleImage = data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to downloadProviderVehicleImage")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/getSingleProviderVehicle/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getSingleProviderVehicle slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getSingleProviderVehicle = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getSingleProviderVehicle")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/getProviderVehicleDetail/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProviderVehicleDetail slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProviderVehicleDetail = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getProviderVehicleDetail")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/getProviderVehicleStatus/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getProviderVehicleStatus slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getProviderVehicleStatus = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getProviderVehicleStatus")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["providers/UpdateProviderVehicleData/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from UpdateProviderVehicleData slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.UpdateProviderVehicleData = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to UpdateProviderVehicleData")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/saveProviderVehicleImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from saveProviderVehicleImage slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.saveProviderVehicleImage = data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to saveProviderVehicleImage")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        

        ["providers/downloadCompanyVehicleFile/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from downloadCompanyVehicleFile slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.downloadCompanyVehicleFile = data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to downloadCompanyVehicleFile")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        // createToExternalVehcile

        ["providers/createToExternalVehicle/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
           
            if (status >= 200 && status < 300) {
                
                toast.success("created value successfully")
                state.createToExternalVehicle = data
            }
            else if (status >= 400 && status < 500) {
          
            }
        },

        ["providers/setToExternalVehicle/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            
            if (status >= 200 && status < 300) {
                
                toast.success("set value successfully")
                state.setToExternalVehicle = data
            }
            else if (status >= 400 && status < 500) {
              
            }
        },

        
        ["providers/saveProviderImage/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            
            if (status >= 200 && status < 300) {
                
                let change=0
                state.saveProviderImage = data
                state.imageChangeCheck= change + 1
            }
            else if (status >= 400 && status < 500) {
              
            }
        },



        // getUserDocuments  for user document

        ["providers/getUserDocuments/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getUserDocuments slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                // toast.success("set value successfully")
                state.getUserDocuments = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getUserDocuments")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },


        ["providers/getUserExtraData/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getUserExtraData slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                // toast.success("set value successfully")
                state.getUserExtraData = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getUserExtraData")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        ["providers/getUserCompanyRestrictionData/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getUserCompanyRestrictionData slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                // toast.success("set value successfully")
                state.getUserCompanyRestrictionData = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getUserCompanyRestrictionData")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },


        ["providers/getSingleUserProvider/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getSingleUserProvider slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getSingleUserProvider = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getSingleUserProvider")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },


        ["providers/getAllSupplierDocumentsById/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            
            if (status >= 200 && status < 300) {
                state.getAllSupplierDocumentsById = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },

        ["providers/setSupplierDocValue/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            
            if (status >= 200 && status < 300) {
                state.setSupplierDocValue = data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        ["providers/createSupplierDocValue/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            
            if (status >= 200 && status < 300) {
                state.createSupplierDocValue = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        







    }

})

export const { } = providersSlice.actions;

export default providersSlice.reducer;