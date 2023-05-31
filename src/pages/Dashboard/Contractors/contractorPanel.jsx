import { useState, useRef } from "react";
import apiInstance from "../../../Apis/Axios";
import { Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import file from "../../../assets/images/file.svg";
import plus from "../../../assets/images/ic-add.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import eyeIcon from '../../../assets/eye-solid.svg'
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { GetAllEmployeeContractors, GetAllEmployeeContracts, } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { getAllEmployeeContracts } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { useSelector } from "react-redux";
import ContractorTable from "./ContractorTable";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import DisplayView from "../../../components/DisplayView";
import DeleteContractModal from "./modal/DeleteContractModal";
import DeleteContractorModal from "./modal/DeleteContractorModal";

/*
Author : Arman Ali
Module: contractor
github: https://github.com/Arman-Arzoo
some one else CodeRefactor 
*/

const ContractorPanel = () => {
  // hook 
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const navigate = useNavigate()

  // useState
  const [orderby, setOrderby] = useState("id");
  const [sort, setSort] = useState();
  const [checked, setChecked] = useState(true);
  const [show, setShow] = useState(false);
  const [view, setView] = useState("grid")
  const [toggleState, setToggleState] = useState(1);
  const [showIncome, setShowIncome] = useState(false);
  const [allFilters, setAllFilters] = useState("id");
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectContractForDelete, setSelectContractForDelete] = useState([])
  const [deleteContractShow, setDeleteContractShow] = useState(false)
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [selectContractorForDelete, setSelectContractorForDelete] = useState([])
  const [deleteContractorShow, setDeleteContractorShow] = useState(false)
  const [isAllCheckedContractor, setIsAllCheckedContractor] = useState(false)
  const [dropDownProps, setDropDownProps] = useState({
    panel: "contractor",
    firstItem: "ALLOW EVENT",
    secondItem: "VIEW DETAILS",
  });
  // useSelector
  const fetchAllContracts = useSelector(getAllEmployeeContracts);
  let dispatch = useDispatch();
  // function
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // toggele function
  const toggleTab = (index) => {
    setToggleState(index);
  };

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
  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = fetchAllContracts?.data?.content?.map(item => {
        return item?.id
      })
      setSelectContractForDelete(selectAllIds)


    } else {
      setSelectContractForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectContractForDelete([...selectContractForDelete, e.target.id]);
    } else {
      setSelectContractForDelete(selectContractForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  // This components are used to calculate the distance between the top of the window and the top of the table panel
  const elementRef = useRef(null);
  const elementRefer = useRef(null);
  useEffect(() => {
    if (elementRefer.current && toggleState === 1) {
      const rect = elementRefer.current.getBoundingClientRect();
      const distanceTop = rect.top + 11;
      console.log(distanceTop);
      elementRefer.current.style.setProperty('--top-value', `${distanceTop}px`)
    }
    if (elementRef.current && toggleState === 2) {
      const rect = elementRef.current.getBoundingClientRect();
      const distanceTop = rect.top + 67;
      console.log(distanceTop);
      elementRef.current.style.setProperty('--top-value', `${distanceTop}px`)
    }
  }, [toggleState, view, checked, orderby, rowsPerPage, page, sortBy]);

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

  //This fragment makes uncheked all the checkboxes when toggleState change
  const resetAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
  useEffect(() => {
    resetAllCheckboxes();
    setSelectContractForDelete([]);
    setSelectContractorForDelete([]);
    setIsAllChecked(false);
    setIsAllCheckedContractor(false);
  }, [toggleState]);



  const options = {
    filterType: "checkbox",
  };

  return (
    <>
      <div className="providersPanel contractors">
        <div className="head">
          <div className="headLeft">
            <h2>{t('contractors_panel')}</h2>
          </div>
        </div>
        <div>
          <div className="row steps-row mb-3 mx-0" id="pills-tab" role="tablist">
            <div role="presentation"
              className={`col-6 text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : 'deactive_tap'}`}

            >
              <a
                className={`steps-global btn ${toggleState === 1 ? 'btn-bordered-global' : ''
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
            <div role="presentation"
              className={`col-6 text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : 'deactive_tap'}`}
            >
              <a
                className={`steps-global btn ${toggleState === 2 ? 'btn-bordered-global' : ''
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
              <div className="orders animated-div">
                <div
                  className="head d-flex justify-content-space-between"
                  style={{ position: "relative", margin: '0rem' }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="d-flex font-weight-bold">{t("options")}</span>
                      <DisplayView view={view} setView={setView} />
                    </div>


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

                  <div className="container-top-right-btns">
                    <button className="add-btn-1"
                      onClick={() => navigate("/dashboard/employee/contractors/create-contract")}
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      {t('add')}
                    </button>
                    <button className="delete-btn-1"

                      disabled={selectContractForDelete?.length === 0}
                      onClick={() => {
                        setDeleteContractShow(true)
                      }}

                    >
                      <i class="fa fa-trash-o" aria-hidden="true"></i>
                      {t('delete')}
                    </button>
                    <div className="d-flex">
                      {toggleState === 1 && (
                        <i
                          class="fa fa-filter filterPopup"
                          aria-hidden="true"
                          onClick={() => setShowIncome(true)} style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            // margin: "0 10px"
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
                <div className={`row ${fetchAllContracts.data?.content?.length > 0 ? "contract_view_port" : ""}`} ref={elementRefer}>
                  <div className="d-flex flex-wrap " >
                    {
                      fetchAllContracts.data?.content?.length > 0 ? (
                        <>
                          {
                            view === "grid" &&
                            fetchAllContracts.data?.content?.map((item) => {
                              const endDate = new Date(item?.endDate);
                              const startDate = new Date(item?.starDate);
                              return (
                                <div
                                  className="contract-card mr-3 mb-3 mt-2"
                                  style={{ width: "260px" }}
                                >
                                  <Grid container>
                                    <Grid item xs={5}>
                                      <span className="contract-card__heading"
                                        style={{ display: 'flex', gap: "0.3rem", alignItems: "center", paddingTop: "0.2rem" }}
                                      >
                                        <input type="checkbox" className="checkbox"
                                          checked={selectContractForDelete?.includes(item?.id)}
                                          id={item?.id}
                                          onChange={handleCheckboxChange}
                                        />
                                        {t("Folio")}
                                        <span style={{ fontSize: "10px" }}>#{item?.folio || "-"}</span>
                                      </span>

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
                              )
                            })
                          }
                          {
                            view === "list" &&
                            <div className="panelTables px-1 animated-div" 
                              style={{ width: "100%"}}
                            >
                              {
                                fetchAllContracts.data?.content?.length > 0 ?
                                  <table style={{ width: "100%" }}>
                                    <thead>
                                      <th className='first_head'>
                                        <input type="checkbox" className="checkbox"
                                          checked={isAllChecked}
                                          onChange={handelDeleteAll}
                                        />
                                      </th>
                                      <th className='first_head'>{t("Folio")}</th>
                                      <th>{t("contractor")}</th>
                                      <th>{t("contractor_company")}</th>
                                      <th>{t("status")}</th>
                                      <th>{t("no_employee")}</th>
                                      <th>{t("no_vehicle")}</th>
                                      <th>{t("start_date")}</th>
                                      <th>{t("end_date")}</th>
                                      <th className='last'>{t("details")}</th>

                                    </thead>
                                    <tbody>

                                      {
                                        fetchAllContracts.data?.content?.map((item, index) => {
                                          const endDate = new Date(item?.endDate);
                                          const startDate = new Date(item?.starDate);
                                          return (
                                            <tr key={item?.id}>
                                              <td className='first'>
                                                <input type="checkbox" className="checkbox"
                                                  checked={selectContractForDelete?.includes(item?.id)}
                                                  id={item?.id}
                                                  onChange={handleCheckboxChange}
                                                />
                                              </td>
                                              < td className='first' >
                                                {item?.folio || "-"}
                                              </td>
                                              <td>{item?.contractor?.user?.name || "-"}</td>
                                              <td >{item?.contractor?.contractorCompanyName || "-"}</td>
                                              <td>  {item?.status?.id == 22 ? (
                                                <span className="viewcard-container__status">
                                                  {item?.status?.name.replaceAll("_", " ")}

                                                </span>
                                              ) : null}

                                                {item?.status?.id == 21 ? (
                                                  <span className="viewcard-container__status employe-status-documents">
                                                    {item?.status?.name.replaceAll("_", " ")}
                                                  </span>
                                                ) : null}
                                                {item?.status?.id == 23 ? (
                                                  <span className="viewcard-container__status employe-status-Vacation">
                                                    {item?.status?.name.replaceAll("_", " ")}{" "}
                                                  </span>
                                                ) : null}</td>
                                              <td > {item?.noEmployees} </td>
                                              <td>{item?.noVehicles}</td>
                                              <td> {startDate.toLocaleDateString("en-US")}</td>
                                              <td> {endDate.toLocaleDateString("en-US")}</td>
                                              <td className='tableIcon'>
                                                <Link to={"contractor-details"}
                                                  state={{ state: item }}>
                                                  <button className='btn-option'>
                                                    <img
                                                      src={eyeIcon} alt="eye"
                                                    />
                                                  </button>
                                                </Link>
                                               
                                              </td>
                                             
                                            </tr>
                                          )
                                        })
                                      }
                                    </tbody>
                                  </table> :
                                  <NotFoundDataWarning text={t("no_documents")} />
                              }

                            </div>
                          }
                        </>
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
              <div className="providers animated-div">
                <div className="container-top-right-btns">

                  <button className="import-file-btn-1"
                    onClick={() => navigate("/dashboard/employee/contractors/upload-contractor")}
                  >
                    {(t('import'))}
                    <br />
                    {(t('file'))}
                  </button>

                  <button className="add-btn-1"
                    onClick={() => navigate("/dashboard/employee/contractors/add-contractor")}
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    {t('add')}
                  </button>
                  <button className="delete-btn-1"
                    disabled={selectContractorForDelete?.length === 0}
                    onClick={() => {
                      setDeleteContractorShow(true)
                    }}

                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    {t('delete')}
                  </button>

                </div>
                <div className="row">
                  <div className="col-12" ref={elementRef}>
                    <ContractorTable
                      isAllCheckedContractor={isAllCheckedContractor}
                      setIsAllCheckedContractor={setIsAllCheckedContractor}
                      selectContractorForDelete={selectContractorForDelete}
                      deleteContractorShow={deleteContractorShow}
                      setSelectContractorForDelete={setSelectContractorForDelete}


                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* contact-form */}
      </div>
      {/* modal for delete contract */}
      <DeleteContractModal
        show={deleteContractShow}
        onHide={() => setDeleteContractShow(false)}
        data={selectContractForDelete}

      />

      {/* modal for delete contract */}
      <DeleteContractorModal
        show={deleteContractorShow}
        onHide={() => setDeleteContractorShow(false)}
        data={selectContractorForDelete}

      />
    </>
  );
};
export default ContractorPanel;
