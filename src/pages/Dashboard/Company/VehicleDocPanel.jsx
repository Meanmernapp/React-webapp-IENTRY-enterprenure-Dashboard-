/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/
import React, { useEffect, useState, useRef } from 'react'
import ic_delete_red from '../../../assets/images/ic-delete-red.svg'
import download_Img from '../../../assets/images/ic-download-file.svg'
import cancel from '../../../assets/images/ic-cancel.svg';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import cloud from '../../../assets/images/cloud.svg'
import ic_cancel from '../../../assets/images/ic-cancel.svg';
import ic_check from '../../../assets/images/ic-check.svg';
import excel_image from '../../../assets/images/excel-image.png';
import pdf_image from '../../../assets/images/pdf.svg';
import png_image from '../../../assets/images/png.png';
import jpg from '../../../assets/images/jpg.png';
import word_image from '../../../assets/images/word-image.png';
import DeleteModal from "../../Modals/DeleteModal";

import { useDispatch, useSelector } from 'react-redux'
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { permissionObj } from '../../../Helpers/permission';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import cryptoJs from 'crypto-js';
import securekey from '../../../config';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import {
  CreateContractorVehicleDoc, CreateSupplierVehicleDoc, DeleteAllVehicleDocument, DeleteDocumentById,
  DownloadDocumentById, GetAllDepartments, GetAllEmployeeDoc, GetAllSupplierVehicleDoc, GetAllContractorVehicleDoc
} from '../../../reduxToolkit/DocumentPanel/DocumentPanelApi';

const VehicleDocPanel = () => {
  // use hook importer
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // use State
  const [show, setShow] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)
  const [addDocumentModal, setAddDocumentModal] = useState(false)
  const [deleteSingleDoc, setDeleteSingleDoc] = useState()
  const [deleteAllDoc, setDeleteAllDoc] = useState()
  const [selectDocForDelete, setSelectDocForDelete] = useState([])
  const [deleteDocShow, setDeleteDocShow] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const userType = {
    1: 'SUPPLIERS',
    2: 'CONTRACTORS'
  }

  const tipoUsuario = userType[toggleState];

  const title_modal = `DELETE_${tipoUsuario}_DOCUMENTS`;
  const element_modal = `${tipoUsuario}_DOCUMENT`;

  // use Selector
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { getAllEmployeeDoc, getAllSupplierVehicleDoc, getAllContractorVehicleDoc,
    deleteDocumentById, deleteAllVehicleDocument,
    getAllDepartments, createEmployeeDoc, createSupplierVehicleDoc, createContractorVehicleDoc, uploadDocImg
  } = useSelector(state => state.DocumentPanelSlice)
  // toggel tap funtion
  const toggleTab = (index) => {
    setToggleState(index);
  }

  // this function control select all id or unSelect all
  const handelDocDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      if (toggleState === 1) {
        const selectAllIds = getAllSupplierVehicleDoc?.map(item => {
          return item?.id
        })
        setSelectDocForDelete(selectAllIds)
      }
      if (toggleState === 2) {
        const selectAllIds = getAllContractorVehicleDoc?.map(item => {
          return item?.id
        })
        setSelectDocForDelete(selectAllIds)
      }

    } else {
      setSelectDocForDelete([])
    }

  }

  // this function handle only specific id base on selection
  const handleDocCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectDocForDelete([...selectDocForDelete, e.target.id]);
    } else {
      setSelectDocForDelete(selectDocForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  //This fragment makes uncheked all the checkboxes when toggleState change
  const resetAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
  useEffect(() => {
    resetAllCheckboxes();
    setSelectDocForDelete([]);
    setIsAllChecked(false);
  }, [toggleState]);


  // This components are used to calculate the distance between the top of the window and the top of the table panel
  const elementRef = useRef(null);
  useEffect(() => {
    const rect = elementRef.current.getBoundingClientRect();
    const distanceTop = rect.top;
    elementRef.current.style.setProperty('--top-value', `${distanceTop}px`)
  }, [toggleState]);

  // check permission check 
  useEffect(() => {
    if (!permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU)) {
      setToggleState(1)
    }
    else if (!permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU)) {
      setToggleState(2)
    }
    dispatch(GetAllDepartments())
  }, [])
  // dispatch the funtion to get update
  useEffect(() => {
    dispatch(GetAllEmployeeDoc())
    dispatch(GetAllSupplierVehicleDoc())
    dispatch(GetAllContractorVehicleDoc())

  }, [deleteDocumentById, deleteAllVehicleDocument, createEmployeeDoc,
    createSupplierVehicleDoc, createContractorVehicleDoc, uploadDocImg])


  // main funtion return
  return (
    <>
      <div className="document_panel_container">
        <div className='head'>
          <div className='headLeft'>
            {/* <Link to="/dashboard/employee/company">
              <i className="fa fa-arrow-left" aria-hidden="true" style={{
                transform: lCode === "ar" ? "scaleX(-1)" : ""
              }}></i>
            </Link> */}
            <h2>{t('vehicle_documents_panel')}</h2>
          </div>

          <div className='container-top-right-btns'>
            {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_CREATE || permissionObj?.WEB_EMPLOYEE_DOCUMENT_CREATE) &&

              <button className='add-btn-1'
                onClick={() => setAddDocumentModal(true)}
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
                {t('add')}
              </button>

            }

            <button className="delete-btn-1"
              disabled={selectDocForDelete?.length === 0}
              onClick={() => {
                setDeleteDocShow(true)
              }}
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              {t('delete')}
            </button>
          </div>
        </div>

        {/* portfolio-grid */}
        <div className="row steps-row justify-content-between m-0" id="pills-tab" role="tablist">

          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
            <div
              // className="col-4 text-center p-0 tap_hover active_tap"
              className={`col-6 text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : 'deactive_tap'}`}
              role="presentation"
            >
              <a
                className={`steps-global btn ${toggleState === 1 ? 'btn-bordered-global' : ''}`}
                onClick={() => toggleTab(1)}
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <span>{t('suppliers')}</span>
              </a>
            </div>
          }
          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
            <div
              // className="col-4 text-center p-0 tap_hover"
              className={`col-6 text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : 'deactive_tap'}`}
              role="presentation"
            >
              <a
                className={`steps-global btn ${toggleState === 2 ? 'btn-bordered-global' : ''}`}
                onClick={() => toggleTab(2)}
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <span>{t('contractors')}</span>
              </a>
            </div>
          }
        </div>

        <div className="tab-content" id="pills-tabContent" ref={elementRef}>
          {/* provider */}
          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
            <div
              className={`${toggleState === 1 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="px-1 panelTables animated-div ">
                {
                  getAllSupplierVehicleDoc?.length > 0 ?
                    <table style={{ width: "100%" }}>
                      <thead>
                        <th className='first_head'>
                          <input type="checkbox" className="checkbox"
                            checked={isAllChecked}
                            onChange={handelDocDeleteAll}
                          />
                        </th>
                        <th className='first_head'>{t("document_name")}</th>
                        <th>{t("department_name")}</th>
                        <th>{t("form")}</th>
                        <th>{t("download")}</th>
                        <th className='last'>{t("remove")}</th>
                      </thead>

                      {
                        getAllSupplierVehicleDoc?.map(item => {
                          return (
                            <tr key={item?.id}>
                              <td className='first'>
                                <input type="checkbox" className="checkbox"
                                  checked={selectDocForDelete?.includes(item?.id)}
                                  id={item?.id}
                                  onChange={handleDocCheckboxChange}
                                />
                              </td>
                              < td className='first'>{item?.document || '-'}</td>
                              <td>{item?.department?.name || "-"}</td>
                              <td className={item?.path ? "file_with_name" : ""}
                                style={item?.path ? { padding: "0.5rem 0" } : {}}
                              >
                                {
                                  item?.path ?
                                    <>
                                      <img src={item?.path?.split('.').pop() === "pdf" && pdf_image ||
                                        item?.path?.split('.').pop() === "jpg" && jpg ||
                                        item?.path?.split('.').pop() === "png" && png_image ||
                                        item?.path?.split('.').pop() === "xlsx" && excel_image ||
                                        item?.path?.split('.').pop() === "docx" && word_image ||
                                        item?.path?.split('.').pop() === "pptx" && word_image
                                        || pdf_image
                                      } alt=""
                                      />
                                      <p >
                                        {item?.path}
                                      </p>
                                    </> :
                                    "N/A"
                                }

                              </td>
                              <td className='tableIcon'>
                                {
                                  item?.path ?
                                    <button className='btn-option'
                                      onClick={() => {
                                        const data = {
                                          id: item?.id,
                                          option: "supplier_vehicle_document_company",
                                          filename: item?.path
                                        }
                                        dispatch(DownloadDocumentById(data))
                                      }}>
                                      <img
                                        src={download_Img}
                                        alt="ic_delete_red"
                                      />
                                    </button> :
                                    "N/A"
                                }

                              </td>
                              <td className='tableIcon'>
                                <button className='btn-option'
                                  onClick={() => {
                                    const data = {
                                      id: item?.id,
                                      option: "supplier_vehicle_document_company",
                                      departmentName: item?.document || "-",
                                      currentTab: "SUPPlIER"
                                    }

                                    setDeleteSingleDoc(data)
                                    setShowDeleteModal(true)

                                  }}>
                                  <img
                                    src={ic_delete_red}
                                    alt="ic_delete_red"
                                  />
                                </button>
                              </td>

                            </tr>
                          )
                        })
                      }

                    </table> :
                    <NotFoundDataWarning text={t("no_documents")} />
                }
              </div>
            </div>
          }
          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
            <div
              className={`${toggleState === 2 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="px-1 panelTables animated-div ">
                {
                  getAllContractorVehicleDoc?.length > 0 ?
                    <table style={{ width: "100%" }}>
                      <thead>
                        <th className='first_head'>
                          <input type="checkbox" className="checkbox"
                            checked={isAllChecked}
                            onChange={handelDocDeleteAll}
                          />
                        </th>
                        <th className='first_head'>{t("document_name")}</th>
                        <th>{t("department_name")}</th>
                        <th>{t("form")}</th>
                        <th>{t("download")}</th>
                        <th className='last'>{t("remove")}</th>
                      </thead>

                      {
                        getAllContractorVehicleDoc?.map(item => {
                          return (
                            <tr key={item?.id}>
                              <td className='first'>
                                <input type="checkbox" className="checkbox"
                                  checked={selectDocForDelete?.includes(item?.id)}
                                  id={item?.id}
                                  onChange={handleDocCheckboxChange}
                                />
                              </td>
                              < td className='first'>{item?.document || '-'}</td>
                              <td>{item?.department?.name || "-"}</td>
                              <td className={item?.path ? "file_with_name" : ""}
                                style={item?.path ? { padding: "0.5rem 0" } : {}}
                              >
                                {
                                  item?.path ?
                                    <>
                                      <img src={item?.path?.split('.').pop() === "pdf" && pdf_image ||
                                        item?.path?.split('.').pop() === "jpg" && jpg ||
                                        item?.path?.split('.').pop() === "png" && png_image ||
                                        item?.path?.split('.').pop() === "xlsx" && excel_image ||
                                        item?.path?.split('.').pop() === "docx" && word_image ||
                                        item?.path?.split('.').pop() === "pptx" && word_image
                                        || pdf_image
                                      } alt=""
                                      />
                                      <p >
                                        {item?.path}
                                      </p>
                                    </> :
                                    "N/A"
                                }

                              </td>
                              <td className='tableIcon'>
                                {
                                  item?.path ?
                                    <button className='btn-option'
                                      onClick={() => {
                                        const data = {
                                          id: item?.id,
                                          option: "contractor_vehicle_document_company",
                                          filename: item?.path
                                        }
                                        dispatch(DownloadDocumentById(data))
                                      }}>
                                      <img
                                        src={download_Img}
                                        alt="ic_delete_red"
                                      />
                                    </button> :
                                    "N/A"
                                }
                              </td>
                              <td className='tableIcon'>
                                <button className='btn-option'
                                  onClick={() => {
                                    const data = {
                                      id: item?.id,
                                      option: "contractor_vehicle_document_company",
                                      departmentName: item?.document || "-",
                                      currentTab: "CONTRACTOR"
                                    }

                                    setDeleteSingleDoc(data)
                                    setShowDeleteModal(true)

                                  }}>
                                  <img
                                    src={ic_delete_red}
                                    alt="ic_delete_red"
                                  />
                                </button>
                              </td>

                            </tr>
                          )
                        })
                      }

                    </table> :
                    <NotFoundDataWarning text={t("no_documents")} />
                }
              </div>
            </div>
          }
        </div>

        <DeleteModal
          show={deleteDocShow}
          onHide={() => setDeleteDocShow(false)}
          data={selectDocForDelete}
          title_modal={title_modal}
          element_modal={element_modal}
        />

      </div>

      {/* modal call */}
      <DeleteSingleDocModal

        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        modaldata={deleteSingleDoc}
        toggle={toggleState}
      />

      <DeleteAllDocModal
        show={showDeleteAllModal}
        onHide={() => setShowDeleteAllModal(false)}
        toggle={toggleState}
        modaldata={deleteAllDoc}
      />
      <AddDocumentModal
        show={addDocumentModal}
        onHide={() => setAddDocumentModal(false)}
        toggle={toggleState}
        departments={getAllDepartments}

      />
    </>
  )
}

// delete Doc
const DeleteSingleDocModal = (props) => {
  const { modaldata, toggle } = props;
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();

  const handelDeleteDocument = () => {
    dispatch(DeleteDocumentById(modaldata))
    props.onHide()
  }

  return (
    <Modal
      className="document_delete_modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title
          className='title_name'
        >
          {t('remove_document')}
        </Modal.Title>
        <img
          className='close_icon'
          src={cancel}
          style={{
            position: "absolute",
            padding: "1px",
            right: "3px",
            width: "15px",
            height: "15px",
            top: "3px",
            cursor: "pointer",
          }}
          onClick={() => props.onHide()}
        />
      </Modal.Header>
      <Modal.Body>
        <p className='title_description'>
          Are about to remove the document
          <span> {modaldata?.departmentName}</span> , for the user type <span> {modaldata?.currentTab}</span>. ¿Do you want to remove this document?. Confirm the action to apply the changes.
        </p>
        <div className='d-flex mt-3'>
          <button

            style={{ width: '180px', height: "30px" }}
            onClick={() => props.onHide()}
            className="custom_btn_cancel_gray_hover"
          >
            {t('cancel')?.toUpperCase()}
          </button>
          <button

            style={{ width: '180px', height: "30px" }}
            className="custom_primary_btn_dark"
            // onClick={handleDeleteDoc}
            onClick={() => { handelDeleteDocument() }}
          >
            {t('remove')?.toUpperCase()}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

// delete all doc
const DeleteAllDocModal = (props) => {
  const { modaldata, toggle } = props;
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();

  const handleAllDeleteDocument = () => {
    const data = {
      name: toggle === 1 && "supplier" ||
        toggle === 2 && "contractor"
    }
    dispatch(DeleteAllVehicleDocument(data))
    props.onHide()
  }
  return (
    <Modal
      className="document_delete_modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title
          className='title_name'
        >
          {t('remove_all_documents')}
        </Modal.Title>
        <img
          className='close_icon'
          src={cancel}
          style={{
            position: "absolute",
            padding: "1px",
            right: "3px",
            width: "15px",
            height: "15px",
            top: "3px",
            cursor: "pointer",
          }}
          onClick={() => props.onHide()}
        />
      </Modal.Header>
      <Modal.Body>
        <p className='title_description'>
          Are about to remove
          <span> {modaldata?.documents}</span> for the user type
          <span> {modaldata?.currentTab}</span>. ¿Do you want to remove this document?. Confirm the action to apply the changes.
        </p>
        <div className='d-flex mt-3'>
          <button

            style={{ width: '180px', height: "30px" }}
            onClick={() => props.onHide()}
            className="custom_btn_cancel_gray_hover"
          >
            {t('cancel')?.toUpperCase()}
          </button>
          <button

            style={{ width: '180px', height: "30px" }}
            className="custom_primary_btn_dark"
            onClick={handleAllDeleteDocument}
          >
            {t('remove')?.toUpperCase()}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

// delete all doc
const AddDocumentModal = (props) => {

  const { departments, toggle } = props;
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();
  const [uploadFile, setUploadFile] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [departmentName, setDepartmentName] = useState("")

  const [instruction, setInstruction] = useState("")


  const onFileChange = (e) => {
    setUploadFile(e.target.files[0])
  };

  const reset = () => {
    setUploadFile("")
    setDepartmentName("")
    setDocumentName("")
    setInstruction("")
  }
  const handelCreateDocument = () => {
    //  checking file size 

    const fileSizeInMb = uploadFile.size / 1000000
    if (fileSizeInMb > 5) {
      toast.warn("File Should be less then 5MB")
    }

    if (!documentName) {
      toast.warn("Please Enter Document Name")
    } else {
      const data = {
        uploadFile,
        documentName,
        departmentName,
        instruction,
      }

      if (toggle === 1) {
        dispatch(CreateSupplierVehicleDoc(data))
        props.onHide()
        reset()
      }
      if (toggle === 2) {
        dispatch(CreateContractorVehicleDoc(data))
        props.onHide()
        reset()
      }
    }
  }
  return (
    <Modal
      className="document_add_modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title
          className='title_name'
        >
          {t('add_document')}
        </Modal.Title>
        <img
          className='close_icon'
          src={cancel}
          style={{
            position: "absolute",
            padding: "1px",
            right: "3px",
            width: "15px",
            height: "15px",
            top: "3px",
            cursor: "pointer",
          }}
          onClick={() => props.onHide()}
        />
      </Modal.Header>
      <Modal.Body>

        <p className='lable_type mb-2'>{t("create_for")}</p>
        <p style={{
          color: "#006594",
          fontSize: '14px',
          paddingLeft: "2rem"

        }}>{
            toggle === 1 && t("supplier") ||
            toggle === 2 && t("contractor")
          }</p>
        <p className='lable_type mb-2'>{t("type_which_will_be_the_name")}</p>
        <Box
          component="form"
          sx={{
            width: "100%",
            maxWidth: "100%",
            fontSize: "20px",
            height: "40px",
            marginTop: "15px"
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
        <p className='lable_type mb-2'>{t("choose_a_department")}</p>
        <Box sx={{
          width: "100%",
          maxWidth: "100%",
          fontSize: "20px",
          height: "50px",
          marginTop: "15px"

        }} >
          <FormControl fullWidth
          // sx={textField}
          >
            <InputLabel id="demo-simple-select-label">
              {t("departments")}
            </InputLabel>
            <Select size="small"
              labelId="demo-simple-select-label"
              id="DEPARTMENTS"
              label={t("departments")}
              value={departmentName}

              onChange={(e) => setDepartmentName(e.target.value)}
            >
              {
                departments?.map((item, index) => {
                  return (
                    <MenuItem value={item?.id}>{item?.name}</MenuItem>
                  )
                })

              }

            </Select>
          </FormControl>
        </Box>
        <p style={{ color: "#F2A100", fontSize: "10px" }}>{t("department_who_can_approve_it,_leave_empty_in_case_anyone")}</p>


        <Grid sx={{ position: 'relative', width: "100%", marginTop: '1rem' }}>
          <TextField size="small"
            fullWidth

            type="text"
            label="INSTRUCTION"
            id="message"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            multiline
            rows={3}


            maxRows={5}
            InputLabelProps={{
              style: {
                fontSize: "10px",
                fontWeight: 600,
                background: "#ffffff",
                padding: "0px 8px 0px 8px",

              },
            }} // font size of input label
            inputProps={{
              maxLength: 500,
              sx: {
                border: "none",
                outline: "none",
                fontSize: "10px",
                letterSpacing: "0px",
                innerHeight: "200px",

                color: "#707070",
                "&::placeholder": {
                  color: "#707070",
                  fontSize: "8px",
                },

              },
            }}
          />
          <Typography
            className='bottom_number_modal'
            sx={{
              position: 'absolute',
              bottom: "-18px",
              right: 0,
              fontSize: '10px',
              color: "#707070"

            }}>
            {/* {message.length}/{max} MAX */}
            {instruction?.length}/{"500"} MAX
          </Typography>

        </Grid>


        <p className='lable_type mt-2'>{t('type')}</p>
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
                  // uploadFile?.name?.split('.').pop() === "pdf" && pdf_image ||
                  // uploadFile?.name?.split('.').pop() === "xlsx" && excel_image ||
                  // (uploadFile?.name?.split('.').pop() === "docx" ||
                  //   uploadFile?.name?.split('.').pop() === "pptx" ||
                  //   uploadFile?.name?.split('.').pop() === "ppt") && word_image ||
                  // (uploadFile?.name?.split('.').pop() === "png" ||
                  //   uploadFile?.name?.split('.').pop() === "jpg" ||
                  //   uploadFile?.name?.split('.').pop() === "jpeg")
                  // && 
                  // png_image

                  uploadFile?.name?.split('.').pop() === "pdf" && pdf_image ||
                  uploadFile?.name?.split('.').pop() === "jpg" && png_image ||
                  uploadFile?.name?.split('.').pop() === "png" && png_image ||
                  uploadFile?.name?.split('.').pop() === "xlsx" && excel_image ||
                  uploadFile?.name?.split('.').pop() === "docx" ||
                  uploadFile?.name?.split('.').pop() === "pptx" && word_image

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
        <div className='d-flex mt-3'>
          <button

            style={{ width: '180px', height: "30px" }}
            onClick={() => props.onHide()}
            className="custom_btn_cancel_gray_hover"
          >
            {t('cancel')?.toUpperCase()}
          </button>
          <button

            style={{ width: '180px', height: "30px" }}
            className="custom_primary_btn_dark"
            onClick={() => handelCreateDocument()}
          >
            {t('upload')?.toUpperCase()}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default VehicleDocPanel