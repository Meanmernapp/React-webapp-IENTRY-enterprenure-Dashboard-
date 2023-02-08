import React, { useEffect, useState } from "react";
import { Box, TextField } from '@mui/material';
import Switch from "react-switch";
import Modal from "react-bootstrap/Modal";
import cancel from '../../../../assets/images/ic-cancel.svg'
import cloud from '../../../../assets/images/cloud.svg'
import ic_cancel from '../../../../assets/images/ic-cancel.svg';
import excel_image from '../../../../assets/images/excel-image.png';
import pdf_image from '../../../../assets/images/pdf-image.png';
import png_image from '../../../../assets/images/png.png';
import word_image from '../../../../assets/images/word-image.png';
import { createEmployeeDocuments, createExternalDocuments } from "../../../../Apis/documents";
import { toast } from "react-toastify";
import { uploadImg } from "../../../../Apis/imageController";
import { useDispatch, useSelector } from "react-redux";
import { createVehicles, getCompanyVehicles } from "../../../../reduxToolkit/CompanyDocuments/VehicleDocumentsApi";
import { getAllEmployeesDocuments, getAllExternalDocuments } from '../../../../reduxToolkit/UserDocPanel/UserDocPanelApi';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { permissionObj } from "../../../../Helpers/permission";

const AddDocsModal = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  const [checked, setChecked] = useState(false);
  const [documentName, setDocumentName] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [loading, setLoading] = useState(false);

  const { permission } = useSelector(state => state.authenticatioauthennSlice);



  const onFileChange = (e) => {
    setUploadFile(e.target.files[0])
  };

  const handleSwitch = (checked) => {
    setChecked(checked)
  }

  const handleUploadFile = () => {
    const body = {
      "document": documentName,
    }
    if (documentName !== "") {
      if (props.modalrelation === "user") {
        if (checked === true) {
          setLoading(true);
          createExternalDocuments(body).then(({ data: { data } }) => {
            // console.log(data)
            if (data?.id) {
              let formData = new FormData();
              formData.append('id', data?.id);
              formData.append('option', "company_document_external");
              formData.append('file', uploadFile);

              if (uploadFile !== undefined) {
                uploadImg(formData).then(({ data: { data } }) => {
                  props.onHide();
                  setDocumentName("");
                  setUploadFile("");
                  toast.success("file uploaded successfully!");
                  setLoading(false);
                  dispatch(getAllExternalDocuments())
                  // console.log(data)
                }).catch(error => {
                  props.onHide();
                  toast.error("something went wrong.");
                  setLoading(false);
                })
              } else {
                props.onHide();
                toast.warn("your file is empty");
                setLoading(false);
              }
            }
            dispatch(getAllExternalDocuments())

          }).catch(error => {
            toast.error("something went wrong.")
            setLoading(false);
          })

        } else if (checked === false) {
          setLoading(true);
          createEmployeeDocuments(body).then(({ data: { data } }) => {
            toast.success("Document Created successfully!");
            // console.log(data);
            if (data?.id) {
              let formData = new FormData();
              formData.append('id', data?.id);
              formData.append('option', "company_document_employee");
              formData.append('file', uploadFile);

              if (uploadFile !== undefined) {
                uploadImg(formData).then(({ data: { data } }) => {
                  props.onHide();
                  setDocumentName("");
                  setUploadFile("");
                  toast.success("file uploaded successfully!");
                  setLoading(false);
                  dispatch(getAllEmployeesDocuments())
                  // console.log(data)
                }).catch(error => {
                  toast.error("something went wrong.");
                  setLoading(false);
                })
              } else {
                props.onHide();
                toast.warn("your file is empty");
                setLoading(false);
              }
            }
            dispatch(getAllEmployeesDocuments())
          }).catch(error => {
            console.log(error)
            toast.error("something went wrong.")
            setLoading(false);
          })

        }
      }
      if (props.modalrelation === "vehicle") {

        dispatch(createVehicles(body)).then(({ payload: { data: { data } } }) => {
          toast.success("Document Created successfully!");
          if (data?.id) {
            let formData = new FormData();
            formData.append('id', data?.id);
            formData.append('option', "company_document_external_vehicle");
            formData.append('file', uploadFile);

            if (uploadFile !== undefined) {
              uploadImg(formData).then(({ data: { data: { data } } }) => {
                props.onHide();
                toast.success("file uploaded successfully!");
                setDocumentName("")
                setUploadFile("");
                dispatch(getAllExternalDocuments())
                setLoading(false);
              }).catch(error => {
                toast.error("something went wrong.");
                setLoading(false);
              })
            } else {
              props.onHide();
              toast.warn("your file is empty");
            }
          }
          dispatch(getAllExternalDocuments())

        })
      }
    } else {
      toast.warn("please check name")
    }
    setDocumentName("")
  }

  useEffect(() => {
    if (!permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU)) {
      setChecked(true)
    }
    else if (!permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU)) {
      setChecked(false)
    }

  }, [])

  return (
    <Modal
      className="documents-panel-modal"
      {...props}
      onHide={() => {
        setDocumentName("")
        setUploadFile(null)
        props.onHide();
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('add_document')}
        </Modal.Title>
        <img
          onClick={() => {
            setDocumentName("")
            setUploadFile(null)
            props.onHide()
          }}
          className="modalClose"
          src={cancel}
          alt=""
        />
      </Modal.Header>
      <Modal.Body className="docsModalBody">
        {
          props.modalrelation === "user" ?
            <>
              <p>{t('type')}</p>
              {
                (permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_CREATE && permissionObj?.WEB_EMPLOYEE_DOCUMENT_CREATE)) &&

                <div className="d-flex align-items-center">
                  <span
                    style={{
                      fontSize: "14px",
                      color: checked ? "#707070" : "#65ABA0",
                      textDecoration: checked ? "none" : "underline",
                      marginRight: "10px"
                    }}
                  >{t('employees')}</span>
                  <Switch
                    checked={checked}
                    onChange={handleSwitch}
                    onColor="#65ABA0"
                    onHandleColor="#178A7B"
                    handleDiameter={14}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 2px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 2px rgba(0, 0, 0, 0.2)"
                    height={11}
                    width={26}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: checked ? "#65ABA0" : "#707070",
                      textDecoration: checked ? "underline" : "none",
                      marginLeft: "10px"
                    }}
                  >{t('external')}</span>
                </div>
              }
            </> : null
        }
        <Box
          component="form"
          sx={{
            width: "100%",
            maxWidth: "100%",
            fontSize: "20px",
            height: "40px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField size="small"
            fullWidth


            label={t('document_name')}
            name="documentName"
            id="outlined-size-normal"
            defaultValue=""
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            sx={{
              textAlign: lCode === "ar" ? "right" : "left",
              "& 	.MuiOutlinedInput-notchedOutline": {
                textAlign: lCode === "ar" ? "right" : "left",
              },
              "& 	.MuiInputLabel-root": {
                fontSize: 12,
                left: lCode === "ar" ? "inherit" : "0",
                right: lCode === "ar" ? "1.75rem" : "0",
                transformOrigin: lCode === "ar" ? "right" : "left"
              }
            }}
          />
        </Box>
        <label htmlFor="file-input" className="dottedborderbox">
          <img
            src={cloud}
            alt="submitupload"
            className="submitupload"
          />
          <input
            type="file"
            id="file-input"
            accept="application/pdf,application/xlsx,application/docx,application/pptx"
            onChange={onFileChange}
          />
          <div className="dragAndDrop">
            <p>DRAG & DROP YOUR IMAGE</p>
            <span>file size 20MB</span>
          </div>
        </label>
        {
          uploadFile ?
            <div className='previewFile mt-0 mb-3'>
              <img
                src={
                  uploadFile?.name?.split('.').pop() === "pdf" ? pdf_image :
                    uploadFile?.name?.split('.').pop() === "xlsx" ? excel_image :
                      uploadFile?.name?.split('.').pop() === "docx" ||
                        uploadFile?.name?.split('.').pop() === "pptx" ||
                        uploadFile?.name?.split('.').pop() === "ppt" ? word_image :
                        uploadFile?.name?.split('.').pop() === "png" ||
                          uploadFile?.name?.split('.').pop() === "jpg" ||
                          uploadFile?.name?.split('.').pop() === "jpeg"
                          ? png_image :
                          pdf_image
                }
                className="mr-3"
                style={{ width: "30px" }}
                alt="imgs"
              />
              <p>{uploadFile?.name?.slice(0, 20)}....</p>
              <img
                src={ic_cancel}
                className="cancelIcon"
                alt="ic_cancel"
                onClick={() => setUploadFile('')}
              />
            </div> : null
        }
        <div className="buttonArea">
          <button
            className="btns btn btn-light"
            onClick={() => {
              setDocumentName("")
              setUploadFile(null)
              props.onHide()
            }}
          >
            {t('cancel')}
          </button>
          <button className="btn btn-success" onClick={handleUploadFile}>
            {
              loading ? "uploading...!" : t('upload')
            }
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddDocsModal;