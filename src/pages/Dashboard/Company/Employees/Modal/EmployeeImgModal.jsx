import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import cloudsvg from "../../../../../assets/images/cloud.svg";

const EmployeeImgModal = (props) => {

    const [isPreview, setIsPreview] = useState("null")
    console.log(isPreview)

    const onImageChange = (e) => {
        const originalFile = e.target.files[0];
        console.log(originalFile)
        props?.setImageToUpload(originalFile)
        const [file] = e.target.files;
        console.log(file)
        setIsPreview(URL.createObjectURL(file));
    };

    // const handleChangeImage = () => {
    // if (props?.imageToUpload?.size <= 512000) {
    // props?.setImageFile(originalFile)
    // props?.setPreviewFile(URL.createObjectURL(file))
    // } else {
    //     toast.error("your image size is more than 500kb..!")
    // }
    // }

    return (
        <Modal
            {...props}
            onHide={() => {
                setIsPreview(null)
                props.onHide();
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="add_workshiftmodal_title">
                    Change Image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="file-input" className="dottedborderbox">
                    <img
                        src={cloudsvg}
                        alt="submitupload"
                        className="submitupload"
                    />
                    <input
                        type="file"
                        id="file-input"
                        accept="image/*, video/*"
                        onChange={(e) => onImageChange(e)}
                    />
                    <p>
                        drag {"&"} drop <br /> your image <br /> size 20 mb max
                    </p>
                </label>
                {
                    isPreview !== null ?
                        <img
                            src={isPreview}
                            style={{ width: "100%", height: "137px" }}
                        /> : null

                }
                <div className="changeImgBottomDiv">
                    <button
                        className="changeImgCancelBtn"
                        onClick={() => {
                            setIsPreview(null)
                            props.onHide()
                        }}
                    >
                        CANCEL
                    </button>
                    <button
                        className="changeImgChangeBtn"
                    // onClick={handleChangeImage}
                    >
                        CHANGE
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EmployeeImgModal;
