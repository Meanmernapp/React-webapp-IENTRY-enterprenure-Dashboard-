import React, { useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { Badge, Modal } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import RemoveUser from "./RemoveUser";

const ShiftManagementModal = (props) => {
  const { title, setRemoveUserModal, setaddUserModal } = props;
  return (
    <>
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
          <div className="row shiftmanagement_modal">
            <div className="text_field">
              <p className="title"> Remove User</p>
              <Box
                className="mt-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Escribir algún nombre para buscar"
                  label="Search"
                  id="Search"
                  className=""
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <div
                className="main_content"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="body">
                  {[
                    "Luis Enrique Cornejo Arreola",
                    "Diego Guerrero Estrada",
                    "Pablo Villegas Ferruzca",
                    "Iván Alejandro Sanchez",
                    "Osiris Danae Villanueva",
                  ].map((name) => (
                    <p>
                      {name}
                      <CloseIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          setRemoveUserModal(true);
                          setaddUserModal(false);
                        }}
                      />
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-3 title">Add user</div>
              <Box
                className="mt-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Escribir algún nombre para buscar"
                  label="Search"
                  id="Search"
                  className=""
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <div className="main_content">
                <div
                  className="mt-3 mb-2 ml-2  capsules"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "left",
                  }}
                >
                  {[
                    "Luis Enrique Cornejo Arreola",
                    "Diego Guerrero Estrada",
                    "Pablo Villegas Ferruzca",
                    "Iván Alejandro Sanchez",
                    "Osiris Danae Villanueva",
                  ].map((name) => (
                    <p className="mb-2">
                      {name} <CloseIcon className="closeIcon" />
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="applyChanges">Apply Changes</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShiftManagementModal;
