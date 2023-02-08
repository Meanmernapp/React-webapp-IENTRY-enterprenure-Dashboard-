import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../assets/images/person.png";
import jpg from "../../assets/images/jpg_image.png";
import png from "../../assets/images/png.png";
import excel_image from '../../assets/images/excel-image.png';
import pdf_image from '../../assets/images/pdf-image.png';
import word_image from '../../assets/images/word-image.png';
// import file from "../../assets/images/file.png";
import dash from "../../assets/images/Line 48.svg";
import icCheck from "../../assets/images/ic-check.svg";
import icCancel from "../../assets/images/ic-cancel.svg";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import UnlinkDeviceChangeModal from "./Modal/UnlinkDeviceChangeModal";
import { CheckProviderImage, CreateToExternal, createToExternal, DownloadCompanyFile, DownloadExternalFile, GetProviderEmployeeDetail, GetSingleProvider, SaveProviderImage, SetToExternal } from "../../reduxToolkit/Providers/providersApi";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { display } from "@mui/system";
import UploadFileModal from "./Modal/UploadFileModal";


const ProviderOrderDetail = ({ approveDocument }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  const dispatch = useDispatch();
  const [documentValue, setDocumentValue] = useState({});
  const [attachData, setAttachData] = useState({});


  const { getProviderEmployeeDetail } = useSelector(state => state?.providersSlice)
  // console.log(getProviderEmployeeDetail)

  const { checkProviderImage } = useSelector(state => state?.providersSlice)
  // console.log(checkProviderImage)

  const { getProviderImage } = useSelector(state => state?.providersSlice)
  // console.log(getProviderImage)

  const { downloadProviderImage } = useSelector(state => state?.providersSlice)
  // console.log(downloadProviderImage)

  const { createToExternal } = useSelector(state => state?.providersSlice)
  // console.log(createToExternal)
  const { setToExternal } = useSelector(state => state?.providersSlice)
  // console.log(setToExternal)

  // useEffect(() => {
  //   dispatch(CheckProviderImage(getProviderEmployeeDetail?.user?.id))
  // }, [])

  const handelDocmentValue = (item) => {
    const data = {
      user: {
        id: getProviderEmployeeDetail?.user?.id
      },
      document: documentValue[item],
      companyDocumentExternal: {
        id: item?.companyDocumentExternal?.id
      }
    }
    const setData = {
      id: item?.id,
      value: documentValue[item],
    }
    // console.log(data)

    if (item?.id != null) {
      dispatch(SetToExternal(setData))
      // alert("setValue")
    } else {
      // alert("createValue")
      dispatch(CreateToExternal(data))
    }

  }

  var binaryData = [];
  binaryData.push(downloadProviderImage)


  useEffect(() => {
    dispatch(GetProviderEmployeeDetail(localStorage.getItem("provideridfordetail")))
  }, [createToExternal, setToExternal])


  return (
    <>
      <div className="head">
        <div className="headLeft">
          <h2>
            <Link to="/dashboard/provider/employees">
              <ArrowBackIcon
                style={{
                  color: "#146F62",
                  fontSize: "30px",
                  marginRight: "30px",
                }}
              />
            </Link>
            {t("employee_details")}
          </h2>
        </div>
      </div>
      <div className="row employee_provider_detail">

        <div className="update_btn">


          {
            !approveDocument &&
            <button className="unlink"
              data-toggle="modal"
              data-target="#changeLinkDevice">
              {t("unlink_device")}<i class="fa fa-mobile" aria-hidden="true"></i>
            </button>
          }

          <UnlinkDeviceChangeModal />
          <Link to="/dashboard/provider/update-employee">
            <button
              onClick={() => { dispatch(GetSingleProvider(getProviderEmployeeDetail?.user?.id)) }}
            >{t("update_information")} <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
          </Link>
        </div>
        <div className="col-md-4 __userData">
          <img src={
            checkProviderImage == true ? window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
              // checkProviderImage == true ? URL?.createObjectURL(downloadProviderImage)
              : personPng} className="__userImage"
            style={{ width: '180px', height: '180px', borderRadius: '50%' }}
          />
          <div className="__body">
            <p>{t("name")}</p>
            <span>{getProviderEmployeeDetail?.user?.name}</span>
            <p className="ishead">{t("email")}</p>
            <span>{getProviderEmployeeDetail?.user?.email}</span>
            <p className="ishead">{t("phone_number")}</p>
            <span>{getProviderEmployeeDetail?.user?.phoneNumber}</span>

            <p className="ishead">Gender</p>
            <span>{getProviderEmployeeDetail?.user?.gender?.name ? getProviderEmployeeDetail?.user?.gender?.name : "-----"}</span>
          </div>
        </div>
        <div className="col-md-7 employee_files_details">
          <div
            className="__header"
            style={{ paddingRight: "40px" }}
          >
            <p style={{ width: approveDocument && "40%" }} >{t("file_name")}</p>
            <p>{t("file")}</p>
            {approveDocument && <p style={{ marginRight: "-49px" }}>{t("approve")}</p>}
          </div>
          {getProviderEmployeeDetail?.documents?.map((item, index) => {
            // console.log(item)
            const date = new Date(item?.companyDocumentExternal?.createdAt);

            return (
              <div className="__body">
                <div className="__file">
                  <div className="__name">
                    {
                      item?.companyDocumentExternal?.path == null &&
                      <Grid item xs={12} sx={{ display: 'flex' }}>
                        <TextField size="small"

                          fullWidth


                          label={item?.companyDocumentExternal?.document}
                          id={item?.companyDocumentExternal?.id}
                          // disabled={!approveDocument}
                          defaultValue={item?.document}

                          // value={!approveDocument ? item?.document : documentValue[item]}
                          // onChange={(e) => setDocumentValue(e.target.value)}
                          onChange={(e) => {
                            setDocumentValue((prev) => {
                              return { ...prev, [item]: e.target.value };
                            })
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: "10px",
                              fontWeight: 600,
                              background: "#ffffff",
                              padding: "0px 8px 0px 8px",
                            },
                          }} // font size of input label
                          inputProps={{
                            sx: {
                              border: "none",
                              outline: "none",
                              fontSize: "10px",
                              letterSpacing: "0px",
                              color: "#707070",
                              "&::placeholder": {
                                color: "#707070",
                                fontSize: "8px",
                              },
                            },
                          }}
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
                        {
                          approveDocument &&
                          <Box sx={{
                            // background: "#146F62 0% 0 % no - repeat padding- Box",
                            background: "#146F62",
                            borderRadius: "0px 4px 4px 0px",
                            opacity: "1",
                            color: "#ffffff",
                            padding: "0px 4px 0px 4px",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "-8px",
                            zIndex: "1",

                          }}
                            onClick={() => {
                              handelDocmentValue(item)
                            }}
                          >
                            <i class="fa fa-arrow-up" aria-hidden="true"></i>
                          </Box>
                        }

                      </Grid>

                    }
                    {
                      !approveDocument && item?.companyDocumentExternal?.path != null &&
                      <p>{item?.companyDocumentExternal?.document}</p>
                    }


                    {
                      item?.companyDocumentExternal?.path != null && approveDocument &&
                      <p>{item?.companyDocumentExternal?.document}
                        <>
                          <span style={{
                            "textDecoration": "underline",
                            "font": "normal normal normal 14px Montserrat",
                            "letterSpacing": "0px",
                            "color": "#707070",
                            "opacity": "1",
                            "paddingLeft": "10px",
                            "cursor": "pointer",
                          }}
                            data-toggle="modal"
                            data-target="#profilefileModal"
                            onClick={() => {
                              setAttachData(item)
                            }}
                          >{t("attach_file")} <i class="fa fa-paperclip" aria-hidden="true"></i>
                          </span>
                          <UploadFileModal item={attachData} vehicle={false} />
                          <br />
                          <span
                            style={{
                              "textDecoration": "underline",
                              "font": "normal normal normal 12px Montserrat",
                              "letterSpacing": "0px",
                              "color": "#707070",
                              "opacity": "1",
                              "paddingLeft": "10px",
                            }}
                            onClick={() => {
                              dispatch(DownloadCompanyFile(item?.companyDocumentExternal?.id))
                            }}
                          >
                            {t("click_to_download_file")}
                          </span>
                        </>
                      </p>
                    }
                    {/* {
                      <span>{item?.document}</span>
                    } */}
                  </div>
                  {item?.path ? (
                    <div className="__file_icon">
                      <img width="35px" height="35px" src={item?.path?.split('.').pop() === "pdf" && pdf_image ||
                        item?.path?.split('.').pop() === "jpg" && jpg ||
                        item?.path?.split('.').pop() === "png" && png ||
                        item?.path?.split('.').pop() === "xlsx" && excel_image ||
                        item?.path?.split('.').pop() === "docx" ||
                        item?.path?.split('.').pop() === "pptx" && word_image

                      } />
                      <div style={{ paddingLeft: "10px" }}>
                        <p>{item?.path}</p>
                        <span>{date.toLocaleString('en-GB')}</span>
                      </div>
                      <DownloadIcon className="download_icon"
                        onClick={() => {
                          dispatch(DownloadExternalFile(item?.id))
                        }}
                      />
                    </div>
                  ) : (
                    <p className="noFile">{t("no_file")}</p>
                  )}
                  {approveDocument && item?.status?.id == 18 &&
                    <Box>
                      <img src={dash} alt="" />
                    </Box>
                  }
                  {approveDocument && item?.status?.id == 19 &&
                    <Box>
                      <img src={icCheck} alt="" />
                    </Box>
                  }
                  {approveDocument && item?.status?.id == 20 &&
                    <Box>
                      <img src={icCancel} alt="" />
                    </Box>
                  }
                  {/* in case status is null */}
                  {approveDocument && item?.status == null &&
                    <Box>
                      {t("pending_to_upload")}
                    </Box>
                  }
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>

    </>
  );
};

export default ProviderOrderDetail;
