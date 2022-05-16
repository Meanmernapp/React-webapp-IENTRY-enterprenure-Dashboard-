import React from "react";
import { Card } from "react-bootstrap";
import car from "../../../../assets/images/car.png";
import angelright_icon from "../../../../assets/images/angelright.svg";
import { Link } from "react-router-dom";
// import angelright_icon from "../../../../../assets/images/angelright.svg";

const SingleVehicleCard = ({
  vehicle: {
    id,
    brand,
    subBrand,
    color,
    model,
    plate,
    status,
    vehicleType,
    vin,
  },
}) => {
  return (
    <div className="vehicle_component">
      <i
        style={{
          fontSize: "1rem",
          margin: "4px",
          float: "right",
          color:
            (status.name === "active" && "#0C4523") ||
            (status.name === "inactive" && "#BC0000") ||
            (status.name === "inrepair" && "#F2A100"),
        }}
        className="fa fa-circle"
        aria-hidden="true"
      ></i>
      <div className="vehicle_card_header" style={{ display: "flex" }}>
        <img src={car} />
        <div
          className="header_component"
          style={{
            borderBottom: `2px solid ${(status.name === "active" && "#0C4523") ||
              (status.name === "inactive" && "#BC0000") ||
              (status.name === "inrepair" && "#F2A100")
              }`,
          }}
        >
          <p>{brand}</p>
          <span>{subBrand}</span>
        </div>
      </div>
      <div
        className="vehicle_card_body"
        style={{
          borderBottom: `2px solid ${(status.name === "active" && "#0C4523") ||
            (status.name === "inactive" && "#BC0000") ||
            (status.name === "inrepair" && "#F2A100")
            }`,
        }}
      >
        <div
          style={{
            // marginRight: "1rem",
            display: "flex",
            justifyContent: "space-between",
            lineHeight: "1.2"
          }}
        >
          <div>
            <p>Brand</p>
            <span>{brand}</span>
            <p>Color</p>
            <span>{color}</span>
            <p>Plates</p>
            <span>{plate}</span>
          </div>
          <div>
            <p>Sub Brand</p>
            <span>{subBrand}</span>
            <p>Model</p>
            <span>{model}</span>
            {/* <p>Status</p>
            <span
              className="status"
              style={{
                color: `${(status.name === "active" && "#0C4523") ||
                  (status.name === "inactive" && "#BC0000") ||
                  (status.name === "inrepair" && "#F2A100")
                  }`,
              }}
            >
              {status.name}
            </span> */}
          </div>
        </div>
        <div style={{ marginBottom: "12px", lineHeight: "1.4" }}>
          <p>Vehicle Type</p>
          <span>{vehicleType}</span>
          <p>Driver</p>
          <span>{vin}</span>
        </div>
      </div>
      <Link to="/dashboard/company/addupdatevehicle" className="update_data">
        Update Data
        <span>
          <img src={angelright_icon} alt="" />
        </span>
      </Link>
    </div>
  );
};

export default SingleVehicleCard;
