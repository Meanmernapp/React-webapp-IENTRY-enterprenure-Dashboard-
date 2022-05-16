import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AccessRightCard from "./AccessRightCard";
import pdfpng from "../../../../assets/images/PDF.PNG";
const AccessRights = () => {
  const cards = [
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
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
    <>
      <div className="mt-5">
        <div className="access_right_m">
          <p className="mb-2">ACCESS RIGHTS</p>
          <div className="mb-5 card access_right_card ">
            <div className="separator mt-4">
              Working Shift
              <br></br>
              Morning
            </div>
            <AccessRightCard heading1="zones" heading2="days" />
          </div>
        </div>

        <div className=" type_nfc_card">
          <div className="pt-4 access_textt">
            <Link to="">cards</Link>
          </div>
          <div className="pt-3 row" style={{ marginLeft: "15px" }}>
            <div className="col-lg-4 col-md-4 col-6">
              <div className="d-flex updown_icon">
                <p>type</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-6">
              <div className="d-flex updown_icon">
                <p>nfc</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-6">
              <div className="d-flex updown_icon">
                <p>VALID UNTIL</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-6">
              <div className="d-flex updown_icon">
                <p>STATUS</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {cards.map((card) => (
            <div
              className="mb-4 coomon_accessCarsd card"
              style={{ marginRight: "15px", marginLeft: "15px" }}
            >
              <div className="row">
                <div className="col-lg-4 col-md-4 col-6">
                  <p>Vehicle number plate</p>
                </div>
                <div className="col-lg-2 col-md-2 col-6">
                  <p>168536619</p>
                </div>
                <div className="col-lg-4 col-md-4 col-6">
                  <p>04-05-2023</p>
                </div>
                <div className="col-lg-2 col-md-2 col-6">
                  <span>ACTIVE</span>
                </div>
              </div>
            </div>
          ))}

          <div
            className="pt-4 access_textt"
            style={{ marginRight: "15px", marginLeft: "15px" }}
          >
            <Link to="">Documents</Link>
          </div>

          <div className="col-md-3 ">
            <div className="mt-5 mb-4 main_content document_card">
              <div className="text-center card-title document_head">
                <span>JOB APPLICATION</span>
              </div>
              <div className="document_img">
                <img src={pdfpng} />
              </div>
              <div className="text-center card-text document_name">
                formato_informacion _personal.pdf
                <br /> <span>14-05-2021 15:</span>
              </div>
            </div>
          </div>

          <div
            className="pt-4 access_textt"
            style={{ marginRight: "15px", marginLeft: "15px" }}
          >
            <Link to="">FIREARMS</Link>
          </div>
          <div className="mb-5 card firearms_card">
            <div className="text-center firearms_txt">
              <h4>
                NO FIREARMS
                <span>
                  <i
                    className="fa fa-exclamation-circle"
                    aria-hidden="true"
                  ></i>
                </span>
              </h4>
            </div>
          </div>

          <div
            className="pt-4 access_textt "
            style={{ marginRight: "15px", marginLeft: "15px" }}
          >
            <Link to="">VEHICLES</Link>
          </div>
          <div className="mb-5 card firearms_card">
            <div className="text-center firearms_txt">
              <h4>
                NO VEHICLES
                <span>
                  <i
                    className="fa fa-exclamation-circle"
                    aria-hidden="true"
                  ></i>
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessRights;
