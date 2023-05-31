import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ContratorLayout from "../Layouts/ContratorLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import ProviderLayout from "../Layouts/ProviderLayout";

// outlets
import { CompanyOutlet } from "../Outlet/Employee/CompanyOutlet";
import { ContractorEmployeeOutlet } from "../Outlet/Employee/ContractorEmployeeOutlet";
import { DevicesOutlet } from "../Outlet/Employee/DevicesOutlet";
import { EmployeeOutlet } from "../Outlet/Employee/EmployeeOutlet";
import { EventOutlet } from "../Outlet/Employee/EventOutlet";
import { PayrollOutlet } from "../Outlet/Employee/PayrollOutlet";
import { ProviderEmployeeOutlet } from "../Outlet/Employee/ProviderEmployeeOutlet";
import { VehicleOutlet } from "../Outlet/Employee/VehicleOutlet";
import { ZoneOutlet } from "../Outlet/Employee/ZoneOutlet";

// Other
import NotFound from "../components/NotFound";
import RequireAuth from "../components/RequireAuth";
import Unauthorized from "../components/Unauthorized";
import Home from "../pages/Home/Home";

// Employee route import
import { CompanyDetails } from "../pages/Dashboard/Company/CompanyDetails";
import RolesPanel from "../pages/Dashboard/Company/CompanyRoles/RolesPanel";
import CreateNewRole from "../pages/Dashboard/Company/CompanyRoles/components/CreateNewRole";
import CreateNotifications from "../pages/Dashboard/Company/CreateNotifications";
import EmailSetting from "../pages/Dashboard/Company/EmailSetting";
import AllEmployees from "../pages/Dashboard/Company/Employees/AllEmployees";
import CreateEmployee from "../pages/Dashboard/Company/Employees/CreateEmployee";
import EmployeeDetail from "../pages/Dashboard/Company/Employees/EmployeeDetails/EmployeeDetail";
import UpdateEmployee from "../pages/Dashboard/Company/Employees/UpdateEmployee";
import ManageEmployeeDocs from "../pages/Dashboard/Company/Employees/subComponents/ManageEmployeeDocs";
import UploadEmployeeFile from "../pages/Dashboard/Company/Employees/subComponents/UploadEmployeeFile";
import ManageAttendence from "../pages/Dashboard/Company/ManageAttendence";
import NotificationPanel from "../pages/Dashboard/Company/NotificationPanel/NotificationPanel";
import OnBoarding from "../pages/Dashboard/Company/OnBoarding/OnBoarding";
import OnBoardingUE from "../pages/Dashboard/Company/OnBoarding/OnBoardingUE";
import Payroll from "../pages/Dashboard/Company/Payroll";
import UpdateData from "../pages/Dashboard/Company/UpdateData";
import UserDocPanel from "../pages/Dashboard/Company/UserDocPanel";
import UserDocumentsEmployee from "../pages/Dashboard/Company/UserDocumentsEmployee";
import VehicleDocPanel from "../pages/Dashboard/Company/VehicleDocPanel";
import AllVehicles from "../pages/Dashboard/Company/Vehicles/AllVehicles";
import CreateVehicle from "../pages/Dashboard/Company/Vehicles/CreateVehicle";
import EmployeeVehicleDetail from "../pages/Dashboard/Company/Vehicles/EmployeeVehicleDetail";
import UpdateVehicle from "../pages/Dashboard/Company/Vehicles/UpdateVehicle";
import WorkShiftPanel from "../pages/Dashboard/Company/WorkShift/WorkShiftPanel";
import AuthorizedEmployees from "../pages/Dashboard/Zones/Modal/AuthorizedEmployees";
import ShowDevices from "../pages/Dashboard/Zones/ShowDevices";
import SingleZoneDetails from "../pages/Dashboard/Zones/SingleZoneDetails";
import UpdateZone from "../pages/Dashboard/Zones/UpdateZone";
import Zones from "../pages/Dashboard/Zones/Zones";
// import CreateDevice from "../pages/Dashboard/Devices/CreateDevice";
// import UpdateDevice from "../pages/Dashboard/Devices/UpdateDevice";
import CreateUpdateDevices from "../pages/Dashboard/Devices/CreateUpdateDevices";
import DevicesPanel from "../pages/Dashboard/Devices/DevicesPanel";
// import CreateDevice from "../pages/Dashboard/Zones/CreateDevice";
import BackUp from "../pages/Dashboard/BackUp/backUp";
import AddContractor from "../pages/Dashboard/Contractors/AddContractor";
import ContractorDetail from "../pages/Dashboard/Contractors/ContractorDetail";
import ContractorEmployeDetails from "../pages/Dashboard/Contractors/ContractorEmployeDetails";
import { CreateContractor } from "../pages/Dashboard/Contractors/CreateContract";
import EmployeContractorVehicleDetail from "../pages/Dashboard/Contractors/EmployeContractorVehicleDetail";
import EmployeeContractorDetails from "../pages/Dashboard/Contractors/EmployeeContractorDetails";
import UpdateContract from "../pages/Dashboard/Contractors/UpdateContract";
import UpdateContractor from "../pages/Dashboard/Contractors/UpdateContractor";
import UploadContractorFile from "../pages/Dashboard/Contractors/UploadContractorFile";
import ContractorApproveDocument from "../pages/Dashboard/Contractors/contractorApproveDocument";
import ContractorDetails from "../pages/Dashboard/Contractors/contractorDetails";
import ContractorPanel from "../pages/Dashboard/Contractors/contractorPanel";
import CreateNormalEvent from "../pages/Dashboard/Events/CreateNormalEvent";
import CreateOnuEvent from "../pages/Dashboard/Events/CreateOnuEvents/CreateOnuEvent";
import EventDetailIcomming from "../pages/Dashboard/Events/EventDetailIcomming";
import EventDetailValidation from "../pages/Dashboard/Events/EventDetailValidation";
import Events from "../pages/Dashboard/Events/Events";
import AddProviders from "../pages/Dashboard/Providers/AddProviders";
import ApproveDocument from "../pages/Dashboard/Providers/ApproveDocument";
import { CreateOrder } from "../pages/Dashboard/Providers/CreateOrder";
import OrderDetails from "../pages/Dashboard/Providers/OrderDetails";
import ProviderDetails from "../pages/Dashboard/Providers/ProviderDetails";
import ProviderEmployeeDetails from "../pages/Dashboard/Providers/ProviderEmployeeDetails";
import EmployeeProvidersPanel from "../pages/Dashboard/Providers/ProvidersPanel";
import UpdateProvider from "../pages/Dashboard/Providers/UpdateProvider";
import UploadProviderFile from "../pages/Dashboard/Providers/UploadProviderFile";
import VehicleProviderDetails from "../pages/Dashboard/Providers/VehicleProviderDetails";

// provider route import
import { useDispatch, useSelector } from "react-redux";
import { permissionObj } from "../Helpers/permission";
import { HospitalityOutlet } from "../Outlet/Employee/HospitalityOutlet";
import Forbidden from "../components/Forbidden";
import Contracts from "../pages/Contractor/Contracts/Contracts";
import AddNewEmploye from "../pages/Contractor/Employee/AddNewEmploye";
import EmployeContractDetail from "../pages/Contractor/Employee/EmployeContractDetail";
import EmployeeCompleteDocuments from "../pages/Contractor/Employee/EmployeeCompleteDocuments";
import SearchEmploye from "../pages/Contractor/Employee/SearchEmploye";
import UserContractDetail from "../pages/Contractor/Employee/UserContractDetail";
import AddVehical from "../pages/Contractor/Profile/AddVehical";
import EditProfile from "../pages/Contractor/Profile/EditProfile";
import AddVehicleDocuments from "../pages/Contractor/Vehicle/AddVehicleDocuments";
import EditVehicle from "../pages/Contractor/Vehicle/EditVehicle";
import SearchVehicle from "../pages/Contractor/Vehicle/SearchVehicle";
import UploadVehicleDocuments from "../pages/Contractor/Vehicle/UploadVehicleDocuments";
import VehicalContractDetail from "../pages/Contractor/Vehicle/VehicalContractDetail";
import AddUpdateHeaders from "../pages/Dashboard/Company/Companyheaders/AddUpdateHeaders";
import AddUpdateHospitality from "../pages/Dashboard/Company/Hospitality/AddUpdateHospitality";
import Hospitality from "../pages/Dashboard/Company/Hospitality/Hospitality";
import RoomDetail from "../pages/Dashboard/Company/Hospitality/RoomDetail";
import Department from "../pages/Dashboard/Department/Department";
import LoginOptions from "../pages/LoginOption/LoginOptions";
import AddVehicle from "../pages/Provider/AddVehicle";
import AllEmploeesProvider from "../pages/Provider/AllEmploeesProvider";
import AllOrderProvider from "../pages/Provider/AllOrderProvider";
import AllVehiclesProvider from "../pages/Provider/AllVehiclesProvider";
import CompleteOrder from "../pages/Provider/CompleteOrder";
import CreateEmployeeProvider from "../pages/Provider/CreateEmployeeProvider";
import DocumentUpload from "../pages/Provider/DocumentUpload";
import OrderDetail from "../pages/Provider/OrderDetail";
import ProfileProvider from "../pages/Provider/ProfileProvider";
import ProviderOrderDetail from "../pages/Provider/ProviderDetailsApproveDocuments";
import ProvidersPanel from "../pages/Provider/ProvidersPanel";
import UserDocuments from "../pages/Provider/UserDocuments";
import VehicleDetail from "../pages/Provider/VehicleDetail";

// Contrator import

const MainRoutes = () => {

  const token = sessionStorage?.getItem("bearerToken") || ""
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { user } = useSelector(state => state.authenticatioauthennSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();


  console.log(!permission?.includes(permissionObj?.WEB_COMPANY_MENU))

  useEffect(() => {
    if (
      token && !permission?.includes(permissionObj?.WEB_COMPANY_MENU) && location?.pathname == "/dashboard/employee/company" ||
      token && !permission?.includes(permissionObj?.WEB_EVENT_MENU) && location?.pathname == "/dashboard/employee/events" ||
      token && !permission?.includes(permissionObj?.WEB_ZONE_MENU) && location?.pathname == "/dashboard/employee/zones" ||
      token && !permission?.includes(permissionObj?.WEB_DEVICE_MENU) && location?.pathname == "/dashboard/employee/devices" ||
      token && !permission?.includes(permissionObj?.WEB_EMPLOYEE_MENU) && location?.pathname == "/dashboard/employee/all-employees" ||
      token && !permission?.includes(permissionObj?.WEB_VEHICLE_MENU) && location?.pathname == "/dashboard/employee/allvehicles" ||
      token && !permission?.includes(permissionObj?.WEB_CONTRACTOR_MENU) && location?.pathname == "/dashboard/employee/contractors" ||
      token && !permission?.includes(permissionObj?.WEB_PROVIDER_MENU) && location?.pathname == "/dashboard/employee/suppliers" ||
      token && !permission?.includes(permissionObj?.WEB_PAYROLL_MENU) && location?.pathname == "/dashboard/employee/payroll" ||
      token && !permission?.includes(permissionObj?.WEB_BACK_UP_MENU) && location?.pathname == "/dashboard/employee/backup" ||
      token && !permission?.includes(permissionObj?.WEB_HOSPITALITY_MENU) && location?.pathname == "/dashboard/employee/hospitality" ||
      token && !permission?.includes(permissionObj?.WEB_COMPANY_UPDATE) && location?.pathname == "/dashboard/employee/company/update-data" ||
      token && !permission?.includes(permissionObj?.WEB_WORK_SHIFT_MENU) && location?.pathname == "/dashboard/employee/company/workshift-panel" ||
      token && !permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU || !permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) && location?.pathname == "/dashboard/employee/company/user-doc-panel" ||
      token && !permission?.includes(permissionObj?.WEB_ROLE_MENU) && location?.pathname == "/dashboard/employee/company/roles-panel" ||
      token && !permission?.includes(permissionObj?.WEB_EXTERNAL_VEHICLE_DOCUMENT_MENU) && location?.pathname == "/dashboard/employee/company/vehicle-doc-panel" ||
      token && !permission?.includes(permissionObj?.WEB_EMAIL_SETTINGS_MENU) && location?.pathname == "/dashboard/employee/payroll/email-setting" ||
      token && !permission?.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/company/onboarding" ||
      
      // devices
      token && !permission?.includes(permissionObj?.WEB_DEVICE_CREATE) && location?.pathname == "/dashboard/employee/devices/create" ||
      token && !permission?.includes(permissionObj?.WEB_DEVICE_UPDATE) && location?.pathname == "/dashboard/employee/devices/update/:id" ||
      token && !permission?.includes(permissionObj?.WEB_ZONE_CREATE_DEVICES) && location?.pathname == "/dashboard/employee/zones/create-device"  ||
      token && !permission?.includes(permissionObj?.WEB_ZONE_UPDATE_DEVICES) && location?.pathname == "/dashboard/employee/zones/update-device/:id"
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
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/suppliers/create-order"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/suppliers/order-details"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/suppliers/upload-supplier"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/suppliers/add-suppliers"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/suppliers/approve-documents"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/suppliers/update-suppliers"||
      // !permission.includes(permissionObj?.WEB_ONBOARDING_MENU) && location?.pathname == "/dashboard/employee/suppliers/suppliers_deatail_page"||
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
              "SUPPLIER_IN_CHARGE",
              "CONTRACTOR_IN_CHARGE",
            ]}
          />
        }
      >
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            path="announcement-panel"
            element={<NotificationPanel />}
          />
          {/* employee route start*/}
          <Route element={<RequireAuth allowedRoles={["EMPLOYEE"]} />}>
            <Route path="employee" element={<EmployeeLayout />}>
              {/* @company */}

              <Route
                path="announcement-panel"
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
                  path="create-announcement"
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
                <Route path="create-device" element={<CreateUpdateDevices />} />
                <Route path="update-device/:id" element={<CreateUpdateDevices />} />
              </Route>

              {/* @devices */}
              <Route index path="devices" element={<DevicesPanel />} />
              <Route path="devices" element={<DevicesOutlet />}>
                <Route path="create" element={<CreateUpdateDevices />} />
                <Route path="update/:id" element={<CreateUpdateDevices />} />
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
              {/* @supplier */}
              <Route
                index
                path="suppliers"
                element={<EmployeeProvidersPanel />}
              />
              <Route path="suppliers" element={<ProviderEmployeeOutlet />}>
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
                <Route path="add-suppliers" element={<AddProviders />} />
                <Route path="update-suppliers" element={<UpdateProvider />} />
                <Route
                  path="employee-suppliers-details"
                  element={<ProviderDetails />}
                />
                <Route path="approve-documents" element={<ApproveDocument />} />
                <Route path="upload-supplier" element={<UploadProviderFile />} />
                <Route path="suppliers_deatail_page" element={<ProviderEmployeeDetails />} />
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

          {/* @Provider route start */}
          <Route element={<RequireAuth allowedRoles={["SUPPLIER_IN_CHARGE"]} />}>
            <Route index path="supplier" element={<ProvidersPanel />} />
            <Route path="supplier" element={<ProviderLayout />}>
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
                path="supplier-order-detail"
                element={<ProviderOrderDetail approveDocument={false} />}
              />
              <Route
                path="complete-document"
                element={<ProviderOrderDetail approveDocument={true} />}
              />
              <Route path="order-detail" element={<OrderDetail />} />
              <Route
                path="create-employee"
                element={<CreateEmployeeProvider  isUpdate={false}/>}
              />
              <Route
                path="add-vehicles"
                element={<AddVehicle isUpdate={false} />}
              />
              <Route
                path="update-vehicles"
                element={<AddVehicle isUpdate={true} />}
              />
              <Route path="user-Documents" element={<UserDocuments  docType="supplier"/>} />
              <Route
                path="update-employee"
                // element={<UpdateEmployeeProvider />}
                element={<CreateEmployeeProvider isUpdate={true}/>}
              />
              {/* <Route path="update-order" element={<UpdateOrder />} /> */}
              <Route path="upload-doc" element={<DocumentUpload />} />
              {/* <Route
                path="notification_provider"
                element={<NotificationProvider />}
              /> */}
              <Route path="announcements" element={<NotificationPanel />} />

              <Route path="profile" element={<ProfileProvider />} />
            </Route>
          </Route>

          {/* contrator route start */}
          <Route element={<RequireAuth allowedRoles={["CONTRACTOR_IN_CHARGE"]} />}>
            <Route path="contractor" element={<ContratorLayout />}>
              <Route path="profile" element={<ProfileProvider />} />
              {/* <Route path="announcementtab" element={<NotificationTab />} /> */}
              <Route path="announcementtab" element={<NotificationPanel/>}/>
              <Route path="edit-profile/:id" element={<EditProfile />} />
              <Route path="addvehical" element={<AddVehical  isUpdate={false}/>} />
              <Route path="update-vehicle/:id" element={<AddVehical   isUpdate={true}/>} />
              <Route path="search-vehicle" element={<SearchVehicle />} />
              <Route path="search-employe" element={<SearchEmploye />} />
              <Route path="add-new-employe" element={<AddNewEmploye isUpdate={false}/>} />
              <Route path="update-employee/:id" element={<AddNewEmploye isUpdate={true}/>} />
              <Route path="add-vehicle-docs" element={<AddVehicleDocuments />} />
              <Route path="employee-contract-detail/:id" element={<EmployeContractDetail  approveDocument={false}/>} />
              {/* <Route path="announcement-panel" element={<ProfileNotifications />} /> */}
              <Route path="vehicle-contract-detail/:id" element={<VehicalContractDetail  approveDocumentVehicle={false}/>} />
              <Route path="upload-vehicle-documents/:id" element={<VehicalContractDetail approveDocumentVehicle={true} />} />
              <Route path="user-contract-detail/:id" element={<UserContractDetail />} />
              <Route path="contracts" element={<Contracts />} />
              <Route path="employee-upload-documets/:id" element={<EmployeContractDetail   approveDocument={true}/>} />
              {/* <Route path="contracts/user-Documents" element={<ContractorDocumentsStatus />} /> */}
              <Route path="user-Documents" element={<UserDocuments docType="contractor"/>}/>
              
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
