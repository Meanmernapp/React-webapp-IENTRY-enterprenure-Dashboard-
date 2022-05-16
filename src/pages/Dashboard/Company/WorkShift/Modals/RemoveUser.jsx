import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Modal } from "react-bootstrap";

const RemoveUser = (props) => {
  const { title, user } = props;
  return (
    <Modal
      {...props}
      //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Title className="mt-2 text-center add_workshiftmodal_title">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row add_workshiftmodal_body">
          <div className="text-center text_field">
            <p> Are you sure that would you like to remove to the user ? {user}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="cancleBtn">cancel</button>
            <button className="addBtn">Confirm</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveUser;
