import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../Apis/Axios";

export const companyDataToUpdate = createAsyncThunk(
  "updateCompany/companyDataToUpdate",
  async (companyId) => {
    let result = await apiInstance
      .get(`company-service/get-by-id/${companyId}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getSelectRestrictionObj = createAsyncThunk(
  "updateCompany/getSelectRestrictionObj",
  async () => {
    let result = await apiInstance
      .get(`restriction-service/get-all`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const getCompanyRestrictionObj = createAsyncThunk(
  "updateCompany/getCompanyRestrictionObj",
  async (id) => {
    let result = await apiInstance
      .get(`company-service/company-restriction/get-by-id/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const updateCompany = createAsyncThunk(
  "updateCompany/updateCompany",
  async (params) => {
    let result = await apiInstance
      .put(`company-service/update`, params)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);

export const updateCompanyRestrictions = createAsyncThunk(
  "updateCompany/updateCompanyRestrictions",
  async (params) => {
    console.log(params);

    let result = await apiInstance
      .put(`company-service/company-restriction/update`, params)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { data, status } = result;

    return { data, status };
  }
);
