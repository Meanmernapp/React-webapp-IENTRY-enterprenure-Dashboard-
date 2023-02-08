import React, { useState } from "react";
import UploadImage from "../UploadImage";
import iccancel from "../../../assets/images/ic-cancel.svg";
import { useTranslation } from 'react-i18next';

const ProfilePicModal = ({ setProfileImage }) => {
    const { t } = useTranslation();
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
        <div class="modal " id="profilePicModal">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div>
                        <img
                            src={iccancel}
                            className="close profile_ancel_img"
                            data-dismiss="modal"
                            alt=""
                        />
                    </div>

                    {/* <!-- Modal body --> */}
                    <div class="modal-body">
                        <div className="container add_new_model_plane">
                            <div className="text-center mb-4">
                                <h1>{t("change_image")}</h1>
                            </div>

                            <div>
                                <UploadImage
                                    className="upload_image_plane"
                                    onPress={(files) => {
                                        addFilesToDropzone(files, "dropzone1");
                                    }}
                                    dropzone1={dropzone1}
                                    imagePreviewUrl={imagePreviewUrl}
                                />
                            </div>

                            {/* <ShowImgUpload /> */}

                            {/* <button className="btn btn-lg w-100">UPLOAD PLANE</button> */}
                            <div className="add_plane_footer_button" >
                                <button
                                    className=" btncancel"
                                    // style={{ height: "35px" }}
                                    data-dismiss="modal"

                                >
                                    {t("cancel")}
                                </button>
                                <button
                                    className="btn btn-primary btnUpload "
                                    // style={{ height: "35px" }}
                                    data-dismiss="modal"
                                    onClick={() => {
                                        if (dropzone1.length !== 0) {
                                            setProfileImage(dropzone1[0]?.preview);
                                        } else {
                                            setProfileImage("");
                                        }
                                    }}
                                >
                                    {t("upload")}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePicModal;
