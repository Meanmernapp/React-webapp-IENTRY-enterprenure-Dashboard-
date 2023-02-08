import React, { useState } from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ZonesMap from "../Map/ZoneMap";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const AddChildZoneModal = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const textFieldStyle = {
    textAlign: lCode === "ar" ? "right" : "left",
    "& 	.MuiOutlinedInput-notchedOutline": {
      textAlign: lCode === "ar" ? "right" : "left",
    },
    "& 	.MuiInputLabel-root": {
      fontSize: 12,
      left: lCode === "ar" ? "inherit" : "0",
      right: lCode === "ar" ? "1.75rem" : "0",
      transformOrigin: lCode === "ar" ? "right" : "left"
    }
  }
  return (
    <div class="modal buildingadd_card" id="addchildzones_modal">
      <div class="modal-dialog modal-lg zonescard_m_center">
        <div class="modal-content ">
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
          <div class="modal-body ">
            <div className="container-fluid input_zones">
              <div className="row">
                <h1>{t("child_zone")}</h1>
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
                          <TextField size="small"
                            fullWidth

                            label={t("father_zone")}
                            id="FATHER ZONE*"
                            sx={textFieldStyle}
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
                          <TextField size="small"
                            fullWidth

                            label={t("name")}
                            id="NAME *"
                            sx={textFieldStyle}
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
                          <TextField size="small"
                            fullWidth

                            label={t("status")}
                            id="STATUS"
                            sx={textFieldStyle}
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
                          <TextField size="small"
                            value={lat}
                            fullWidth

                            label={t("latitude")}
                            id="LATITUDE *"
                            sx={textFieldStyle}
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
                          <TextField size="small"
                            value={lng}
                            fullWidth

                            label={t("longitude")}
                            id="LONGITUD *"
                            sx={textFieldStyle}
                          />
                        </Box>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-lg">{t("add")}</button>
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
