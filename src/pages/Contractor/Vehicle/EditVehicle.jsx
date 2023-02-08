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

import photo from "../../../assets/images/as.jpg";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import cloudsvg from "../../../assets/images/cloud.svg";
import userImage from "../../../assets/images/employee-4.png";
import CarDemoImg from "../../../assets/images/carDemoImg.png";
import {
  AddNewVehicle,
  CreateRelationForVehicleImg,
  GetByUserId,
  GetVehicleDetailById,
  GetVehicleStatus,
  UpdateVehicleData,
  UploadFileToServer,
  CheckVehicleImgStatus,
  GetVehicleImgUsingId,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import { byUserId } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  vehicleDetailById,
  vehicleStatus,
} from "../../../reduxToolkit/Contractor/ContractorSlice";
import i18next, { t } from "i18next";
const EditVehicle = () => {
  let { id } = useParams();
  const getByUserId = useSelector(byUserId);
  const getVehicleDetailById = useSelector(vehicleDetailById);
  const getVehicleStatus = useSelector(vehicleStatus);

  const contactorId = getByUserId?.id;

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const [employee, setEmployee] = useState();
  const [allUser, setAllUser] = useState(false);

  console.log("cccccccccccccccccccccc", getVehicleStatus);

  //uploading file state
  const [updateCompanyImg, setUpdateCompanyImg] = useState();
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
    const originalFile = e.target.files[0];
    const checkExtension = originalFile["type"].split("/")[0] === "image";

    //if input is image
    if (checkExtension) {
      setPdfFile("");
      setUpdateCompanyImg(originalFile);

      let formatedValue = formatBytes(originalFile?.size);
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
    brand: getVehicleDetailById?.vehicle?.brand,
    subBrand: getVehicleDetailById?.vehicle?.subBrand,
    modal: getVehicleDetailById?.vehicle?.model,
    plates: getVehicleDetailById?.vehicle?.plate,
    color: getVehicleDetailById?.vehicle?.color,
    sn: getVehicleDetailById?.vehicle?.serialNumber,
    vin: getVehicleDetailById?.vehicle?.vin,
  });

  useEffect(() => {
    setVehicleObject({
      ...vehicleObject,
      ["brand"]: getVehicleDetailById?.vehicle?.brand,
      ["subBrand"]: getVehicleDetailById?.vehicle?.subBrand,
      ["color"]: getVehicleDetailById?.vehicle?.color,
      ["modal"]: getVehicleDetailById?.vehicle?.model,
      ["plates"]: getVehicleDetailById?.vehicle?.plate,
      ["vin"]: getVehicleDetailById?.vehicle?.vin,
      ["sn"]: getVehicleDetailById?.vehicle?.serialNumber,
    });
  }, [getVehicleDetailById]);

  const handleSubmitVehicle = () => {
    if (vehicleObject?.brand && vehicleObject?.plates) {
      const body = {
        brand: vehicleObject?.brand,
        color: vehicleObject?.color,
        model: Number(vehicleObject?.modal),
        plate: vehicleObject?.plates,
        id: id,
        serialNumber: vehicleObject?.sn,
        subBrand: vehicleObject?.subBrand,
        vin: vehicleObject?.vin,
        createdAt: 0,
        status: {
          id: employee?.id,
          name: employee?.name,
        },
        updatedAt: null,
      };
      /*author mazhar iqbal
        Update vehicle data
      */
      dispatch(UpdateVehicleData(body)).then(() => {
        if (updateCompanyImg) {
          /*author mazhar iqbal
            check vehicle has already image or not
          */
          dispatch(CheckVehicleImgStatus(id)).then((res) => {
            if (res?.payload?.data?.data) {
              /*author mazhar iqbal
                get previous image id to update vehicle image
              */
              dispatch(GetVehicleImgUsingId(id))
                .then((res) => {
                  let formData = new FormData();
                  formData.append("id", res?.payload?.data?.data?.id);
                  formData.append("option", "vehicle");
                  formData.append("file", updateCompanyImg);
                  /*author mazhar iqbal
                    upload updated vehicle image to the server 
                  */
                  dispatch(UploadFileToServer(formData));
                })
                .then(() => {
                  navigate("/dashboard/Contractor/search-vehicle");
                });
            } else {
              const body = {
                vehicle: {
                  id: getVehicleDetailById?.vehicle?.id,
                },
                description: "Car Image",
              };
              /*author mazhar iqbal
                create vehicle image relation. beacause this vehicle has no image before this
              */
              dispatch(CreateRelationForVehicleImg(body))
                .then((response) => {
                  let formData = new FormData();
                  formData.append("id", response?.payload?.data?.data?.id);
                  formData.append("option", "vehicle");
                  formData.append("file", updateCompanyImg);
                  /*author mazhar iqbal
                    upload vehicle image to the server
                  */
                  dispatch(UploadFileToServer(formData));
                })
                .then(() => {
                  navigate("/dashboard/Contractor/search-vehicle");
                });
            }
          });
        }
      });
    } else {
      toast.info("Please Enter Brand and Plates");
    }
  };

  useEffect(() => {
    /*author mazhar iqbal
      get vehicle detail with documents
    */
    dispatch(GetVehicleDetailById(id));
    /*author mazhar iqbal
      get vehicle status option list
    */
    dispatch(GetVehicleStatus());
  }, []);

  return (
    <>
      <div className="edit-profile" style={{ width: "800px" }}>
        <button
          className="edit-profile-save-btn"
          // onClick={() => navigate(`/dashboard/Contractor/search-vehicle`)}
          onClick={handleSubmitVehicle}
        >
          {t("update_vehicle")}
          <span>
            <SaveIcon />
          </span>
        </button>
        <div
          className="edit-profile--img-container"
          onClick={() => setAllUser(true)}
        >
          {companyImg ? (
            <img
              src={companyImg}
              alt="user image"
              style={{ objectFit: "contain" }}
            />
          ) : getVehicleDetailById?.vehicle?.image ? (
            <img
              src={`data:image/png;base64,${getVehicleDetailById?.vehicle?.image}`}
              alt="user image"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <img
              src={CarDemoImg}
              alt="user image"
              style={{ objectFit: "contain" }}
            />
          )}
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


                label={t("modal")}
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t("status")}</InputLabel>
                  <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue="employe"
                    value={employee?.name}
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
                            value={{ id: item?.id, name: item?.name }}
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

export default EditVehicle;
