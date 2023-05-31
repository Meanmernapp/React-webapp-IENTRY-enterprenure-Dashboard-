import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../Apis/Axios";
import apiInstanceV2 from "../../Apis/AxiosV2";

export const GetUserAccessList = createAsyncThunk(
  "accessHistory/getUserAccessList",
  async (body, { dispatch, getState }) => {
    let result = await apiInstanceV2
      .post(`log-service/user-access/get-all-pageable`, body)
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

export const GetVehicleAccessList = createAsyncThunk(
  "accessHistory/getVehicleAccessList",
  async (body, { dispatch, getState }) => {
    let result = await apiInstanceV2
      .post(`log-service/vehicle-access/get-all-pageable`, body)
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
