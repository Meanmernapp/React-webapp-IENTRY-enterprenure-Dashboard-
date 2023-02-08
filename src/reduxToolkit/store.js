import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authenticatioauthennSlice from "./authentication/authenticationSlice";
import EmployeeEventsSlice from "./EmployeeEvents/EmployeeEventsSlice";
import EmployeeProviderSlice from "./EmployeeProviders/EmployeeProviderSlice";
import EmployeeContractorsSlice from "./EmployeeContractors/EmployeeContractorsSlice";
import EmployeeZonesSlice from "./EmployeeZones/EmployeeZoneSlice";
import vehicleDocumentSlice from "./CompanyDocuments/vehicleDocumentSlice";
import CompanyWorkShiftSlice from "./CompanyWorkShift/CompanyWorkShiftSlice";
import NotificationsSlice from "./Notifications/NotificationsSlice";
import AccessHistorySlice from "./AccessHistory/AccessHistorySlice";
import LogSlice from "./Logs/LogSlice";
import providersSlice from "./Providers/providerSlice";
import ContractorSlice from "./Contractor/ContractorSlice";
import UserDocPanelSlice from "./UserDocPanel/UserDocPanelSlice";
import CompanyEmployeesSlice from "./CompanyEmployees/CompanyEmployeesSlice";
import EmployeeRolesSlice from "./EmployeeRoles/EmployeeRolesSlice";
import CompanyVehiclesSlice from "./CompanyVehicles/CompanyVehiclesSlice";
import UpdateCompanySlice from "./UpdateCompany/UpdateCompanySlice";
import employeePayrollSlice from "./EmployeePayRoll/EmployeePayRollSlice";
import BackUpSlice from "./CompanyBackup/backUpSlice";
import employeeOnBoardingSlice from "./EmployeeOnBoarding/EmployeeOnBoardingSlice";
import headersSlice from "./headers/headersSlice";
import DocumentPanelSlice from "./DocumentPanel/DocumentPanelSlice";

const reducers = combineReducers({
  UpdateCompanySlice,
  authenticatioauthennSlice,
  vehicleDocumentSlice,
  EmployeeContractorsSlice,
  EmployeeEventsSlice,
  EmployeeProviderSlice,
  EmployeeZonesSlice,
  CompanyWorkShiftSlice,
  NotificationsSlice,
  AccessHistorySlice,
  LogSlice,
  providersSlice,
  ContractorSlice,
  UserDocPanelSlice,
  CompanyEmployeesSlice,
  EmployeeRolesSlice,
  CompanyVehiclesSlice,
  employeePayrollSlice,
  BackUpSlice,
  employeeOnBoardingSlice,
  headersSlice,
  DocumentPanelSlice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authenticatioauthennSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
