import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import ProviderLayout from "../Layouts/ProviderLayout";
import ContratorLayout from "../Layouts/ContratorLayout";

// outlets
import { EmployeeOutlet } from "../Outlet/Employee/EmployeeOutlet";
import { VehicleOutlet } from "../Outlet/Employee/VehicleOutlet";
import { ZoneOutlet } from "../Outlet/Employee/ZoneOutlet";
import { EventOutlet } from "../Outlet/Employee/EventOutlet";
import { CompanyOutlet } from "../Outlet/Employee/CompanyOutlet";
import { ContractorEmployeeOutlet } from "../Outlet/Employee/ContractorEmployeeOutlet";
import { ProviderEmployeeOutlet } from "../Outlet/Employee/ProviderEmployeeOutlet";
import { PayrollOutlet } from "../Outlet/Employee/PayrollOutlet";

// Other
import Home from "../pages/Home/Home";
import LoginOption from "../pages/LoginOption/LoginOption";
import NotFound from "../components/NotFound";
import Unauthorized from "../components/Unauthorized";
import RequireAuth from "../components/RequireAuth";

// Employee route import
import { CompanyDetails } from "../pages/Dashboard/Company/CompanyDetails";
import UserDocumentsEmployee from "../pages/Dashboard/Company/UserDocumentsEmployee";
import UserDocPanel from "../pages/Dashboard/Company/UserDocPanel";
import UpdateData from "../pages/Dashboard/Company/UpdateData";
import WorkShiftPanel from "../pages/Dashboard/Company/WorkShift/WorkShiftPanel";
import RolesPanel from "../pages/Dashboard/Company/CompanyRoles/RolesPanel";
import CreateNewRole from "../pages/Dashboard/Company/CompanyRoles/components/CreateNewRole";
import AddUpdateRole from "../pages/Dashboard/Company/AddUpdateRole";
import VehicleDocPanel from "../pages/Dashboard/Company/VehicleDocPanel";
import NotificationPanel from "../pages/Dashboard/Company/NotificationPanel/NotificationPanel";
import CreateNotifications from "../pages/Dashboard/Company/CreateNotifications";
import Payroll from "../pages/Dashboard/Company/Payroll";
import ManageAttendence from "../pages/Dashboard/Company/ManageAttendence";
import EmailSetting from "../pages/Dashboard/Company/EmailSetting";
import OnBoarding from "../pages/Dashboard/Company/OnBoarding/OnBoarding";
import OnBoardingUE from "../pages/Dashboard/Company/OnBoarding/OnBoardingUE";
import AllEmployees from "../pages/Dashboard/Company/Employees/AllEmployees";
import EmployeeDetail from "../pages/Dashboard/Company/Employees/EmployeeDetails/EmployeeDetail";
import CreateEmployee from "../pages/Dashboard/Company/Employees/CreateEmployee";
import UpdateEmployee from "../pages/Dashboard/Company/Employees/UpdateEmployee";
import UploadEmployeeFile from "../pages/Dashboard/Company/Employees/subComponents/UploadEmployeeFile";
import ManageEmployeeDocs from "../pages/Dashboard/Company/Employees/subComponents/ManageEmployeeDocs";
import AllVehicles from "../pages/Dashboard/Company/Vehicles/AllVehicles";
import CreateVehicle from "../pages/Dashboard/Company/Vehicles/CreateVehicle";
import EmployeeVehicleDetail from "../pages/Dashboard/Company/Vehicles/EmployeeVehicleDetail";
import UpdateVehicle from "../pages/Dashboard/Company/Vehicles/UpdateVehicle";
import Zones from "../pages/Dashboard/Zones/Zones";
import SingleZoneDetails from "../pages/Dashboard/Zones/SingleZoneDetails";
import ShowDevices from "../pages/Dashboard/Zones/ShowDevices";
import UpdateZone from "../pages/Dashboard/Zones/UpdateZone";
import AuthorizedEmployees from "../pages/Dashboard/Zones/Modal/AuthorizedEmployees";
import CreateDevice from "../pages/Dashboard/Zones/CreateDevice";
import Events from "../pages/Dashboard/Events/Events";
import CreateNormalEvent from "../pages/Dashboard/Events/CreateNormalEvent";
import CreateOnuEvent from "../pages/Dashboard/Events/CreateOnuEvents/CreateOnuEvent";
import EventDetailIcomming from "../pages/Dashboard/Events/EventDetailIcomming";
import EventDetailValidation from "../pages/Dashboard/Events/EventDetailValidation";
import { CreateContractor } from "../pages/Dashboard/Contractors/CreateContract";
import AddContractor from "../pages/Dashboard/Contractors/AddContractor";
import UpdateContractor from "../pages/Dashboard/Contractors/UpdateContractor";
import EmployeeContractorDetails from "../pages/Dashboard/Contractors/EmployeeContractorDetails";
import ContractorApproveDocument from "../pages/Dashboard/Contractors/contractorApproveDocument";
import UploadContractorFile from "../pages/Dashboard/Contractors/UploadContractorFile";
import ContractorDetails from "../pages/Dashboard/Contractors/contractorDetails";
import ContractorDetail from "../pages/Dashboard/Contractors/ContractorDetail";
import VehicleProviderDetails from "../pages/Dashboard/Providers/VehicleProviderDetails";
import EmployeContractorVehicleDetail from "../pages/Dashboard/Contractors/EmployeContractorVehicleDetail";
import UpdateContract from "../pages/Dashboard/Contractors/UpdateContract";
import ContractorEmployeDetails from "../pages/Dashboard/Contractors/ContractorEmployeDetails";
import ContractorPanel from "../pages/Dashboard/Contractors/contractorPanel";
import { CreateOrder } from "../pages/Dashboard/Providers/CreateOrder";
import OrderDetails from "../pages/Dashboard/Providers/OrderDetails";
import AddProviders from "../pages/Dashboard/Providers/AddProviders";
import UpdateProvider from "../pages/Dashboard/Providers/UpdateProvider";
import ProviderDetails from "../pages/Dashboard/Providers/ProviderDetails";
import ApproveDocument from "../pages/Dashboard/Providers/ApproveDocument";
import UploadProviderFile from "../pages/Dashboard/Providers/UploadProviderFile";
import ProviderEmployeeDetails from "../pages/Dashboard/Providers/ProviderEmployeeDetails";
import EmployeeProvidersPanel from "../pages/Dashboard/Providers/ProvidersPanel";
import BackUp from "../pages/Dashboard/BackUp/backUp";

// provider route import
import ProvidersPanel from "../pages/Provider/ProvidersPanel";
import AllOrderProvider from "../pages/Provider/AllOrderProvider";
import AllEmploeesProvider from "../pages/Provider/AllEmploeesProvider";
import AllVehiclesProvider from "../pages/Provider/AllVehiclesProvider";
import VehicleDetail from "../pages/Provider/VehicleDetail";
import CompleteOrder from "../pages/Provider/CompleteOrder";
import ProviderOrderDetail from "../pages/Provider/ProviderDetailsApproveDocuments";
import CreateEmployeeProvider from "../pages/Provider/CreateEmployeeProvider";
import AddVehicle from "../pages/Provider/AddVehicle";
import UpdateEmployeeProvider from "../pages/Provider/UpdateEmployeeProvider";
import DocumentUpload from "../pages/Provider/DocumentUpload";
import OrderDetail from "../pages/Provider/OrderDetail";
import UserDocuments from "../pages/Provider/UserDocuments";
// import NotificationProvider from "../pages/Provider/NotificationProvider";
import ProfileProvider from "../pages/Provider/ProfileProvider";
import Profile from "../pages/Contractor/Profile/Profile";
import NotificationTab from "../pages/Contractor/Profile/NotificationTab";
import EditProfile from "../pages/Contractor/Profile/EditProfile";
import AddVehical from "../pages/Contractor/Profile/AddVehical";
import SearchVehicle from "../pages/Contractor/Vehicle/SearchVehicle";
import SearchEmploye from "../pages/Contractor/Employee/SearchEmploye";
import AddNewEmploye from "../pages/Contractor/Employee/AddNewEmploye";
import AddVehicleDocuments from "../pages/Contractor/Vehicle/AddVehicleDocuments";
import EmployeContractDetail from "../pages/Contractor/Employee/EmployeContractDetail";
import VehicalContractDetail from "../pages/Contractor/Vehicle/VehicalContractDetail";
import UserContractDetail from "../pages/Contractor/Employee/UserContractDetail";
import Contracts from "../pages/Contractor/Contracts/Contracts";
import EmployeeCompleteDocuments from "../pages/Contractor/Employee/EmployeeCompleteDocuments";
import EditVehicle from "../pages/Contractor/Vehicle/EditVehicle";
import UploadVehicleDocuments from "../pages/Contractor/Vehicle/UploadVehicleDocuments";
import ContractorDocumentsStatus from "../pages/Contractor/Contracts/ContractorDocumentsStatus";
import Hospitality from "../pages/Dashboard/Company/Hospitality/Hospitality";
import { HospitalityOutlet } from "../Outlet/Employee/HospitalityOutlet";
import AddUpdateHospitality from "../pages/Dashboard/Company/Hospitality/AddUpdateHospitality";
import RoomDetail from "../pages/Dashboard/Company/Hospitality/RoomDetail";
import { permissionObj } from "../Helpers/permission";
import { useDispatch, useSelector } from "react-redux";
import Forbidden from "../components/Forbidden";
import AddUpdateHeaders from "../pages/Dashboard/Company/Companyheaders/AddUpdateHeaders";
import jwtDecode from "jwt-decode";
import { RoleCheck } from "../reduxToolkit/authentication/AuthenticatonApi";
import LoginOptions from "../pages/LoginOption/LoginOptions";
import Department from "../pages/Dashboard/Department/Department";

// Contrator import

const MainRoutes = () => {

  const token = sessionStorage?.getItem("bearerToken") || ""
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();


  console.log(!permission?.includes(permissionObj?.WEB_COMPANY_MENU))

  useEffect(() => {
    if (
      token && !permission?.includes(permissionObj?.WEB_COMPANY_MENU) && location?.pathname == "/dashboard/employee/company" ||
      token && !permission?.includes(permissionObj?.WEB_EVENT_MENU) && location?.pathname == "/dashboard/employee/events" ||
      token && !permission?.includes(permissionObj?.WEB_ZONE_MENU) && location?.pathname == "/dashboard/employee/zones" ||
      token && !permission?.includes(permissionObj?.WEB_EMPLOYEE_MENU) && location?.pathname == "/dashboard/employee/all-employees" ||
      token && !permission?.includes(permissionObj?.WEB_VEHICLE_MENU) && location?.pathname == "/dashboard/employee/allvehicles" ||
      token && !permission?.includes(permissionObj?.WEB_CONTRACTOR_MENU) && location?.pathname == "/dashboard/employee/contractors" ||
      token && !permission?.includes(permissionObj?.WEB_PROVIDER_MENU) && location?.pathname == "/dashboard/employee/providers" ||
      token && !permission?.includes(permissionObj?.WEB_PAYROLL_MENU) && location?.pathname == "/dashboard/employee/payroll" ||
      token && !permission?.includes(permissionObj?.WEB_BACK_UP_MENU) && location?.pathname == "/dashboard/employee/backup" ||
      token && !permission?.includes(permissionObj?.WEB_HOSPITALITY_MENU) && location?.pathname == "/dashboard/employee/hospitality" ||
      token && !permission?.includes(permissionObj?.WEB_COMPANY_UPDATE) && location?.pathname == "/dashboard/employee/company/update-data" ||
      token && !permission?.includes(permissionObj?.WEB_WORK_SHIFT_MENU) && location?.pathname == "/dashboard/employee/company/workshift-panel" ||
      token && !permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU || !permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) && location?.pathname == "/dashboard/employee/company/user-doc-panel" ||
      token && !permission?.includes(permissionObj?.WEB_ROLE_MENU) && location?.pathname == "/dashboard/employee/company/roles-panel" ||
      token && !permission?.includes(permissionObj?.WEB_EXTERNAL_VEHICLE_DOCUMENT_MENU) && location?.pathname == "/dashboard/employee/company/vehicle-doc-panel" ||
      token && !permission?.includes(permissionObj?.WEB_EMAIL_SETTINGS_MENU) && location?.pathname == "/dashboard/employee/payroll/email-setting" ||
      token && !permission?.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/company/onboarding"


      // 
      // !permission.includes(permissionObj?.WEB_EMPLOYEE_CREATE) && location?.pathname == "/dashboard/employee/all-employees/add-employee"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/allvehicles/create-vehicle"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/zones/showdevices"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/zones/updatezone"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/zones/create-device"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/events/onu-events"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/events/incomming-envent-detail/:id"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/all-employees/employee-Detail/:id"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/all-employees/update-employee/:id"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/all-employees/uploademployeefile"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/allVehicles/vehicle-detail/:id"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/allVehicles/update-vehicle/:id"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/payroll/manage-attendence"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/hospitality/add-room"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/hospitality/room-detail"||

      // contractor
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/create-contract"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/contractor-details"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/update-contract"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/upload-contractor"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/add-contractor"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/update-contractor"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/contractor-detail"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/contractors/contractor-detail"||

      // provider
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/providers/create-order"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/providers/order-details"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/providers/upload-provider"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/providers/add-providers"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/providers/approve-documents"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/providers/update-providers"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/providers/providers_deatail_page"||
      // /dashboard/employee/hospitality/update-room




    ) {
      navigate("/forbidden")

    }
  }, [location])


  return (
    <Routes>
      {/* dashboard */}
      {/* protected route */}
      <Route
        element={
          <RequireAuth
            allowedRoles={[
              "EMPLOYEE",
              "PROVIDER_IN_CHARGE",
              "CONTRACTOR_IN_CHARGE",
            ]}
          />
        }
      >
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            path="notification-panel"
            element={<NotificationPanel />}
          />
          {/* employee route start*/}
          <Route element={<RequireAuth allowedRoles={["EMPLOYEE"]} />}>
            <Route path="employee" element={<EmployeeLayout />}>
              {/* @company */}

              <Route
                path="notification-panel"
                element={<NotificationPanel />}
              />
              <Route path="profile" element={<ProfileProvider />} />
              <Route index path="company" element={<CompanyDetails />} />

              <Route path="company" element={<CompanyOutlet />}>
                <Route
                  path="user-documents"
                  element={<UserDocumentsEmployee />}
                />
                <Route path="user-doc-panel" element={<UserDocPanel />} />
                <Route path="update-data" element={<UpdateData />} />
                <Route path="workshift-panel" element={<WorkShiftPanel />} />
                <Route path="roles-panel" element={<RolesPanel />} />
                <Route path="add-new-role" element={<CreateNewRole />} />
                <Route path="add-update-role/:id" element={<CreateNewRole />} />
                {/* <Route path="add-update-role/:id" element={<AddUpdateRole />} /> */}
                <Route path="vehicle-doc-panel" element={<VehicleDocPanel />} />
                {/* <Route
                  path="notification-panel"
                  element={<NotificationPanel />}
                /> */}
                <Route
                  path="create-notification"
                  element={<CreateNotifications />}
                />

                {/* onboarding */}
                <Route path="onboarding" element={<OnBoarding />} />
                <Route path="onboarding-UE/:id" element={<OnBoardingUE />} />


                {/* manage headers */}
                <Route path="headers" element={<AddUpdateHeaders />} />
              </Route>
              {/* @zone */}
              <Route index path="zones" element={<Zones />} />
              <Route path="zones" element={<ZoneOutlet />}>
                <Route
                  path="singlezonedetails"
                  element={<SingleZoneDetails />}
                />
                <Route path="showdevices" element={<ShowDevices />} />
                <Route path="authmodal" element={<AuthorizedEmployees />} />
                <Route path="updatezone" element={<UpdateZone />} />
                <Route path="create-device" element={<CreateDevice />} />
                <Route path="update-device/:id" element={<CreateDevice />} />
              </Route>
              {/* @event */}
              <Route path="events" element={<Events />} />
              <Route path="events" element={<EventOutlet />}>
                {/* <Route path="events" element={<Events />} /> */}
                <Route path="normal-events" element={<CreateNormalEvent />} />
                <Route path="onu-events" element={<CreateOnuEvent />} />
                <Route
                  path="incomming-envent-detail/:id"
                  element={<EventDetailIcomming />}
                />
                <Route
                  path="validation-envent-detail/:id"
                  element={<EventDetailValidation />}
                />
              </Route>
              {/* @employees */}
              <Route path="all-employees" element={<AllEmployees />} />
              <Route path="all-employees" element={<EmployeeOutlet />}>
                <Route
                  path="employee-Detail/:id"
                  element={<EmployeeDetail />}
                />
                <Route path="add-employee" element={<CreateEmployee />} />
                <Route
                  path="update-employee/:id"
                  element={<UpdateEmployee />}
                />
                <Route
                  path="uploademployeefile"
                  element={<UploadEmployeeFile />}
                />
                <Route
                  path="employee-docs"
                  element={<ManageEmployeeDocs approveDocument={false} />}
                />
                <Route
                  path="employee-docs-complete"
                  element={<ManageEmployeeDocs approveDocument={true} />}
                />
              </Route>
              {/* @Vehicle */}
              <Route path="allvehicles" element={<AllVehicles />} />
              <Route path="allvehicles" element={<VehicleOutlet />}>
                <Route path="create-vehicle" element={<CreateVehicle />} />
                <Route
                  path="vehicle-detail/:id"
                  element={<EmployeeVehicleDetail />}
                />
                <Route path="update-vehicle/:id" element={<UpdateVehicle />} />
              </Route>
              {/* @Contractor */}
              <Route index path="contractors" element={<ContractorPanel />} />
              <Route path="contractors" element={<ContractorEmployeeOutlet />}>
                {/* <Route path="contractor-panel" element={<ContractorPanel />} /> */}
                <Route path="create-contract" element={<CreateContractor />} />
                <Route path="add-contractor" element={<AddContractor />} />
                <Route
                  path="update-contractor"
                  element={<UpdateContractor />}
                />
                <Route
                  path="employee-contractor-details"
                  element={<EmployeeContractorDetails />}
                />
                <Route
                  path="contractor-approve-document"
                  // element={<ApproveDocument />}
                  element={<ContractorApproveDocument />}
                />
                <Route
                  path="upload-contractor"
                  element={<UploadContractorFile />}
                />
                <Route
                  path="contractor-details"
                  element={<ContractorDetails />}
                />
                <Route
                  path="contractor-detail"
                  element={<ContractorDetail />}
                />
                {/* <Route
              path="provider-detail"
              element={<ProviderDetailsApproveDocuments />}
            /> */}
                <Route
                  path="vehicle-detail"
                  element={<VehicleProviderDetails />}
                />
                <Route
                  path="vehicleDetail"
                  element={<EmployeContractorVehicleDetail />}
                />
                <Route path="update-contract" element={<UpdateContract />} />
                <Route
                  path="employeeDetail"
                  element={<ContractorEmployeDetails />}
                />
              </Route>
              {/* @provider */}
              <Route
                index
                path="providers"
                element={<EmployeeProvidersPanel />}
              />
              <Route path="providers" element={<ProviderEmployeeOutlet />}>
                {/* <Route
                    path="providers-panel"
                    element={<EmployeeProvidersPanel />}
                  /> */}
                <Route path="create-order" element={<CreateOrder />} />
                <Route
                  path="upload-contractor"
                  element={<UploadContractorFile />}
                />
                <Route path="order-details" element={<OrderDetails />} />
                {/* <Route
              path="provider-detail"
              element={<ProviderDetailsApproveDocuments />}
            /> */}
                <Route
                  path="vehicle-detail"
                  element={<VehicleProviderDetails />}
                />
                <Route path="add-providers" element={<AddProviders />} />
                <Route path="update-providers" element={<UpdateProvider />} />
                <Route
                  path="employee-providers-details"
                  element={<ProviderDetails />}
                />
                <Route path="approve-documents" element={<ApproveDocument />} />
                <Route path="upload-provider" element={<UploadProviderFile />} />
                <Route path="providers_deatail_page" element={<ProviderEmployeeDetails />} />
              </Route>
              {/* @payroll */}
              <Route path="payroll" element={<Payroll />} />
              <Route path="payroll" element={<PayrollOutlet />}>
                <Route path="manage-attendence" element={<ManageAttendence />} />
                <Route path="email-setting" element={<EmailSetting />} />
              </Route>
              {/* @back up */}
              <Route path="backup" element={<BackUp />} />
              {/* @hospitality */}
              <Route path="hospitality" element={<Hospitality />} />
              <Route path="hospitality" element={<HospitalityOutlet />}>
                <Route path="add-room" element={<AddUpdateHospitality />} />
                <Route path="room-detail" element={<RoomDetail />} />

              </Route>
              {/* @Departments */}
              <Route path="departments" element={<Department />} />
            </Route>
          </Route>

          {/* Provider route start */}
          <Route element={<RequireAuth allowedRoles={["PROVIDER_IN_CHARGE"]} />}>
            <Route index path="provider" element={<ProvidersPanel />} />
            <Route path="provider" element={<ProviderLayout />}>
              <Route path="orders" element={<AllOrderProvider />} />
              <Route path="employees" element={<AllEmploeesProvider />} />
              <Route path="vehicles" element={<AllVehiclesProvider />} />
              <Route
                path="vehicles-details"
                element={<VehicleDetail approveDocumentVehicle={false} />}
              />
              <Route
                path="vehicle-documents"
                element={<VehicleDetail approveDocumentVehicle={true} />}
              />
              <Route
                path="complete-order"
                element={<CompleteOrder isUpdateOrder={false} />}
              />
              <Route
                path="update-order"
                element={<CompleteOrder isUpdateOrder={true} />}
              />
              <Route
                path="provider-order-detail"
                element={<ProviderOrderDetail approveDocument={false} />}
              />
              <Route
                path="complete-document"
                element={<ProviderOrderDetail approveDocument={true} />}
              />
              <Route path="order-detail" element={<OrderDetail />} />
              <Route
                path="create-employee"
                element={<CreateEmployeeProvider />}
              />
              <Route
                path="add-vehicles"
                element={<AddVehicle isUpdate={false} />}
              />
              <Route
                path="update-vehicles"
                element={<AddVehicle isUpdate={true} />}
              />
              <Route path="user-Documents" element={<UserDocuments />} />
              <Route
                path="update-employee"
                element={<UpdateEmployeeProvider />}
              />
              {/* <Route path="update-order" element={<UpdateOrder />} /> */}
              <Route path="upload-doc" element={<DocumentUpload />} />
              {/* <Route
                path="notification_provider"
                element={<NotificationProvider />}
              /> */}
              <Route path="notification" element={<NotificationPanel />} />
              <Route path="profile" element={<ProfileProvider />} />
            </Route>
          </Route>

          {/* contrator route start */}
          <Route element={<RequireAuth allowedRoles={["CONTRACTOR_IN_CHARGE"]} />}>
            <Route path="contractor" element={<ContratorLayout />}>
              <Route path="profile" element={<ProfileProvider />} />
              <Route path="notificationtab" element={<NotificationTab />} />
              <Route path="edit-profile/:id" element={<EditProfile />} />
              <Route path="addvehical" element={<AddVehical />} />
              <Route path="search-vehicle" element={<SearchVehicle />} />
              <Route path="search-employe" element={<SearchEmploye />} />
              <Route path="add-new-employe" element={<AddNewEmploye />} />
              <Route path="add-vehicle-docs" element={<AddVehicleDocuments />} />
              <Route path="employee-contract-detail/:id" element={<EmployeContractDetail />} />
              {/* <Route path="notification-panel" element={<ProfileNotifications />} /> */}
              <Route path="vehicle-contract-detail/:id" element={<VehicalContractDetail />} />
              <Route path="user-contract-detail/:id" element={<UserContractDetail />} />
              <Route path="contracts" element={<Contracts />} />
              <Route path="employee-upload-documets/:id" element={<EmployeeCompleteDocuments />} />
              <Route path="update-vehicle/:id" element={<EditVehicle />} />
              <Route path="upload-vehicle-documents/:id" element={<UploadVehicleDocuments />} />
              <Route path="contracts/user-Documents" element={<ContractorDocumentsStatus />} />
            </Route>
          </Route>
        </Route>
        {/* other prtected route */}

        {/* <Route path="/login-option" element={<LoginOption />} /> */}
        <Route path="/login-option" element={<LoginOptions />} />
        :
      </Route>
      {/* other public route */}
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
};

export default MainRoutes;
