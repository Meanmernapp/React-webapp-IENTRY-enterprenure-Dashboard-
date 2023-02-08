import React, { useState } from 'react'
import jpg from "../../../assets/images/jpg.png";
import png from "../../../assets/images/png.png";
import excel_image from '../../../assets/images/xls.png';
import pdf_image from '../../../assets/images/pdf.png';
import word_image from '../../../assets/images/doc.png';
import dash from "../../../assets/images/Line 48.svg";
import icCheck from "../../../assets/images/ic-check.svg";
import icCancel from "../../../assets/images/ic-cancel.svg";
import DownloadIcon from "@mui/icons-material/Download";
import {
    Box,
    Grid,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import UploadContractorDocumentsStatusUpload from './UploadContractorDocumentsStatusUpload';
import { DownloadCompanyFile, DownloadExternalFile } from '../../../reduxToolkit/Providers/providersApi';
import { useEffect } from 'react';
import { allContractorDocuments, byUserId } from '../../../reduxToolkit/Contractor/ContractorSlice';
import { GetAllContractorDocuments } from '../../../reduxToolkit/Contractor/ContractorApi';
import i18next, { t } from 'i18next';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';

const ContractorDocumentsStatus = () => {

    const approveDocumentUser = true
    const dispatch = useDispatch()


    // const dispatch = useDispatch();
    const [documentValue, setDocumentValue] = useState({});
    const [attachData, setAttachData] = useState({});

    const getUserDocuments = useSelector(allContractorDocuments)
    console.log("---->", getUserDocuments)

    const { getContractorsByUserId } = useSelector(byUserId);
    console.log("---->contractor", getContractorsByUserId)

    const { createToExternal } = useSelector(state => state?.providersSlice)
    console.log(createToExternal)

    const { setToExternal } = useSelector(state => state?.providersSlice)
    console.log(setToExternal)

    const handelDocmentValue = (item) => {
        console.log(item)
        const data = {
            user: {
                id: item?.userId
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
        console.log(data)

        if (item?.id != null) {
            // dispatch(SetToExternal(setData))

            // alert("setValue")
        } else {
            // alert("createValue")
            // dispatch(CreateToExternal(data))
        }

    }

    useEffect(() => {
        dispatch(GetAllContractorDocuments(getContractorsByUserId?.user?.id))
    }, [setToExternal, createToExternal, getUserDocuments?.id])

    return (
        <div className='user_document_conatiner'>
            <div className='header_document'>
                <h1>{t("documents_to_upload")}</h1>
                <p>{t("please_upload_file")}</p>
            </div>

            <div className="col-md-12 user_document_details" >
                <p className='head'>{t("documents")}</p>
                <div
                    className="__header"
                    style={{ paddingRight: "40px" }}
                >
                    <p style={{ width: approveDocumentUser && "40%" }} >{t("file_name")}</p>
                    <p>{t("file")}</p>
                    {approveDocumentUser && <p style={{ marginRight: "-49px" }}>{t("approve")}</p>}
                </div>
                {
                    getUserDocuments?.length > 0 ?
                        getUserDocuments?.map((item, index) => {

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
                                                        defaultValue={item?.document}
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
                                                            textAlign: i18next.dir() == "rtl" ? "right" : "left",
                                                            "& 	.MuiOutlinedInput-notchedOutline": {
                                                                textAlign: i18next.dir() == "rtl" ? "right" : "left",
                                                            },
                                                            "& 	.MuiInputLabel-root": {
                                                                fontSize: 12,
                                                                left: i18next.dir() == "rtl" ? "inherit" : "0",
                                                                right: i18next.dir() == "rtl" ? "1.75rem" : "0",
                                                                transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
                                                            }
                                                        }}
                                                    />
                                                    {
                                                        approveDocumentUser &&
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
                                                !approveDocumentUser && item?.companyDocumentExternal?.path != null &&
                                                <p>{item?.companyDocumentExternal?.document}</p>
                                            }


                                            {
                                                item?.companyDocumentExternal?.path != null && approveDocumentUser &&
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
                                                        <UploadContractorDocumentsStatusUpload item={attachData} vehicle={false} />
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
                                                            {t("click_to_download")}
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
                                        {approveDocumentUser && item?.status?.id == 18 &&
                                            <Box>
                                                <img src={dash} alt="" />
                                            </Box>
                                        }
                                        {approveDocumentUser && item?.status?.id == 19 &&
                                            <Box>
                                                <img src={icCheck} alt="" />
                                            </Box>
                                        }
                                        {approveDocumentUser && item?.status?.id == 20 &&
                                            <Box>
                                                <img src={icCancel} alt="" />
                                            </Box>
                                        }
                                        {/* in case status is null */}
                                        {approveDocumentUser && item?.status == null &&
                                            <Box>
                                                {t("pending_to_upload")}
                                            </Box>
                                        }
                                    </div>
                                </div>
                            )
                        }
                        )
                        :
                        <div className='mt-4'>
                            <NotFoundDataWarning text={t("no_data")} />

                        </div>
                }
            </div>
        </div>
    )
}

export default ContractorDocumentsStatus