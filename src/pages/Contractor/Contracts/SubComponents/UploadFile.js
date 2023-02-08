import { Box } from "@mui/system";
import { t } from "i18next";
import React from "react";
import Dropzone from "react-dropzone";
import pdf from "../../../assets/images/pdf.svg";

const UploadFile = ({ onPress, dropzone1 }) => {
  return (
    <div className="previewComponent">
      <Dropzone onDrop={onPress}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="">
            <input {...getInputProps()} />
            <div className="add_new_plane_image_upload">
              <div className="inner_item">
                <span
                  className="fa fa-cloud-upload fill"
                  aria-hidden="true"
                ></span>
                <div className="text-center">
                  <h4>{t("drag_drop")}</h4>
                  <h5> {t("your_image")}</h5>
                  <p> {t("s")} </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
      {dropzone1 != "" ? (
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            paddingTop: "20px",
            // alignItems: "center",
            gap: "1rem",
          }}
        >
          <img src={pdf} />
          <Box>
            <p>{dropzone1?.path}</p>
            <p>{dropzone1?.size}</p>
          </Box>
          <i class="fa fa-times" aria-hidden="true"></i>
        </Box>
      ) : (
        <Box sx={{ paddingTop: "20px" }}></Box>
      )}

      {/* <Box>
                prgress bar
            </Box> */}
      {/* <div className="mb-3 imgPreview">{$imagePreview}</div> */}
    </div>
  );
};
export default UploadFile;
