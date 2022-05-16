import { LocalizationProvider, TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button } from "react-bootstrap";

const AccessRightCard = ({ heading1, heading2, update, isAddemployee }) => {
  const [value, setValue] = useState();
  const [ModalShow, setModalShow] = useState(false);
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const myFunction = (day) => {
    var harday = document.getElementById(day);
    if (day) {
      let hardayId = harday?.classList?.contains("slectday");
      if (hardayId) {
        document.getElementById(day)?.classList?.remove("slectday");
      } else {
        document.getElementById(day)?.classList.add("slectday");
      }
    }
  };
  return (
    <div className="pt-3 row">
      <div className="col-lg-6">
        <div className={heading1 === "zones" ? "access_text" : "work_text"}>
          <p>{heading1}</p>
        </div>

        <div className="checkboxes_m">
          <ol>
            <li>
              <i className="fa fa-angle-right angeL_rights" aria-hidden="true"></i>
              {update && <input type="checkbox" />}
              <span className="sm_res">united</span>
            </li>
            <ul>
              <li>
                <i
                  className="fa fa-angle-right angeL_rights"
                  aria-hidden="true"
                ></i>
                {update && <input type="checkbox" />}

                <span className="sm_res">ZoneUNITAD1</span>
              </li>
              <ul className="nested_checkbox">
                <li>
                  {!update && (
                    <i
                      style={{ fontSize: "1rem" }}
                      className="fa fa-circle"
                      aria-hidden="true"
                    ></i>
                  )}
                  {update && <input type="checkbox" />}

                  <span className="sm_ress">AccessUnitad</span>
                </li>

                <li>
                  {!update && (
                    <i
                      style={{ fontSize: "1rem" }}
                      className="fa fa-circle"
                      aria-hidden="true"
                    ></i>
                  )}
                  {update && <input type="checkbox" />}

                  <span className="sm_ress">M01</span>
                </li>
              </ul>
              <li>
                <i
                  className="fa fa-angle-right angeL_rights"
                  aria-hidden="true"
                ></i>
                {update && <input type="checkbox" />}
                <span className="sm_res">ZoneUNITAD2</span>
              </li>
            </ul>
          </ol>
        </div>
      </div>

      <div className="col-lg-6">
        <div className={heading1 === "zones" ? "access_text" : "work_text"}>
          <p>{heading1 === "zones" ? `${heading2}` : heading2}</p>
        </div>

        <div
          className="main_content days_card"
          style={{
            background: "#e1e1e1",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <div className="d-flex justify-content-between days_card_text">
            {days.map((day) => (
              <p id={day} className="mystyle " onClick={() => myFunction(day)}>
                <span>
                  <b>{day[0]}</b>
                </span>
              </p>
            ))}
          </div>
          {isAddemployee && (
            <div className="all_checkbox">
              <input type="checkbox" /> ALL Days
            </div>
          )}
        </div>

        <div className="col-md-8">
          <div className="pt-4 access_text">
            {heading2 != "SCHEDULE" && <p>hours</p>}
            {update ? (
              <>
                <div className="mt-3">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      renderInput={(props) => (
                        <TextField style={{ width: "100%" }} {...props} />
                      )}
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
                <div className="mt-3">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      renderInput={(props) => (
                        <TextField style={{ width: "100%" }} {...props} />
                      )}
                      ampm={false}
                      openTo="hours"
                      views={["hours", "minutes", "seconds"]}
                      inputFormat="HH:mm:ss"
                      mask="__:__:__"
                      label="TO"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </LocalizationProvider>
                </div>
                {heading2 === "SCHEDULE" && (
                  <div className="mt-3 mr-1 row" style={{ float: "right" }}>
                    <button
                      className="btn btn-lg add_access"
                      style={{
                        border: "none",
                        padding: "7px 0",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "175px",
                        borderRadius: "5px",
                        backgroundColor: "#146f62",
                        color: "#fff",
                        fontSize: "16px",
                        textTransform: "uppercase",
                        fontWeight: 450,
                      }}
                      onClick={() => setModalShow(true)}
                    >
                      ADD ACCESS
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="d-flex from_text">
                  <span>from</span>
                  <h2>12:30</h2>
                </div>
                <div className="d-flex from_text">
                  <span>from</span>
                  <h2>12:30</h2>
                </div>
              </>
            )}
            {isAddemployee && (
              <div className="all_checkbox">
                <input type="checkbox" /> ALL Time
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessRightCard;
