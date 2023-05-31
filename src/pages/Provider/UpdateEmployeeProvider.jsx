import React, { useEffect, useState } from 'react'
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ProfilePicModal from './Modal/ProfilePicModal';
import { useDispatch, useSelector } from 'react-redux';
import ChangeImageModal from './Modal/ChangeImageModal';
import defaultUser from '../../assets/images/default_user.jpg';
import img from '../../assets/images/employee-4.png';
import { SaveProviderImage, UpdateProviderData, UploadProviderImage } from '../../reduxToolkit/Providers/providersApi';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const UpdateEmployeeProvider = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [ProfileImage, setProfileImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [file, setFile] = useState("")
    const [isStatus, setIsStatus] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { getProviderEmployeeDetail } = useSelector(state => state?.providersSlice)
    // console.log(getProviderEmployeeDetail)

    const { getGnderListProvider } = useSelector(state => state.EmployeeProviderSlice);
    // console.log(getGnderListProvider);

    const { getAllStatusProvider } = useSelector(state => state?.providersSlice)
    // console.log(getAllStatusProvider)

    const { getSingleProvider } = useSelector(state => state?.providersSlice)
    // console.log(getSingleProvider)

    const { checkProviderImage } = useSelector(state => state?.providersSlice)
    // console.log("checkImage", checkProviderImage)

    const { getProviderImage } = useSelector(state => state?.providersSlice)
    // console.log(getProviderImage)

    const { downloadProviderImage } = useSelector(state => state?.providersSlice)
    // console.log(downloadProviderImage)





    const handelUpdate = () => {
        const data = {
            id: getProviderEmployeeDetail?.user?.id,
            name,
            email,
            phoneNumber: phone,
            gender: {
                id: gender
            },
            file,
            statusid: {
                id: isStatus
            }

        }
        dispatch(UpdateProviderData(data)).then(() => {
            if (file != "" && getProviderImage?.id == null) {


                const imgData = {
                    user: {
                        id: getSingleProvider?.id,
                    },
                    accessMethod: {
                        id: "5"
                    },
                    description: "Face recognition"

                }
                dispatch(UploadProviderImage({ imgData, file }))

            } else {
                let formData = new FormData();
                formData.append('id', getProviderImage?.id);
                formData.append('option', "user");
                formData.append('file', file[0]);
                dispatch(SaveProviderImage(formData))
            }
            navigate("/dashboard/supplier/employees")
        })
    }

    // edit value from redux

    // useEffect(() => {
    //     const imgData = {
    //         user: {
    //             id: getSingleProvider?.id,
    //         },
    //         accessMethod: {
    //             id: "5"
    //         },
    //         description: "Face recognition"

    //     }
    //     if (file != "") {
    //         dispatch(UploadProviderImage({ imgData, file }))
    //     }
    // }, [file])
    useEffect(() => {
        setName(getSingleProvider?.name || "")
        setEmail(getSingleProvider?.email || "")
        setPhone(getSingleProvider?.phoneNumber || "")
        setGender(getSingleProvider?.gender?.id || "")
        setIsStatus(getSingleProvider?.status?.id || "")
        setProfileImage(getSingleProvider?.image || "")

    }, [getSingleProvider?.id])

    const textFieldStyle = {
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
    }

    return (
        <>
            <div className="head">
                <div className="headLeft">
                    <h2>
                        <Link to="/dashboard/supplier/supplier-order-detail">
                            <ArrowBackIcon
                                style={{
                                    color: "#146F62",
                                    fontSize: "30px",
                                    marginRight: "30px",
                                }}
                            />
                        </Link>
                        {t("update_employee_information")}
                 
                        {/* {approveDocument && "APPROVE DOCUMENTS"} */}
                    </h2>


                </div>
            </div>
            <div className="update_employee_container">
                <div className="vehicle_continer_body" style={{ position: "relative" }}>
                    <div className="card_header">

                        <div className="left_active">
                            <p>{t("active")}</p>
                            <div className="status_active"></div>
                        </div>
                    </div>

                    <div className='pic_top'>
                        <img
                            src={!ProfileImage ? checkProviderImage == true ? URL.createObjectURL(downloadProviderImage) : defaultUser : ProfileImage}
                            // src={!ProfileImage ? getSingleProvider?.selfie ? `data:image/png;base64,${getSingleProvider?.selfie}` : defaultUser : ProfileImage}
                            alt="" />
                    </div>
                    <div className='img_btn'
                        data-toggle="modal"
                        data-target="#profileImageChange">
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>

                        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                    </div>

                    <div className='container_add_vehicle '>
                        <Grid container spacing={2} sx={{ marginTop: '4rem', padding: '0rem 2rem' }}>
                            <Grid item xs={12} sx={{ position: "relative" }}>
                                <TextField size="small"

                                    fullWidth


                                    label={t("name")}
                                    id="NAME"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ position: "relative", marginTop: '1rem' }}>
                                <TextField size="small"

                                    fullWidth


                                    label={t("email")}
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    sx={textFieldStyle}
                                />
                                <span className="input-icons">
                                    <MailOutlineIcon />
                                </span>
                            </Grid>
                            <Grid item xs={12} sx={{ position: "relative", marginTop: '1rem' }}>
                                <TextField size="small"

                                    fullWidth


                                    label={t("phone_number")}
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                                    sx={textFieldStyle}
                                />
                                <span className="input-icons">
                                    <PhoneIphoneIcon />
                                </span>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ mt: "1rem" }}>
                                    <FormControl fullWidth
                                        sx={textFieldStyle}>
                                        <InputLabel id="demo-simple-select-label">{t("gender")}</InputLabel>
                                        <Select size="small"

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // defaultValue="EMPLOYEE"
                                            // value={employee}
                                            label={t("gender")}
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}

                                            sx={{
                                                fontSize: "10px",
                                                padding: "3px 3px 3px 10px",
                                            }}
                                        >
                                            {
                                                getGnderListProvider?.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ mt: "1rem" }}>
                                    <FormControl fullWidth
                                        sx={textFieldStyle}>
                                        <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                                        <Select size="small"

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"

                                            label={t("status")}
                                            value={isStatus}
                                            onChange={(e) => setIsStatus(e.target.value)}
                                            sx={{
                                                fontSize: "10px",
                                                padding: "3px 3px 3px 10px",
                                            }}
                                        >
                                            {
                                                getAllStatusProvider?.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} sx={{ fontSize: "10px" }} value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>


                    </div>

                    <div className='footer_add_vehicle'>
                        <button onClick={() => { handelUpdate() }}>{t("save_changes")} <i className="fa fa-floppy-o" aria-hidden="true" style={{ paddingLeft: '1rem' }}></i></button>
                    </div>
                </div>

            </div>


            <ChangeImageModal setProfileImage={setProfileImage} setFile={setFile} />

        </>
    )
}

export default UpdateEmployeeProvider