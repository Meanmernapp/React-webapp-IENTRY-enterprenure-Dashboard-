import {createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const contractorSlice = createSlice({
    name: "Contractor",
    initialState: {
        // getByUserId:[{id:"0f1c83d7-599f-4282-b103-94de71bdcb8f"}],
        getByUserId:[],
        getUserExtraDetailByUserId:[],
        getUserDetailByUserId:[],
        getActiveContracts: [],
        getSingleContract:[],
        getVehicleOnContractById:[],
        getEmployeOnContractById:[],
        getAllVehicleByContractor:[],

        //vehicle
        getVehicleFilter:[],
        getVehicleByContractorId:[],
        getVehicleDetailById:[],
        getVehicleStatus:[],
        getAllVehicleByContractorId:[],
        vehicleWorkOnContract:[],
        getlistofcontractorEmployees:[],
        getlistofEmployeWorkOnContract:[],
        //Employe
        getAllGender:[],
        getAllEmployeeFilter:[],
        getEmployeByContractorId:[],
        getEmployeDetailById:[],
        getUserStatus:[],
        getUserDetailForUpdate:[],
        getUserProfileImage:[],
        downloadCompanyExternalDocuments:[],

        //Documents
        getAllContractorDocuments:[],

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
        [`contractor/GetVehicleByContractorId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getVehicleByContractorId = data.data
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
        [`contractor/GetAllContractorDocuments/fulfilled`]: (state, action) => {
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
        
    }
})

export const { customScduleTime} = contractorSlice.actions;
export const byUserId =(state) => state.ContractorSlice.getByUserId
export const userDetailByUserId =(state) => state.ContractorSlice.getUserDetailByUserId
export const userExtraDetailByUserId =(state) => state.ContractorSlice.getUserExtraDetailByUserId;
export const activeContarcts =(state) => state.ContractorSlice.getActiveContracts;
export const currentContract =(state) => state.ContractorSlice.getSingleContract;
export const vehicleOnContractById =(state) => state.ContractorSlice.getVehicleOnContractById;
export const employeOnContractById =(state) => state.ContractorSlice.getEmployeOnContractById;
export const allVehicleByContractor =(state) => state.ContractorSlice.getAllVehicleByContractor;

//Vehicle APi
export const vehicleFilter =(state) => state.ContractorSlice.getVehicleFilter;
export const vehicleByContractorId =(state) => state.ContractorSlice.getVehicleByContractorId;
export const vehicleDetailById =(state) => state.ContractorSlice.getVehicleDetailById;
export const vehicleStatus =(state) => state.ContractorSlice.getVehicleStatus;
export const allVehicleByContractorId =(state) => state.ContractorSlice.getAllVehicleByContractorId;
export const allvehicleWorkOnContract =(state) => state.ContractorSlice.vehicleWorkOnContract;
export const listofcontractorEmployees =(state) => state.ContractorSlice.getlistofcontractorEmployees;
export const listofEmployeWorkOnContract =(state) => state.ContractorSlice.getlistofEmployeWorkOnContract;


//Employee APi

export const allGender =(state) => state.ContractorSlice.getAllGender;
export const allEmployeeFilter =(state) => state.ContractorSlice.getAllEmployeeFilter;
export const employeByContractorId =(state) => state.ContractorSlice.getEmployeByContractorId;
export const employeDetailById =(state) => state.ContractorSlice.getEmployeDetailById;
export const userStatus =(state) => state.ContractorSlice.getUserStatus;
export const userDetailForUpdate =(state) => state.ContractorSlice.getUserDetailForUpdate;
export const userProfileImage =(state) => state.ContractorSlice.getUserProfileImage;
export const companyExternalDocuments =(state) => state.ContractorSlice.downloadCompanyExternalDocuments;
 


//Documents
export const allContractorDocuments =(state) => state.ContractorSlice.getAllContractorDocuments;





export default contractorSlice.reducer;