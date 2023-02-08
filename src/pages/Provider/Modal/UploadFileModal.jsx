import React, { useState } from "react";
import iccancel from "../../../assets/images/ic-cancel.svg";
import UploadFile from "../SubComponents/UploadFile";
import { CreateToExternal, CreateToExternalVehicle, SaveProviderImage, SaveProviderVehicleImage } from "../../../reduxToolkit/Providers/providersApi";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const UploadFileModal = ({ item, vehicle }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    console.log(item);
    const [dropzone1, setdropzone1] = useState([]);
    const addFilesToDropzone = (files) => {
        files.map((file) => {
            setdropzone1(file)
        });
    };


    const handelUploadFile = () => {

        if (vehicle == true) {
            const data = {
                vehicle: {
                    id: item?.vehicleId
                },
                document: item?.document,
                companyDocumentExternalVehicle: {
                    id: item?.companyDocumentExternalVehicle?.id
                }
            }
            console.log(data)
            dispatch(CreateToExternalVehicle(data))
                .then((response) => {
                    console.log(response)
                    let formData = new FormData();
                    formData.append('id', response?.payload?.data?.data?.id);
                    formData.append('option', "document_external_vehicle");
                    formData.append('file', dropzone1);

                    dispatch(SaveProviderVehicleImage(formData))
                })
            setdropzone1("")

        } else {

            const data = {

                user: {
                    id: item?.userId
                },
                document: item?.document,
                companyDocumentExternal: {
                    id: item?.companyDocumentExternal?.id
                }
            }
            console.log(data)
            dispatch(CreateToExternal(data))
                .then((response) => {
                    console.log(response)
                    let formData = new FormData();
                    formData.append('id', response?.payload?.data?.data?.id);
                    formData.append('option', "document_external");
                    formData.append('file', dropzone1);

                    dispatch(SaveProviderImage(formData))
                })
            setdropzone1("")

        }


    }
    return (
        <div class="modal " id="profilefileModal">
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
                                <h1>{t("upload_file")}</h1>
                            </div>

                            <div>
                                <UploadFile

                                    className="upload_image_plane"
                                    onPress={(files) => {
                                        addFilesToDropzone(files, "dropzone1");
                                    }}
                                    dropzone1={dropzone1}
                                    setdropzone1={setdropzone1}

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
                                    onClick={() => { handelUploadFile() }}

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

export default UploadFileModal;
