import React from 'react'
import { Modal } from "react-bootstrap";
import Dropzone from 'react-dropzone';
import cloudsvg from "../assets/images/cloud.svg";
import { toast } from 'react-toastify';
import { fileSize } from '../constant/variable';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import jpgIcon from "../assets/fileIcon/jpg.png";
import pdfIcon from "../assets/fileIcon/pdf.png";
import pngIcon from "../assets/fileIcon/png.png";
import wordIcon from "../assets/fileIcon/word.png";
import exelIcon from "../assets/fileIcon/xls.png";
import { useDispatch } from 'react-redux';
import { CreateSupplierDocValue } from '../reduxToolkit/Providers/providersApi';

const UploadFileModal = (props) => {

    // destructure from prop
    const { title, ApiType, data,createDocValue } = props;
    // title: title of your modal
    // ApiType: type of calling model from module
    // data: response data from api
    // createDocValue : api to upload doc




    // use hook
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const [fileData, setFileData] = useState("")
    const [fileType, setFileType] = useState("")
    const [fileDate, setFileDate] = useState("")
    const validFileTypes = ["pdf", "docx", "xlsx", "xlm", "png", "jpg", "jpeg"];

    // funtion to handle file upload
    const handleImageUpload = (event) => {

        event.map((file) => {
            console.log(file)
            const checkFile = file?.name?.split('.')?.pop()
            const fileImage = validFileTypes.includes(checkFile);
            const date = new Date(file?.lastModified); // current date and time
            const utcString = date.toUTCString();
            setFileDate(utcString)
            if (fileImage) {
                if (file?.size <= fileSize) {
                    setFileData(file)
                    setFileType(file?.name?.split('.')?.pop())

                } else {
                    setFileData("")
                    toast.warn(`The file size should not exceed ${fileSize / 1000}KB.`)
                }
            } else {
                setFileData("")
                toast.warn("Please ensure that the file you are uploading has one of the following formats: 'pdf', 'docx', 'xlsx', 'xlm', 'png', 'jpg', or 'jpeg'.")
            }
        });
    };
    // funtion to call api or handle image
    const handelUploadImageAction = () => {
        // right logic here
        if (fileData) {
            switch (ApiType) {
                case ApiType:
                    const payload = {
                        id: data?.userId || data?.vehicleId,
                        document: "",
                        companyDocumentId: data?.companyDocumentId
                    }
                    dispatch(createDocValue({ data:payload, file: fileData }))
                    props.onHide()
                    break;
                default:
                    toast.error("Mix match module")
            }

        } else {
            toast?.warn("Please upload an image file")
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="files_upload_conatiner">

            <Modal.Header className='header_top'>
                <Modal.Title id="contained-modal-title-vcenter ">
                    {title}
                </Modal.Title>
                <i onClick={() => {
                    props.onHide()
                    setFileData("")
                }} className="fa fa-times cross" aria-hidden="true"></i>
            </Modal.Header>

            <Modal.Body>
                <Dropzone onDrop={acceptedFiles => { handleImageUpload(acceptedFiles) }}>
                    {({ getRootProps, getInputProps }) => (
                        <section className='drop_zone_area'>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} onChange={(e) => handleImageUpload(e)} />
                                <div className='drop_zone_item'>
                                    <img src={cloudsvg} alt="" />
                                    <p>DRAG & DROP <br /> YOUR IMAGE <br /> <span>MAX SIZE {fileSize / 1000} KB</span></p>
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {
                    fileData &&
                    <div className="preview_file ">
                        <div className="preview_file_item">
                            <img src={
                                fileType === "pdf" && pdfIcon ||
                                fileType === "jpg" && jpgIcon ||
                                fileType === "jpeg" && jpgIcon ||
                                fileType === "png" && pngIcon ||
                                fileType === "xlsx" && exelIcon ||
                                fileType === "docx" && wordIcon
                            } alt="pdf" />
                            <div>
                                <p className='file_type'>{fileData?.name?.length > 18 ? fileData?.name.slice(0, 18) + "." + fileType : fileData?.name}</p>

                                <p className='time_line'>{fileDate}</p>

                            </div>
                            <i
                                onClick={() => setFileData("")}
                                className="fa fa-times" aria-hidden="true"></i>
                        </div>

                    </div>
                }

                <div className='footer'>
                    <button
                        onClick={() => {
                            props.onHide()
                            setFileData("")
                        }}
                        className='custom_btn_cancel_gray_hover'
                        style={{ width: "180px" }}>{t("cancel")}</button>
                    <button
                        onClick={() => { handelUploadImageAction() }}
                        className='custom_primary_btn_dark'
                        style={{ width: "178px" }}>{t("upload").toUpperCase()}</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UploadFileModal