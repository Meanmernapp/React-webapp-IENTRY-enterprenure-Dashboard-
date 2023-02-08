import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiInstance from "../../Apis/Axios";

export const fullDBRestore = createAsyncThunk(
  "dbBackUp/fullDBRestore",
  async (body) => {
    for (const value of body.values()) {
    }
    let response = await apiInstance
      .post(
        `assets-service/database-restore`,
        { file: body },
        { "Content-Type": "multipart/form-data" }
      )
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        return error.response;
      });
    const { data, status } = response;
    return { data, status };
  }
);

export const getAllEntities = createAsyncThunk(
  "dbBackUp/getAllEntities",
  async () => {
    let response = await apiInstance
      .get(`assets-service/back-up/restore/soft-deleted/get-all-entities`)
      .then((response) => {
        // toast.success(response?.data?.message);
        return response;
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        return error.response;
      });
    const { data, status } = response;
    return { data, status };
  }
);

export const GetRecordInTimePeriod = createAsyncThunk(
  "dbBackUp/GetRecordInTimePeriod",
  async (body) => {
    const { from, to, table, pagination } = body;
    let response = await apiInstance
      .post(
        `assets-service/back-up/restore/get-pageable-records-of-table/${table}/from/${from}/to/${to}`,
        pagination
      )
      .then((response) => {
        // console.log(response.data?.data.content)
        if (response?.data?.data?.content?.length > 0) {
          toast.success("Backup Data Found")
        } else {
          toast.warn("Sorry! No Data Backup is Avalaible")
        }
        // toast.success(response?.data?.message);

        return response;
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        return error.response;
      });
    const { data, status } = response;
    return { data, status };
  }
);

export const GetInformationById = createAsyncThunk(
  "dbBackUp/getInformationById",
  async (body) => {
    const { id, table } = body;

    let response = await apiInstance
      .get(`assets-service/get-by-id/${id}/get-by-table/${table}`, body)
      .then((response) => {
        toast.success(response?.data?.message);
        return response;
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        return error.response;
      });
    const { data, status } = response;
    return { data, status };
  }
);

export const RestoreTableInformation = createAsyncThunk(
  "dbBackUp/RestoreTableInformation",
  async (body) => {
    const { table, list } = body;
    let response = await apiInstance
      .put(`assets-service/back-up/restore/records-of-table/${table}`, list)
      .then((response) => {
        toast.success(response?.data?.message);
        return response;
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        return error.response;
      });
    const { data, status } = response;
    return { data, status };
  }
);

export const CreateDataBaseBackUp = createAsyncThunk(
  "dbBackUp/CreateDataBaseBackUp",
  async (fileName) => {
    let response = await apiInstance
      .get(`assets-service/back-up-database?file_name=${fileName}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { data, status } = response;
    return { data, status };
  }
);
