import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ic_check from "../../../assets/images/ic-check.svg";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DownloadEmployeeProviderOrderFiles, GetAllProviderDocuments } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import ProviderDropDown from "./SubComponents/providerDropDown";
import ApproveDenyModal from "./ProviderModels/ApproveDenyModal";
import { getBottomNavigationUtilityClass } from "@mui/material";
import { t } from "i18next";


const ZoneCardDetail = ({ item }) => {
  const [filePresent, setfilePresent] = useState(true);
  const [fileIdPresent, setfileIdPresent] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch()
  const { getAllProviderDocuments } = useSelector(state => state.EmployeeProviderSlice);
  console.log(getAllProviderDocuments);
  const { approveExternalDocument } = useSelector(state => state.EmployeeProviderSlice);
  console.log(approveExternalDocument);


  const dropDownProps = {
    panel: 'providerFileOption',
    firstItem: 'DOWNLOAD FILE',
    secondItem: 'VIEW DETAILS '
  }

  useEffect(() => {
    dispatch(GetAllProviderDocuments(localStorage.getItem("userId")))
  }, [approveExternalDocument])


  return (
    <>
      <div className="row ">
        <div className="col-md-12 provider_details_page_container">
          {
            <>
              <div
                className="__header"
              >
                <p style={{ width: "40%" }}>{t("file_name")}</p>
                <p>{t("file")}</p>
                {<p>{t("options")}</p>}
              </div>
              {item?.documents?.map((item) => {
                const date = new Date(item?.createdAt);

                return (
                  <>
                    <div className="__body">
                      <div className="__file">
                        <div className="__name">
                          <p>{item?.companyDocumentExternal?.document}</p>
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
                          <p className="noFile">{t("no_file")}</p>
                        )}

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
                        {
                          item?.id == null &&
                          <p className="">{t("upload_document")}</p>
                        }
                        {/* {
                          (item?.status?.id === 18 || item?.status?.id == null) && item?.path == null &&
                          <>
                            <i style={{ color: 'red' }} class="fa fa-ban" aria-hidden="true"></i>
                          </>
                        } */}
                        {
                          item?.status?.id === 18 &&
                          <>
                            <ProviderDropDown dropDownProps={dropDownProps} onShow={() => setShowModal(true)} documentId={item?.id} />
                          </>
                        }
                      </div>
                    </div>
                    <ApproveDenyModal show={showModal} onHide={() => setShowModal(false)} documentId={item?.id} />
                  </>
                )
              })}
            </>
          }
        </div>
      </div>
    </>
  );
};

export default ZoneCardDetail;
