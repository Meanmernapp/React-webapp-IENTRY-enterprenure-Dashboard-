import React from "react";
import { Box, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import LefletMap from "../../../../components/LefletMap";
import { Link } from "react-router-dom";
import cancel from '../../../../assets/images/ic-cancel.svg'

const AddZoneModal = (props) => {
  const { title, check } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
        <img onClick={() => props.onHide()} src={cancel} alt="cancel" style={{ paddingTop: "12px", cursor: "pointer" }} />
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            {
              check === "true" ?
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "50px",
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Querétaro"
                    label="FATHER ZONE*"
                    id="FATHER ZONE*"
                  />
                </Box> : ""
            }
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "50px",
              }}
            >
              <TextField
                fullWidth
                placeholder="ZonaUNITAD2"
                label="NAME"
                id="NAME"
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "50px",
              }}
            >
              <TextField
                fullWidth
                placeholder="ACTIVE"
                label="STATUS"
                id="STATUS"
              />
            </Box>
            <div className="row">
              <div className="col-md-6">
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "50px",
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="ACTIVE"
                    label="STATUS"
                    id="STATUS"
                  />
                </Box>
              </div>
              <div className="col-md-6">
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "50px",
                  }}
                >
                  <TextField
                    value="lng"
                    fullWidth
                    placeholder="44.33231213656"
                    label="LONGTITID"
                    id="LONGTITID"
                  />
                </Box>
              </div>
            </div>
            <button className="addBtn">add</button>
          </div>
          <div className="col-md-6 text-center">
            <LefletMap />
            <Link to='/' className="seeLocation">CILCK DE LOCATION IN THE MAP</Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddZoneModal;
