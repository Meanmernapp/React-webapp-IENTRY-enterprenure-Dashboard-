import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Modal, Stack } from "react-bootstrap";

const NewCard = (props) => {
  const { title } = props;
  const [validUntil, setvalidUntil] = useState();
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
        <div className="row add_workshiftmodal_body">
          <div className="text_field">
            <Box
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                // height: "50px",
              }}
            >
              <TextField
                fullWidth
                placeholder=""
                label="Description"
                id="Description"
                multiline
                rows={3}
              />
              <div className="mt-3">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Validd Until"
                      inputFormat="MM/dd/yyyy"
                      value={validUntil}
                      onChange={(e) => setvalidUntil(e.target.value)}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </Box>
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

export default NewCard;
