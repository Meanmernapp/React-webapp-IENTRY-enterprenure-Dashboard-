import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../Apis/Axios";

//get extra data
export const GetHeaders = createAsyncThunk("headers/GetHeaders", async () => {
  let result = await apiInstance
    .get(`extra-data-service/header/get`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  const { data, status } = result;

  return { data, status };
});

//update extra data
export const UpdateHeaders = createAsyncThunk(
  "headers/UpdateHeaders",
  async (body) => {
    let result = await apiInstance
      .put(`extra-data-service/header/update`, body)
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
