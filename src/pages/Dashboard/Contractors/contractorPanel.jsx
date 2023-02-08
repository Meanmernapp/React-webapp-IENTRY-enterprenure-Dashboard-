import { useState } from "react";
import apiInstance from "../../../Apis/Axios";
import { Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import file from "../../../assets/images/file.svg";
import plus from "../../../assets/images/ic-add.svg";
import { Link } from "react-router-dom";

import emptyList from "../../../assets/images/warning.svg";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import {
  GetAllEmployeeContractors,
  GetAllEmployeeContracts,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import {
  getAllEmployeeContracts,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { useSelector } from "react-redux";
import ContractorTable from "./ContractorTable";

import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

const ContractorPanel = () => {
  const fetchAllContracts = useSelector(getAllEmployeeContracts);

  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  const [orderby, setOrderby] = useState("id");
  const [sort, setSort] = useState();

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  console.log(checked)
  const [show, setShow] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [dropDownProps, setDropDownProps] = useState({
    panel: "contractor",
    firstItem: "ALLOW EVENT",
    secondItem: "VIEW DETAILS",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showIncome, setShowIncome] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  let dispatch = useDispatch();
  const [allFilters, setAllFilters] = useState("id");
  //pagination
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  // const [vehicleImgUrl, setVehicleImgUrl] = useState('');


  const handlFilters = (order, sort) => {
    setOrderBy(order);
    setSortBy(sort);
  };

  // functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  let contractPagination = {
    order: sortBy === "asc" ? true : false,
    page: page,
    size: rowsPerPage,
    sortBy: orderBy ? orderBy : "id",
  };

  const fetchFilterApi = async () => {
    const result = await apiInstance
      .get("assets-service/contract/get-filters")
      .then(function (response) {
        setAllFilters(response?.data?.data);
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  };

  var now = new Date();
  var nowIso = now.toISOString(); //"2020-07-24T06:11:49.911Z"
  var nowInMilliseconds = Date.parse(nowIso);
  var date = new Date("11/21/1987 16:00:00"); // some mock date
  var milliseconds = date.getTime();
  useEffect(() => {
    dispatch(GetAllEmployeeContractors());
    /*author mazhar iqbal
      get contract filter attribute list
    */
    fetchFilterApi();
  }, []);
  let inCommingActive = checked === false
    ? `incoming-active/${nowInMilliseconds}`
    : `records/${milliseconds}`;

  useEffect(() => {
    if (checked) {
      /*author mazhar iqbal
        get incommig contracts
      */
      dispatch(
        GetAllEmployeeContracts({ inCommingActive, contractPagination })
      );
    } else {
      /*author mazhar iqbal
        get contracts records
      */
      dispatch(
        GetAllEmployeeContracts({ inCommingActive, contractPagination })
      );
    }
  }, [checked, orderby, rowsPerPage, page, sortBy]);

  const options = {
    filterType: "checkbox",
  };

  return (
    <div className="providersPanel contractors">
      <div className="head">
        <div className="headLeft">
          <h2>{t('contractors_panel')}</h2>
        </div>
      </div>
      <div>
        <div className="row steps-row mb-3" id="pills-tab" role="tablist">
          <div className="col-6 tab" role="presentation">
            <a
              className={`steps btn ${toggleState === 1 ? "active-border" : "disable-border"
                }`}
              onClick={() => toggleTab(1)}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span>{t("contract")}</span>
            </a>
          </div>
          <div className="col-6 tab tab-right" role="presentation">
            <a
              className={`steps btn ${toggleState === 2 ? "active-border" : "disable-border"
                }`}
              onClick={() => toggleTab(2)}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span>{t("contractors")}</span>
            </a>
          </div>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className={`${toggleState === 1 ? "tab-pane fade show active " : "tab-pane fade"
              }`}
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="orders">
              <div
                className="head d-flex justify-content-space-between"
                style={{ position: "relative" }}
              >
                <div>
                  <span className="d-flex font-weight-bold">{t("options")}</span>
                  <label className={checked ? null : "contract-option-label"}>
                    {t("incoming")}
                  </label>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    color="primary"
                  />
                  <label className={checked ? "contract-option-label" : null}>
                    {t("records")}
                  </label>
                </div>
                <div className="d-flex">
                  <Link to={"create-contract"}>
                    <button className="me-2" onClick={() => setShow(true)}>
                      {t("create_contract")}
                      <i className="fa fa-plus" aria-hidden="true" style={{
                        transform: lCode === "ar" ? "scaleX(-1)" : "",
                        margin: "0 10px"
                      }}></i>
                    </button>
                  </Link>
                  <div className="d-flex">
                    {toggleState === 1 && (
                      <i
                        class="fa fa-filter filterPopup"
                        aria-hidden="true"
                        onClick={() => setShowIncome(true)} style={{
                          transform: lCode === "ar" ? "scaleX(-1)" : "",
                          margin: "0 10px"
                        }}
                      ></i>
                    )}
                  </div>
                </div>

                {showIncome && (
                  <div
                    className="col-md-3 filter_parent"
                    style={{
                      right: "50px",
                      top: "0px",
                      zIndex: "101",
                    }}
                  >
                    <p className="filter_header">
                      {t('filters')}
                      <CloseIcon
                        style={{
                          marginTop: "10px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowIncome(false)}
                      />
                    </p>
                    <div className="filter_body d-flex justify-content-between py-3">
                      <div className="col-md-12">
                        <p>{t("attributes")}</p>
                        <Box
                          style={{ marginTop: "20px !important" }}
                          className="mt-2"
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <FormControl fullWidth>
                            <InputLabel>{t("order_by")}</InputLabel>
                            <Select size="small"
                              value={orderby}
                              label={t("order_by")}
                              onChange={(e) => setOrderby(e.target.value)}
                            >
                              {allFilters &&
                                allFilters?.map((item) => {
                                  return (
                                    <MenuItem value={item}>{item}</MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          className="mt-2"
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              {t("sort")}
                            </InputLabel>
                            <Select size="small"
                              value={sortBy}
                              label={t("sort")}
                              onChange={(e) => setSortBy(e.target.value)}
                            >
                              <MenuItem
                                value={10}
                                sx={{
                                  fontSize: "16px",
                                }}
                              >
                                ASC
                              </MenuItem>
                              <MenuItem
                                value={20}
                                sx={{
                                  fontSize: "16px",
                                }}
                              >
                                DES
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="d-flex flex-wrap">
                  {fetchAllContracts.data?.content.length > 0 ? (
                    fetchAllContracts.data?.content.map((item) => {
                      const endDate = new Date(item?.endDate);
                      const startDate = new Date(item?.starDate);
                      return (
                        <div
                          className="contract-card mr-3 mb-3"
                          style={{ width: "260px" }}
                        >
                          <Grid container>
                            <Grid item xs={5}>
                              <spna className="contract-card__heading">
                                {" "}
                                {/* Contract */}
                              </spna>
                              {/* <spna
                                style={{
                                  color: "#146F62",
                                  fontSize: "12px",
                                  fontWeight: 'bold',
                                  display: "flex",
                                  alignItem: 'center'
                                }}>

                                Contract <span style={{ fontWeight: "semi-bold" }}>{"#" + item?.status?.id}</span>
                              </spna> */}
                            </Grid>
                            <Grid item xs={7}>
                              {item?.status?.id == 22 ? (
                                <span className="viewcard-container__status">
                                  {item?.status?.name.replaceAll("_", " ")}
                                  <FiberManualRecordIcon
                                    sx={{ fontSize: 40 }}
                                  />
                                </span>
                              ) : null}

                              {item?.status?.id == 21 ? (
                                <span className="viewcard-container__status employe-status-documents">
                                  {item?.status?.name.replaceAll("_", " ")}
                                  <FiberManualRecordIcon />
                                </span>
                              ) : null}
                              {item?.status?.id == 23 ? (
                                <span className="viewcard-container__status employe-status-Vacation">
                                  {item?.status?.name.replaceAll("_", " ")}{" "}
                                  <FiberManualRecordIcon
                                    style={{ color: "red" }}
                                  />
                                </span>
                              ) : null}
                            </Grid>
                            <span className="contract-card__name">
                              <span className="contract-card__contractor">
                                {t("contractors")}
                              </span>
                              {item?.contractor?.user?.name}
                            </span>
                            <span className="contract-card__contractor">
                              {t("contractors")} {t("company")} <br></br>
                              <b
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 900,
                                  marginBottom: "3px",
                                  display: "inline-block",
                                }}
                              >
                                {" "}
                                {item?.contractor?.acronym} |{" "}
                              </b>
                              {item?.contractor?.contractorCompanyName}
                            </span>
                            <div className="contract-card__detail">
                              <Grid container>
                                <Grid item xs={6}>
                                  <span className="contract-card__title">
                                    {t("start_contract")}
                                  </span>
                                </Grid>
                                <Grid item xs={6}>
                                  <span className="contract-card__desc">
                                    {startDate.toLocaleDateString("en-US")}
                                  </span>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={6}>
                                  <span className="contract-card__title">
                                    {t("end_contract")}
                                  </span>
                                </Grid>
                                <Grid item xs={6}>
                                  <span className="contract-card__desc">
                                    {endDate.toLocaleDateString("en-US")}
                                  </span>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={6}>
                                  <span className="contract-card__title">
                                    {t("no_employees")}
                                  </span>
                                </Grid>
                                <Grid item xs={6}>
                                  <span className="contract-card__desc">
                                    {item?.noEmployees}
                                  </span>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={6}>
                                  <span className="contract-card__title">
                                    {t("no_vehicles")}
                                  </span>
                                </Grid>
                                <Grid item xs={6}>
                                  <span className="contract-card__desc">
                                    {item?.noVehicles}
                                  </span>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                          <span className="viewcard-container__link mt-2 d-flex">
                            <Link
                              to={"contractor-details"}
                              state={{ state: item }}

                            >
                              {t("view_details")} <KeyboardArrowRightIcon style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                // margin: "0 10px"
                              }} />
                            </Link>
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <NotFoundDataWarning text={"NO CONTRACTS"} />
                  )}
                </div>
              </div>
            </div>
            {fetchAllContracts && fetchAllContracts.data?.content.length > 0 ? (
              <div className="d-flex justify-content-center">
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[8, 16, 24]}
                  count={fetchAllContracts?.data?.totalElements}
                  page={page}
                  onPageChange={handleChangePage}
                  labelRowsPerPage={t("contracts_per_page")}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            ) : null}
          </div>
          <div
            className={`${toggleState === 2 ? "tab-pane fade show active " : "tab-pane fade"
              }`}
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="providers">
              <div className="row top-buttons">
                <div className="col-3 upload-document">
                  <Link to={"upload-contractor"}>
                    <span className="btn-hover mr-2">{t("upload_document")}</span>
                    <img src={file} alt="file" />
                  </Link>
                </div>
                <div className="col-3 add-provider">
                  <Link to="add-contractor">
                    <span className="btn-hover mr-2">{t("add_new_contractor")}</span>
                    <img src={plus} alt="file" />

                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <ContractorTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact-form */}
    </div>
  );
};
export default ContractorPanel;
