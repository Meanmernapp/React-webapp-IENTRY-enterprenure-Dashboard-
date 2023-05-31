import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const contractorSlice = createSlice({
    name: "Contractor",
    initialState: {
        // getByUserId:[{id:"0f1c83d7-599f-4282-b103-94de71bdcb8f"}],
        getByUserId: [],
        getUserExtraDetailByUserId: [],
        getUserDetailByUserId: [],
        getActiveContracts: [],
        getSingleContract: [],
        getVehicleOnContractById: [],
        getEmployeOnContractById: [],
        getAllVehicleByContractor: [],

        //vehicle
        getVehicleFilter: [],
        contractorlistOfVehicles: [],
        getVehicleDetailById: [],
        getVehicleStatus: [],
        getAllVehicleByContractorId: [],
        vehicleWorkOnContract: [],
        getlistofcontractorEmployees: [],
        getlistofEmployeWorkOnContract: [],
        //Employe
        getAllGender: [],
        getAllEmployeeFilter: [],
        getEmployeByContractorId: [],
        getEmployeDetailById: [],
        getUserStatus: [],
        getUserDetailForUpdate: [],
        getUserProfileImage: [],
        downloadCompanyExternalDocuments: [],

        //Documents
        getAllContractorDocuments: [],
        createContractorDocValue: {},
        setContractorDocValue: {},

        //employee 
        contractorslistOfEmployees: [],
        getContractorsByUserId: {},
        createContractorUserRelationship:{},
        updateContractorUserRelationship:{},

        // status contractor
        getContractorStatus:[],
        // get contractor info for update
        getContractorInfoById:{}


    },
    reducers: {
        // customScduleTime: (state, { payload }) => {
        //     state.customSchdulTime = payload
        // }
    },
    extraReducers: {
        [`contractor/GetByUserId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getByUserId = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetUserDetailByUserId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getUserDetailByUserId = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetUserExtraDetailByUserId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getUserExtraDetailByUserId = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetActiveContracts/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getActiveContracts = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetContractsByTime/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getActiveContracts = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetContractById/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getSingleContract = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetVehicleOnContractById/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getVehicleOnContractById = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetEmployeOnContractById/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getEmployeOnContractById = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetAllVehicleByContractor/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllVehicleByContractor = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        //Vehicle APi Response
        [`contractor/GetVehicleFilter/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getVehicleFilter = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        ["contractor/contractorlistOfVehicles/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.contractorlistOfVehicles = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetVehicleDetailById/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getVehicleDetailById = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetVehicleStatus/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getVehicleStatus = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetAllVehicleByContractorId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllVehicleByContractorId = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/VehicleWorkOnContract/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.vehicleWorkOnContract = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetlistofcontractorEmployees/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getlistofcontractorEmployees = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetlistofEmployeWorkOnContract/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getlistofEmployeWorkOnContract = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },

        //Employee Api
        [`contractor/GetAllGender/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllGender = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },

        [`contractor/GetAllEmployeeFilter/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllEmployeeFilter = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },

        [`contractor/GetEmployeByContractorId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getEmployeByContractorId = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetEmployeDetailById/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getEmployeDetailById = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetUserStatus/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getUserStatus = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetUserDetailForUpdate/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getUserDetailForUpdate = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/GetUserProfileImage/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getUserProfileImage = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/getAllContractorDocuments/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllContractorDocuments = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`contractor/DownloadCompanyExternalDocuments/fulfilled`]: (state, action) => {
            // const { result } = action.payload || {}
            // console.log(">>rESULT<<",action.payload )
            state.downloadCompanyExternalDocuments = action.payload

        },
        ["contractor/setContractorDocValue/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                state.setContractorDocValue = data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        ["contractor/createContractorDocValue/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                state.createContractorDocValue = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast.error(data?.message)
            }
        },
        // employees
        ["contractor/contractorslistOfEmployees/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from contractorslistOfEmployees slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.contractorslistOfEmployees = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get providers list")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        //get contractor by id
        ["contractor/getContractorsByUserId/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getContractorsByUserId slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getContractorsByUserId = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to Get provider by userid")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        // get contractor employee details
        ["contractor/getContractorEmployeeDetail/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from getContractorEmployeeDetail slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getContractorEmployeeDetail = data?.data
            }
            else if (status >= 400 && status < 500) {
                //console.log("Fail to getContractorEmployeeDetail")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        // create contractor employee
        ["contractor/createContractorUserRelationship/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            //console.log("from createContractorUserRelationship slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.createContractorUserRelationship = data?.data
            }
            else if (status >= 400 && status < 500) {
                toast.error(data?.message)
                //console.log("Fail to createContractorUserRelationship")
                // toast("Fail to fetch Zone Devices Lists")
            }
        },
        
          // update contractor employee
          ["contractor/updateContractorUserRelationship/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            
            if (status >= 200 && status < 300) {
                
                state.updateContractorUserRelationship = data?.data
            }
            else if (status >= 400 && status < 500) {
                toast.error(data?.message)
            
            }
        },
         //get contractor status
         ["contractor/getContractorStatus/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                console.log(data)
                state.getContractorStatus = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
         //get contractor status
         ["contractor/getContractorInfoById/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                console.log(data)
                state.getContractorInfoById = data?.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        




    }
})

export const { customScduleTime } = contractorSlice.actions;
export const byUserId = (state) => state.ContractorSlice.getByUserId
export const userDetailByUserId = (state) => state.ContractorSlice.getUserDetailByUserId
export const userExtraDetailByUserId = (state) => state.ContractorSlice.getUserExtraDetailByUserId;
export const activeContarcts = (state) => state.ContractorSlice.getActiveContracts;
export const currentContract = (state) => state.ContractorSlice.getSingleContract;
export const vehicleOnContractById = (state) => state.ContractorSlice.getVehicleOnContractById;
export const employeOnContractById = (state) => state.ContractorSlice.getEmployeOnContractById;
export const allVehicleByContractor = (state) => state.ContractorSlice.getAllVehicleByContractor;

//Vehicle APi
export const vehicleFilter = (state) => state.ContractorSlice.getVehicleFilter;
export const vehicleByContractorId = (state) => state.ContractorSlice.getVehicleByContractorId;
export const vehicleDetailById = (state) => state.ContractorSlice.getVehicleDetailById;
export const vehicleStatus = (state) => state.ContractorSlice.getVehicleStatus;
export const allVehicleByContractorId = (state) => state.ContractorSlice.getAllVehicleByContractorId;
export const allvehicleWorkOnContract = (state) => state.ContractorSlice.vehicleWorkOnContract;
export const listofcontractorEmployees = (state) => state.ContractorSlice.getlistofcontractorEmployees;
export const listofEmployeWorkOnContract = (state) => state.ContractorSlice.getlistofEmployeWorkOnContract;


//Employee APi

export const allGender = (state) => state.ContractorSlice.getAllGender;
export const allEmployeeFilter = (state) => state.ContractorSlice.getAllEmployeeFilter;
export const employeByContractorId = (state) => state.ContractorSlice.getEmployeByContractorId;
export const employeDetailById = (state) => state.ContractorSlice.getEmployeDetailById;
export const userStatus = (state) => state.ContractorSlice.getUserStatus;
export const userDetailForUpdate = (state) => state.ContractorSlice.getUserDetailForUpdate;
export const userProfileImage = (state) => state.ContractorSlice.getUserProfileImage;
export const companyExternalDocuments = (state) => state.ContractorSlice.downloadCompanyExternalDocuments;



//Documents
export const allContractorDocuments = (state) => state.ContractorSlice.getAllContractorDocuments;







export default contractorSlice.reducer;