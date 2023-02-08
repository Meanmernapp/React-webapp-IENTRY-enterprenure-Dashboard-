import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SaveIcon from "@mui/icons-material/Save";
import GetAppIcon from "@mui/icons-material/GetApp";
import NorthIcon from "@mui/icons-material/North";
import { Modal } from "react-bootstrap";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import file from "../../../assets/images/file.png";
import emptyList from "../../../assets/images/warning.svg";
import ic_cancel from "../../../assets/images/ic-cancel.svg";
import excel_image from "../../../assets/images/excel-image.png";
import pdf_image from "../../../assets/images/pdf-image.png";
import word_image from "../../../assets/images/word-image.png";
import dashIcon from "../../../assets/images/dash.svg";
import CarDemoImg from "../../../assets/images/carDemoImg.png";
import cloudsvg from "../../../assets/images/cloud.svg";
import {
  DownloadCompanyExternalDocuments,
  UploadFileToServer,
  UnlinkDevicefromUser,
  GetVehicleDetailById,
  UploadExternalDocumentComment,
  CreateDocumentTitle,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import { vehicleDetailById } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import i18next, { t } from "i18next";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
const UploadVehicleDocuments = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [documentValue, setDocumentValue] = useState({});
  let { id } = useParams();
  const getVehicleDetailById = useSelector(vehicleDetailById);
  const [allUser, setAllUser] = useState(false);

  //uploading file state
  const [updateCompanyImg, setUpdateCompanyImg] = useState();
  const [previewSize, setPreviewSize] = useState();
  const [companyImg, setCompanyImg] = useState();
  const [pdfFile, setPdfFile] = useState();

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const onImageChange = async (e) => {
    const originalFile = e.target.files[0];
    const checkExtension = originalFile["type"].split("/")[0] === "image";

    //if input is image
    if (checkExtension) {
      setPdfFile("");
      setUpdateCompanyImg(originalFile);

      let formatedValue = formatBytes(originalFile?.size);
      setPreviewSize(formatedValue);

      const [file] = e.target.files;
      setCompanyImg(URL.createObjectURL(file));
    }

    //if input is file
    if (!checkExtension) {
      setCompanyImg("");
      const originalFile = e.target.files[0];
      setPdfFile(originalFile);

      let formatedValue = formatBytes(originalFile?.size);
      setPreviewSize(formatedValue);
    }
  };
  const [val, setValue] = useState();
  const uploadImageOrFileToServer = () => {
    if (pdfFile && pdfFile?.size <= 5000000) {
      const data = {
        vehicle: {
          id: val?.vehicleId,
        },
        document: val?.document,
        companyDocumentExternalVehicle: {
          id: val?.companyDocumentExternalVehicle?.id,
        },
      };
      /*author mazhar iqbal
        craete relation for document external vehicle
      */
      dispatch(CreateDocumentTitle(data)).then((res) => {
        let formData = new FormData();
        formData.append("id", res?.payload?.data?.data?.id);
        formData.append("option", "document_external_vehicle");
        formData.append("file", pdfFile);
        /*author mazhar iqbal
          upload document external vehicle to the server
        */
        dispatch(UploadFileToServer(formData)).then(() => {
          setAllUser(false);
        });
      });
    }
    else {
      toast.info("file size must be less than 5MB")
    }
  };

  const unlinkDevice = () => {
    dispatch(UnlinkDevicefromUser);
  };
  function AllUser(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ background: "rgba(0,0,0,.4)" }}
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <Modal.Header>
            <Modal.Title class="mt-2 text-center add_workshiftmodal_title d-flex justify-content-center flex-grow-1">
              <h4 className="text-center">
                <b>{t("upload_file")}</b>
              </h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row " style={{ width: "100%" }}>
              <div style={{ width: "100%", margin: "15px" }}>
                <div className="updata_img_m">
                  <label htmlFor="file-input" className="dottedborderbox">
                    <img
                      src={cloudsvg}
                      alt="submitupload"
                      className="submitupload"
                    />
                    <input
                      type="file"
                      id="file-input"
                      accept="image/png,image/jpg,image/jpeg,application/pdf,application/xlsx,application/docx,application/pptx"
                      onChange={onImageChange}
                    />
                    <p>
                      {t("drag_drop")} <br /> {t("your_image")} <br /> {t("size_of_image")}
                    </p>
                  </label>
                </div>
                <div className="col" style={{ width: "100%" }}>
                  {companyImg ? (
                    <img
                      src={companyImg}
                      className="previewImg"
                      alt="imgs"
                      style={{ width: "100%", height: "200px" }}
                    />
                  ) : null}
                  {companyImg ? null : pdfFile ? (
                    <div className="previewFile">
                      <Grid container spacing={3}>
                        <Grid item xs={2}>
                          <img
                            src={
                              pdfFile?.name?.split(".").pop() === "pdf"
                                ? file
                                : pdfFile?.name?.split(".").pop() === "xlsx"
                                  ? file
                                  : pdfFile?.name?.split(".").pop() === "docx" ||
                                    pdfFile?.name?.split(".").pop() === "pptx"
                                    ? file
                                    : file
                            }
                            className="mr-3"
                            style={{ width: "30px" }}
                            alt="imgs"
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <p>{pdfFile?.name}</p>
                          <p>
                            <span>{t("size")}: </span>
                            {previewSize}
                          </p>
                        </Grid>
                        <Grid item xs={1}>
                          <img
                            src={ic_cancel}
                            className="cancelIcon"
                            alt="ic_cancel"
                            onClick={() => setPdfFile("")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Modal.Body>
          <div>
            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                {t("cancel")}
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={uploadImageOrFileToServer}
              >
                <b>{t("apply_changes")}</b>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  useEffect(() => {
    /*author mazhar iqbal
      get vehicle detail with documents
    */
    dispatch(GetVehicleDetailById(id));
  }, []);
  const [userRemoveModal, setuserRemoveModal] = useState(false);
  function UserRemove(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">{t("unlink-device")}</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "14px", fontWeight: 400 }}
            >
              {t("unlink_confirmation_msg")}
            </span>

            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                {t("cancel")}
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={() => {
                  unlinkDevice();
                  setuserRemoveModal(false);
                }}
              >
                {t("change")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/contractor/search-vehicle">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <h2>{t("upload_vehicle_document")}</h2>
        </div>
      </div>
      <div className="employe-contract-detail" style={{ marginTop: "140px" }}>
        <Grid container xs={4}>
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
        <div className="employe-contract-detail__docs" style={{ width: "63%" }}>
          <div className="add-new-employe__document" style={{ height: "492px", overflowY: "scroll" }}>
            <UserRemove
              show={userRemoveModal}
              onHide={() => setuserRemoveModal(false)}
            />
            <div className="add-new-employe">
              <button
                className="edit-profile-save-btn"
                onClick={() =>
                  navigate(
                    `/dashboard/contractor/update-vehicle/${getVehicleDetailById?.vehicle?.id}`
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
                                // value={docName}
                                onChange={(e) => {
                                  setDocumentValue((prev) => {
                                    return { ...prev, [item]: e.target.value };
                                  });
                                }}
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
                              <span
                                className="uploaod-document-name"
                                onClick={() => {
                                  const body = {
                                    value: documentValue[item],
                                    id: item?.id,
                                  };

                                  const data = {
                                    vehicle: {
                                      id: getVehicleDetailById?.vehicle?.id,
                                    },
                                    document: documentValue[item],
                                    companyDocumentExternalVehicle: {
                                      id: item?.companyDocumentExternalVehicle
                                        ?.id,
                                    },
                                  };
                                  if (item?.id != null) {
                                    /*author mazhar iqbal
                                      upload vehicle document value 
                                    */
                                    dispatch(
                                      UploadExternalDocumentComment(body)
                                    );
                                  } else {
                                    /*author mazhar iqbal
                                      upload vehicle company document value 
                                    */
                                    dispatch(CreateDocumentTitle(data));
                                  }
                                }}
                              >
                                <NorthIcon />
                              </span>
                            </>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        {item?.companyDocumentExternalVehicle?.path ? (
                          <>
                            <button
                              className="add-new-employe__attach"
                              onClick={() => {
                                setValue(item);
                                setAllUser(true);
                              }}
                            >
                              {t("attach_file")}
                              <AttachFileIcon />
                            </button>
                          </>
                        ) : null}
                      </Grid>
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
                                /*author mazhar iqbal
                                    download vehicle external document  
                                  */
                                dispatch(
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
                          <div style={{ textAlign: "center" }}>
                            <img src={dashIcon} />
                          </div>
                        )}
                        {item?.id == null && (
                          <p className="">Pending to Upload it</p>
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
        <AllUser show={allUser} onHide={() => setAllUser(false)} />
      </div>
    </>
  );
};

export default UploadVehicleDocuments;
