import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const CompanyEmployeesSlice = createSlice({
  name: "companyEmployees",
  initialState: {
    companyEmployeesList: [],
    singleEmployeeDetail: {},
    singleEmployeeWithId: {},
    employeeRoles: [],
    employeeWorkStations: [],
    employeeDepartments: [],
    hasSelfiData: [],
    selfieImage: null,
    employeeDocumentsList: [],
    employeeVehiclesList: [],
    fireArmStatus: [],
    singleFireArm: [],
    userInfoStatusList: [],
    contractStatusList: [],
  },
  reducers: {
    singleFireArmRefresh: (state, action) => {
      state.singleFireArm = action.payload;
    },
    handleSelfi: (state, action) => {
      state.singleFireArm = action.payload;
    },
    handleSelfieImage: (state, action) => {
      state.selfieImage = null;
    },
  },
  extraReducers: {
    ["companyEmployees/getCompanyEmployees/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.companyEmployeesList = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["companyEmployees/getSingleEmployeeDetail/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.singleEmployeeDetail = data;
      } else if (status >= 400 && status < 500) {
        // toast("Fail to fetch data");
      }
    },
    ["companyEmployees/getSingleEmployeeWithId/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.singleEmployeeWithId = data;
      } else if (status >= 400 && status < 500) {
        // toast("Fail to fetch data");
      }
    },
    ["companyEmployees/GetContractStatus/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.contractStatusList = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["companyEmployees/getRoles/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.employeeRoles = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["companyEmployees/getWorkStations/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.employeeWorkStations = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["companyEmployees/getDepartments/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.employeeDepartments = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["companyEmployees/addWorkShift/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("Work Shift Added Succssfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went Wrong in workshift panel..!");
      }
    },
    ["companyEmployees/addCustomWorkShift/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("Custom Work Shift Added Succssfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went Wrong in adding custom workshift panel..!");
      }
    },
    ["companyEmployees/qrCodeByEmail/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("QR Code By Email sent Succssfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went Wrong in sending qr code by email..!");
      }
    },
    ["companyEmployees/unlinkDevice/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("Device unLinked Succssfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong unlinkDevice..!");
      }
    },
    ["companyEmployees/hasSelfi/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.hasSelfiData = data;
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in checking Selfi..!");
      }
    },
    ["companyEmployees/createImgObj/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in checking Selfi..!");
      }
    },
    ["companyEmployees/uploadNewImage/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.selfieImage = data;
        toast.success("image Uploaded successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in checking Selfi..!");
      }
    },
    ["companyEmployees/getSelfie/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in checking Selfi..!");
      }
    },
    ["companyEmployees/downloadSelfie/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.selfieImage = data;
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in downloading selfie..!");
      }
    },
    ["companyEmployees/updateUser/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("user updated Successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in updateUser..!");
      }
    },
    ["companyEmployees/updateUserEmployee/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success(data?.message);
      } else if (status >= 400 && status < 500) {
        toast(data?.message);
      }
    },
    ["companyEmployees/updateExtraData/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("Extra Data updated Successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in updateExtraData..!");
      }
    },
    ["companyEmployees/documentListing/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.employeeDocumentsList = data;
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in documentListing..!");
      }
    },
    ["companyEmployees/employeeVehicles/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.employeeVehiclesList = data;
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in employeeVehicles..!");
      }
    },
    ["companyEmployees/checkFireArms/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        if (data === false) {
          toast.success("No FireArms..!");
        }
        state.fireArmStatus = data;
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in checkFireArms..!");
      }
    },
    ["companyEmployees/creatFireArms/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("FireArms created successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in creating FireArms..!");
      }
    },
    ["companyEmployees/updateFireArms/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("FireArms updated successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("something went in Wrong in creating FireArms..!");
      }
    },
    ["companyEmployees/getFireArm/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.singleFireArm = data;
      } else if (status >= 400 && status < 500) {
        // toast("something went in Wrong in getting FireArms..!")
      }
    },
    ["companyEmployees/userInfoStatus/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.userInfoStatusList = data;
      } else if (status >= 400 && status < 500) {
        toast(status?.message);
      }
    },
    ["companyEmployees/approveDocs/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      console.log(data);
      if (status >= 200 && status < 300) {
        toast.success("Succeeded..!");
      } else if (status >= 400 && status < 500) {
        toast(data?.message);
      }
    },
  },
});

export const { singleFireArmRefresh, handleSelfi, handleSelfieImage } =
  CompanyEmployeesSlice.actions;

export default CompanyEmployeesSlice.reducer;
