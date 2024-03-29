import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import employee from "../../../assets/images/employee-4.png";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import apiInstance from "../../../Apis/Axios";
import emptyList from "../../../assets/images/warning.svg";
import { Box, Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import CarDemoImg from "../../../assets/images/carDemoImg.png"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import Step4AccessRights from "../Company/Employees/EnrollmentSteps/Step4AccessRights";
import DeleteModal from "../../Modals/DeleteModal";


let docID;
const ContractorDetails = () => {
  const navigate = useLocation();
  let { state } = navigate;
  let contractId = state?.state?.id;
  const [contractDetail, setContractDetail] = useState();
  const [companyContractor, setCompanyContractor] = useState();
  const [contractVehicle, setcontractVehicle] = useState();
  const [contractWork, setContractWork] = useState();

  const [workShiftsList, setWorkShiftsList] = useState([]);
  const [customizedList, setCustomizedList] = useState([]);

  const [isAllCheckedEmployee, setIsAllCheckedEmployee] = useState(false)
  const [selectEmployeeForDelete, setSelectEmployeeForDelete] = useState([])

  const [isAllCheckedVehicle, setIsAllCheckedVehicle] = useState(false)
  const [selectVehicleForDelete, setSelectVehicleForDelete] = useState([])

  const [deleteShowEmployee, setDeleteShowEmployee] = useState(false)
  const [deleteShowVehicle, setDeleteShowVehicle] = useState(false)
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  // this function control select all id or unSelect all
  const handelDeleteAllEmployee = (e) => {
    setIsAllCheckedEmployee(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = companyContractor?.content?.map(item => {
        return item?.id
      })
      setSelectEmployeeForDelete(selectAllIds)
    } else {
      setSelectEmployeeForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChangeEmployee = (e) => {

    if (e.target.checked) {
      setSelectEmployeeForDelete([...selectEmployeeForDelete, e.target.id]);
    } else {
      setSelectEmployeeForDelete(selectEmployeeForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  // this function control select all id or unSelect all
  const handelDeleteAllVehicle = (e) => {
    setIsAllCheckedVehicle(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = contractVehicle?.content?.map(item => {
        return item?.id
      })
      setSelectVehicleForDelete(selectAllIds)
    } else {
      setSelectVehicleForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChangeVehicle = (e) => {

    if (e.target.checked) {
      setSelectVehicleForDelete([...selectVehicleForDelete, e.target.id]);
    } else {
      setSelectVehicleForDelete(selectVehicleForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  //Employee
  const [pagePaginationEmp, setPagePaginationEmp] = useState(0);
  const [rowsPerPageProviderEmp, setRowsPerProviderEmp] = useState(4);

  const handleChangePageProviderEmp = (event, newPage) => {
    setPagePaginationEmp(newPage);
  };

  const handleChangeRowsPerPageProviderEmp = (event) => {
    setRowsPerProviderEmp(parseInt(event.target.value));
    setPagePaginationEmp(0);
  };
  //end Employee


  //vehicel
  const [pagePaginationVeh, setPagePaginationVeh] = useState(0);
  const [rowsPerPageProviderVeh, setRowsPerProviderVeh] = useState(4);

  const handleChangePageProviderVeh = (event, newPage) => {
    setPagePaginationVeh(newPage);
  };

  const handleChangeRowsPerPageProviderVeh = (event) => {
    setRowsPerProviderVeh(parseInt(event.target.value));
    setPagePaginationVeh(0);
  };
  //end vehicle

  const [pagePagination, setPagePagination] = useState(0);
  const [rowsPerPageProvider, setRowsPerProvider] = useState(10);

  const handleChangePageProvider = (event, newPage) => {
    setPagePagination(newPage);
  };

  const handleChangeRowsPerPageProvider = (event) => {
    setRowsPerProvider(parseInt(event.target.value));
    setPagePagination(0);
  };

  const deleleteEmployee = () => {

  }
  const deleleteVehicle = () => {

  }

  const getContractDetail = async () => {
    await apiInstance
      .get(`contract-service/get-by-id/${contractId}`)
      .then(function (response) {
        if (response.status == 200) {
          docID = response?.data?.data?.id;
          setContractDetail(response?.data?.data);
          getCompanyByContractor();
          getVehicleByContractId();
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  const getCompanyByContractor = async () => {
    await apiInstance
      .post(
        `contractor-employee-service/contract/get-all-pageable-employees/by-contract-id/${contractId}`,
        {
          order: true,
          page: pagePaginationEmp,
          size: rowsPerPageProviderEmp,
          sortBy: "id",
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          console.log(
            "Company by Employe",
            response?.data?.data?.content.length
          );
          setCompanyContractor(response?.data?.data);
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  const getVehicleByContractId = async () => {
    await apiInstance
      .post(
        `contractor-vehicle-service/contract/get-all-pageable/by-contract-id/${contractId}`,
        {
          order: true,
          page: pagePaginationVeh,
          size: rowsPerPageProviderVeh,
          sortBy: "id",
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          console.log("All Vehicles", response?.data?.data?.content.length);
          setcontractVehicle(response?.data?.data);
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  const getContractWorkByContractId = async () => {
    await apiInstance
      .post(
        `work-shift-service/contract-work/get-all-pageable/by-contract-id/${contractId}`,
        {
          order: true,
          page: pagePagination,
          size: rowsPerPageProvider,
          sortBy: "id",
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          setContractWork(response?.data?.data);
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  useEffect(() => {
    /*author mazhar iqbal
      get contarct detail
    */
    getContractDetail();
  }, []);

  useEffect(() => {
    /*author mazhar iqbal
      get work shift of the contract
    */
    getContractWorkByContractId()
   
  }, [rowsPerPageProvider, pagePagination])
  console.log(contractWork?.content)
  useEffect(() => {
    /*author mazhar iqbal
       get all employee work on contract
     */
    getCompanyByContractor()
  }, [pagePaginationEmp, rowsPerPageProviderEmp])

  useEffect(() => {
    /*author mazhar iqbal
      get all vehicle work on contract
    */
    getVehicleByContractId()
  }, [pagePaginationVeh, rowsPerPageProviderVeh])

  const createdDate = new Date(contractDetail?.starDate);
  const endDate = new Date(contractDetail?.endDate);
  const time = new Date(contractDetail?.endDate);

  useEffect(() => {
    if (selectEmployeeForDelete?.length === 0) {
      setIsAllCheckedEmployee(false)
    } else if (selectEmployeeForDelete?.length > 0) {
      setIsAllCheckedEmployee(true)
    }
    if (selectVehicleForDelete?.length === 0) {
      setIsAllCheckedVehicle(false)
    } else if (selectVehicleForDelete?.length > 0) {
      setIsAllCheckedVehicle(true)
    }
  }, [selectEmployeeForDelete, selectVehicleForDelete])

 
  return (
    <>
      <div className="order-details">

        <div className="head">
          <div className="headLeft mt-3 addcontractor">
            <Link to="/dashboard/employee/contractors">
              <i className="fa fa-arrow-left" aria-hidden="true" style={{
                transform: lCode === "ar" ? "scaleX(-1)" : "",
                margin: "0 10px"
              }}></i>
            </Link>
            <h2>{t("contract_details")}</h2>
          </div>
          <div className="d-flex align-items-center gap-2">

            <Link
              to="/dashboard/employee/contractors/update-contract"
              state={{ state: docID }}
            >
              <button className="add-btn-1">
                <SaveIcon />
                {t("update")}
              </button>
            </Link>
            <button className="delete-btn-1"

            // disabled={selectEmployeeForDelete?.length === 0}
            // onClick={() => {
            //   setDeleteEmployeeShow(true)
            // }}

            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              {t('delete')}
            </button>
          </div>
        </div>
        <div>
          <div className="row content-row">
            <div className="col-12 details">
              <div className="status">
                {contractDetail?.status?.id == 22 ? (
                  <span className="viewcard-container__status">
                    {contractDetail?.status?.name.replaceAll("_", " ")}
                    <FiberManualRecordIcon sx={{ fontSize: 40 }} />
                  </span>
                ) : null}

                {contractDetail?.status?.id == 21 ? (
                  <span className="viewcard-container__status employe-status-documents">
                    {contractDetail?.status?.name.replaceAll("_", " ")}
                    <FiberManualRecordIcon />
                  </span>
                ) : null}
                {contractDetail?.status?.id == 23 ? (
                  <span className="viewcard-container__status employe-status-Vacation">
                    {contractDetail?.status?.name.replaceAll("_", " ")}{" "}
                    <FiberManualRecordIcon style={{ color: "red" }} />
                  </span>
                ) : null}
              </div>
              <div className="content">
                <div className="order">
                  <strong>{t("folio")?.toUpperCase()}
                    <span> # {contractDetail?.folio || "-"}</span>
                  </strong>
                  {/* <span>{contractDetail?.status?.id}</span>  */}
                  <div className="actual-details">
                    {contractDetail?.contractor?.user?.name?.toUpperCase()}
                  </div>
                  <div className="faded-headings">{t("contractors")?.toUpperCase()}</div>
                  <div className="actual-details">
                    {contractDetail?.contractor?.user?.email}
                  </div>
                  <div className="faded-headings">{t("email")?.toUpperCase()}</div>
                  <div className="actual-details">
                    {contractDetail?.contractor?.user?.phoneNumber}
                  </div>
                  <div className="faded-headings">{t("celular")?.toUpperCase()}</div>
                </div>
                <div className="delivery-details">
                  <div className="faded-headings">{t("start_contract")?.toUpperCase()}</div>
                  <div className="actual-details">
                    {createdDate.toLocaleDateString("en-US")?.toUpperCase()}
                  </div>
                  <div className="faded-headings">{t("corporate")?.toUpperCase()}</div>
                  <div className="actual-details">
                    {contractDetail?.contractor?.acronym}
                  </div>
                  <div className="faded-headings">{t("vehicles")?.toUpperCase()}</div>
                  <div className="actual-details">
                    {contractVehicle?.content?.length}
                  </div>
                </div>
                <div className="time-details" style={{ textAlign: "center" }}>
                  <div className="faded-headings">{t("end_contract")?.toUpperCase()}</div>
                  <div className="actual-details">
                    {endDate.toLocaleDateString("en-US")?.toUpperCase()}
                  </div>
                  <div className="faded-headings">{t("no_employees")?.toUpperCase()}</div>
                  <div className="actual-details">
                    {companyContractor?.content?.length}
                  </div>
                  {/* <div className="faded-headings">{t("time_of_arrival")}</div>
                <div className="actual-details">
                  {time.toLocaleTimeString("it-IT")}
                </div> */}

                </div>
                <div
                  className="time-details"
                  style={{
                    borderLeft: "2px solid #65ABA0",
                    height: "100%",
                    textAlign: "right",
                  }}
                >
                  <div className="faded-headings">
                    {t("description")?.toUpperCase()}
                  </div>
                  <div className="actual-details" >
                    {contractDetail?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-row contractor-cards">
            <div className="row cards-section">
              <div className="cards-first-row">
                <div className="cards-heading">{t("employees")}</div>
                {/* <div className="cards contract-detail-employe-sec"> */}
                <div>
                  {companyContractor && companyContractor?.content.length != 0 ? (
                    <>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">

                        <FormControlLabel className="grid-checkall" control={<Checkbox
                          label="Label"
                          checked={isAllCheckedEmployee}
                          onChange={handelDeleteAllEmployee}
                          size="small" />} label={t("de_/_select_all")} />
                        <button className="delete-btn-1"

                          disabled={selectEmployeeForDelete?.length === 0}
                          onClick={() => {
                            setDeleteShowEmployee(true)
                          }}

                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                          {t('delete')}
                        </button>
                      </Stack>
                      <Grid container spacing={2}>

                        {

                          companyContractor?.content.map((item) => {
                            return (
                              <Grid item xs={12} sm={3} md={3} lg={3} >
                                <div className="card">
                                  <div className="card-body">
                                    <Checkbox
                                      sx={{
                                        position: "absolute",
                                        top: '-6px',
                                        left: "0px"
                                      }}
                                      className="grid-checkall checkbox"
                                      checked={selectEmployeeForDelete?.includes(item?.id)}
                                      id={item?.id}
                                      onChange={handleCheckboxChangeEmployee}
                                      size="small"
                                    />
                                    <div className="d-flex align-items-center justify-content-center">
                                      {item?.selfie ? (
                                        <img
                                          src={`data:image/png;base64,${item?.selfie}`}
                                          alt="image"
                                          className="card-img-top"

                                        />
                                      ) : (
                                        <img
                                          className="card-img-top"
                                          src={employee}
                                          alt="employee"
                                          style={{ height: "150px", objectFit: "fill" }}
                                        />
                                      )}
                                    </div>

                                    <div className="card-content">
                                      <div className="card-data-row">
                                        <div className="headings">{t("name")}</div>
                                        <div className="details">{item?.name}</div>
                                      </div>
                                      <div className="card-data-row">
                                        <div className="headings">{t("job_title")}</div>
                                        <div className="details">email</div>
                                      </div>
                                      <div className="card-data-row">
                                        <div className="headings">{t("gender")}</div>
                                        <div className="details">
                                          {item?.gender?.name}
                                        </div>
                                      </div>
                                      <div className="card-data-row">
                                        <div className="headings">{t("email")}</div>
                                        <div className="details">{item?.name}</div>
                                      </div>
                                      <div className="card-data-row">
                                        <div className="headings">Number</div>
                                        <div className="details">{item?.phoneNumber}</div>
                                      </div>
                                      <span className="viewcard-container__link mt-2 d-flex">
                                        <Link to={"/dashboard/employee/contractors/employeeDetail"} state={{ state: item }}>
                                          {t("employee_details")} <KeyboardArrowRightIcon style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                                            // margin: "0 10px"
                                          }} />
                                        </Link>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Grid>

                            )
                          })
                        }
                      </Grid>
                    </>
                  ) : (

                    <NotFoundDataWarning text={t("no_employees")} />
                  )}
                </div>
                {companyContractor && companyContractor?.content.length != 0 &&
                  <div className="d-flex justify-content-center">
                    <TablePagination
                      component="div"
                      rowsPerPageOptions={[4, 8, 16, 24]}
                      count={companyContractor?.totalElements}
                      page={pagePaginationEmp}
                      onPageChange={handleChangePageProviderEmp}
                      labelRowsPerPage="Employee per page"
                      rowsPerPage={rowsPerPageProviderEmp}
                      onRowsPerPageChange={handleChangeRowsPerPageProviderEmp}
                    />
                  </div>}
              </div>
              <div className="cards-second-row">
                <div className="cards-heading">{t("vehicles")}</div>
                <div className="">
                  {contractVehicle && contractVehicle?.content?.length != 0 ? (
                    <>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">

                        <FormControlLabel className="grid-checkall" control={<Checkbox
                          label="Label"
                          checked={isAllCheckedVehicle}
                          onChange={handelDeleteAllVehicle}
                          size="small" />} label={t("de_/_select_all")} />
                        <button className="delete-btn-1"

                          disabled={selectVehicleForDelete?.length === 0}
                          onClick={() => {
                            setDeleteShowVehicle(true)
                          }}

                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                          {t('delete')}
                        </button>
                      </Stack>
                      <Grid container spacing={2}></Grid>
                      {
                        <Grid container spacing={2} paddingTop="1rem">

                          {
                            contractVehicle.content?.map((item) => {
                              return (
                                <Grid item xs={12} sm={3} md={3} lg={3} >
                                  <div className="card">

                                    <div className="card-body">
                                      <Checkbox
                                        sx={{
                                          position: "absolute",
                                          top: '-6px',
                                          left: "0px"
                                        }}
                                        className="grid-checkall checkbox"
                                        checked={selectVehicleForDelete?.includes(item?.id)}
                                        id={item?.id}
                                        onChange={handleCheckboxChangeVehicle}
                                        size="small"
                                      />
                                      <div className="d-flex align-items-center justify-content-center">
                                        {item?.image ? (
                                          <img
                                            src={`data:image/png;base64,${item?.image}`}
                                            alt="image"
                                            className="card-img-top"

                                          />
                                        ) : (
                                          <img
                                            className="card-img-top"
                                            src={CarDemoImg}
                                            alt="employee"
                                          />
                                        )}
                                      </div>
                                      <div className="card-content">
                                        <div className="card-data-row">
                                          <div className="headings">{t("brand")}</div>
                                          <div className="details">{item?.brand ? item?.brand : "-"}</div>
                                        </div>
                                        <div className="card-data-row">
                                          <div className="headings">{t("sub_brand")}</div>
                                          <div className="details">{item?.subBrand ? item?.subBrand : "-"}</div>
                                        </div>
                                        <div className="card-data-row">
                                          <div className="headings">{t("model")}</div>
                                          <div className="details">
                                            {item?.model ? item?.model : "-"}
                                          </div>
                                        </div>
                                        <div className="card-data-row">
                                          <div className="headings">{t("color")}</div>
                                          <div className="details">
                                            {item?.color ? item?.color : "-"}
                                          </div>
                                        </div>
                                        <div className="card-data-row">
                                          <div className="headings">{t("plates")}</div>
                                          <div className="details">
                                            {item?.plate ? item?.plate : "-"}
                                          </div>
                                        </div>
                                        <span className="viewcard-container__link mt-2 d-flex">
                                          <Link
                                            to="/dashboard/employee/contractors/vehicleDetail"
                                            state={{ vehicle: item }}
                                          >
                                            {t("vehicle_details")} <KeyboardArrowRightIcon style={{
                                              transform: lCode === "ar" ? "scaleX(-1)" : "",

                                            }} />
                                          </Link>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                              );
                            })
                          }

                        </Grid>

                      }
                    </>)
                    : (
                      <NotFoundDataWarning text={t("no_vehicle")} />
                    )
                  }
                </div>
                {contractVehicle && contractVehicle?.content?.length != 0 &&
                  <div className="d-flex justify-content-center">
                    <TablePagination
                      component="div"
                      rowsPerPageOptions={[4, 8, 16, 24]}
                      count={contractVehicle?.totalElements}
                      page={pagePaginationVeh}
                      onPageChange={handleChangePageProviderVeh}
                      labelRowsPerPage="Vehicle per page"
                      rowsPerPage={rowsPerPageProviderVeh}
                      onRowsPerPageChange={handleChangeRowsPerPageProviderVeh}
                    />
                  </div>}
              </div>
              <div className="cards-second-row">
                <div className="cards-heading">{t("access_rights")?.toUpperCase()}</div>
                <Box sx={{ margin: "2rem 0rem" }}>
                  <Step4AccessRights
                    workShiftsList={workShiftsList}
                    setWorkShiftsList={setWorkShiftsList}
                    customizedList={customizedList}
                    setCustomizedList={setCustomizedList}
                  />
                </Box>
              </div>

              {/* {contractWork && contractWork?.content.length != 0 ? (
              <>
                <div className="">
                  <Grid container sx={{ mt: 1 }}>
                    <Grid
                      item
                      xs={3}
                      className="contractor-access-table-heading"
                      sx={{ textAlign: "left" }}
                    >
                      {t("name")}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      className="contractor-access-table-heading"
                    >
                      DAY
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      className="contractor-access-table-heading"
                    >
                      {t("from")}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      className="contractor-access-table-heading"
                    >
                      {t("to")}
                    </Grid>
                  </Grid>
                  {contractWork &&
                    contractWork?.content?.map((item) => {
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
                    rowsPerPageOptions={[10, 20, 30]}
                    count={contractWork?.totalElements}
                    page={pagePagination}
                    onPageChange={handleChangePageProvider}
                    labelRowsPerPage="Access per page"
                    rowsPerPage={rowsPerPageProvider}
                    onRowsPerPageChange={handleChangeRowsPerPageProvider}
                  />
                </div>
              </>
            ) : (
              <NotFoundDataWarning text={t("no_access")} />
            )} */}
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        show={deleteShowEmployee}
        onHide={() => setDeleteShowEmployee(false)}
        data={selectEmployeeForDelete}
        onClickFn={() => deleleteEmployee(selectEmployeeForDelete)}
        title_modal={t("contractor")}
        element_modal={t("employee")}
        isReset={setSelectEmployeeForDelete}
        isAllReset={setIsAllCheckedEmployee}
      />

      <DeleteModal
        show={deleteShowVehicle}
        onHide={() => setDeleteShowVehicle(false)}
        data={selectVehicleForDelete}
        onClickFn={() => deleleteVehicle(selectVehicleForDelete)}
        title_modal={t("contractor")}
        element_modal={t("vehicle")}
        isReset={setSelectVehicleForDelete}
        isAllReset={setIsAllCheckedVehicle}
      />
    </>
  );
};

export default ContractorDetails;
