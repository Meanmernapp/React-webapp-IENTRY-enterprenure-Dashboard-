import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import cloudsvg from "../../../assets/images/cloud.svg";
import profileDemo from "../../../assets/images/userDemoImg.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SaveIcon from "@mui/icons-material/Save";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  GetUserStatus,
  GetAllGender,
  GetUserDetailForUpdate,
  UpdateEmployeData,
  CreateUserImage,
  UploadFileToServer,
  GetUserProfileImage,
  CheckUserProfile,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import {
  userStatus,
  allGender,
  userDetailForUpdate,
} from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import i18next, { t } from "i18next";

const EditProfile = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const getAllGender = useSelector(allGender);
  const getUserStatus = useSelector(userStatus);
  const getUserDetailForUpdate = useSelector(userDetailForUpdate);

  const [status, setStatus] = useState();
  const [gender, setGender] = useState(
    getUserDetailForUpdate?.gender?.id == "1"
      ? "1"
      : getUserDetailForUpdate?.gender?.id == "2"
        ? "2"
        : ""
  );

  const [isImage, setIsImage] = useState();

  useEffect(() => {
    dispatch(GetUserStatus());
    dispatch(GetAllGender());
    dispatch(GetUserDetailForUpdate(id));
    dispatch(CheckUserProfile(id)).then((res) => {
      setIsImage(res?.payload?.data?.data);
    });
  }, []);

  useEffect(() => {
    setName(getUserDetailForUpdate?.name);
    setEmail(getUserDetailForUpdate?.email);
    setPhone(getUserDetailForUpdate?.phoneNumber);
    setGender(getUserDetailForUpdate?.gender?.id);
    setStatus(getUserDetailForUpdate?.status?.id);
  }, [getUserDetailForUpdate]);

  const body = {
    id: getUserDetailForUpdate?.id,
    phoneNumber: phone,
    email: email,
    name: name,
    status: {
      id: status,
    },
    dob: 1650384228213,
    gender: {
      id: gender,
    },
  };

  const [allUser, setAllUser] = useState(false);

  //image
  const [companyImg, setCompanyImg] = useState();
  const [updateCompanyImg, setUpdateCompanyImg] = useState();

  const onImageChange = async (e) => {
    console.log(e.target.files[0]);
    const originalFile = e.target.files[0];
    setUpdateCompanyImg(originalFile);

    const [file] = e.target.files;
    setCompanyImg(URL.createObjectURL(file));
  };

  const uploadUpdtedImage = () => {
    /*author mazhar iqbal
        if user has already image or not
      */
    if (isImage) {
      /*author mazhar iqbal
          update employee selfie
        */
      dispatch(GetUserProfileImage(id)).then((res) => {
        let formData = new FormData();
        formData.append("id", res.payload.data.data.id);
        formData.append("option", "user");
        formData.append("file", updateCompanyImg);
        dispatch(UploadFileToServer(formData));
      });
    } else {
      const user = {
        user: {
          id: getUserDetailForUpdate?.id,
        },
        accessMethod: {
          id: 5,
        },
        description: "Face recognition",
      };
      /*author mazhar iqbal
          create employee selfie relation
        */
      dispatch(CreateUserImage(user))
        .then((res) => {
          let formData = new FormData();
          formData.append("id", res.payload.data.data.id);
          formData.append("option", "user");
          formData.append("file", updateCompanyImg);
          /*author mazhar iqbal
            upload employee selfie
          */
          dispatch(UploadFileToServer(formData));
        })
        .then(() => {
          navigate("/dashboard/search-employe", { replace: true });
        });
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
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <button
            onClick={() => {
              setCompanyImg();
              setUpdateCompanyImg();
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
                      src={cloudsvg}
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
                      {t("drag_drop")} <br /> {t("your_image")} <br /> {t("size_of_image")}
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
                  setUpdateCompanyImg();
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
                    toast.info("Image Size must be less Than 500kb");
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

  const handleSubmit = () => {
    /*author mazhar iqbal
      Upadte employee data
    */
    dispatch(UpdateEmployeData(body)).then(() => {
      if (updateCompanyImg !== undefined) {
        /*author mazhar iqbal
          Upadte employee selfie
        */
        uploadUpdtedImage();
      }
      /*author mazhar iqbal
        get employee detail after update
      */
      dispatch(GetUserDetailForUpdate(id));
    });
  };
  return (
    <>
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/search-employe">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <h2>{t("update_employee_information")}</h2>
        </div>
      </div>
      <div className="edit-profile">
        {/* <button className="edit-profile-save-btn" onClick={()=>( navigate(`/dashboard/employee-contract-detail`))} > */}
        <button className="edit-profile-save-btn" onClick={handleSubmit}>
          {t("save_changes")}
          <span>
            <SaveIcon />
          </span>
        </button>
        <div
          className="edit-profile--img-container"
          onClick={() => setAllUser(true)}
        >
          {companyImg ? (
            <img src={companyImg} alt="user image" />
          ) : getUserDetailForUpdate?.selfie ? (
            <img
              src={`data:image/png;base64,${getUserDetailForUpdate?.selfie}`}
              alt="user image"
            />
          ) : (
            <img src={profileDemo} alt="user image" />
          )}

          <span className="modal-file-upload"></span>
        </div>
        <div className="name">
          <Grid container spacing={2}>
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
            </Grid>
            <Grid item xs={12} sx={{ position: "relative" }}>
              <TextField size="small"
                fullWidth


                label={t("email")}
                id="Email"

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
              <span className="input-icons">
                <MailOutlineIcon />
              </span>
            </Grid>
            <Grid item xs={12} sx={{ position: "relative" }}>
              <TextField size="small"
                fullWidth

                label={t("phone_number")}
                id="Phone Number"

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
              <span className="input-icons">
                <PhoneIphoneIcon />
              </span>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: "6px" }}>
                <FormControl fullWidth
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
                  }}>
                  <InputLabel id="demo-simple-select-label">{t("gender")}</InputLabel>
                  <Select size="small"

                    displayEmpty
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="GENDER"
                    onChange={(e) => setGender(e.target.value)}
                    defaultValue={getUserDetailForUpdate?.gender?.id}
                    sx={{
                      fontSize: "10px",
                      padding: "3px 3px 3px 10px",
                    }}
                  >
                    {getAllGender && getAllGender.length > 0 ? (
                      getAllGender?.map((item, index) => {
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
            <Grid item xs={12}>
              <Box sx={{ mt: "6px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="STATUS"
                    defaultValue={status}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{
                      fontSize: "10px",
                      padding: "3px 3px 3px 10px",
                    }}
                  >
                    {getUserStatus && getUserStatus.length > 0 ? (
                      getUserStatus?.map((item) => {
                        return (
                          <MenuItem
                            value={item.id}
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
          </Grid>
        </div>
        <AllUser show={allUser} onHide={() => setAllUser(false)} />
      </div>
    </>
  );
};

export default EditProfile;
