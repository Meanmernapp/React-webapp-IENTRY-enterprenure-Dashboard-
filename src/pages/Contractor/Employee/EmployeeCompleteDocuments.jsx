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
import UserDemoImg from "../../../assets/images/userDemoImg.png";
import file from "../../../assets/images/file.png";
import emptyList from "../../../assets/images/warning.svg";
import ic_cancel from "../../../assets/images/ic-cancel.svg";
import excel_image from "../../../assets/images/excel-image.png";
import pdf_image from "../../../assets/images/pdf-image.png";
import word_image from "../../../assets/images/word-image.png";
import dashIcon from "../../../assets/images/dash.svg";
import cloudsvg from "../../../assets/images/cloud.svg";
import {
  DownloadCompanyExternalDocuments,
  GetEmployeDetailById,
  UploadFileToServer,
  UnlinkDevicefromUser,
  SetCommentaToExternalDoc,
  SetTitleToExternalDoc,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import {
  employeDetailById,
  companyExternalDocuments,
} from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UploadUserDocument } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import i18next, { t } from "i18next";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
const EmployeeCompleteDocuments = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [documentValue, setDocumentValue] = useState({});
  let { id } = useParams();
  const getEmployeDetailById = useSelector(employeDetailById);

  // console.log("user image",getUserProfileImage)
  const [allUser, setAllUser] = useState(false);
  const [docName, setDocName] = useState(
    getEmployeDetailById.documents?.companyDocumentExternal?.document
  );

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
    // console.log(e.target.files[0])
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
      let companyDocumentExternal = {
        user: {
          id: getEmployeDetailById?.user?.id,
        },
        document: getEmployeDetailById?.documents?.document,
        companyDocumentExternal: {
          id: val,
        },
      }; /*author mazhar iqbal
          create document relation
        */
      dispatch(UploadUserDocument(companyDocumentExternal)).then((res) => {
        let formData = new FormData();
        formData.append("id", res?.payload?.data?.data.id);
        formData.append("option", "document_external");
        formData.append("file", pdfFile);
        /*author mazhar iqbal
            upload document external to server
          */
        dispatch(UploadFileToServer(formData)).then(() => {
          setAllUser(false);
          dispatch(GetEmployeDetailById(id));
        });
      });
    }
  };

  const unlinkDevice = () => {
    /*author mazhar iqbal
      unlink device using userID
    */
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
      get employee detail and documents 
    */
    dispatch(GetEmployeDetailById(id));
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
          <span className="main-modal-heading">{t("unlink_device")}</span>
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
          <Link to="/dashboard/search-employe">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>{t("upload_employee_documents")}</h2>
        </div>
      </div>
      <div className="employe-contract-detail">
        <div className="employe-contract-detail__employe">
          {getEmployeDetailById?.user?.selfie ? (
            <img
              src={`data:image/png;base64,${getEmployeDetailById?.user?.selfie}`}
              className="ecd__img"
              alt="user pic"
            />
          ) : (
            <img src={UserDemoImg} className="ecd__img" alt="user pic" />
          )}
          {getEmployeDetailById?.user?.status?.id == 2 ? (
            <span
              className="viewcard-container__status"
              style={{ color: "#FEDE00" }}
            >
              {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}
              <FiberManualRecordIcon sx={{ fontSize: 40 }} />
            </span>
          ) : null}

          {getEmployeDetailById?.user?.status?.id == 3 ? (
            <span
              className="viewcard-container__status "
              style={{ color: "#006594" }}
            >
              {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}
              <FiberManualRecordIcon />
            </span>
          ) : null}
          {getEmployeDetailById?.user?.status?.id == 4 ? (
            <span className="viewcard-container__status employe-status-Vacation">
              {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}{" "}
              <FiberManualRecordIcon />
            </span>
          ) : null}
          {getEmployeDetailById?.user?.status?.id == 5 ? (
            <span
              className="viewcard-container__status"
              style={{ color: "orange" }}
            >
              {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}{" "}
              <FiberManualRecordIcon />
            </span>
          ) : null}
          {getEmployeDetailById?.user?.status?.id == 6 ? (
            <span
              className="viewcard-container__status"
              style={{ color: "red" }}
            >
              {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}{" "}
              <FiberManualRecordIcon style={{ color: "red" }} />
            </span>
          ) : null}
          <div className="ecd" style={{ marginTop: "70px" }}>
            <span className="ecd__title">{t("name")}</span>
            <span className="ecd__desc">
              {getEmployeDetailById?.user?.name}
            </span>
          </div>
          <div className="ecd">
            <span className="ecd__title">{t("email")}</span>
            <span className="ecd__desc">
              {getEmployeDetailById?.user?.email}
            </span>
          </div>
          <div className="ecd">
            <span className="ecd__title">{t("phone_number")}</span>
            <span className="ecd__desc">
              {getEmployeDetailById?.user?.phoneNumber}
            </span>
          </div>
          <div className="ecd">
            <span className="ecd__title">{t("gender")}</span>
            <span className="ecd__desc">
              {getEmployeDetailById?.user?.gender?.name
                ? getEmployeDetailById?.user?.gender?.name
                : "--"}
            </span>
          </div>
        </div>
        <div
          className="employe-contract-detail__docs"
          style={{ width: "calc(100% - 400px)" }}
        >
          <div className="add-new-employe__document">
            <UserRemove
              show={userRemoveModal}
              onHide={() => setuserRemoveModal(false)}
            />
            <div className="add-new-employe">
              <button
                className="edit-profile-save-btn"
                onClick={() =>
                  navigate(
                    `/dashboard/edit-profile/${getEmployeDetailById?.user?.id}`
                  )
                }
              >
                {t("update_information")}
                <span>
                  <SaveIcon />
                </span>
              </button>
              <button
                className="edit-profile-save-btn"
                style={{ background: "#BC0000", right: "270px" }}
                onClick={() => setuserRemoveModal(true)}
              >
                {t("unlink_device")}
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

            {getEmployeDetailById?.documents &&
              getEmployeDetailById?.documents?.length > 0 ? (
              getEmployeDetailById.documents?.map((item) => {
                return (
                  <div className="add-new-employe__document--detail">
                    <Grid container spacing={3}>
                      <Grid item xs={5}>
                        <div className="name" style={{ position: "relative" }}>
                          {item?.companyDocumentExternal?.path ? (
                            <>
                              <span className="add-new-employe__filelabel">
                                <b>{item?.companyDocumentExternal?.document}</b>
                              </span>
                              <span
                                onClick={() => {
                                  /*author mazhar iqbal
                                    download company external documents 
                                  */
                                  dispatch(
                                    DownloadCompanyExternalDocuments({
                                      id: item?.companyDocumentExternal?.id,
                                      option: "company_document_external",
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


                                label={
                                  item?.companyDocumentExternal?.document
                                    ? item?.companyDocumentExternal?.document
                                    : "---"
                                }
                                value={item?.document}
                                name={item?.userId}

                                // defaultValue={item?.document}
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
                              />
                              <span
                                className="uploaod-document-name"
                                onClick={() => {
                                  const body = {
                                    id: item?.id,
                                    value: documentValue[item],
                                  };
                                  const data = {
                                    user: {
                                      id: item?.userId,
                                    },
                                    document: documentValue[item],
                                    companyDocumentExternal: {
                                      id: item?.companyDocumentExternal?.id,
                                    },
                                  };
                                  if (item?.id != null) {
                                    /*author mazhar iqbal
                                      upload external documents value
                                    */
                                    dispatch(SetCommentaToExternalDoc(body));
                                  } else {
                                    /*author mazhar iqbal
                                      upload company document external value
                                    */
                                    dispatch(SetTitleToExternalDoc(data));
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
                        {item?.companyDocumentExternal?.path ? (
                          <>
                            <button
                              className="add-new-employe__attach"
                              onClick={() => {
                                setValue(item?.companyDocumentExternal?.id);
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
                            <img
                              src={
                                item?.companyDocumentExternal?.path
                                  ?.split(".")
                                  .pop() === "pdf"
                                  ? pdf_image
                                  : item?.companyDocumentExternal?.path
                                    ?.split(".")
                                    .pop() === "xlsx"
                                    ? excel_image
                                    : item?.companyDocumentExternal?.path
                                      ?.split(".")
                                      .pop() === "docx" ||
                                      item?.companyDocumentExternal?.path
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
                                   download external documents 
                                 */
                                dispatch(
                                  DownloadCompanyExternalDocuments({
                                    id: item?.id,
                                    option: "document_external",
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
        <AllUser show={allUser} onHide={() => setAllUser(false)} />
      </div>
    </>
  );
};

export default EmployeeCompleteDocuments;
