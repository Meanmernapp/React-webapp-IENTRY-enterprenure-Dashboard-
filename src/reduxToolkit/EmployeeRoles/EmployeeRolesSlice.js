import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const EmployeeRolesSlice = createSlice({
  name: "employeeRoles",
  initialState: {
    mobileAvailableList: [],
    websiteAvailableList: [],
    mobileChooseList: [],
    websiteChooseList: [],
    mobileSelected: [],
    websiteSelected: [],
    roleList: [],
    employeesWithRoleList: [],
    allEmployeesList: [],
    pageableEmployeesList: [],
    selectedEmployeesList: [],
    singleRoleObj: {},
  },
  reducers: {
    EmployeesInCreate: (state, action) => {
      state.selectedEmployeesList = action.payload;
    },
    HandleEmployeesWithRole: (state, action) => {
      state.employeesWithRoleList = action.payload;
    },
    HandleChoosedList: (state, action) => {
      console.log(action.payload);
      state.mobileChooseList = action.payload.arr1;
      state.websiteChooseList = action.payload.arr2;
    },
    HandleTaskList: (state, { payload }) => {
      if (payload.check === 1) {
        let arr1 = state.mobileAvailableList.filter(
          (item) => item.id !== payload.selected.id
        );
        state.mobileAvailableList = arr1;

        let arr2 = [...state.mobileSelected];
        arr2.push(payload.selected);
        state.mobileSelected = arr2;
      } else if (payload.check === 2) {
        let arr1 = state.mobileSelected.filter(
          (item) => item.id !== payload.selected.id
        );
        state.mobileSelected = arr1;

        let arr2 = [...state.mobileAvailableList];
        arr2.push(payload.selected);
        state.mobileAvailableList = arr2;
      } else if (payload.check === 3) {
        let arr1 = state.websiteAvailableList.filter(
          (item) => item.id !== payload.selected.id
        );
        state.websiteAvailableList = arr1;

        let arr2 = [...state.websiteSelected];
        arr2.push(payload.selected);
        state.websiteSelected = arr2;
      } else if (payload.check === 4) {
        let arr1 = state.websiteSelected.filter(
          (item) => item.id !== payload.selected.id
        );
        state.websiteSelected = arr1;

        let arr2 = [...state.websiteAvailableList];
        arr2.push(payload.selected);
        state.websiteAvailableList = arr2;
      } else if (payload.check === 5) {
        state.mobileSelected = [];
        state.websiteSelected = [];
      }
    },
  },
  extraReducers: {
    ["employeeRoles/roleAvailableTasks/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        let arr1 = [];
        let arr2 = [];
        data.map((item) => {
          if (item.isMobileApp) {
            arr1.push(item);
          } else {
            arr2.push(item);
          }
        });
        state.mobileAvailableList = arr1;
        state.websiteAvailableList = arr2;
        state.mobileChooseList = arr1;
        state.websiteChooseList = arr2;
        console.log(data);
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
        toast.success("user removed successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Fail to remove user.");
      }
    },
    ["employeeRoles/addUsersToRole/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast.success("user added to role successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Fail to add users");
      }
    },
    ["employeeRoles/creatRole/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
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
        state.singleRoleObj = data;
      } else if (status >= 400 && status < 500) {
        toast("Fail to update role restructions");
      }
    },
    ["employeeRoles/UpdateRole/fulfilled"]: (state, action) => {
      const { data, status } = action.payload || {};
      if (status >= 200 && status < 300) {
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
