import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../../assets/images/person.png";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsEmployeeProviderEmployee, DownloadEmployeeProviderOrderFiles } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { useDispatch } from "react-redux";
import { t } from "i18next"
// import ApproveDenyModal from "./ProviderModels/ApproveDenyModal";
// import ProviderDropDown from "./SubComponents/providerDropDown";
import NotFoundAnything from "../../../components/NotFoundAnything";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import { DetailsEmployeeContractorEmployee, GetAllContractorDocuments, GetEmployeeContractorById } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import DocumentTable from "../../Modals/DocumentTable";

const ProviderOrderDetail = ({ employeeDetailsFlag, approveDocumentFlag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams()
  const goBack = () => navigate(-1);

  const [filePresent, setfilePresent] = useState(true);
  const [fileIdPresent, setfileIdPresent] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState(false);
  const [approveDocument, setapproveDocument] = useState(false);


  const { getEmployeeContractorById,detailsEmployeeContractorEmployee,getAllContractorDocuments } = useSelector(state => state.EmployeeContractorsSlice);

  console.log(getAllContractorDocuments)
  const [showModal, setShowModal] = useState(false);

  const onHide = () => {
    setShowModal(false)
  }

  const onShow = () => {
    setShowModal(false)
  }

  useEffect(() => {
    setEmployeeDetails(employeeDetailsFlag);
    setapproveDocument(approveDocumentFlag);
    const data = {
      id: params?.id
    }
    dispatch(GetAllContractorDocuments(localStorage.getItem("userId")));
    dispatch(GetEmployeeContractorById(data))
    dispatch(DetailsEmployeeContractorEmployee(params?.id))

  }, []);

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
            <span>{employeeDetails && detailsEmployeeContractorEmployee?.user?.name || approveDocument && getEmployeeContractorById?.user?.name}</span>
            <p className="ishead">Email</p>
            <span> {employeeDetails && detailsEmployeeContractorEmployee?.user?.email || approveDocument && getEmployeeContractorById?.user?.email}</span>
            <p className="ishead">Phone Number</p>
            <span>{employeeDetails && detailsEmployeeContractorEmployee?.user?.phoneNumber || approveDocument && getEmployeeContractorById?.user?.phoneNumber}</span>
            <p className="ishead">Password</p>
            <span>**************</span>
            <p className="ishead">Gender</p>
            <span>{employeeDetails && detailsEmployeeContractorEmployee?.user?.gender?.name || approveDocument && getEmployeeContractorById?.user?.gender?.name}</span>
          </div>
        </div>
        <div className="col-md-7 employee_files_details">
          {

            !approveDocument && detailsEmployeeContractorEmployee?.documents?.length > 0 ?
              <>
                <DocumentTable dataTable={detailsEmployeeContractorEmployee?.documents} approve={false} optionDownload="document_external"/>
              </>
              : !approveDocument &&
              <div className="no_document">
                <i class="fa fa-file" aria-hidden="true"></i>
                <p>No Documents Found</p>
              </div>
          }

          {

            !employeeDetails && getAllContractorDocuments?.length > 0 ?
              <>
                <DocumentTable dataTable={getAllContractorDocuments} approve={true} optionDownload="document_external"/>
                {/* <ApproveDenyModal show={showModal} onHide={() => setShowModal(false)} documentId={item?.id} /> */}
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
