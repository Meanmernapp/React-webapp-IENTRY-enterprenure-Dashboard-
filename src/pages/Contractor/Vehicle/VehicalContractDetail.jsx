import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SaveIcon from "@mui/icons-material/Save";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import emptyList from "../../../assets/images/warning.svg";
import excel_image from "../../../assets/images/excel-image.png";
import pdf_image from "../../../assets/images/pdf-image.png";
import word_image from "../../../assets/images/word-image.png";
import dashIcon from "../../../assets/images/dash.svg";
import CarDemoImg from "../../../assets/images/carDemoImg.png";
import {
  DownloadCompanyExternalDocuments,
  GetVehicleDetailById,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import { vehicleDetailById } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import i18next, { t } from "i18next";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

const VehicalContractDetail = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  const getVehicleDetailById = useSelector(vehicleDetailById);


  useEffect(() => {
    /*author mazhar iqbal
      get vehicle detail with documents
    */
    dispatch(GetVehicleDetailById(id));
  }, []);

  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/Contractor/search-vehicle">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>  {t("vehicle_details")}</h2>
        </div>
      </div>
      <div className="employe-contract-detail" style={{ marginTop: "140px" }}>
        <Grid container xs={5}>
          <div
            className="vehicle-contract-detail"
            style={{ width: "100%", marginTop: "0px", margin: "unset" }}
          >
            {getVehicleDetailById?.vehicle?.status?.id == 2 ? (
              <span className="viewcard-container__status employe-status-documents">
                {getVehicleDetailById?.vehicle?.status?.name.replaceAll(
                  "_",
                  " "
                )}
                <FiberManualRecordIcon sx={{ fontSize: 40 }} />
              </span>
            ) : null}

            {getVehicleDetailById?.vehicle?.status?.id == 3 ? (
              <span
                className="viewcard-container__status "
                style={{ color: "#006594" }}
              >
                {getVehicleDetailById?.vehicle?.status?.name.replaceAll(
                  "_",
                  " "
                )}
                <FiberManualRecordIcon />
              </span>
            ) : null}
            {getVehicleDetailById?.vehicle?.status?.id == 4 ? (
              <span
                className="viewcard-container__status employe-status-Vacation"
                style={{ color: "#0C4523" }}
              >
                {getVehicleDetailById?.vehicle?.status?.name.replaceAll(
                  "_",
                  " "
                )}{" "}
                <FiberManualRecordIcon />
              </span>
            ) : null}
            {getVehicleDetailById?.vehicle?.status?.id == 5 ? (
              <span
                className="viewcard-container__status"
                style={{ color: "orange" }}
              >
                {getVehicleDetailById?.vehicle?.status?.name.replaceAll(
                  "_",
                  " "
                )}{" "}
                <FiberManualRecordIcon />
              </span>
            ) : null}
            {getVehicleDetailById?.vehicle?.status?.id == 6 ? (
              <span
                className="viewcard-container__status"
                style={{ color: "red" }}
              >
                {getVehicleDetailById?.vehicle?.status?.name.replaceAll(
                  "_",
                  " "
                )}{" "}
                <FiberManualRecordIcon />
              </span>
            ) : null}
            {getVehicleDetailById?.vehicle?.image ? (
              <img
                src={`data:image/png;base64,${getVehicleDetailById?.vehicle?.image}`}
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
            <Grid container sx={{ mt: "70px" }}>
              <Grid item xs={6} sx={{ mt: "30px" }}>
                <span className="vehicle-contract-detail__title">{t("brand")}</span>
                <span className="vehicle-contract-detail__desc">
                  {getVehicleDetailById?.vehicle?.brand}
                </span>
              </Grid>
              <Grid item xs={6} sx={{ mt: "30px" }}>
                <span className="vehicle-contract-detail__title">
                  {t("sub_brand")}
                </span>
                <span className="vehicle-contract-detail__desc">
                  {getVehicleDetailById?.vehicle?.subBrand}
                </span>
              </Grid>{" "}
              <Grid item xs={6} sx={{ mt: "30px" }}>
                <span className="vehicle-contract-detail__title">{t("color")}</span>
                <span className="vehicle-contract-detail__desc">
                  {getVehicleDetailById?.vehicle?.color}
                </span>
              </Grid>{" "}
              <Grid item xs={6} sx={{ mt: "30PX" }}>
                <span className="vehicle-contract-detail__title">{t("modal")}</span>
                <span className="vehicle-contract-detail__desc">
                  {getVehicleDetailById?.vehicle?.model}
                </span>
              </Grid>{" "}
              <Grid item xs={6} sx={{ mt: "30px" }}>
                <span className="vehicle-contract-detail__title">{t("plates")}</span>
                <span className="vehicle-contract-detail__desc">
                  {getVehicleDetailById?.vehicle?.plate}
                </span>
              </Grid>{" "}
              <Grid item xs={6} sx={{ mt: "30px" }}>
                <span className="vehicle-contract-detail__title">
                  {t("vehicle_type")}
                </span>
                <span className="vehicle-contract-detail__desc">SEDAN</span>
              </Grid>{" "}
              <Grid item xs={6} sx={{ mt: "30px" }}>
                <span className="vehicle-contract-detail__title">{t("driver")}</span>
                <span className="vehicle-contract-detail__desc">
                  Luis Enrique Cornejo Arreola
                </span>
              </Grid>{" "}
              <Grid item xs={6} sx={{ mt: "30px" }}>
                <span className="vehicle-contract-detail__title">{t("status")}</span>
                <span className="vehicle-contract-detail__desc">ACTIVE</span>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <div className="employe-contract-detail__docs" style={{ width: "55%" }}>
          <div className="add-new-employe__document" style={{ height: "492px", overflowY: "scroll" }}>
            <div className="add-new-employe">
              <button
                className="edit-profile-save-btn"
                onClick={() =>
                  navigate(
                    `/dashboard/update-vehicle/${getVehicleDetailById?.vehicle?.id}`
                  )
                }
              >
                {t("update_information")}
                <span>
                  <SaveIcon />
                </span>
              </button>
            </div>
            <span className="add-new-employe__document__heading">
              {t("documents")}
            </span>
            <Grid container sx={{ my: "10px" }}>
              <Grid item xs={8}>
                <span className="add-new-employe__title">{t("file_name")}</span>
              </Grid>
              <Grid item xs={2}>
                <span
                  className="add-new-employe__type"
                  style={{ textAlign: "center" }}
                >
                  {t("file")}
                </span>
              </Grid>
              <Grid item xs={2}>
                <span className="add-new-employe__type">{t("approve")}</span>
              </Grid>
            </Grid>

            {getVehicleDetailById?.documents &&
              getVehicleDetailById?.documents?.length > 0 ? (
              getVehicleDetailById.documents?.map((item) => {
                return (
                  <div className="add-new-employe__document--detail">
                    <Grid container spacing={3}>
                      <Grid item xs={5}>
                        <div className="name" style={{ position: "relative" }}>
                          {item?.companyDocumentExternalVehicle?.path ? (
                            <>
                              <span className="add-new-employe__filelabel">
                                <b>
                                  {
                                    item?.companyDocumentExternalVehicle
                                      ?.document
                                  }
                                </b>
                              </span>
                              <span
                                onClick={() => {
                                  /*author mazhar iqbal
                                    download company vehicle external document  
                                  */
                                  dispatch(
                                    DownloadCompanyExternalDocuments({
                                      id: item?.companyDocumentExternalVehicle
                                        ?.id,
                                      option:
                                        "company_document_external_vehicle",
                                    })
                                  );
                                }}
                                className="add-new-employe__filelabel"
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "400",
                                  letterSpacing: "1px",
                                  marginTop: "-4px",
                                  textDecoration: "underline",
                                  pointer: "cursor",
                                }}
                              >
                                {t("click_to_download_file")}
                              </span>
                            </>
                          ) : (
                            <>
                              <TextField size="small"
                                fullWidth


                                label={item?.companyDocumentExternalVehicle?.document}
                                value={item?.document}
                                name={item?.userId}
                                disabled
                                InputLabelProps={{
                                  style: {
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 8px 0px 8px",
                                    letterSpacing: "1px",
                                  },
                                }} // font size of input label
                                inputProps={{
                                  sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "12px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                      color: "#707070",
                                      fontSize: "8px",
                                    },
                                  },
                                }}
                                sx={{
                                  textAlign: i18next.dir() == "rtl" ? "right" : "left",
                                  "& 	.MuiOutlinedInput-notchedOutline": {
                                    textAlign: i18next.dir() == "rtl" ? "right" : "left",
                                  },
                                  "& 	.MuiInputLabel-root": {
                                    fontSize: 12,
                                    left: i18next.dir() == "rtl" ? "inherit" : "0",
                                    right: i18next.dir() == "rtl" ? "1.75rem" : "0",
                                    transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
                                  }
                                }}
                              />
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={2}>
                        {item?.path ? (
                          <button className="add-new-employe__filename d-flex">
                            {/* <img src={file} style={{width:'16px',height:'16px'}}/> */}
                            <img
                              src={
                                item?.companyDocumentExternalVehicle?.path
                                  ?.split(".")
                                  .pop() === "pdf"
                                  ? pdf_image
                                  : item?.companyDocumentExternalVehicle?.path
                                    ?.split(".")
                                    .pop() === "xlsx"
                                    ? excel_image
                                    : item?.companyDocumentExternalVehicle?.path
                                      ?.split(".")
                                      .pop() === "docx" ||
                                      item?.companyDocumentExternalVehicle?.path
                                        ?.split(".")
                                        .pop() === "pptx"
                                      ? word_image
                                      : pdf_image
                              }
                              style={{ width: "16px", height: "16px" }}
                              alt="imgs"
                            />
                            <span
                              style={{
                                display: "inline-block",
                                overflow: "hidden",
                              }}
                            >
                              {item?.path}
                            </span>
                            <GetAppIcon
                              className="mt-0"
                              onClick={() => {
                                dispatch(
                                  /*author mazhar iqbal
                                    download vehicle external document  
                                  */
                                  DownloadCompanyExternalDocuments({
                                    id: item?.id,
                                    option: "document_external_vehicle",
                                  })
                                );
                              }}
                            />
                          </button>
                        ) : (
                          <p
                            className="noFile"
                            style={{
                              textDecoration: "underline",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {t("no_file")}
                          </p>
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        {item?.status?.id === 19 && (
                          <>
                            <i
                              style={{ color: "green" }}
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
                              style={{ color: "red" }}
                              class="fa fa-times"
                              aria-hidden="true"
                            ></i>
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {item?.comment?.length > 20
                                ? `${item?.comment?.substring(0, 20)}...`
                                : item?.comment}
                            </p>
                          </div>
                        )}
                        {item?.status?.id === 18 && (
                          <>
                            <img src={dashIcon} />
                          </>
                        )}
                        {item?.id == null && (
                          <p className="">{t("pending_to_upload")}</p>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                );
              })
            ) : (

              <NotFoundDataWarning text={t("no_documents")} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicalContractDetail;
