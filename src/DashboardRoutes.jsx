import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { checkAutoLogin } from "./Apis/Authentication";

import { Dashboard } from "./pages/Dashboard/Dashboard";
import SideBar from './pages/Dashboard/SideBar';

import { Company } from "./pages/Dashboard/Company/Company";
import { CompanyDetails } from "./pages/Dashboard/Company/CompanyDetails";
import DocumentsPanel from "./pages/Dashboard/Company/DocumentsPanel";
import WorkShiftPanel from "./pages/Dashboard/Company/WorkShift/WorkShiftPanel";
import AllEmployees from "./pages/Dashboard/Company/Employees/AllEmployees";
import UpdateEmployee from "./pages/Dashboard/Company/Employees/UpdateEmployee";
import AddEmployeeRecord from "./pages/Dashboard/Company/Employees/AddEmployeeRecord";
import UploadEmployeeFile from "./pages/Dashboard/Company/Employees/UploadEmployeeFile";
import UpdateData from "./pages/Dashboard/Company/UpdateData";
import { Vehicles } from "./pages/Dashboard/Company/Vehicles/Vehicles";

import Zones from "./pages/Dashboard/Zones/Zones";
import SingleZoneDetails from "./pages/Dashboard/Zones/SingleZoneDetails"
import ShowDevices from "./pages/Dashboard/Zones/ShowDevices"
import AuthorizedEmployees from "./pages/Dashboard/Zones/Modal/AuthorizedEmployees"
import UpdateZone from "./pages/Dashboard/Zones/UpdateZone";

import { ContractorOutlet } from "./pages/Dashboard/Contractors/ContractorOutlet";
import ContractorDetails from './pages/Dashboard/Contractors/contractorDetails';
import UploadContractorFile from "./pages/Dashboard/Contractors/UploadContractorFile";
import ContractorPanel from "./pages/Dashboard/Contractors/contractorPanel";
import AddContractor from "./pages/Dashboard/Contractors/AddContractor";
import { CreateContractor } from "./pages/Dashboard/Contractors/CreateContract";
import EmployeeContractorDetails from "./pages/Dashboard/Contractors/EmployeeContractorDetails";
import ContractorApproveDocument from "./pages/Dashboard/Contractors/contractorApproveDocument"
import UpdateContractor from "./pages/Dashboard/Contractors/UpdateContractor";
import ProviderOrderDetail from "./pages/Dashboard/Providers/ProviderDetailsApproveDocuments";
import VehicleProviderDetails from "./pages/Dashboard/Providers/VehicleProviderDetails";

import { ProviderOutlet } from "./pages/Dashboard/Providers/ProviderOutlet";
import ProvidersPanel from './pages/Dashboard/Providers/providersPanel';
import { CreateOrder } from "./pages/Dashboard/Providers/CreateOrder";
import RolesPanel from "./pages/Dashboard/Company/RolesPanel";
import AllVehicles from "./pages/Dashboard/Company/Vehicles/AllVehicles";
import AddUpdateVehicle from "./pages/Dashboard/Company/Vehicles/AddUpdateVehicle";
import OrderDetails from "./pages/Dashboard/Providers/OrderDetails";
import AddProviders from "./pages/Dashboard/Providers/AddProviders";
import UpdateProvider from "./pages/Dashboard/Providers/UpdateProvider";
import ProviderDetails from "./pages/Dashboard/Providers/ProviderDetails";
import ApproveDocument from "./pages/Dashboard/Providers/ApproveDocument";
import UploadProviderFile from "./pages/Dashboard/Providers/UploadProviderFile";

// lazyLoading import
const Home = lazy(() => import('./pages/Home/Home'));
const LoginOption = lazy(() => import('./pages/LoginOption/LoginOption'));


const DashboardRoutes = () => {

  let routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('bearerToken');

  useEffect(() => {
    checkAutoLogin(dispatch, navigate);
  }, []);

  if (isAuthenticated) {
    routes = (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <div className=" position-fixed">
              <SideBar />
            </div>
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/dashboard/*" element={<Dashboard />} >

                <Route index path="company" element={<CompanyDetails />} />
                <Route path="company" element={<Company />} >

                  <Route path="document-panel" element={<DocumentsPanel />} />
                  <Route path="update-data" element={<UpdateData />} />
                  <Route path="workshift-panel" element={<WorkShiftPanel />} />
                  <Route path="roles-panel" element={<RolesPanel />} />

                  <Route path="employees" element={<AllEmployees />} />
                  <Route path="updateemployee" element={<UpdateEmployee />} />
                  <Route path="addemployee" element={<AddEmployeeRecord />} />
                  <Route path="addemployee/:id" element={<AddEmployeeRecord />} />
                  <Route path="uploademployeefile" element={<UploadEmployeeFile />} />

                  <Route path="allvehicles" element={<AllVehicles />} />
                  <Route path="addupdatevehicle" element={<AddUpdateVehicle />} />
                  <Route path="addupdatevehicle/:id" element={<AddUpdateVehicle />} />

                </Route>


                <Route path="zones" element={<Zones />} />
                <Route path="singlezonedetails" element={<SingleZoneDetails />} />
                <Route path="showdevices" element={<ShowDevices />} />
                <Route path="authmodal" element={<AuthorizedEmployees />} />
                <Route path="updatezone" element={<UpdateZone />} />


                <Route index path="contractors-outlet" element={<ContractorPanel />} />
                <Route path="contractors-outlet" element={<ContractorOutlet />}>
                  <Route path="contractor-panel" element={<ContractorPanel />} />
                  <Route path="create-order" element={<CreateContractor />} />
                  <Route path="add-contractor" element={<AddContractor />} />
                  <Route path="update-contractor" element={<UpdateContractor />} />
                  <Route path="employee-contractor-details" element={<EmployeeContractorDetails />} />
                  <Route path="contractor-approve-document" element={<ContractorApproveDocument />} />
                  <Route path="upload-contractor" element={<UploadContractorFile />} />
                  <Route path="contractor-details" element={<ContractorDetails />} />
                  <Route path="provider-detail" element={<ProviderOrderDetail />} />
                  <Route path="vehicle-detail" element={<VehicleProviderDetails />} />
                </Route>

                <Route index path="providers-outlet" element={<ProvidersPanel />} />
                <Route path="providers-outlet" element={<ProviderOutlet />}>
                  <Route path="providers-panel" element={<ProvidersPanel />} />
                  <Route path="create-order" element={<CreateOrder />} />
                  <Route path="upload-contractor" element={<UploadContractorFile />} />
                  <Route path="order-details" element={<OrderDetails />} />
                  <Route path="provider-detail" element={<ProviderOrderDetail />} />
                  <Route path="vehicle-detail" element={<VehicleProviderDetails />} />
                  <Route path="add-providers" element={<AddProviders />} />
                  <Route path="update-providers" element={<UpdateProvider />} />
                  <Route path="employee-providers-details" element={<ProviderDetails />} />
                  <Route path="approve-documents" element={<ApproveDocument />} />
                  <Route path="upload-provider" element={<UploadProviderFile />} />
                </Route>

              </Route >
            </Routes >
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-option" element={<LoginOption />} />
      </Routes>
      {routes}
    </>
  );
}

export default DashboardRoutes;