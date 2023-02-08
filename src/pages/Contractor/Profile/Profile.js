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
import { Modal } from "react-bootstrap";
import profileDemo from "../../../assets/images/userDemoImg.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import cryptoJs from 'crypto-js';
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { byUserId } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCompanyRestriction,
  CheckUserProfile,
  CreateUserImage,
  GetAllGender,
  GetUserDetailByUserId,
  GetUserExtraDetailByUserId,
  UnlinkDevicefromUser,
  UpdateUserExtraData,
  UpdateUserProfileData,
  UploadFileToServer,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import {
  userExtraDetailByUserId,
  userDetailByUserId,
} from "../../../reduxToolkit/Contractor/ContractorSlice";
import { allGender } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { Box } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import i18next, { t } from "i18next";
import { GetHeaders } from "../../../reduxToolkit/headers/HeadersApi";
import securekey from "../../../config";

const inputStyle = {
  textAlign: i18next.dir() == "rtl" ? "right" : "left",
  "& 	.MuiOutlinedInput-notchedOutline": {
    textAlign: i18next.dir() == "rtl" ? "right" : "left",
  },
  "& 	.MuiInputLabel-root": {
    fontSize: 12,
    left: i18next.dir() == "rtl" ? "inherit" : "0",
    right: i18next.dir() == "rtl" ? "1.75rem" : "0",
    transformOrigin: i18next.dir() == "rtl" ? "right" : "left",
  },
};

const Profile = () => {
  let dispatch = useDispatch();
  const { headersList } = useSelector((state) => state.headersSlice);
  const getUserExtraDetailByUserId = useSelector(userExtraDetailByUserId);
  const getUserDetailByUserId = useSelector(userDetailByUserId);

  console.log("cccccccccccccccccc--->", getUserDetailByUserId);
  const AllGenders = useSelector(allGender);
  const navigate = useNavigate();
  const [date, setdate] = useState();
  const getByUserId = useSelector(byUserId);

  const [modalShow, setModalShow] = React.useState(false);

  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [linkDevices, setLinkDevices] = useState();

  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [states, setStates] = useState();
  const [country, setCountry] = useState();
  const [postCode, setPostCode] = useState();
  const [homeNumber, setHomeNumber] = useState();
  const [arabicName, setArabicName] = useState();
  const [bloodType, setBloodType] = useState();
  const [town, setTown] = useState();
  const [contractorName, setContractorName] = useState();


  const [isImage, setIsimage] = useState();

  const token = sessionStorage.getItem('bearerToken');
  const bytes = cryptoJs.AES.decrypt(token, securekey)
  const bearerToken = bytes.toString(cryptoJs.enc.Utf8);
  const [showExtraData, setSHowExtraData] = useState(false);
  useEffect(() => {
    /*author mazhar iqbal
        get all user data
      */
    dispatch(GetUserDetailByUserId(getByUserId?.user?.id));

    /*author mazhar iqbal
        get gender list 
      */
    dispatch(GetAllGender());

    /*author mazhar iqbal
        check company restriction to show extra data
      */
    dispatch(CheckCompanyRestriction()).then((res) => {
      if (res?.payload?.data?.data?.extraDataExternal) {
        setSHowExtraData(res?.payload?.data?.data?.extraDataExternal);

        /*author mazhar iqbal
          get user extra data
        */
        dispatch(GetUserExtraDetailByUserId(getByUserId?.user?.id));
      }

      /*author mazhar iqbal
          check user has image or note
        */
      dispatch(CheckUserProfile(getByUserId?.user?.id)).then((res) => {
        if (res?.payload?.data?.data) {
          axios
            .get(
              `http://38.65.139.14:8080/corporate-user-pre-prod-v1/user-service/user-image/get-selfie/by-user-id/02a0086a-2da8-4af5-ad37-316133cd407d`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",

                  Authorization: "Bearer " + bearerToken,
                },
              }
            )
            .then((response) => {
              setIsimage(response?.data?.data?.id);
            });
        }
      });
    });
  }, [getByUserId?.user?.id]);

  useEffect(() => {
    setName(getByUserId?.user?.name);
    setUserName(getByUserId?.user?.email);
    setPhone(getByUserId?.user?.phoneNumber);
    setGender(getByUserId?.user?.gender?.id);
    setLinkDevices(getUserDetailByUserId?.deviceId);
    let todaydate = new Date(getByUserId?.user?.dob);
    setdate(todaydate);
    setAddress1(getUserExtraDetailByUserId?.address1);
    setAddress2(getUserExtraDetailByUserId?.address2);
    setStates(getByUserId?.user?.status?.name);
    setCountry(getUserExtraDetailByUserId?.country);
    setPostCode(getUserExtraDetailByUserId?.postalCode);
    setHomeNumber(getUserExtraDetailByUserId?.homePhone);
    setArabicName(getUserExtraDetailByUserId?.arabicName);
    setBloodType(getUserExtraDetailByUserId?.bloodType);
    setTown(getUserExtraDetailByUserId?.setTown);
  }, [getUserExtraDetailByUserId]);

  useEffect(() => {
    dispatch(GetHeaders());
  }, []);

  const handleUnlinkDevice = () => {
    /*author mazhar iqbal
      unlink device using user ID
    */
    dispatch(UnlinkDevicefromUser(getByUserId?.user?.id));
  };

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
              Do you want to unpair the device? In order to be able to log in
              other.
            </span>
            <span className="modal-desc-text">
              confirm your password and then confirm the operation.
            </span>

            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: "20px" }}>
                <TextField size="small"
                  fullWidth


                  label="LINK DEVICE"
                  id="linkDevice"
                  value={linkDevices}
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
                  sx={inputStyle}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ position: "relative", marginBottom: "10px" }}
              >
                <TextField size="small"
                  fullWidth
                  type="password"
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
                  sx={inputStyle}
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
              <button
                className="button-sec btn-confirm"
                onClick={handleUnlinkDevice}
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  //uploading file state
  const [allUser, setAllUser] = useState(false);

  const [updateCompanyImg, setUpdateCompanyImg] = useState();
  const [companyImg, setCompanyImg] = useState();

  const onImageChange = async (e) => {
    // console.log(e.target.files[0])
    const originalFile = e.target.files[0];
    const checkExtension = originalFile["type"].split("/")[0] === "image";

    //if input is image
    if (checkExtension) {
      setUpdateCompanyImg(originalFile);

      const [file] = e.target.files;
      setCompanyImg(URL.createObjectURL(file));
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
          <button
            onClick={() => {
              setCompanyImg();
              props.onHide();
            }}
            className="modal-close-btn"
          >
            X
          </button>
          <Modal.Header>
            <Modal.Title class="mt-2 text-center add_workshiftmodal_title d-flex justify-content-center flex-grow-1">
              <h4 className="text-center">
                <b>{t("upload_file")}</b>
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
                      {t("drag_drop")} <br /> {t("your_image")} <br />{" "}
                      {t("size_of_image")}
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
                onClick={() => {
                  setCompanyImg();
                  props.onHide();
                }}
              >
                {t("cancel")}
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={() => {
                  if (updateCompanyImg?.size <= 512000) {
                    props.onHide();
                  } else {
                    toast.info("File size must be lest than 500KB");
                  }
                }}
              >
                <b>{t("apply_changes")}</b>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  const uploadUpdtedImage = () => {
    if (isImage) {
      let formData = new FormData();
      formData.append("id", isImage);
      formData.append("option", "user");
      formData.append("file", updateCompanyImg);

      /*author mazhar iqbal
        upload user image to the server
      */

      dispatch(UploadFileToServer(formData));
    } else {
      const user = {
        user: {
          id: getByUserId?.user?.id,
        },
        accessMethod: {
          id: 5,
        },
        description: "Face recognition",
      };

      /*author mazhar iqbal
        if user has no pervious image then 
        first we create image relation with user 
      */

      dispatch(CreateUserImage(user))
        .then((res) => {
          let formData = new FormData();
          formData.append("id", res.payload.data.data.id);
          formData.append("option", "user");
          formData.append("file", updateCompanyImg);

          /*author mazhar iqbal
            upload image to the server
          */

          dispatch(UploadFileToServer(formData));
        })
        .then(() => {
          navigate("/dashboard/search-employe", { replace: true });
        });
    }
  };

  const handleSubmit = () => {
    let body = {
      address1: address1,
      address2: address2,
      arabicName: arabicName,
      bloodType: bloodType,
      country: country,
      homePhone: homeNumber,
      id: getByUserId?.user?.id,

      postalCode: postCode,
      town: town,
      wasVaccinated: true,
    };
    const data = {
      id: getByUserId?.user?.id,
      phoneNumber: phone,
      email: userName,
      name: name,
      status: {
        id: "4",
      },
      dob: date.getTime(),
      gender: {
        id: gender,
      },
    };

    if (updateCompanyImg) {
      /*author mazhar iqbal
        update image
      */
      uploadUpdtedImage();
    }

    /*author mazhar iqbal
      update user extra data
    */

    dispatch(UpdateUserExtraData({ id: getByUserId?.user?.id, body: body }));

    /*author mazhar iqbal
      update user data
    */

    dispatch(UpdateUserProfileData(data)).then(() => {
      /*author mazhar iqbal
        get updated user data
      */

      dispatch(GetUserDetailByUserId(getByUserId?.user?.id));
    });
  };

  return (
    <div className="profile-sec">
      <div
        className="edit-profile--img-container"
        onClick={() => setAllUser(true)}
      >
        {companyImg ? (
          <img src={companyImg} alt="user image" />
        ) : getUserDetailByUserId?.selfie ? (
          <img
            src={`data:image/png;base64,${getUserDetailByUserId?.selfie}`}
            alt="user image"
          />
        ) : (
          <img src={profileDemo} alt="user image" />
        )}
        <span className="modal-file-upload"></span>
      </div>
      <span
        className="profile-sec__heading"
        style={{ margin: "70px 0 20px 0" }}
      >
        {t("personal_data")}
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
              sx={inputStyle}
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
              sx={inputStyle}
            />
            <span className="input-icons">
              <MailOutlineIcon />
            </span>
          </Grid>
          <Grid item xs={6} sx={{ position: "relative" }}>
            <TextField size="small"
              fullWidth
              type="password"
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
              sx={inputStyle}
            />
            <span className="input-icons">
              <VisibilityIcon />
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
              sx={inputStyle}
            />
            <span className="input-icons">
              <PhoneIphoneIcon />
            </span>
          </Grid>
          <Grid item xs={6} sx={{ position: "relative" }}>
            <Box sx={{ mt: "6px" }}>
              <FormControl fullWidth sx={inputStyle}>
                <InputLabel id="gender">
                  {t("gender")}
                </InputLabel>
                <Select size="small"

                  displayEmpty
                  labelId="gender"
                  id="gender"
                  value={gender}
                  label="GENDER"
                  onChange={(e) => setGender(e.target.value)}
                  defaultValue={getByUserId?.gender?.id}
                  sx={{
                    fontSize: "10px",
                    padding: "3px 3px 3px 10px",
                  }}
                >
                  {AllGenders && AllGenders.length > 0 ? (
                    AllGenders?.map((item, index) => {
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
                  ) : (
                    <MenuItem
                      value="--"
                      sx={{
                        fontSize: "10px",
                      }}
                    >
                      --
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ position: "relative" }}>
            <div className="dateTimeInput">
              <div className="dateTimeInput-container">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack sx={inputStyle}>
                    {/* <DesktopDatePicker
                      label="DOB"
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      textFieldStyle={{ width: "100%" }}
                      onChange={setDate}
                      renderInput={(params) => <TextField size="small" {...params} />}
                    /> */}
                    <DesktopDatePicker
                      label={t("date_desktop")}
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      onChange={(e) => {
                        console.log("selected date", e);

                        setdate(e);
                      }}
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
              value={linkDevices}
              // onClick={() => {setModalShow(true)}}
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
              sx={inputStyle}
            />
            {getUserDetailByUserId?.deviceId && (
              <span className="input-icons" onClick={() => setModalShow(true)}>
                <DeleteIcon />
              </span>
            )}
          </Grid>
        </Grid>
      </div>
      {showExtraData && (
        <span
          className="profile-sec__heading"
          style={{ margin: "20px 0 20px 0" }}
        >
          {t("extra_data")}
        </span>
      )}

      <div className="name">
        {showExtraData && (
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
                sx={inputStyle}
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
                sx={inputStyle}
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
                sx={inputStyle}
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
                sx={inputStyle}
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
                sx={inputStyle}
              />
            </Grid>{" "}
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
                sx={inputStyle}
              />
            </Grid>{" "}
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
                sx={inputStyle}
              />
            </Grid>{" "}
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
                sx={inputStyle}
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
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={6} sx={{ position: "relative" }}>
              <TextField size="small"
                fullWidth

                label={headersList?.header10}
                id="NAME"
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
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        )}
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

export default Profile;
