import React from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const UploadImage = ({ onPress, dropzone1, imagePreviewUrl }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // console.log(imagePreviewUrl)
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} />;
  } else {
    $imagePreview = <div className="previewText"></div>;
  }
  return (
    <div className="previewComponent">
      <Dropzone onDrop={onPress}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="">
            <input {...getInputProps()} />
            <div className="add_new_plane_image_upload">
              <div className="inner_item">
                <span className="fa fa-cloud-upload fill" aria-hidden="true">
                </span>
                <div className="text-center" >
                  <h4>{t("drag_and_drop")}</h4>
                  <h5>{t("your_image")}</h5>
                  <p> {t("image_size")}</p>
                </div>
              </div>
              {dropzone1.map((file) => (
                <img
                  className="img_preview_set text-wrap"
                  src={file.preview}
                  alt={file.path}
                />
              ))}
            </div>
          </div>
        )}
      </Dropzone>
      <div className="mb-3 imgPreview">{$imagePreview}</div>
    </div>
  );
};
export default UploadImage;
