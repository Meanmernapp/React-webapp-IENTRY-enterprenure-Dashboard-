import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../../assets/images/person.png";
import file from "../../../assets/images/file.png";
import downloadIcon from "../../../assets/icon/DownloadIcon.svg";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsEmployeeProviderEmployee, DownloadEmployeeProviderOrderFiles, GetAllProviderDocuments, GetEmployeeProviderById } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { useDispatch } from "react-redux";
import { t } from "i18next"
import ApproveDenyModal from "./ProviderModels/ApproveDenyModal";
import ProviderDropDown from "./SubComponents/providerDropDown";
import NotFoundAnything from "../../../components/NotFoundAnything";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import DocumentTable from "../../Modals/DocumentTable";

const ProviderOrderDetail = ({ employeeDetailsFlag, approveDocumentFlag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [filePresent, setfilePresent] = useState(true);
  const [fileIdPresent, setfileIdPresent] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState(false);
  const [approveDocument, setapproveDocument] = useState(false);
  const [documentModalId, setDocumentModalId] = useState("")
  console.log({ employeeDetailsFlag }, { approveDocumentFlag });

  const { detailEmployeeProviderEmployee } = useSelector(state => state.EmployeeProviderSlice);
  console.log(detailEmployeeProviderEmployee);
  const { getAllProviderDocuments } = useSelector(state => state.EmployeeProviderSlice);
  console.log(getAllProviderDocuments);
  const { getEmployeeProviderById, approveExternalDocument } = useSelector(state => state.EmployeeProviderSlice);

  console.log(getEmployeeProviderById);

  const [showModal, setShowModal] = useState(false);

  


  const onHide = () => {
    setShowModal(false)
  }

  const onShow = () => {
    setShowModal(false)
  }


  const dropDownProps = {
    panel: 'providerFileOption',
    firstItem: 'DOWNLOAD FILE',
    secondItem: 'VIEW DETAILS '
  }

  useEffect(() => {
    setEmployeeDetails(employeeDetailsFlag);
    setapproveDocument(approveDocumentFlag);
    const data = {
      id: localStorage.getItem("pid")
    }
    dispatch(GetAllProviderDocuments(localStorage.getItem("userId")));
    dispatch(GetEmployeeProviderById(data))

    dispatch(DetailsEmployeeProviderEmployee(localStorage.getItem("employeeProviderDetail")))

  }, [approveExternalDocument]);

  return (
    <>
      <div className="head">
        <div className="headLeft">
          <h2>
            {/* <Link to="/dashboard/employee/suppliers/order-details"> */}
            <ArrowBackIcon
              onClick={() => goBack()}
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
            {/* </Link> */}
            {employeeDetails && t("employee_supplier_detail")}
            {approveDocument && "APPROVE DOCUMENTS"}
          </h2>
        </div>
      </div>
      <div className="row employee_provider_detail">
        <div className="col-md-4 __userData">
          <img src={personPng} className="__userImage" />
          <div className="__body">
            <p>Name</p>
            <span>{employeeDetails && detailEmployeeProviderEmployee?.user?.name || approveDocument && getEmployeeProviderById?.user?.name}</span>
            <p className="ishead">Email</p>
            <span> {employeeDetails && detailEmployeeProviderEmployee?.user?.email || approveDocument && getEmployeeProviderById?.user?.email}</span>
            <p className="ishead">Phone Number</p>
            <span>{employeeDetails && detailEmployeeProviderEmployee?.user?.phoneNumber || approveDocument && getEmployeeProviderById?.user?.phoneNumber}</span>
            <p className="ishead">Password</p>
            <span>**************</span>
            <p className="ishead">Gender</p>
            <span>{employeeDetails && detailEmployeeProviderEmployee?.user?.gender?.name || approveDocument && getEmployeeProviderById?.user?.gender?.name}</span>
          </div>
        </div>
        <div className="col-md-7 employee_files_details">
          {

            !approveDocument && detailEmployeeProviderEmployee?.documents?.length > 0 ?
              <>
                <div
                  className="__header"
                  style={{ paddingRight: approveDocument === false && "40px" }}
                >
                  <p style={{ width: approveDocument && "40%" }}>{t("file_name")}</p>
                  <p>{t("file")}</p>
                  {approveDocument && <p >{t("options")}</p>}



                </div>
                {detailEmployeeProviderEmployee?.documents?.map((item) => {
                  const date = new Date(item?.createdAt);
                  return (
                    <div className="__body">
                      <div className="__file">
                        <div className="__name">
                          <p>{item?.companyDocument?.slice(0, 15) + '...'}</p>
                          {fileIdPresent && <span>{item?.document}</span>}
                        </div>
                        {item?.path ? (
                          <div className="__file_icon">
                            <img src={file} />
                            <div style={{ paddingLeft: "10px" }}>
                              {/* name of the document in p */}
                              <p>{item?.path}</p>
                              <span>{date.toLocaleString('en-GB')}</span>
                            </div>
                            <DownloadIcon className="download_icon" onClick={() => {
                              const data = {
                                option: 'document_external',
                                id: item?.id
                              }
                              dispatch(DownloadEmployeeProviderOrderFiles(data))
                            }} />
                          </div>
                        ) : (
                          <p className="noFile">{t("no_file")}</p>
                        )}
                        {approveDocument && <MoreHorizIcon />}
                      </div>
                    </div>
                  )
                })}
              </>
              : !approveDocument &&
              <div className="no_document">
                <i class="fa fa-file" aria-hidden="true"></i>
                <p>{t("no_document_found")}</p>
              </div>
          }

          {

            !employeeDetails && getAllProviderDocuments?.length > 0 ?
              <>
          
                <DocumentTable 
                dataTable={getAllProviderDocuments} 
                approve={true} 
                documentId={setDocumentModalId} 
                optionDownload="document_external"/>
                <ApproveDenyModal show={showModal} onHide={() => setShowModal(false)} documentId={documentModalId} />
              </>
              :
              !employeeDetails &&
              <NotFoundDataWarning text={"No Documents"} />
          }

        </div>
      </div>
    </>
  );
};

export default ProviderOrderDetail;
