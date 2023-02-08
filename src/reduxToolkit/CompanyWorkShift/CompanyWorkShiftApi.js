import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../Apis/Axios";
import { toast } from "react-toastify";

// Create Work Shift Api's
export const CreateCompanyWorkShift = createAsyncThunk(
  "companyWorkShift/CreateCompanyWorkShift",
  async (getVal) => {
    let result = await apiInstance
      .post("work-shift-service/create", { name: getVal })
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          toast.success("Work Shift Added SuccessFully");
        }
        return response;
      })
      .catch(function (error) {
        toast.error("Work Shift Added Fail");
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const CreateWorkShiftAccess = createAsyncThunk(
  "companyWorkShift/CreateWorkShiftAccess",
  async (shiftList) => {
    let result = await apiInstance
      .post(`work-shift-service/schedule/create-list`, shiftList)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          toast.success("access added to work shift successFully");
        }
        return response;
      })
      .catch(function (error) {
        toast.error("Work Shift Added Fail");
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const GetAllWorkShifts = createAsyncThunk(
  "companyWorkShift/GetAllWorkShifts",
  async (getVal) => {
    let result = await apiInstance
      .post("work-shift-service/get-all-pageable", getVal)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          // toast.success("Work Shift Added SuccessFully");
        }
        return response;
      })
      .catch(function (error) {
        // toast.error("Work Shift Added Fail");
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const UserWorkSchedule = createAsyncThunk(
  "companyWorkShift/UserWorkSchedule",
  async (params) => {
    const { id, UsercontractPagination } = params;
    let result = await apiInstance
      .post(
        `work-shift-service/work/get-all-pageable/by-work-shift-id/${id}`,
        UsercontractPagination
      )
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          // toast("User Work Schedule SuccessFully");
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const GetAllUsers = createAsyncThunk(
  "companyWorkShift/GetAllUsers",
  async () => {
    let result = await apiInstance
      .get("employee-service/get-all/only-user-data")
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          // toast.success("All User Fetch SuccessFully");
        }
        return response;
      })
      .catch(function (error) {
        toast.error("Work Shift Added Fail");
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const GetAllByWorkShiftId = createAsyncThunk(
  "companyWorkShift/GetAllByWorkShiftId",
  async (workShiftId) => {
    let result = await apiInstance
      .get(`work-shift-service/work/get-all/by-work-shift-id/${workShiftId}`)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          // toast.success("All User Fetch SuccessFully");
        }
        return response;
      })
      .catch(function (error) {
        toast.error("Work Shift Added Fail");
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const AddUserWithWorkShiftId = createAsyncThunk(
  "companyWorkShift/AddUserWithWorkShiftId",
  async (params) => {
    const { id, all_user } = params;
    let result = await apiInstance
      .post(
        `work-shift-service/work/create-all/by-work-shift-id/${id}`,
        all_user
      )
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          toast.success("User Added In the Work Shift Successfully");
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const DeleteUserFromWorkShift = createAsyncThunk(
  "companyWorkShift/DeleteUserFromWorkShift",
  async (params) => {
    const { id, delId } = params;

    let result = await apiInstance
      .delete(
        `work-shift-service/work/delete-by-user-id/${delId}/by-work-shift-id/${id}`
      )
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          toast.success(response.data.message);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);

export const DeleteWorkSHiftTime = createAsyncThunk(
  "companyWorkShift/DeleteWorkSHiftTime",
  async (id) => {
    let result = await apiInstance
      .delete(`work-shift-service/schedule/delete-by-id/${id}`)
      .then(function (response) {
        if (response.status == 201 || response.status == 200) {
          toast.success("User Work Schedule Delete SuccessFully");
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    const { data, status } = result;
    return { data, status };
  }
);
