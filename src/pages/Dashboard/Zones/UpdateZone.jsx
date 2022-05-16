import React, { useState } from "react";

import saveregular from "../../../assets/images/save-regular.svg";

// Material ui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import TimePicker from "@mui/lab/TimePicker";
const AddRoomUpdateData = (props) => {
  // Material Ui Inputs Js
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChangee = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className=" main_all_p corporate_update_data">
        <div className="head_logo ">
          <div>
            <a href="/buildingdetails">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </a>
            <span>UPDATE ZONE</span>
            <a href="/zones" className="pull-right">
              <button
                className="btn guardar_btnn "
                style={{ fontWeight: "normal !important" }}
              >
                UPDATE ZONE
                <img
                  src={saveregular}
                  className="img-fluid"
                  style={{ marginLeft: "2rem" }}
                  alt=""
                />
              </button>
            </a>
          </div>
        </div>

        {/* Add Room And Update Data Main Section Start */}
        <div className="container-fluid">
          <div className="addroom_data_txt">
            <h1>DATA</h1>
            <div className="col-lg-3">
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
                    placeholder="Coffe Shop"
                    label="ZONE NAME"
                    id="ZONE NAME"
                  />
                </Box>
              </div>
            </div>
            <div className="col-lg-3">
              <select className="form-select" aria-label="Default select example">
                <option selected>status</option>
                <option value="1">active</option>
                <option value="2">vications</option>
                <option value="3">non active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Aceess Device Section Start */}
        <div className="container-fluid">
          <div className="addroom_accessdevice">
            <h2>
              ACCESS DEVICE
              <span className="checkbox_addroom">
                <input type="checkbox" />
                <span>(Has access device)</span>
              </span>
            </h2>
            <div className="container-fluid">
              <select
                className="form-select w-50  mb-5 mt-5"
                aria-label="Default select example"
              >
                <option selected>ACCESS TYPE</option>
                <option value="1">EXTERNAL BIOMETRIC</option>
                <option value="2">TERMINAL</option>
                <option value="3">PDA</option>
                <option value="4">RELAY</option>
                <option value="5">INTERNAL BIOMETRIC</option>
              </select>
              <h3>PDA DEV ICE</h3>
              <div className="row row_input_addroom">
                <div className="col-lg-8 ">
                  <div className="row gy-4">
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
                            fullWidth
                            placeholder="1000000000000002"
                            label="ID"
                            id="ID"
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
                            fullWidth
                            placeholder="ZonaUNITAD2"
                            label="NAME *"
                            id="NAME *"
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
                            fullWidth
                            placeholder="Av Unitad 2"
                            label="DESCRIPTION *"
                            id="DESCRIPTION *"
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
                            fullWidth
                            placeholder="Av Unitad 2"
                            label="IP *"
                            id="IP *"
                          />
                        </Box>
                      </div>
                    </div>

                    <div className="col-lg-6 ">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>status</option>
                        <option value="1">active</option>
                        <option value="2">vications</option>
                        <option value="3">non active</option>
                      </select>
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
                            fullWidth
                            placeholder="44.33231213656"
                            label="ACCESS LEVEL *"
                            id="ACCESS LEVEL *"
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
                            fullWidth
                            placeholder="UNITAD"
                            label="MAC *"
                            id="MAC *"
                          />
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="container-fluid"
            style={{ borderBottom: "3px dashed #146F62" }}
          >
            <div className="row">
              <div className="col-xl-8 col-lg-10 ">
                <div className="row readers_addroom">
                  <div className="mb-4 col-lg-6 col-md-12">
                    <h1>READERS</h1>
                    <div className="row">
                      <div className="p-0 col-lg-6 col-md-6">
                        <span className="checkbox_addroom">
                          <input type="checkbox" />
                          <span>SMART CARD</span>
                        </span>
                      </div>
                      <div className="p-0 col-lg-6 col-md-6">
                        <span className="checkbox_addroom">
                          <input type="checkbox" />
                          <span>FACIAL RECOGNITION</span>
                        </span>
                      </div>
                      <div className="p-0 col-lg-6 col-md-6">
                        <span className="checkbox_addroom">
                          <input type="checkbox" />
                          <span>QR</span>
                        </span>
                      </div>
                      <div className="p-0 col-lg-6 col-md-6">
                        <span className="checkbox_addroom">
                          <input type="checkbox" />
                          <span>Pin</span>
                        </span>
                      </div>
                      <div className="p-0 col-lg-6 col-md-6">
                        <span className="checkbox_addroom">
                          <input type="checkbox" />
                          <span>FINGERPRINT</span>
                        </span>
                      </div>{" "}
                      <div className="p-0 col-lg-6 col-md-6">
                        <span className="checkbox_addroom">
                          <input type="checkbox" />
                          <span>Bluetooth</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 ">
                    <h1>LOCK</h1>
                    <div className="d-flex position-relative addroom_unlink">
                      <div>
                        <p>UNLINK</p>
                      </div>
                      <div id="app-cover">
                        <div className="toggle-button-cover">
                          <div className="button-cover">
                            <div
                              className="button r custom_addroom_toggle"
                              id="button-1"
                            >
                              <input
                                type="checkbox"
                                className="checkbox checkbox_addroom"
                              />
                              <div className="knobs"></div>
                              <div className="layer"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span>LINK</span>
                      </div>
                    </div>

                    <h1>TYPE</h1>
                    <div className="mb-3 d-flex position-relative addroom_unlink">
                      <div>
                        <p>EXTERNAL</p>
                      </div>
                      <div id="app-cover">
                        <div className="toggle-button-cover">
                          <div className="button-cover">
                            <div
                              className="button r custom_addroom_toggle"
                              id="button-1"
                            >
                              <input
                                type="checkbox"
                                className="checkbox checkbox_addroom"
                              />
                              <div className="knobs"></div>
                              <div className="layer"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span>INTERNAL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 addroom_accessdevice">
            <h2>
              COMMON AREA
              <span className="checkbox_addroom">
                <input type="checkbox" />
                <span>(Is common area)</span>
              </span>
            </h2>

            <div className="container-fluid">
              <h3>SERVICE HOURS</h3>
              <br />
              <div className="col-lg-8">
                <div className="mb-5 row addroom_selecttime gy-4">
                  <div className="col-lg-6">
                    <div className="usrdata_form">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          renderInput={(props) => <TextField {...props} />}
                          ampm={false}
                          openTo="hours"
                          views={["hours", "minutes", "seconds"]}
                          inputFormat="HH:mm:ss"
                          mask="__:__:__"
                          label="FROM"
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="usrdata_form">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          renderInput={(props) => <TextField {...props} />}
                          ampmInClock
                          openTo="hours"
                          views={["hours", "minutes", "seconds"]}
                          inputFormat="mm:ss"
                          mask="__:__"
                          label="TO"
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <input type="date" name="date" /> */}

        {/* Aceess Device Section End */}

        {/* Add Room And Update Data Main Section End */}
      </div>
    </div>
  );
};

export default AddRoomUpdateData;
