

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../assets/images/person.png";
// import file from "../../assets/images/file.png";
import jpg from "../../assets/images/jpg_image.png";
import png from "../../assets/images/png.png";
import excel_image from '../../assets/images/excel-image.png';
import pdf_image from '../../assets/images/pdf-image.png';
import word_image from '../../assets/images/word-image.png';
import dash from "../../assets/images/Line 48.svg";
import icCheck from "../../assets/images/ic-check.svg";
import icCancel from "../../assets/images/ic-cancel.svg";
import defaultUser from '../../assets/images/default-car.png'
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UnlinkDeviceChangeModal from "./Modal/UnlinkDeviceChangeModal";
import { CheckProviderVehicleImage, GetProviderVehicleStatus, DownloadCompanyFile, DownloadExternalFile, getProviderVehicleDetail, GetProviderVehicleDetail, GetSingleProviderVehicle, SaveProviderImage, SetToExternal, SetToExternalVehicle, CreateToExternalVehicle, DownloadCompanyVehicleFile, DownloadExternalVehicleFile } from "../../reduxToolkit/Providers/providersApi";
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
import { t } from "i18next";
import Cookies from 'js-cookie';

const VehicleDetail = ({ approveDocumentVehicle }) => {
    const lCode = Cookies.get("i18next") || "en";


    const dispatch = useDispatch();
    const [documentValue, setDocumentValue] = useState({});
    const [attachData, setAttachData] = useState({});


    const { getProviderVehicleDetail } = useSelector(state => state?.providersSlice)
    // console.log(getProviderVehicleDetail)


    const { checkProviderVehicleImage } = useSelector(state => state?.providersSlice)
    // console.log("checkImage", checkProviderVehicleImage)

    const { getProviderVehicleImage } = useSelector(state => state?.providersSlice)
    // console.log(getProviderVehicleImage)

    const { downloadProviderVehicleImage } = useSelector(state => state?.providersSlice)
    // console.log(downloadProviderVehicleImage)

    const { createToExternalVehicle } = useSelector(state => state?.providersSlice)
    // console.log(createToExternalVehicle)
    const { setToExternalVehicle } = useSelector(state => state?.providersSlice)
    // console.log(setToExternalVehicle)

    const { updateProviderVehicleData } = useSelector(state => state?.providersSlice)
    // console.log(updateProviderVehicleData)


    useEffect(() => {
        dispatch(CheckProviderVehicleImage(getProviderVehicleDetail?.vehicle?.id))
    }, [getProviderVehicleDetail, updateProviderVehicleData])

    const handelDocmentValue = (item) => {
        // console.log(item)
        const data = {
            vehicle: {
                id: getProviderVehicleDetail?.vehicle?.id
            },
            document: documentValue[item],
            companyDocumentExternalVehicle: {
                id: item?.companyDocumentExternalVehicle?.id


            }
        }
        const setData = {
            id: item?.id,
            value: documentValue[item],
        }
        // console.log(data)

        if (item?.id != null) {
            dispatch(SetToExternalVehicle(setData))

            // alert("setValue")
        } else {
            // alert("createValue")
            dispatch(CreateToExternalVehicle(data))
        }

    }




    var binaryData = [];
    binaryData.push(downloadProviderVehicleImage)




    useEffect(() => {
        dispatch(GetProviderVehicleDetail(localStorage.getItem("vehicleidfordetail")))
    }, [updateProviderVehicleData, createToExternalVehicle, setToExternalVehicle])


    useEffect(() => {
        dispatch(GetProviderVehicleStatus())

    }, [])



    return (
        <>
            <div className="head">
                <div className="headLeft">
                    <h2>
                        <Link to="/dashboard/provider/vehicles">
                            <ArrowBackIcon
                                style={{
                                    color: "#146F62",
                                    fontSize: "30px",
                                    marginRight: "30px",
                                }}
                            />
                        </Link>
                        {t("upload_vehicle_document")}

                    </h2>


                </div>
            </div>
            <div className="row vehicle_provider_detail">

                <div className="update_btn">
                    <Link to="/dashboard/provider/update-vehicles">
                        <button
                            onClick={() => { dispatch(GetSingleProviderVehicle(getProviderVehicleDetail?.vehicle?.id)) }}
                        >{t("update_information")} <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                    </Link>
                </div>

                <div className="col-md-4 __userData">
                    <div className="vehicle_status">
                        <p className="status" style={{ color: "#0C4523" }}>{getProviderVehicleDetail?.vehicle?.status?.name}</p>
                        <div className="icon" style={{ background: '#0C4523' }}></div>
                    </div>
                    <img src={
                        checkProviderVehicleImage == true ? window?.URL?.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
                            // checkProviderImage == true ? URL?.createObjectURL(downloadProviderImage)
                            : defaultUser} className="__userImage"
                        style={{ width: '180px', height: '180px', borderRadius: '50%' }}
                    />
                    <div className='body_info_container '>
                        <div className='body_info'>
                            <div className='child_one'>
                                <h4>{t("brand")}</h4>
                                <p>{getProviderVehicleDetail?.vehicle?.brand}</p>
                            </div>
                            <div className='child_two'>
                                <h4>{t("sub_brand")}</h4>
                                <p>{getProviderVehicleDetail?.vehicle?.subBrand}</p>
                            </div>
                        </div>
                        <div className='body_info'>
                            <div className='child_one'>
                                <h4>{t("color")}</h4>
                                <p>{getProviderVehicleDetail?.vehicle?.color}</p>
                            </div>
                            <div className='child_two'>
                                <h4>{t("model")}</h4>
                                <p>{getProviderVehicleDetail?.vehicle?.model}</p>
                            </div>
                        </div>
                        <div className='body_info'>
                            <div className='child_one'>
                                <h4>{t("plates")}</h4>
                                <p>{getProviderVehicleDetail?.vehicle?.plate}</p>
                            </div>
                            <div className='child_two'>
                                <h4>{t("vin")}</h4>
                                <p>{getProviderVehicleDetail?.vehicle?.vin}</p>
                            </div>

                        </div>
                        <div className='body_info'>
                            <div className='child_one'>
                                <h4>{t("serial_number")}</h4>
                                <p>{getProviderVehicleDetail?.vehicle?.serialNumber}</p>
                            </div>
                            <div className='child_two'>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="col-md-7 vehicle_files_details">
                    <div
                        className="__header"
                        style={{ paddingRight: "40px" }}
                    >
                        <p style={{ width: approveDocumentVehicle && "40%" }} >{t("file_name")}</p>
                        <p>{t("file")}</p>
                        {approveDocumentVehicle && <p style={{ marginRight: "-49px" }}>{t("approve")}</p>}
                    </div>
                    {getProviderVehicleDetail?.documents?.map((item, index) => {
                        const date = new Date(item?.companyDocumentExternalVehicle?.createdAt);

                        return (
                            <div className="__body">
                                <div className="__file">
                                    <div className="__name">
                                        {
                                            item?.companyDocumentExternalVehicle?.path == null &&
                                            <Grid item xs={12} sx={{ display: 'flex' }}>
                                                <TextField size="small"
                                                    fullWidth
                                                  
                                                    label={item?.companyDocumentExternalVehicle?.document}
                                                    id={item?.companyDocumentExternalVehicle?.id}
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
                                                    approveDocumentVehicle &&
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
                                            !approveDocumentVehicle && item?.companyDocumentExternalVehicle?.path != null &&
                                            <p>{item?.companyDocumentExternalVehicle?.document}</p>
                                        }


                                        {
                                            item?.companyDocumentExternalVehicle?.path != null && approveDocumentVehicle &&
                                            <p>{item?.companyDocumentExternalVehicle?.document}
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
                                                    <UploadFileModal item={attachData} vehicle={true} />
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
                                                            dispatch(DownloadCompanyVehicleFile(item?.companyDocumentExternalVehicle?.id))
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
                                                    dispatch(DownloadExternalVehicleFile(item?.id))
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <p className="noFile">{t("no_file")}</p>
                                    )}
                                    {approveDocumentVehicle && item?.status?.id == 18 &&
                                        <Box>
                                            <img src={dash} alt="" />
                                        </Box>
                                    }
                                    {approveDocumentVehicle && item?.status?.id == 19 &&
                                        <Box>
                                            <img src={icCheck} alt="" />
                                        </Box>
                                    }
                                    {approveDocumentVehicle && item?.status?.id == 20 &&
                                        <Box>
                                            <img src={icCancel} alt="" />
                                        </Box>
                                    }
                                    {/* in case status is null */}
                                    {approveDocumentVehicle && item?.status == null &&
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

export default VehicleDetail;





// import React from 'react'

// const VehicleDetail = () => {

//     return (
//         <>
//             <div className="vehicle_container">
//                 <div className="vehicle_continer_body">
//                     <div className="card_header">

//                         <div className="left_active">
//                             <p>ACTIVE</p>
//                             <div className="status_active"></div>
//                         </div>
//                     </div>

//                     <div className='pic_top'>
//                         <img src="https://avatars.githubusercontent.com/u/51259303?s=400&u=e168c8631fac44b5e8279c78cce26a9a10098f5d&v=4" alt="" />
//                     </div>

//                     <div className='body_info_container'>
//                         <div className='body_info'>
//                             <div className='child_one'>
//                                 <h4>BRAND</h4>
//                                 <p>KIA</p>
//                             </div>
//                             <div className='child_two'>
//                                 <h4>SUB-BRAND</h4>
//                                 <p>RIO</p>
//                             </div>
//                         </div>
//                         <div className='body_info'>
//                             <div className='child_one'>
//                                 <h4>COLOR</h4>
//                                 <p>Electic Blue</p>
//                             </div>
//                             <div className='child_two'>
//                                 <h4>MODEL</h4>
//                                 <p>2018</p>
//                             </div>
//                         </div>
//                         <div className='body_info'>
//                             <div className='child_one'>
//                                 <h4>PLATES</h4>
//                                 <p>SS-568-45D</p>
//                             </div>
//                             <div className='child_two'>
//                                 <h4>VEHICLE TYPE</h4>
//                                 <p>Sedan</p>
//                             </div>
//                         </div>
//                         <div className='body_info'>
//                             <div className='child_one'>
//                                 <h4>DRIVER</h4>
//                                 <p>Luis Enrique Cornejo Arreola</p>
//                             </div>
//                             <div className='child_two'>
//                                 <h4>STATUS</h4>
//                                 <p>Active</p>
//                             </div>
//                         </div>

//                     </div>

//                     <div className='footer'>
//                         <button>UPDATE INFORMATION icon</button>
//                     </div>
//                 </div>

//             </div>

//         </>
//     )
// }

// export default VehicleDetail