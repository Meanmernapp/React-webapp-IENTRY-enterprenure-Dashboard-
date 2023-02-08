import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../Apis/Axios";

export const getAllEmployeesDocuments = createAsyncThunk(
  "userDocPanel/getAllEmployeesDocuments",
  async () => {
    let result = await apiInstance
      .get(`document-service/employee/get-all/for-company`)
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

export const getAllExternalDocuments = createAsyncThunk(
  "userDocPanel/getAllExternalDocuments",
  async () => {
    let result = await apiInstance
      .post(`document-service/external/get-all/for-company`)
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
