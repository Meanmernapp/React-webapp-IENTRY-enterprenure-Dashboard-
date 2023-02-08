import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Modal } from "react-bootstrap";

import SaveIcon from "@mui/icons-material/Save";
import { Link, useNavigate } from "react-router-dom";
import cloudsvg from "../../../assets/images/cloud.svg";
import {
  AddNewVehicle,
  CreateRelationForVehicleImg,
  GetByUserId,
  GetVehicleStatus,
  UploadFileToServer,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import {
  byUserId,
  vehicleStatus,
} from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../../reduxToolkit/authentication/authenticationSlice";
import { toast } from "react-toastify";
import CarDemoImage from "../../../assets/images/carDemoImg.png";
import i18next, { t } from "i18next";
const AddVehical = () => {
  const userData = useSelector(userDetail);
  const getByUserId = useSelector(byUserId);
  const contactorId = getByUserId?.id;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [employee, setEmployee] = useState();
  const [allUser, setAllUser] = useState(false);
  const getVehicleStatus = useSelector(vehicleStatus);

  //uploading file state
  const [updateCompanyImg, setUpdateCompanyImg] = useState();
  const [companyImg, setCompanyImg] = useState();

  const onImageChange = async (e) => {
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
                      {t("drag_drop")} <br />{t("your_file")} <br /> {t("size_of_image")}
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

  const [vehicleObject, setVehicleObject] = useState({
    brand: "",
    subBrand: "",
    modal: "",
    plates: "",
    color: "",
    sn: "",
    vin: "",
  });
  const handleSubmitVehicle = () => {
    if (
      vehicleObject?.brand !== "" &&
      vehicleObject?.plates !== "" &&
      vehicleObject?.color !== "" &&
      vehicleObject?.modal !== "" &&
      vehicleObject?.subBrand !== "" &&
      vehicleObject?.sn !== "" &&
      vehicleObject?.vin !== ""
    ) {
      const body = {
        brand: vehicleObject?.brand,
        color: vehicleObject?.color,
        model: Number(vehicleObject?.modal),
        plate: vehicleObject?.plates,
        serialNumber: vehicleObject?.sn,
        subBrand: vehicleObject?.subBrand,
        vin: vehicleObject?.vin,
        createdAt: null,
        status:
          employee == "4"
            ? { id: 4, name: "ACTIVE" }
            : { id: 6, name: "INACTIVE" },
        updatedAt: null,
      };
      /*author mazhar iqbal
        add new vehicle
      */
      dispatch(AddNewVehicle({ contactorId, body })).then((response) => {
        if (updateCompanyImg) {
          const body = {
            vehicle: {
              id: response?.payload?.data?.data?.vehicle?.id,
            },
            description: "Car Image",
          };
          /*author mazhar iqbal
            create vehicle image relation 
          */
          dispatch(CreateRelationForVehicleImg(body)).then((response) => {
            let formData = new FormData();
            formData.append("id", response?.payload?.data?.data?.id);
            formData.append("option", "vehicle");
            formData.append("file", updateCompanyImg);
            /*author mazhar iqbal
              upload vehicle image to the server 
            */
            dispatch(UploadFileToServer(formData));
          });
        }
        navigate("/dashboard/Contractor/search-vehicle");
      });
    } else {
      toast.info("Please Fill All Fields");
    }
  };

  useEffect(() => {
    /*author mazhar iqbal
      get user detail
    */
    dispatch(GetByUserId(userData?.data?.id));
    /*author mazhar iqbal
      get list of vehicle status from DB
    */
    dispatch(GetVehicleStatus());
  }, []);

  return (
    <>
      {" "}
      <div className="head">
        <div className="headLeft mt-3 addcontractor">
          <Link to="/dashboard/contractor/search-vehicle">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2> {t("create_vehicle")}</h2>
        </div>
      </div>
      <div className="edit-profile" style={{ width: "800px" }}>
        <button className="edit-profile-save-btn" onClick={handleSubmitVehicle}>
          {t("create_vehicle")}
          <span>
            <SaveIcon />
          </span>
        </button>
        <div
          className="edit-profile--img-container"
          onClick={() => setAllUser(true)}
        >
          <img
            src={companyImg ? companyImg : CarDemoImage}
            alt="user image"
            style={{ objectFit: "contain" }}
          />
          <span className="modal-file-upload"></span>
        </div>
        <div className="name">
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ position: "relative" }}>
              <TextField size="small"
                fullWidth


                label={t("brand")}
                value={vehicleObject.brand}
                onChange={(e) =>
                  setVehicleObject({
                    ...vehicleObject,
                    ["brand"]: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 0px 0px 4px",
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
                      fontSize: "12px",
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
            <Grid item xs={6}>
              <TextField size="small"
                fullWidth


                label={t("sub_brand")}
                value={vehicleObject.subBrand}
                onChange={(e) =>
                  setVehicleObject({
                    ...vehicleObject,
                    ["subBrand"]: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 0px 0px 4px",
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
                      fontSize: "12px",
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
            <Grid item xs={6}>
              <TextField size="small"
                fullWidth


                label={t("color")}
                value={vehicleObject.color}
                onChange={(e) =>
                  setVehicleObject({
                    ...vehicleObject,
                    ["color"]: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 0px 0px 4px",
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
                      fontSize: "12px",
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
            <Grid item xs={6}>
              <TextField size="small"
                fullWidth


                label={t("model")}
                value={vehicleObject.modal}
                onChange={(e) =>
                  setVehicleObject({
                    ...vehicleObject,
                    ["modal"]: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 0px 0px 4px",
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
                      fontSize: "12px",
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
            <Grid item xs={6}>
              <TextField size="small"
                fullWidth


                label={t("plates")}
                value={vehicleObject.plates}
                onChange={(e) =>
                  setVehicleObject({
                    ...vehicleObject,
                    ["plates"]: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 0px 0px 4px",
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
                      fontSize: "12px",
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
            <Grid item xs={6}>
              <TextField size="small"
                fullWidth


                label={t("vin")}
                value={vehicleObject.vin}
                onChange={(e) =>
                  setVehicleObject({
                    ...vehicleObject,
                    ["vin"]: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 0px 0px 4px",
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
                      fontSize: "12px",
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
            <Grid item xs={6}>
              <TextField size="small"
                fullWidth

                label={t("s_n")}
                value={vehicleObject.sn}
                onChange={(e) =>
                  setVehicleObject({ ...vehicleObject, ["sn"]: e.target.value })
                }
                InputLabelProps={{
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#ffffff",
                    padding: "0px 0px 0px 4px",
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
                      fontSize: "12px",
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

            <Grid item xs={6}>
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
                  <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue="employe"
                    // value={employee}
                    label="VEHICLE TYPE"
                    onChange={(e) => setEmployee(e.target.value)}
                    sx={{
                      fontSize: "12px",
                      padding: "3px 3px 3px 10px",
                    }}
                  >
                    {getVehicleStatus && getVehicleStatus.length > 0 ? (
                      getVehicleStatus?.map((item) => {
                        return (
                          <MenuItem
                            value={item?.id}
                            sx={{
                              fontSize: "16px",
                            }}
                          >
                            {item?.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem
                        value=""
                        disabled
                        sx={{
                          fontSize: "16px",
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
          <AllUser show={allUser} onHide={() => setAllUser(false)} />
        </div>
      </div>
    </>
  );
};

export default AddVehical;
