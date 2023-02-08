import React, { useState } from 'react'
import jpg from "../../../assets/images/jpg.png";
import png from "../../../assets/images/png.png";
import excel_image from '../../../assets/images/xls.png';
import pdf_image from '../../../assets/images/pdf.png';
import word_image from '../../../assets/images/doc.png';
import dash from "../../../assets/images/Line 48.svg";
import icCheck from "../../../assets/images/ic-check.svg";
import icCancel from "../../../assets/images/ic-cancel.svg";
import defaultUser from '../../../assets/images/default-car.png'
import DownloadIcon from "@mui/icons-material/Download";
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CreateToExternalEmployee, DownloadCompanyFileEmployee, DownloadEmployeeFile, GetUserDocumentsEmployee, SetToExternalEmployee } from '../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import UploadFileModalEmployee from './CompanyModals/UploadFileModalEmployee';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';

const UserDocumentsEmployee = () => {

    const approveDocumentUser = true;
    const dispatch = useDispatch();

    /* Author: Rizwan ullah
       reduxtoolkit (get state from store).
    */
    const { getUserDocumentsEmployee } = useSelector(state => state?.EmployeeProviderSlice)
    console.log(getUserDocumentsEmployee)

    const { user } = useSelector(state => state.authenticatioauthennSlice);
    console.log(user)

    const { createToExternalEmployee } = useSelector(state => state?.EmployeeProviderSlice)
    console.log(createToExternalEmployee)

    const { setToExternalEmployee } = useSelector(state => state?.EmployeeProviderSlice)
    console.log(setToExternalEmployee)

    const [documentValue, setDocumentValue] = useState({});
    const [attachData, setAttachData] = useState({});

    /* Author: Rizwan ullah
      Func. to apply conditions on document and then call api
      like if id !== null then call update otherwise call create api
    */
    const handelDocmentValue = (item) => {
        console.log(item)
        const data = {
            user: {
                id: item?.userId
            },
            document: documentValue[item],
            companyDocumentEmployee: {
                id: item?.companyDocumentEmployee?.id
            }
        }
        const setData = {
            id: item?.id,
            value: documentValue[item],
        }
        console.log(data)

        if (item?.id != null) {
            dispatch(SetToExternalEmployee(setData))

            // alert("setValue")
        } else {
            // alert("createValue")
            dispatch(CreateToExternalEmployee(data))
        }

    }

    useEffect(() => {
        dispatch(GetUserDocumentsEmployee(user?.data?.id))
    }, [setToExternalEmployee, createToExternalEmployee, getUserDocumentsEmployee?.id])

    return (
        <div className='user_document_conatiner'>
            <div className='header_document'>
                <h1>DOCUMENTS TO UPLOAD</h1>
                <p>Please upload the documents neccesaries to be an provider to the company</p>
            </div>

            <div className="col-md-12 user_document_details" >
                <p className='head'>DOCUMENTS</p>
                <div
                    className="__header"
                    style={{ paddingRight: "40px" }}
                >
                    <p style={{ width: approveDocumentUser && "40%" }} >FileName</p>
                    <p>File</p>
                    {approveDocumentUser && <p style={{ marginRight: "-49px" }}>APPROVE</p>}
                </div>
                {
                    /* Author: Rizwan ullah
                        apply condition of data is null show NO DOC. card.
                    */
                    getUserDocumentsEmployee?.length > 0 ?
                        getUserDocumentsEmployee?.map((item, index) => {
                            // [1, 2, 3].map((item, index) => {
                            const date = new Date(item?.companyDocumentEmployee?.createdAt);

                            return (
                                <div className="__body">
                                    <div className="__file">
                                        <div className="__name">
                                            {
                                                item?.companyDocumentEmployee?.path == null &&
                                                <Grid item xs={12} sx={{ display: 'flex' }}>
                                                    <TextField size="small"
                                                        fullWidth

                                                        label={item?.companyDocumentEmployee?.document}
                                                        id={item?.companyDocumentEmployee?.id}
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
                                                !approveDocumentUser && item?.companyDocumentEmployee?.path != null &&
                                                <p>{item?.companyDocumentEmployee?.document}</p>
                                            }


                                            {
                                                item?.companyDocumentEmployee?.path != null && approveDocumentUser &&
                                                <p>{item?.companyDocumentEmployee?.document}
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
                                                        >ATTACH FILE <i class="fa fa-paperclip" aria-hidden="true"></i>
                                                        </span>
                                                        <UploadFileModalEmployee item={attachData} />
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
                                                                dispatch(DownloadCompanyFileEmployee(item?.companyDocumentEmployee?.id))
                                                            }}
                                                        >
                                                            CLICK TO DOWNLOAD FILE
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

                                                {/* Author: Rizwan ullah
                                                Below image getting image extention so that type of image icon 
                                                should be displayed
                                                */}
                                                <img
                                                    width="35px"
                                                    height="35px"
                                                    src={item?.path?.split('.').pop() === "pdf" && pdf_image ||
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
                                                        dispatch(DownloadEmployeeFile(item?.id))
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <p className="noFile">NO FILE</p>
                                        )}

                                        {/* Author: Rizwan ullah
                                        conditions on the base of status--> id we need to
                                         display icon to show document status
                                        */}
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
                                                Pending To Upload
                                            </Box>
                                        }
                                    </div>
                                </div>
                            )
                        }
                        )
                        :
                        <div className='mt-4'>
                            <NotFoundDataWarning text={"no_data"} />
                        </div>
                }
            </div>
        </div>
    )
}

export default UserDocumentsEmployee