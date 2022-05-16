import React, { useState } from "react";
import UploadImage from "../UploadImage";
import iccancel from "../../../../assets/images/ic-cancel.svg";

const ShowDeviceModal = ({setProfileImage}) => {
    const [imagePreviewUrl, setimagePreviewUrl] = useState([]);
    const [dropzone1, setdropzone1] = useState([]);

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
  return (
    <div className="modal " id="showdeviceModal">
      <div className="modal-dialog">
        <div className="modal-content">
          
          <div>
            <img
              src={iccancel}
              className="close profile_ancel_img"
              data-dismiss="modal"
              alt=""
            />
          </div>

          {/* <!-- Modal body --> */}
          <div className="modal-body">
            <div className="container">
              <div className="text-center">
                <h1>ADD NEW PLANE</h1>
              </div>
              
              <UploadImage
                onPress={(files) => {
                  addFilesToDropzone(files, "dropzone1");
                }}
                dropzone1={dropzone1}
                imagePreviewUrl={imagePreviewUrl}
              />
              {/* <ShowImgUpload /> */}

              {/* <button className="btn btn-lg w-100">UPLOAD PLANE</button> */}
              <button
                className="btn btn-lg w-100 close"
                style={{ height: "35px" }}
                data-dismiss="modal"
                onClick={() => {
                  if (dropzone1.length !== 0) {
                    setProfileImage(dropzone1[0]?.preview);
                  } else {
                    setProfileImage("");
                  }
                }}
              >
                UPLOAD PLANE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDeviceModal;
