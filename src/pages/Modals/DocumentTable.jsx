/*
Author : Arman Ali
Module: Document Table
github: https://github.com/Arman-Arzoo
*/

// import libarary and other
import React from 'react'
import { t } from "i18next"
import ProviderDropDown from '../Dashboard/Providers/SubComponents/providerDropDown';
import { useState } from 'react';
import cryptoJs from 'crypto-js';
import securekey from "../../config";
// import icon
import downloadIcon from "../../assets/icon/DownloadIcon.svg";
import lineIcon from "../../assets/icon/LineIcon.svg";
import checkIcon from "../../assets/icon/checkIcon.svg";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import jpgIcon from "../../assets/fileIcon/jpg.png";
import pdfIcon from "../../assets/fileIcon/pdf.png";
import pngIcon from "../../assets/fileIcon/png.png";
import wordIcon from "../../assets/fileIcon/word.png";
import exelIcon from "../../assets/fileIcon/xls.png";
import { DownloadEmployeeProviderOrderFiles } from '../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import { useDispatch } from 'react-redux';
import BootstrapTooltip from '../../utils/BootstrapTooltip';

// Main Component
const DocumentTable = ({ dataTable, approve, optionDownload, documentId, docValue }) => {
    // props type
    // dataTable: dataTable is the api fetched data,
    // approve : approve is a check mark for approve doc. is either true or false
    // optionDownload : optionDownload is the which type of doc e.g document-external
    // documentId: is the id of a document for set function.
    // docValue: is a props which tell us is employee or vehicle doc it value should be string valueType

    // check document object if we want more logic we add here
    const docType = {
        approve: approve,

    }
    // use hook
    const dispatch = useDispatch()
    // usestate for local state 
    const [showModal, setShowModal] = useState(false);

    // get data from sessionStorage and decrypt
    const employeedata = sessionStorage.getItem('employeeEntryData');
    const bytess = cryptoJs.AES.decrypt(employeedata || "", securekey)
    const userstring = bytess.toString(cryptoJs.enc.Utf8);
    const employee = userstring ? JSON.parse(userstring) : ""
    // pass this if you have dropdown inside table option
    const dropDownProps = {
        panel: 'providerFileOption',
        firstItem: 'DOWNLOAD FILE',
        secondItem: 'VIEW DETAILS '
    }
    // Action Api dispatch
    // need logic here to dispatch different api base on documentType

    // return item from component
    return (
        <table className="approve_doc_table">
            {/* table Head */}
            <thead>
                <th className="first_head">{t("name")?.toUpperCase()}</th>
                {
                    docValue == "valueType" &&
                    <th>{t("value")?.toUpperCase()}</th>
                }
                <th>{t("file")?.toUpperCase()}</th>
                <th>{docType?.approve ? t("options")?.toUpperCase() : t("status")?.toUpperCase()}</th>
                {
                    docType?.approve &&
                    <th className="last">{t("comment")?.toUpperCase()}</th>
                }
            </thead>
            {/* table body */}
            <tbody>
                {
                    dataTable?.map((item) => {
                        const date = new Date(item?.createdAt);
                        const updatedAt = new Date(item?.updatedAt)
                        return (
                            <tr>
                                <td className="first">
                                    <BootstrapTooltip title={item?.companyDocument?.length > 30 ? item?.companyDocument : ""} placement="top">
                                        <strong>{item?.companyDocument.slice(0, 30)} {item?.companyDocument?.length > 30 && "..."}</strong>
                                    </BootstrapTooltip>
                                    {
                                        docValue != "valueType" &&
                                        <p>{item?.document || "-"}</p>
                                    }
                                </td>
                                {
                                    docValue == "valueType" &&
                                    <td>{item.document || "-"}</td>
                                }
                                <td >
                                    {item?.path ?
                                        <div className="files">
                                            <img src={
                                                item?.path?.split('.').pop() === "pdf" && pdfIcon ||
                                                item?.path?.split('.').pop() === "jpg" && jpgIcon ||
                                                item?.path?.split('.').pop() === "png" && pngIcon ||
                                                item?.path?.split('.').pop() === "xlsx" && exelIcon ||
                                                item?.path?.split('.').pop() === "docx" && wordIcon ||
                                                item?.path?.split('.').pop() === "pptx" && wordIcon
                                            } width="18px" height="24px" />
                                            <BootstrapTooltip title={item?.path} placement="top">
                                                <p>
                                                    {item?.path?.slice(0, 12) + '...'}
                                                    <br />
                                                    <span>{date.toLocaleString('en-GB')}</span>
                                                </p>
                                            </BootstrapTooltip>
                                            <img src={downloadIcon} alt="download" className="d_icon"
                                                onClick={() => {
                                                    const data = {
                                                        option: optionDownload,
                                                        id: item?.id
                                                    }
                                                    dispatch(DownloadEmployeeProviderOrderFiles(data))
                                                }}
                                            />
                                        </div> :
                                        <p className="no_file">{t("no_file")}</p>
                                    }
                                </td>
                                <td>
                                    {
                                        docType?.approve && item?.statusId === 18 && (employee?.departmentId != null ||
                                            employee?.departmentId != item?.departmentId) &&
                                        <p className='headText'>
                                           {t("department_no_authorized_to_approve")}
                                        </p>
                                    }
                                    {
                                        docType?.approve && item?.path && item?.statusId === 18 &&
                                        (employee?.departmentId == null ||
                                            employee?.departmentId == item?.departmentId) &&
                                        <ProviderDropDown dropDownProps={dropDownProps} onShow={() => {
                                            setShowModal(true)
                                            documentId(item?.id)
                                        }} documentId={item?.id}

                                        />
                                    }
                                    
                                    {
                                        item?.statusId === 19 &&
                                        <div className='status'>
                                            <img src={checkIcon} alt="checked" />
                                            <p className='headline'>{t("approved_by")}: {item?.validatedByName || "-"}</p>
                                            <p className='baseline'>{updatedAt.toLocaleString('en-GB')}</p>
                                        </div>
                                    }
                                    {
                                        item?.statusId === 20 &&
                                        <div className='status'>
                                            <img src={cancelIcon} alt="cancel" />
                                            <p className='headline'>{t("denied_by")}: {item?.validatedByName || "-"}</p>
                                            <p className='baseline'>{updatedAt.toLocaleString('en-GB')}</p>
                                        </div>
                                    }
                                    {
                                        item?.statusId === null &&
                                        <div className='status'>
                                            <img src={lineIcon} alt="lineIcon" />
                                            <p className='headline'>{t("pending_to_upload")}</p>
                                        </div>
                                    }

                                </td>
                                {
                                    docType?.approve &&
                                    <td className='comment'>{item?.validationComment || "-"}</td>
                                }
                            </tr>
                        )
                    })

                }

            </tbody>
        </table>
    )
}

export default DocumentTable