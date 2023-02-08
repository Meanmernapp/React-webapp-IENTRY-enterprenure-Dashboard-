import { createSlice } from "@reduxjs/toolkit";
import { GetAllEmployeeContracts, ContractorDownloadDocuments } from "./EmployeeContractorsApi"
import { toast } from 'react-toastify';

const employeeContractorSlice = createSlice({
    name: "employeeContractor",
    initialState: {
        createContract: [],
        getZonetree: [],
        getAllContractors: [],
        getAllWorkSchdule: [],
        allEmployeeContractors: [],
        allEmployeeContracts: [],
        getWorkTimeAccess: [],
        contractorDownloadDocument: null,
        WorkShiftByContractID: [],
        contractAllStatus: [],

        customSchdulTime: [],
        getVehicleWithDocumentById: [],
        getAllVehicleByContractorId: [],
        getEmployeeContractorById: {},

        getAllToContractor: [],
    },
    reducers: {
        customScduleTime: (state, { payload }) => {
            state.customSchdulTime = payload
        }
    },
    extraReducers: {

        [`employeeContractor/CreateContract/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.createContract = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`employeeContractor/getEmployeeContractorById/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getEmployeeContractorById = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`employeeContractor/GetStatus/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.contractAllStatus = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`employeeContractor/GetZoneTree/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getZonetree = data.data
            }
            else if (status >= 400 && status < 500) {
            }
        },
        [`employeeContractor/GetAllEmployeeContractors/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.allEmployeeContractors = data.data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [`employeeContractor/GetAllContractors/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllContractors = data.data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [`employeeContractor/GetAllWorkSchdule/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllWorkSchdule = data.data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [`employeeContractor/GetWorkTimeAccess/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getWorkTimeAccess = data.data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [`employeeContractor/GetWorkShiftByContractID/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.WorkShiftByContractID = data.data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [`employeeContractor/GetVehicleWithDocumentById/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getVehicleWithDocumentById = data.data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [`employeeContractor/GetAllVehicleByContractorId/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllVehicleByContractorId = data.data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [`employeeContractor/GetAllToContractor/fulfilled`]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.getAllToContractor = data.data

            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
            }
        },
        [GetAllEmployeeContracts.fulfilled]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.allEmployeeContracts = data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
                toast.error("Fail to Fetch Contracts")
            }
        },
        [ContractorDownloadDocuments.fulfilled]: (state, action) => {
            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast("File Downloading ...")
                state.contractorDownloadDocument = data
            }
            else if (status >= 400 && status < 500) {
                // state.errorCreateCutomer= data.errors
                toast("Fail to fetch Document")
                document.getElementById("overlay").style.display = "none";
            }
        },
    }
})

export const { customScduleTime } = employeeContractorSlice.actions;
export const getcustomSchdulTime = (state) => state.EmployeeContractorsSlice.customSchdulTime;

export const getcreateContract = (state) => state.EmployeeContractorsSlice.createContract;
export const getcontractAllStatus = (state) => state.EmployeeContractorsSlice.contractAllStatus;
export const getZonetree = (state) => state.EmployeeContractorsSlice.getZonetree;
export const getAllEmployeeContractors = (state) => state.EmployeeContractorsSlice.allEmployeeContractors;
export const getAllContractors = (state) => state.EmployeeContractorsSlice.getAllContractors;
export const getAllWorkSchdule = (state) => state.EmployeeContractorsSlice.getAllWorkSchdule;
export const getWorkTimeAccess = (state) => state.EmployeeContractorsSlice.getWorkTimeAccess;
export const getAllEmployeeContracts = (state) => state.EmployeeContractorsSlice.allEmployeeContracts;
export const contractorDownloadDocument = (state) => state.EmployeeContractorsSlice.contractorDownloadDocument;
export const getWorkShiftByContractID = (state) => state.EmployeeContractorsSlice.WorkShiftByContractID;
export const vehicleWithDocumentById = (state) => state.EmployeeContractorsSlice.getVehicleWithDocumentById;
export const allVehicleByContractorId = (state) => state.EmployeeContractorsSlice.getAllVehicleByContractorId;
export const allToContractor = (state) => state.EmployeeContractorsSlice.getAllToContractor;





export default employeeContractorSlice.reducer;