import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import GetAppIcon from "@mui/icons-material/GetApp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import cloudsvg from "../../../assets/images/cloud.svg";
import file from "../../../assets/images/file.png";
import emptyList from "../../../assets/images/warning.svg";
import ic_cancel from '../../../assets/images/ic-cancelGray.svg';

import userImage from "../../../assets/images/employee-4.png";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetAllProviderDocuments } from '../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import { useSelector } from 'react-redux';
import { UploadUserDocument } from '../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi';
import { UploadFileToServer } from '../../../reduxToolkit/Contractor/ContractorApi';
import i18next, { t } from 'i18next';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';


const AddVehicleDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.authenticatioauthennSlice);
  const { getCurrentUserDocument } = useSelector(state => state.EmployeeProviderSlice);

  const [name, setName] = useState("");
  const [employee, setEmployee] = useState();

  const [allUser, setAllUser] = useState(false);
  // console.log("---------->",getCurrentUserDocument);
  //uploading file state
  const [updateCompanyImg, setUpdateCompanyImg] = useState();
  const [previewSize, setPreviewSize] = useState();
  const [companyImg, setCompanyImg] = useState();
  const [pdfFile, setPdfFile] = useState();


  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const onImageChange = async (e) => {
    // console.log(e.target.files[0])
    const originalFile = e.target.files[0];
    const checkExtension = originalFile['type'].split('/')[0] === 'image';

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
      // console.log(e.target.files[0])
      const originalFile = e.target.files[0];
      setPdfFile(originalFile);

      let formatedValue = formatBytes(originalFile?.size);
      // console.log(formatedValue, originalFile?.size);
      setPreviewSize(formatedValue);
    }
  };

  const uploadImageOrFileToServer = () => {
    if ((pdfFile && pdfFile?.size <= 5000000)) {
      let formData = new FormData();
      formData.append('id', user?.data?.id);
      formData.append('file', pdfFile);
      // dispatch(UploadFileToServer(formData)).then((res)=>{
      //   console.log("this is file",res)
      // })
      let companyDocumentExternal = {
        "comment": "string",
        "createdAt": 1632323,
        "deleted": true,
        "deletedAt": 1632323,
        "driveId": "string",
        "path": "string"
      }
      dispatch(UploadUserDocument(companyDocumentExternal)).then(() => {
        navigate('/dashboard/add-vehicle-docs');
      })
    }
  }

  useEffect(() => {
    { user && dispatch(GetAllProviderDocuments(user?.data?.id)) }
  }, [user])

  function AllUser(props) {
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
          <Modal.Header>

            <Modal.Title class="mt-2 text-center add_workshiftmodal_title d-flex justify-content-center flex-grow-1">
              <h4 className="text-center"><b>{t("upload_file")}</b></h4>
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
                    <input type="file" id="file-input" accept="image/png,image/jpg,image/jpeg,application/pdf,application/xlsx,application/docx,application/pptx" onChange={onImageChange} />
                    <p>
                      {t("drag_drop")} <br />{t("your_image")} <br /> {t("size_of_image")}
                    </p>
                  </label>
                </div>
                <div className="col" style={{ width: "100%" }}>
                  {
                    companyImg ?
                      <img
                        src={companyImg}
                        className="previewImg"
                        alt="imgs"
                        style={{ width: "100%", height: "200px" }}
                      /> : null
                  }
                  {
                    companyImg ? null : pdfFile ? <div className='previewFile'>
                      <Grid container spacing={3}>
                        <Grid item xs={2}>
                          <img
                            src={
                              pdfFile?.name?.split('.').pop() === "pdf" ? file :
                                pdfFile?.name?.split('.').pop() === "xlsx" ? file :
                                  pdfFile?.name?.split('.').pop() === "docx" || pdfFile?.name?.split('.').pop() === "pptx" ? file : file
                            }
                            className="mr-3"
                            style={{ width: "30px" }}
                            alt="imgs"
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <p>{pdfFile?.name}</p>
                          <p><span>{t("size")}: </span>{previewSize}</p>
                        </Grid>
                        <Grid item xs={1}>
                          <img
                            src={ic_cancel}
                            className="cancelIcon"
                            alt="ic_cancel"
                            onClick={() => setPdfFile('')}
                          />
                        </Grid>
                      </Grid>



                    </div> : null
                  }

                  {/* {
              companyImg ? null : pdfFile ? <img src={file} /> : null
            } */}

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
              <button className="button-sec btn-confirm" onClick={uploadImageOrFileToServer}>
                <b>{t("apply_changes")}</b>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div className='add-vehicle-documents'>
      <span className='add-vehicle-documents__heading'>{t("documents_to_upload")}</span>
      <span className='add-vehicle-documents__desc'>Please upload the documents neccesaries to be an contractor to the company</span>
      <div className="add-new-employe__document">
        <span className="add-new-employe__document__heading">{t("documents")}</span>
        <Grid container sx={{ my: "10px" }}>
          <Grid item xs={8}>
            <span className="add-new-employe__title">{t("file_name")}</span>
          </Grid>
          <Grid item xs={2}>
            <span className="add-new-employe__type">{t("file")}</span>
          </Grid>
          <Grid item xs={2}>
            <span className="add-new-employe__type">{t("approve")}</span>
          </Grid>
        </Grid>
        <div className="add-new-employe__document--detail">
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <div className="name">
                <TextField size="small"
                  fullWidth


                  label={t("curp")}
                  id="NAME"
                  //   value={}
                  //   onChange={(e) => setName(e.target.value)}
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
              </div>
            </Grid>
            <Grid item xs={3}>
              <button className="add-new-employe__attach" onClick={() => setAllUser(true)}>
                {t("attach_file")}
                <AttachFileIcon />
              </button>
            </Grid>
            <Grid item xs={2}>
              <button className="add-new-employe__filename">
                {/* <img src={file} style={{width:'16px',height:'16px'}}/> */}
                {t("no_file")}
                {/* <GetAppIcon /> */}
              </button>
            </Grid>
            <Grid item xs={2}>
              <span style={{ display: "block", textAlign: "end", color: "red", paddingRight: "13px" }}><ClearIcon /></span>

            </Grid>
          </Grid>
        </div>
        {user && getCurrentUserDocument?.data?.legth > 0 ? getCurrentUserDocument?.data?.map((item) => {
          console.log("user Doc", item);
          return (
            <div className="add-new-employe__document--detail">
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <div className="name">
                    <TextField size="small"
                      fullWidth


                      label={t("curp")}
                      id="NAME"
                      //   value={}
                      //   onChange={(e) => setName(e.target.value)}
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
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <button className="add-new-employe__attach" onClick={() => setAllUser(true)}>
                    {t("attach_file")}
                    <AttachFileIcon />
                  </button>
                </Grid>
                <Grid item xs={2}>
                  <button className="add-new-employe__filename">
                    <img src={file} style={{ width: '16px', height: '16px' }} />
                    {t("no_file")}
                    <GetAppIcon />
                  </button>
                </Grid>
                <Grid item xs={2}>
                  <span style={{ display: "block", textAlign: "end", color: "red", paddingRight: "13px" }}><ClearIcon /></span>
                </Grid>
              </Grid>
            </div>
          )
        }) : (

          <NotFoundDataWarning text={t("no_documents")} />
        )}
      </div>
      <AllUser show={allUser} onHide={() => setAllUser(false)} />

    </div>
  )
}

export default AddVehicleDocuments