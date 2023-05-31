// import { Grid, TextField } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import SaveIcon from "@mui/icons-material/Save";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { Modal } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import UserDemoImg from "../../../assets/images/userDemoImg.png";
// import emptyList from "../../../assets/images/warning.svg";
// import excel_image from "../../../assets/images/excel-image.png";
// import pdf_image from "../../../assets/images/pdf-image.png";
// import word_image from "../../../assets/images/word-image.png";
// import dashIcon from "../../../assets/images/dash.svg";

// import {
//   DownloadCompanyExternalDocuments,
//   GetEmployeDetailById,
//   UnlinkDevicefromUser,
// } from "../../../reduxToolkit/Contractor/ContractorApi";
// import { employeDetailById } from "../../../reduxToolkit/Contractor/ContractorSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import i18next, { t } from "i18next";
// import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

// const EmployeContractDetail = () => {
//   let navigate = useNavigate();
//   const dispatch = useDispatch();
//   let { id } = useParams();
//   /*author mazhar iqbal
//     Employee detail with documents 
//   */
//   const getEmployeDetailById = useSelector(employeDetailById);

//   const unlinkDevice = () => {
//     /*author mazhar iqbal
//       unlink device using userID
//     */
//     dispatch(UnlinkDevicefromUser(getEmployeDetailById?.user?.id));
//   };

//   useEffect(() => {
//     /*author mazhar iqbal
//       get employee detail and documents 
//     */
//     dispatch(GetEmployeDetailById(id));
//   }, []);

//   const [userRemoveModal, setuserRemoveModal] = useState(false);
//   function UserRemove(props) {
//     return (
//       <div className="primary-modal">
//         <Modal
//           {...props}
//           size="md"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//           style={{ background: "rgba(0,0,0,0.5)" }}
//         >
//           <button onClick={props.onHide} className="modal-close-btn">
//             X
//           </button>
//           <span className="main-modal-heading">{t("unlink_device")}</span>
//           <div className="unlink-modal-body">
//             <span
//               className="modal-desc-text"
//               style={{ color: "#000", fontSize: "14px", fontWeight: 400 }}
//             >
//               {t("unlink_confirmation_msg")}
//             </span>

//             <div className="btn-div">
//               <button
//                 className="button-sec btn-cancel"
//                 style={{ color: "red" }}
//                 onClick={props.onHide}
//               >
//                 {t("cancel")}
//               </button>
//               <button
//                 className="button-sec btn-confirm"
//                 onClick={() => {
//                   unlinkDevice();
//                   setuserRemoveModal(false);
//                 }}
//               >
//                 {t("change")}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     );
//   }
//   return (
//     <>
//       <div className="head">
//         <div className="headLeft mt-3 addcontractor">
//           <Link to="/dashboard/contractor/search-employe">
//             <i className="fa fa-arrow-left" aria-hidden="true" style={{
//               transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
//               margin: "0 10px"
//             }}></i>
//           </Link>
//           <h2> {t("employee_details")}</h2>
//         </div>
//       </div>
//       <div className="employe-contract-detail" style={{ height: "492px" }}>
//         <div className="employe-contract-detail__employe">
//           {getEmployeDetailById?.user?.selfie ? (
//             <img
//               src={`data:image/png;base64,${getEmployeDetailById?.user?.selfie}`}
//               className="ecd__img"
//               alt="user pic"
//             />
//           ) : (
//             <img src={UserDemoImg} className="ecd__img" alt="user pic" />
//           )}
//           {getEmployeDetailById?.user?.status?.id == 2 ? (
//             <span
//               className="viewcard-container__status"
//               style={{ color: "#FEDE00" }}
//             >
//               {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}
//               <FiberManualRecordIcon sx={{ fontSize: 40 }} />
//             </span>
//           ) : null}

//           {getEmployeDetailById?.user?.status?.id == 3 ? (
//             <span
//               className="viewcard-container__status "
//               style={{ color: "#006594" }}
//             >
//               {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}
//               <FiberManualRecordIcon />
//             </span>
//           ) : null}
//           {getEmployeDetailById?.user?.status?.id == 4 ? (
//             <span className="viewcard-container__status employe-status-Vacation">
//               {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}{" "}
//               <FiberManualRecordIcon />
//             </span>
//           ) : null}
//           {getEmployeDetailById?.user?.status?.id == 5 ? (
//             <span
//               className="viewcard-container__status"
//               style={{ color: "orange" }}
//             >
//               {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}{" "}
//               <FiberManualRecordIcon />
//             </span>
//           ) : null}
//           {getEmployeDetailById?.user?.status?.id == 6 ? (
//             <span
//               className="viewcard-container__status"
//               style={{ color: "red" }}
//             >
//               {getEmployeDetailById?.user?.status?.name.replaceAll("_", " ")}{" "}
//               <FiberManualRecordIcon style={{ color: "red" }} />
//             </span>
//           ) : null}
//           <div className="ecd" style={{ marginTop: "70px" }}>
//             <span className="ecd__title">{t("name")}</span>
//             <span className="ecd__desc">
//               {getEmployeDetailById?.user?.name}
//             </span>
//           </div>
//           <div className="ecd">
//             <span className="ecd__title">{t("email")}</span>
//             <span className="ecd__desc">
//               {getEmployeDetailById?.user?.email}
//             </span>
//           </div>
//           <div className="ecd">
//             <span className="ecd__title">{t("phone_number")}</span>
//             <span className="ecd__desc">
//               {getEmployeDetailById?.user?.phoneNumber}
//             </span>
//           </div>
//           <div className="ecd">
//             <span className="ecd__title">{t("gender")}</span>
//             <span className="ecd__desc">
//               {getEmployeDetailById?.user?.gender?.name
//                 ? getEmployeDetailById?.user?.gender?.name
//                 : "-"}
//             </span>
//           </div>
//         </div>
//         <div
//           className="employe-contract-detail__docs"
//           style={{ width: "calc(100% - 400px)", position: "relative" }}
//         >
//           <div className="add-new-employe">
//             <button
//               className="edit-profile-save-btn"
//               onClick={() =>
//                 navigate(
//                   `/dashboard/edit-profile/${getEmployeDetailById?.user?.id}`
//                 )
//               }
//             >
//               {t("update_information")}
//               <span>
//                 <SaveIcon />
//               </span>
//             </button>
//             <button
//               className="edit-profile-save-btn"
//               style={{ background: "#BC0000", right: "270px" }}
//               onClick={() => setuserRemoveModal(true)}
//             >
//               {t("unlink_device")}
//               <span>
//                 <SaveIcon />
//               </span>
//             </button>
//           </div>
//           <div
//             className="add-new-employe__document"
//             style={{ height: "492px", overflowY: "scroll" }}
//           >
//             <UserRemove
//               show={userRemoveModal}
//               onHide={() => setuserRemoveModal(false)}
//             />

//             <span className="add-new-employe__document__heading">
//               {t("documents")}
//             </span>
//             <Grid container sx={{ my: "10px" }}>
//               <Grid item xs={6}>
//                 <span className="add-new-employe__title">{t("file_name")}</span>
//               </Grid>
//               <Grid item xs={3}>
//                 <span
//                   className="add-new-employe__type"
//                   style={{ textAlign: "center" }}
//                 >
//                   {t("file")}
//                 </span>
//               </Grid>
//               <Grid item xs={3}>
//                 <span className="add-new-employe__type">{t("approve")}</span>
//               </Grid>
//             </Grid>

//             {getEmployeDetailById?.documents &&
//               getEmployeDetailById?.documents?.length > 0 ? (
//               getEmployeDetailById.documents?.map((item) => {
//                 return (
//                   <div className="add-new-employe__document--detail">
//                     <Grid container spacing={3}>
//                       <Grid item xs={6}>
//                         <div className="name">
//                           {item?.companyDocumentExternal?.path ? (
//                             <>
//                               <span className="add-new-employe__filelabel">
//                                 <b>{item?.companyDocumentExternal?.path}</b>
//                               </span>
//                               <span
//                                 onClick={() => {
//                                   /*author mazhar iqbal
//                                     download company external documents 
//                                   */
//                                   dispatch(
//                                     DownloadCompanyExternalDocuments({
//                                       id: item?.companyDocumentExternal?.id,
//                                       option: "company_document_external",
//                                     })
//                                   );
//                                 }}
//                                 className="add-new-employe__filelabel"
//                                 style={{
//                                   fontSize: "10px",
//                                   fontWeight: "400",
//                                   letterSpacing: "1px",
//                                   marginTop: "-4px",
//                                   textDecoration: "underline",
//                                 }}
//                               >
//                                 {t("click_to_download_file")}
//                               </span>
//                             </>
//                           ) : (
//                             <TextField size="small"
//                               fullWidth


//                               label={
//                                 item?.companyDocumentExternal?.document
//                                   ? item?.companyDocumentExternal?.document
//                                   : "-"
//                               }
//                               value={item?.document}
//                               name={item?.userId}
//                               disabled
//                               InputLabelProps={{
//                                 style: {
//                                   fontSize: "12px",
//                                   fontWeight: 600,
//                                   background: "#ffffff",
//                                   padding: "0px 8px 0px 8px",
//                                   letterSpacing: "1px",
//                                 },
//                               }} // font size of input label
//                               inputProps={{
//                                 sx: {
//                                   border: "none",
//                                   outline: "none",
//                                   fontSize: "12px",
//                                   letterSpacing: "0px",
//                                   color: "#707070",
//                                   "&::placeholder": {
//                                     color: "#707070",
//                                     fontSize: "8px",
//                                   },
//                                 },
//                               }}
//                             />
//                           )}
//                         </div>
//                       </Grid>

//                       <Grid item xs={3}>
//                         {item?.path ? (
//                           <button className="add-new-employe__filename d-flex">
//                             <img
//                               src={
//                                 item?.companyDocumentExternal?.path
//                                   ?.split(".")
//                                   .pop() === "pdf"
//                                   ? pdf_image
//                                   : item?.companyDocumentExternal?.path
//                                     ?.split(".")
//                                     .pop() === "xlsx"
//                                     ? excel_image
//                                     : item?.companyDocumentExternal?.path
//                                       ?.split(".")
//                                       .pop() === "docx" ||
//                                       item?.companyDocumentExternal?.path
//                                         ?.split(".")
//                                         .pop() === "pptx"
//                                       ? word_image
//                                       : pdf_image
//                               }
//                               style={{ width: "16px", height: "16px" }}
//                               alt="imgs"
//                             />
//                             <span
//                               style={{
//                                 display: "inline-block",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {item?.path}
//                             </span>
//                             <GetAppIcon
//                               className="mt-0"
//                               onClick={() => {
//                                 dispatch(
//                                   /*author mazhar iqbal
//                                     download external documents 
//                                   */
//                                   DownloadCompanyExternalDocuments({
//                                     id: item?.id,
//                                     option: "document_external",
//                                   })
//                                 );
//                               }}
//                             />
//                           </button>
//                         ) : (
//                           <p
//                             className="noFile"
//                             style={{
//                               textDecoration: "underline",
//                               display: "flex",
//                               justifyContent: "center",
//                             }}
//                           >
//                             {t("no_file")}
//                           </p>
//                         )}
//                       </Grid>
//                       <Grid
//                         item
//                         xs={3}
//                         style={{ display: "flex", justifyContent: "end" }}
//                       >
//                         {item?.status?.id === 19 && (
//                           <>
//                             <i
//                               style={{ color: "green" }}
//                               class="fa fa-check"
//                               aria-hidden="true"
//                             ></i>
//                           </>
//                         )}
//                         {item?.status?.id === 20 && (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               alignItems: "end",
//                             }}
//                           >
//                             <i
//                               style={{ color: "red" }}
//                               class="fa fa-times"
//                               aria-hidden="true"
//                             ></i>
//                             <p style={{ color: "red", fontSize: "12px" }}>
//                               {item?.comment?.length > 20
//                                 ? `${item?.comment?.substring(0, 20)}...`
//                                 : item?.comment}
//                             </p>
//                           </div>
//                         )}

//                         {item?.status?.id === 18 && (
//                           <>
//                             <img src={dashIcon} style={{ width: "20px" }} />
//                           </>
//                         )}
//                         {item?.id == null && (
//                           <p className="">{t("pending_to_upload")}</p>
//                         )}
//                       </Grid>
//                     </Grid>
//                   </div>
//                 );
//               })
//             ) : (

//               <NotFoundDataWarning text={t("no_documents")} />

//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmployeContractDetail;


import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import personPng from "../../../assets/defaultImages/userDef.svg";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import DocumentStatusThree from "../../../components/DocumentStatusThree";
import { DownloadProviderImage  } from "../../../reduxToolkit/Providers/providersApi";
import DeleteModal from "../../Modals/DeleteModal";
import genderId from "../../../hooks/genderId";
import UnlinkDeviceChangeModal from "../../Provider/Modal/UnlinkDeviceChangeModal";
import { CreateContractorDocValue, GetContractorEmployeeDetail, SetContractorDocValue } from "../../../reduxToolkit/Contractor/ContractorApi";


const EmployeContractDetail = ({ approveDocument }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const {id} = useParams();
  
  // use State
  const dispatch = useDispatch();
  const [selectDocumentsForDelete, setSelectDocumentsForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteDocShow, setDeleteDocShow] = useState(false)
  const [unlinkShow, setUnlinkShow] = useState(false)
  // use Selector
  const { getContractorEmployeeDetail,updateContractorUserRelationship,
    createContractorDocValue,setContractorDocValue
   } = useSelector(state => state?.ContractorSlice)
  const { uploadImg, changeCount } = useSelector(state => state.sharedSlice)

  useEffect(() => {
    dispatch(GetContractorEmployeeDetail(id))
  }, [createContractorDocValue,setContractorDocValue, uploadImg, changeCount,updateContractorUserRelationship])


  return (
    <>
      {/* head with back link */}
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/contractor/search-employe">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}

            ></i>
          </Link>
          <h2>
            {  approveDocument  ? t("complete_documents"):t('employee_details')}
          </h2>
        </div>
        <div className="container-top-right-btns">
          {
            !approveDocument &&
            <button className="unlink-btn-1"
              onClick={() => setUnlinkShow(true)}
            >
              <i class="fa fa-mobile" aria-hidden="true"></i>
              {t("unlink_device")}
            </button>
          }


          <Link 
          to={`/dashboard/contractor/update-employee/${getContractorEmployeeDetail?.user?.id}`}
          >
            <button className="add-btn-1"  
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {t("update")}
            </button>

          </Link>
          {
            approveDocument &&
            <button className="delete-btn-1"

              
              onClick={() => {
                // setDeleteDocShow(true)
              }}

            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              {t('delete')}
            </button>
          }
        </div>
      </div>
      <div className="row employee_provider_detail_flow"
        style={{ gap: lCode === "ar" ? "1rem" : "" }}
      >


        <div className="col-md-3 __userData ">
          <img src={
            getContractorEmployeeDetail?.user?.selfie ? `data:image/png;base64,${getContractorEmployeeDetail?.user?.selfie}`
              : personPng} className="__userImage"

          />
          <div className="__body">
            <p>{t("name")}</p>
            <span>
              {
                getContractorEmployeeDetail?.user?.name ?
                  getContractorEmployeeDetail?.user?.name
                  + " " +
                  getContractorEmployeeDetail?.user?.secondLastName + " " +
                  getContractorEmployeeDetail?.user?.lastName
                  : "-"
              }
            </span>
            <p className="ishead">{t("email")}</p>
            <span>{getContractorEmployeeDetail?.user?.email}</span>
            <p className="ishead">{t("phone_number")}</p>
            <span>{getContractorEmployeeDetail?.user?.phoneNumber}</span>

            <p className="ishead">{t("gender")}</p>
            <span>{getContractorEmployeeDetail?.user?.genderId ? genderId(getContractorEmployeeDetail?.user?.genderId) : "-----"}</span>
          </div>
        </div>
        <div className="col-md-8  documents_status_item">

          <div className="document_header">

            <p className="document_title">{t("documents")}</p>
            {
              approveDocument &&
              <button className="delete-btn-1"

                disabled={selectDocumentsForDelete?.length === 0}
                onClick={() => {
                  setDeleteDocShow(true)
                }}

              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
                {t('delete')}
              </button>
            }
          </div>
          <DocumentStatusThree
            dataTable={getContractorEmployeeDetail?.documents}
            approve={approveDocument}
            setDocValue={SetContractorDocValue}
            createDocValue={CreateContractorDocValue}
            downloadImg={DownloadProviderImage}
            optionDownload={"contractor_document"}
            isAllChecked={isAllChecked}
            setIsAllChecked={setIsAllChecked}
            selectDocumentsForDelete={selectDocumentsForDelete}
            setSelectDocumentsForDelete={setSelectDocumentsForDelete}

          />
        </div>
      </div>

      <DeleteModal
        title_modal={t("delete_document")}
        data={selectDocumentsForDelete}
        show={deleteDocShow}
        onHide={() => setDeleteDocShow(false)}
      />
      <UnlinkDeviceChangeModal
        show={unlinkShow}
        onHide={() => setUnlinkShow(false)}
      />
    </>
  );
};

export default EmployeContractDetail;
