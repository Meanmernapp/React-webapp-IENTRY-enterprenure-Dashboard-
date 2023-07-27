import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import file from "../../../assets/images/file.png";
import dashIcon from "../../../assets/images/dash.svg";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import apiInstance from "../../../Apis/Axios";
import emptyList from "../../../assets/images/warning.svg";
import { toast } from "react-toastify";
import {
  ContractorDownloadDocuments,
  GetAllVehicleByContractorId,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ApproveContractorDocument from "./SubComponents/ApproveContractorDocumentOptionMenu";
import { Grid } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import profileDemo from "../../../assets/images/userDemoImg.png";
import { allVehicleByContractorId } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import CarDemoImg from "../../../assets/images/minicar.png";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import DocumentTable from "../../Modals/DocumentTable";

let docID;
const ContractorDetail = ({ employeeDetailsFlag, approveDocumentFlag }) => {
  let dispatch = useDispatch();
  const navigate = useLocation();
  // let params = navigate;
  const params = useParams()
  // let contractId = state?.state?.id;
  // let path = state?.approveDoc ? true : false;
  const [approveDocument, setapproveDocument] = useState();
  const getAllVehicleByContractorId = useSelector(allVehicleByContractorId);
  const [fileIdPresent, setfileIdPresent] = useState(true);

  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  useEffect(() => {
    // setapproveDocument(path);
  }, []);

  const [contractDetail, setContractDetail] = useState();
  const [companyContractor, setCompanyContractor] = useState();
  const [contractorDocument, setContractorDocument] = useState();

  const [searchEmp, setSearchEmp] = useState("");
  const [searchVeh, setSearchVeh] = useState("");

  ////////////////
  //pagination
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [pageVeh, setPageVeh] = useState(0);
  const [rowsPerPageVeh, setRowsPerPageVeh] = useState(4);

  const handleChangePageVeh = (event, newPage) => {
    setPageVeh(newPage);
  };
  const handleChangeRowsPerPageVeh = (event) => {
    setRowsPerPageVeh(parseInt(event.target.value));
    setPageVeh(0);
  };

  //end pagination
  ///////////////

  //Emp pagination
  //  const [orderBy, setOrderBy] = useState();
  //  const [sortBy, setSortBy] = useState();
  const [pageEmp, setPageEmp] = useState(0);
  const [rowsPerPageEmp, setRowsPerPageEmp] = useState(4);

  const handleChangePageEmp = (event, newPage) => {
    setPageEmp(newPage);
  };
  const handleChangeRowsPerPageEmp = (event) => {
    setRowsPerPageEmp(parseInt(event.target.value));
    setPageEmp(0);
  };

  //end Emp pagination

  const getContractorDetail = async () => {
    await apiInstance
      .get(`contractor-service/get-by-id/${params?.id}`)
      .then(function (response) {
        if (response.status == 200) {
          setContractDetail(response?.data?.data);
          docID = response?.data?.data?.user?.id;
          getContractorDocument();
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  const getCompanyByContractor = async () => {
    const pagination = {
      order: sortBy === "asc" ? true : false,
      page: pageVeh,
      size: rowsPerPageVeh,
      sortBy: orderBy ? orderBy : "id",
    };
    await apiInstance
      .post(
        `contractor-employee-service/get-all-pageable/company/by-contractor-id/${params?.id}`,
        pagination
      )
      .then(function (response) {
        if (response.status == 200) {
          setCompanyContractor(response?.data?.data);
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  const getContractorDocument = async () => {
    await apiInstance
      .get(`document-service/contractor/get-all/by-user-id/${docID}`)
      .then(function (response) {
        setContractorDocument(response?.data?.data);
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };
  const pagination = {
    order: sortBy === "asc" ? true : false,
    page: pageVeh,
    size: rowsPerPageVeh,
    sortBy: orderBy ? orderBy : "id",
  };
  useEffect(() => {
    /*author mazhar iqbal
      get contarctor detail
    */
    getContractorDetail();
  }, []);

  useEffect(() => {
    /*author mazhar iqbal
      get contarctor vehicle
    */
    dispatch(GetAllVehicleByContractorId({ contractId:params?.id, pagination }));
  }, [pageVeh, rowsPerPageVeh]);

  useEffect(() => {
    /*author mazhar iqbal
        get contarctor employee
      */
    getCompanyByContractor();
  }, [pageEmp, rowsPerPageEmp]);
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
          <h2> CONTRACTOR DETAILS </h2>
        </div>
      </div>
      <div
        className="row employee_provider_detail"
        style={{ marginTop: "135px" }}
      >
        <Link to={`/dashboard/employee/contractors/update-contractor/${params?.id}`} >
          <button className="__update_btn" >
            {t("update_data")}
            <i class="fa fa-floppy-o" aria-hidden="true"></i>
          </button>
        </Link>
        <div className="col-md-4 __userData">
          {contractDetail?.user?.selfie ? (
            <img
              src={`data:image/png;base64,${contractDetail?.user?.selfie}`}
              className="__userImage"
              alt="image"
            />
          ) : (
            <img src={profileDemo} className="__userImage" />
          )}

          <div className="__body">
            <p>{t("name")}</p>
            <span>
              {contractDetail?.user?.name ? contractDetail?.user?.name : "-"}
            </span>
            <p className="ishead">{t("email")}</p>
            <span>
              {" "}
              {contractDetail?.user?.email ? contractDetail?.user?.email : "-"}
            </span>
            <p className="ishead">{t("phone_number")}</p>
            <span>
              {contractDetail?.user?.phoneNumber
                ? contractDetail?.user?.phoneNumber
                : "-"}
            </span>
            <p className="ishead">Password</p>
            <span>**************</span>
            <p className="ishead">{t("gender")}</p>
            <span>
              {contractDetail?.user?.gender?.name
                ? contractDetail?.user?.gender?.name
                : "-"}
            </span>
          </div>
        </div>
        <div
          className="col-md-7 employee_files_details"
          style={{ height: "492px" }}
        >
          
          {contractorDocument && contractorDocument?.length != 0 ? (
          
            <DocumentTable dataTable={contractorDocument} approve={false} optionDownload="document_external" />
          ) 
          : (
            <div className="mt-3">
              <NotFoundDataWarning text={t("no_file")} />
            </div>
            
          )}
        </div>
        <div className="row">
          <div className="col-12 px-4 mt-5">
            <span className="emp-heading">{t("employees")}</span>
            {
              companyContractor?.content?.length > 0 ?

                <>
                  <div className="contractor-detail-page-sec">
                    <input
                      type="text"

                      className="contractor-detail-page-search"
                      value={searchEmp}
                      onChange={(e) => {
                        setSearchEmp(e.target.value);
                      }}
                    />
                    <SearchIcon className="contractor-detail-page-search__icon" />
                  </div>
                  <Accordion defaultActiveKey="0">
                    {companyContractor?.content
                      ?.filter((user) => {
                        if (searchEmp === "") {
                          return user;
                        } else if (
                          user?.user?.name
                            ?.toLowerCase()
                            .includes(searchEmp?.toLowerCase())
                        ) {
                          return user;
                        }
                      })
                      .map((item, index) => (
                        <Accordion.Item eventKey={index} key={index} className="mt-2">
                          <Accordion.Header className="accordionHeader">
                            <Grid container>
                              <Grid item xs={6} className="d-flex align-items-center">
                                {contractDetail?.user?.selfie ? (
                                  <Avatar
                                    alt="User img"
                                    src={`data:image/png;base64,${contractDetail?.user?.selfie}`}
                                    className="me-2"
                                  />
                                ) : (
                                  <Avatar
                                    alt="User Name"
                                    src={profileDemo}
                                    className="me-2"
                                  />
                                )}
                                {item?.user?.name}
                              </Grid>
                              <Grid item xs={3} className="d-flex align-items-center">
                                <div className="status-text-blue">
                                  {item?.user?.status?.id == 1 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "#808080" }}
                                    >
                                      {item?.user?.status?.name.replaceAll("_", " ")}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                  {item?.user?.status?.id == 2 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "yellow" }}
                                    >
                                      {item?.user?.status?.name.replaceAll("_", " ")}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                  {item?.user?.status?.id == 3 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "blue" }}
                                    >
                                      {item?.user?.status?.name.replaceAll("_", " ")}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                  {item?.user?.status?.id == 4 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "green" }}
                                    >
                                      {item?.user?.status?.name.replaceAll("_", " ")}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}{" "}
                                  {item?.user?.status?.id == 5 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "orange" }}
                                    >
                                      {item?.user?.status?.name.replaceAll("_", " ")}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}{" "}
                                  {item?.user?.status?.id == 6 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "red" }}
                                    >
                                      {item?.user?.status?.name.replaceAll("_", " ")}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                </div>
                              </Grid>
                            </Grid>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div
                              className="employee_files_details w-100"
                              style={{ boxShadow: "none" }}
                            >
                              
                              {item?.documents && item?.documents?.length != 0 ? (
                                <DocumentTable 
                                dataTable={item?.documents} 
                                docValue="valueType"
                                approve={  item?.user?.status?.id == 3 ? true : false }
                                optionDownload="document_external"
                                
                                />
                              ) : (
                                <img
                                  src={emptyList}
                                  className="d-flex"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    margin: "auto",
                                  }}
                                />
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                  </Accordion>
                </> :
                <div className="mt-3">
                  <NotFoundDataWarning text={t("no_employees")} />
                </div>

            }

          </div>
        </div>
      </div>
      {
        companyContractor?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[4, 8, 12]}
            count={companyContractor?.totalElements}
            page={pageEmp}
            onPageChange={handleChangePageEmp}
            labelRowsPerPage="Employees per page"
            rowsPerPage={rowsPerPageEmp}
            onRowsPerPageChange={handleChangeRowsPerPageEmp}
          />
        </div>
      }

      <div className="row">
        <div className="col-12 px-4 mt-5">
          <span className="emp-heading">{t("vehicles")}</span>
          {
            getAllVehicleByContractorId?.content?.length > 0 ?
              <>
                <div className="contractor-detail-page-sec">
                  <input
                    type="text"

                    className="contractor-detail-page-search"
                    value={searchVeh}
                    onChange={(e) => {
                      setSearchVeh(e.target.value);
                    }}
                  />
                  <SearchIcon className="contractor-detail-page-search__icon" />
                </div>
                <Accordion defaultActiveKey="0">
                  {getAllVehicleByContractorId?.content
                    ?.filter((user) => {
                      if (searchVeh === "") {
                        return user;
                      } else if (
                        user?.vehicle?.plate
                          ?.toLowerCase()
                          .includes(searchVeh?.toLowerCase())
                      ) {
                        return user;
                      }
                    })
                    .map((item, index) => {
                      return (
                        <Accordion.Item eventKey={index} key={index} className="mt-2">
                          <Accordion.Header className="accordionHeader">
                            <Grid container>
                              <Grid item xs={6} className="d-flex align-items-center">
                                {item?.vehicle?.image ? (
                                  <Avatar
                                    alt="User img"
                                    src={`data:image/png;base64,${item?.vehicle?.image}`}
                                    className="me-2"
                                  />
                                ) : (
                                  <Avatar
                                    alt="User Name"
                                    src={CarDemoImg}
                                    className="me-2"
                                  />
                                )}
                                {item?.vehicle?.brand}
                              </Grid>
                              <Grid item xs={3} className="d-flex align-items-center">
                                <div className="status-text-blue">
                                  {item?.vehicle?.status?.id == 1 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "#808080" }}
                                    >
                                      {item?.vehicle?.status?.name.replaceAll(
                                        "_",
                                        " "
                                      )}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                  {item?.vehicle?.status?.id == 2 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "yellow" }}
                                    >
                                      {item?.vehicle?.status?.name.replaceAll(
                                        "_",
                                        " "
                                      )}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                  {item?.vehicle?.status?.id == 3 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "blue" }}
                                    >
                                      {item?.vehicle?.status?.name.replaceAll(
                                        "_",
                                        " "
                                      )}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                  {item?.vehicle?.status?.id == 4 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "green" }}
                                    >
                                      {item?.vehicle?.status?.name.replaceAll(
                                        "_",
                                        " "
                                      )}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}{" "}
                                  {item?.vehicle?.status?.id == 5 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "orange" }}
                                    >
                                      {item?.vehicle?.status?.name.replaceAll(
                                        "_",
                                        " "
                                      )}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}{" "}
                                  {item?.vehicle?.status?.id == 6 ? (
                                    <span
                                      className="viewcard-container__status employe-status-documents"
                                      style={{ color: "red" }}
                                    >
                                      {item?.vehicle?.status?.name.replaceAll(
                                        "_",
                                        " "
                                      )}{" "}
                                      <FiberManualRecordIcon />
                                    </span>
                                  ) : null}
                                </div>
                              </Grid>
                            </Grid>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div
                              className="employee_files_details w-100"
                              style={{ boxShadow: "none" }}
                            >
                    
                              {item?.documents && item?.documents?.length != 0 ? (
                
                                <DocumentTable 
                                dataTable={item?.documents} 
                                docValue="valueType"
                                approve={  item?.vehicle?.status?.id == 3 ? true : false }
                                optionDownload="document_external"/>
                              ) : (
                                <img
                                  src={emptyList}
                                  className="d-flex"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    margin: "auto",
                                  }}
                                />
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                </Accordion>
              </> :
              <div className="mt-3">
                <NotFoundDataWarning text={t("no_vehicles")} />
              </div>
          }

        </div>
        {
          getAllVehicleByContractorId?.content?.length > 0 &&
          <div className="d-flex justify-content-center">
            <TablePagination
              component="div"
              rowsPerPageOptions={[4, 8, 12]}
              count={getAllVehicleByContractorId?.totalElements}
              page={pageVeh}
              onPageChange={handleChangePageVeh}
              labelRowsPerPage="Vehicles per page"
              rowsPerPage={rowsPerPageVeh}
              onRowsPerPageChange={handleChangeRowsPerPageVeh}
            />
          </div>
        }

      </div>
    </>
  );
};

export default ContractorDetail;
