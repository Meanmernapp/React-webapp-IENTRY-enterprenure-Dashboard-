import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const employeeEventsSlice = createSlice({
    name: "employeeEvents",
    initialState: {
        eventFilters: [],
        incomingEvents: [],
        validationEvents: [],
        recordsEvents: [],
        zonesList: [],
        allEmployees: [],
        selectedEmployees: [],
        emailPhoneSearchData: [],
        emailPhoneSearchList: [],
        normalEventDetails: {
            name: "",
            date: "",
            time: "",
            duration: "",
        },
        normalEventCreatedData: [],
        eventDetail: [],
        userInvitationsData: [],
        vehiclesInvitationsData: [],
        pageableObj: {
            order: true,
            page: 0,
            size: 10,
            sortBy: "id"
        },
        companyRestrictionsData: [],
        onuDetailsData: {
            name: "",
            purpose: "",
            date: "",
            time: "",
            duration: "",
            zone: "",
            access: ""
        },
        normalEventHost: {
            accompanied: "",
            unitSection: "",
            employee: "",
            email: "",
            phoneNo: "",
        },
        onuEmployeeData: [],
        onuOthersData: [],
        ounVehiclesList: [],
        getAllVehiclesData: [],
        createVehicleData: [],
        OnuAllZones: [],
        readOnly: false,
        signatureImage: "",

    },
    reducers: {
        saveNormalEventDetail: (state, action) => {
            state.normalEventDetails = action.payload
        },
        updateZonesList: (state, action) => {
            state.zonesList = action.payload
        },
        updateAllEmployees: (state, action) => {
            state.allEmployees = action.payload
        },
        updateSelectedEmployees: (state, action) => {
            state.selectedEmployees = action.payload
        },
        SaveEmailPhoneSearchList: (state, action) => {
            state.emailPhoneSearchList = [...state.emailPhoneSearchList, action.payload]
        },
        handlePagination: (state, { payload }) => {
            state.pageableObj = { ...state.pageableObj, [payload.name]: payload.value }
        },
        updateEmailPhoneSearchList: (state, action) => {
            state.emailPhoneSearchList = action.payload
        },
        saveOunDetailsData: (state, { payload }) => {
            state.onuDetailsData = payload
        },
        saveOunHostData: (state, { payload }) => {
            state.normalEventHost = payload
        },
        saveOunEmployeeData: (state, { payload }) => {
            state.onuEmployeeData = [...state.onuEmployeeData, payload]
        },
        updateOunEmployeeData: (state, { payload }) => {
            state.onuEmployeeData = payload
        },
        saveOunOthersData: (state, { payload }) => {
            state.onuOthersData = [...state.onuOthersData, payload]
        },
        saveOunVehiclesList: (state, { payload }) => {
            state.ounVehiclesList = payload
        },
        updateOunVehicleData: (state, { payload }) => {
            state.getAllVehiclesData = payload
        },
        setReadOnly: (state, { payload }) => {
            state.readOnly = payload
        },

    },
    extraReducers: {
        ['employeeEvents/getEventFilters/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.eventFilters = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in eventFilters")
            }
        },
        ['employeeEvents/incomingEvents/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.incomingEvents = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in incomingEvents")
            }
        },
        ['employeeEvents/validationEvents/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.validationEvents = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in validationEvents")
            }
        },
        ['employeeEvents/recordsEvents/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.recordsEvents = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in recordsEvents")
            }
        },
        ['employeeEvents/zonesList/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            console.log(data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.zonesList = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in zonesList")
            }
        },
        ['employeeEvents/allEmployees/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.allEmployees = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in allEmployees")
            }
        },
        ['employeeEvents/searchByEmail/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                state.emailPhoneSearchData = data
                state.readOnly = true
            } else if (status === 400) {
                // toast("Email not exists.please pre-register yourself.")
                state.readOnly = false
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong")
            }
        },
        ['employeeEvents/searchByPhone/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                state.emailPhoneSearchData = data
                state.readOnly = true
            } else if (status === 400) {
                // toast("phone_number not exists.please pre-register yourself.")
                state.readOnly = false
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong")
            }
        },
        ['employeeEvents/createNormalEvent/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            // console.log(data)
            if (status >= 200 && status < 300) {
                state.normalEventCreatedData = data
                toast.success("Event Created Successfully..!");
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createNormalEvent")
            }
        },
        ['employeeEvents/createUserInvitation/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                toast.success("Invitation Succeed..!")
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createUserInvitation")
            }
        },
        ['employeeEvents/getEventDetail/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                state.eventDetail = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getEventDetail")
            }
        },
        ['employeeEvents/getUserInvitations/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                state.userInvitationsData = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getUserInvitations")
            }
        },
        ['employeeEvents/getVehiclesInvitations/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                state.vehiclesInvitationsData = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getVehiclesInvitations")
            }
        },
        ['employeeEvents/deleteVehicleInvitation/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                toast.success("vehicle invitation removed")
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in deleteUserInvitation")
            }
        },
        ['employeeEvents/deleteUserInvitation/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                toast.success("user invitation was removed")
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in deleteUserInvitation")
            }
        },
        ['employeeEvents/cancelEvent/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}

            if (status >= 200 && status < 300) {
                toast.success("event canceled Successfully")
            } else if (status === 400) {
                toast("event was already been canceled")
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in cancelEvent")
            }
        },
        ['employeeEvents/allowDenyEvent/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            // console.log(data)
            if (status >= 200 && status < 300) {
                toast.success(data?.status?.name)
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in allowDenyEvent")
            }
        },
        ['employeeEvents/companyRestrictions/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            // console.log(data)
            if (status >= 200 && status < 300) {
                state.companyRestrictionsData = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in companyRestrictions")
            }
        },
        ['employeeEvents/getAllVehiclesData/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.getAllVehiclesData = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in getAllVehiclesData")
            }
        },
        ['employeeEvents/createVehicle/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            // console.log(data)
            if (status >= 200 && status < 300) {
                toast("Vehicle is created Successfully..!")
                console.log(data?.vehicle)
                state.createVehicleData = data?.vehicle
                state.ounVehiclesList = [...state.ounVehiclesList, data?.vehicle]
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createVehicle")
            }
        },
        ['employeeEvents/createOnuEvent/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            // console.log(data)
            if (status >= 200 && status < 300) {
                toast("ONU Event Created successfully..!")
                // state.createOnuEventData = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createOnuEvent")
            }
        },
        ['employeeEvents/preRegisterUser/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                toast("pre-register user Created successfully..!")
                state.emailPhoneSearchData = data
            } else if (status >= 400 && status < 500) {
                // toast("Something went wrong in preRegisterUser")
            }
        },
        ['employeeEvents/downloadOnuFile/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                toast("download is available")
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in download File")
            }
        },
        ['employeeEvents/getOnuAllZones/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.OnuAllZones = data;
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in OnuAllZones")
            }
        },
        ['employeeEvents/createVehicleInvitations/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("Vehicle invitation created successfully..!")
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in createVehicleInvitations")
            }
        },
        ['employeeEvents/downloadSignature/fulfilled']: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            console.log(data)
            if (status >= 200 && status < 300) {
                state.signatureImage = data
            } else if (status >= 400 && status < 500) {
                toast("Something went wrong in downloadSignature")
            }
        }
    }
})

export const {
    saveNormalEventDetail,
    updateZonesList,
    updateAllEmployees,
    updateSelectedEmployees,
    SaveEmailPhoneSearchList,
    handlePagination,
    updateEmailPhoneSearchList,
    saveOunDetailsData,
    saveOunHostData,
    saveOunEmployeeData,
    saveOunOthersData,
    saveOunVehiclesList,
    updateOunEmployeeData,
    updateOunVehicleData,
    setReadOnly
} = employeeEventsSlice.actions;

export default employeeEventsSlice.reducer;