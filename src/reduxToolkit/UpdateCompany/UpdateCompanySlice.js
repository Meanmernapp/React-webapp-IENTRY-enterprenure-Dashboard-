import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const UpdateCompanySlice = createSlice({
  name: "updateCompany",
  initialState: {
    companyDataToUpdateObj: [],
    SelectRestrictionData: [],
    CompanyRestrictionData: [],
    latLngObj: {},
  },
  reducers: {
    mapCoordinates: (state, action) => {
      state.latLngObj = action.payload;
    },
  },
  extraReducers: {
    ["updateCompany/companyDataToUpdate/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.companyDataToUpdateObj = data;
      } else if (status >= 400 && status < 500) {
        toast("Failed to fetch data");
      }
    },
    ["updateCompany/getSelectRestrictionObj/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.SelectRestrictionData = data;
      } else if (status >= 400 && status < 500) {
        toast("Failed to fetch data");
      }
    },
    ["updateCompany/getCompanyRestrictionObj/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        state.CompanyRestrictionData = data;
      } else if (status >= 400 && status < 500) {
        toast("Failed to fetch data");
      }
    },
    ["updateCompany/updateCompany/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast("company updated successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Failed to update company data");
      }
    },
    ["updateCompany/updateCompanyRestrictions/fulfilled"]: (state, action) => {
      const {
        data: { data },
        status,
      } = action.payload || {};
      if (status >= 200 && status < 300) {
        toast("company restrictions updated successfully..!");
      } else if (status >= 400 && status < 500) {
        toast("Failed to update restrictions data");
      }
    },
  },
});

export const { mapCoordinates } = UpdateCompanySlice.actions;

export default UpdateCompanySlice.reducer;
