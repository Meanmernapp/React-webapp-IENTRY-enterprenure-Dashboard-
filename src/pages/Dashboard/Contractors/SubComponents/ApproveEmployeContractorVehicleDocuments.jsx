import React, { useState } from "react";
import threedotsicon from "../../../../assets/images/elipse.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import pencil from "../../../../assets/images/ic-pencil.png";
import del from "../../../../assets/images/ic-delete.png";
import listIcon from "../../../../assets/images/viewDetails.png";
import fileIcon from "../../../../assets/images/saveFile.png";
import apiInstance from "../../../../Apis/Axios";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import { margin } from "@mui/system";
import { useRef } from "react";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <div
      className="text-center"
      ref={ref}
      onClick={(e) => {
        // e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <img
        src={threedotsicon}
        className="img-fluid providerThreeDots"
        alt="threedotsicon"
      />
    </div>
  );
});

const ApproveEmployeContractorVehicleDocuments = (data) => {
  let id = data?.data;
  console.log("pssing data>>>",id)
  const [userRemoveModal, setuserRemoveModal] = useState(false);
  const inputRef = useRef(null);

  const ApproveDocement = async () => {
    await apiInstance
      .post(`document-service/approve-external-vehicle-document`, {
        id: id,
        validated: true,
      })
      .then(function (response) {
        if (response.status == 200) {
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  const rejectedDocumentSubmit = async () => {
    await apiInstance
      .post(`document-service/approve-external-vehicle-document`, {
        comments: inputRef.current.value,
        id: id,
        validated: false,
      })
      .then(function (response) {
        if (response.status == 200) {
        ;
        }
      })
      .catch(function (error) {
        toast(error?.response?.data?.message);
        document.getElementById("overlay").style.display = "none";
      });
  };

  function UserRemove(props) {
    return (
      <div className="primary-modal">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">NOT APPROVE DOCUMENT</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "12px", fontWeight: 400 }}
            >
              Enter the reason what the document is not approved.
            </span>
            <div className="mt-2">
              <label className="rejection-note-label">Description</label>
              <textarea
                rows="4"
                cols="43"
                ref={inputRef}
                type="textArea"
                id="message"
                name="message"
                multiline
                row={5}
                className="rejection-note-field"
              />
            </div>
            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={rejectedDocumentSubmit}
              >
                APPLY
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu
        size="sm"
        title="go to details"
        style={{ width: "240px", padding: "10px" }}
      >
        <div
          className="dropdownDiv d-flex justify-content-between"
          onClick={ApproveDocement}
        >
          <span className="doc-approve-modal-text">
            APPROVE DOCUMENTS <CheckIcon sx={{ color: "green", ml: 5 }} />
          </span>
        </div>

        <div
          className="dropdownDiv d-flex  pt-1"
          onClick={() => {
            setuserRemoveModal(true);
          }}
        >
          <span className="doc-approve-modal-text">
            No APPROVED DOCUMENTS <ClearIcon sx={{ color: "red", ml: 1 }} />
          </span>
        </div>
        <UserRemove
          show={userRemoveModal}
          onHide={() => setuserRemoveModal(false)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ApproveEmployeContractorVehicleDocuments;
