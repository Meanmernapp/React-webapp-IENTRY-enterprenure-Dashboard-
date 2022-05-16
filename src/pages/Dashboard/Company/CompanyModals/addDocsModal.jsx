import React from "react";
import { TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import cancel from '../../../../assets/images/ic-cancel.svg'
import cloud from '../../../../assets/images/cloud.svg'

const AddDocsModal = (props) => {
  const { title, check } = props;
  return (
    <Modal
      className="documents-panel-modal"
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          ADD DOCUMENT
        </Modal.Title>
        <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
      </Modal.Header>
      <Modal.Body className="docsModalBody">
        <TextField
          fullWidth
          placeholder=""
          label="DOCUMENT NAME"
          id="FATHER ZONE*"
        />
        <label htmlFor="file-input" className="dottedborderbox">
          <img
            src={cloud}
            alt="cloud"
            className="submitupload"
          />
          <input
            type="file"
            id="file-input"
            accept="image/*, video/*"
          // onChange={(e) => {
          //   this.setState({ uploadedPath: e.target.files[0] })
          //   uploadToS3(e.target.files[0])
          // }}
          />
          <p>
            drag {"&"} drop <br /> your image <br /> size 20 mb max
          </p>
        </label>
        {/* <div className="uploadImg">
          <img className="cloud" src={cloud} alt="cloud" />
          <div className="dragAndDrop">
            <h2>DRAG & DROP YOUR IMAGE</h2>
            <p>file size 20MB</p>
          </div>
        </div> */}
        <div className="buttonArea">
          <a className="btns btn btn-light" href="">Cancel</a>
          <a className="btn btn-success" href="">Cancel</a>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default AddDocsModal;