import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Material Ui Components
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

// images
import exchangealt from "../../../../assets/images/exchange-alt-solid.svg";
import person4 from "../../../../assets/images/user-png.png";
import userregular from "../../../../assets/images/user-regular.svg";


// modals
import NewCard from "./Modal/NewCard";
import ChangeImage from "./Modal/ChangeImage";
import {
  getUserByEmail,
  createEmployee,
  preRegisterUser,
  UpdateExtraData,
} from "../../../../Apis/CompanyEmployee";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, getWorkStations, addWorkShift, addCustomWorkShift, userInfoStatus, createImgObj, uploadNewImage, getSelfie, downloadSelfie, GetContractStatus } from "../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";
import ContractorAccessCard from "../../Contractors/ContractorAccessCard";
import { GetAllWorkSchdule, GetWorkTimeAccess } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { getAllWorkSchdule, getcustomSchdulTime, getWorkTimeAccess } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { useTranslation } from "react-i18next";
import { GetHeaders } from "../../../../reduxToolkit/headers/HeadersApi";
import Cookies from "js-cookie";


const smallBoxStyle = {
  width: "100%",
  maxWidth: "100%",
  fontSize: "20px",
  height: "40px",
}


const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation()
  const lCode = Cookies.get("i18next") || "en";
  const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
  const employeeRoles = useSelector(state => state?.CompanyEmployeesSlice?.employeeRoles);
  const employeeWorkStations = useSelector(state => state?.CompanyEmployeesSlice?.employeeWorkStations);
  const userInfoStatusList = useSelector(state => state?.CompanyEmployeesSlice?.userInfoStatusList);
  const { contractStatusList } = useSelector(state => state?.CompanyEmployeesSlice)
  const { headersList } = useSelector(state => state.headersSlice);
  const workShiftAccessTime = useSelector(getWorkTimeAccess);
  const workShiftSchdule = useSelector(getAllWorkSchdule);
  const customSchdulTime = useSelector(getcustomSchdulTime);
  const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";
  const [changeImageModal, setChangeImageModal] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cellular, setCellular] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
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
  const [newCardModal, setNewCardModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checkboxState, setCheckboxState] = useState(false);
  const [WorkShift, setWorkShift] = useState();
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);


  let contractPagination = {
    order: true,
    page: page,
    size: rowsPerPage,
    sortBy: "id",
  };

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getWorkStations());
    dispatch(GetAllWorkSchdule());
    dispatch(userInfoStatus());
    dispatch(GetHeaders())
    dispatch(GetContractStatus())
  }, [])


  // const requireFieldsFunc = () => {
  //   if (name !== "" && gender !== "" && cellular !== "" && status !== "" && email !== "" && dob !== "" &&
  //     role !== "" && employeeId !== "" && startdate !== "" && workStation !== "" && contractStatus !== "" && endDate !== "") {
  //     return true;
  //   }
  // }

  const handleSaveChanges = () => {
    if (email && name && cellular && gender && status && dob && role && workStation && employeeId && contractStatus && startdate && endDate) {
      console.log("name", name, "email", email, "gender", gender,
        "cellular", cellular,
        "status", status, "dov", dob, "role", role, "workStation", workStation,
        "employeeId", employeeId,
        "contractStatus", contractStatus, "startdate", startdate,
        "endDate", endDate)

      getUserByEmail(email).then(({ data }) => {
        toast.error(data.message)
      }).catch(error => {
        const preRegisterUserObj = {
          name: name,
          email: email,
          phoneNumber: cellular
          // gender:{}
        }
        preRegisterUser(preRegisterUserObj).then((
          // { data: { data } }
          res
        ) => {

          // toast.success("Pre-Register User Created Successfully..!");
          console.log("preee", res?.data?.data)
          console.log("preee", res?.data)
          if (res?.data?.data != null) {
            if (checkboxState) {
              let customSchdule = [];
              customSchdulTime?.map((item) => {
                customSchdule.push({
                  user: { id: res?.data?.data?.id },
                  zone: { id: item?.zone?.id.split(",", 1)[0] },
                  day: { id: item?.day?.id },
                  from: item?.from,
                  to: item?.to,
                });
              });
              if (customSchdulTime?.length !== 0) {
                dispatch(addCustomWorkShift(customSchdule));
              }
            } else {
              if (WorkShift) {
                const workShiftBody = {
                  userId: res?.data?.data?.id,
                  workShiftId: WorkShift
                }
                dispatch(addWorkShift(workShiftBody));
              }
            }

            const employeeObj = {
              user: {
                id: res?.data?.data?.id // pre-register user id
              },
              company: {
                id: companyId
              },
              zone: {
                id: workStation
              },
              role: {
                id: role
              },
              employeeId: employeeId,
              startDate: startdate?.getTime(),
              endDate: endDate?.getTime()
            }
            createEmployee(employeeObj).then(({ data: { data } }) => {
              toast.success("Employee Created Successfully..!")
              console.log("need to pass", data)

              const body = {
                accessMethod: {
                  id: 5,
                },
                user: {
                  id: data?.user?.id,
                },
                description: "Face recognition"
              }

              if (imgUpload?.size) {
                dispatch(createImgObj(body)).then((res) => {
                  console.log("reeeee", res)
                  let formData = new FormData();
                  formData.append('id', res?.payload?.data?.data?.id);
                  formData.append('option', "user");
                  formData.append('file', imgUpload);

                  dispatch(uploadNewImage(formData))
                  // .then(() => {
                  //   dispatch(getSelfie(data?.id)).then(({ payload: { data: { data } } }) => {
                  //     dispatch(downloadSelfie(data?.id));
                  //     setImgUpload(null)
                  //   })
                  // })

                })
              }
              const extraDatabody = {
                "header1": field1 || "",
                "header2": field2 || "",
                "header3": field3 || "",
                "header4": field4 || "",
                "header5": field5 || "",
                "header6": field6 || "",
                "header7": field7 || "",
                "header8": field8 || "",
                "header9": field9 || "",
                "header10": field10 || "",
                "header11": field11 || "",
                "header12": field12 || "",
                "header13": field13 || "",
                "header14": field14 || "",
                "header15": field15 || "",
                "id": ""
              }

              UpdateExtraData(extraDatabody, data?.user?.id).then(() => {
                // toast.success("Extra Data updated successfully..!")
              }).catch(error => {
                // toast.error("something went wrong in extra data section.")
              })
              navigate("/dashboard/employee/all-employees", { replace: true });

            }).catch(error => {
              toast.error("something went wrong in creating employee.")
            })
          } else {
            toast.error(res?.data?.message)

          }
          // console.log(data)
        }).catch(error => {
          console.log("errrr", error)
          // toast.error("something went wrong in pre-register user. Please check your fields")
        })
      })
    } else {
      toast.warn("Please Fill All The Feilds")
    }

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
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/employee/all-employees">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px",
            }}></i>
          </Link>
          <h2>{t("create_employee")}</h2>
        </div>
      </div>

      <div className="text-center exchange_icon">
        <img
          src={
            imageToUpload === null
              ? person4
              : imageToUpload
          }
          className="img-fluid"
          style={{ width: 240, height: 240, borderRadius: "100%" }}
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
        <ChangeImage
          show={changeImageModal}
          onHide={() => setChangeImageModal(false)}
          preview={setImageToUpload}
          fileObj={setImgUpload}
        />
      </div>

      <div className="mt-3 mb-4 row">
        <div className="col-lg-6 col-md-12 col-12">
          <p className="mb-2 infoEmpl_text">INFORMATION</p>
          <div className="empdetail_c">
            <div className="row mb-3">
              <Box sx={smallBoxStyle} className="col-lg-12">
                <TextField size="small"
                  fullWidth

                  label="NAME"
                  id="NAME"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=""
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
                    label="Age"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
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
        {/* {
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
                      label={headersList?.header1}
                      id="ADDRESS 1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth
                      label={headersList?.header2}
                      id="ADDRESS 2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
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

                      label={headersList?.header3}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      id="STATE"
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header4}
                      id="COUNTRY"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
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

                      label={headersList?.header5}
                      value={postcode}
                      onChange={(e) => setPostCode(e.target.value)}
                      id="POST CODE"
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header6}
                      value={homeNumber}
                      onChange={(e) => setHomeNumber(e.target.value)}
                      id="HOME NUMBER"
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

                      label={headersList?.header7}
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                      id="BLOOD TYPE"
                    />
                  </Box>
                  <Box
                    className="col-lg-6"
                    sx={smallBoxStyle}
                  >
                    <TextField size="small"
                      fullWidth

                      label={headersList?.header8}
                      id="ARABIC NAME"
                      value={arabicName}
                      onChange={(e) => setArabicName(e.target.value)}
                    />
                  </Box>
                </div>
                <div className="row">
                  <Box className="col-lg-6">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {headersList?.header9}
                      </InputLabel>
                      <Select size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={headersList?.header9}
                        value={wasVacinated}
                        onChange={(e) => setWasVacinated(e.target.value)}
                      >
                        <MenuItem value={true}>YES</MenuItem>
                        <MenuItem value={false}>NO</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
            </div>
            : null
        } */}
      </div>

      <div className="mb-4">
        <p className="mb-2 infoEmpl_text">CONTRACT</p>
        <div className="row m-0 access_right_card">
          <Box className="col-lg-6 mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Role
              </InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {
                  employeeRoles?.map(item => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
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
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </Box>
          <Box className="col-lg-6 mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Contract Status
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Contract Status"
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
                  disablePast={true}
                  value={startdate}
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
                label="WORK STATION"
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
                  disablePast={true}
                  inputFormat="MM/dd/yyyy"
                  value={endDate}
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
        {!checkboxState && WorkShift && workShiftAccessTime?.totalElements !== 0 && (
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
        )
          //  : (

          //   <NotFoundDataWarning text={"NO WorkShift Access"} />
          // )
        }
      </div>

      <div className="addemp_dletuser">
        <div className="pull-right d-flex align-items-center mb-4">
          <Link to="/dashboard/company">
            <span style={{ cursor: "pointer" }}>CANCEL</span>
          </Link>
          <button onClick={handleSaveChanges}>
            CREATE EMPLOYEE
          </button>
        </div>
      </div>

      <NewCard
        title="New Card"
        show={newCardModal}
        onHide={() => setNewCardModal(false)}
      />
      {/* <ChangeImage
        title="Change Image"
        check="false"
        show={changeImageModal}
        onHide={() => setChangeImageModal(false)}
      /> */}
    </>
  );
};

export default CreateEmployee;
