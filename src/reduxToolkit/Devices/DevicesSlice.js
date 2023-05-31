import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const DevicesSlice = createSlice({
    name: "devices",
    initialState: {
        getListStatusDevice: [],
        getAllDevices:[],
        getAllDevicesZoneNull:[],
        updateDeviceApi: null,
        updateAirbnk: null,
        getAntiPassBackType: [],
        getEscortMode: [],
        deleteAirbnk: null,
        deleteSmartLock: null,
        deleteDevicesApi: null,
        removeDevicesZone: null,
        addFreeDevice: null,
        getDeviceAirbnkLock: [],
        getDeviceDetails: [],
        getDeviceLog: [],
        createAirbnkLock: null,
        createDeviceApi: null
    },
    extraReducers: {
        ["devices/getListStatusDevice/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getListStatusDevice slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getListStatusDevice = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to fetch Device Status")
            }
        },

        ["devices/getAntiPassBackType/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getDeviceType slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAntiPassBackType = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to update Zone Data")
            }
        },

        ["devices/getEscortMode/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getDeviceType slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getEscortMode = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to update Zone Data")
            }
        },

        ["devices/getAllDevices/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllSupplierDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllDevices = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to fetch data")
            }
        },
        
        ["devices/getAllDevicesZoneNull/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getAllSupplierDoc slice ", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getAllDevicesZoneNull = data?.data
            }
            else if (status >= 400 && status < 500) {

                toast("Fail to fetch data")
            }
        },

        ["devices/createDeviceApi/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createDeviceApi slice", data)
            if (status >= 201 && status < 300) {
                // toast.success('Device created successfully')
                // toast.success('Creado bien')
                // state.createDevice
                //     = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.error(t('fail_to_create_device'))
                // toast.error('Fail to create device')
            }
        },

        ["devices/createAirbnkLock/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from createAirbnkLock slice", data)
            if (status >= 200 && status < 300) {
                // toast.success('Airbnk-Lock created successfully')
                // state.createDeviceSmartlock
                //     = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.error('Fail to create Airbnk-Lock')
            }
        },

        ["devices/getDeviceAirbnkLock/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getDeviceAirbnkLock slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getDeviceAirbnkLock
                    = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast("Fail to get Airbnk-lock")
            }
        },

        ["devices/getDeviceDetails/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getDeviceDetails slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getDeviceDetails
                    = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast("Fail to get smart lock")
            }
        },

        ["devices/getDeviceLog/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from getDeviceLog slice", data)
            if (status >= 200 && status < 300) {
                // toast(data.message)
                state.getDeviceLog
                    = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast("Fail to get smart lock")
            }
        },

        ["devices/addFreeDevice/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from addFreeDevice slice", data)
            if (status >= 200 && status < 300) {
                // toast.success('Device added successfully to zone')
            }
            else if (status >= 400 && status < 500) {
                // toast.error('Fail adding device to zone')
            }
        },

        ["devices/removeDevicesZone/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from removeDevicesZone slice", data)
            if (status >= 200 && status < 300) {
                // toast.success('Device added successfully to zone')
            }
            else if (status >= 400 && status < 500) {
                // toast.error('Fail adding device to zone')
            }
        },

        ["devices/updateDeviceApi/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from updateDeviceApi slice", data)
            if (status >= 200 && status < 300) {
                // toast.success('Device updated successfully')
                // state.updateDeviceApi
                //     = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.error("Fail to update device")
            }
        },

        ["devices/updateAirbnk/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from updateDeviceApi slice", data)
            if (status >= 200 && status < 300) {
                // toast.success('Airbnk-Lock updated successfully')
                // state.updateDeviceApi
                //     = data?.data
            }
            else if (status >= 400 && status < 500) {
                // toast.error("Fail to update Airbnk-Lock")
            }
        },

        ["devices/deleteAirbnk/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from deleteAirbnk slice", data)
            if (status >= 200 && status < 300) {
                // toast.success('Airbnk unlinked and deleted successfully')
                state.deleteAirbnk = data
            }
            else if (status >= 400 && status < 500) {

                // toast.error('Error: Something went wrong unlinking the lock')
            }
        },

        ["devices/deleteSmartLock/fulfilled"]: (state, action) => {
            const { data, status } = action.payload || {}
            // console.log("from deleteSmartLock slice", data)
            if (status >= 200 && status < 300) {
                // toast.success('Smart-Lock unlinked and deleted succesfully')
                state.deleteSmartLock = data
            }
            else if (status >= 400 && status < 500) {

                // toast.error('Error: Something went wrong unlinking the lock')
            }
        },

        ["devices/deleteDevicesApi/fulfilled"]: (state, action) => {

            const { data, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                // toast.success('Device(s) removed successfully')
            }
            else if (status >= 400 && status < 500) {
                // toast.error('Error: The action could not be completed')
            }
        },


    },

})

export const { ClearGetListZoneMap } = DevicesSlice.actions;

export default DevicesSlice.reducer;