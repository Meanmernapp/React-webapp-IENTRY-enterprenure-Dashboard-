import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../Apis/Axios";

export const roleAvailableTasks = createAsyncThunk(
  "employeeRoles/roleAvailableTasks",
  async () => {
    let result = await apiInstance
      .get(`task-service/get-all`)
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

export const getAllroleEmployeesPageable = createAsyncThunk(
  "employeeRoles/getAllroleEmployeesPageable",
  async (body) => {
    let result = await apiInstance
      .post(
        `role-service/get-all-employees-pageable/by-id/${body.id}`,
        body.pagination
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

export const getEmployeeRoles = createAsyncThunk(
  "employeeRoles/getEmployeeRoles",
  async (body, { dispatch, getState }) => {
    let result = await apiInstance
      .post(`role-service/get-all-pageable`, body)
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

export const getEmployesWithRole = createAsyncThunk(
  "employeeRoles/getEmployesWithRole",
  async (roleId, { dispatch, getState }) => {
    let result = await apiInstance
      .get(`role-service/get-all-employees/by-id/${roleId}`)
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

export const getAllEmployees = createAsyncThunk(
  "employeeRoles/getAllEmployees",
  async () => {
    let result = await apiInstance
      .get(`employee-service/get-all/only-user-data`)
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

export const removeRoleToUserByIds = createAsyncThunk(
  "employeeRoles/removeRoleToUserById",
  async (body) => {
    let result = await apiInstance
      .put(`role-service/remove-role-to-users-by-ids`,body)
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

export const addUsersToRole = createAsyncThunk(
  "employeeRoles/addUsersToRole",
  async (body) => {
    let result = await apiInstance
      .put(`role-service/add-role-to-users-by-ids`, body)
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

export const creatRole = createAsyncThunk(
  "employeeRoles/creatRole",
  async (body) => {
    let result = await apiInstance
      .post(`role-service/v1/create`, body)
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

export const addPermissionTask = createAsyncThunk(
  "employeeRoles/addPermissionTask",
  async (body) => {
    let result = await apiInstance
      .post(`role-service/add-role-task-list`, body)
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

export const updateRoleRestriction = createAsyncThunk(
  "employeeRoles/updateRoleRestriction",
  async (body) => {
    let result = await apiInstance
      .put(`role-service/role-restriction/update`, body)
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

export const GetSingleRole = createAsyncThunk(
  "employeeRoles/GetSingleRole",
  async (id) => {
    let result = await apiInstance
      .get(`role-service/v1/get-by-id/${id}`)
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

export const UpdateRole = createAsyncThunk(
  "employeeRoles/UpdateRole",
  async (body) => {
    let result = await apiInstance
      .put(`role-service/v1/update`, body)
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
