import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../../assets/images/person.png";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import apiInstance from "../../../Apis/Axios";
import dashIcon from "../../../assets/images/dash.svg";

import emptyList from "../../../assets/images/warning.svg";
import { toast } from "react-toastify";
import {
  ContractorDownloadDocuments,
  GetAllVehicleByContractorId,
  GetVehicleWithDocumentById,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ApproveContractorDocument from "./SubComponents/ApproveContractorDocumentOptionMenu";
import { Grid } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import profileDemo from "../../../assets/images/userDemoImg.png";

import { vehicleWithDocumentById } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { useSelector } from "react-redux";
import CarDemoImg from "../../../assets/images/carDemoImg.png";
import ApproveEmployeContractorVehicleDocuments from "./SubComponents/ApproveEmployeContractorVehicleDocuments";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";


const EmployeContractorVehicleDetail = () => {

  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useLocation();
  let { state } = navigate;

  const getVehicleWithDocumentById = useSelector(vehicleWithDocumentById);
  console.log(getVehicleWithDocumentById)

  useEffect(() => {
    /*author mazhar iqbal
      get Employee contractor vehicle detail with documents
    */
    dispatch(GetVehicleWithDocumentById(state?.vehicle?.id));
  }, []);

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
          <h2> VEHICLE CONTRACT DETAIL</h2>
        </div>
      </div>
      <div
        className="row employee_provider_detail"
        style={{ marginTop: "130px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <div
              className="vehicle-contract-detail"
              style={{
                width: "100%",
                marginTop: "0px",
                paddingBottom: "108px",
              }}
            >
              {getVehicleWithDocumentById?.vehicle?.status?.id == 2 ? (
                <span className="viewcard-container__status employe-status-documents">
                  {getVehicleWithDocumentById?.vehicle?.status?.name.replaceAll(
                    "_",
                    " "
                  )}
                  <FiberManualRecordIcon sx={{ fontSize: 40 }} />
                </span>
              ) : null}

              {getVehicleWithDocumentById?.vehicle?.status?.id == 3 ? (
                <span
                  className="viewcard-container__status "
                  style={{ color: "#006594" }}
                >
                  {getVehicleWithDocumentById?.vehicle?.status?.name.replaceAll(
                    "_",
                    " "
                  )}
                  <FiberManualRecordIcon />
                </span>
              ) : null}
              {getVehicleWithDocumentById?.vehicle?.status?.id == 4 ? (
                <span
                  className="viewcard-container__status employe-status-Vacation"
                  style={{ color: "#0C4523" }}
                >
                  {getVehicleWithDocumentById?.vehicle?.status?.name.replaceAll(
                    "_",
                    " "
                  )}{" "}
                  <FiberManualRecordIcon />
                </span>
              ) : null}
              {getVehicleWithDocumentById?.vehicle?.status?.id == 5 ? (
                <span
                  className="viewcard-container__status"
                  style={{ color: "orange" }}
                >
                  {getVehicleWithDocumentById?.vehicle?.status?.name.replaceAll(
                    "_",
                    " "
                  )}{" "}
                  <FiberManualRecordIcon />
                </span>
              ) : null}
              {getVehicleWithDocumentById?.vehicle?.status?.id == 6 ? (
                <span
                  className="viewcard-container__status"
                  style={{ color: "red" }}
                >
                  {getVehicleWithDocumentById?.vehicle?.status?.name.replaceAll(
                    "_",
                    " "
                  )}{" "}
                  <FiberManualRecordIcon />
                </span>
              ) : null}
              {getVehicleWithDocumentById?.vehicle?.image ? (
                <img
                  src={`data:image/png;base64,${getVehicleWithDocumentById?.vehicle?.image}`}
                  alt="Vehicle Image"
                  className="vehicle-contract-detail__img"
                />
              ) : (
                <img
                  src={CarDemoImg}
                  alt="Vehicle Image"
                  className="vehicle-contract-detail__img"
                />
              )}
              <Grid container sx={{ mt: "80px" }}>
                <Grid item xs={6} sx={{ mt: "30px" }}>
                  <span className="vehicle-contract-detail__title">{t("brand")}</span>
                  <span className="vehicle-contract-detail__desc">
                    {getVehicleWithDocumentById?.vehicle?.brand}
                  </span>
                </Grid>
                <Grid item xs={6} sx={{ mt: "30px" }}>
                  <span className="vehicle-contract-detail__title">
                    {t("sub_brand")}
                  </span>
                  <span className="vehicle-contract-detail__desc">
                    {getVehicleWithDocumentById?.vehicle?.subBrand}
                  </span>
                </Grid>{" "}
                <Grid item xs={6} sx={{ mt: "30px" }}>
                  <span className="vehicle-contract-detail__title">{t("color")}</span>
                  <span className="vehicle-contract-detail__desc">
                    {getVehicleWithDocumentById?.vehicle?.color}
                  </span>
                </Grid>{" "}
                <Grid item xs={6} sx={{ mt: "30PX" }}>
                  <span className="vehicle-contract-detail__title">{t("model")}</span>
                  <span className="vehicle-contract-detail__desc">
                    {getVehicleWithDocumentById?.vehicle?.model}
                  </span>
                </Grid>{" "}
                <Grid item xs={6} sx={{ mt: "30px" }}>
                  <span className="vehicle-contract-detail__title">{t("plates")}</span>
                  <span className="vehicle-contract-detail__desc">
                    {getVehicleWithDocumentById?.vehicle?.plate}
                  </span>
                </Grid>{" "}
                <Grid item xs={6} sx={{ mt: "30px" }}>
                  <span className="vehicle-contract-detail__title">
                    {t("vehicle_type")}
                  </span>
                  <span className="vehicle-contract-detail__desc">{getVehicleWithDocumentById?.vehicle?.vehicleType || "-"}</span>
                </Grid>{" "}
                <Grid item xs={6} sx={{ mt: "30px" }}>
                  <span className="vehicle-contract-detail__title">{t("driver")}</span>
                  <span className="vehicle-contract-detail__desc">
                    {getVehicleWithDocumentById?.vehicle?.driver || "-"}
                  </span>
                </Grid>{" "}
                <Grid item xs={6} sx={{ mt: "30px" }}>
                  <span className="vehicle-contract-detail__title">{t("status")}</span>
                  <span className="vehicle-contract-detail__desc">
                    {getVehicleWithDocumentById?.vehicle?.status?.name}
                  </span>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div
              className="col-12 employee_files_details"
              style={{ height: "492px" }}
            >
              <div className="__header" style={{ paddingRight: "40px" }}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item >
                    <p style={{ width: "40%" }}>{t("filename")}</p>
                  </Grid>
                  <Grid item >
                    <p>{t("file")}</p>
                  </Grid>
                  {/* <Grid item xs={3}>
                    <p className="d-flex justify-content-center">{t("options")}</p>
                  </Grid> */}
                </Grid>
              </div>
              {getVehicleWithDocumentById &&
                getVehicleWithDocumentById?.length != 0 ? (
                getVehicleWithDocumentById?.documents?.map((item) => {
                  const date = new Date(item?.createdAt);
                  return (
                    <div className="__body">
                      <div className="__file">
                        <Grid container justifyContent={"space-between"}>
                          <Grid item >
                            <div className="__name w-100">
                              <p>
                                {item?.companyDocumentExternalVehicle?.document}
                              </p>

                              <span>
                                {item?.document ? item?.document : "--"}
                              </span>
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
                                      option: "document_external_vehicle",
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
                          {/* <Grid item xs={3}>
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
                                <ApproveEmployeContractorVehicleDocuments
                                  data={item?.id}
                                />
                              </div>
                            )}
                          </Grid> */}
                        </Grid>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                  <NotFoundDataWarning text={t("no_documents")} />
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EmployeContractorVehicleDetail;
