import React, { useState } from 'react'
import personPng from "../../assets/images/person.png";
import file from "../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import UploadFileModal from '../Provider/Modal/UploadFileModal'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';



const DocumentUpload = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [filePresent, setfilePresent] = useState(true);
    const [fileIdPresent, setfileIdPresent] = useState(true);
    const [approveDocument, setapproveDocument] = useState(false);
    const [ProfileImage, setProfileImage] = useState("");

    return (
        <>
            <div className='provider_doc_conatiner'>
                <div className='provide_doc_header'>
                    <h4>{t("documents_to_upload")}</h4>
                    <p>{t("please_upload_file")}</p>
                </div>


                <div className="col-md-7 employee_files_details_main">
                    <div
                        className="__header"
                        style={{ paddingRight: approveDocument === false && "40px" }}
                    >
                        <p style={{ width: approveDocument && "40%" }}>{t("file_name")}</p>
                        <p>{t("file")}</p>
                        {/* {approveDocument && <p>Options</p>} */}
                        <p>{t("approve")}</p>
                    </div>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div className="__body">
                            <div className="__file">
                                <div className="__name">
                                    <p>{t("curp")}</p>
                                    {fileIdPresent && <span>COAL970408HMCRRS00</span>}
                                    <Link className='attach_file' to="" data-toggle="modal"
                                        data-target="#profilefileModal">ATTACH  <i class="fa fa-paperclip" aria-hidden="true"></i></Link>
                                </div>
                                {filePresent ? (
                                    <div className="__file_icon">
                                        <img src={file} />
                                        <div style={{ paddingLeft: "10px" }}>
                                            <p>nss_leca-pdf</p>
                                            <span>14-05-2021 15:33</span>
                                        </div>
                                        <DownloadIcon className="download_icon" />
                                    </div>
                                ) : (
                                    <p className="noFile">NO FILE</p>
                                )}
                                {/* {approveDocument && <MoreHorizIcon />} */}
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <UploadFileModal setProfileImage={setProfileImage} />
        </>
    )
}

export default DocumentUpload