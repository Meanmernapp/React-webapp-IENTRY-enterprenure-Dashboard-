import React from "react";
import Dropzone from "react-dropzone";

const UploadImage = ({ onPress, dropzone1, imagePreviewUrl }) => {
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
            <div className="custom_inputfile">
              <span className="fa fa-cloud-upload fill" aria-hidden="true">
                <span>
                  DRAG & DROP<br></br>
                  YOUT IMAGE
                  <br></br>
                  SIZE 20 MB MAX
                </span>
              </span>
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
