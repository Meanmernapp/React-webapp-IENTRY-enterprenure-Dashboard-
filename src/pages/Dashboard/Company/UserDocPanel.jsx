import React, { useEffect, useState } from 'react'
import ic_delete_red from '../../../assets/images/ic-delete-red.svg'
import download_Img from '../../../assets/images/ic-download-file.svg'
import cancel from '../../../assets/images/ic-cancel.svg';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import cloud from '../../../assets/images/cloud.svg'
import ic_cancel from '../../../assets/images/ic-cancel.svg';
import excel_image from '../../../assets/images/excel-image.png';
import pdf_image from '../../../assets/images/pdf.svg';
import png_image from '../../../assets/images/png.png';
import jpg from '../../../assets/images/jpg.png';
import word_image from '../../../assets/images/word-image.png';

import { useDispatch, useSelector } from 'react-redux'
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { permissionObj } from '../../../Helpers/permission';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import cryptoJs from 'crypto-js';
import securekey from '../../../config';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { CreateContractorDoc, CreateEmployeeDoc, CreateSupplierDoc, DeleteAllDocument, DeleteDocumentById, DownloadDocumentById, GetAllContractorDoc, GetAllDepartments, GetAllEmployeeDoc, GetAllSupplierDoc } from '../../../reduxToolkit/DocumentPanel/DocumentPanelApi';

const UserDocPanel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
 
  const [show, setShow] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)
  const [addDocumentModal, setAddDocumentModal] = useState(false)
  const [deleteSingleDoc , setDeleteSingleDoc]= useState()
  const [deleteAllDoc, setDeleteAllDoc]= useState()

  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { getAllEmployeeDoc,getAllSupplierDoc,getAllContractorDoc,
    deleteDocumentById,deleteAllDocument,
    getAllDepartments,createEmployeeDoc,createSupplierDoc,createContractorDoc,uploadDocImg
  } = useSelector(state => state.DocumentPanelSlice)

  const toggleTab = (index) => {
    setToggleState(index);
  }

  useEffect(() => {
    if (!permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU)) {
      setToggleState(1)
    }
    else if (!permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU)) {
      setToggleState(2)
    }
    dispatch(GetAllDepartments())
  }, [])

  useEffect(()=>{
      dispatch(GetAllEmployeeDoc())
      dispatch(GetAllSupplierDoc())
      dispatch(GetAllContractorDoc())
    
  },[deleteDocumentById,deleteAllDocument,createEmployeeDoc,
    createSupplierDoc,createContractorDoc,uploadDocImg])

  return (
    <>
      <div className="document_panel_container">
        <div className='head'>
          <div className='headLeft'>
            <Link to="/dashboard/employee/company">
              <i className="fa fa-arrow-left" aria-hidden="true" style={{
                transform: lCode === "ar" ? "scaleX(-1)" : ""
              }}></i>
            </Link>
            <h2>{t('document_panel')}</h2>
          </div>
          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_CREATE || permissionObj?.WEB_EMPLOYEE_DOCUMENT_CREATE) &&
            <button
              onClick={() => setAddDocumentModal(true)}
            >
              {t('add_document')}
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          }
          
        </div>

        {/* portfolio-grid */}
        <div className="row steps-row justify-content-between m-0" id="pills-tab" role="tablist">
          {permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU) &&
            <div
              // className="col-4 text-center p-0 tap_hover" 
              className={`col-4 text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : ''}`}
              style={{
                borderBottom: "2px solid #707070"
              }} role="presentation">
              <a
                className={`steps btn ${toggleState === 1 ? 'btn-bordered' : ''}`}
                onClick={() => toggleTab(1)}
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <span>{t('employees')}</span>
              </a>
            </div>
          }
          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
            <div
              // className="col-4 text-center p-0 tap_hover active_tap"
              className={`col-4 text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : ''}`}
              style={{
                borderBottom: "2px solid #707070"
              }}
              role="presentation"
            >
              <a
                className={`steps btn ${toggleState === 2 ? 'btn-bordered' : ''}`}
                onClick={() => toggleTab(2)}
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <span>{t('supplier')}</span>
              </a>
            </div>
          }
          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
            <div
              // className="col-4 text-center p-0 tap_hover"
              className={`col-4 text-center p-0 tap_hover ${toggleState === 3 ? 'active_tap' : ''}`}
              style={{
                borderBottom: "2px solid #707070"
              }}
              role="presentation"
            >
              <a
                className={`steps btn ${toggleState === 3 ? 'btn-bordered' : ''}`}
                onClick={() => toggleTab(3)}
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

        <div className="tab-content" id="pills-tabContent">
          {permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU) &&
            <div
              className={`${toggleState === 1 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className='delete_user_conatiner'>
                <div className='delete_user'
                  onClick={() => {
                    const data={
                      currentTab:"employee",
                      documents:getAllEmployeeDoc?.length

                    }
                    setDeleteAllDoc(data)
                    setShowDeleteAllModal(true)
                  }}
                >
                  <p>{t("delete_all_users")}</p>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </div>
              </div>

              <div className=" col-12 documents_panel_table animated-div">
              {
                getAllEmployeeDoc?.length > 0 ?
                <table style={{ width: "100%" }}>
                <thead>
                  <th className='first_head'>{t("document_name")}</th>
                  <th>{t("department_name")}</th>
                  <th>{t("form")}</th>
                  <th>{t("download")}</th>

                  <th className='last'>{t("remove")}</th>
                </thead>

                {
                  getAllEmployeeDoc?.map((item,index) => {
                    return (
                      <tr key={item?.id}>
                        < td className='first'>{item?.document || '-'}</td>
                        <td>{item?.department?.name || "-"}</td>
                        <td className='file_with_name'
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
                            </>:
                            "N/A"
                          }
                          
                        </td>
                        <td>
                          {item?.path ?
                          <img
                          className='cancel'
                          onClick={() =>{
                            const data={
                              id:item?.id,
                              option:"employee_document_company",
                              filename:item?.path
                            }
                            dispatch(DownloadDocumentById(data))
                          }}
                          src={download_Img}
                          alt="ic_delete_red"
                        />:"N/A"
                        }
                          
                        </td>
                        <td className='last_tr'> <img
                          className='cancel'
                          onClick={() => {
                            const data={
                              id:item?.id,
                              option:"employee_document_company",
                              departmentName:item?.department?.name || "-",
                              currentTab:"EMPLOYEE"

                            }

                            setDeleteSingleDoc(data)
                            setShowDeleteModal(true)
                           
                          }}
                          src={ic_delete_red}
                          alt="ic_delete_red"
                        /></td>

                      </tr>
                    )
                  })
                }

              </table>:
              <NotFoundDataWarning text={t("no_documents")}/>
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
             
              <div className='delete_user_conatiner'>
                <div className='delete_user'
                  onClick={() => {
                    const data={
                      currentTab:"supplier",
                      documents:getAllSupplierDoc?.length

                    }
                    setDeleteAllDoc(data)
                    setShowDeleteAllModal(true)
                  }}
                >
                  <p>{t("delete_all_users")}</p>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </div>
              </div>

              <div className=" col-12 documents_panel_table animated-div ">
                {
                  getAllSupplierDoc?.length > 0 ?
                <table style={{ width: "100%" }}>
                  <thead>
                    <th className='first_head'>{t("document_name")}</th>
                    <th>{t("department_name")}</th>
                    <th>{t("form")}</th>
                    <th>{t("download")}</th>

                    <th className='last'>{t("remove")}</th>
                  </thead>

                  {
                    getAllSupplierDoc?.map(item => {
                      return (
                        <tr  key={item?.id}>
                          < td className='first'>{item?.document || '-'}</td>
                          <td>{item?.department?.name || "-"}</td>
                          <td className='file_with_name'
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
                              </>:
                              "N/A"
                            }
                            
                          </td>
                          <td>
                            {
                              item?.path ?
                              <img
                              className='cancel'
                              onClick={() =>{
                                const data={
                                  id:item?.id,
                                  option:"supplier_document_company",
                                  filename:item?.path
                                }
                                dispatch(DownloadDocumentById(data))
                              }}
                              src={download_Img}
                              alt="ic_delete_red"
                            />:
                            "N/A"
                            }
                           
                          </td>
                          <td className='last_tr'>
                            <img
                              className='cancel'
                              onClick={() => {
                                const data={
                                  id:item?.id,
                                  option:"supplier_document_company",
                                  departmentName:item?.department?.name || "-",
                              currentTab:"SUPPlIER"
                                }
  
                                setDeleteSingleDoc(data)
                                setShowDeleteModal(true)
                                
                              }}
                              src={ic_delete_red}
                              alt="ic_delete_red"
                            /></td>

                        </tr>
                      )
                    })
                  }

                </table>:
                <NotFoundDataWarning text={t("no_documents")}/>
                }
              </div>
            </div>
          }

          {permission?.includes(permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
            <div
              className={`${toggleState === 3 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className='delete_user_conatiner'>
                <div className='delete_user'
                  onClick={() => {
                    const data={
                      currentTab:"contractor",
                      documents:getAllContractorDoc?.length

                    }
                    setDeleteAllDoc(data)
                    setShowDeleteAllModal(true)
                  }}
                >
                  <p>{t("delete_all_users")}</p>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </div>
              </div>

              <div className=" col-12 documents_panel_table animated-div ">
                {
                  getAllContractorDoc?.length > 0 ?
                <table style={{ width: "100%" }}>
                  <thead>
                    <th className='first_head'>{t("document_name")}</th>
                    <th>{t("department_name")}</th>
                    <th>{t("form")}</th>
                    <th>{t("download")}</th>

                    <th className='last'>{t("remove")}</th>
                  </thead>

                  {
                  getAllContractorDoc?.map(item => {
                      return (
                        <tr key={item?.id}>
                          < td className='first'>{item?.document || '-'}</td>
                          <td>{item?.department?.name || "-"}</td>
                          <td className='file_with_name'
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
                              </>:
                              "N/A"
                            }
                            
                          </td>
                          <td>
                          {
                              item?.path ?
                              <img
                              className='cancel'
                              // onClick={() => handleDownloadDoc(item)}
                              onClick={() =>{
                                const data={
                                  id:item?.id,
                                  option:"contractor_document_company",
                                  filename:item?.path
                                }
                                dispatch(DownloadDocumentById(data))
                              }}
                              src={download_Img}
                              alt="ic_delete_red"
                            />:
                            "N/A"
                            }
                          </td>
                          <td className='last_tr'> <img
                            className='cancel'
                            onClick={() => {
                              const data={
                                id:item?.id,
                                option:"contractor_document_company",
                                departmentName:item?.department?.name || "-",
                              currentTab:"CONTRACTOR"
                              }

                              setDeleteSingleDoc(data)
                              setShowDeleteModal(true)
                              
                            }}
                            src={ic_delete_red}
                            alt="ic_delete_red"
                          /></td>

                        </tr>
                      )
                    })
                  }

                </table>:
                <NotFoundDataWarning text={t("no_documents")}/>
                }
              </div>
            </div>
          }
        </div>
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


  // const handleDeleteDoc = () => {

  //   const body = {
  //     companyId: companyId,
  //     userId: userdata?.id,
  //     email: userdata?.email,
  //     userTypes: userdata?.userType.name,
  //     id: modaldata?.id,
  //     option: toggle === 1 ? "company_document_employee" : "company_document_external"
  //   }
  //   deleteImg(body).then(({ data: { data } }) => {
  //     dispatch(getAllEmployeesDocuments())
  //     dispatch(getAllExternalDocuments())
  //     props.onHide();
  //     toast.success("Deleted successfully!")
  //   }).catch(error => {
  //     toast.error("something went wrong.")
  //   })
  // }

  const handelDeleteDocument =()=>{
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
          onClick={()=>{handelDeleteDocument()}}
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

  const handleAllDeleteDocument = ()=>{
    const data={
      name:toggle===1 && "employee" ||
      toggle===2 && "supplier" ||
      toggle===3 && "contractor"
    }
    dispatch(DeleteAllDocument(data))
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

  const { departments,toggle } = props;
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();
  const [uploadFile, setUploadFile] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [departmentName, setDepartmentName]= useState("")
  const [instruction, setInstruction]= useState("")
  console.log(uploadFile)

  const onFileChange = (e) => {
    setUploadFile(e.target.files[0])
  };

  const reset=()=>{
setUploadFile("")
setDepartmentName("")
setDocumentName("")
setInstruction("")
  }
  const handelCreateDocument = ()=>{

    if(!documentName  || !departmentName  ){
      toast.warn("Please Fill the Info")
    }else{
      const data={
        uploadFile,
        documentName,
        departmentName,
        instruction
      }
     if(toggle === 1){
      dispatch(CreateEmployeeDoc(data))
      props.onHide()
      reset()
     }
     if(toggle === 2){
      dispatch(CreateSupplierDoc(data))
      props.onHide()
      reset()
     }
     if(toggle === 3){
      dispatch(CreateContractorDoc(data))
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
          onClick={()=> handelCreateDocument()}
          >
            {t('upload')?.toUpperCase()}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default UserDocPanel