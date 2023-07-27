import React, { useState } from "react";
import UploadImage from "../UploadImage";
// import iccancel from "../../../../assets/images/ic-cancel.svg";
import { Box, TextField } from "@mui/material";
import { CreateZonePlane, UploadImgZonePlane } from "../../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { Modal } from "react-bootstrap";
import ReusableTextField from "../../../../components/ReusableTextField ";

const ShowDeviceModal = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const [imagePreviewUrl, setimagePreviewUrl] = useState([]);
  const [dropzone1, setdropzone1] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);


  const dispatch = useDispatch();

  const resetForm = () => {
    setimagePreviewUrl([]);
    setdropzone1([]);
    setName("");
  }

  const addFilesToDropzone = (files, dropzone) => {
    let files_with_preview = [];
    files.map((file) => {
      file["preview"] = URL.createObjectURL(file);
      files_with_preview.push(file);
    });

    console.log("test url check", files_with_preview);
    setimagePreviewUrl(files_with_preview["preview"]);
    setdropzone1([...files_with_preview]);
  };

  const createZoneplaneHandler = () => {
    const createData = {
      name,
      zone: {

        id: localStorage.getItem('singlezoneId'),
      },
      file: dropzone1[0],
      option: "zone+"
    }

    if (!name ) {
      setSubmitClicked(true)
    } else {
      if(!dropzone1?.length > 0){
        toast.warn("Please attach image");
      }else{

        dispatch(CreateZonePlane(createData))
        resetForm()
        setSubmitClicked(false)
        props.onHide()
      }
    }
  }
  return (
    <Modal
      className="department_and_user_delete-modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {t(props.title_modal)}
        </Modal.Title>
        <img onClick={() => {
          props.onHide();
          props?.setProfileImage("");
          setSubmitClicked(false)
          setdropzone1([])
        }}
          className="modalClose" src={cancel} alt="" />
      </Modal.Header>
      <Modal.Body
      // className="department_modal_body"
      >
        <div className="container add_new_model_plane">
          <div className="text-center mb-4">
            <h1>{t("add_new_plan")}</h1>
          </div>
          <div>
            {/* <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "50px",
              }}
            >
              <TextField
                size="small"
                fullWidth
                required
                label={t("name")}
                id="NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  textAlign: lCode === "ar" ? "right" : "left",
                  "& 	.MuiOutlinedInput-notchedOutline": {
                    textAlign: lCode === "ar" ? "right" : "left",
                  },
                  "& 	.MuiInputLabel-root": {
                    fontSize: 14,
                    left: lCode === "ar" ? "inherit" : "0",
                    right: lCode === "ar" ? "1.75rem" : "0",
                    transformOrigin: lCode === "ar" ? "right" : "left"
                  }
                }}
              />
            </Box> */}
            <ReusableTextField
            label={t("name")}
            onChange={(value)=>{
              if (value === '' ) {
                setNameError('Name cannot be empty');
              } else {
                setNameError('');
              }
          
              setName(value);
            }}
            value={name}
            helperText={nameError}
            isRequired={true}
            submitClicked={submitClicked}
            validate={(value) => value === ''}
          />
          </div>

          <div className="mt-3 mb-3">
            <UploadImage
              className="upload_image_plane"
              onPress={(files) => {
                addFilesToDropzone(files, "dropzone1");
              }}
              dropzone1={dropzone1}
              imagePreviewUrl={dropzone1[0]?.preview}
            />
          </div>

          {/* <ShowImgUpload /> */}

          {/* <button className="btn btn-lg w-100">UPLOAD PLANE</button> */}
          <div className="add_plane_footer_button pt-2" >
            <button
              className="btn_cancel_background_gray_hover"
              style={{ width: "100%" }}
              data-dismiss="modal"
              onClick={() => {
                setdropzone1([])
                setSubmitClicked(false)
                props?.setProfileImage("");
                props.onHide();
              }}

            >
              {t("cancel")}
            </button>
            <button
              className="custom_primary_btn_dark"
              style={{ width: "100%" }}
              data-dismiss="modal"
              onClick={() => {
                if (dropzone1.length !== 0) {
                  props?.setProfileImage(dropzone1[0]?.preview);
                } else {
                  props?.setProfileImage("");
                }
                createZoneplaneHandler()
              }}
            >
              {t("create")?.toUpperCase()}
            </button>
          </div>
        </div>

      </Modal.Body>

    </Modal>
  );
};

export default ShowDeviceModal;
