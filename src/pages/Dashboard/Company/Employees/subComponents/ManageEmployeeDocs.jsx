import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import file from "../../../../../assets/images/file.png";
import dash from "../../../../../assets/images/Line 48.svg";
import icCheck from "../../../../../assets/images/ic-check.svg";
import icCancel from "../../../../../assets/images/ic-cancel.svg";
import person4 from "../../../../../assets/images/user-png.png";
import ic_file from "../../../../../assets/images/ic-file-green.svg";
import DownloadIcon from "@mui/icons-material/Download";
import { GoPrimitiveDot } from 'react-icons/go'


import jpg from "../../../../../assets/images/jpg.png";
import png from "../../../../../assets/images/png.png";
import excel_image from '../../../../../assets/images/xls.png';
import pdf_image from '../../../../../assets/images/pdf.png';
import word_image from '../../../../../assets/images/doc.png';
import cryptoJs from 'crypto-js';


import {
    Box,
    Grid,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../../../../Apis/Constants";
import ApproveDoc from "./ApproveDoc";
import securekey from "../../../../../config";

const ManageEmployeeDocs = ({ approveDocument }) => {
    const token = sessionStorage.getItem('bearerToken');
    const bytes = cryptoJs.AES.decrypt(token, securekey)
    const bearerToken = bytes.toString(cryptoJs.enc.Utf8);

    const singleEmployeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);
    const employeeDocumentsList = useSelector(state => state?.CompanyEmployeesSlice?.employeeDocumentsList);
    const ProfileImage = useSelector(state => state?.CompanyEmployeesSlice?.selfieImage);
    console.log(singleEmployeeDetail)
    var binaryData = [];
    binaryData.push(ProfileImage);

    const handleStatus = (paramId) => {
        return paramId === 2 ? "#F2A100" :
            paramId === 3 ? "blue" :
                paramId === 4 ? "#0C4523" :
                    paramId === 5 ? "orange" :
                        paramId === 6 ? "#BC0000" : "black"
    }

    const handleDownload = (item) => {
        fetch(`${URL}image-service/download-by-id/${item?.id}/option/document_employee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                "Authorization": `Bearer ${bearerToken}`,
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${item?.path}`,
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    }

    return (
        <>
            <div className="head">
                <div className="headLeft">
                    <Link to={`/dashboard/employee/all-employees/update-employee/${singleEmployeeDetail?.id}`}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <h2>
                        EMPLOYE Documents
                    </h2>
                </div>
            </div>
            <div className="row employee_provider_detail" style={{ marginTop: "8.5rem" }}>
                <div className="col-md-4 __userData">
                    <img
                        // src={
                        //     ProfileImage?.length !== 0 ?
                        //         window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })) :
                        //         person4
                        // }
                        src={

                            singleEmployeeDetail?.selfie != null ? `data:image/png;base64,${singleEmployeeDetail?.selfie}` : person4}

                        className="__userImage"
                        style={{ width: '180px', height: '180px', borderRadius: '50%', boxShadow: "0px 0px 6px #00000066" }}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            float: "right",
                            fontSize: "12px",
                            width: "6rem",
                            wordBreak: "break-all",
                            fontWeight: "bold",
                            color: handleStatus(singleEmployeeDetail?.status?.id)
                        }}
                    >
                        <p>{singleEmployeeDetail?.status?.name}</p>
                        <GoPrimitiveDot
                            style={{
                                color: handleStatus(singleEmployeeDetail?.status?.id),
                                fontSize: "25px",
                            }}
                        />
                    </div>
                    <div className="__body">
                        <p>Name</p>
                        <span>{singleEmployeeDetail?.name}</span>
                        <p className="ishead">Email</p>
                        <span>{singleEmployeeDetail?.email}</span>
                        <p className="ishead">Phone Number</p>
                        <span>{singleEmployeeDetail?.phoneNumber}</span>

                        <p className="ishead">Gender</p>
                        <span>{singleEmployeeDetail?.gender?.name}</span>
                    </div>
                </div>
                <div className="col-md-7 employee_files_details">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "16px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "#146F62",
                            paddingLeft: "10px",
                            letterSpacing: "6px",
                            marginBottom: "30px"
                        }}
                    >
                        <p>Documents</p>
                        <img
                            src={ic_file}
                            alt="ic_file"
                            className="ml-3"
                        />
                    </div>
                    <div className="__header">
                        <p style={{ width: approveDocument && "40%" }} >Name</p>
                        <p>File</p>
                        {approveDocument && <p>options</p>}
                    </div>
                    {employeeDocumentsList?.map((item) => {
                        const date = new Date(item?.companyDocumentEmployee?.createdAt);
                        return (
                            <div className="__body">
                                <div className="__file">
                                    <div className="__name">
                                        <p>
                                            {item?.companyDocumentEmployee?.path != null && item?.companyDocumentEmployee?.document}
                                        </p>
                                        <span>{item?.document ? item?.document : '-'}</span>
                                    </div>
                                    {item?.companyDocumentEmployee?.path ? (
                                        <div className="__file_icon">
                                            <img src={item?.companyDocumentEmployee?.path?.split('.').pop() === "pdf" && pdf_image ||
                                                item?.companyDocumentEmployee?.path?.split('.').pop() === "jpg" && jpg ||
                                                item?.companyDocumentEmployee?.path?.split('.').pop() === "png" && png ||
                                                item?.companyDocumentEmployee?.path?.split('.').pop() === "xlsx" && excel_image ||
                                                item?.companyDocumentEmployee?.path?.split('.').pop() === "docx" ||
                                                item?.companyDocumentEmployee?.path?.split('.').pop() === "pptx" && word_image} />
                                            <div style={{ paddingLeft: "10px" }}>
                                                <p>{item?.companyDocumentEmployee?.path}</p>
                                                <span>{date.toLocaleString('en-GB')}</span>
                                            </div>
                                            <DownloadIcon
                                                className="download_icon"
                                                onClick={() => handleDownload(item)}
                                            />
                                        </div>
                                    ) : (
                                        <p className="noFile">NO FILE</p>
                                    )}
                                    {/* {approveDocument && item?.status?.id == 18 &&
                                        <Box>
                                            <img src={dash} alt="dash" />
                                        </Box>
                                    } */}
                                    {approveDocument && item?.status?.id == 19 &&
                                        <Box>
                                            <img src={icCheck} alt="icCheck" />
                                        </Box>
                                    }
                                    {approveDocument && item?.status?.id == 20 &&
                                        <Box>
                                            <img src={icCancel} alt="icCancel" />
                                        </Box>
                                    }
                                    {approveDocument && item?.status?.id == 18 &&
                                        <Box>
                                            <ApproveDoc documentvalue={item} />
                                        </Box>
                                    }
                                    {/* in case status is null */}
                                    {approveDocument && item?.status == null &&
                                        <Box>
                                            Pending To Upload
                                        </Box>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ManageEmployeeDocs