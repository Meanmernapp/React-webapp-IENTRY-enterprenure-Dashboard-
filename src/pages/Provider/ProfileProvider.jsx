import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { setDate } from "date-fns";
import { Modal } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import defaultUser from '../../assets/images/default_user.jpg';
// import photo from "../../../assets/images/as.jpg";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
// import { byUserId } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch, useSelector } from "react-redux";
// import {
//     CheckCompanyRestriction,
//     CheckUserProfile,
//     CreateUserImage,
//     GetAllGender,
//     GetUserDetailByUserId,
//     GetUserExtraDetailByUserId,
//     UnlinkDevicefromUser,
//     UpdateUserExtraData,
//     UpdateUserProfileData,
//     UploadFileToServer,
// } from "../../../reduxToolkit/Contractor/ContractorApi";
// import {
//     userExtraDetailByUserId,
//     userDetailByUserId,
// } from "../../../reduxToolkit/Contractor/ContractorSlice";
// import { allGender } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { Box } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import { GetGenderListProvider } from "../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { CheckProviderImage, GetUserCompanyRestrictionData, GetUserExtraData, SaveProviderImage, UnlinkUserDevice, UpdateProviderData, UpdateProviderExtraData, UpdateProviderUserData, UploadProviderImage } from "../../reduxToolkit/Providers/providersApi";
import { GetHeaders } from "../../reduxToolkit/headers/HeadersApi";
import cryptoJs from 'crypto-js';
import securekey from "../../config";

const ProfileProvider = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    // token
    const token = sessionStorage.getItem('bearerToken');
    const bytes = cryptoJs.AES.decrypt(token, securekey)
    const bearerToken = bytes.toString(cryptoJs.enc.Utf8);
    // use hook
    let dispatch = useDispatch();
    const { headersList } = useSelector(state => state.headersSlice);

    //use state
    const [date, setDate] = useState();
    const [modalShow, setModalShow] = React.useState(false);
    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [states, setStates] = useState();
    const [country, setCountry] = useState();
    const [postCode, setPostCode] = useState();
    const [homeNumber, setHomeNumber] = useState();
    const [arabicName, setArabicName] = useState();
    const [bloodType, setBloodType] = useState();
    const [town, setTown] = useState();
    const [note, setNote] = useState();
    const [contractorName, setContractorName] = useState();
    const [imf, setImg] = useState("");
    const [showExtraData, setSHowExtraData] = useState(false);
    const [file, setFile] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);

    // use Selector from store

    const { getGnderListProvider } = useSelector(state => state.EmployeeProviderSlice)
    const { getSingleUserProvider } = useSelector(state => state?.providersSlice)
    const { getUserExtraData } = useSelector(state => state?.providersSlice)
    const { getUserCompanyRestrictionData } = useSelector(state => state?.providersSlice)
    const { checkProviderImage } = useSelector(state => state?.providersSlice)
    const { getProviderImage } = useSelector(state => state?.providersSlice)
    const { user } = useSelector(state => state.authenticatioauthennSlice);


    console.log(user)
    // a function for Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };


    // useEffect for api and state manage
    useEffect(() => {
        dispatch(GetGenderListProvider())
        dispatch(GetUserExtraData(user?.data?.id))
        dispatch(GetUserCompanyRestrictionData())
        dispatch(CheckProviderImage(user?.data?.id))
        dispatch(GetHeaders())
    }, [])
    // useEffect for set value in field for update
    useEffect(() => {
        setName(getSingleUserProvider?.name || user?.data?.name || "");
        setUserName(getSingleUserProvider?.email || user?.data?.email || "");
        setPhone(getSingleUserProvider?.phoneNumber || user?.data?.phoneNumber || "");
        setGender(getSingleUserProvider?.gender?.id || user?.data?.gender?.id || "");
        // let todaydate = new Date(getSingleUserProvider?.dob || "");
        // setDate(todaydate.getDate());
        // setDate(getSingleUserProvider?.user?.dob)
        // setDate(new Date(`2014-08-18T${getSingleUserProvider?.dob}`) || "")
        setDate(new Date(getSingleUserProvider?.dob) || new Date(user?.data?.dob) || "")
        setStates(getSingleUserProvider?.status?.name || user?.data?.status?.name || "");

        setAddress1(getUserExtraData?.address1 || "");
        setAddress2(getUserExtraData?.address2 || "");
        setCountry(getUserExtraData?.country || "");
        setPostCode(getUserExtraData?.postalCode || "");
        setHomeNumber(getUserExtraData?.homePhone || "");
        setArabicName(getUserExtraData?.arabicName || "");
        setBloodType(getUserExtraData?.bloodType || "");
        setNote(getUserExtraData?.setNote || "");
        setTown(getUserExtraData?.setTown || "");
    }, [getSingleUserProvider?.id, getUserExtraData?.id, user?.data?.id]);

    const handleUnlinkDevice = (props) => {
        dispatch(UnlinkUserDevice(getSingleUserProvider?.id)).then(
            props.onHide()
        )

    }

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

    function MyVerticallyCenteredModal(props) {
        return (
            <div className="primary-modal">
                <Modal
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ background: "rgba(0,0,0,0.6)" }}
                >
                    <button onClick={props.onHide} className="modal-close-btn">
                        X
                    </button>
                    <span className="main-modal-heading">{t("unlink_device")}</span>
                    <div className="unlink-modal-body">
                        <span className="modal-desc-text">
                            {t("unlink_confirmation_msg")}
                        </span>
                        <span className="modal-desc-text">
                            confirm your password and then confirm the operation.
                        </span>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ marginTop: "20px" }}>
                                <TextField size="small"
                                    fullWidth

                                    label={t("unlink_device")}
                                    id="linkDevice"
                                    //   value={}
                                    //   onChange={(e) => setName(e.target.value)}
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
                                    sx={lCode === "ar" ? textFieldStyle : ""}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{ position: "relative", marginBottom: "10px" }}
                            >
                                <TextField size="small"
                                    fullWidth



                                    label={t("password")}
                                    id="password"
                                    //   value={}
                                    //   onChange={(e) => setName(e.target.value)}
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
                                    sx={lCode === "ar" ? textFieldStyle : ""}
                                />
                                <span className="input-icons">

                                    <VisibilityIcon />
                                </span>
                            </Grid>
                        </Grid>
                        <div className="btn-div">
                            <button className="button-sec btn-cancel" onClick={props.onHide}>
                                {t("cancel")}
                            </button>
                            <button className="button-sec btn-confirm" onClick={() => { handleUnlinkDevice(props) }}>{t("confirm")}</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }


    //uploading file state
    const [allUser, setAllUser] = useState(false);


    const [previewSize, setPreviewSize] = useState();
    const [companyImg, setCompanyImg] = useState();
    const [pdfFile, setPdfFile] = useState();




    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const onImageChange = async (e) => {
        // console.log(e.target.files[0])
        const originalFile = e.target.files[0];
        console.log(originalFile)

        const checkExtension = originalFile["type"].split("/")[0] === "image";

        //if input is image
        if (checkExtension) {
            setPdfFile("");
            setFile(originalFile);

            let formatedValue = formatBytes(originalFile?.size);

            console.log("this is the file", formatedValue)
            setPreviewSize(formatedValue);

            const [file] = e.target.files;
            setCompanyImg(URL.createObjectURL(file));
        }

        //if input is file
        if (!checkExtension) {
            setCompanyImg("");
            // console.log(e.target.files[0])
            const originalFile = e.target.files[0];
            setPdfFile(originalFile);

            let formatedValue = formatBytes(originalFile?.size);
            // console.log(formatedValue, originalFile?.size);
            setPreviewSize(formatedValue);
        }
    };

    function AllUser(props) {
        return (
            <div className="primary-modal">
                <Modal
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ background: "rgba(0,0,0,.4)" }}
                >
                    <button onClick={() => { setCompanyImg(); props.onHide() }} className="modal-close-btn">
                        X
                    </button>
                    <Modal.Header>
                        <Modal.Title class="mt-2 text-center add_workshiftmodal_title d-flex justify-content-center flex-grow-1">
                            <h4 className="text-center">
                                <b>UPLOAD FILE</b>
                            </h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row " style={{ width: "100%" }}>
                            <div style={{ width: "100%", margin: "15px" }}>
                                <div className="updata_img_m">
                                    <label htmlFor="file-input" className="dottedborderbox">
                                        <img
                                            src={"cloudsvg"}
                                            alt="submitupload"
                                            className="submitupload"
                                        />
                                        <input
                                            type="file"
                                            id="file-input"
                                            accept="image/png,image/jpg,image/jpeg"
                                            onChange={onImageChange}
                                        />
                                        <p>
                                            drag {"&"} drop <br /> your image <br /> size 20 mb max
                                        </p>
                                    </label>
                                </div>
                                <div className="col" style={{ width: "100%" }}>
                                    {companyImg ? (
                                        <img
                                            src={companyImg}
                                            className="previewImg"
                                            alt="imgs"
                                            style={{ width: "100%", height: "200px" }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <div>
                        <div className="btn-div">
                            <button
                                className="button-sec btn-cancel"
                                style={{ color: "red" }}
                                onClick={() => { setCompanyImg(); props.onHide() }}
                            >
                                CANCEL
                            </button>
                            <button
                                className="button-sec btn-confirm"
                                onClick={() => {
                                    // if(previewSize < 500000000){
                                    props.onHide();
                                    // }
                                    // else{
                                    //   toast.info("File size must be lest than 500KB")
                                    // }
                                }}
                            >
                                <b>APPLY CHANGES</b>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    const uploadUpdtedImage = () => {

        // const user = {
        //     user: {
        //         id: getByUserId?.user?.id,
        //     },
        //     accessMethod: {
        //         id: 5,
        //     },
        //     description: "Face recognition",
        // };
        // dispatch(CreateUserImage(user))
        //     .then((res) => {
        //         let formData = new FormData();
        //         formData.append("id", res.payload.data.data.id);
        //         formData.append("option", "user");
        //         formData.append("file", updateCompanyImg);
        //         dispatch(UploadFileToServer(formData));
        //     })
        //     .then(() => {
        //         // navigate("/dashboard/search-employe", { replace: true });
        //     });


    };

    const handleSubmit = () => {
        let body = {
            "address1": address1,
            "address2": address2,
            "arabicName": arabicName,
            "bloodType": bloodType,
            "country": country,
            "homePhone": homeNumber,
            "id": getSingleUserProvider?.id,
            "note": note,
            "postalCode": postCode,
            "town": town,
            "wasVaccinated": true

        };
        const data = {
            id: user?.data?.id,
            phoneNumber: phone,
            email: userName,
            name: name,
            password: password,
            statusid: {
                id: "4",
            },
            dob: date?.getTime(),
            // 1650384228213,
            gender: {
                id: gender,
            },
        };

        dispatch(UpdateProviderExtraData({ id: getSingleUserProvider?.id, body: body }));
        dispatch(UpdateProviderUserData(data)).then(() => {
            if (file != "" && getProviderImage?.id == null) {
                const imgData = {
                    user: {
                        id: getSingleUserProvider?.id,
                    },
                    accessMethod: {
                        id: "5"
                    },
                    description: "Face recognition"

                }
                dispatch(UploadProviderImage({ imgData, file }))

            } else if (file != "") {


                const data = {
                    id: getProviderImage?.id,
                    option: "user",
                    file
                }
                dispatch(SaveProviderImage(data))
            }
        });
    };

    return (
        <div className="profile-sec">
            <div
                className="edit-profile--img-container"
                onClick={() => setAllUser(true)}
            >
                <img src={!companyImg ? getSingleUserProvider?.selfie ? `data:image/png;base64,${getSingleUserProvider?.selfie}` : defaultUser : companyImg} alt="user image" />

                <span className="modal-file-upload"></span>
            </div>
            {/* <img src={photo} className="profile-sec__photo" /> */}
            <span
                className="profile-sec__heading top-m"

            >
                PERSONAL DATA
            </span>

            <div className="name">
                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ position: "relative" }}>
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
                            sx={lCode === "ar" ? textFieldStyle : ""}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ position: "relative" }}>
                        <TextField size="small"
                            fullWidth



                            label={t("email")}
                            id="emial"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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
                            sx={lCode === "ar" ? textFieldStyle : ""}
                        />
                        <span className="input-icons">
                            <MailOutlineIcon />
                        </span>
                    </Grid>
                    <Grid item xs={6} sx={{ position: "relative" }}>
                        <TextField size="small"
                            fullWidth



                            type={passwordShown ? "text" : "password"}
                            label={t("password")}
                            id="NAME"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            sx={lCode === "ar" ? textFieldStyle : ""}
                        />
                        <span className="input-icons">
                            {
                                passwordShown ?
                                    <VisibilityIcon onClick={() => { togglePassword() }} />
                                    :
                                    <VisibilityOffIcon onClick={() => { togglePassword() }} />
                            }
                        </span>
                    </Grid>
                    <Grid item xs={6} sx={{ position: "relative" }}>
                        <TextField size="small"
                            fullWidth


                            label={t("phone_number")}

                            id="NAME"
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
                            sx={lCode === "ar" ? textFieldStyle : ""}
                        />
                        <span className="input-icons">
                            <PhoneIphoneIcon />
                        </span>
                    </Grid>
                    <Grid item xs={6} sx={{ position: "relative" }}>
                        <Box sx={{ mt: "6px" }}>
                            <FormControl fullWidth
                                sx={lCode === "ar" ? textFieldStyle : ""}>
                                <InputLabel id="gender">{t("gender")}</InputLabel>
                                <Select size="small"

                                    displayEmpty
                                    labelId="demo-simple-select-label"
                                    id="gender"
                                    value={gender}
                                    label={t("gender")}
                                    onChange={(e) => setGender(e.target.value)}
                                    defaultValue={getSingleUserProvider?.gender?.id || user?.data?.gender?.id}
                                    sx={{
                                        // fontSize: "10px",
                                        // padding: "3px 3px 3px 10px",
                                    }}
                                >
                                    {
                                        getGnderListProvider?.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    value={item.id}
                                                    key={index}
                                                    sx={{
                                                        fontSize: "10px",
                                                    }}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ position: "relative" }}>
                        <div className="dateTimeInput">
                            <div className="dateTimeInput-container">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack
                                        sx={lCode === "ar" ? textFieldStyle : ""}>
                                        {/* <DesktopDatePicker
                        label="DOB"
                        inputFormat="dd/MM/yyyy"
                        value={date}
                        textFieldStyle={{ width: "100%" }}
                        onChange={setDate}
                        renderInput={(params) => <TextField size="small" {...params} />}
                      /> */}
                                        <DesktopDatePicker
                                            label="Date desktop"
                                            inputFormat="dd/MM/yyyy"
                                            value={date}
                                            onChange={(e) => { setDate(e) }}
                                            renderInput={(params) => <TextField size="small" {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sx={{ position: "relative" }}>
                        <TextField size="small"
                            fullWidth


                            label={t("linked_device")}
                            onClick={() => setModalShow(true)}
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
                            sx={lCode === "ar" ? textFieldStyle : ""}
                        />
                        <span className="input-icons" onClick={() => setModalShow(true)}>
                            <DeleteIcon />
                        </span>
                    </Grid>
                </Grid>
            </div>
            {getUserCompanyRestrictionData?.extraDataExternal == true &&
                <span
                    className="profile-sec__heading"
                    style={{ margin: "20px 0 20px 0" }}
                >
                    {t("extra_data")}
                </span>
            }

            <div className="name">
                {getUserCompanyRestrictionData?.extraDataExternal == true &&
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header1}
                                id="NAME"
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header2}
                                id="NAME"
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header3}
                                id="toen"
                                value={town}
                                onChange={(e) => setTown(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header4}
                                id="NAME"
                                value={states}
                                onChange={(e) => setStates(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>{" "}
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header5}
                                id="NAME"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header6}
                                id="NAME"
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header7}
                                id="NAME"
                                value={homeNumber}
                                onChange={(e) => setHomeNumber(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header8}
                                id="NAME"
                                value={arabicName}
                                onChange={(e) => setArabicName(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header9}
                                id="NAME"
                                value={contractorName}
                                onChange={(e) => setContractorName(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth

                                label={headersList?.header10}
                                id="NAME"
                                value={bloodType}
                                onChange={(e) => setBloodType(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid>
                        {/* <Grid item xs={12} sx={{ position: "relative" }}>
                            <TextField size="small"
                                fullWidth
                                multiline
                                rows={3}
                              
                                label={headersList?.header11}
                                id="NAME"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
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
                                sx={lCode === "ar" ? textFieldStyle : ""}
                            />
                        </Grid> */}
                    </Grid>
                }
                <div className="btn-container mt-3">
                    <button className="submit-primary-btn" onClick={handleSubmit}>
                        {t("save_changes")}
                        <span>
                            <SaveIcon />
                        </span>
                    </button>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <AllUser show={allUser} onHide={() => setAllUser(false)} />

        </div>
    );
};

export default ProfileProvider;
