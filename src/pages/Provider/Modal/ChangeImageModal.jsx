import React, { useState } from "react";
import UploadImage from "../UploadImage";
import iccancel from "../../../assets/images/ic-cancel.svg";
import { useDispatch, useSelector } from "react-redux";
import { SaveProviderImage } from "../../../reduxToolkit/Providers/providersApi";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const ChangeImageModal = ({ setProfileImage, setFile }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [imagePreviewUrl, setimagePreviewUrl] = useState([]);
    const [dropzone1, setdropzone1] = useState([]);
    console.log(dropzone1[0])


    // useSelector
    const { uploadProviderImage } = useSelector(state => state.providersSlice);
    console.log(uploadProviderImage)

    const addFilesToDropzone = (files, dropzone) => {
        let files_with_preview = [];
        let upload = [];
        console.log(dropzone);
        files.map((file) => {
            console.log(file);
            file["preview"] = URL.createObjectURL(file);
            // console.log(file["preview"]);
            files_with_preview.push(file["preview"]);
            setProfileImage(file["preview"]);
            upload.push(file);
            setFile(upload);
        });

        console.log("test url check", files_with_preview);
        setimagePreviewUrl(files_with_preview);
        setdropzone1([...upload]);
    };


    return (
        <div class="modal " id="profileImageChange">
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
                        <div className="container add_new_file_modal">
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
                            <div className="add_file_footer_button" >
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

                                    }
                                    }
                                >
                                    {t("change")}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeImageModal;
