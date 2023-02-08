import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../../assets/images/person.png";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsEmployeeProviderEmployee, DownloadEmployeeProviderOrderFiles, GetAllProviderDocuments } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { useDispatch } from "react-redux";
// import ApproveDenyModal from "./ProviderModels/ApproveDenyModal";
// import ProviderDropDown from "./SubComponents/providerDropDown";
import NotFoundAnything from "../../../components/NotFoundAnything";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import { GetEmployeeContractorById } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";

const ProviderOrderDetail = ({ employeeDetailsFlag, approveDocumentFlag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [filePresent, setfilePresent] = useState(true);
  const [fileIdPresent, setfileIdPresent] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState(false);
  const [approveDocument, setapproveDocument] = useState(false);
  console.log({ employeeDetailsFlag }, { approveDocumentFlag });

  const { detailEmployeeProviderEmployee } = useSelector(state => state.EmployeeProviderSlice);
  console.log(detailEmployeeProviderEmployee);
  const { getAllProviderDocuments } = useSelector(state => state.EmployeeProviderSlice);
  console.log(getAllProviderDocuments);
  const { getEmployeeContractorById } = useSelector(state => state.EmployeeContractorsSlice);
  console.log(getEmployeeContractorById);

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
      id: localStorage.getItem("cid")
    }
    dispatch(GetAllProviderDocuments(localStorage.getItem("userId")));
    dispatch(GetEmployeeContractorById(data))

    // dispatch(DetailsEmployeeProviderEmployee(localStorage.getItem("employeeProviderDetail")))

  }, []);

  return (
    <>
      <div className="head">
        <div className="headLeft">
          <h2>
            {/* <Link to="/dashboard/employee/providers/order-details"> */}
            <ArrowBackIcon
              onClick={() => goBack()}
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
            {/* </Link> */}
            {employeeDetails && "Employee PROVIDER Detail "}
            {approveDocument && "APPROVE DOCUMENTS"}
          </h2>
        </div>
      </div>
      <div className="row employee_provider_detail">
        <div className="col-md-4 __userData">
          <img src={personPng} className="__userImage" />
          <div className="__body">
            <p>Name</p>
            <span>{employeeDetails && detailEmployeeProviderEmployee?.user?.name || approveDocument && getEmployeeContractorById?.user?.name}</span>
            <p className="ishead">Email</p>
            <span> {employeeDetails && detailEmployeeProviderEmployee?.user?.email || approveDocument && getEmployeeContractorById?.user?.email}</span>
            <p className="ishead">Phone Number</p>
            <span>{employeeDetails && detailEmployeeProviderEmployee?.user?.phoneNumber || approveDocument && getEmployeeContractorById?.user?.phoneNumber}</span>
            <p className="ishead">Password</p>
            <span>**************</span>
            <p className="ishead">Gender</p>
            <span>{employeeDetails && detailEmployeeProviderEmployee?.user?.gender?.name || approveDocument && getEmployeeContractorById?.user?.gender?.name}</span>
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
                  <p style={{ width: approveDocument && "40%" }}>FileName</p>
                  <p>File</p>
                  {approveDocument && <p >Options</p>}



                </div>
                {detailEmployeeProviderEmployee?.documents?.map((item) => {
                  const date = new Date(item?.companyDocumentExternal?.createdAt);
                  return (
                    <div className="__body">
                      <div className="__file">
                        <div className="__name">
                          <p>{item?.companyDocumentExternal?.document}</p>
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
                          <p className="noFile">NO FILE</p>
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
                <p>No Documents Found</p>
              </div>
          }

          {

            !employeeDetails && getAllProviderDocuments?.length > 0 ?
              <>
                <div
                  className="__header"
                  style={{ paddingRight: approveDocument === false && "40px" }}
                >
                  <p style={{ width: approveDocument && "40%" }}>FileName</p>
                  <p>File</p>
                  {approveDocument && <p>Options</p>}


                </div>
                {getAllProviderDocuments?.map((item) => {
                  const date = new Date(item?.createdAt);

                  return (
                    <>
                      <div className="__body">
                        <div className="__file">
                          <div className="__name">
                            <p>{item?.companyDocumentExternal?.document?.substring(0, 25)}</p>
                            {item?.document && <span>{item?.document}</span>}
                          </div>
                          {item?.path ? (
                            <div className="__file_icon">
                              <img src={file} />
                              <div style={{ paddingLeft: "10px" }}>
                                <p>
                                  {/* nss_leca-pdf */}
                                  {item?.path}
                                </p>
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
                            <p className="noFile">NO FILE</p>
                          )}
                          {/* {approveDocument && <MoreHorizIcon />} */}
                          {
                            item?.status?.id === 19 &&
                            <>
                              <i style={{ color: 'green' }} class="fa fa-check" aria-hidden="true"></i>
                            </>
                          }
                          {
                            item?.status?.id === 20 &&
                            <div style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                              <i style={{ color: 'red' }} class="fa fa-times" aria-hidden="true"></i>
                              <p style={{ color: 'red', fontSize: '12px' }}>{

                                item?.comment?.length > 20 ?
                                  `${item?.comment?.substring(0, 20)}...` : item?.comment
                              }</p>
                            </div>
                          }
                          {/* {
                            item?.status?.id == null || item?.path == null &&
                            <>
                              <i style={{ color: 'red' }} class="fa fa-ban" aria-hidden="true"></i>
                            </>
                          } */}
                          {
                            item?.status?.id === 18 && item?.path == null &&
                            <>
                              <i style={{ color: 'red' }} class="fa fa-ban" aria-hidden="true"></i>
                            </>
                          }
                          {
                            item?.id == null &&
                            <p className="">Upload Document</p>
                          }

                          {
                            item?.status?.id === 18 &&
                            <>
                              {/* <ProviderDropDown dropDownProps={dropDownProps} onShow={() => setShowModal(true)} documentId={item?.id} /> */}
                            </>
                          }


                        </div>
                      </div>
                      {/* <ApproveDenyModal show={showModal} onHide={() => setShowModal(false)} documentId={item?.id} /> */}
                    </>
                  )
                })}
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
