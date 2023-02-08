import React, { useState } from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import ZonesMap from "../Map/ZoneMap";
import { Box, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const ShowDeviceMapModal = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  return (
    <div class="modal" id="showdevicemapModal">
      <div class="modal-dialog">
        <div class="modal-content">
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
          <div class="modal-body">
            <div className="container add_new_model_map">
              <div className="text-center mb-3">
                <h1>{t("add_new_map")}</h1>
              </div>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <TextField size="small"

                  // value={address}
                  fullWidth

                  label={t("latitude")}
                  id="Address"
                  name="LATITUDE"
                  // value={companyData.address}
                  // onChange={(e) => handleChange(e)}
                  sx={{
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
                  }}
                />
              </Box>
              <Box

                className="mt-3"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <TextField size="small"

                  // value={address}
                  fullWidth

                  label={t("longitude")}
                  id="Address"
                  name="LONGITUDE"
                  // value={companyData.address}
                  // onChange={(e) => handleChange(e)}
                  sx={{
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
                  }}
                />
              </Box>


              <div className="mt-3  zones_map">
                <ZonesMap LatLng={(e) => [setLat(e.lat), setLng(e.lng)]} />
              </div>
              <div className="text-center">
                <p>{t("touch_to_add_a_point")}</p>
              </div>

              <div className="add_plane_footer_button" >
                <button
                  className=" btncancel"
                  // style={{ height: "35px" }}
                  data-dismiss="modal"

                >
                  {t("cancel")}
                </button>
                <button
                  className="btn btn-primary btnUpload "
                  // style={{ height: "35px" }}
                  data-dismiss="modal"

                >
                  {t("upload")}
                </button>

              </div>
              {/* <button className="mb-4 btn btn-lg w-100">UPLOAD map</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDeviceMapModal;
