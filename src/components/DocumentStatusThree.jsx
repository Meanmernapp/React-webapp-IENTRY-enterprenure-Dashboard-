/*
Author : Arman Ali
Module: Document Table
github: https://github.com/Arman-Arzoo
*/

// import libarary and other
import React, { useEffect } from 'react'
import { t } from "i18next"
import { useState } from 'react';
import cryptoJs from 'crypto-js';
import securekey from "../config";
// import icon
import downloadIcon from "../assets/icon/DownloadIcon.svg";
import lineIcon from "../assets/icon/LineIcon.svg";
import checkIcon from "../assets/icon/checkIcon.svg";
import cancelIcon from "../assets/icon/cancelIcon.svg";
import jpgIcon from "../assets/fileIcon/jpg.png";
import pdfIcon from "../assets/fileIcon/pdf.png";
import pngIcon from "../assets/fileIcon/png.png";
import wordIcon from "../assets/fileIcon/word.png";
import exelIcon from "../assets/fileIcon/xls.png";
import { DownloadEmployeeProviderOrderFiles } from '../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import { useDispatch } from 'react-redux';
import BootstrapTooltip from '../utils/BootstrapTooltip';
import ProviderDropDown from '../pages/Dashboard/Providers/SubComponents/providerDropDown';
import useStyle from '../hooks/useStyle';
import { Box, TextField } from '@mui/material';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import UploadFileModal from './UploadFileModal';
import NotFoundDataWarning from './NotFoundDataWarning';
import NotFoundAnything from './NotFoundAnything';

// Main Component
const DocumentStatusThree = (
    { dataTable, approve, optionDownload, documentId, docValue, setIsAllChecked,
    setSelectDocumentsForDelete, selectDocumentsForDelete, isAllChecked,
    setDocValue,createDocValue,downloadImg

 }) => {
    // props type
    // dataTable: dataTable is the api fetched data,
    // approve : approve is a check mark for approve doc. is either true or false
    // optionDownload : optionDownload is the which type of doc e.g document-external
    // documentId: is the id of a document for set function.
    // docValue: is a props which tell us is employee or vehicle doc it value should be string valueType
    // createDocValue: is the api for create document value
    // setDocValue: is the api for set document value
    // downloadImg: is the api for download img

    // check document object if we want more logic we add here
    const docType = {
        approve: approve,

    }
    const lCode = Cookies.get("i18next") || "en";
    // use hook
    const dispatch = useDispatch()
    const { textField, smallBoxStyle } = useStyle()
    // usestate for local state 
    const [showModal, setShowModal] = useState(false);
    const [showAttahModal, setShowAttachModal] = useState(false)
    const [dataApi, setDataApi] = useState("")

    const [documentValue, setDocumentValue] = useState([])


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

    // this function control select all id or unSelect all
    const handelDeleteAll = (e) => {
        setIsAllChecked(e.target.checked)

        if (e.target.checked) {
            const selectAllIds = dataTable?.map(item => {
                return item?.id !== null ? item.id : null;
            }).filter(id => id !== null);

            setSelectDocumentsForDelete(selectAllIds)


        } else {
            setSelectDocumentsForDelete([])
        }

    }
    console.log(selectDocumentsForDelete)
    // this function handle only specific id base on selection
    const handleCheckboxChange = (e) => {

        if (e.target.checked && e.target.id !== "") {
            setSelectDocumentsForDelete([...selectDocumentsForDelete, e.target.id]);
        } else {
            setSelectDocumentsForDelete(selectDocumentsForDelete.filter((removeid) => removeid !== e.target.id));
        }
    };

    // api funtion 
    const handelDocmentValue = (item, index) => {
        console.log(item)

        const data = {
            id: item?.userId || item?.vehicleId,
            document: documentValue[`documentValue-${item?.id ||index}`],
            companyDocumentId: item?.companyDocumentId
        }
        const setData = {
            id: item?.id,
            value: documentValue[`documentValue-${item?.id ||index}`]
        }
        if (documentValue[`documentValue-${item?.id ||index}`] !== undefined || null || "") {

            if (item?.id != null) {
                console.log(setData)
                dispatch(setDocValue(setData))
            } else {
                console.log(data)
                dispatch(createDocValue({ data, file: "" }))
            }
        } else {
            toast.warn("Provide new value to create or update record.")
        }
    }

    // return item from component
    return (
        <>{
            dataTable?.length > 0 ?
            <table className="approve_doc_table_with_setField">
                {/* table Head */}
                <thead>
                    {
                        docType?.approve &&
                        <th className='first_head'>
                            <input type="checkbox" className="checkbox"
                                checked={isAllChecked}
                                onChange={handelDeleteAll}
                            />
                        </th>
                    }
                    <th className="first_head">{t("name")?.toUpperCase()}</th>
                    {
                        docValue == "valueType" &&
                        <th>{t("value")?.toUpperCase()}</th>
                    }
                    <th>{t("file")?.toUpperCase()}</th>
                    <th>{t("status")?.toUpperCase()}</th>
                    {
                        docType?.approve &&
                        <th >{t("comment")?.toUpperCase()}</th>
                    }
                </thead>
                {/* table body */}
                <tbody>

                    {
                        
                        dataTable?.map((item, index) => {
                            const date = new Date(item?.createdAt);
                            const updatedAt = new Date(item?.updatedAt)
                            const uniqueId = `documentValue-${item?.id ||index}`;
                            console.log(uniqueId)
                            return (
                                <tr key={uniqueId}>
                                    {
                                        docType?.approve &&
                                        <td className='first' style={{ width: "10px" }}>
                                            <input type="checkbox" className="checkbox"
                                                checked={selectDocumentsForDelete?.includes(item?.id)}
                                                id={item?.id}
                                                onChange={handleCheckboxChange}
                                            />
                                        </td>
                                    }
                                    <td className="first">

                                        {
                                            item?.companyDocumentPath !== null ?
                                                <>
                                                    <div className='doc_name_with_attach'>
                                                        <BootstrapTooltip title={item?.companyDocument?.length > 30 ? item?.companyDocument : ""} placement="top">
                                                            <strong>{item?.companyDocument.slice(0, 30)} {item?.companyDocument?.length > 30 && "..."}</strong>
                                                        </BootstrapTooltip>
                                                        {
                                                            docType?.approve && item?.path == null &&
                                                            <p
                                                                onClick={() => {
                                                                    setShowAttachModal(true);
                                                                    setDataApi(item)
                                                                }}
                                                                className='attach_file'>{t("attach_file")} <i class="fa fa-paperclip" aria-hidden="true"></i>
                                                            </p>
                                                        }
                                                    </div>
                                                    {
                                                        docType?.approve &&
                                                        <p className='download_buttom'
                                                            onClick={() => {

                                                                dispatch(downloadImg({ id: item?.id, option: "supplier_document_company", type: item?.path }))
                                                            }}

                                                        >{t("click_to_download_file")}
                                                        </p>
                                                    }

                                                </>
                                                :
                                                <div className={lCode === "ar" ? "input_field_with_btn_left" : "input_field_with_btn_right"}>
                                                    <Box
                                                        sx={smallBoxStyle}
                                                    >
                                                        <TextField size="small"
                                                        
                                                            fullWidth
                                                            id={uniqueId}
                                                            label={item?.companyDocument}
                                                            name={"documentValue"}
                                                            // defaultValue={item?.document}
                                                            value={documentValue[uniqueId] || item?.document || ""}
                                                            focused={item?.document}
                                                            onChange={(e) =>
                                                                setDocumentValue((prev) => ({
                                                                    ...prev,
                                                                    [uniqueId]: e.target.value, // Use unique ID as key to set value
                                                                }))
                                                            }

                                                            sx={textField}

                                                        />
                                                    </Box>
                                                    {
                                                        docType?.approve &&
                                                        <button onClick={() => {
                                                            handelDocmentValue(item, index)
                                                        }} ><i class="fa fa-arrow-up" aria-hidden="true"></i>
                                                        </button>
                                                    }
                                                </div>
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

                                                        dispatch(downloadImg({ id: item?.id, option: optionDownload, type: item?.path }))
                                                    }}
                                                />
                                            </div> :
                                            <p className="no_file">{t("no_file")}</p>
                                        }
                                    </td>
                                    <td>
                                        {
                                            docType?.approve && item?.statusId === 18 &&
                                            <div className='status'>
                                                <img src={lineIcon} alt="lineIcon" />
                                                <p className='headline'>{t("in_validation_process")}</p>
                                            </div>

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
                                            <p className='headText'>
                                                {t("pending_to_upload")}
                                            </p>
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
            :
            <>
            <NotFoundAnything text={t("no_documents")}/>
            </>
        }

            <UploadFileModal
                title={t("upload_file")}
                show={showAttahModal}
                data={dataApi}
                ApiType="supplierDocument"
                createDocValue={createDocValue}
                onHide={() => setShowAttachModal(false)}
            />
        </>
    )
}

export default DocumentStatusThree