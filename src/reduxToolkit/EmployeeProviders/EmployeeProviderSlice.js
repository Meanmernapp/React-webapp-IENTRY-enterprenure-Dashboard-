import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { CreateEmployeeProviderOrders } from "./EmployeeProvidersApi";

const employeeProviderSlice = createSlice({
    name: "employeeProvider",
    initialState: {
        getEmployeeProviderOrders: [],
        createEmployeeProviderOrder: [],
        updateEmployeeProviderOrder: [],
        detailEmployeeProviderOrder: {},
        detailsEmployeeProvider: [],
        getEmployeeProviderLists: [],
        incomingProviders: [],
        recordsProviders: [],
        createEmployeeProvider: [],
        createEmployeeProviderPre: [],
        getEmployeeProviderByPhoneNumber: {},
        getEmployeeProviderByEmail: {},
        detailEmployeeProviderEmployee: {},
        detailEmployeeProviderOrderFiles: null,
        detailEmployeeProviderVehicle: {},
        getStatusListProvider: [],
        getEmployeeProviderById: {},
        updateEmployeeProviderInfo: {},
        updateEmployeeProviderCompany: {},
        getEmployeeProviderOrdersSortList: [],
        getAllPageableProvider: [],
        getAllProviderDocuments: {},
        getAllCompanybyProviderId: [],
        approveExternalDocument: null,
        getCurrentUserDocument: [],
        getAllCompanyVehiclebyId: [],
        getUserDocumentsEmployee: {},
        createToExternalEmployee: {},
        setToExternalEmployee: {},
        createEmployeeOrder: {}

    },
    reducers: {
        ClearGetEmployeeProviderByPhoneNumber: (state, action) => {
            state.getEmployeeProviderByPhoneNumber = {}
        },

        ClearGetEmployeeProviderByEmail: (state, action) => {
            state.getEmployeeProviderByEmail = {}
        }
    },
    extraReducers: {
        ["employeeProvider/getEmployeeProviderOrders/fulfilled"]: (state, action) => {
            alert('hello')
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message);
                // alert('succes');
                state.getEmployeeProviderOrders = data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create customer")
            }
        },
        ["employeeProvider/createEmployeeProviderOrders/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast(data.message)
                state.createEmployeeOrder = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to Create Order")
            }
        },
        ['employeeProvider/updateEmployeeProviderOrders/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast(data.message)
                state.updateEmployeeProviderOrder = data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create customer")
            }
        },
        ['employeeProvider/detailsEmployeeProviderOrders/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message)
                console.log(data)
                state.detailEmployeeProviderOrder = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create customer")
            }
        },
        ['employeeProvider/detailsEmployeeProviderEmployee/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message)
                console.log(data)
                state.detailEmployeeProviderEmployee = data?.data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to Create customer")
            }
        },
        ['employeeProvider/downloadEmployeeProviderOrderFiles/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast(data.message)
                state.detailEmployeeProviderOrderFiles = data
            }
            else if (status >= 400 && status < 500) {
                toast(data.message)
                // toast("Fail to Create customer")
            }
        },
        ['employeeProvider/detailsEmployeeProviderVehicle/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.detailEmployeeProviderVehicle = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Get Vehicle detail")
            }
        },
        ['employeeProvider/detailsEmployeeProvider/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.detailsEmployeeProvider = data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create customer")
            }
        },
        ['employeeProvider/getEmployeeProviderLists/fulfilled']: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getEmployeeProviderLists = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create customer")
            }
        },
        ['employeeProvider/getIncomingProvidersPaginable/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.incomingProviders = data
                console.log("incoming porvider", state.incomingProviders)
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in incomingEvents")
            }
        },
        ['employeeProvider/getRecordsProvidersPaginable/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.recordsProviders = data
                console.log("Record provider", state.recordsProviders)
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in incomingEvents")
            }
        },
        ["employeeProvider/getEmployeeProviderOrdersSortList/fulfilled"]: (state, action) => {

            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message);

                state.getEmployeeProviderOrdersSortList = data?.data
                console.log(state.getEmployeeProviderOrdersSortList)
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create customer")
            }
        },

        //listin provider
        ["employeeProvider/getAllPageableProvider/fulfilled"]: (state, action) => {

            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message);

                state.getAllPageableProvider = data?.data
                console.log(state.getAllPageableProvider)
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create customer")
            }
        },
        // @create provider flow start

        ["employeeProvider/getGnderListProvider/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getGnderListProvider = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create Order")
            }
        },
        ["employeeProvider/createEmployeeProvider/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data.message)
            if (status >= 200 && status < 300) {
                toast(data.message)
                state.createEmployeeProvider = data
            }
            else if (status >= 400 && status < 500) {
                toast(data.message)
                toast("Fail to Create Order")
            }

        },
        ["employeeProvider/EmployeeProviderPreUser/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data.message)
            if (status >= 200 && status < 300) {

                state.createEmployeeProviderPre = data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create Pre User")
            }
        },
        ["employeeProvider/getEmployeeProviderByPhoneNumber/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getEmployeeProviderByPhoneNumber = data?.data
            }
            else if (status >= 400 && status < 500) {
                toast(data.message)
                // toast("Fail to Create Order")
            }
        },
        ["employeeProvider/getEmployeeProviderByEmail/fulfilled"]: (state, action) => {
            const { data } = action.payload || {}
            console.log("from slice ", data)
            if (data?.code == 200) {
                // toast(data?.message)
                state.getEmployeeProviderByEmail = data?.data
                console.log(state.getEmployeeProviderByEmail)
            }



        },
        //@update provider flow start
        ["employeeProvider/getStatusListProvider/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getStatusListProvider = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create Order")
            }
        },
        ["employeeProvider/getEmployeeProviderById/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getEmployeeProviderById = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create Order")
            }
        },
        ["employeeProvider/updateEmployeeProviderInfo/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                toast(data.message)
                state.updateEmployeeProviderInfo = data
            }
            else if (status >= 400 && status < 500) {

                // toast("Fail to Create Order")
            }
        },
        ["employeeProvider/updateEmployeeProviderCompany/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                toast(data.message)
                state.updateEmployeeProviderCompany = data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to update")
            }
        },
        //@update provider flow end
        // @create provider flow end
        ["employeeProvider/getAllProviderDocuments/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("doc fie", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllProviderDocuments = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create Order")
            }
        },

        ["employeeProvider/getAllCompanybyProviderId/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllCompanybyProviderId = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to fetch ")
            }
        },

        ["employeeProvider/approveExternalDocument/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from slice ", data)
            if (status >= 200 && status < 300) {
                toast(data.message)
                state.approveExternalDocument = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to Create Order")
            }
        },
        [`employeeProvider/getAllProviderDocument/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message);
                state.getCurrentUserDocument = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to Create customer")
            }
        },

        [`employeeProvider/getAllCompanyVehiclebyId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast(data.message);
                state.getAllCompanyVehiclebyId = data?.data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to get All Company Vehicle")
            }
        },

        // getUserDocumentsEmployee  for user document

        ["employeeProvider/getUserDocumentsEmployee/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from getUserDocumentsEmployee slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                // toast.success("set value successfully")
                state.getUserDocumentsEmployee = data?.data
            }
            else if (status >= 400 && status < 500) {
                console.log("Fail to getUserDocumentsEmployee")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["employeeProvider/createToExternalEmployee/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from createToExternalEmployee slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                toast.success("created value successfully")
                state.createToExternalEmployee = data
            }
            else if (status >= 400 && status < 500) {
                console.log("Fail to createToExternalEmployee")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },

        ["employeeProvider/setToExternalEmployee/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            console.log("from setToExternalEmployee slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                toast.success("set value successfully")
                state.setToExternalEmployee = data
            }
            else if (status >= 400 && status < 500) {
                console.log("Fail to setToExternalEmployee")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },


    }
})

export const { ClearGetEmployeeProviderByPhoneNumber, ClearGetEmployeeProviderByEmail } = employeeProviderSlice.actions;

export default employeeProviderSlice.reducer;