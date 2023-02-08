import { Box } from "@mui/system";
import React from "react";
import Dropzone from "react-dropzone";
// import pdf from "../../../assets/images/pdf.svg";
import jpg from "../../../assets/images/jpg.png";
import png from "../../../assets/images/png.png";
import excel_image from "../../../assets/images/xls.png";
import pdf_image from "../../../assets/images/pdf.png";
import word_image from "../../../assets/images/doc.png";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const UploadFile = ({ onPress, dropzone1, setdropzone1 }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // console.log(dropzone1);

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
                  <h4>{t("drag_and_drop")}</h4>
                  <h5>{t("your_image")} </h5>
                  <p> {t("size_of_image")}</p>
                </div>
              </div>
              {/* {dropzone1?.map((file) => (
                                <img
                                    className="img_preview_set text-wrap"
                                    src={file.preview}
                                    alt={file.path}
                                />
                            ))} */}
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
          <img
            width="40px"
            height="40px"
            src={
              (dropzone1?.path?.split(".").pop()?.toLowerCase() === "pdf" &&
                pdf_image) ||
              (dropzone1?.path?.split(".").pop()?.toLowerCase() === "jpg" &&
                jpg) ||
              (dropzone1?.path?.split(".").pop()?.toLowerCase() === "png" &&
                png) ||
              (dropzone1?.path?.split(".").pop()?.toLowerCase() === "xlsx" &&
                excel_image) ||
              dropzone1?.path?.split(".").pop()?.toLowerCase() === "docx" ||
              (dropzone1?.path?.split(".").pop()?.toLowerCase() === "pptx" &&
                word_image)
            }
          />
          <Box>
            <p>{dropzone1?.path}</p>
            <p>{dropzone1?.size}</p>
          </Box>
          <i
            onClick={() => {
              setdropzone1("");
            }}
            className="fa fa-times"
            aria-hidden="true"
          ></i>
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
