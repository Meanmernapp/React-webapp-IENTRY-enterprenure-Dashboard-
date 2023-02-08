import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const CompanyVehiclesSlice = createSlice({
    name: "companyVehicles",
    initialState: {
        createVehicleObj: {
            brand: "",
            color: "",
            model: 0,
            plate: "",
            serialNumber: "",
            subBrand: "",
            vin: ""
        },
        singleVehicleData: [],
        imagesByVehicleIdList: [],
        vehicleImgObject: [],
        vehicleImgGallery: []
    },
    reducers: {
        updateCreateVehicleObj: (state, action) => {
            if (action.payload?.name) {
                const { name, value } = action.payload
                state.createVehicleObj = { ...state.createVehicleObj, [name]: value }
            } else {
                state.createVehicleObj = action.payload;
            }
        },
    },
    extraReducers: {
        ["companyVehicles/createVehicle/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("Vehicle Created Successfull...!")
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["companyVehicles/updateCompanyVehicle/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("Vehicle Created Successfull...!")
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["companyVehicles/singleVehicleDetail/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.singleVehicleData = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["companyVehicles/updateVehicle/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("Vehicle updated Successfull...!")
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["companyVehicles/ImagesByVehicleId/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.imagesByVehicleIdList = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["companyVehicles/createVehicleImgObject/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                state.vehicleImgObject = data
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["companyVehicles/uploadVehicleImage/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                toast.success("image updateded Successfull...!")
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
        ["companyVehicles/downloadVehicleImages/fulfilled"]: (state, action) => {
            const { data: { data }, status } = action.payload || {}
            if (status >= 200 && status < 300) {
                console.log(action.payload)
                state.vehicleImgGallery = [...state.vehicleImgGallery, data]
            }
            else if (status >= 400 && status < 500) {
                toast("Fail to fetch data")
            }
        },
    },

})

export const { updateCreateVehicleObj } = CompanyVehiclesSlice.actions;

export default CompanyVehiclesSlice.reducer;