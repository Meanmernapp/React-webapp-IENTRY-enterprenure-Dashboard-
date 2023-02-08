import React, { useState } from "react";
// import UploadImage from "../UploadImage";
// import iccancel from "../../../assets/images/ic-cancel.svg";
// import UploadFile from "../SubComponents/UploadFile";
// import { CreateToExternal, CreateToExternalVehicle, SaveProviderImage, SaveProviderVehicleImage } from "../../../reduxToolkit/Providers/providersApi";
import { useDispatch } from "react-redux";
import { CreateToExternalEmployee } from "../../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { SaveProviderImage } from "../../../../reduxToolkit/Providers/providersApi";
import UploadFile from "../../../Provider/SubComponents/UploadFile";

const UploadFileModalEmployee = ({ item }) => {
    const dispatch = useDispatch();
    console.log(item);
    const [dropzone1, setdropzone1] = useState([]);
    const addFilesToDropzone = (files) => {
        files.map((file) => {
            setdropzone1(file)
        });
    };


    const handelUploadFile = () => {



        const data = {

            user: {
                id: item?.userId
            },
            document: item?.document,
            companyDocumentEmployee: {
                id: item?.companyDocumentEmployee?.id
            }
        }
        console.log(data)
        dispatch(CreateToExternalEmployee(data))
            .then((response) => {
                console.log(response)
                let formData = new FormData();
                formData.append('id', response?.payload?.data?.data?.id);
                formData.append('option', "document_employee");
                formData.append('file', dropzone1);

                dispatch(SaveProviderImage(formData))
            })
        setdropzone1("")




    }
    return (
        <div class="modal " id="profilefileModal">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div>
                        <img
                            // src={iccancel}
                            src=""
                            className="close profile_ancel_img"
                            data-dismiss="modal"
                            alt=""
                        />
                    </div>

                    {/* <!-- Modal body --> */}
                    <div class="modal-body">
                        <div className="container add_new_file_modal">
                            <div className="text-center mb-4">
                                <h1>UPLOAD FILE</h1>
                            </div>

                            <div>
                                <UploadFile

                                    className="upload_image_plane"
                                    onPress={(files) => {
                                        addFilesToDropzone(files, "dropzone1");
                                    }}
                                    dropzone1={dropzone1}

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
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary btnUpload "
                                    // style={{ height: "35px" }}
                                    data-dismiss="modal"
                                    onClick={() => { handelUploadFile() }}

                                >
                                    UPLOAD
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadFileModalEmployee;
