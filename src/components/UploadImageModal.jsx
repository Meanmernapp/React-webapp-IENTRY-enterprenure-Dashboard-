import React from 'react'
import { Modal } from "react-bootstrap";
import Dropzone from 'react-dropzone';
import cloudsvg from "../assets/images/cloud.svg";
import { toast } from 'react-toastify';
import { fileSize } from '../constant/variable';
import { useTranslation } from 'react-i18next'

const UploadImageModal = (props) => {

  // destructure from prop
  const { title,setImage,preview,setPreview } = props;
  // title: title of your modal
  // setImage: image file for set image
  // preview: to see live preview of image
  // setPreview: to set preview image
  // use hook
  const { t } = useTranslation();

  // funtion to handle image upload
  const handleImageUpload = (event) => {

    event.map((file) => {
      const fileImage = file["type"].split("/")[0] === "image";
      if (fileImage) {
        if (file?.size <= fileSize) {
          setImage(file)
          setPreview(URL.createObjectURL(file))
        } else {
          toast.warn("File Should not more then 500kb")
        }
      }else{
        toast.warn("Please Upload Image File")
      }
    });


  };
  // funtion to call api or handle image
  const handelUploadImageAction = ()=>{
    // right logic here
    if(preview ){
      props.onHide()
    }else{
      toast?.warn("Please upload an image")

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
          setPreview("")
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
          preview &&
          <div className="preview_image ">
            <img src={preview} alt="" width="100%" height="139px" />
          </div>
        }

        <div className='footer'>
          <button
            onClick={() => {
              props.onHide()
              setPreview("")
            }}
            className='custom_btn_cancel_gray_hover'
            style={{ width: "180px" }}>{t("cancel")}</button>
          <button
          onClick={()=>{handelUploadImageAction()}}
            className='custom_primary_btn_dark'
            style={{ width: "178px" }}>{t("add")}</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default UploadImageModal