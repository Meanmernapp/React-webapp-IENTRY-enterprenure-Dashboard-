import React from "react";
import ZoneCard from "./ZoneCard";

const ZoneDetails = () => {
  return (
    <div className="company-detail">
      <div className="head">
        <h2>Panel Devices</h2>
        <button
          className="btn btn-lg "
          data-toggle="modal"
          data-target="#addzones_modal"
        >
          ADD ZONE
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <div className="zones_head_m">
        <h2>Zones</h2>
        <p>TOTAL 4</p>
      </div>
      <div>
        <ZoneCard />
      </div>
    </div>
  );
};

export default ZoneDetails;
