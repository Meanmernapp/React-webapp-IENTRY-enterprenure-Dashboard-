import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ContractorAccessCard from "./ContractorAccessCard";
import { Modal } from "react-bootstrap";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import DeleteIcon from "../../../assets/images/redTrash.svg";
import moment from "moment";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import apiInstance from "../../../Apis/Axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CreateContractWithCustom,
  GetAllContractors,
  GetAllWorkSchdule,
  GetWorkTimeAccess,
  GetWorkShiftByContractID,
  DeleteAccessTime,
  GetStatus,
  UpDateContract
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import {
  getAllContractors,
  getAllWorkSchdule,
  getWorkTimeAccess,
  getcustomSchdulTime,
  getWorkShiftByContractID,
  getcontractAllStatus
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { toast } from "react-toastify";
import emptyList from "../../../assets/images/warning.svg";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

const UpdateContract = () => {
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  let dispatch = useDispatch();
  let navigates = useNavigate()
  let navigate = useLocation();
  let { state } = navigate;
  let contractId = state?.state;
  console.log("this is the contract id---->", contractId)

  const getAllContractor = useSelector(getAllContractors);
  const workShiftSchdule = useSelector(getAllWorkSchdule);
  const workShiftAccessTime = useSelector(getWorkTimeAccess);
  const customSchdulTime = useSelector(getcustomSchdulTime);
  const WorkShiftByContractID = useSelector(getWorkShiftByContractID);
  const contractAllStatus = useSelector(getcontractAllStatus);
  const [contractor, setContractor] = useState();
  const [item, setItem] = useState();
  const [description, setDescription] = useState();
  const [checkboxState, setCheckboxState] = useState(false);
  const [startContract, setstartContract] = useState();
  const [endContract, setendContract] = useState();
  const [WorkShift, setWorkShift] = useState("");
  const [selIndex, setSelIndex] = useState(null)
  const [contractStatus, setContractStatus] = useState()
  const [singleContract, setSingleContract] = useState()
  console.log("this is the contract id", singleContract)

  const miliseconds = 1604395966369;
  const date = new Date(miliseconds);
  var startContractSeconds = new Date(startContract);
  var startMilliseconds = startContractSeconds.getTime();

  var endContractSeconds = new Date(endContract);
  var endMilliseconds = endContractSeconds.getTime();
  const [userRemoveModal, setuserRemoveModal] = useState(false);

  const startDate = moment(singleContract?.starDate).format('MM/DD/YYYY');
  const endDate = moment(singleContract?.endDate).format('MM/DD/YYYY');
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
    const result = await apiInstance
      .post(
        `work-shift-service/contract-work/create/by-workshift-id/${WorkShift}/by-contract-id/${val}`
      )
      .then(function (response) {
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
    /*author mazhar iqbal
      update contract with custom work shift
    */
    dispatch(CreateContractWithCustom(customSchdule)).then(() => {
      /*author mazhar iqbal
        get contractor detail
      */
      getContractDetail()
    });
  };
  const getContractDetail = async () => {
    await apiInstance
      .get(`contract-service/get-by-id/${contractId}`)
      .then(function (response) {
        if (response.status == 200) {
          setSingleContract(response?.data?.data);
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  const handleSubmit = () => {
    const data = {
      id: singleContract?.id,
      status: { id: contractStatus ? contractStatus : singleContract?.status?.id },
      starDate: startMilliseconds ? startMilliseconds : singleContract?.starDate,
      endDate: endMilliseconds ? endMilliseconds : singleContract?.endDate,
      description: description ? description : singleContract?.description,
    };
    /*author mazhar iqbal
      update contract
    */
    dispatch(UpDateContract(data)).then(() => {
      navigates("/dashboard/employee/contractors")
    })
    if (WorkShift && checkboxState === false) {
      /*author mazhar iqbal
        update contract with default work shift
      */
      addContractWorkShift(singleContract?.id);
    }
    if (checkboxState) {
      /*author mazhar iqbal
        update contract with custom work shift
      */
      addContractWithCustomShift(singleContract?.id);
    }
  };


  useEffect(() => {
    getContractDetail()
    /*author mazhar iqbal
     get all contractors
   */
    dispatch(GetAllContractors());
    /*author mazhar iqbal
      get all contractor list
    */
    getAllcontractDetail();
    /*author mazhar iqbal
     get all work shift list
   */
    dispatch(GetAllWorkSchdule());
    /*author mazhar iqbal
      get work shift detail with pagination
    */
    dispatch(GetWorkTimeAccess());
    dispatch(GetStatus());
  }, []);

  const removeShift = () => {
    /*author mazhar iqbal
      remove access
    */
    dispatch(DeleteAccessTime(selIndex)).then(() => { dispatch(GetAllWorkSchdule()) })
  }
  useEffect(() => {
    /*author mazhar iqbal
      get work shift detail with contract id
    */
    dispatch(GetWorkShiftByContractID({ contractId, contractPagination }))
  }, [page, rowsPerPage]);

  function UserRemove(props) {
    const { from, to, deleteindex } = props;

    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">REMOVE ACCESS</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "12px", fontWeight: 400 }}
            >
              Are you sure that would you like to remove to the access {from} to
              {to} in the work shift Morning?
            </span>

            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button className="button-sec btn-confirm" onClick={() => {
                removeShift()
                setuserRemoveModal(false)

              }
              }>CONFIRM</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  useEffect(() => {
    dispatch(GetAllWorkSchdule());
  }, [page, WorkShiftByContractID])

  useEffect(() => {
    if (WorkShiftByContractID.length > 0) {
      setWorkShift(WorkShiftByContractID?.content[0]?.workShiftSchedule?.workShift?.id)
    }
  }, [WorkShiftByContractID.id])
  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/employee/contractors/contractor-details">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>UPDATE Contract</h2>
        </div>
      </div>
      <div className="mt-5 order_data_component">
        <p className="__header">CONTRACT DATA</p>
        <div className="formCard">
          <div className="mt-2 __body">
            <div className="col-md-12 d-flex">
              <FormControl fullWidth

              >
                <Box
                  disabled
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "40px",
                    background: "#E1E1E1",
                    borderRadius: '4px'
                  }}

                >
                  <TextField size="small"
                    fullWidth
                    // disabled
                    focused={singleContract?.contractor.acronym}
                    placeholder={singleContract?.contractor.acronym}
                    label={t("contractor")}
                    id="LONGTITID"
                    value={singleContract?.contractor.acronym}
                  />
                </Box>
              </FormControl>
              <Box
                style={{ width: "100%", marginLeft: "68px" }}
                className="inputField"
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("status")}
                  </InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={t("status")}
                    value={contractStatus}
                    onChange={(e) => setContractStatus(e.target.value)}
                  >
                    {contractAllStatus &&
                      contractAllStatus.map((item, index) => {
                        return (
                          <MenuItem value={item?.id} key={index}>
                            <span style={{ fontSize: "14px" }}>{item?.name.replace("_", " ")}</span>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="col-md-12 d-flex">
              <Box
                style={{ width: "100%", marginRight: "68px" }}
                className="inputField"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="START CONTRACT"
                      inputFormat="MM/dd/yyyy"
                      value={startContract ? startContract : startDate}
                      onChange={setstartContract}
                      renderInput={(params) => <TextField size="small" {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>
              <Box style={{ width: "100%" }} className="inputField">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="END CONTRACT"
                      inputFormat="MM/dd/yyyy"
                      value={endContract ? endContract : endDate}
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
                label="DESCRIPTION"
                multiline
                focused={singleContract?.description}
                rows={4}
                defaultValue={singleContract?.description}
                style={{ color: "#707070" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
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
                  label="SCHEDULE ACCESS"
                  value={WorkShift}
                  // defaultValue={WorkShiftByContractID?.content.length > 0 && WorkShiftByContractID?.content[0]?.workShiftSchedule?.workShift?.id}
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
        {WorkShiftByContractID.totalElements !== 0 && (
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
                <Grid item xs={2} className="contractor-access-table-heading">
                  FROM
                </Grid>
                <Grid item xs={2} className="contractor-access-table-heading">
                  TO
                </Grid>
                {item?.workShiftSchedule?.workShift?.name == item?.workShiftSchedule?.workShift?.name ? null :
                  <Grid item xs={2} className="contractor-access-table-heading">
                    ACTION
                  </Grid>}
              </Grid>
              {WorkShiftByContractID?.content?.length > 0 ?
                WorkShiftByContractID?.content?.map((item) => {
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
                        xs={2}
                        className="contractor-access-table-data"
                      >
                        {item?.from}
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        className="contractor-access-table-data"
                      >
                        {item?.to}
                      </Grid>
                      {item?.workShiftSchedule?.workShift?.name == item?.workShiftSchedule?.workShift?.name ? null : <Grid item xs={2} className="contractor-access-table-data">
                        <img
                          src={DeleteIcon}
                          onClick={() => {
                            setuserRemoveModal(true);
                            setSelIndex(item?.id)
                          }}
                        />{" "}
                        <UserRemove
                          show={userRemoveModal}
                          onHide={() => setuserRemoveModal(false)}
                          from={item?.from}
                          to={item?.to}
                        // deleteindex={index}
                        />
                      </Grid>}

                    </Grid>
                  );
                }) :
                <NotFoundDataWarning text={t("no_workshift_access")} />
              }
            </div>
            {
              WorkShiftByContractID?.content?.length > 0 &&
              <div className="d-flex justify-content-center">
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[10, 15, 20]}
                  labelRowsPerPage={t("access_per_page")}
                  count={WorkShiftByContractID?.totalElements}
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
          //   <NotFoundDataWarning text={"No Access in this work shift"} />
          // )
        }

        <div className="d-flex justify-content-end ml-auto" style={{ maxWidth: "500px", width: "100%" }}>
          <button className="custom-primary-btn cancel-custom-btn">
            CANCEL
          </button>
          <button className="custom-primary-btn create-custom-btn" onClick={handleSubmit}>
            UPDATE
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateContract