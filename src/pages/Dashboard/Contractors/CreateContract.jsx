import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";
import ContractorAccessCard from "./ContractorAccessCard";
import { Modal } from "react-bootstrap";
import {
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import DeleteIcon from "../../../assets/images/redTrash.svg";
import emptyList from "../../../assets/images/warning.svg";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "react-bootstrap";
import apiInstance from "../../../Apis/Axios";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import {
  CreateContract,
  CreateContractWithCustom,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { useNavigate } from "react-router-dom";
import {
  GetAllContractors,
  GetAllWorkSchdule,
  GetWorkTimeAccess,
  CreateContractWorkSchdule,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import {
  getAllContractors,
  getAllWorkSchdule,
  getWorkTimeAccess,
  getcreateContract,
  getcustomSchdulTime,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import Step4AccessRights from "../Company/Employees/EnrollmentSteps/Step4AccessRights";
import ClearButton from "../../../components/ClearButton";

export const CreateContractor = () => {

  const lCode = Cookies.get("i18next") || "en";
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const getAllContractor = useSelector(getAllContractors);
  const workShiftSchdule = useSelector(getAllWorkSchdule);
  const workShiftAccessTime = useSelector(getWorkTimeAccess);
  const recentlyCreatedContract = useSelector(getcreateContract);
  const customSchdulTime = useSelector(getcustomSchdulTime);
  const [contractor, setContractor] = useState();
  const [deliveryDate, setdeliveryDate] = useState();
  const [item, setItem] = useState();
  const [serviceType, setServiceType] = useState();
  const [description, setDescription] = useState("");
  const [folio, setFolio] = useState("");
  const [checkboxState, setCheckboxState] = useState(false);
  const [startContract, setstartContract] = useState();
  const [endContract, setendContract] = useState();
  const [WorkShift, setWorkShift] = useState("");


  console.log(WorkShift)

  const miliseconds = 1604395966369;
  const date = new Date(miliseconds);
  var startContractSeconds = new Date(startContract); // some mock date
  var startMilliseconds = startContractSeconds.getTime();

  var endContractSeconds = new Date(endContract); // some mock date
  var endMilliseconds = endContractSeconds.getTime();
  const [userRemoveModal, setuserRemoveModal] = useState(false);


  const [workShiftsList, setWorkShiftsList] = useState([]);
  const [customizedList, setCustomizedList] = useState([]);

  // Pagination
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderby, setOrderby] = useState("id");
  let contractPagination = {
    order: true,
    page: page,
    size: rowsPerPage,
    sortBy: orderby,
  };
  // End Pagination

  const getAllcontractDetail = async () => {
    const data = {
      order: true,
      page: 0,
      size: 10,
      sortBy: "string",
    };
    const result = await apiInstance
      .post("contractor-service/get-all-pageable", {
        order: true,
        page: 0,
        size: 10,
        sortBy: "id",
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  };
  const addContractWorkShift = async (val) => {
    const passValue = { WorkShift, val };
    /*author mazhar iqbal
      create contract with defult work shift
    */
    const result = await apiInstance
      .post(
        `work-shift-service/contract-work/create/by-workshift-id/${WorkShift}/by-contract-id/${val}`
      )
      .then(function (response) {
        navigate("/dashboard/employee/contractors", { replace: true });
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  };
  const addContractWithCustomShift = async (val) => {
    let customSchdule = [];
    customSchdulTime?.map((item) => {
      customSchdule.push({
        contract: { id: val },
        zone: { id: item?.zone?.id.split(",", 1)[0] },
        day: { id: item?.day?.id },
        from: item?.from,
        to: item?.to,
      });
    });
    if (customSchdulTime?.length !== 0) {
      /*author mazhar iqbal
        create custom work shiftwork
      */
      dispatch(CreateContractWithCustom(customSchdule));
    }
    navigate("/dashboard/employee/contractors", { replace: true });
  };

  const handleSubmit = async () => {
    if (contractor && startMilliseconds && endMilliseconds && description !== "") {
      const data = {
        contractor: { id: contractor },
        starDate: startMilliseconds,
        endDate: endMilliseconds,
        description: description,
        folio: folio
      };
      /*author mazhar iqbal
        create contract
      */
      await dispatch(CreateContract(data));
    } else {
      toast.info("Please Fill All Fields")
    }
  };

  useEffect(() => {
    /*author mazhar iqbal
      get contractor list
    */
    dispatch(GetAllContractors());
    getAllcontractDetail();
    /*author mazhar iqbal
      get schedule access list
    */
    dispatch(GetAllWorkSchdule());
    /*author mazhar iqbal
     get schedule access list detail
   */

  }, []);

  useEffect(() => {
    if (WorkShift) {

      dispatch(GetWorkTimeAccess({ id: WorkShift, contractPagination }));
    } else {
      return null
    }

  }, [rowsPerPage])

  useEffect(() => {

    if (recentlyCreatedContract.length !== 0 && checkboxState === false) {
      addContractWorkShift(recentlyCreatedContract?.id);
    }
    if (checkboxState) {
      addContractWithCustomShift(recentlyCreatedContract?.id);
    }
  }, [recentlyCreatedContract]);

  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/employee/contractors">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>{t("create")}</h2>
        </div>
      </div>
      <Box sx={{ padding: "0rem 4rem" }}>
        <div className="mt-2 order_data_component">
          <p className="__header">{t("contract_data")}</p>
          <div className="formCard">
            <div className="mt-2 __body">

              <Grid container spacing={2}>
                <ClearButton flagTooltip={true} handleClear={()=>console.log()} textTooltip={"Clear_all_fields"}/>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box className="inputField">
                    <FormControl fullWidth
                      sx={{
                        textAlign: i18n.dir() == "rtl" ? "right" : "left",
                        "& 	.MuiOutlinedInput-notchedOutline": {
                          textAlign: i18n.dir() == "rtl" ? "right" : "left",
                        },
                        "& 	.MuiInputLabel-root": {
                          fontSize: 12,
                          left: i18n.dir() == "rtl" ? "inherit" : "0",
                          right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                          transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                        }
                      }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        {t("choose_a_contractor")}
                      </InputLabel>
                      <Select size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={t("choose_a_contractor")}
                        value={contractor}
                        onChange={(e) => setContractor(e.target.value)}

                      >
                        {getAllContractor &&
                          getAllContractor.map((item, index) => {
                            return (
                              <MenuItem value={item?.id} key={index}>
                                <strong className="me-2">{item?.acronym} | </strong>{" "}
                                <span style={{ fontSize: "14px" }}>
                                  {item?.user?.name}
                                </span>
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box >
                    <TextField size="small"
                      className="inputField"
                      fullWidth
                      id="outlined-multiline-static"
                      label={t("folio")}

                      value={folio}
                      // defaultValue="Type some description if necessary..."
                      style={{ color: "#707070" }}
                      onChange={(e) => setFolio(e.target.value)}

                      sx={{
                        textAlign: i18n.dir() == "rtl" ? "right" : "left",
                        "& 	.MuiOutlinedInput-notchedOutline": {
                          textAlign: i18n.dir() == "rtl" ? "right" : "left",
                        },
                        "& 	.MuiInputLabel-root": {
                          fontSize: 12,
                          left: i18n.dir() == "rtl" ? "inherit" : "0",
                          right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                          transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                        }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box className="inputField">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}
                        sx={{
                          textAlign: i18n.dir() == "rtl" ? "right" : "left",
                          "& 	.MuiOutlinedInput-notchedOutline": {
                            textAlign: i18n.dir() == "rtl" ? "right" : "left",
                          },
                          "& 	.MuiInputLabel-root": {
                            fontSize: 12,
                            left: i18n.dir() == "rtl" ? "inherit" : "0",
                            right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                            transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                          }
                        }}
                      >
                        <DesktopDatePicker
                          label={t("start_contract")}
                          inputFormat="MM/dd/yyyy"
                          value={startContract}
                          onChange={setstartContract}
                          renderInput={(params) => <TextField size="small" {...params} />}

                        />
                      </Stack>
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box className="inputField">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}
                        sx={{
                          textAlign: i18n.dir() == "rtl" ? "right" : "left",
                          "& 	.MuiOutlinedInput-notchedOutline": {
                            textAlign: i18n.dir() == "rtl" ? "right" : "left",
                          },
                          "& 	.MuiInputLabel-root": {
                            fontSize: 12,
                            left: i18n.dir() == "rtl" ? "inherit" : "0",
                            right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                            transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                          }
                        }}
                      >
                        <DesktopDatePicker
                          label={t("end_contract")}
                          inputFormat="MM/dd/yyyy"
                          value={endContract}
                          onChange={setendContract}
                          renderInput={(params) => <TextField size="small" {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField size="small"
                    className="inputField"
                    fullWidth
                    id="outlined-multiline-static"
                    label={t("description")}
                    multiline
                    rows={4}

                    // defaultValue="Type some description if necessary..."
                    style={{ color: "#707070" }}
                    onChange={(e) => setDescription(e.target.value)}

                    sx={{
                      textAlign: i18n.dir() == "rtl" ? "right" : "left",
                      "& 	.MuiOutlinedInput-notchedOutline": {
                        textAlign: i18n.dir() == "rtl" ? "right" : "left",
                      },
                      "& 	.MuiInputLabel-root": {
                        fontSize: 12,
                        left: i18n.dir() == "rtl" ? "inherit" : "0",
                        right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                        transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                      }
                    }}
                  />
                </Grid>
              </Grid>
              {/* <Box sx={{ display: 'flex', gap: "4.5rem" }}>
              <Box
                sx={{ width: "100%", marginLeft: "15px" }}
                className="inputField"
              >
                <FormControl fullWidth
                  sx={{
                    textAlign: i18n.dir() == "rtl" ? "right" : "left",
                    "& 	.MuiOutlinedInput-notchedOutline": {
                      textAlign: i18n.dir() == "rtl" ? "right" : "left",
                    },
                    "& 	.MuiInputLabel-root": {
                      fontSize: 12,
                      left: i18n.dir() == "rtl" ? "inherit" : "0",
                      right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                      transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                    }
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    {t("choose_a_contractor")}
                  </InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={t("choose_a_contractor")}
                    value={contractor}
                    onChange={(e) => setContractor(e.target.value)}

                  >
                    {getAllContractor &&
                      getAllContractor.map((item, index) => {
                        return (
                          <MenuItem value={item?.id} key={index}>
                            <strong className="me-2">{item?.acronym} | </strong>{" "}
                            <span style={{ fontSize: "14px" }}>
                              {item?.user?.name}
                            </span>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "100%", marginRight: "15px" }}>
                <TextField size="small"
                  className="inputField"
                  fullWidth
                  id="outlined-multiline-static"
                  label={t("folio")}

                  value={folio}
                  // defaultValue="Type some description if necessary..."
                  style={{ color: "#707070" }}
                  onChange={(e) => setFolio(e.target.value)}

                  sx={{
                    textAlign: i18n.dir() == "rtl" ? "right" : "left",
                    "& 	.MuiOutlinedInput-notchedOutline": {
                      textAlign: i18n.dir() == "rtl" ? "right" : "left",
                    },
                    "& 	.MuiInputLabel-root": {
                      fontSize: 12,
                      left: i18n.dir() == "rtl" ? "inherit" : "0",
                      right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                      transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                    }
                  }}
                />
              </Box>
            </Box>
            <div className="col-md-12 d-flex">
              <Box
                style={{ width: "100%", marginRight: "72px" }}
                className="inputField"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}
                    sx={{
                      textAlign: i18n.dir() == "rtl" ? "right" : "left",
                      "& 	.MuiOutlinedInput-notchedOutline": {
                        textAlign: i18n.dir() == "rtl" ? "right" : "left",
                      },
                      "& 	.MuiInputLabel-root": {
                        fontSize: 12,
                        left: i18n.dir() == "rtl" ? "inherit" : "0",
                        right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                        transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                      }
                    }}
                  >
                    <DesktopDatePicker
                      label={t("start_contract")}
                      inputFormat="MM/dd/yyyy"
                      value={startContract}
                      onChange={setstartContract}
                      renderInput={(params) => <TextField size="small" {...params} />}

                    />
                  </Stack>
                </LocalizationProvider>
              </Box>
              <Box style={{ width: "100%" }} className="inputField">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}
                    sx={{
                      textAlign: i18n.dir() == "rtl" ? "right" : "left",
                      "& 	.MuiOutlinedInput-notchedOutline": {
                        textAlign: i18n.dir() == "rtl" ? "right" : "left",
                      },
                      "& 	.MuiInputLabel-root": {
                        fontSize: 12,
                        left: i18n.dir() == "rtl" ? "inherit" : "0",
                        right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                        transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                      }
                    }}
                  >
                    <DesktopDatePicker
                      label={t("end_contract")}
                      inputFormat="MM/dd/yyyy"
                      value={endContract}
                      onChange={setendContract}
                      renderInput={(params) => <TextField size="small" {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>
            </div>
            <div className="col-md-12">
              <TextField size="small"
                className="inputField"
                fullWidth
                id="outlined-multiline-static"
                label={t("description")}
                multiline
                rows={4}

                // defaultValue="Type some description if necessary..."
                style={{ color: "#707070" }}
                onChange={(e) => setDescription(e.target.value)}

                sx={{
                  textAlign: i18n.dir() == "rtl" ? "right" : "left",
                  "& 	.MuiOutlinedInput-notchedOutline": {
                    textAlign: i18n.dir() == "rtl" ? "right" : "left",
                  },
                  "& 	.MuiInputLabel-root": {
                    fontSize: 12,
                    left: i18n.dir() == "rtl" ? "inherit" : "0",
                    right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                    transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                  }
                }}
              />
            </div> */}
            </div>
          </div>
        </div>
        <Box sx={{ margin: "2rem 0rem" }}>
          <Step4AccessRights
            // employeeData={employeeData}
            workShiftsList={workShiftsList}
            setWorkShiftsList={setWorkShiftsList}
            customizedList={customizedList}
            setCustomizedList={setCustomizedList}
          // onChange={handleFormChangeEmployeeData}
          // setEmployeeData={setEmployeeData} 
          />
        </Box>
        {/* <div className="mt-5 access_right_component">
        <p className="__header">{t("access_right")}</p>
        <div className="mt-2  __body">
          <div className="__upper d-flex">
            <Box
              style={{ width: "459px", marginLeft: "15px" }}
              className="inputField"
            >
              <FormControl fullWidth
                sx={{
                  textAlign: i18n.dir() == "rtl" ? "right" : "left",
                  "& 	.MuiOutlinedInput-notchedOutline": {
                    textAlign: i18n.dir() == "rtl" ? "right" : "left",
                  },
                  "& 	.MuiInputLabel-root": {
                    fontSize: 12,
                    left: i18n.dir() == "rtl" ? "inherit" : "0",
                    right: i18n.dir() == "rtl" ? "1.75rem" : "0",
                    transformOrigin: i18n.dir() == "rtl" ? "right" : "left"
                  }
                }}>
                <InputLabel id="demo-simple-select-label">
                  {t("schedule_access")}
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
              {t("or_custom_schedule")}
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
                heading1={t("zones")}
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
              {workShiftAccessTime?.content?.length > 0 ?
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
                }) :
                <NotFoundDataWarning text={t("no_workshift_access")} />
              }
            </div>

            {
              workShiftAccessTime?.content?.length > 0 &&
              <div className="d-flex justify-content-center">
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[10, 15, 20]}
                  labelRowsPerPage={t("access_per_page")}
                  count={workShiftAccessTime?.totalElements}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            }

          </>
        )
          // : (

          //   <NotFoundDataWarning text={t("no_workshift_access")} />

          // )
        }

        < div className="btnDiv">
          <button className="custom_btn_cancel_gray_hover" style={{ width: "284px", flex: "unset" }}>
            {t("cancel")?.toUpperCase()}
          </button>
          <button className="custom_primary_btn_dark" onClick={handleSubmit} style={{ width: "284px", flex: "unset" }}>
            {t("create")?.toUpperCase()}
          </button>

        </div>
      </div> */}
        < div className="d-flex justify-content-end mb-3">
          <button className="custom_btn_cancel_gray_hover" style={{ width: "284px", flex: "unset" }}>
            {t("cancel")?.toUpperCase()}
          </button>
          <button className="custom_primary_btn_dark" onClick={handleSubmit} style={{ width: "284px", flex: "unset" }}>
            {t("create")?.toUpperCase()}
          </button>

        </div>
      </Box>
    </>
  );
};
