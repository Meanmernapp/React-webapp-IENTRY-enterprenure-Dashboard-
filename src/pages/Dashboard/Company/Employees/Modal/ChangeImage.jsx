import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Modal } from "react-bootstrap";
// import cloudsvg from "../../../../assets/images/cloud.svg";
import cloudsvg from "../../../../../assets/images/cloud.svg";
import userImage from "../../../../../assets/images/employee-4.png";
const ChangeImage = (props) => {
  const { title } = props;
  return (
    <Modal
      {...props}
      //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="text-center">
          <Modal.Title className="mt-2 text-center add_workshiftmodal_title">
            {title}
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="row " style={{ width: "100%" }}>
          <div style={{ width: "100%", margin: "15px" }}>
            <div className="updata_img_m">
              <label htmlFor="file-input" className="dottedborderbox">
                <img
                  src={cloudsvg}
                  alt="submitupload"
                  className="submitupload"
                />
                <input type="file" id="file-input" accept="image/*, video/*" />
                <p>
                  drag {"&"} drop <br /> your image <br /> size 20 mb max
                </p>
              </label>
            </div>
            <div className="col" style={{ width: "100%" }}>
              <img src={userImage} style={{ width: "100%" }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="cancleBtn">cancel</button>
            <button className="addBtn">Change</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeImage;
