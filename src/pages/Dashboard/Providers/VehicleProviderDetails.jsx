import React from "react";
import { Link } from "react-router-dom";
import personPng from "../../../assets/images/person.png";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const VehicleProviderDetails = () => {
  const vehicle = {
    brand: "KIA",
    subBrand: "RIO",
    color: "Electic Blue",
    model: "2018",
    plates: "SS-568-45D",
    vehicleType: "Sedan",
    driver: "Luis Enrique Cornejo Arreola",
    status: "Active",
  };
  return (
    <>
      <div className="head">
        <h2>
          <Link to="/dashboard/company">
            <ArrowBackIcon
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
          </Link>
          VEHICLE PROVIDER DETAIL
        </h2>
      </div>
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div className="vehicleProviderDetails">
          <img src={personPng} className="__vehicleImage" />
          <p className="__vehicleStatus">ACTIVE</p>
          <div className="__body" style={{ display: "flex" }}>
            <div className="col-md-8" style={{ padding: "0" }}>
              <p>BRAND</p>
              <span>Kia</span>
              <p>COLOR</p>
              <span>Electic Blue</span>
              <p>PLATES</p>
              <span>SS-568-45D</span>
              <p>DRIVER</p>
              <span>Luis Enrique Cornejo Arreola</span>
            </div>
            <div className="col-md-4" style={{ padding: "0" }}>
              <p>SUB-BRAND</p>
              <span>RIO</span>
              <p>MODEL</p>
              <span>2018</span>
              <p>VEHICLE TYPE</p>
              <span>Sedan</span>

              <p>STATUS</p>
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleProviderDetails;
