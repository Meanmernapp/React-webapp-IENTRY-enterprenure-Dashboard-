import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cloudsvg from "../../../../../assets/images/cloud.svg";
import userImage from "../../../../../assets/images/employee-4.png";
import {
  createImgObj, downloadSelfie, getSelfie, getSingleEmployeeDetail, hasSelfi,
  uploadNewImage
} from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";


const ChangeImage = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { singleEmployeeDetail } = useSelector(state => state?.CompanyEmployeesSlice);
  const { hasSelfiData } = useSelector(state => state?.CompanyEmployeesSlice);

  const [updateSelfi, setUpdateSelfi] = useState(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  // const [userUpdatedImage, setUserUpdatedImage] = useState(null);

  // console.log(updateSelfi)

  useEffect(() => {
    if (id) {
      dispatch(hasSelfi(id)).then(({ payload: { data: { data } } }) => {
        if (data === true) {
          dispatch(getSelfie(id)).then(({ payload: { data: { data } } }) => {
            setUpdateSelfi(data?.image)
          })
        }
      })
    }
  }, [])

  const onImageChange = (e) => {
    const originalFile = e.target.files[0];
    const [file] = e.target.files;

    props.fileObj(originalFile)

    setImageToUpload(originalFile)
    setUpdateSelfi(URL.createObjectURL(file));
  };

  const handleChangeImage = () => {
    props.preview(updateSelfi);
    props.onHide()




    // if (imageToUpload?.size <= 512000) {
    //   if (id !== undefined) {
    //     dispatch(hasSelfi(id)).then(({ payload: { data: { data } } }) => {
    //       if (data === true) {
    //         dispatch(getSelfie(id)).then(({ payload: { data: { data } } }) => {
    //           let formData = new FormData();
    //           formData.append('id', data?.id);
    //           formData.append('option', "user");
    //           formData.append('file', imageToUpload);
    //           dispatch(uploadNewImage(formData)).then(() => {
    //             dispatch(getSelfie(id)).then(({ payload: { data: { data } } }) => {
    //               dispatch(downloadSelfie(data?.id));
    //               dispatch(getSingleEmployeeDetail(id));
    //             })
    //             props.onHide();
    //           })
    //         })
    //       }
    //     })
    //   } else {
    //     if (hasSelfiData === true) {
    //       console.log("asdfadsfsdf")
    //       dispatch(getSelfie(id)).then(({ payload: { data: { data } } }) => {
    //         let formData = new FormData();
    //         formData.append('id', data?.id);
    //         formData.append('option', "user");
    //         formData.append('file', imageToUpload);
    //         dispatch(uploadNewImage(formData)).then(() => {
    //           dispatch(getSelfie(id)).then(({ payload: { data: { data } } }) => {
    //             dispatch(downloadSelfie(data?.id));
    //           })
    //           props.onHide();
    //         })
    //       })
    //     } else {
    //       props.upload(updateSelfi)
    //       if (id !== undefined) {
    //       } else {
    //         props.onHide();
    //       }
    //     }
    //   }
    // } else {
    //   toast.error("your image size is more than 500kb..!")
    // }
  }

  return (
    <Modal
      {...props}
      onHide={() => {
        // setUpdateSelfi(null)
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
          updateSelfi !== null && id ?
            <img
              src={`data:image/png;base64,${updateSelfi}`}
              style={{ width: "100%", height: "137px" }}
            /> :
            <img
              src={updateSelfi}
              style={{ width: "100%", height: "137px" }}
            />
        }
        <div className="changeImgBottomDiv">
          <button
            className="changeImgCancelBtn"
            onClick={() => {
              setUpdateSelfi(null)
              props.onHide()
            }}
          >
            CANCEL
          </button>
          <button
            className="changeImgChangeBtn"
            onClick={() => handleChangeImage()}
          >
            CHANGE
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeImage;
