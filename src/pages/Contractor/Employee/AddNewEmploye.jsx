import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import cloudsvg from "../../../assets/images/cloud.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/system";
import profileDemo from "../../../assets/images/userDemoImg.png";
import {
  GetAllGender,
  AddNewEmployee,
  AddContractorsEmployee,
  CreateUserImage,
  UploadFileToServer,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import { useDispatch, useSelector } from "react-redux";
import {
  allGender,
  byUserId,
} from "../../../reduxToolkit/Contractor/ContractorSlice";
import { toast } from "react-toastify";
import i18next, { t } from "i18next";
const AddNewEmploye = () => {
  const getAllGender = useSelector(allGender);
  const dispatch = useDispatch();
  const [gender, setGender] = useState();
  let navigate = useNavigate();
  const [allUser, setAllUser] = useState(false);
  const getByUserId = useSelector(byUserId);
  const contactorId = getByUserId?.id;

  //image
  const [companyImg, setCompanyImg] = useState();
  const [previewSize, setPreviewSize] = useState();
  const [updateCompanyImg, setUpdateCompanyImg] = useState();

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const onImageChange = async (e) => {
    const originalFile = e.target.files[0];
    setUpdateCompanyImg(originalFile);

    let formatedValue = formatBytes(originalFile?.size);
    setPreviewSize(formatedValue);

    const [file] = e.target.files;
    setCompanyImg(URL.createObjectURL(file));
  };

  function AllUser(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ background: "rgba(0,0,0,0.6)" }}
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
                      {t("drag_drop")}<br /> {t("your_image")} <br /> {t("size_of_image")}
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
  useEffect(() => {
    /*Author  Mazhar iqbal
      Get Gender list
    */
    dispatch(GetAllGender());
  }, []);
  // "+524427065909"
  const [employeObject, setEmployeObject] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });
  const handleSubmitEmploye = () => {
    if (updateCompanyImg !== undefined) {
      if (updateCompanyImg.size < 512000) {
        if (
          employeObject?.name &&
          employeObject?.email &&
          employeObject?.phoneNo &&
          gender
        ) {
          const body = {
            name: employeObject?.name,
            email: employeObject?.email,
            phoneNumber: employeObject?.phoneNo,
            gender: {
              id: gender,
              name: "male",
            },
          };
          /*Author  Mazhar iqbal
                Create New Employee
            */
          dispatch(AddNewEmployee({ contactorId, body })).then((res) => {
            if (res.payload.status >= 400) {
              toast.error(res.payload.data.message);
            }
            if (res.payload.status == 201) {
              const body = {
                contractor: {
                  id: contactorId,
                },
                user: {
                  id: res.payload.data.data.id,
                },
              };
              /*Author  Mazhar iqbal
                Create Employee Relationnhip with Contractor
              */
              dispatch(AddContractorsEmployee({ contactorId, body })).then(
                () => {
                  const user = {
                    user: {
                      id: res.payload.data.data.id,
                    },
                    accessMethod: {
                      id: 5,
                    },
                    description: "Face recognition",
                  };
                  /*Author  Mazhar iqbal
                    Create Employee Selfie Relation
                  */
                  dispatch(CreateUserImage(user))
                    .then((res) => {
                      let formData = new FormData();
                      formData.append("id", res.payload.data.data.id);
                      formData.append("option", "user");
                      formData.append("file", updateCompanyImg);
                      /*Author  Mazhar iqbal
                        Upload Employee Selfie to the server 
                      */
                      dispatch(UploadFileToServer(formData));
                    })
                    .then(() => {
                      navigate("/dashboard/contractor/search-employe", { replace: true });
                    });
                }
              );
            }
          });
        } else {
          toast.info("Must Fill All Inputs");
        }
      } else {
        toast.error("File Size Must me less than 500kB");
      }
    } else {
      toast.error("Select Profile Picture");
    }
  };
  return (
    <div className="add-new-employe" style={{ marginLeft: "-50px" }}>
      <Grid container sx={{ my: "30px" }}>
        <Grid item xs={5}>
          <span className="add-new-employe__heading">

            <i className="fa fa-arrow-left" aria-hidden="true"
              style={{
                transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
                margin: "0 10px"
              }}
              onClick={() => {
                navigate("/dashboard/contractor/search-employe", { replace: true });
              }}
            ></i>
            {t("create_employee")}
          </span>
        </Grid>
      </Grid>
      <div className="add-new-employe__detail">
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={4}>
            <div className="add-new-employe__user">
              <div className="edit-profile">
                <div
                  className="edit-profile--img-container"
                  onClick={() => setAllUser(true)}
                >
                  {companyImg ? (
                    <img src={companyImg} alt="user image" />
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
                        value={employeObject.name}
                        onChange={(e) =>
                          setEmployeObject({
                            ...employeObject,
                            ["name"]: e.target.value,
                          })
                        }
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
                        value={employeObject.email}
                        onChange={(e) =>
                          setEmployeObject({
                            ...employeObject,
                            ["email"]: e.target.value,
                          })
                        }
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
                        id="PHONE NUMBER"
                        value={employeObject.phoneNo}
                        onChange={(e) =>
                          setEmployeObject({
                            ...employeObject,
                            ["phoneNo"]: e.target.value,
                          })
                        }
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
                          <InputLabel id="demo-simple-select-label">
                            {t("gender")}
                          </InputLabel>
                          <Select size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue="gender"
                            value={gender}
                            label={t("gender")}
                            onChange={(e) => setGender(e.target.value)}
                            sx={{
                              fontSize: "10px",
                              padding: "3px 3px 3px 10px",
                            }}
                          >
                            {getAllGender && getAllGender.length > 0 ? (
                              getAllGender?.map((item) => {
                                return (
                                  <MenuItem
                                    value={item?.id}
                                    sx={{
                                      fontSize: "10px",
                                    }}
                                  >
                                    {item?.name}
                                  </MenuItem>
                                );
                              })
                            ) : (
                              <MenuItem
                                value={10}
                                sx={{
                                  fontSize: "10px",
                                }}
                              >
                                -
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
            <button
              className="edit-profile-save-btn"
              style={{
                position: "relative",
                margin: "70px auto",
                width: "100%",
              }}
              onClick={handleSubmitEmploye}
            >
              {t("create_employee")}
              <span>
                <SaveIcon />
              </span>
            </button>
          </Grid>
          {/* <Grid item xs={8}>
            <div className="add-new-employe__document">
              <button className="edit-profile-save-btn"   onClick={()=>( navigate(`/dashboard/search-employe`))}>

              <span className="add-new-employe__document__heading">
                DOCUMENTS
              </span>
              <Grid container sx={{ my: "10px" }}>
                <Grid item xs={6}>
                  <span className="add-new-employe__title">FILE NAME</span>
                </Grid>
                <Grid item xs={6}>
                  <span className="add-new-employe__type">FILE</span>
                </Grid>
              </Grid>
              <div className="add-new-employe__document--detail">
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div className="name">
                      <TextField size="small"
                        fullWidth
         
                        label="CURP"
                        id="NAME"
                        //   value={}
                        //   onChange={(e) => setName(e.target.value)}
                        InputLabelProps={{
                          style: {
                            fontSize: "12px",
                            fontWeight: 600,
                            background: "#ffffff",
                            padding: "0px 8px 0px 8px",
                            letterSpacing: "1px",
                          },
                        }} // font size of input label
                        inputProps={{
                          sx: {
                            border: "none",
                            outline: "none",
                            fontSize: "12px",
                            letterSpacing: "0px",
                            color: "#707070",
                            "&::placeholder": {
                              color: "#707070",
                              fontSize: "8px",
                            },
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <button
                      className="add-new-employe__attach"
                      onClick={() => setAllUser(true)}
                    >
                      ATTACH FILE
                      <AttachFileIcon />
                    </button>
                  </Grid>
                  <Grid item xs={3}>
                    <button className="add-new-employe__filename">
                      NO FILE
                      <GetAppIcon />
                    </button>
                  </Grid>
                </Grid>
              </div>
              <div className="add-new-employe__document--detail">
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div className="name">
                      <TextField size="small"
                        fullWidth
                      
                  
                        label="CURP"
                        id="NAME"
                        //   value={}
                        //   onChange={(e) => setName(e.target.value)}
                        InputLabelProps={{
                          style: {
                            fontSize: "12px",
                            fontWeight: 600,
                            background: "#ffffff",
                            padding: "0px 8px 0px 8px",
                            letterSpacing: "1px",
                          },
                        }} // font size of input label
                        inputProps={{
                          sx: {
                            border: "none",
                            outline: "none",
                            fontSize: "12px",
                            letterSpacing: "0px",
                            color: "#707070",
                            "&::placeholder": {
                              color: "#707070",
                              fontSize: "8px",
                            },
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <button
                      className="add-new-employe__attach"
                      onClick={() => setAllUser(true)}
                    >
                      ATTACH FILE
                      <AttachFileIcon />
                    </button>
                  </Grid>
                  <Grid item xs={3}>
                    <button className="add-new-employe__filename">
                      NO FILE
                      <GetAppIcon />
                    </button>
                  </Grid>
                </Grid>
              </div>
              <div className="add-new-employe__document--detail">
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <span className="add-new-employe__filelabel">
                      <b>CONSTANCIA DC3 - A</b>
                    </span>
                    <span
                      className="add-new-employe__filelabel"
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        letterSpacing: "1px",
                        marginTop: "-4px",
                        textDecoration: "underline",
                      }}
                    >
                      DOWNLOAD FORM TO FILL IN IT
                    </span>
                  </Grid>
                  <Grid item xs={3}>
                    <button
                      className="add-new-employe__attach"
                      onClick={() => setAllUser(true)}
                    >
                      ATTACH FILE
                      <AttachFileIcon />
                    </button>
                  </Grid>
                  <Grid item xs={3}>
                    <button className="add-new-employe__filename">
                      NO FILE
                      <GetAppIcon />
                    </button>
                  </Grid>
                </Grid>
              </div>
              <div className="add-new-employe__document--detail">
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <span className="add-new-employe__filelabel">
                      <b>CONSTANCIA DC3 - B</b>
                    </span>
                    <span
                      className="add-new-employe__filelabel"
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        letterSpacing: "1px",
                        marginTop: "-4px",
                        textDecoration: "underline",
                      }}
                    >
                      DOWNLOAD FORM TO FILL IN IT
                    </span>
                  </Grid>
                  <Grid item xs={3}>
                    <button
                      className="add-new-employe__attach"
                      onClick={() => setAllUser(true)}
                    >
                      ATTACH FILE
                      <AttachFileIcon />
                    </button>
                  </Grid>
                  <Grid item xs={3}>
                    <button className="add-new-employe__filename">
                      NO FILE
                      <GetAppIcon />
                    </button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid> */}
        </Grid>
      </div>
      <AllUser show={allUser} onHide={() => setAllUser(false)} />
    </div>
  );
};

export default AddNewEmploye;
