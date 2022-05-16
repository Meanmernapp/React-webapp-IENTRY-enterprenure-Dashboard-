import React from "react";
import { Box, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
const AddWorkShift = (props) => {
  const { title } = props;

  return (
    <Modal
      {...props}
      //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        closeButton
      >
        <Modal.Title className="mt-2 text-center add_workshiftmodal_title">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row add_workshiftmodal_body">
          <div className="text_field">
            <p> Enter the name of work shift</p>
            <Box
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "50px",
              }}
            >
              <TextField
                fullWidth
                placeholder="EVENING WORK SHIFT"
                label="WORK SHIFT"
                id="WORK SHIFT"
              />
            </Box>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="cancleBtn">cancel</button>
            <button className="addBtn">add</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkShift;
