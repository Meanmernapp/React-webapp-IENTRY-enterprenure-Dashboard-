import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../Apis/Axios";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};


export const getCompanyEmployees = createAsyncThunk(
  "companyEmployees/getCompanyEmployees",
  async (body, { dispatch, getState }) => {
    let result = await apiInstance
      .post(`user-access/get-all-pageable`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const GetContractStatus = createAsyncThunk(
  "companyEmployees/GetContractStatus",
  async () => {
    let result = await apiInstance
      .get(`status-service/get-all-to-employee-contract`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getSingleEmployeeDetail = createAsyncThunk(
  "companyEmployees/getSingleEmployeeDetail",
  async (id) => {
    let result = await apiInstance
      .get(`employee-service/get-by-user-id/with-selfie/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getSingleEmployeeWithId = createAsyncThunk(
  "companyEmployees/getSingleEmployeeWithId",
  async (id) => {
    let result = await apiInstance
      .get(`employee-service/get-by-user-id/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getRoles = createAsyncThunk(
  "companyEmployees/getRoles",
  async () => {
    let result = await apiInstance
      .get(`role-service/get-all`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getWorkStations = createAsyncThunk(
  "companyEmployees/getWorkStations",
  async () => {
    let result = await apiInstance
      .get(`zone-service/get-all`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getDepartments = createAsyncThunk(
  "companyEmployees/getDepartments",
  async () => {
    let result = await apiInstance
      .get(`department-service/get-all`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);



// @GetWorkShiftAccess
// export const GetWorkShiftAccess = createAsyncThunk(
//   "companyEmployees/getWorkStations",
//   async (params) => {
//     let result = await apiInstance
//       .post(`work-shift-service/work/get-all-pageable/by-user-id/${""}`, params.pagination)
//       .then(function (response) {
//         return response;
//       })
//       .catch(function (error) {
//         return error.response;
//       });
//     const { data, status } = result;

//     return { data, status };
//   }
// );
export const addWorkShift = createAsyncThunk(
  "companyEmployees/addWorkShift",
  async (body) => {
    let result = await apiInstance
      .get(
        `work-shift-service/work/create/by-work-shift-id/${body.workShiftId}/by-user-id/${body.userId}`
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);


export const addCustomWorkShift = createAsyncThunk(
  "companyEmployees/addCustomWorkShift",
  async (body) => {
    let result = await apiInstance
      .post(`work-shift-service/work/create-list`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const qrCodeByEmail = createAsyncThunk(
  "companyEmployees/qrCodeByEmail",
  async (id) => {
    let result = await apiInstance
      .get(`user-service/send-qr-code/by-id/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const unlinkDevice = createAsyncThunk(
  "companyEmployees/unlinkDevice",
  async (id) => {
    let result = await apiInstance
      .put(`user-service/unlink-device/by-id/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const hasSelfi = createAsyncThunk(
  "companyEmployees/hasSelfi",
  async (id) => {
    let result = await apiInstance
      .get(`user-service/user-image/check-selfie/by-user-id/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const createImgObj = createAsyncThunk(
  "companyEmployees/createImgObj",
  async (body) => {
    let result = await apiInstance
      .post(`user-service/user-image/create`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const uploadNewImage = createAsyncThunk(
  "companyEmployees/uploadNewImage",
  async (params) => {
    let result = await apiInstance
      .put(`image-service/upload`, params, config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getSelfie = createAsyncThunk(
  "companyEmployees/getSelfie",
  async (userId) => {
    let result = await apiInstance
      .get(`user-service/user-image/get-selfie/by-user-id/${userId}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const downloadSelfie = createAsyncThunk(
  "companyEmployees/downloadSelfie",
  async (selfeiId) => {
    let result = await apiInstance
      .get(`image-service/download-by-id/${selfeiId}/option/user`, {
        responseType: "blob",
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });

    const { data, status } = result;
    return { data, status };
  }
);

export const updateUser = createAsyncThunk(
  "companyEmployees/updateUser",
  async (body) => {
    let result = await apiInstance
      .put(`user-service/update`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const updateUserEmployee = createAsyncThunk(
  "companyEmployees/updateUserEmployee",
  async (body) => {
    let result = await apiInstance
      .put(`employee-service/update`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const updateExtraData = createAsyncThunk(
  "companyEmployees/updateExtraData",
  async (body) => {
    let result = await apiInstance
      .put(`extra-data-service/update-by-user-id/${body.id}`, body.obj)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const documentListing = createAsyncThunk(
  "companyEmployees/documentListing",
  async (userId) => {
    let result = await apiInstance
      .get(`document-service/employee/get-all/by-user-id/${userId}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const employeeVehicles = createAsyncThunk(
  "companyEmployees/employeeVehicles",
  async (userId) => {
    let result = await apiInstance
      .get(`vehicle-company-service/get-all/by-user-id/${userId}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const checkFireArms = createAsyncThunk(
  "companyEmployees/checkFireArms",
  async (userId) => {
    let result = await apiInstance
      .get(`firearm-service/check-fire-arm/by-user-id/${userId}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const userInfoStatus = createAsyncThunk(
  "companyEmployees/userInfoStatus",
  async () => {
    let result = await apiInstance
      .get(`status-service/get-all-to-user`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const creatFireArms = createAsyncThunk(
  "companyEmployees/creatFireArms",
  async (body) => {
    let result = await apiInstance
      .post(`firearm-service/create`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const updateFireArms = createAsyncThunk(
  "companyEmployees/updateFireArms",
  async (body) => {
    let result = await apiInstance
      .put(`firearm-service/update`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getFireArm = createAsyncThunk(
  "companyEmployees/getFireArm",
  async (userId) => {
    let result = await apiInstance
      .get(`firearm-service/get-by-id/${userId}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const approveDocs = createAsyncThunk(
  "companyEmployees/approveDocs",
  async (body) => {
    let result = await apiInstance
      .post(`document-service/approve-employee-document`, body)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);
