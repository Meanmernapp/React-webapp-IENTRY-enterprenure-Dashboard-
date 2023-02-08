import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

let docID;
const ContractorDetail = ({ employeeDetailsFlag, approveDocumentFlag }) => {
  let dispatch = useDispatch();
  const navigate = useLocation();
  let { state } = navigate;
  let contractId = state?.state?.id;
  let path = state?.approveDoc ? true : false;
  const [approveDocument, setapproveDocument] = useState(path);
  const getAllVehicleByContractorId = useSelector(allVehicleByContractorId);
  const [fileIdPresent, setfileIdPresent] = useState(true);

  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  useEffect(() => {
    setapproveDocument(path);
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
      .get(`contractor-service/get-by-id/${contractId}`)
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
        `contractor-employee-service/get-all-pageable/company/by-contractor-id/${contractId}`,
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
      .get(`document-service/external/get-all/by-user-id/${docID}`)
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
    dispatch(GetAllVehicleByContractorId({ contractId, pagination }));
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
        <Link to="/dashboard/employee/contractors/update-contractor" state={{ state: state?.state?.id }}>
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
          <p style={{
            fontSize: '18px',
            letterSpacing: "5.4px",
            color: "#146F62",
            paddingLeft: '8px',
            fontWeight: "bold",
            paddingottom: '1rem'

          }}>DOCUMENTS</p>
          <div
            className="__header"
            style={{ paddingRight: approveDocument === false && "40px" }}
          >


            <Grid container sx={{ display: 'flex', justifyContent: "space-between" }}>
              <Grid item >
                <p style={{ width: approveDocument && "40%" }}>{t("filename")}</p>
              </Grid>
              <Grid item >
                <p>{t("file")}</p>
              </Grid>
              {/* {
                approveDocument &&
                <Grid item xs={3}>
                  {approveDocument && <p>{t("options")}</p>}
                </Grid>
              } */}

            </Grid>
          </div>
          {contractorDocument && contractorDocument?.length != 0 ? (
            contractorDocument.map((item) => {
              const date = new Date(item?.createdAt);
              return (
                <div className="__body">
                  <div className="__file">
                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Grid item >
                        <div className="__name w-100">
                          <p>{item?.companyDocumentExternal?.document}</p>
                          {fileIdPresent && (
                            <span>
                              {item?.document ? item?.document : "-"}
                            </span>
                          )}
                        </div>
                      </Grid>
                      <Grid item >
                        {item?.path && item?.id ? (
                          <div className="__file_icon">
                            <img src={file} />
                            <div style={{ paddingLeft: "10px" }}>
                              <p>{item?.path}</p>
                              <span>
                                {item?.createdAt ? (
                                  date.toLocaleString("en-GB")
                                ) : (
                                  <p className="noFile">{t("no_file")}</p>
                                )}
                              </span>
                            </div>
                            <DownloadIcon
                              className="download_icon"
                              onClick={() => {
                                const data = {
                                  option: "document_external",
                                  id: item?.id,
                                };
                                dispatch(ContractorDownloadDocuments(data));
                              }}
                            />
                          </div>
                        ) : (
                          <p className="noFile">{t("no_file")}</p>
                        )}
                      </Grid>
                      {/* {
                        approveDocument &&
                        <Grid item xs={3}>
                          {item?.status?.id === 19 && (
                            <>
                              <i
                                style={{ color: "green", float: "right" }}
                                class="fa fa-check"
                                aria-hidden="true"
                              ></i>
                            </>
                          )}
                          {item?.status?.id === 20 && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "end",
                              }}
                            >
                              <i
                                style={{ color: "red", float: "right" }}
                                class="fa fa-times"
                                aria-hidden="true"
                              ></i>
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  width: "75px",
                                }}
                              >
                                {item?.comment?.length > 20
                                  ? `${item?.comment?.substring(0, 20)}...`
                                  : item?.comment}
                              </p>
                            </div>
                          )}
                          {item?.status?.id === 18 && (
                            <div style={{ textAlign: "end" }}>
                              <img src={dashIcon} />
                            </div>
                          )}
                          {item?.id == null && (
                            <p className="">{t("upload_document")}</p>
                          )}
                          {item?.path && item?.status?.id === 18 && (
                            <div style={{ float: "right" }}>
                              {approveDocument && (
                                <ApproveContractorDocument data={item?.id} />
                              )}
                            </div>
                          )}
                        </Grid>
                      } */}
                    </Grid>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mt-3">
              <NotFoundDataWarning text={t("no_file")} />
            </div>
            // <img
            //   src={emptyList}
            //   className="d-flex"
            //   style={{ width: "100px", height: "100px", margin: "auto" }}
            // />
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
                              <div
                                className="__header"
                                style={{
                                  paddingRight: approveDocument === false && "40px",
                                }}
                              >
                                <Grid container>
                                  <Grid item xs={4}>
                                    <p>DOCUMENT NAME</p>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <p>value</p>
                                  </Grid>
                                  <Grid item xs={3}>
                                    <p className="d-flex justify-content-end">File</p>
                                  </Grid>
                                  <Grid item xs={3}>
                                    {true && (
                                      <p className="d-flex justify-content-end">
                                        Options
                                      </p>
                                    )}
                                  </Grid>
                                </Grid>
                              </div>
                              {item?.documents && item?.documents?.length != 0 ? (
                                item?.documents.map((itemDoc) => {
                                  const date = new Date(item?.createdAt);
                                  return (
                                    <div className="__body">
                                      <div className="__file">
                                        <Grid container>
                                          <Grid item xs={4}>
                                            <div className="__name w-100">
                                              <p>
                                                {
                                                  itemDoc?.companyDocumentExternal
                                                    ?.document
                                                }
                                              </p>
                                            </div>
                                          </Grid>
                                          <Grid item xs={2}>
                                            <div className="__name w-100">
                                              {fileIdPresent && (
                                                <span>
                                                  {itemDoc?.document
                                                    ? itemDoc?.document
                                                    : "-"}
                                                </span>
                                              )}
                                            </div>
                                          </Grid>
                                          <Grid item xs={3}>
                                            {itemDoc?.path && itemDoc?.id ? (
                                              <div
                                                className="__file_icon text-center w-100"
                                                style={{ float: "right" }}
                                              >
                                                <img src={file} />
                                                <div style={{ paddingLeft: "10px" }}>
                                                  <p>{item?.path}</p>
                                                  <span>
                                                    {itemDoc?.createdAt &&
                                                      date.toLocaleString("en-GB")}
                                                  </span>
                                                </div>
                                                <DownloadIcon
                                                  className="download_icon"
                                                  onClick={() => {
                                                    const data = {
                                                      option: "document_external",
                                                      id: itemDoc?.id,
                                                    };
                                                    dispatch(
                                                      ContractorDownloadDocuments(
                                                        data
                                                      )
                                                    );
                                                  }}
                                                />
                                              </div>
                                            ) : (
                                              <p
                                                className="noFile"
                                                style={{ textAlign: "end" }}
                                              >
                                                {t("no_file")}
                                              </p>
                                            )}
                                          </Grid>
                                          <Grid item xs={3}>
                                            {itemDoc?.status?.id === 19 && (
                                              <>
                                                <i
                                                  style={{
                                                    color: "green",
                                                    float: "right",
                                                  }}
                                                  class="fa fa-check"
                                                  aria-hidden="true"
                                                ></i>
                                              </>
                                            )}
                                            {itemDoc?.status?.id === 20 && (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  alignItems: "end",
                                                }}
                                              >
                                                <i
                                                  style={{
                                                    color: "red",
                                                    float: "right",
                                                  }}
                                                  class="fa fa-times"
                                                  aria-hidden="true"
                                                ></i>
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "12px",
                                                    width: "75px",
                                                  }}
                                                >
                                                  {itemDoc?.comment?.length > 20
                                                    ? `${item?.comment?.substring(
                                                      0,
                                                      20
                                                    )}...`
                                                    : item?.comment}
                                                </p>
                                              </div>
                                            )}
                                            {itemDoc?.status?.id === 18 && (
                                              <div style={{ textAlign: "end" }}>
                                                <img src={dashIcon} />
                                              </div>
                                            )}
                                            {itemDoc?.id == null && (
                                              <p className="d-flex justify-content-end">
                                                {t("upload_document")}
                                              </p>
                                            )}
                                            {itemDoc?.path &&
                                              itemDoc?.status?.id === 18 && (
                                                <div style={{ float: "right" }}>
                                                  {approveDocument && (
                                                    <ApproveContractorDocument
                                                      data={itemDoc?.id}
                                                    />
                                                  )}
                                                </div>
                                              )}
                                          </Grid>
                                        </Grid>
                                      </div>
                                    </div>
                                  );
                                })
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
                              <div
                                className="__header"
                                style={{
                                  paddingRight: approveDocument === false && "40px",
                                }}
                              >
                                <Grid container>
                                  <Grid item xs={4}>
                                    <p>DOCUMENT NAME</p>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <p>value</p>
                                  </Grid>
                                  <Grid item xs={3}>
                                    <p className="d-flex justify-content-end">File</p>
                                  </Grid>
                                  <Grid item xs={3}>
                                    {true && (
                                      <p className="d-flex justify-content-end">
                                        Options
                                      </p>
                                    )}
                                  </Grid>
                                </Grid>
                              </div>
                              {item?.documents && item?.documents?.length != 0 ? (
                                item?.documents.map((itemDoc) => {
                                  const date = new Date(item?.createdAt);
                                  return (
                                    <div className="__body">
                                      <div className="__file">
                                        <Grid container>
                                          <Grid item xs={4}>
                                            <div className="__name w-100">
                                              <p>
                                                {
                                                  itemDoc
                                                    ?.companyDocumentExternalVehicle
                                                    ?.document
                                                }
                                              </p>
                                            </div>
                                          </Grid>
                                          <Grid item xs={2}>
                                            <div className="__name w-100">
                                              {fileIdPresent && (
                                                <span>
                                                  {itemDoc?.document
                                                    ? itemDoc?.document
                                                    : "-"}
                                                </span>
                                              )}
                                            </div>
                                          </Grid>
                                          <Grid item xs={3}>
                                            {itemDoc?.path && itemDoc?.id ? (
                                              <div
                                                className="__file_icon text-center w-100"
                                                style={{ float: "right" }}
                                              >
                                                <img src={file} />
                                                <div style={{ paddingLeft: "10px" }}>
                                                  <p>{item?.path}</p>
                                                  <span>
                                                    {itemDoc?.createdAt &&
                                                      date.toLocaleString("en-GB")}
                                                  </span>
                                                </div>
                                                <DownloadIcon
                                                  className="download_icon"
                                                  onClick={() => {
                                                    const data = {
                                                      option: "document_external",
                                                      id: itemDoc?.id,
                                                    };
                                                    /*author mazhar iqbal
                                                      downlaod contractor external documet
                                                    */
                                                    dispatch(
                                                      ContractorDownloadDocuments(
                                                        data
                                                      )
                                                    );
                                                  }}
                                                />
                                              </div>
                                            ) : (
                                              <p
                                                className="noFile"
                                                style={{ textAlign: "end" }}
                                              >
                                                {t("no_file")}
                                              </p>
                                            )}
                                          </Grid>
                                          <Grid item xs={3}>
                                            {itemDoc?.status?.id === 19 && (
                                              <>
                                                <i
                                                  style={{
                                                    color: "green",
                                                    float: "right",
                                                  }}
                                                  class="fa fa-check"
                                                  aria-hidden="true"
                                                ></i>
                                              </>
                                            )}
                                            {itemDoc?.status?.id === 20 && (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  alignItems: "end",
                                                }}
                                              >
                                                <i
                                                  style={{
                                                    color: "red",
                                                    float: "right",
                                                  }}
                                                  class="fa fa-times"
                                                  aria-hidden="true"
                                                ></i>
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "12px",
                                                    width: "75px",
                                                  }}
                                                >
                                                  {itemDoc?.comment?.length > 20
                                                    ? `${item?.comment?.substring(
                                                      0,
                                                      20
                                                    )}...`
                                                    : item?.comment}
                                                </p>
                                              </div>
                                            )}
                                            {itemDoc?.status?.id === 18 && (
                                              <div style={{ textAlign: "end" }}>
                                                <img src={dashIcon} />
                                              </div>
                                            )}
                                            {itemDoc?.id == null && (
                                              <p className="d-flex justify-content-end">
                                                {t("upload_document")}
                                              </p>
                                            )}
                                            {itemDoc?.path &&
                                              itemDoc?.status?.id === 18 && (
                                                <div style={{ float: "right" }}>
                                                  {approveDocument && (
                                                    <ApproveContractorDocument
                                                      data={itemDoc?.id}
                                                    />
                                                  )}
                                                </div>
                                              )}
                                          </Grid>
                                        </Grid>
                                      </div>
                                    </div>
                                  );
                                })
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
