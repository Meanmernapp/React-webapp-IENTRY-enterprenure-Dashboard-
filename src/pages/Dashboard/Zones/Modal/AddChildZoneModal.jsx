import React, { useState } from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ZonesMap from "../Map/ZoneMap";

const AddChildZoneModal = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  return (
    <div className="modal buildingadd_card" id="addchildzones_modal">
      <div className="modal-dialog modal-lg zonescard_m_center">
        <div className="modal-content ">
          {/* <!-- Modal Header --> */}
          <div>
            <img
              src={iccancel}
              className="close profile_ancel_img"
              data-dismiss="modal"
              alt=""
            />
          </div>

          {/* <!-- Modal body --> */}
          <div className="modal-body ">
            <div className="container-fluid input_zones">
              <div className="row">
                <h1>CHILD ZONE</h1>
                <div className="mt-3 col-lg-6 col-md-6">
                  <div className="row gy-4">
                    <div className="col-lg-12">
                      <div className="usrdata_form">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Querétaro"
                            label="FATHER ZONE*"
                            id="FATHER ZONE*"
                          />
                        </Box>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="usrdata_form">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="ZonaUNITAD2"
                            label="NAME *"
                            id="NAME *"
                          />
                        </Box>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="usrdata_form">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
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
                    </div>
                    <div className="col-lg-6">
                      <div className="usrdata_form">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            value={lat}
                            fullWidth
                            placeholder="33.3091213235"
                            label="LATITUDE *"
                            id="LATITUDE *"
                          />
                        </Box>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="usrdata_form">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            value={lng}
                            fullWidth
                            placeholder="44.33231213656"
                            label="LONGITUD *"
                            id="LONGITUD *"
                          />
                        </Box>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-lg">add</button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <ZonesMap LatLng={(e) => [setLat(e.lat), setLng(e.lng)]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChildZoneModal;
