import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import { useLocation } from "react-router-dom";
import apiInstance from "../../../Apis/Axios";
import emptyList from "../../../assets/images/warning.svg";
import { toast } from "react-toastify";
import dashIcon from "../../../assets/images/dash.svg";

import {
  ContractorDownloadDocuments,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { useDispatch } from "react-redux";

import ApproveContractorDocument from "./SubComponents/ApproveContractorDocumentOptionMenu";
import { Grid } from "@mui/material";
import profileDemo from "../../../assets/images/userDemoImg.png";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";



let docID;
const ContractorEmployeDetails = () => {
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigate = useLocation();
  // console.log("Asdasd", navigate);
  let { state } = navigate;
  let contractId = state?.state?.id;
  let path = state?.approveDoc ? true : false;

  const [fileIdPresent, setfileIdPresent] = useState(true);
  const [approveDocument, setapproveDocument] = useState(path);

  const [contractDetail, setContractDetail] = useState();
  const [contractorDocument, setContractorDocument] = useState();

  const getContractorDetail = async () => {
    await apiInstance
      .get(`contractor-employee-service/company/get-by-user-id/${contractId}`)
      .then(function (response) {
        if (response.status == 200) {
          setContractDetail(response?.data?.data);
          docID = response?.data?.data?.user?.id;
          getContractorDocument();
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };
  /*author mazhar iqbal
    get Employee documents detail
  */
  const getContractorDocument = async () => {
    await apiInstance
      .get(`document-service/external/get-all/by-user-id/${docID}`)
      .then(function (response) {
        setContractorDocument(response?.data?.data);
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  useEffect(() => {
    /*author mazhar iqbal
      get Employee detail
    */
    getContractorDetail();
  }, []);

  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to={"/dashboard/employee/contractors"}>
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>EMPLOYEE CONTRACT DETAIL</h2>
        </div>
      </div>
      <div
        className="row employee_provider_detail"
        style={{ marginTop: "108px" }}
      >
        <div className="col-md-4 __userData">
          {contractDetail?.user?.selfie ? (
            <img
              src={`data:image/png;base64,${contractDetail?.user?.selfie}`}
              className="__userImage"
              alt="image"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <img src={profileDemo} className="__userImage" />
          )}

          <div className="__body">
            <p>{t("name")}</p>
            <span>
              {contractDetail?.user?.name ? contractDetail?.user?.name : "-"}
            </span>
            <p className="ishead">{t("email")}</p>
            <span>
              {" "}
              {contractDetail?.user?.email ? contractDetail?.user?.email : "-"}
            </span>
            <p className="ishead">{t("phone_number")}</p>
            <span>
              {contractDetail?.user?.phoneNumber
                ? contractDetail?.user?.phoneNumber
                : "-"}
            </span>
            <p className="ishead">Password</p>
            <span>**************</span>
            <p className="ishead">{t("gender")}</p>
            <span>
              {contractDetail?.user?.gender?.name
                ? contractDetail?.user?.gender?.name
                : "-"}
            </span>
          </div>
        </div>
        <div
          className="col-md-7 employee_files_details"
          style={{ height: "492px" }}
        >
          <div
            className="__header"
            style={{ paddingRight: approveDocument === false && "40px" }}
          >
            <Grid container justifyContent={"space-between"}>
              <Grid item >
                <p style={{ width: approveDocument && "40%" }}>{t("filename")}</p>
              </Grid>
              <Grid item  >
                <p>{t("file")}</p>
              </Grid>
              {/* <Grid item xs={3}>
                {approveDocument && <p>{t("options")}</p>}
              </Grid> */}
            </Grid>
          </div>
          {contractorDocument && contractorDocument?.length != 0 ? (
            contractorDocument.map((item) => {
              const date = new Date(item?.createdAt);
              return (
                <div className="__body">
                  <div className="__file">
                    <Grid container justifyContent={"space-between"}>
                      <Grid item >
                        <div className="__name w-100">
                          <p>{item?.companyDocumentExternal?.document}</p>
                          {fileIdPresent && (
                            <span>
                              {item?.document ? item?.document : "-----"}
                            </span>
                          )}
                        </div>
                      </Grid>
                      <Grid item >
                        {item?.path && item?.id ? (
                          <div className="__file_icon">
                            <img src={file} />
                            <div style={{ paddingLeft: "10px" }}>
                              <p>{item?.path}</p>
                              <span>
                                {item?.createdAt ? (
                                  date.toLocaleString("en-GB")
                                ) : (
                                  <p className="noFile">{t("no_file")}</p>
                                )}
                              </span>
                            </div>
                            <DownloadIcon
                              className="download_icon"
                              onClick={() => {
                                const data = {
                                  option: "document_external",
                                  id: item?.id,
                                };
                                dispatch(ContractorDownloadDocuments(data));
                              }}
                            />
                          </div>
                        ) : (
                          <p className="noFile">{t("no_file")}</p>
                        )}
                      </Grid>
                      {/* <Grid item xs={3}>
                        {item?.status?.id === 19 && (
                          <>
                            <i
                              style={{ color: "green", float: "right" }}
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
                              style={{ color: "red", float: "right" }}
                              class="fa fa-times"
                              aria-hidden="true"
                            ></i>
                            <p
                              style={{
                                color: "red",
                                fontSize: "12px",
                                width: "75px",
                              }}
                            >
                              {item?.comment?.length > 20
                                ? `${item?.comment?.substring(0, 20)}...`
                                : item?.comment}
                            </p>
                          </div>
                        )}
                        {item?.status?.id === 18 && (
                          <div style={{ textAlign: "end" }}>
                            <img src={dashIcon} />
                          </div>
                        )}
                        {item?.id == null && (
                          <p className="">{t("upload_document")}</p>
                        )}
                        {item?.path && item?.status?.id === 18 && (
                          <div style={{ float: "right" }}>
                            <ApproveContractorDocument data={item?.id} />
                          </div>
                        )}
                      </Grid> */}
                    </Grid>
                  </div>
                </div>
              );
            })
          ) : (

            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
              <NotFoundDataWarning text={t("no_documents")} />
            </div>

          )}
        </div>
      </div>
    </>
  );
};

export default ContractorEmployeDetails;
