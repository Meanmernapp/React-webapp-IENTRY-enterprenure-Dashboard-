import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import exchangealt from "../../../../assets/images/exchange-alt-solid.svg";
import person4 from "../../../../assets/images/user-png.png";
import userregular from "../../../../assets/images/user-regular.svg";
import emptyList from "../../../../assets/images/warning.svg";

import { GoPrimitiveDot } from 'react-icons/go'

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TablePagination from '@mui/material/TablePagination';
import Checkbox from "@mui/material/Checkbox";
import { Divider, Grid } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  checkFireArms,
  documentListing,
  downloadSelfie,
  employeeVehicles,
  GetContractStatus,
  getFireArm, getRoles, getSelfie, getSingleEmployeeWithId, getWorkStations, hasSelfi, updateUserEmployee, updateExtraData, updateUser, userInfoStatus
} from "../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";
import { GetAllWorkSchdule, GetWorkTimeAccess, GetZoneTree } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { getAllWorkSchdule, getWorkTimeAccess } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";

import ContractorAccessCard from "../../Contractors/ContractorAccessCard";
import DetailCards from "./EmployeeDetails/DetailCards";
import DetailDocument from "./EmployeeDetails/DetailDocument";
import DetailFireArms from "./EmployeeDetails/DetailFireArms";
import DetailVehicles from "./EmployeeDetails/DetailVehicles";
import UpdateCodeAndDeviceModal from "./Modal/UpdateCodeAndDeviceModal";
import { GetHeaders } from "../../../../reduxToolkit/headers/HeadersApi";
import NotFoundDataWarning from "../../../../components/NotFoundDataWarning";
import UpdateChangeImage from "./Modal/updateChangeImage";
import cryptoJs from 'crypto-js';
import securekey from "../../../../config";

const smallBoxStyle = {
  width: "100%",
  maxWidth: "100%",
  fontSize: "20px",
  height: "40px",
}


const UpdateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userdata = sessionStorage.getItem('userdata');
  const bytess = cryptoJs.AES.decrypt(userdata, securekey)
  const userstring = bytess.toString(cryptoJs.enc.Utf8);
  const user = JSON.parse(userstring).data.data
  const { data: { data } } = user
  const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
  const employeeRoles = useSelector(state => state?.CompanyEmployeesSlice?.employeeRoles);
  const employeeWorkStations = useSelector(state => state?.CompanyEmployeesSlice?.employeeWorkStations);
  const singleEmployeeWithId = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeWithId);
  const ProfileImage = useSelector(state => state?.CompanyEmployeesSlice?.selfieImage);
  const userInfoStatusList = useSelector(state => state?.CompanyEmployeesSlice?.userInfoStatusList);
  const { contractStatusList } = useSelector(state => state?.CompanyEmployeesSlice)
  const workShiftAccessTime = useSelector(getWorkTimeAccess);
  const workShiftSchdule = useSelector(getAllWorkSchdule);
  const { headersList } = useSelector(state => state.headersSlice);
  // const customSchdulTime = useSelector(getcustomSchdulTime);

  const [changeImageModal, setChangeImageModal] = useState(false);
  const [allowDeny, setAllowDeny] = useState(false);
  const [allowDenyObj, setAllowDenyObj] = useState({
    title: "",
    desc: "",
    option: ""
  });
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cellular, setCellular] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [updateimage, setUpdateImage] = useState(null);


  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [field4, setField4] = useState("");
  const [field5, setField5] = useState("");
  const [field6, setField6] = useState("");
  const [field7, setField7] = useState("");
  const [field8, setField8] = useState("");
  const [field9, setField9] = useState("");
  const [field10, setField10] = useState("");
  const [field11, setField11] = useState("");
  const [field12, setField12] = useState("");
  const [field13, setField13] = useState("");
  const [field14, setField14] = useState("");
  const [field15, setField15] = useState("");

  const [role, setRole] = useState();
  const [workStation, setWorkStation] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [contractStatus, setContractStatus] = useState();
  const [startdate, setStartdate] = useState();
  const [endDate, setEndDate] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checkboxState, setCheckboxState] = useState(false);
  const [WorkShift, setWorkShift] = useState();

  let binaryData = [];
  binaryData.push(ProfileImage)

  const handleStatus = (paramId) => {
    return paramId === 2 ? "#F2A100" :
      paramId === 3 ? "blue" :
        paramId === 4 ? "#0C4523" :
          paramId === 5 ? "orange" :
            paramId === 6 ? "#BC0000" : "black"
  }

  let contractPagination = {
    order: true,
    page: page,
    size: rowsPerPage,
    sortBy: "id",
  };

  console.log(singleEmployeeWithId)

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getWorkStations());
    dispatch(GetAllWorkSchdule());
    dispatch(documentListing(id));
    dispatch(employeeVehicles(id));
    dispatch(userInfoStatus());
    dispatch(GetHeaders());
    dispatch(GetContractStatus())
    dispatch(GetZoneTree())
    dispatch(checkFireArms(id)).then(({ payload: { data } }) => {
      // console.log(data)
      if (data === true) {
        dispatch(getFireArm(id))
      }
    })
    dispatch(hasSelfi(id)).then(({ payload: { data: { data } } }) => {
      if (data === true) {
        dispatch(getSelfie(id)).then(({ payload: { data: { data } } }) => {
          const selfeiId = data?.id
          dispatch(downloadSelfie(selfeiId));
        })
      }
    })

    dispatch(getSingleEmployeeWithId(id))
      .then(({ payload: { data: { data } } }) => {
        console.log(data);

        setName(data?.user?.name);
        setGender(data?.user?.gender?.id);
        setCellular(data?.user?.phoneNumber);
        setStatus(data?.user?.status?.id);
        setEmail(data?.user?.email);
        setDob(data?.dob);
        setRole(data?.role?.id);
        setWorkStation(data?.zone?.id);
        setContractStatus(data?.status?.id);
        setEmployeeId(data?.employeeId);
        setStartdate(new Date(Number(data?.startDate)));
        setEndDate(new Date(Number(data?.endDate)));
        setField1(data?.user?.extraData?.field1);
        setField2(data?.user?.extraData?.field2);
        setField3(data?.user?.extraData?.field3);
        setField4(data?.user?.extraData?.field4);
        setField5(data?.user?.extraData?.field5);
        setField6(data?.user?.extraData?.field6);
        setField7(data?.user?.extraData?.field7);
        setField8(data?.user?.extraData?.field8);
        setField9(data?.user?.extraData?.field9);
        setField10(data?.user?.extraData?.field10);
        setField11(data?.user?.extraData?.field11);
        setField12(data?.user?.extraData?.field12);
        setField13(data?.user?.extraData?.field13);
        setField14(data?.user?.extraData?.field14);
        setField15(data?.user?.extraData?.field15);
      })
  }, [])


  useEffect(() => {
    setRole(singleEmployeeWithId?.role?.id);
    setWorkStation(singleEmployeeWithId?.zone?.id);
    setContractStatus(singleEmployeeWithId?.status?.id);

    // setName(singleEmployeeWithId?.name);
    // setGender(singleEmployeeWithId?.gender?.id);
    // setCellular(singleEmployeeWithId?.phoneNumber);
    // setStatus(singleEmployeeWithId?.status?.id);
    // setEmail(singleEmployeeWithId?.email);
    // setDob(singleEmployeeWithId?.dob);

    // setEmployeeId(singleEmployeeWithId?.employeeId);
    // setStartdate(new Date(Number(singleEmployeeWithId?.startDate)));
    // setEndDate(new Date(Number(singleEmployeeWithId?.endDate)));

  }, [singleEmployeeWithId?.id])

  const handleUpdate = () => {
    const userObj = {
      "id": id,
      "password": singleEmployeeWithId?.password,
      "status": {
        "id": singleEmployeeWithId?.status?.id
      },
      "userType": {
        "id": singleEmployeeWithId?.userType?.id
      },
      "dob": dob?.getTime(),
      "gender": {
        "id": gender
      },
      "name": name,
      "phoneNumber": cellular,
      "email": email
    }

    // dispatch(updateUser(userObj))

    const employeeObj = {
      "id": singleEmployeeWithId?.id,
      "user": {
        "id": singleEmployeeWithId?.user?.id
      },
      "zone": {
        "id": workStation
      },
      "role": {
        "id": role
      },
      "status": {
        "id": singleEmployeeWithId?.status?.id
      },
      "startDate": startdate?.getTime() || new Date()?.getTime(),
      "endDate": endDate?.getTime() || new Date()?.getTime()
    }
    dispatch(updateUserEmployee(employeeObj))

    const extraDatabody = {
      obj: {
        "field1": field1 || "",
        "field2": field2 || "",
        "field3": field3 || "",
        "field4": field4 || "",
        "field5": field5 || "",
        "field6": field6 || "",
        "field7": field7 || "",
        "field8": field8 || "",
        "field9": field9 || "",
        "field10": field10 || "",
        "field11": field11 || "",
        "field12": field12 || "",
        "field13": field13 || "",
        "field14": field14 || "",
        "field15": field15 || "",

      },
      "id": singleEmployeeWithId?.user?.id
    }
    console.log(extraDatabody)
    dispatch(updateExtraData(extraDatabody))
    // navigate("/dashboard/employee/all-employees")
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(GetWorkTimeAccess({ id: WorkShift, contractPagination }));
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    dispatch(GetWorkTimeAccess({ id: WorkShift, contractPagination }));
  };

  return (
    <>
      {/* Employess Detail Page Start */}
      <div className='head align-items-start'>
        <div className='headLeft'>
          <Link to="/dashboard/employee/all-employees">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <h2>
            Update Employee
            <sub
              style={{
                fontSize: "14px",
                marginLeft: "10px",
                color: handleStatus(singleEmployeeWithId?.user?.status?.id)
              }}
            >
              {singleEmployeeWithId?.user?.status?.name.replace(/\_/g, " ")}
              {/* <GoPrimitiveDot
                style={{
                  color: handleStatus(singleEmployeeWithId?.user?.status?.id),
                  fontSize: "25px",
                }}
              /> */}
            </sub>
          </h2>
        </div>
        <div style={{ zIndex: "1000" }}>
          <button
            className="employeeDetailHeaderBtn"
            style={{ backgroundColor: "rgb(162, 203, 244)" }}
            onClick={() => {
              setAllowDeny(true);
              setAllowDenyObj({
                title: "SEND QR CODE",
                desc: "To send the QR CODE of the user, must confirm the action",
                option: true
              })
            }}
          >
            SEND QR CODE BY EMAIL
            <MailOutlineIcon />
          </button>
          <button
            className="employeeDetailHeaderBtn"
            style={{ backgroundColor: "rgb(188, 0, 0)" }}
            onClick={() => {
              setAllowDeny(true);
              setAllowDenyObj({
                title: "UNLINK DEVICE",
                desc: "To send the unlink the device of the user, must confirm the action",
                option: false
              })
            }}
          >
            Unlink Device
            <PhoneIphoneIcon />
          </button>
          <UpdateCodeAndDeviceModal
            show={allowDeny}
            onHide={() => setAllowDeny(false)}
            dataobj={allowDenyObj}
          />
        </div>
      </div>

      <div className="text-center exchange_icon">
        <img
          src={
            ProfileImage !== null ?
              window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })) :
              person4
          }
          className="img-fluid"
          style={{ width: 240, height: 240, borderRadius: "100%", boxShadow: "0px 0px 6px #00000066;" }}
          alt="employeedetail-person4"
        />
        <Link
          to="#"
          onClick={() => setChangeImageModal(true)}
          className="position-relative"
        >
          <span className="dot">
            <img
              src={exchangealt}
              className="img-fluid exchange_alt_m"
              alt="exchange_alt"
            />
          </span>
        </Link>
        <UpdateChangeImage
          show={changeImageModal}
          preview={setUpdateImage}
          onHide={() => setChangeImageModal(false)}
        />
      </div>

      <div className="mt-3 mb-4 row">
        <div className="col-lg-6 col-md-12 col-12">
          <p className="mb-2 infoEmpl_text">INFORMATION</p>
          <div className="empdetail_c">
            <div className="row mb-3">
              <Box sx={smallBoxStyle} className="col-lg-12">
                <TextField
                  size="small"
                  fullWidth
                  label="NAME"
                  defaultValue={singleEmployeeWithId?.name}
                  id="NAME"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img
                          src={userregular}
                          className="user_regular_img"
                          alt="acadd_logo"
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>
            <div className="row mb-3">
              <Box className="col-lg-6">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Gender
                  </InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={singleEmployeeWithId?.gender?.id}
                    label="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                className="col-lg-6"
                sx={smallBoxStyle}
              >
                <TextField size="small"
                  fullWidth
                  label="CELULAR"
                  id="CELULAR"
                  value={cellular}
                  onChange={(e) => setCellular(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIphoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>
            <div className="row mb-3">
              <Box className="col-lg-6">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Status
                  </InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {
                      userInfoStatusList?.map(item => (
                        <MenuItem value={item?.id}>{item?.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
              <Box
                className="col-lg-6"
                sx={smallBoxStyle}
              >
                <TextField size="small"
                  fullWidth

                  label="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="EMAIL"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="DOB"
                      inputFormat="MM/dd/yyyy"
                      value={dob}
                      onChange={(e) => setDob(e)}
                      renderInput={(params) => <TextField size="small" {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
        {
          companyRestrictionsData?.extraDataExternal ?
            <div className="col-lg-6 col-md-12 col-12">
              <p className="mb-2 infoEmpl_text">extra data</p>
              <div className="empdetail_c">
                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header1 || "header1"}
                      value={field1}
                      onChange={(e) => setField1(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header2 || "header2"}
                      value={field2}
                      onChange={(e) => setField2(e.target.value)}
                    />
                  </Box>
                </div>
                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header3 || "header3"}
                      value={field3}
                      onChange={(e) => setField3(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header4 || "header4"}
                      value={field4}
                      onChange={(e) => setField4(e.target.value)}
                    />
                  </Box>
                </div>
                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header5 || "header5"}
                      value={field5}
                      onChange={(e) => setField5(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header6 || "header6"}
                      value={field6}
                      onChange={(e) => setField6(e.target.value)}
                    />
                  </Box>
                </div>

                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header7 || "header7"}
                      value={field7}
                      onChange={(e) => setField7(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header8 || "header8"}
                      value={field8}
                      onChange={(e) => setField8(e.target.value)}
                    />
                  </Box>
                </div>
                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header9 || "header9"}
                      value={field9}
                      onChange={(e) => setField9(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header10 || "header10"}
                      value={field10}
                      onChange={(e) => setField10(e.target.value)}
                    />
                  </Box>
                </div>
                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header11 || "header11"}
                      value={field11}
                      onChange={(e) => setField11(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header12 || "header12"}
                      value={field12}
                      onChange={(e) => setField12(e.target.value)}
                    />
                  </Box>
                </div>
                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header13 || "header13"}
                      value={field13}
                      onChange={(e) => setField13(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header14 || "header14"}
                      value={field14}
                      onChange={(e) => setField14(e.target.value)}
                    />
                  </Box>
                </div>
                <div className="row mb-3">
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header15 || "header15"}
                      value={field15}
                      onChange={(e) => setField15(e.target.value)}
                    />
                  </Box>
                </div>
              </div>
            </div>
            : null
        }
      </div>

      <div className="mb-4">
        <p className="mb-2 infoEmpl_text">CONTRACT</p>
        <div className="row m-0 access_right_card">
          <Box className="col-lg-6 mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Role
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={singleEmployeeWithId?.role?.id}
                label="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {
                  employeeRoles?.map(item => (
                    <MenuItem value={item?.id}>{item?.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <Box
            className="col-lg-6 mb-4"
            sx={smallBoxStyle}
          >
            <TextField size="small"
              fullWidth
              label="EMPLOYEE ID"
              id="EMPLOYEE ID"
              focused={employeeId}
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </Box>
          <Box className="col-lg-6 mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Contract Status
              </InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Contract Status"
                defaultValue={singleEmployeeWithId?.status?.id}
                value={contractStatus}
                onChange={(e) => setContractStatus(e.target.value)}
              >
                {
                  contractStatusList?.map(item => (
                    <MenuItem value={item?.id}>{item?.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <div className="col-lg-6 mb-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="START DATE"
                  inputFormat="MM/dd/yyyy"
                  value={startdate}
                  defaultValue={new Date(singleEmployeeWithId?.startDate)}
                  onChange={(e) => setStartdate(e)}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <Box className="col-lg-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                WORK STATION
              </InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={singleEmployeeWithId?.zone?.id}
                label="work station"
                value={workStation}
                onChange={(e) => setWorkStation(e.target.value)}
              >
                {
                  employeeWorkStations?.map(item => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <div className="col-lg-6">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="END DATE"
                  inputFormat="MM/dd/yyyy"
                  value={endDate}
                  // defaultValue={new Date(singleEmployeeWithId?.endDate)}
                  onChange={(e) => setEndDate(e)}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
        </div>
      </div>

      <div className="mt-5 access_right_component">
        <p className="__header">ACCESS RIGHTS</p>
        <div className="mt-2  __body">
          <div className="__upper d-flex">
            <Box
              style={{ width: "459px", marginLeft: "15px" }}
              className="inputField"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  SCHEDULE ACCESS
                </InputLabel>
                <Select size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="CHOOSE A PROVIDER"
                  value={WorkShift}
                  disabled={checkboxState ? true : false}
                  onChange={(e) => {
                    setWorkShift(e.target.value);
                    let id = e.target.value;
                    dispatch(GetWorkTimeAccess({ id, contractPagination }));
                  }}
                >
                  {workShiftSchdule &&
                    workShiftSchdule.map((item) => {
                      return (
                        <MenuItem value={item?.id}>{item?.name}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            <p>
              <Checkbox
                defaultChecked={false}
                onChange={() => setCheckboxState(!checkboxState)}
                style={{ marginLeft: "37px" }}
              />
              OR CUSTOM SCHEDULE
            </p>
          </div>
          {checkboxState && (
            <div className="__accessbody">
              <Divider>
                <p className="mt-2 separator">
                  Or Choose <br />
                  Custom Schedule
                </p>
              </Divider>
              <ContractorAccessCard
                heading1="zones"
                heading2="days"
                update
                isAddemployee={true}
                data={workShiftAccessTime}
              />
            </div>
          )}
        </div>
        {!checkboxState && WorkShift && workShiftAccessTime?.totalElements !== 0 ? (
          <>
            <div className="">
              <p className="__header">ACCESS</p>
              <Grid container sx={{ mt: 1 }}>
                <Grid
                  item
                  xs={3}
                  className="contractor-access-table-heading"
                  sx={{ textAlign: "left" }}
                >
                  NAME
                </Grid>
                <Grid item xs={3} className="contractor-access-table-heading">
                  DAY
                </Grid>
                <Grid item xs={3} className="contractor-access-table-heading">
                  FROM
                </Grid>
                <Grid item xs={3} className="contractor-access-table-heading">
                  TO
                </Grid>
              </Grid>
              {workShiftAccessTime &&
                workShiftAccessTime?.content?.map((item) => {
                  return (
                    <Grid container sx={{ mt: 1 }}>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-first"
                      >
                        {item?.zone?.name}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-data"
                      >
                        {item?.day?.name}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-data"
                      >
                        {item?.from}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className="contractor-access-table-data"
                      >
                        {item?.to}
                      </Grid>
                    </Grid>
                  );
                })}
            </div>
            <div className="d-flex justify-content-center">
              <TablePagination
                component="div"
                rowsPerPageOptions={[10, 15, 20]}
                labelRowsPerPage="Users per page"
                count={workShiftAccessTime?.totalElements}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </>
        ) : (
          <NotFoundDataWarning text={"NO WorkShift Access"} />
        )}
      </div>

      {/* <DetailCards option="update" /> */}
      <DetailDocument option="update" />
      <DetailFireArms option="update" />
      <DetailVehicles option="update" />

      <div className="addemp_dletuser">
        <div className="pull-right d-flex align-items-center mb-4">
          <Link to="/dashboard/company">
            <span>CANCEL</span>
          </Link>
          <button
            className=""
            onClick={() => handleUpdate()}
          >
            UPDATE EMPLOYEE
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
