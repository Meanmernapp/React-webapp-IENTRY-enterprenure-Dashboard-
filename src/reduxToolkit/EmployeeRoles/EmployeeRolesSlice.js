import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const EmployeeRolesSlice = createSlice({
  name: "employeeRoles",
  initialState: {
    roleListData: [],
    roleList: [],
    employeesWithRoleList: [],
    allEmployeesList: [],
    pageableEmployeesList: [],
    selectedEmployeesList: [],
    singleRoleObj: {},
    addUsersToRoleSuccess: {},
    removeRoleToUser: {},
    updateRoleSuccess: {},
    creteRoleSuccess: {},

  },
  reducers: {
    EmployeesInCreate: (state, action) => {
      state.selectedEmployeesList = action.payload;
    },
    HandleEmployeesWithRole: (state, action) => {
      state.employeesWithRoleList = action.payload;
    },
  },
  extraReducers: {
    ["employeeRoles/roleAvailableTasks/fulfilled"]: (state, action) => {
      const { data: { data }, status, } = action.payload || {};
      if (status >= 200 && status < 300) {
        // Filter out objects with name containing "_Menu"
        const filteredMenu = data.filter(item => !item.name.includes('_MENU'));
        // Filter remaining objects without "_Menu"
        const filtered = filteredMenu.filter(item => !item.name.includes('_MENU'));
        state.roleListData = filtered
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["employeeRoles/getEmployeeRoles/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.roleList = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["employeeRoles/getEmployesWithRole/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.employeesWithRoleList = data;
        state.selectedEmployeesList = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["employeeRoles/getAllEmployees/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.allEmployeesList = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["employeeRoles/getAllroleEmployeesPageable/fulfilled"]: (
      state,
      action
    ) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.pageableEmployeesList = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to fetch data");
      }
    },
    ["employeeRoles/removeRoleToUserById/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.removeRoleToUser = data
        toast.success("user removed successfully..!");

      } else if (status >= 400 && status < 500) {
        toast("Fail to remove user.");
      }
    },
    ["employeeRoles/addUsersToRole/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("user added to role successfully..!");
        state.addUsersToRoleSuccess = data
      } else if (status >= 400 && status < 500) {
        toast("Fail to add users");
      }
    },
    ["employeeRoles/creatRole/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.creteRoleSuccess = data
        toast.success("role successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Fail to create role");
      }
    },
    ["employeeRoles/addPermissionTask/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("permissions added successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Fail to add permissions");
      }
    },
    ["employeeRoles/updateRoleRestriction/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("role restructions updated successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Fail to update role restructions");
      }
    },
    ["employeeRoles/GetSingleRole/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.singleRoleObj = data?.data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to update role restructions");
      }
    },
    ["employeeRoles/UpdateRole/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.updateRoleSuccess = data
        toast.success("role updated successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Fail to update role restructions");
      }
    },
  },
});

export const {
  EmployeesInCreate,
  HandleEmployeesWithRole,
  HandleTaskList,
  HandleChoosedList,
} = EmployeeRolesSlice.actions;

export default EmployeeRolesSlice.reducer;
